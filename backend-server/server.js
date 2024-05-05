const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const pg = require("pg");
const admin = require("firebase-admin");
const serviceAccount = require("./confidential/linkbeez-f317f-firebase-adminsdk-7srxv-aa31bfd801.json");
const multer = require("multer");
const { log } = require("console");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10000000,
  },
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "linkbeez-f317f.appspot.com",
});

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" })); // Adjust the limit as needed

const client = new pg.Client(
  "postgres://iceiwzib:MlBh8jgud4RMYyRSJ-vP8ixUAV1d8yQM@isabelle.db.elephantsql.com/iceiwzib"
);
client.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  console.log("Connected to PostgreSQL");
});

app.post("/register", upload.single("profile_pic"), async (req, res) => {
  console.log("Request sent");
  const {
    firstName,
    lastName,
    email,
    password,
    location,
    profession,
    bio,
    instagram,
    linkedin,
    twitter,
    facebook,
    profilePic,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // const bucket = admin.storage().bucket();
    // const profilePicFile = req.file;
    // const profilePicFileName = `${Date.now()}-${profilePicFile.originalname}`;
    // const profilePicFileUpload = bucket.file(profilePicFileName);

    // await profilePicFileUpload.save(profilePicFile.buffer, {
    //   metadata: {
    //     contentType: profilePicFile.mimetype,
    //   },
    // });

    // // Get the download URL of the profile picture
    // const profilePicUrl = `https://storage.googleapis.com/${bucket.name}/${profilePicFileName}`;

    // Insert user data into the database
    const query = `
      INSERT INTO Users (first_name, last_name, email, password, location, profession, bio, instagram, linkedin, twitter, facebook, profile_pic)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *;
    `;
    const values = [
      firstName,
      lastName,
      email,
      hashedPassword,
      location,
      profession,
      bio,
      instagram,
      linkedin,
      twitter,
      facebook,
      profilePic, // Add profile picture URL to values array
    ];
    const result = await client.query(query, values);

    console.log("User data inserted:", result.rows[0]);
    res.status(200).json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ success: false, error: "Error registering user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = `
      SELECT * FROM Users
      WHERE email = $1;
    `;
    const result = await client.query(query, [email]);

    if (result.rows.length === 0) {
      // If no user found with the given email
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const user = result.rows[0];

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // If password does not match
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // If email and password match, return user data
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, error: "Error logging in" });
  }
});

app.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  try {
    // Query to fetch user from the database by ID
    const query = `
      SELECT * FROM Users
      WHERE user_id = $1;
    `;

    const result = await client.query(query, [userId]);

    if (result.rows.length === 0) {
      // If no user found with the given ID
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Return user data
    res.status(200).json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, error: "Error fetching user data" });
  }
});
app.put("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const {
    first_name,
    last_name,
    email,
    location,
    profession,
    bio,
    instagram,
    linkedin,
    twitter,
    facebook,
  } = req.body;
  try {
    const query = `
      UPDATE Users 
      SET first_name = $1, last_name = $2, email = $3, location = $4, 
      profession = $5, bio = $6, instagram = $7, linkedin = $8, twitter = $9, facebook = $10
      WHERE user_id = $11
      RETURNING *;
    `;
    const result = await client.query(query, [
      first_name,
      last_name,
      email,
      location,
      profession,
      bio,
      instagram,
      linkedin,
      twitter,
      facebook,
      userId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const updatedUserData = result.rows[0];
    res.status(200).json({ success: true, user: updatedUserData });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ success: false, error: "Error updating user data" });
  }
});

app.post("/new-advertisement", upload.array("images"), async (req, res) => {
  console.log("sent");
  const { user_id, title, description, category, location } = req.body;
  const images = req.files;

  try {
    const bucket = admin.storage().bucket();
    const imageUrls = [];

    // Upload each image to Firebase Storage and get the signed URL
    for (const image of images) {
      const imageFileName = `${image.originalname}`;
      const file = bucket.file(imageFileName);
      const stream = file.createWriteStream({
        metadata: {
          contentType: image.mimetype,
        },
        resumable: false,
      });

      stream.on("error", (error) => {
        console.error("Error uploading image to Firebase:", error);
        throw error;
      });

      stream.on("finish", async () => {
        console.log("Image uploaded to Firebase");

        // Generate signed URL for the uploaded image
        const signedUrl = await file.getSignedUrl({
          action: "read",
          expires: "03-25-2025", // Set expiration date/time for the signed URL
        });

        // Push the signed URL to the array
        imageUrls.push(signedUrl[0]);

        // If all images are uploaded, insert advertisement data into PostgreSQL database
        if (imageUrls.length === images.length) {
          try {
            // Insert advertisement details into advertisements table
            const advertisementQuery = `
              INSERT INTO advertisements (user_id, title, description, category,location)
              VALUES ($1, $2, $3, $4,$5)
              RETURNING id;
            `;
            const advertisementValues = [
              user_id,
              title,
              description,
              category,
              location,
            ];
            const advertisementResult = await client.query(
              advertisementQuery,
              advertisementValues
            );
            const advertisementId = advertisementResult.rows[0].id;

            // Insert signed URLs into advertisement_images table
            for (const imageUrl of imageUrls) {
              const imageQuery = `
                INSERT INTO advertisement_images (advertisement_id, image)
                VALUES ($1, $2);
              `;
              const imageValues = [advertisementId, imageUrl];
              await client.query(imageQuery, imageValues);
            }

            console.log("Advertisement successfully created");
            res.status(200).json({
              success: true,
              message: "Advertisement successfully created",
              imageUrls: imageUrls,
            });
          } catch (error) {
            console.error("Error creating advertisement:", error.message);
            res
              .status(500)
              .json({ success: false, error: "Error creating advertisement" });
          }
        }
      });

      // Pipe the image data to the Firebase storage
      stream.end(image.buffer);
    }
  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
    res
      .status(500)
      .json({ success: false, error: "Error uploading image to Firebase" });
  }
});
app.post("/advertisements", async (req, res) => {
  console.log("sent");
  try {
    // Extracts the user ID, location, and category from the request body
    const { userId, location, category } = req.body;
    console.log(userId, location, category);

    // Base query to fetch advertisements except the one with the current user's ID
    let query = `
      SELECT 
        a.*, 
        u.first_name AS user_first_name,
        u.last_name AS user_last_name,
        u.profession AS profession,
        u.profile_pic,
        u.jobs_completed,
        u.rating,
        u.date_joined,
        json_agg(json_build_object('image_id', ai.id, 'image_url', ai.image)) AS images
      FROM 
        advertisements a
      LEFT JOIN 
        advertisement_images ai ON a.id = ai.advertisement_id
      LEFT JOIN
        users u ON a.user_id = u.user_id
      WHERE
        a.user_id != $1
    `;

    // Array to hold query parameters
    let queryParams = ["1"];

    // If location is passed, add it to the query
    if (location) {
      query += ` AND a.location = $${queryParams.length + 1}`;
      queryParams.push(location);
    }

    // If category is passed, add it to the query
    if (category) {
      query += ` AND a.category = $${queryParams.length + 1}`;
      queryParams.push(category);
    }

    query += `
      GROUP BY 
        a.id, u.first_name, u.last_name, u.profession, u.profile_pic, u.jobs_completed, u.rating, u.date_joined;
    `;

    const result = await client.query(query, queryParams);

    // Return the array of advertisement objects
    res.status(200).json({ success: true, advertisements: result.rows });
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching advertisements" });
  }
});

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Started on the port ${port}`);
});

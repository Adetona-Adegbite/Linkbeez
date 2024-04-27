const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const pg = require("pg");
const admin = require("firebase-admin");
const serviceAccount = require("./confidential/linkbeez-f317f-firebase-adminsdk-7srxv-aa31bfd801.json");
const multer = require("multer");

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
  const { user_id, title, description, category } = req.body;
  // console.log(req.bo?Sdy.images);
  const images = req.files; // Uploaded images are stored in req.files
  console.log(images);
  try {
    // Insert advertisement details into advertisements table
    const advertisementQuery = `
      INSERT INTO advertisements (user_id, title, description, category)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
    const advertisementValues = [user_id, title, description, category];
    const advertisementResult = await client.query(
      advertisementQuery,
      advertisementValues
    );
    const advertisementId = advertisementResult.rows[0].id;

    const bucket = admin.storage().bucket();

    const imageUrls = [];

    // Upload each image to Firebase Storage and get the download URL
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

        // Get the public URL of the uploaded image
        const imageUrl = `https://storage.googleapis.com/${bucket.name}/${imageFileName}`;
        imageUrls.push(imageUrl);

        // If all images are uploaded, insert advertisement data into PostgreSQL database
        if (imageUrls.length === images.length) {
          try {
            // Insert advertisement details into advertisements table
            const advertisementQuery = `
              INSERT INTO advertisements (user_id, title, description, category)
              VALUES ($1, $2, $3, $4)
              RETURNING id;
            `;
            const advertisementValues = [user_id, title, description, category];
            const advertisementResult = await client.query(
              advertisementQuery,
              advertisementValues
            );
            const advertisementId = advertisementResult.rows[0].id;

            // Insert image URLs into advertisement_images table
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

app.listen(5000, () => {
  console.log("Started");
});

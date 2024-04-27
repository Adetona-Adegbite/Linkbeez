const [data, setData] = useState([
  [
    { name: "Music Producers" },
    { name: "Sound Setup" },
    { name: "Mix and Mastering Engineers" },
  ],
  [{ name: "Electrician" }, { name: "Manger" }, { name: "Musiian" }],
  // Add more pages of data if needed
]);
const renderItem = ({ item }) => (
  <Grid style={{ width: "90%", marginLeft: "5%" }}>
    <Row size={10}>
      {item.map((category) => (
        <Col key={category.name} style={styles.gridItem}>
          <View style={styles.category}>
            <Pressable
              onPress={() => {
                navigation.navigate("Category", {
                  category: category,
                });
              }}
              style={{ flex: 1 }}
            >
              <Icon name="h" size={24} />
            </Pressable>
          </View>
          <Text style={styles.gridText}>{category.name}</Text>
        </Col>
      ))}
    </Row>

    {/* Add another Row component here */}
    <Row size={10}>
      {item.map((category) => (
        <Col key={category.name + "1"} style={styles.gridItem}>
          <View style={styles.category}>
            <Pressable
              onPress={() => {
                navigation.navigate("Category", {
                  category: category,
                });
              }}
              style={{ flex: 1 }}
            >
              <Icon size={24} name="h" />
            </Pressable>
          </View>
          <Text style={styles.gridText}>{category.name}</Text>
        </Col>
      ))}
    </Row>
  </Grid>
);
<View style={{ height: 240 }}>
  <Carousel
    data={data}
    renderItem={renderItem}
    sliderWidth={screenWidth}
    itemWidth={screenWidth}
  />
</View>;
// const productionItems = [
//   {
//     category: "Music Production",
//     items: [
//       "Music producers/session booking",
//       "Mix and mastering engineers",
//       "Backup artists/choirs",
//     ],
//   },
//   {
//     category: "Live Performance",
//     items: [
//       "Sound setup/engineers for shows",
//       "Lighting engineers for shows",
//       "Guitarist",
//       "Keyboardist",
//       "Saxophonists",
//       "Trumpeters",
//     ],
//   },
//   {
//     category: "Video Production",
//     items: [
//       "Video directors",
//       "Photographers",
//       "Artwork/graphic designers",
//       "Film location providers",
//       "Set designs",
//       "Props and extras",
//       "Camera handler",
//       "Hairdressers/barbers for shoots",
//       "Video editors",
//     ],
//   },
//   {
//     category: "Logistics & Rentals",
//     items: [
//       "Studio setup/padding",
//       "Studio booking",
//       "Rehearsal studio booking",
//       "Audio event coverage",
//       "Video event coverage",
//       "Studio equipment rentals",
//       "Sound equipment rental",
//       "Video equipment/camera renters",
//       "Speaker renter",
//       "Light renter",
//       "Sound renter",
//     ],
//   },
// ];

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Platform,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import AntDesign from "react-native-vector-icons/AntDesign";
import Title from "../components/App-Name";
import {
  useFonts,
  NanumGothic_400Regular,
  NanumGothic_700Bold,
} from "@expo-google-fonts/nanum-gothic";
import { Col, Row, Grid } from "react-native-easy-grid";
import Carousel from "react-native-snap-carousel";
import AdsCard from "../components/AdsCard";
import RecentlyViewedCarousel from "../components/TwoPerViewCard";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Menu, Searchbar } from "react-native-paper";

const Home = () => {
  // useEffect(() => {
  //   async function getUserId() {
  //     const userId = await AsyncStorage.getItem("user-id");
  //     console.log(userId);
  //   }
  //   getUserId();
  // }, []);
  const [fontLoaded] = useFonts({
    NanumGothic_400Regular,
    NanumGothic_700Bold,
  });
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [data, setData] = useState([
    [
      { name: "Music Producers", icon: "headphones" },
      { name: "Songwriters", icon: "microphone" },
      { name: "Dancers", icon: "female" },
    ],
    [
      { name: "Photographers", icon: "camera" },
      { name: "Managers", icon: "briefcase" },
      { name: "Musician", icon: "music" },
    ],
    // Add more pages of data if needed
  ]);
  const [advertisements, setAdvertisements] = useState([]);
  // const renderItem = ({ item }) => (
  //   <Grid style={{ paddingHorizontal: 20 }}>
  //     <Row size={50}>
  //       {item.slice(0, 7).map((category, index) => (
  //         <>
  //           <Col key={index} style={styles.gridItem}>
  //             <View style={styles.category}>
  //               <Pressable
  //                 onPress={() => {
  //                   navigation.navigate("Category", {
  //                     category: category,
  //                   });
  //                 }}
  //                 style={{ flex: 1 }}
  //               >
  //                 <Icon name="h" size={24} />
  //               </Pressable>
  //             </View>
  //             <Text style={styles.gridText}>{category.name}</Text>
  //           </Col>
  //           <Col key={index} style={styles.gridItem}>
  //             <View style={styles.category}>
  //               <Pressable
  //                 onPress={() => {
  //                   navigation.navigate("Category", {
  //                     category: category,
  //                   });
  //                 }}
  //                 style={{ flex: 1 }}
  //               >
  //                 <Icon name="h" size={24} />
  //               </Pressable>
  //             </View>
  //             <Text style={styles.gridText}>{category.name}</Text>
  //           </Col>
  //         </>
  //       ))}
  //     </Row>
  //     {/* <Row size={50}>
  //       {item.slice(3, 6).map((category, index) => (

  //       ))}
  //     </Row> */}
  //   </Grid>
  // );

  const carouselItems = [
    { id: 1, content: "Item 1", color: "blue" },
    { id: 2, content: "Item 2", color: "red" },
    { id: 3, content: "Item 3", color: "green" },
    // Add more items as needed
  ];
  const navigation = useNavigation();
  const [groupedAds, setGroupedAds] = useState({});
  const [recentlyJoinedAds, setRecentlyJoinedAds] = useState([]);
  const [topRatedAds, setTopRatedAds] = useState([]);
  const [mostExperiencedAds, setMostExperiencedAds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataFecthed, setDataFetched] = useState(false);
  const [dataGrouped, setDataGrouped] = useState(false);
  const [loading, setLoading] = useState(false);
  function handleSearch() {
    if (searchQuery !== "") {
      navigation.navigate("Search Results", { query: searchQuery });
      setSearchQuery("");
    }
  }
  useEffect(() => {
    // Group advertisements by category
    const groupAdsByCategory = () => {
      const groupedAdsData = {};
      advertisements.forEach((ad) => {
        if (!groupedAdsData[ad.category]) {
          groupedAdsData[ad.category] = [];
        }
        groupedAdsData[ad.category].push(ad);
      });
      setGroupedAds(groupedAdsData);
      // console.log(groupedAdsData);
    };

    // Find recently joined ads
    const findRecentlyJoinedAds = () => {
      const sortedAds = [...advertisements].sort(
        (a, b) => new Date(b.date_joined) - new Date(a.date_joined)
      );
      setRecentlyJoinedAds(sortedAds.slice(0, 10));
    };

    // Find top-rated ads
    const findTopRatedAds = () => {
      const ratedAds = advertisements
        .filter((ad) => ad.rating !== null)
        .sort((a, b) => b.rating - a.rating);
      setTopRatedAds(ratedAds);
      // console.log(ratedAds);
    };

    // Find most experienced ads
    const findMostExperiencedAds = () => {
      const experiencedAds = advertisements
        .filter((ad) => ad.jobs_completed !== null)
        .sort((a, b) => b.jobs_completed - a.jobs_completed);
      setMostExperiencedAds(experiencedAds);
    };
    // console.log(dataFecthed);
    // Call the functions to set state
    if (dataFecthed) {
      groupAdsByCategory();
      findRecentlyJoinedAds();
      findTopRatedAds();
      findMostExperiencedAds();
      setDataGrouped(true);
      setLoading(false);
    }
  }, [advertisements, dataFecthed]);
  const [selectedLocation, setSelectedLocation] = useState("Lagos");

  useEffect(() => {
    async function getAllAds() {
      const userId = await AsyncStorage.getItem("user-id");
      console.log(userId);
      try {
        setLoading(true);
        const response = await fetch("http://172.20.10.4:5000/advertisements", {
          method: "POST", // Specify the HTTP method
          headers: {
            "Content-Type": "application/json", // Specify the content type
          },
          body: JSON.stringify({ userId: userId, location: selectedLocation }), // Convert the body to JSON format
        });
        if (!response.ok) {
          throw new Error("Failed to fetch advertisements");
        }
        const data = await response.json();
        setAdvertisements(data.advertisements);
        setDataFetched(true);
        // console.log("Done");
      } catch (error) {
        console.error("Error fetching advertisements:", error);
        // Handle error if needed
      }
    }
    getAllAds();
  }, [selectedLocation]);
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    closeMenu();
  };
  return (
    <>
      {fontLoaded && !loading ? (
        <SafeAreaView
          contentContainerStyle={styles.pageContainer}
          style={styles.page}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContentContainer}
            style={styles.scrollView}
          >
            <View style={styles.header}>
              <Title />
            </View>
            <View style={styles.address_favorites}>
              <View style={styles.location}>
                <FontAwesome6 color="#08A87E" size={23} name="location-dot" />
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  contentStyle={{
                    backgroundColor: "#fffffa",
                    position: "relative",
                    top: "6%",
                    borderBottomEndRadius: 10,
                  }}
                  anchor={
                    <Text
                      style={[
                        styles.text,
                        { color: "#08A87E", marginLeft: 5, marginRight: 3 },
                      ]}
                      onPress={openMenu}
                    >
                      {selectedLocation}
                    </Text>
                  }
                >
                  <Menu.Item
                    onPress={() => handleLocationSelect("Lagos")}
                    title="Lagos"
                  />
                  <Menu.Item
                    onPress={() => handleLocationSelect("Abuja")}
                    title="Abuja"
                  />
                  <Menu.Item
                    onPress={() => handleLocationSelect("Kano")}
                    title="Kano"
                  />
                  <Menu.Item
                    onPress={() => handleLocationSelect("Ibadan")}
                    title="Ibadan"
                  />
                  <Menu.Item
                    onPress={() => handleLocationSelect("New York")}
                    title="New York"
                  />
                  <Menu.Item
                    onPress={() => handleLocationSelect("London")}
                    title="London"
                  />
                  <Menu.Item
                    onPress={() => handleLocationSelect("Sydney")}
                    title="Sydney"
                  />
                  {/* Add more Menu.Item components for other location options */}
                </Menu>
                <AntDesign onPress={openMenu} color="#08A87E" name="down" />
              </View>
              <AntDesign
                onPress={() => {
                  navigation.navigate("Saved");
                }}
                size={30}
                name="hearto"
              />
            </View>
            {/* <View style={styles.search_box}> */}
            <Searchbar
              placeholder="Search LinkBEEZ"
              onChangeText={setSearchQuery}
              style={styles.searchInputContainer}
              placeholderTextColor={"rgba(0,0,0,0.1)"}
              value={searchQuery}
              keyboardType="web-search"
              icon="magnify"
              iconColor="#000"
            />
            {/* <Icon
                style={{ marginRight: 12 }}
                name="search"
                size={20}
                color="#000"
              />
              <TextInput
                style={styles.searchInputContainer}
                placeholder="Search LinkBEEZ"
                keyboardType="web-search"
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                }}
                onSubmitEditing={handleSearch}
              /> */}
            {/* </View> */}
            <Grid style={{ paddingHorizontal: 20, marginTop: 20 }}>
              {data &&
                data.map((rowData, rowIndex) => (
                  <Row key={rowIndex} size={50}>
                    {rowData.map((category, columnIndex) => (
                      <Col key={columnIndex} style={styles.gridItem}>
                        <View style={styles.category}>
                          <Pressable
                            onPress={() => {
                              navigation.navigate("Results", {
                                category: category.name,
                              });
                            }}
                            style={{
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Icon
                              color="#08A87E"
                              name={category.icon}
                              size={24}
                            />
                          </Pressable>
                        </View>
                        <Text style={styles.gridText}>{category.name}</Text>
                      </Col>
                    ))}
                  </Row>
                ))}
            </Grid>
            <Pressable
              style={{
                alignSelf: "center",
                padding: 15,
                marginVertical: 10,
                borderRadius: 8,
              }}
              onPress={() => {
                navigation.navigate("Categories");
              }}
            >
              <Text style={{ color: "#08A87E" }}> See All Categories </Text>
            </Pressable>
            <View style={styles.container}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: Dimensions.get("window").width,
                  marginBottom: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 10,

                  backgroundColor: "#08A87E",
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    marginRight: 10,
                    fontFamily: "NanumGothic_700Bold",
                  }}
                >
                  FEATURED
                </Text>
              </View>

              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={styles.carousel}
              >
                {advertisements.map((item) => (
                  <AdsCard
                    profile_pic={item.profile_pic}
                    image={item.images[0].image_url}
                    key={item.id}
                    item={item}
                  />
                ))}
              </ScrollView>
            </View>
            {/* <RecentlyViewedCarousel title="Recently Viewed" /> */}
            {dataGrouped &&
              Object.keys(groupedAds).map((category, index) => (
                <RecentlyViewedCarousel
                  key={index}
                  data={groupedAds[category]}
                  title={`Most Popular in ${category}`}
                />
              ))}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#08A87E" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
    </>
  );
};
export default Home;
const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fffffa",
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 60,
  },
  pageContainer: {
    alignItems: "center",
    paddingVertical: 45,
  },
  header: {
    alignSelf: "flex-start",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: "NanumGothic_400Regular",
  },
  address_favorites: {
    width: "100%",
    marginTop: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    height: 30,
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  location: {
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
  },
  search_box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "90%",
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    paddingLeft: 10,
    borderRadius: 40,
    marginHorizontal: "5%",

    // For Android:
    elevation: 5,
    // For iOS:
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 3.84,
    marginBottom: 5,
  },
  searchInputContainer: {
    flex: 1,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#fffffa",
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
  },
  categoriesContainer: {
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  category: {
    borderRadius: 50,
    // borderWidth: 1,
    backgroundColor: "#fffffa",
    // borderColor: "black",
    height: "100%",
    width: "55%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  gridItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 2,
  },
  gridText: {
    fontSize: 13,
    fontFamily: "NanumGothic_700Bold",
    fontWeight: "500",
  },
  ads: {
    width: "100%",
    height: "22%",
    backgroundColor: "#ccc",
  },
  container: {
    height: 180,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
  },
  carousel: {
    flexDirection: "row",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#08A87E",
  },
});

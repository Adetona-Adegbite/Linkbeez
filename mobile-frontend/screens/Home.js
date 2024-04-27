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
    [{ name: "Music Producers" }, { name: "Songwriters" }, { name: "Dancers" }],
    [{ name: "Photographers" }, { name: "Managers" }, { name: "Musician" }],
    // Add more pages of data if needed
  ]);
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

  const [searchQuery, setSearchQuery] = useState("");
  function handleSearch() {
    if (searchQuery !== "") {
      navigation.navigate("Search Results", { query: searchQuery });
      setSearchQuery("");
    }
  }
  return (
    <>
      {fontLoaded && (
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
                <Text
                  style={[
                    styles.text,
                    {
                      marginLeft: 5,
                      fontSize: 14,
                      marginRight: 5,
                      color: "#08A87E",
                      fontWeight: "bold",
                    },
                  ]}
                >
                  Lagos, Nigeria
                </Text>
                <AntDesign color="#08A87E" name="down" />
              </View>
              <AntDesign
                onPress={() => {
                  navigation.navigate("Saved");
                }}
                size={30}
                name="hearto"
              />
            </View>
            <View style={styles.search_box}>
              <Icon
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
              />
            </View>
            <Grid style={{ paddingHorizontal: 20, marginTop: 20 }}>
              {data.map((rowData, rowIndex) => (
                <Row key={rowIndex} size={50}>
                  {rowData.map((category, columnIndex) => (
                    <Col key={columnIndex} style={styles.gridItem}>
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
                {carouselItems.map((item) => (
                  <AdsCard key={item.id} />
                ))}
              </ScrollView>
            </View>
            <RecentlyViewedCarousel title="Recently Viewed" />
            <RecentlyViewedCarousel title="Most Popular in Music Production" />
            <RecentlyViewedCarousel title="Most Popular in Live Performances" />
            <RecentlyViewedCarousel title="Most Popular in Video Production" />
            <RecentlyViewedCarousel title="Recently Joined" />
          </ScrollView>
        </SafeAreaView>
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
  },
  categoriesContainer: {
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  category: {
    borderRadius: 50,
    // borderWidth: 1,
    backgroundColor: "#D9D9D9",
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
});

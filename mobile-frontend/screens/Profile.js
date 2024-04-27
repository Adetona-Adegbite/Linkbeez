import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LinearGradient } from "expo-linear-gradient";
import SmallButton from "../components/SmallButton";
import PostCard from "../components/PostCard";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState(0);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const checkUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem("user-id");
        if (!userId) {
          navigation.navigate("login");
        } else {
          getUserData();
        }
      } catch (error) {
        console.error("Error checking user ID:", error);
      }
    };
    checkUserId();
  }, [navigation]);

  const onRefresh = () => {
    setRefreshing(true);
    getUserData();
    setRefreshing(false);
  };

  const getUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem("user-id");
      const response = await fetch(`http://172.20.10.2:5000/user/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserData(data.user);
      setError(null);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data");
    }
  };

  return (
    <LinearGradient
      colors={["#1DDFAB", "#023829"]}
      style={styles.linearGradient}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : userData ? (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.header}>Profile</Text>
              <Icon
                onPress={() => {
                  navigation.navigate("Settings");
                }}
                name="gear"
                size={36}
              />
            </View>
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "rgba(255,255,255,0.9)",
                marginBottom: 30,
                marginTop: 10,
              }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <View>
                <Text
                  style={[
                    styles.boldText,
                    {
                      fontSize: 30,
                      fontWeight: "bold",
                    },
                  ]}
                >
                  {userData.last_name}
                </Text>
                <Text
                  style={[
                    styles.regText,
                    {
                      fontSize: 26,
                      marginBottom: 20,
                    },
                  ]}
                >
                  {userData.first_name}
                </Text>
              </View>
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${userData.profile_pic}`,
                }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            </View>

            <View style={styles.profLoc}>
              <Text
                style={[styles.boldText, { fontWeight: "bold", fontSize: 16 }]}
              >
                {userData.profession}
              </Text>
              <Text
                style={[styles.boldText, { fontWeight: "bold", fontSize: 16 }]}
              >
                {userData.location}
              </Text>
            </View>
            <View style={styles.ratJob}>
              <View>
                <Text
                  style={[
                    styles.boldText,
                    { textAlign: "center", fontSize: 30, fontWeight: "bold" },
                  ]}
                >
                  0<Text style={{ fontSize: 20 }}>.0</Text>
                </Text>
                <Text
                  style={[
                    styles.regText,
                    { textAlign: "center", fontSize: 18 },
                  ]}
                >
                  Ratings
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    styles.boldText,
                    { textAlign: "center", fontSize: 30, fontWeight: "bold" },
                  ]}
                >
                  000
                </Text>
                <Text style={[styles.regText, { textAlign: "center" }]}>
                  Jobs Completed
                </Text>
              </View>
            </View>
            <View
              style={{
                marginVertical: 20,
                flexDirection: "row",
                justifyContent: "space-around",
                alignSelf: "center",
                gap: "80%",
              }}
            >
              <SmallButton
                onPress={() => {
                  navigation.navigate("Edit-Profile");
                }}
                title="Edit Profile"
              />
              <SmallButton title="Share Profile" />
            </View>

            <View style={styles.socials}>
              <Text style={styles.regText}>{userData.instagram}</Text>
              <Text style={styles.regText}>{userData.linkedin}</Text>
              <Text style={styles.regText}>{userData.twitter}</Text>
              <Text style={styles.regText}>{userData.facebook}</Text>
            </View>
            <View style={styles.about}>
              <Text
                style={[
                  styles.boldText,
                  { fontSize: 30, fontWeight: "bold", marginBottom: 10 },
                ]}
              >
                About
              </Text>
              <Text style={[styles.regText]}>{userData.bio}</Text>
            </View>
            <View style={styles.postMenu}>
              <Pressable
                onPress={() => {
                  setPosts(0);
                }}
              >
                <Text
                  style={[
                    styles.boldText,
                    posts === 0
                      ? {
                          fontSize: 24,
                          textDecorationColor: "white",
                          textDecorationLine: "underline",
                          borderBottomColor: "white",
                          borderBottomWidth: 2,
                        }
                      : { fontSize: 24 },
                  ]}
                >
                  Ads
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setPosts(1);
                }}
              >
                <Text
                  style={[
                    styles.boldText,
                    posts === 1
                      ? {
                          fontSize: 24,
                          textDecorationColor: "white",
                          textDecorationLine: "underline",
                          borderBottomColor: "white",
                          borderBottomWidth: 2,
                        }
                      : { fontSize: 24 },
                  ]}
                >
                  Posts
                </Text>
              </Pressable>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
            </View>
          </>
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingHorizontal: 35,
    paddingTop: 60,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    fontSize: 32,
    fontFamily: "NanumGothic_400Regular",
    marginBottom: 0,
  },
  boldText: {
    fontFamily: "NanumGothic_700Bold",
    color: "white",
  },
  regText: {
    fontFamily: "NanumGothic_400Regular",
    color: "white",
  },
  profLoc: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    gap: "70%",
    marginBottom: 35,
  },
  ratJob: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "100%",
    alignSelf: "center",
  },
  socials: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  postMenu: {
    flexDirection: "row",
    alignSelf: "center",
    gap: "100%",
  },
  about: {
    marginVertical: 30,
  },
  errorText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  loadingText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

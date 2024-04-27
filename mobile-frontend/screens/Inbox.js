import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ChatCard from "../components/ChatCard";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Inbox() {
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem("user-id");
        if (!userId) {
          // If userId does not exist, navigate to the register page
          navigation.navigate("login");
        } else {
          //
        }
      } catch (error) {
        console.error("Error checking user ID:", error);
        // Handle error if needed
      }
    };

    // Call the function to check userId when component mounts
    checkUserId();
  }, [navigation]);
  return (
    <SafeAreaView style={styles.page}>
      <Text style={[styles.regText, styles.header]}>Inbox</Text>
      <View
        style={{
          width: "100%",
          height: 5,
          backgroundColor: "rgba(8,168,126,0.2)",
          marginVertical: 10,
        }}
      ></View>
      <View style={styles.menuBar}>
        <Pressable
          onPress={() => {
            setPage(1);
          }}
        >
          <Text
            style={
              ([styles.regText],
              page == 1
                ? { fontSize: 22, color: "#08A87E" }
                : { fontSize: 22, color: "gray" })
            }
          >
            Primary
          </Text>
        </Pressable>
        <Text style={{ fontSize: 18 }}>|</Text>
        <Pressable
          onPress={() => {
            setPage(2);
          }}
        >
          <Text
            style={
              ([styles.regText],
              page == 2
                ? { fontSize: 22, color: "#08A87E" }
                : { fontSize: 22, color: "gray" })
            }
          >
            Community
          </Text>
        </Pressable>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginHorizontal: 30,
  },
  regText: {
    fontFamily: "NanumGothic_400Regular",
  },
  header: {
    fontSize: 36,
  },
  menuBar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
});

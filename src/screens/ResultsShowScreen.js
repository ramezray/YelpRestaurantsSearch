import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import yelp from "../api/yelp";

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam("id");

  const getResult = async id => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }
  let address = result.location.display_address;
  address = address.join(",");
  console.log(address);

  return (
    <View style={styles.view}>
      <Text style={styles.name}>{result.name}</Text>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            `google.navigation:q=${result.coordinates.latitude} + ${result.coordinates.longitude}`
          )
        }
      >
        <Text>
          {console.log(result.location.display_address)}
          Visit Us: <Text style={styles.address}>{address}</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(`tel:${result.display_phone}`);
        }}
      >
        <Text>Call Us: {result.display_phone}</Text>
      </TouchableOpacity>

      <FlatList
        data={result.photos}
        keyExtractor={photo => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5
  },
  view: { alignItems: "center" },
  name: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: "bold"
  },
  address: {
    color: "blue"
  }
});
export default ResultsShowScreen;

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { FireSQL } from "firesql";
import firebase from "firebase/app";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

export default function Search(props) {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (search) {
      fireSQL
        .query(`SELECT * FROM cities WHERE name LIKE '${search}%'`)
        .then((response) => {
          setCities(response);
          console.log(cities)
        });
    }
  }, [search]);

  return (
    <View>
      <SearchBar
        placeholder="Ingrese el nombre de la ciudad"
        onChangeText={(e) => setSearch(e)}
        value={search}
        containerStyle={styles.searchBar}
        lightTheme={true}
        round={true}
      />
      {cities.length === 0 ? (
        <NoFoundCities />
      ) : (
        <FlatList
          data={cities}
          renderItem={(city) => <City city={city} navigation={navigation} />}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

function NoFoundCities() {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>No hay coincidencias</Text>
    </View>
  );
}

function City(props) {
  const { city, navigation } = props;
  const { name, id } = city.item;
  const showCity = () => {
    navigation.navigate("city", { id, name });
  };

  return (
    <TouchableOpacity onPress={showCity}>
      <View style={{ alignItems: "center", margin: 10 }}>
        <Text style={{ fontSize: 30 }}>{name} </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 20,
    backgroundColor: "#9adbb3",
    opacity: 0.7,
  },
});

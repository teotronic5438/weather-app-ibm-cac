import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import ListCities from "../../components/Cities/ListCities";

const db = firebase.firestore(firebaseApp);

export default function Cities() {
  const [cities, setCities] = useState([]);
  const [totalCities, setTotalCities] = useState(0);
  // const [reload, setReload] = useState(false);

  useFocusEffect(
    useCallback(() => {
      db.collection("cities")
        .get()
        .then((snap) => {
          setTotalCities(snap.size);
        });

      const resultCities = [];

      db.collection("cities")
        .orderBy("name", "asc")
        .get()
        .then((response) => {
          response.forEach((doc) => {
            const city = doc.data();
            city.id = doc.id;
            resultCities.push(city);
          });
          setCities(resultCities);
          // setReload(!reload);
        });
      // }, [reload]) dejar este o el de abajo
    }, [])
  );

  return (
    <ScrollView>
      <ListCities cities={cities} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

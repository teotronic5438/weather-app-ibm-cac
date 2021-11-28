import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { Input, Button } from "react-native-elements";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import Loading from "../Loading";

const db = firebase.firestore(firebaseApp);

export default function AddCityForm(props) {
  const { setShowModal, setLocationCity } = props;

  const [location, setLocation] = useState(null);
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const resultPermission =
        await Location.requestForegroundPermissionsAsync();
      const statusPermission = resultPermission.status;
      if (statusPermission !== "granted") {
        ToastAndroid.show(
          "Permisos necesarios",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      } else {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
      }
    })();
  }, []);

  const saveUbication = async () => {
    await Promise.all(
      db.collection("cities").add({
        name: cityName,
        latitude: location.latitude,
        longitude: location.longitude,
      })
    );

  };

  const onSubmit = async () => {
    if (!cityName) {
      ToastAndroid.show(
        "Ingrese el nombre del lugar",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      setLoading(true);
      setLocationCity(location);
      await saveUbication();
      setLoading(false);
      setShowModal(false);
    }
  };

  if (!location) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator style={styles.spinner} size="large" color="#9adbb3" />
      </View>
    );
  }

  return (
    <View style={styles.view}>
      {location && (
        <>
          <View style={styles.viewTitleSearch}>
            <Text style={styles.textTitleSearch}>
              Desplace el marcador hasta la ubicación
            </Text>
          </View>
          <MapView
            style={styles.mapStyle}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={(region) => setLocation(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            />
          </MapView>
          <View style={styles.cssSearch}>
            <Input
              placeholder="Nombre del lugar"
              containerStyle={styles.input}
              onChange={(e) => setCityName(e.nativeEvent.text)}
            />
          </View>
          <View style={styles.viewMapBtn}>
            <Button
              title="CANCELAR"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.btnCancel}
              onPress={() => setShowModal(false)}
            />
            <Button
              title="GUARDAR"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.btnSave}
              onPress={onSubmit}
            />
          </View>
        </>
      )}

    {
      loading
      &&
      <Loading isVisible={loading} text='Agregando ciudad' />
    }
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    height: "auto",
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
  },
  btnContainer: {
    paddingRight: 10,
    paddingTop: 5,
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  btnSave: {
    backgroundColor: "#55828B",
    borderRadius: 10,
  },
  btnCancel: {
    backgroundColor: "#BA3B46",
    borderRadius: 10,
  },
  mapStyle: {
    width: "100%",
    height: 300,
  },
  cssSearch: {
    height: 50,
    width: "100%",
    marginTop: 15,
  },
  viewTitleSearch: {
    margin: 5,
  },
  textTitleSearch: {
    color: "#9adbb3",
    fontWeight: "bold",
    fontSize: 15,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  spinnerContainer: {
    paddingVertical: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  }
});

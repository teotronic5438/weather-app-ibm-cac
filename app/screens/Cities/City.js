import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import Loading from "../../components/Loading";
import Map from "../../components/Map";
import Weather from "../../components/Weather";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import DeleteCityModal from "../../components/Cities/DeleteCityModal";
import Modal from "../../components/Modal";

const db = firebase.firestore(firebaseApp);

export default function City(props) {
  const { navigation, route } = props;
  const { id, name } = route.params;
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  useEffect(() => {
    db.collection("cities")
      .doc(id)
      .get()
      .then((response) => {
        const data = response.data();
        data.id = response.id;
        setCity(data);
      });
  }, []);

  if (!city) return <Loading isVisible={true} text="Cargando" />;

  return (
    <ScrollView>
      <View style={styles.viewCityName}>
        <Text style={styles.cityName}>{city.name}</Text>
      </View>
      <Weather latitude={city.latitude} longitude={city.longitude} />
      <View style={{ marginHorizontal: 5 }}>
        <Map name={city,name} latitude={city.latitude} longitude={city.longitude} height={250} />
      </View>
      <DeleteCity id={city.id} navigation={navigation} setLoading={setLoading} />

      {
        loading
        &&
        <Loading isVisible={loading} text='Eliminando ciudad' />
      }
    </ScrollView>
  );
}


function DeleteCity(props) {
  const { id, navigation, setLoading } = props;
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const removeCity = async () => {
    setLoading(true);
    db.collection("cities")
      .doc(id)
      .delete()
      .then(() => {
        setLoading(false);
        navigation.navigate("home");
      })
      .catch(() => {
        console.log("Ocurrió un problema al eliminar la ciudad.");
      });
  };

  return (
    <TouchableOpacity onPress={() => {
      setRenderComponent(
        <DeleteCityModal
          setShowModal={setShowModal}
          removeCity={removeCity}
        />
      );
      setShowModal(true);
    }}
    >
      <View style={styles.deleteContainer}>
        <Icon
          type="material-community"
          name="trash-can-outline"
          color="#BA3B46"
          size={40}
        />
      </View>
      {renderComponent && (
        <Modal isVisible={showModal} setIsVisible={setShowModal}>
          {renderComponent}
        </Modal>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  viewCityName: {
    backgroundColor: '#9adbb3',
    paddingTop: 15,
    alignItems: "center",
  },
  cityName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
  },
  deleteContainer: {
    paddingVertical: 10,
  }
});

import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { useIsFocused } from "@react-navigation/core";
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseApp } from '../../utils/firebase';
import Modal from "../../components/Modal";
import About from "../../components/About";
import AddCityForm from "../../components/Cities/AddCityForm";
import Loading from '../../components/Loading';
import { Input } from "react-native-elements/dist/input/Input";
import ListCities from "../../components/Cities/ListCities";
const db = firebase.firestore(firebaseApp);

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [locationCity, setLocationCity] = useState(null);
  const [cities, setCities] = useState(null);
  const [filteredCities, setFilteredCities] = useState(null);
  const [loadingCities, setLoadingCities] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    // Hace un fetch a firestore de las ciudades guardadas
    
    setLoadingCities(true);
    if (isFocused) {
      db.collection('cities').get().then((response) => {
        let citiesArray = [];
        response.forEach((doc) => {
          let city = {
            ...doc.data(),
            id: doc.id
          }
          citiesArray = [...citiesArray, city]
        });
        setLoadingCities(false);
        setFilteredCities(citiesArray);
        setCities(citiesArray);
    });
    }
    
  }, [isFocused, locationCity])

  const handleSearchChange = (e) => {

    // Maneja la búsqueda de ciudades
    const query = e.nativeEvent.text;

    if (query !== '') {
        setFilteredCities(cities.filter(city => {
            return city.name.toLowerCase().includes(query.toLowerCase());
        }));
    } else {
        setFilteredCities(cities);
    }
  }

  return (
    <ScrollView>
      {/* About */}
      <View style={{ alignItems: "flex-end", margin: 10 }}>
        <Icon
          name="help-circle-outline"
          type="material-community"
          color="#9adbb3"
          size={50}
          onPress={() => setIsModalVisible(true)}
        />
      </View>

      {/* Icon */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          name="ice-cream"
          type="material-community"
          color="#9adbb3"
          size={100}
        />
        <Text style={{ fontSize: 100, color: "#9adbb3" }}>°C</Text>
      </View>

      {/* Search */}

      <View style = {styles.searchContainer}>
        <Input
            placeholder='Buscar ciudad'
            rightIcon={{
                type: 'font-awesome',
                name: 'search',
                color: '#bbb'
            }}
            onChange={(e) => handleSearchChange(e)}
        />
      </View>

      {/* Cities */}
      {
        cities === null
        ?
        <Loading isVisible={loadingCities} text='Cargando ciudades' />
        :
        cities.length === 0
        ?
        <Text style={styles.noCitiesText}>No hay ciudades guardadas, ¡agrega una!</Text>
        :
        <ListCities cities={filteredCities} />
      }


      {/* Add city */}
      <View style={{ alignSelf: "center" }}>
        <Icon
          name="plus-circle"
          type="material-community"
          color="#55828B"
          size={75}
          onPress={() => {
            setRenderComponent(
              <AddCityForm
                setShowModal={setShowModal}
                locationCity={locationCity}
                setLocationCity={setLocationCity}
              />
            );
            setShowModal(true);
          }}
        />
      </View>

      {renderComponent && (
        <Modal isVisible={showModal} setIsVisible={setShowModal}>
          {renderComponent}
        </Modal>
      )}

      <About isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cityAddContainer: {
    alignItems: 'flex-end',
    marginRight: 10,
    marginTop: 20,
  },
  cityAddButton: {
    width: 50
  },
  aboutBtnContainer: {
    alignItems: 'flex-end',
    marginRight: 10,
    marginTop: 10
  },
  aboutBtn: {
    backgroundColor: '#333',
    borderRadius: 100,
    height: 40,
    padding: 6,
    width: 40
  },
  searchContainer: {
    marginTop: 40
  },
  noCitiesText: {
  textAlign: 'center',
  marginBottom: 20
  }
})
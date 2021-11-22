import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, ToastAndroid} from "react-native";
import { Input, Button } from "react-native-elements";
import MapView from "react-native-maps"
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import config from "../../../config"

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);


export default function AddCittyForm(props) {
    const {setShowModal, locationCity, setLocationCity} = props;
    const [location, setLocation] = useState(null);
    const [cityName, setCityName] = useState("")
    // console.log(props);

    useEffect(() => {
        (async()=>{
            const resultPermission = await Location.requestForegroundPermissionsAsync();
            // console.log(resultPermission);
            const statusPermission = resultPermission.status;
            if(statusPermission !== "granted"){
                ToastAndroid.show("Tienes que aceptar los permiso de ubicacion para agregar una ciudad.",
                ToastAndroid.LONG,
                ToastAndroid.CENTER)
            } else {
                let loc = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                });
                // console.log("configuraste tu ubicacion actual");
            }
        })()

    }, [])

    const saveUbication = async ()=> {
        await Promise.all(
            db.collection("cities")
            .add({
                name: cityName,
                latitude: location.latitude,
                longitude: location.longitude,
            })
            .then(()=> {
                console.log("informacion cargada exitosamente");
            })
        )

    }

    const onSubmit = () => {
        if(!cityName){
            ToastAndroid.show("El nombre de la ciudad no puede quedar vacio.",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER)
        } else {
            setLocationCity(location)
            saveUbication().then(()=>setShowModal(false))
            
        }
        
    };

    return(
        <View style={styles.view}>

            {location && (
                <>
                    <View style={styles.viewTitleSearch}>
                        <Text style={styles.textTitleSearch}>Desplace el mapa hasta la ciudad elegida</Text>
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
                        {/* <GooglePlacesAutocomplete
                            placeholder='Ingrese la ciudad a Buscar'
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                console.log(data, details);
                            }}
                            query={{
                                key: config.googpleApi,
                                language: 'es',
                            }}
                            enablePoweredByContainer={false}
                            fetchDetails={true}
                            styles={{listView:{height:100}}}
                            style={styles.inputSearch}
                        /> */}
                        <Input
                            placeholder="Nombre de la ciudad"
                            containerStyle={styles.input}
                            onChange={(e) => setCityName(e.nativeEvent.text)}
                        />
                    </View>
                    <View style={styles.viewMapBtn}>
                        <Button
                            title="Cancelar Ciudad"
                            containerStyle={styles.btnContainer}
                            buttonStyle={styles.btnCancel}
                            onPress={() => setShowModal(false)}
                        />
                        <Button
                            title="Agregar Ciudad"
                            containerStyle={styles.btnContainer}
                            buttonStyle={styles.btnSave}
                            onPress={onSubmit}
                        />
                    </View>
                </>



            )}


        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom:10,
        height: 'auto',
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
        backgroundColor: '#198754',
        borderRadius: 10,
    },
    btnCancel: {
        backgroundColor: '#A46877',
        borderRadius: 10,
    },
    mapStyle: {
        width: '100%',
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
        color: "#A46877",
        fontWeight: "bold",
        fontSize: 15,
    }
});
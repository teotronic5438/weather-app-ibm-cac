import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, ToastAndroid} from "react-native";
import { Input, Button } from "react-native-elements";
import * as Location from "expo-location";
import MapView from "react-native-maps"

export default function AddCittyForm(props) {
    const {setShowModal, setLocationCity} = props;
    const [location, setLocation] = useState(null);
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
                console.log(location);
            }
        })()
        
    }, [])

    const onSubmit = () => {
        console.log("Ciudad Agregada");
        setShowModal(false);    // por ahora, falta subir conexion a firebase y validar info
    };

    return(
        <View style={styles.view}>
            <Input
                placeholder="Nombre de la ciudad"
                containerStyle={styles.input}
            />
            {location && (
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
            )}

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
        height: 500,
    }
});
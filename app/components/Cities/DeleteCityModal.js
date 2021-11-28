import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import Loading from '../Loading';

const DeleteCityModal = ({setShowModal, removeCity}) => {


    return (
        <View>
            <Text style={styles.deleteDescription}>¿Estás seguro de querer eliminar esta ciudad?</Text>
            <View style={styles.buttonsContainer}>
                <Button
                title="CANCELAR"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnCancel}
                onPress={() => setShowModal(false)}
                />
                <Button
                title="CONFIRMAR"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnDelete}
                onPress={removeCity}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10,
      },
    btnContainer: {
      paddingRight: 10,
      paddingTop: 5,
    },
    btnDelete: {
      backgroundColor: "#BA3B46",
      borderRadius: 10,
    },
    btnCancel: {
      backgroundColor: "#bbbbbb",
      borderRadius: 10,
    },
    deleteDescription: {
      textAlign: 'center',
      marginVertical: 20
    }
})

export default DeleteCityModal;
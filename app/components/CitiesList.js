import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';

// Array temporal con ciudades
// Más adelante se van a traer de la base de datos

const cities = ['Buenos Aires', 'Mendoza', 'Córdoba', 'Iruya', 'Ushuaia'];


const CitiesList = () => {

    const navigation = useNavigation();

    return (
        <View style={{maxHeight: '90%'}}>
            <FlatList 
                data={cities}
                keyExtractor={(item, index) => index}
                renderItem={({item, index}) => (
                    <Button 
                        containerStyle={styles.cityContainer}
                        buttonStyle={styles.cityButton}
                        title={item}
                        onPress={() => navigation.navigate('city')}
                    />
                )}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    cityContainer: {
        backgroundColor: '#A46877',
        marginBottom: 7,
        paddingVertical: 10,
        paddingHorizontal: 7
    },
    cityButton: {
        backgroundColor: '#A46877',
    },

})

export default CitiesList;
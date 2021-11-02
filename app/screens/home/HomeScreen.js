import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import CitiesList from '../../components/CitiesList';
import { useForm } from '../../hooks/useForm';

// Array temporal con ciudades
// Más adelante se van a traer de la base de datos

const cities = ['Buenos Aires', 'Mendoza', 'Córdoba', 'Iruya', 'Ushuaia'];

const HomeScreen = () => {

    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (e) => {
        setSearchValue(e.nativeEvent.text);
    }

    return (
        <>
            {/* Botón about */}
            <Button 
                containerStyle={styles.aboutBtnContainer}
                buttonStyle={styles.aboutBtn}
                icon={
                    <Icon
                        name="question"
                        type="font-awesome"
                        size={25}
                        color="#ddd"
                    />
                }
                onPress={() => console.log('mostrar about')}
            />

            {/* Buscador de ciudades */}
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

            {/* Listado de ciudades */}
            <CitiesList cities={cities} />


            {/* Botón de agregar ciudad */}
            <Button 
                containerStyle={styles.cityAddContainer}
                buttonStyle={styles.cityAddButton}
                icon={
                    <Icon
                    name="add"
                    size={25}
                    color="white"
                    />
                }
                onPress={() => console.log('agregar modal')}
            />
        </>
    )
}

const styles = StyleSheet.create({
    cityAddContainer: {
        alignItems: 'flex-end',
        marginRight: 10,
        marginTop: 20,
    },
    cityAddButton: {
        backgroundColor: '#E08976',
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
    }
})

export default HomeScreen;

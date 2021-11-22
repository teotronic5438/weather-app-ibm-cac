import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);
import CitiesList from '../../components/CitiesList';
import Loading from '../../components/Loading';
import WeAre from '../../components/WeAre';

import Modal from '../../components/Modal';
import AddCittyForm from '../../components/addcitty/AddCittyForm';

const HomeScreen = () => {

    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [loadingCities, setLoadingCities] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [renderComponent, setRenderComponent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [locationCity, setLocationCity] = useState(null);


    useEffect(() => {
        // Hace un fetch a firestore de las ciudades guardadas
        
        setLoadingCities(true);

        db.collection('cities').get().then((response) => {
            let citiesArray = [];
            response.forEach((doc) => {
                citiesArray = [...citiesArray, doc.data()]
            });
            setLoadingCities(false);
            setFilteredCities(citiesArray);
            setCities(citiesArray);
        });
        
    }, [])

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
                onPress={() => setIsModalVisible(true)}
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
            {
                cities.length === 0
                ?
                <Loading isVisible={loadingCities} text='Cargando ciudades' />
                :
                <CitiesList cities={filteredCities} />
            }
            


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
                onPress={() => { 
                    setRenderComponent(
                        <AddCittyForm 
                            setShowModal={setShowModal}
                            locationCity={locationCity}
                            setLocationCity={setLocationCity}
                        />
                    );
                    setShowModal(true);
                }}
            />
            
            {renderComponent && (
                <Modal isVisible={showModal} setIsVisible={setShowModal}>
                    {renderComponent}
                </Modal>
            )}

           
            <WeAre isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
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

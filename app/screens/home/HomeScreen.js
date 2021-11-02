import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import CitiesList from '../../components/CitiesList';

const HomeScreen = () => {

    return (
        <>
            <CitiesList />
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
        alignItems: 'center',
        marginTop: 20,
    },
    cityAddButton: {
        width: 50
    }
})

export default HomeScreen;

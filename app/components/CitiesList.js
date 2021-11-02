import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';


const CitiesList = ({cities}) => {

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
    },
    cityButton: {
        backgroundColor: '#A46877',
        borderBottomColor: '#634F5F',
        borderBottomWidth: 2,
        marginVertical: 3,
        marginHorizontal: 10,
        paddingVertical: 15
    },

})

export default CitiesList;
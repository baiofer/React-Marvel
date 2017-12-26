//Imports REACT
import React, { Component } from 'react'

//Imports REACT-NATIVE
import { Platform, View, TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native'

export default class CharacterCell extends Component {
    //PROPIEDADES POR DEFECTO
    //Sirven para prevenir fallos y documentar el componente
    static defaultProps = {
        onCellTapped   : () => {},
        item       : {},
    }

    //RENDER
    render() {
        const { item, onCellTapped } = this.props;
        const name = item.name ? item.name : '';
        const description = item.description ? item.description : '';
        let image = item.thumbnail.path != "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? { uri: item.thumbnail.path + '.' + item.thumbnail.extension} : require ('pruebas_marvel/src/resources/image_not_available.jpeg');
        const resourceURI = item.resourceURI ? item.resourceURI : '';
        const comics = item.comics ? item.comics : null;
        const series = item.series ? item.series : null;
    
        return (
        
            <TouchableOpacity 
                style={ styles.container }
                onPress={ () => onCellTapped(item) }>
                <Image 
                    source={ image } 
                    style={ styles.image } 
                    resizeMode={ 'stretch' }/>
                <View style={ styles.textContainer }>
                    <Text style={ styles.name }>{ name }</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

//ESTILOS
const styles = StyleSheet.create ({
    image: {
        width: '100%',
        height: 200,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    name: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    container: {
        width: Dimensions.get('window').width / 2, 
        height: Dimensions.get('window').width / 2,

        ...Platform.select({
            ios: {
              shadowColor: 'rgba(255,255,255,0.1)',
              shadowOpacity: 1,
              shadowRadius: 2,
            },
            android: {
              elevation: 4,
            },
        })
    },
})
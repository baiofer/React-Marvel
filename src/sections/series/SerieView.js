//Import REACT
import React, { Component } from 'react'

//Import REACT-NATIVE
import { View, StyleSheet, Image, Text, Dimensions, ScrollView } from 'react-native'

//Import COMMONS
import { Colors } from 'pruebas_marvel/src/commons'

//Imports REDUX
import { connect } from 'react-redux'

class SerieView extends Component {

    //RENDER
    render() {
        const item = this.props.item;
        const name = item.title ? item.title : '';
        const description = item.description ? item.description : '';
        let image = item.thumbnail.path != "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? { uri: item.thumbnail.path + '.' + item.thumbnail.extension} : require ('pruebas_marvel/src/resources/image_not_available.jpeg');
        const resourceURI = item.resourceURI ? item.resourceURI : '';
        const comics = item.comics ? item.comics : null;
        const series = item.series ? item.series : null;

        return (
            <ScrollView style={styles.container}>

                <Image source={ image } style={ styles.image } resizeMode={ 'contain'}  /> 
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{ name }</Text>
                    <Text style={styles.description}>{ description }</Text>
                </View>

            </ScrollView>
        )
    }
}

//REDUX
const mapStateToProps = (state) => {
    return {
        item: state.series.serieItem,
    }
}

export default connect(mapStateToProps, null)(SerieView)

//ESTILOS
const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    textContainer: {
        alignItems: 'center',
        padding: 20,
    },

    name: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
    },

    description: {
        fontSize: 16,
        color: 'white',
    },

    image: {
        width: Dimensions.get('window').width,
        height: 400,
    },
});
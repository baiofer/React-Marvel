//Import REACT
import React, { Component } from 'react'

//Import REACT-NATIVE
import { View, StyleSheet, Image, Text, Dimensions, ScrollView } from 'react-native'

//Import COMMONS
import { Colors } from 'pruebas_marvel/src/commons'

//Import COMPONENTS
import Spinner from 'react-native-spinkit'

//Import REDUX
import { connect } from 'react-redux'
import * as CharactersActions from 'pruebas_marvel/src/redux/actions/characters'

class CharacterView extends Component {

    //RENDER
    renderActivityOn() {
        return <Spinner
            style={ styles.spinner } 
            isVisible={ this.props.isFetching }
            size={150}
            type='WordPress'
            color='white'/>
    }

    render() {
        const item = this.props.item;
        const name = item.name ? item.name : '';
        const description = item.description ? item.description : '';
        let image = item.thumbnail.path != "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? { uri: item.thumbnail.path + '.' + item.thumbnail.extension} : require ('pruebas_marvel/src/resources/image_not_available.jpeg');
        const resourceURI = item.resourceURI ? item.resourceURI : '';
        const comics = item.comics ? item.comics : null;
        const series = item.series ? item.series : null;

        return (
            <ScrollView style={styles.container}>

                <Image source={ image } style={ styles.image } resizeMode={ 'cover'} 
                onLoadStart={ (e) => this.renderActivityOn() } /> 
                <View style={styles.textContainer}>
                    <Text style={styles.description}>{ description }</Text>
                </View>

            </ScrollView>
        )
    }
}

//REDUX
const mapStateToProps = (state) => {
    return {
        item: state.characters.item,
    }
}

export default connect(mapStateToProps, null)(CharacterView)

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
        height: Dimensions.get('window').width,
    },
    spinner: {
        position: 'absolute',
        top: Dimensions.get('window').height / 3, 
        left: Dimensions.get('window').width / 3, 
    },
});
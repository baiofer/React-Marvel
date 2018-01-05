//Import REACT
import React, { Component } from 'react';

//Import REACT-NATIVE
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';

//Import WEBSERVICES
import { fetch } from 'pruebas_marvel/src/webservices/webservices'
import { API_KEY } from 'pruebas_marvel/src/webservices/constants';

//Import COMPONENTS
import ComicsCell from './ComicsCell'
import Spinner from 'react-native-spinkit'

//Import NAVIGATION
import { Actions } from 'react-native-router-flux'

//Import COMMONS
import { Colors } from 'pruebas_marvel/src/commons'

//Imports REDUX
import { connect } from 'react-redux'
import * as ComicsActions from 'pruebas_marvel/src/redux/actions/comics'

class ComicsList extends Component {

    //CICLO DE VIDA
    componentWillMount() {
        const url = this.props.selected.comics.collectionURI
        this.props.fetchComicsList(url)
    }

    //FUNCIONES
    onCellTapped(item) {
        this.props.updateSelected(item)
    }

    //RENDERS
    renderFooter() {
        return  <Spinner
        style={ styles.spinner } 
        isVisible={ this.props.isFetching }
        size={150}
        type='WordPress'
        color='white'/>
    }

    renderItem(item, index) {
        return <ComicsCell 
            item={ item }
            onCellTapped={ () => this.onCellTapped(item) }/>
    }

    render() { 
        return (
            <View style={ styles.container }>
                <FlatList
                    data={ this.props.list }
                    ListFooterComponent={ ()=> this.renderFooter() }
                    renderItem={ ({ item, index }) => this.renderItem(item, index)}
                    keyExtractor={ (item, index) => index}
                    extraData={ this.state }
                    numColumns={2}
                />
            </View>
        );  
    }
}

//REDUX
const mapStateToProps = (state) => {
    return {
        list: state.comics.list,
        selected: state.characters.item,
        isFetching: state.comics.isFetching,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchComicsList: (url) => {
            dispatch(ComicsActions.fetchComicsList(url))
        },
        updateSelected: (item) => {
            dispatch(ComicsActions.updateComicSelected(item))
            Actions.ComicView()
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComicsList)

//ESTILOS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    spinner: {
        position: 'absolute',
        top: Dimensions.get('window').height / 3, 
        left: Dimensions.get('window').width / 3, 
    },
    textNo: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
})
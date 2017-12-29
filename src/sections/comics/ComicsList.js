//Import REACT
import React, { Component } from 'react';

//Import REACT-NATIVE
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

//Import WEBSERVICES
import { fetch } from 'pruebas_marvel/src/webservices/webservices'
import { API_KEY } from 'pruebas_marvel/src/webservices/constants';

//Import COMPONENTS
import ComicsCell from './ComicsCell'

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
        console.log('comic item onCellTapped: ', item)
        this.props.updateSelected(item)
    }

    //RENDERS
    renderFooter() {
        return  <ActivityIndicator
            animating={ this.props.isFetching }
            size='large'
            color='white'
            style={{ marginVertical: 20 }}
        />
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
        isFetching: state.comics.isFetching
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchComicsList: (url) => {
            dispatch(ComicsActions.fetchComicsList(url))
        },
        updateSelected: (item) => {
            dispatch(ComicsActions.updateComicSelected(item))
            Actions.ComicView({ item: item })
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
})
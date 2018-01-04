//Import REACT
import React, { Component } from 'react';

//Import REACT-NATIVE
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';

//Import WEBSERVICES
import { fetch } from 'pruebas_marvel/src/webservices/webservices'
import { API_KEY } from 'pruebas_marvel/src/webservices/constants';

//Import COMPONENTS
import SeriesCell from './SeriesCell'
import Spinner from 'react-native-spinkit'

//Import NAVIGATION
import { Actions } from 'react-native-router-flux'

//Import COMMONS
import { Colors } from 'pruebas_marvel/src/commons'

//Imports REDUX
import { connect } from 'react-redux'
import * as SeriesActions from 'pruebas_marvel/src/redux/actions/series'

class SeriesList extends Component {

    //CICLO DE VIDA
    componentWillMount() {
        const url = this.props.selected.series.collectionURI
        this.props.fetchSeriesList(url)
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
        return <SeriesCell 
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
        list: state.series.list,
        selected: state.characters.item,
        isFetching: state.series.isFetching
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchSeriesList: (url) => {
            dispatch(SeriesActions.fetchSeriesList(url))
        },
        updateSelected: (item) => {
            dispatch(SeriesActions.updateSerieSelected(item))
            Actions.SerieView()
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesList)

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
})
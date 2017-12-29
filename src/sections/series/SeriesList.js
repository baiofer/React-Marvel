//Import REACT
import React, { Component } from 'react';

//Import REACT-NATIVE
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

//Import WEBSERVICES
import { fetch } from 'pruebas_marvel/src/webservices/webservices'
import { API_KEY } from 'pruebas_marvel/src/webservices/constants';

//Import COMPONENTS
import SeriesCell from './SeriesCell'

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
        return  <ActivityIndicator
            animating={ this.props.isFetching }
            size='large'
            color='white'
            style={{ marginVertical: 20 }}
        />
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
            Actions.SerieView({ item: item })
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
})
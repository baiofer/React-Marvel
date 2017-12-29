//Import REACT
import React, { Component } from 'react';

//Import REACT-NATIVE
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

//Import WEBSERVICES
import { fetch } from 'pruebas_marvel/src/webservices/webservices'
import { API_KEY } from 'pruebas_marvel/src/webservices/constants';

//Import COMPONENTS
import EventsCell from './EventsCell'

//Import NAVIGATION
import { Actions } from 'react-native-router-flux'

//Import COMMONS
import { Colors } from 'pruebas_marvel/src/commons'

//Imports REDUX
import { connect } from 'react-redux'
import * as EventsActions from 'pruebas_marvel/src/redux/actions/events'

class EventsList extends Component {

    //CICLO DE VIDA
    componentWillMount() {
        const url = this.props.selected.events.collectionURI
        this.props.fetchEventsList(url)
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
        return <EventsCell 
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
        list: state.events.list,
        selected: state.characters.item,
        isFetching: state.events.isFetching
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchEventsList: (url) => {
            dispatch(EventsActions.fetchEventsList(url))
        },
        updateSelected: (item) => {
            dispatch(EventsActions.updateEventSelected(item))
            Actions.EventView({ item: item })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList)

//ESTILOS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
})
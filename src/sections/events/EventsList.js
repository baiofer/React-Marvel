//Import REACT
import React, { Component } from 'react';

//Import REACT-NATIVE
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';

//Import WEBSERVICES
import { fetch } from 'pruebas_marvel/src/webservices/webservices'
import { API_KEY } from 'pruebas_marvel/src/webservices/constants';

//Import COMPONENTS
import EventsCell from './EventsCell'
import Spinner from 'react-native-spinkit'

//Import NAVIGATION
import { Actions } from 'react-native-router-flux'

//Import COMMONS
import { Colors } from 'pruebas_marvel/src/commons'

//Imports REDUX
import { connect } from 'react-redux'
import * as EventsActions from 'pruebas_marvel/src/redux/actions/events'

class EventsList extends Component {

    //PROPS
    constructor(props) {
        super(props)
        this.onEndReached = this.onEndReached.bind(this)
    }

    //CICLO DE VIDA
    componentWillMount() {
        this.props.initEventsList()
    }

    //FUNCIONES
    onCellTapped(item) {
        this.props.updateSelected(item)
    }

    onEndReached() {
        if (this.props.list.length < this.props.total && !this.props.isFetching) {
            let newOffset = this.props.offset + 20
            this.props.fetchEventsList(newOffset)
        }
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
                    onEndReached = { this.onEndReached }
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
        isFetching: state.events.isFetching,
        total: state.events.total,
        offset: state.events.offset,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        initEventsList: () => {
            dispatch(EventsActions.initEventsList())
        },
        fetchEventsList: (offset) => {
            dispatch(EventsActions.updateEventsListOffset(offset))
            dispatch(EventsActions.fetchEventsList())
        },
        updateSelected: (item) => {
            dispatch(EventsActions.updateEventSelected(item))
            Actions.EventView({title: item.title})
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
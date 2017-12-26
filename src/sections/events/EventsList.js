//Import REACT
import React, { Component } from 'react';

//Import REACT-NATIVE
import { StyleSheet, Text, View, FlatList } from 'react-native';

//Import WEBSERVICES
import { fetch } from 'pruebas_marvel/src/webservices/webservices'
import { API_KEY } from 'pruebas_marvel/src/webservices/constants';

//Import COMPONENTS
import EventsCell from './EventsCell'

export default class EventsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            selected: null
        }
    }

    componentWillMount() {
        const fetchUrl = '/events?apikey=' + API_KEY;

        fetch(fetchUrl)
        .then( (response) => {
            this.setState({ list: response.data.results });
            console.log('fetch response: ', response);
        })
        .catch( (error) => {
            console.log('fetch error: ', error);
        });
    }

    onCellTapped(item) {
        this.props.updateSelected(item)
    }

    renderItem(item, index) {
        return <EventsCell 
            item={ item }
            onPress={ () => this.props.onCellTapped(item) }/>
    }

    render() {
        return (
            <View>
                <FlatList
                    data={ this.state.list }
                    renderItem={ ({ item, index }) => this.renderItem(item, index)}
                    keyExtractor={ (item, index) => index}
                    extraData={ this.state }
                    numColumns={2}
                />
            </View>
        );
    }
}
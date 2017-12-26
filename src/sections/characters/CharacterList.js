//Import REACT
import React, { Component } from 'react';

//Import REACT-NATIVE
import { StyleSheet, Text, View, FlatList } from 'react-native';

//Import WEBSERVICES
//import { fetch } from 'pruebas_marvel/src/webservices/webservices'


//Import COMPONENTS
import CharacterCell from './CharacterCell'
import CharacterView from './CharacterView'

//Import NAVIGATION
import { Actions } from 'react-native-router-flux'

//Import REDUX
import { connect } from 'react-redux'
import * as CharactersActions from 'pruebas_marvel/src/redux/actions/characters'

class CharacterList extends Component {
/*
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            selected: null
        }
    }
*/
    componentWillMount() {
        this.props.fetchCharactersList()
    }

    onCellTapped(item) {
        this.props.updateSelected(item)        
    }

    renderItem(item, index) {
        return <CharacterCell 
            item={ item } 
            onCellTapped={ (item) => this.onCellTapped(item) }
        />
    }

    render() {
        return (
            <View>
                <FlatList
                    data={ this.props.list }
                    renderItem={ ({ item, index }) => this.renderItem(item, index)}
                    keyExtractor={ (item, index) => index}
                    extraData={ this.state }
                    numColumns={2}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.characters.list
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchCharactersList: () => {
            dispatch(CharactersActions.fetchCharactersList())
        },
        updateSelected: (item) => {
            dispatch(CharactersActions.updateCharacterSelected(item))
            Actions.CharacterView({ item: item })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList)
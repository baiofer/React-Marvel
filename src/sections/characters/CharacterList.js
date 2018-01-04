//Import REACT
import React, { Component } from 'react';

//Import REACT-NATIVE
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';

//Import COMMONS
import { Colors } from 'pruebas_marvel/src/commons'

//Import COMPONENTS
import CharacterCell from './CharacterCell'
import CharacterView from './CharacterView'
import Spinner from 'react-native-spinkit'

//Import NAVIGATION
import { Actions } from 'react-native-router-flux'

//Import REDUX
import { connect } from 'react-redux'
import * as CharactersActions from 'pruebas_marvel/src/redux/actions/characters'

class CharacterList extends Component {

    //CICLO DE VIDA
    componentWillMount() {
        this.props.fetchCharactersList()
    }

    //FUNCIONES
    onCellTapped(item) {
        this.props.updateSelected(item)        
    }

    //RENDERS
    renderFooter() {
        return <Spinner
            style={ styles.spinner } 
            isVisible={ this.props.isFetching }
            size={150}
            type='WordPress'
            color='white'/>
    }

    renderItem(item, index) {
        return <CharacterCell 
            item={ item } 
            onCellTapped={ (item) => this.onCellTapped(item) }
        />
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
        list: state.characters.list,
        isFetching: state.characters.isFetching
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchCharactersList: () => {
            dispatch(CharactersActions.fetchCharactersList())
        },
        updateSelected: (item) => {
            dispatch(CharactersActions.updateCharacterSelected(item))
            Actions.CharacterView({ title: item.name })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList)

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
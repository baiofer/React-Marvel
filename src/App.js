//Import REACT
import React, { Component } from 'react';

//Import REACT-NATIVE
import { Platform, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';

//Import Navegación
import { Actions, Scene, Router } from 'react-native-router-flux';

//Import WEBSERVICES
import * as webservices from 'pruebas_marvel/src/webservices/webservices';

//Import COMPONENTS
import CharacterList from 'pruebas_marvel/src/sections/characters/CharacterList';
import CharacterView from 'pruebas_marvel/src/sections/characters/CharacterView';
import CharacterNew from 'pruebas_marvel/src/sections/characters/CharacterNew';
import ComicsList from 'pruebas_marvel/src/sections/comics/ComicsList';
import ComicView from 'pruebas_marvel/src/sections/comics/ComicView';
import EventsList from 'pruebas_marvel/src/sections/events/EventsList';
import EventView from 'pruebas_marvel/src/sections/events/EventView';
import SeriesList from 'pruebas_marvel/src/sections/series/SeriesList';
import SerieView from 'pruebas_marvel/src/sections/series/SerieView';

//Import COMMONS
import { Colors } from 'pruebas_marvel/src/commons';

//Import REDUX
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from './redux/reducers' //Nuestros reducers
const reducer = combineReducers(reducers)  //Combinamos nuestros reducers
const store = createStore(  //Creamos el store con:
  reducer,  //Nuestros reducer
  applyMiddleware(thunk)  //Nuestro middleware
)

export default class App extends Component {

    componentWillMount() {
        webservices.configureAxios()
        StatusBar.setBarStyle('light-content')
    }

    renderBackButton() {
        return (
          <TouchableOpacity style={styles.addButton} onPress={ () => Actions.pop() }>
            <Text style={styles.addButtonText}>{'< Back'}</Text>
          </TouchableOpacity>
        )
    }

    renderAddCharacterButton() {
        return (
            <TouchableOpacity style={styles.addButton} onPress={ () => Actions.CharacterNew() }>
                <Text style={styles.addButtonText}>{'+'}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        console.disableYellowBox = true
        return (
            <Provider store={store}>
                <Router>
                    <Scene key='root'>
                        <Scene
                            key={'CharacterList'}
                            component={ CharacterList }
                            title={'MARVEL CHARACTERS'}
                            navigationBarStyle={styles.navBar}
                            navBarButtonColor={'white'}
                            renderRightButton={ () => this.renderAddCharacterButton()}
                        />
                        <Scene
                            key={'CharacterNew'}
                            component={ CharacterNew }
                            navigationBarStyle={styles.navBar}
                            navBarButtonColor={'white'}
                            title={'Añadir'}
                        />
                        <Scene 
                            key={'ComicView'}
                            component={ ComicView }
                            navigationBarStyle={styles.navBar}
                            navBarButtonColor={'white'}
                            renderLeftButton={ () => this.renderBackButton()}
                        />
                        <Scene 
                            key={'EventView'}
                            component={ EventView }
                            navigationBarStyle={styles.navBar}
                            navBarButtonColor={'white'}
                            renderLeftButton={ () => this.renderBackButton()}
                        />
                        <Scene 
                            key={'SerieView'}
                            component={ SerieView }
                            navigationBarStyle={styles.navBar}
                            navBarButtonColor={'white'}
                            renderLeftButton={ () => this.renderBackButton()}
                        />
                        <Scene
                            key={'TabBar'}
                            tabs={true}
                            tabBarStyle={styles.tabBar}
                        >
                            <Scene 
                                key={'CharacterView'}
                                title={'CHARACTER'}
                                icon={TabIcon}
                                component={ CharacterView }
                                navigationBarStyle={styles.navBar}
                                navBarButtonColor={'white'}
                                renderLeftButton={ () => this.renderBackButton()}
                            />
                            <Scene 
                                key={'ComicList'}
                                title={'COMICS'}
                                icon={TabIcon}
                                component={ ComicsList }
                                navigationBarStyle={styles.navBar}
                                navBarButtonColor={'white'}
                                renderLeftButton={ () => this.renderBackButton()}
                            />
                            <Scene 
                                key={'SeriesList'}
                                title={'SERIES'}
                                icon={TabIcon}
                                component={ SeriesList }
                                navigationBarStyle={styles.navBar}
                                navBarButtonColor={'white'}
                                renderLeftButton={ () => this.renderBackButton()}
                            />
                            <Scene 
                                key={'EventsList'}
                                title={'EVENTS'}
                                icon={TabIcon}
                                component={ EventsList }
                                navigationBarStyle={styles.navBar}
                                navBarButtonColor={'white'}
                                renderLeftButton={ () => this.renderBackButton()}
                            />
                        </Scene>
                    </Scene>
                </Router>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    navBar: {
      backgroundColor: Colors.navBar,
    },
    addButtonText: {
      color: 'white',
      fontSize: 20,
      backgroundColor: Colors.navBar
    },
    addButton: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    tabBar: {
        backgroundColor: Colors.navBar,
    },
});

const TabIcon = ({ selected, title }) => {
    return (
        <Text style={{color: selected ? 'blue' :'white'}}>{title}</Text>
    );
}
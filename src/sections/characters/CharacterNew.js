//Import REACT
import React, { Component } from 'react';

//Import REACT-NATIVE
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

//Import WIDGETS
import { Input, Button } from 'pruebas_marvel/src/widgets'

//Import COMPONENTS
import ImagePicker from 'react-native-image-picker'

//Import REDUX
import { connect } from 'react-redux'
import * as CharactersActions from 'pruebas_marvel/src/redux/actions/characters'

//Import COMMONS
import { Colors } from 'pruebas_marvel/src/commons'

class CharacterNew extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            nameError: '',
            description: '',
            descriptionError: '',
            image: null,
        }
    }

    //FUNCTIONS
    validateForm() {
        let valid = true
        let errors = {}
        if (!this.state.name) {
            errors.name = 'Elije un nombre válido'
            valid = false
        }
        if (!this.state.description) {
            errors.description = 'Elije una descripción válida'
            valid = false
        }
        this.setState({
            nameError: errors.name ? errors.name : '',
            descriptionError: errors.description ? errors.description : '',
        })
        return valid
    }

    onSubmit() {
        if (this.validateForm()) {
            const characterData = {
                name: this.state.name,
                description: this.state.description,
                thumbnail: {
                    path: this.state.image ? 'data:image.jpeg;base64,' + this.state.image.data : null,
                    extension: 'jpeg'
                }
            }
            this.props.postCharacter(characterData)
        }
    }

    onSelectImageTapped() {
        const options = {
            title: 'Selecciona imagen',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        }
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response: ', response)
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            } else {
                this.setState({
                    image: response
                })
            }
        })
    }

    //RENDER
    render() {
        const imageUri = this.state.image ? { uri: this.state.image.uri } : null
        const imageButtonText = this.state.image ? this.state.image.fileName : 'Elegir imagen'
        return (
            <View style={ styles.container }>
                <View style={ styles.imageContainer }>
                    <Image
                        source={ imageUri }
                        style={ styles.imageContainerBackground }
                        resizeMode={ 'cover' }
                    />
                    <TouchableOpacity 
                        style={ styles.button } 
                        onPress={ () => this.onSelectImageTapped() }
                    >
                        <Text style={ styles.textButton }>{ imageButtonText }</Text>
                    </TouchableOpacity>
                </View>
                <View style={ styles.inputContainer }>
                    <Input 
                        onChangeText={ (v) => this.setState({ name: v })}
                        value={ this.state.name }
                        error={ this.state.nameError }
                        label={ 'Character:' }
                        placeholder={ 'Spiderman' }
                    />
                </View>
                <View style={ styles.inputContainer }>
                    <Input 
                        onChangeText={ (v) => this.setState({ description: v })}
                        value={ this.state.description }
                        error={ this.state.descriptionError }
                        label={ 'Description:' }
                        placeholder={ 'The spider man. Peter Parker convers to spiderman when a spider bites him.' }
                        multiline={ true }
                    />
                </View>
                <View style={ styles.buttonContainer }>
                    <Button 
                        label={ 'Aceptar' } 
                        onPress={ () => this.onSubmit() } 
                        isFetching={ this.props.isFetching }
                    />  
                </View>
            </View>
        )
    }
}

//REDUX
const mapStateToProps = (state) => {
    return {
        isFetching: state.characters.isFetching,
        house: state.characters.item
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        postCharacter: (data) => {
            dispatch(CharactersActions.postCharacter(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterNew)

//ESTILOS
const styles = StyleSheet.create({
    container: {
        flex            : 1,
        backgroundColor : Colors.background,
    },
    inputContainer: {
        margin  : 20,
    },
    buttonContainer: {
        margin  : 20,
    },
    imageContainer: {
        alignItems: 'center',
        width: '100%',
        height: 200,
        backgroundColor: 'grey',
        justifyContent: 'center',
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold',
    },
    button: {
        padding: 10,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.2)'
    },
    imageContainerBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});
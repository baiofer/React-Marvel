import axios from 'axios'

export function fetchCharactersList() {
        
    const fetchUrl = '/characters?offset=40&ts=1&apikey=a08ec1b7dd481131cb4606e7b43fc18a&hash=021dcdbfac84b7058949c7c7d072ff30'

    return axios.get(fetchUrl)
}
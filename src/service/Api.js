import axios from 'axios';

export default () => {
    return axios.create({
        baseURL: 'https://europe-west1-socialape-d081e.cloudfunctions.net/api/'
    })
}
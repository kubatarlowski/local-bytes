import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://local-byte.firebaseio.com/'
});

export default instance;
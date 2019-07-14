import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const url = publicRuntimeConfig.API_URL;
const client = axios.create({
    baseURL: url + '/api'
});

export default client;

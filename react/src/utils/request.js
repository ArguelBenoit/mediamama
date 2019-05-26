import axios from 'axios';
import config from '~/config.js';
import { getJwtCookie } from 'Utils/jwtCookie';

/********** example: ***********
 request('GET', '/api/ping', {})
    .then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
*******************************/

export default (type, route, data = {}) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${getJwtCookie()}`;
    return axios[type](`${config.apiUrl}${route}`, data);
};

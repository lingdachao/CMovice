import request from '../util/RequestUtil'
import {
    MOVICE_DETAIL
} from '../constants/Urls'

export function getList (url,params) {
     url += "?apikey=0b2bdeda43b5688921839c8ecb20399b";
    if(params)
        url += params
    return request({
        url,
    }).then(userInfo => {
        return userInfo
    });
}

export function getDetail (id) {
    let url = `${MOVICE_DETAIL}${id}?apikey=0b2bdeda43b5688921839c8ecb20399b`
    return request({
        url,
    }).then(userInfo => {
        return userInfo
    });
}


export function loadWeb (id) {
    let url = `https://9av8jpam.api.lncld.net/1.1/classes/loadurl`
    let headers = {
        'X-LC-Id': '9av8jPaMHkEcXA5OqjdsO2a1-gzGzoHsz',
        'X-LC-Key': '1mvLGzWWOeB5YhTLyod3jTPb',
        'Content-Type': 'application/json'
    }
    return request({
        url,
        headers
    }).then(userInfo => {
        return userInfo
    });
}

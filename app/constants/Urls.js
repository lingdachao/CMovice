export const debugRequest = true;    

let HOST = 'https://api.douban.com/v2/movie/';

export const HOT_LIST =  `${HOST}in_theaters`
export const WILL_LIST =  `${HOST}coming_soon`
export const RANK_LIST =  `${HOST}top250`
export const PRAISE_LIST =  `${HOST}weekly`
export const US_LIST =  `${HOST}us_box`
export const NEW_LIST =  `${HOST}new_movies`
 
export const MOVICE_DETAIL = `${HOST}subject/`
export const MOVICE_SEARCH = `${HOST}search`
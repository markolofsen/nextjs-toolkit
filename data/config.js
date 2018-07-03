// console.log( process.env )

export const ENV = process.env.NODE_ENV || 'development';
export const isProduction = ENV === 'production';

export const apiDomain = isProduction ? 'http://127.0.0.1:8000' : 'http://127.0.0.1:8000';

import axios from 'axios';
export async function get(path) {
	return await axios.get(`${apiDomain}${path}`).then(res => res.data)
}

// if(typeof window !== 'undefined') {
// 	alert()
// }
// export const language = typeof navigator !== 'undefined' ? navigator.language || navigator.userLanguage : 'en'

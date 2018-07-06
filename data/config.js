// console.log( process.env )

export const ENV = process.env.NODE_ENV || 'development';
export const isProduction = ENV === 'production';

// export const apiDomain = isProduction ? 'http://127.0.0.1:8000' : 'http://127.0.0.1:8000';
export const apiDomain = 'http://127.0.0.1:3000';

export const googleMapKey = 'AIzaSyAOM0YBxdT7Ot7DFgjd5dWduGFhEUXIm_E';
/*
 * UNIVERSAL FETCHERS
 */
import axios from 'axios';
export async function get(path) {
	return await axios.get(`${apiDomain}${path}`).then(res => res.data)
}



//Auto Currying (автоматическое каррирование)
import { Trans } from 'react-i18next'
export function wordPostfixPreset(type, number)  {

	let titles = ['no']

	if(type == 'reviews') {
		titles = ['review_one','review_three','review_ten']
	}

	let cases = [2, 0, 1, 1, 1, 2];
  let title = titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];

	return <Trans i18nKey={`common:${title}`}>
		{number}
	</Trans>

}

export function wordPostfix(titles, number)  {
    let cases = [2, 0, 1, 1, 1, 2];
    let title = titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    return `${number} ${title}`
}


// Token for API Authorization
let GLOBAL_RESPONSE_STATUS = true
function applyAxiosSettings() {
    axios.defaults.headers.common['Authorization'] = `Token TOKENBUMBER`;
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    axios.interceptors.response.use(response => {
        // soundsCollection('connection_error', false)

        GLOBAL_RESPONSE_STATUS = true
        return response;
    }, error => {

        // soundsCollection('connection_error', true)

        if (!error.response) {
            // console.log('Network error!')
            GLOBAL_RESPONSE_STATUS = 'Network error!'
        } else {
            console.log(error.response.status)
            GLOBAL_RESPONSE_STATUS = error.response.status
            return error.response
        }
        return Promise.reject(error.response);
    })


} applyAxiosSettings()

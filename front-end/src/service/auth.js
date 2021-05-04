import { saveToken, getToken } from '../helpers/localStorage';


export async function fetchToken(userName, password) {
    const requestTokenUrl = 'https://central-errors-events.herokuapp.com/oauth/token';
    const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

    const request = {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(`${REACT_APP_CLIENT_ID}:${REACT_APP_CLIENT_SECRET}`).toString('base64')
        },
        body: 'grant_type=password'
          + '&username=' + userName
          + '&password=' + password,
    };
    try {
        const response = await fetch(requestTokenUrl, request);
        const { access_token } = await response.json();
        if (access_token) {
          saveToken(access_token);
          return access_token;
        } else {
          alert('Usuário ou senha inválidos!')
        }
    }catch(error) {
        console.error(error);
    }
  }


   

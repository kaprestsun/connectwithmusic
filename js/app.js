const clientId = 'd5515a499f564a1594caaa79d7d5a58f';
const clientSecret = 'c86c8962759a4fd78dc7a3ecfb513473';

const APIController = (function(){

    const _getToken = async() => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret) // string representation
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json(); // store json result into data
        return data.access_token; // use bearer token to call Spotify endpoints
    }

    const _getUserTopTracksShort = async(token) => {
        const result = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term', {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token}
        });
    
        const data = await result.json();
        return data.items;
    }

    const _getUserTopArtistsShort = async(token) => {
        const result = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=short_term', {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token}
        });

        const data = await result.json();
        return data.items;
    }

    const_getUserTopTracksMedium = async(token) => {
        const result = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term', {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token}
        });
    
        const data = await result.json();
        return data.items;
    }

    const _getUserTopArtistsMedium = async(token) => {
        const result = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=medium_term', {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token}
        });

        const data = await result.json();
        return data.items;
    }

    const_getUserTopTracksLong = async(token) => {
        const result = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term', {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token}
        });
    
        const data = await result.json();
        return data.items;
    }

    const _getUserTopArtistsLong = async(token) => {
        const result = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=long_term', {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token}
        });

        const data = await result.json();
        return data.items;
    }

})();

// const generateRandomString = (length) => {
//     const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const values = crypto.getRandomValues(new Uint8Array(length));
//     return values.reduce((acc, x) => acc + possible[x % possible.length], "");
//   }
  
// const codeVerifier  = generateRandomString(64);

// const sha256 = async (plain) => {
//     const encoder = new TextEncoder()
//     const data = encoder.encode(plain)
//     return window.crypto.subtle.digest('SHA-256', data)
//   }

// const base64encode = (input) => {
//     return btoa(String.fromCharCode(...new Uint8Array(input)))
//       .replace(/=/g, '')
//       .replace(/\+/g, '-')
//       .replace(/\//g, '_');
//   }

// const hashed = await sha256(codeVerifier)
// const codeChallenge = base64encode(hashed);
// const redirectUri = 'http://localhost'

// window.localStorage.setItem('code_verifier', codeVerifier)

// const params = {
//     response_type: 'code',
//     client_id: clientId,,
//     code_challenge_method: 'S256',
//     code_challenge: codeChallenge,
//     redirect_uri: redirectUri
// }

// authUrl.search = new URLSearchParams(params).toString();
// window.location.href = authUrl.toString();


const clientId = 'd5515a499f564a1594caaa79d7d5a58f';
const clientSecret = 'c86c8962759a4fd78dc7a3ecfb513473';

var redirect = "https://localhost:8888/home/";

const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = 'https://accounts.spotify.com/api/token';

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


//HFIEUFHSEUFHSPFUHPSUFHSEPF SFUSHFIUH@! ++++++++++++++++++++++++++


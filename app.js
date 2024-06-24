const APIController = (function(){

    const clientId = 'd5515a499f564a1594caaa79d7d5a58f';
    const clientSecret = 'c86c8962759a4fd78dc7a3ecfb513473';

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

    const _getUerTopTracks = async(token) => {
        const result = await fetch('https://api.spotify.com/v1/me/top/{type}', {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token}
        });
    }  
})();

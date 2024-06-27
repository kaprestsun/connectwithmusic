const express = require('express');

const clientId = 'd5515a499f564a1594caaa79d7d5a58f';
const clientSecret = 'c86c8962759a4fd78dc7a3ecfb513473';
const redirectUri = 'http://localhost:8888/callback/';


let app = express();
app.use(express.static(__dirname + '/public'));
const port = 8888;

app.get('/callback', function(req, res) { // reroutes to callback after login

    let code = req.query.code || null;
    let state = req.query.state || null;
    let storedState = req.cookies ? req.cookies[stateKey] : null;

    if (access_token && (state == null || state !== storedState)){
        res.redirect('/#' + querystring.stringify({error: 'state_mismatch'}));
    } else {
        res.clearCookie(stateKey);
        
        const authOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
            },
            body: `code=${code}&redirect_uri=${redirectUri}&grant_type=authorization_code`,
            json: true
        };

        fetch('https://account.spotify.com/api/token', authOptions)
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        let access_token = data.access_token
                        let refresh_token = data.refresh_token
                        res.redirect('/#' + querystring.stringify({
                            access_token: access_token,
                            refresh_token: refresh_token
                        }));
                    });
                } else {
                    res.redirect('/#' + querystring.stringify({
                        error: 'invalid_token'
                    }));
                };
            });
    };
});

app.get('/refresh_token', function (req, res){
    const refresh_token = req.query.refresh_token;
    const authOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=refresh_token&refresh_token=${refresh_token}'
    };

    fetch('https://accounts.spotify.com/api/token/', authOptions)
        .then((response) => {
            if (response.status === 200){
                response.json().then((data)=>{
                    const access_token = data.acces_token;
                    res.send({access_token});
                });
            };
        }) 
        .catch((error) => {
            console.error(error);
            res.send(error);
        });
});

app.listen(port, () => console.info(`Listening on port ${port}`));

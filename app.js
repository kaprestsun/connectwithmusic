

// const express = require('express');
// const cookieParser = require('cookie-parser');

// const clientId = 'd5515a499f564a1594caaa79d7d5a58f';
// const clientSecret = 'c86c8962759a4fd78dc7a3ecfb513473';
// const redirectUri = "https://localhost:8888/callback/";
// const stateKey = 'spotify_auth_state';

// let app = express();
// app.use(express.static(__dirname + '/public'));
// app.use(cookieParser());
// const port = 8888;

// THIS PART BELOW ___________________

// var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     form: {
//         code: code,
//         redirect_uri: redirectUri,
//         grant_type: 'authorization_code'
//     },
//     headers: {
//         'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
//     },
//     json: true
// };

// request.post(authOptions, function(error, response, body))

// ABVOVE _____________ KEEP COMMENTED

// app.get('/callback/', function(req, res) { // reroutes to callback after login

//     let code = req.query.code || null;
//     let state = req.query.state || null;
//     let storedState = req.cookies ? req.cookies[stateKey] : null;

//     if (state == null || state !== storedState){
//         res.redirect('/#' + querystring.stringify({error: 'state_mismatch'}));
//     } else {
//         res.clearCookie(stateKey);
        
//         const authOptions = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
//             },
//             body: `code=${code}&redirect_uri=${redirectUri}&grant_type=authorization_code`,
//             json: true
//         };

//         fetch('https://accounts.spotify.com/api/token', authOptions)
//             .then((response) => {
//                 if (response.status === 200) {
//                     response.json().then((data) => {
//                         let access_token = data.access_token
//                         let refresh_token = data.refresh_token
//                         res.redirect('/#' + querystring.stringify({
//                             access_token: access_token,
//                             refresh_token: refresh_token
//                         }));
//                     });
//                 } else {
//                     res.redirect('/#' + querystring.stringify({
//                         error: 'invalid_token'
//                     }));
//                 };
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }
// });

// app.get('/refresh_token', function (req, res){
//     const refresh_token = req.query.refresh_token;
//     const authOptions = {
//         method: 'POST',
//         headers: {
//             'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64')),
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
//     };

//     fetch('https://accounts.spotify.com/api/token/', authOptions)
//         .then((response) => {
//             if (response.status === 200){
//                 response.json().then((data)=>{
//                     const access_token = data.acces_token;
//                     res.send({access_token});
//                 });
//             };
//         }) 
//         .catch((error) => {
//             console.error(error);
//             res.send(error);
//         });
// });

// app.listen(port, () => console.info(`Listening on port ${port}`));


// i just copied the entire thing -- go through and figure out what's wrong

const express = require('express');
const querystring = require('querystring');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const client_id = 'd5515a499f564a1594caaa79d7d5a58f';
const client_secret = 'c86c8962759a4fd78dc7a3ecfb513473';
const redirect_uri = "http://localhost:8888/callback";

const generateRandomString = function (length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

let stateKey = 'spotify_auth_state';
let app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/index.html'));
app.use(cors());
app.use(cookieParser());
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/html', express.static(__dirname + '/public/html'));
// app.use('/js', express.static(__dirname + 'public/js'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/index.html")
});

app.get('/login', function (req, res) {

    let state = generateRandomString(16);
    res.cookie(stateKey, state);
    console.log(encodeURIComponent(redirect_uri))

    const scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
    console.log("State from query: ", state);
});

// app.get('/home', function (req, res) {
//     res.sendFile(__dirname + "/html/home.html")
// }) 


app.get('/callback', function (req, res) {

    let code = req.query.code || null;
    let state = req.query.state || null;
    let storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);

        const authOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            body: querystring.stringify({
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            }),
            // body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
            // body: `code=${code}&redirect_uri=${redirect_uri}&grant_type=authorization_code`,
            // json: true
        };

        fetch('https://accounts.spotify.com/api/token', authOptions)
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        let access_token = data.access_token
                        let refresh_token = data.refresh_token
                        res.redirect('/#' +
                            querystring.stringify({
                                access_token: access_token,
                                refresh_token: refresh_token
                            }));
                        console.log('refresh_token', refresh_token)
                    });
                } else {
                    res.redirect('/#' +
                        querystring.stringify({
                            error: 'invalid_token'
                        }));
                };
            })
            .catch(error => {
                console.error(error);
            });
    }
});

app.get('/refresh_token', function (req, res) {

    const refresh_token = req.query.refresh_token;
    const authOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
    };

    fetch('https://accounts.spotify.com/api/token', authOptions)
        .then(response => {
            if (response.status === 200) {
                response.json().then((data) => {
                    const access_token = data.access_token;
                    res.send({ access_token });
                });
            };
        })
        .catch(error => {
            console.error(error);
            res.send(error);
        });
});

app.listen(8888);
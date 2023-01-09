require('dotenv').config();
let express = require('express');
let app = express();

/*app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});*/

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.use('/public', express.static(__dirname + '/public'));


app.get('/json', (req, res) => {
    let obj = { "message": "Hello json" };
    if (process.env.MESSAGE_STYLE == 'uppercase') {
        obj.message = obj.message.toUpperCase();
    }
    return res.json(obj);
});


app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => res.json({ time: req.time }));

app.get('/:word/echo', (req, res) => res.json({echo: req.params.word}));

const name_response = (req, res) => {
    let first = req.query.first;
    let last = req.query.last;
    return res.json({ name: `${first} ${last}` });
}

app.route('/name').get(name_response).post(name_response);


module.exports = app;

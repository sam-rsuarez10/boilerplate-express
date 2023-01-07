require('dotenv').config();
let express = require('express');
let app = express();

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.use('/public', express.static(__dirname + '/public'));


app.get('/json', (req, res) => {
    let obj = { "message": "Hello json" };
    if (process.env.MESSAGE_STYLE == 'uppercase') {
        obj.message = obj.message.toUpperCase();
    }
    return res.json(obj);
});


 module.exports = app;

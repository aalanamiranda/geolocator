require('dotenv').config()
let express = require('express');
let app = express();
let sequelize = require('./db');

let user = require('./controllers/usercontroller')
let log = require('./controllers/logcontroller')

sequelize.sync();

app.use(express.json());

app.use('/user', user);
app.use('/log', log);


app.listen(process.env.PORT, function(){
    console.log('Listening on Port:', process.env.PORT);
})
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

// CORS
app.use(cors());
app.use(morgan('dev'));

mongoose.connect(
	'mongodb+srv://shivdotpy:shiv1234567890@cluster0-6zuqf.mongodb.net/secretSanta?retryWrites=true&w=majority',
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.get('/', (req, res) => {
	res.send('App is working');
});


http.listen(PORT);
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser, checkadmin, checkSuperadmin, verifiedAccount } = require('./middleware/authMiddleware');

const app = express();
const xXssProtection = require("x-xss-protection");

var helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: false,
}))



// Set "X-XSS-Protection: 0"
app.use(xXssProtection());

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

PORT = 3000;

// database connection
const dbURI = 'mongodb+srv://thushara:e16388com@cluster0.whce1.mongodb.net/project';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

console.log("App listens in port "+ PORT);
// routes
app.get('*', checkUser);
app.get('/', verifiedAccount , requireAuth, (req, res) => res.render('home',{ details: null }));
app.get('/confirm', requireAuth , (req, res) => res.render('confirm'));
app.get('/adminView',verifiedAccount, requireAuth, checkadmin, (req, res) => res.render('adminView'));
app.get('/sadmin',verifiedAccount, checkadmin, (req, res) => res.render('sadmin'));

app.get('/superView',verifiedAccount, checkSuperadmin, (req, res) => res.render('superView'));
app.get('/tooManyRequests', (req, res) => res.render('tooManyRequests'));




app.use(authRoutes);

app.use((req, res, next) => {
  res.status(404).send({msg : "not valid request"});
  next();
})

module.exports = app;


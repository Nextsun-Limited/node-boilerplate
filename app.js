import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';

// Set Server
const app = express();
// Server Port Number
const port = 3000;

// CORS Middleware
app.use(cors());
// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
// BodyParser Middleware
app.use(bodyParser.json());
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Routes
import users from './routes/users'
app.use('/users', users);

// Start Server
app.listen(port, () => {
    console.log('Server started at port ' + port);
});

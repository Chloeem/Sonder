//import modules

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path')
require('dotenv').config();

// Import routes
const testRouter = require('./routes/test')
const userRouter = require('./routes/users');
const sessionRouter = require('./routes/sessions');
const requestRouter = require('./routes/requests')

//app
const app = express();

//db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("DB CONNECTED")).catch(err => console.log("DB CONNECTION ERROR", err));

//middleware
app.use(express.json())
app.use(morgan('dev'));
app.use(cors({origin: true, credentials: true}));
app.use(express.json())

//routes
app.use("/sessions", sessionRouter);
app.use("/", testRouter)
app.use("/users", userRouter);
app.use("/requests", requestRouter);

// const testRoutes =require('./routes/test');
// app.use("/", testRoutes)

//port
const port = process.env.PORT || 8080;

// heroku
if(process.env.NODE_ENV=="production"){
  app.use(express.static('../client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    console.log("I'm in production now")
  });
}

//listener
const server = app.listen(port, () => console.log(`Server is running on ${port}`))

module.exports = server
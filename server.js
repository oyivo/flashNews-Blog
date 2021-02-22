require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')
const serveIndex = require('serve-index')


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors())
app.use(fileUpload({
  useTempFiles: true
}))

app.use('/uploads', express.static ('uploads'))
app.use('/ftp', express.static('public'), serveIndex('public', { 'icons': true }));


// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/articleRouter'))
app.use('/api', require('./routes/commentRouter'))
app.use('/api', require('./routes/upload'))
// app.use('/api', require('./routes/uploading'))




// Connect to mongodb
const URL = process.env.DB_CONNECTION;
mongoose.connect(
    URL,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);


const PORT = process.env.PORT || 5070
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})
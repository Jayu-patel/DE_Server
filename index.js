const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router/route')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path') 
require('dotenv').config()

app.use(cors())
app.use(cookieParser())
app.use(express.json({limit: '100mb'}))
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json({limit: "100mb"}))
app.use(bodyParser.urlencoded({extended: true, parameterLimit: 100000, limit: "100mb"}))
app.use(morgan('tiny'))
app.disable('x-powered-by')

const port = 8080

app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 

app.get('/',(req,res)=>{
    res.status(200).json('server is started')
})

app.get('/cook',(req,res)=>{
    res.render('page')
})

app.get('/setcookie', (req, res) => {
    res.cookie('myCookie', 'helloCookie', {
      httpOnly: true,
      sameSite: true,
    }).send('Cookie has been set');
  });


//apis
app.use('/api',router)
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})
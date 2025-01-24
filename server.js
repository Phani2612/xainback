const Express = require('express')

const App = Express()
const CORS = require('cors')

const Cookieparser = require('cookie-parser')

require('dotenv').config()

App.use(Express.json())
App.use(Express.urlencoded())
App.use(CORS())
App.use(Cookieparser())




const DB = require('./config/db')
DB()

const UserRoutes = require('./routes/Userroute')


App.use('/' , UserRoutes)



App.listen(5000 , ()=>{
    console.log('Port is running at 5000')
})
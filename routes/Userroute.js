const Express = require('express')

const Router = Express.Router()

const {Login , SignUp , FetchAllUsers , UpdateDetails} = require('../controllers/Userflow')


Router.post('/login' , Login)
Router.post('/signup' , SignUp )
Router.get('/all' , FetchAllUsers)
Router.put('/update' , UpdateDetails)
module.exports = Router
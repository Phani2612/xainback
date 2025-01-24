const Mongoose = require('mongoose')

const User_Schema = new Mongoose.Schema({

     UT_First_Name : {
        type : String
     },

     UT_Last_Name : {
        type : String 
     },

     UT_Contact_Number : {

        type : String 
     },

     UT_Whatsapp_Number : {

        type : String
     },

     UT_Email : {
 
      type : String
      
     },

     UT_State : {

        type : String 
     },

     UT_Referral : {

        type : String
     },

     UT_Password : {

        type : String
     },

     UT_Reffered : {
        type : String,
        default : 'Christopher nolan'
     },

     UT_Promoter : {

        type : String,
        default : 'James cameron'

     },

     UT_Business_Income : {

        type : Number,
        default : 1000
     }
})

const User_Table = Mongoose.model('User_Table' , User_Schema)


module.exports = User_Table
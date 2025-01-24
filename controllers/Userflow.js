const User_Model = require('../models/Users.js')

const BCRYPT = require('bcryptjs')

const JWT = require('jsonwebtoken')


const SignUp = async(req,res)=>{

//    console.log(req.body)
 
      const {firstname , lastname , contact , whatsapp , email , state, referral , password} = req.body

      try{

        const isUserExists = await User_Model.findOne({UT_Email : email})

        const hashedPassword = await BCRYPT.hash(password , 12)

        if(!isUserExists){

              const NewUser = new User_Model({
                   UT_Email : email,
                   UT_First_Name : firstname,
                   UT_Last_Name : lastname,
                   UT_Contact_Number : contact,
                   UT_Whatsapp_Number : whatsapp,
                   UT_State : state,
                   UT_Referral : referral,
                   UT_Password : hashedPassword
              })

              await NewUser.save()

              return res.status(201).json({message : 'User created successfully' , redirect : '/login'})
        }

        else{

            return res.status(409).json({message : "User already exists" , redirect : '/login'})
        }

      }

      catch(error){
        console.error(error)
      }

      
}




const Login = async(req,res)=>{

//  console.log(req.body)

    const {email , password} = req.body

    const AdminEmail = 'xianinfotech@gmail.com'
    const AdminPassword = '123456'

    if(email === AdminEmail && password === AdminPassword){

        return res.status(200).json({message : 'Welcome dear Admin' , redirect : '/admin/user-list' , Admin : AdminEmail})
    }

    try{
    
       
     const Result = await User_Model.findOne({UT_Email : email})

     if(Result){  

        const confirmation = await BCRYPT.compare(password , Result.UT_Password)

        if(confirmation === true){

              const JWTtoken = await JWT.sign({email} , process.env.SECRET_KEY , {expiresIn : '1hr'})

              return res.status(200).json({
                message: "Login successful. Redirecting to home page.",
                redirect: "/user",
                
              });
        }

        else{

            return res.status(401).json({ message: "Incorrect password. Please try again." });
        }

        

     }

     else{

        return res.status(404).json({message : "Usesr not found" , redirect : '/signup'})
     }


    }

    catch(error){

         console.error(error)

         return res.status(500).json({message : 'Internal server error'})
    }
}




const FetchAllUsers = async(req,res)=>{

  try{

      const Userdata = await User_Model.find()

      return res.status(200).json(Userdata)
  }

  catch(error){
    console.error(error)
    return res.status(500).json({message : 'Internal server error'})
  }

}




const UpdateDetails = async(req,res)=>{

 const {name , email , phone , ID} = req.body

 try{

     
     const Updating = await User_Model.updateOne({$set : {UT_Email : email , UT_First_Name : name , UT_Contact_Number : phone}})

     return res.status(201).json({message : "Update successful"})
 }

 catch(error){
    console.error(error)
    return res.status(500).json({message : 'Internal Server error'})
 }

}




module.exports = {Login , SignUp , FetchAllUsers , UpdateDetails}
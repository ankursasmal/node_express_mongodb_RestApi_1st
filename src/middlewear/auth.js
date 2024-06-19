const jwt =require('jsonwebtoken');
let userDetails=require('../model/userDetail.js')
// auth is a middelwear
let auth=async(req,res,next)=>{
try{
    // 1. cookie ta thaka tokon get
    let tokonFromCookie=req.cookies.jwt;
// 2. cookie tokon no and secket key thia create tokoko
//jwt.verify check cookie ta thaka tokon same SECRET_KEY taha create or not atai auhttication
    let verifiuser=jwt.verify(tokonFromCookie , process.env.SECRET_KEY);
    //  console.log(verifiuser);

// 3.if verifiuser true all detail of model chala asba 
// now verifiuser under oe user ar all detail chala asba ki ki authorization acha db ta ta apidia render korta parbo
    // (name,email,... all thing)

    //****  na likla o hoi no matter
    const user= await userDetails.findById({_id:verifiuser._id});
    //  console.log(user)
  
    // console.log(verifiuser.name) ata ja asba console.log(user.name) same
    // karaon userDetails.findOne(verifiuser._id ) ta ja asba user a sama asba 

//  ****** for logout ******
req.tokonFromCookie=tokonFromCookie;
req.user=user;
 
 next();
}
  catch(e){
        res.status(401).send(e);
    }  
}
 module.exports=auth;
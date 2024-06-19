let express=require('express')
let route=express.Router();
let userDetails=require('../model/userDetail');
// for sequrity bcript
let bcript=require('bcrypt')
 // for sequrity jwt
let jwt=require('jsonwebtoken');
// cookie to value or tokon no take 
 const cookieParser = require('cookie-parser');

// it use as middel wear now you can use (not app.use here route.use)
route.use(cookieParser());

// auth ka require korta hoba
let auth=require('../middlewear/auth.js')

route.use((req,res,next)=>{
    next();
    })
route.get('/',( req,res)=>{
    res.render('Register.ejs');
})
route.get('/home',( req,res)=>{
   res.render('index.ejs',{
      url2:"https://plus.unsplash.com/premium_photo-1686063712972-e5f1c72a25e1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   url:'https://plus.unsplash.com/premium_photo-1714589991638-235c15633f59?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D',
             url1:'https://images.unsplash.com/photo-1714498988220-d6783c81a2a2?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  });
})
route.get('/about',( req,res)=>{
    
res.render('about.ejs',{
   url2:"https://plus.unsplash.com/premium_photo-1686063712972-e5f1c72a25e1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
url:'https://plus.unsplash.com/premium_photo-1714589991638-235c15633f59?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D',
          url1:'https://images.unsplash.com/photo-1714498988220-d6783c81a2a2?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
});
})

// for authentication auth as an parameter ecive korta hoba 
//  ****process => auth frist a verify hoba auth.js thaka true hobla next() cholba and page render hoba
route.get('/secretPage',auth,( req,res)=>{
 
    res. render('secret.ejs');
   })

// logOut ar jano login darkar
route.get('/logout',auth,async(req,res)=>{
    try{
        
        // only single device to logout
        //  ** (1&ata) only one device to delet cookie
         req.user.tokons=req.user.tokons.filter((ele)=>{
               return ele.tokon != req.tokonFromCookie;
    })
 
        //****************  1 & ata for logOut all devices  *******************
    //    req.user.tokons=[];
 
           //1. for delete cooke value must await because take time
         await res.clearCookie('jwt');
 
         
        //2. cookie clear por req.user ja chlo all info of user taka save koro
    await req.user.save();
            res.render('login.ejs');
     }
    catch(e){
        res.status(400).send(e);
    }
})


route.get('/contact',( req,res)=>{
 
 res. render('contact.ejs');
})
route.get('/about/:userId',( req,res)=>{
   fetch(`https://dummyjson.com/products/${req.params.userId}`)
.then(res => res.json())
.then((data)=>{
res. render('aboutParams.ejs',{
   url2:"https://plus.unsplash.com/premium_photo-1686063712972-e5f1c72a25e1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   url:'https://plus.unsplash.com/premium_photo-1714589991638-235c15633f59?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D',
             url1:'https://images.unsplash.com/photo-1714498988220-d6783c81a2a2?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
             data:data
  
});
})
})
route.get('/cart',( req,res)=>{
res. render('cart.ejs');
})

// Rest api
route.get('/login',async(req,res)=>{
   res.render('login.ejs')
})
route.post('/login',async(req,res)=>{
   try{
       let pass=req.body.password;
   let email=req.body.email;
   // frist find then match
let data=await userDetails.findOne({email:email})
// check pass using bcript (return true/false)
let ismatch= await bcript.compare(pass,data.password);
// jwt tokon of this email or user
let tokon=await data.GenerateTokon();

 //  ********* coookie ta value store **********
// using res.cookie bulit in fun  cookie ta tokon or value  store  korar
 res.cookie('jwt',tokon,{
    expires: new Date(Date.now()+5000000),
    httpOnly:true
 })
//   ********* cokkie  axcee not possbli here only cooki store ************
// now user authnticat or valid or not check (use cookie parser for authenticat or not check) 
console.log(req.cookies.jwt) 
// ans undefine because cookie store akono hoi ni (**** akana cookie store hocha ****)
// akana akono axcess nai anno route a console.log(req.cookies.jwt) likla value asba



    if(ismatch){
if(data.email===email){
   res.status(200).render('index.ejs',{
       url2:"https://plus.unsplash.com/premium_photo-1686063712972-e5f1c72a25e1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url:'https://plus.unsplash.com/premium_photo-1714589991638-235c15633f59?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D',
              url1:'https://images.unsplash.com/photo-1714498988220-d6783c81a2a2?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
   })

    }
    else{
        res.send('email not match')
    }
}
   else{
       res.send('pass not match')
   }
}

   catch(e){
       res.status(400).render('Error404.ejs',{
           error:'opps page not found'    } 
)}
})

route.get('/Register',async(req,res)=>{
res.render('Register.ejs');
})

route.post('/Register',async(req,res)=>{
try{
   let name=req.body.name;
   let pass=req.body.password;
   let cpass=req.body.confirmPassword;
   let email=req.body.email;
   let phone=req.body.phone;
// cpass and pass must same
if(cpass===pass){
    let result=await new userDetails({
name:name,
email:email,
password:pass,
cPassword:cpass,
phone:phone
    });

 // for jwt use 
const tokon=await result.GenerateTokon();
// using this tokon we check is user authenticae or not
res.cookie('jwt',tokon,{expires:new Date(Date.now()+30000000),
    httpOnly:true
});
// console.log(tokon);

  let data= await result.save();
   res.status(200).render('index.ejs',{
   url2:"https://plus.unsplash.com/premium_photo-1686063712972-e5f1c72a25e1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
url:'https://plus.unsplash.com/premium_photo-1714589991638-235c15633f59?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D',
          url1:'https://images.unsplash.com/photo-1714498988220-d6783c81a2a2?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
})


}
else{
res.send('pass word and confirmPasssword not match');
}
}
catch(e){
   res.status(400).render('Error404.ejs',{
       error:'opps page not found'})
   }
})
route.delete('/Register/:id',async(req,res)=>{
   try{
       let result=await userDetails.findByIdAndDelete(req.params.id);
       if(!result){
           res.status(404).send()
       }

       else{
           res.status(200).send()

       }

   }
   catch(e){
       res.status(400).render('Error404.ejs',{
           error:'page not found'
       })
   }
})

route.patch('/Register/:id',async(req,res)=>{
   try{
       let _id=req.params.id;
       let result=await userDetails.findByIdAndUpdate(_id,req.body,{new:true});
            res.status(200).send()

   }
   catch(e){
       res.status(400).render('Error404.ejs',{
           error:'page not found'
       })
   }
})






route.get('*',( req,res)=>{

res.render('Error404.ejs',{
   error:'oops page not found'
});
})


module.exports=route;
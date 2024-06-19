let mongoose=require('mongoose')
let validator=require('validator');
let bcript=require('bcrypt')
let jwt=require('jsonwebtoken');

let userSchems=new mongoose.Schema({
    name:{
        type:String,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('error email')
            }
        }
    },
    password:{
        type:String,
        minlength:3,
        required:true
    },
    cPassword:{
        type:String,
        minlength:3,
        required:true
    },
    phone:{
        type:Number,
    },
    tokons:[{
        tokon:{
            type:String,
            required:true
        }
    }]
})

// bcript
userSchems.pre('save',async function(next){
    // if means password present or not
    if(this.isModified('password')){
this.password=await bcript.hash(this.password,10);
this.cPassword=await bcript.hash(this.cPassword,10);
    }
    // next must else code not forword because it is a middle wear
    next();
})


// jwt for sequrity generate tolon
userSchems.methods.GenerateTokon=async function(){
    try{
    let tokonNo= jwt.sign({
     _id:this._id.toString(),
     name:this.name,
    email:this.email,
    password:this.password,
    cPassword:this.cPassword,
    phone:this.phone,
    },
    process.env.SECRET_KEY,
    {
        expiresIn:'30d'
    }
);
// for tokon[] under obj tokon value assign and save here but other are save in app.js file
this.tokons=this.tokons.concat({tokon:tokonNo});
// must save
 await this.save();

return tokonNo;
     }
    catch(e){
console.log(e)
return null;
     }
}


// db name alway under ' '
let userDetails=new mongoose.model('userDetails',userSchems);
module.exports = userDetails;
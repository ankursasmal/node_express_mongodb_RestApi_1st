let mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/userDetails')
.then(()=>{
    console.log('connection success');
}).catch(e=>{
    console.log(e);
})

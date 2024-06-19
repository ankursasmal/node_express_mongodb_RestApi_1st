let threeBar=document.getElementById('threeBar');
 let  slide=document.getElementById('slide');
 let  cross=document.getElementById('cross');

 let visiable=true;

threeBar.addEventListener('click',(e)=>{
    e.preventDefault();
    if(visiable){
        visiable=false;
     } 
    else{
        visiable=true;
 
    }

 if(!visiable){
        slide.style.cssText="display:block;visibility:visible"; 
 
    }
    else{
        slide.style.display='none'; 

    }
})
let visiable1=true;
cross.addEventListener('click',(e)=>{
    e.preventDefault();
    if(visiable){
        visiable=false;
     } 
    else{
        visiable=true;
 
    }

 if(!visiable){
        slide.style.cssText="display:block;visibility:visible"; 
 
    }
    else{
        slide.style.display='none'; 

    }
})

  

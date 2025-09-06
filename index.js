const slider=document.querySelector('#sliderlen');  
const num=document.querySelector('#num');    
const indicator=document.querySelector('#color');  
const uppercaseCheck=document.querySelector("#upper");
const lowercaseCheck=document.querySelector("#lower");
const numbercaseCheck=document.querySelector("#number");
const symbolsCheck=document.querySelector("#symbol");  
const allCheckbox=document.querySelectorAll(".checkin");
const generateButton=document.querySelector(".genBtn");  
const copymsg=document.querySelector("#copy");  
const copyBtn=document.querySelector(".clicku");    
const passwordDisplay=document.querySelector('.present')
let arr=['=','!','@','#','$','%','~','^','&','*','(',')','?',','];

let password="";
let passwordlength=10;
let countcheck=0;  
function sliderhandle()
{
    slider.value=passwordlength;
    num.innerHTML=passwordlength  
    const min=slider.min;
    const max=slider.max;  
    slider.style.backgroundSize=( (passwordlength-min)*100/(max-min))+"% 100%";

} 
sliderhandle();
 function setindicator(color)
 {
        indicator.style.backgroundColor=color; 
        indicator.style.boxShadow= `0px 0px 12px 1px ${color}`;
 }    
 setindicator("#ccc");
 function getrandomInteger(min,max)
 {
    let k=Math.random()*(max-min);
    let r=Math.floor(k)+min;  
    return r;
 }   
 function genrate_Random_Number()
 {
    return getrandomInteger(0,9).toString();
 }   
 function genrate_Random_Upper()
 {
    let m= getrandomInteger(65,91);  
    let c=String.fromCharCode(m);
    return c;
 }   
 function genrate_Random_Lower()
 {
    let m= getrandomInteger(97,123);  
    let c=String.fromCharCode(m);
    return c;
 } 
 function genrate_Random_Symbol()
 {
    let m= getrandomInteger(0,arr.length);  
    let c=arr[m];
    return c;
 }  
 function checkStrength()
{
      let hasUpper=false;
      let hasLower=false;
      let hasNum=false;
      let hasSym=false;
      if(uppercaseCheck.checked) hasUpper=true;
      if(lowercaseCheck.checked) hasLower=true;
      if(numbercaseCheck.checked) hasNum=true;
      if(symbolsCheck.checked) hasSym=true;  
      if(hasUpper&&hasLower&&(hasNum||hasSym)&&passwordlength>=8)
      {
        setindicator("#0f0");
      }  
      else if((hasLower||hasUpper)&&(hasNum||hasSym)&&passwordlength>=6)
      {
        setindicator("#ff0");
      }  
      else{
        setindicator("#f00");
      }
}    
 async function  copycontent()
{
    try{
        await   navigator.clipboard.writeText(passwordDisplay.value);
        copymsg.innerHTML='Copied';
    } 
    catch(e)  
    {
        copymsg.innerHTML='Failed';
    }  
    copymsg.classList.add('active'); 
    setTimeout(()=>{
      copymsg.classList.remove('active');  
    },2000);
}  
slider.addEventListener('input',(e)=>{
    passwordlength=e.target.value;  
    sliderhandle();
})  ;
copyBtn.addEventListener('click',()=>
{    if(passwordDisplay.value)
      copycontent();
})  ;   
function handleCheck()
{
    countcheck=0;  
    allCheckbox.forEach(checkbox=>{
      if(checkbox.checked)
        countcheck=countcheck+1;
    });  
    if(passwordlength<countcheck)
     { passwordlength=countcheck; 
       sliderhandle();
     }
}   
function  shufflePassword(array)
{
  for(let i=array.length-1;i>0;i--)
  {
    const j=Math.floor(Math.random()*(i+1));
    const temp=array[i];
    array[i]=array[j];
    array[j]=temp;
  }  
  let str="";
  array.forEach((el)=>(str+=el));
  return str;
}
allCheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheck);
});
generateButton.addEventListener('click',()=>
{
  if(countcheck<=0)
    return;
  if(passwordlength<countcheck)
  {
    passwordlength=countcheck; 
    sliderhandle();
  }  
  password="";
  // if(uppercaseCheck.checked)
  //   password+=genrate_Random_Upper();  
  // if(lowerercaseCheck.checked)
  //   password+=genrate_Random_Lower();
  // if(numbercaseCheck.checked)  
  //   password+=genrate_Random_Number();  
  // if(symbolsCheck.checked)
  //   password+=genrate_Random_Symbol();  
  let funcArr=[];
  if(uppercaseCheck.checked)
      funcArr.push(genrate_Random_Upper); 
  if(lowercaseCheck.checked)
    funcArr.push(genrate_Random_Lower);
  if(numbercaseCheck.checked)
    funcArr.push(genrate_Random_Number);
  if(symbolsCheck.checked)
    funcArr.push(genrate_Random_Symbol);  
  for(let i=0;i<funcArr.length;i++)
  {
    password+=funcArr[i]();
  } 
  for(let i=0;i<passwordlength-funcArr.length;i++)
  {
        let random=getrandomInteger(0,funcArr.length);
        password+=funcArr[random]();
  }  
  password=shufflePassword(Array.from(password));
  passwordDisplay.value=password;   
  checkStrength();

});


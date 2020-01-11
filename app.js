let imp=document.getElementById('print')
let mas=document.getElementById('mas');
const por=document.getElementById('por');
const menos=document.getElementById('menos');
const div=document.getElementById('div');
const clr=document.getElementById('clear');
const del=document.getElementById('erase');
const masMenos=document.getElementById('pm');
const punto=document.getElementById('punto');
const igual=document.getElementById('igual');
const error=document.querySelector('.error')
const numeros=document.querySelectorAll('.number');
const operadores=document.querySelectorAll('.oper');
let valu='';
let x=1;
let a=0
let j=[]
let signo=[]
let b=0;

numeros.forEach(function(e){
    e.addEventListener('click',add)
})
operadores.forEach(function(e){
    e.addEventListener('click',add)
})
clr.addEventListener('click',clear);
del.addEventListener('click',delet);
igual.addEventListener('click',convertir);


function add(e){
    
    
    valu+=this.value;
    imp.textContent = valu;
    e.target.classList.add('greenglow');
    setTimeout(function(){e.target.classList.remove('greenglow')},400);  
    sytError()
}

function sytError(){
    let regex=/[\+|\*|\/|\-|\.]{2,}/g //chequea si dos signos se repiten
    let regex2=/^[+*/.]{1,}/g//chequea si inicia con signo
    
    if(regex.test(valu)===true||regex2.test(valu)===true){
        error.style.backgroundColor='hsl(0, 100%, 50%)';
        error.style.border='3px solid yellow';

    }else if(regex.test(valu)===false&&regex2.test(valu)===false){
        error.style.border='3px solid black';
        error.style.backgroundColor='rgb(61, 1, 1)';        
    }
}
function clear(){
    imp.textContent='';
    valu='';
    clr.classList.add('redglow');
    setTimeout(function(){clr.classList.remove('redglow')},400);
    
    sytError();
}
function delet(){
    if(valu.length>0){
        
        valu=valu.slice(0,-1);
        imp.textContent = valu;
        del.classList.add('redglow');
        setTimeout(function(){del.classList.remove('redglow')},400);
        sytError(); 
    }
}

function convertir(){
    
   
   
    
   for(let i=0;i<valu.length;i++){
        if(valu[i]==='/'||valu[i]==='+'||valu[i]==='*'||valu[i]==='-'&&i>0){ //si hay un operador entonces cortalo y guardalo en a
            a=valu.slice(b,i)
            j.push(a)
            signo.push(valu[i]);
            b=i+1;
        }else{
            
        }

    }
    a=valu.slice(b,(valu.length))//toma el ultimo valor del string ya que la iteracion no llega hasta ese valor los empujamos en el array despues del bucle
    j.push(a);
   
    
    if(valu[valu.length-1]==='/'||valu[valu.length-1]==='+'||valu[valu.length-1]==='*'||valu[valu.length-1]==='-'){
        error.style.backgroundColor='hsl(0, 100%, 50%)'; //si se intenta calcular una operacion q finaliza en un signo
        error.style.border='3px solid yellow';
        imp.textContent='Syntax Error';
        j=[]
        a=0
        b=0
        valu=''
        signo=[]
       }
       

    if(error.style.border==='3px solid yellow'){//si se intenta calcular una operacion con errores de sintaxis el q sea
        imp.textContent='Syntax Error';
        j=[]
        a=0
        b=0
        valu=''
        signo=[]
        
        
    }else{
        operar()

    }
    
   
    
        
}
// funcion de operadores
function suma(s,d){
    return s+d
};
function resta(s,d){
    return s-d
}
function multiplica(s,d){
    return s*d
}
function divide(s,d){
    
    return s/d ; 
}

function operar(){
    
    
    for(let k=0;k<j.length;k++){ //convertir los datos de string a numero
        if(typeof(j[k])==="string"){

        }if(j[k].includes('.')===true){
           
            j[k]=parseFloat(j[k])
        }else{
         
            j[k]=parseInt(j[k])
            
        }
        
    }
 
    
  
    
    for(let z=0;z<signo.length;z++){ //division primero logica matematica ante todo
       if(signo[z]=='/'){ 
           
           j[z+1]=divide(j[z], j[z+1]); 

           j.splice(z,1)
           signo.splice(z,1);
           
           z=-1
            
        }
       

       
    }

    for(let p=0;p<signo.length;p++){//multiplicacion
        if(signo[p]=='*'){   
            
            j[p]=multiplica(j[p], j[p+1]);         
            j.splice(p+1,1)
            signo.splice(p,1);
            p=-1        
 
        }
     }
     for(let z=0;z<signo.length;z++){//resta
        if(signo[z]=='-'){   
            
            j[z]=resta(j[z], j[z+1]);         
            j.splice(z+1,1)
            signo.splice(z,1);
            z=-1  //menos uno para q zeta se resete por con z=0 el nuevo bucle inicia en 1        
 
        }
     }
     for(let z=0;z<signo.length;z++){//suma
        if(signo[z]=='+'){   
            
            j[z]=suma(j[z], j[z+1]);         
            j.splice(z+1,1)
            signo.splice(z,1);
            z=-1          
 
        }
     }
     
     
     if (j.length===1){
         
        imp.textContent=j[0];
        valu=''
        j=[]
        a=0
        b=0//devolver las variables a su estado inical al finalizar y mostrar la respuesta
        
         
         
     }
     
   
}
window.addEventListener('keydown', teclas)

function teclas(k){
    
    switch(k.keyCode){
        case  49:
        case  97:    
            valu+='1';
            imp.textContent=valu;
            k.preventDefault();
            break
        case 50:
        case  98:    
            valu+='2';
            imp.textContent=valu;
            k.preventDefault();
            break
        case 51:
        case  99:    
            valu+='3';
            imp.textContent=valu;
            k.preventDefault();
            break;
        case 52:
        case  100:
            valu+='4';
            imp.textContent=valu; 
            k.preventDefault();
            break;
        case 53:
        case 101:
            valu+='5';
            imp.textContent=valu; 
            k.preventDefault();
            break;
        case 54:
        case 102:
            valu+='6';
            imp.textContent=valu;
            k.preventDefault(); 
            break;
        case 55:
        case 103:
            valu+='7';
            imp.textContent=valu; 
            k.preventDefault();
            break;
        case 56:
        case 104:
            valu+='8';
            imp.textContent=valu;
            k.preventDefault(); 
            break;
        case 57:
        case 105:
            valu+='9';
            imp.textContent=valu; 
            k.preventDefault();
            break;
        case 48:
        case 96:
            valu+='0';
            imp.textContent=valu;
            k.preventDefault(); 
            break;
        case 107:
            valu+='+';
            imp.textContent=valu;
            k.preventDefault(); 
            break;
        case 189:
        case 109:
            valu+='-';
            imp.textContent=valu;
            k.preventDefault(); 
            break;
        case 187:
        case 106:
            valu+='*';
            imp.textContent=valu;
            k.preventDefault(); 
            break;
        case 111:
            valu+='/';
            imp.textContent=valu;
            k.preventDefault(); 
            break;
        case 8:
            
            delet();
            k.preventDefault();
            break;
        case 13:
            convertir();
            k.preventDefault();
          
            break;
        default:
            break;       
    }
    sytError();
  

}







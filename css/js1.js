function switchon(event){
    if(event=='R'){
        document.getElementById('screenans').value='';
        document.getElementById('screeninput').value='';
        document.getElementById('screeninput').focus();
    }
    if(event=='o' && cal.switch==0)
 {   cal.switch=1;
     document.getElementById('screeninput').readOnly=false;
    
}
else if(event=='o' && cal.switch==1){
    cal.switch=0;
    cal.ans=0;
    document.getElementById('screeninput').readOnly=true;
    document.getElementById('screeninput').value='';    
    document.getElementById('screenans').value='';
}
    document.getElementById('screeninput').oninput=function(){if(event=='o' || event=='R'){cal.switch=1;
            val=document.getElementById('screeninput');
            val.value='';
        }};    
    return;
    
}
function readInput(event){
        switchon(event.key);
    if(cal.switch==1){
        document.getElementById('screeninput').focus();
    if(event.key=='='){
         getvalues();
      }
    }
    else if(event.key!='o'){
        alert('siwtch on the calcualtor');
    }
}
function getvalues(){
    cal.input=document.getElementById('screeninput').value;
         cal.input+='=';
         document.getElementById('screeninput').blur();
          for(s=0;s<cal.input.length;){
              if(cal.other.indexOf(cal.input[s])<0)
              keyboard(cal.input[s]);
              s++;
          }
}
function keyboard(event23){ 
     calculate(event23);
        if(event23=='='){
        document.getElementById('screeninput').blur();              
        empty22();
        document.getElementById('screenans').value=cal.ans;
    }
    return 0;
}
function mouse(hit){
    switchon(hit);
    if(cal.switch==1){
        document.getElementById('screeninput').focus();
        if(hit=='=')
        getvalues();
        else if(hit=='s'){
            document.getElementById('screeninput').value+='sqrt(';    
        }
        else if(hit=='A')
        document.getElementById('screeninput').value+='ANS';    
        else if(hit!='o' &&  hit!='s' && hit!='R' && hit!='A')
        document.getElementById('screeninput').value+=hit;
        
    }
    else  if(event.key!='o'){
        alert('siwtch on the calcualtor');
    }
}
class calculator {
    ans;
    input;
    values=new Array();
    opr=new Array();
    switch;
    operator=new Array();
    number=new Array();
    other;
    constructor(){
       this.ans=0;
       this.other="bcdefghijklmnopqrtuvwxyzNS";
       this.input='';
       this.switch=0;
       this.operator=['()','+-' , '*/%','s^' ,'='];
       this.number=['0' , '1' , '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9'  , '.' ,'A'];
    }
    setvalues(a){
        this.values.push(a);
    }
    setopr(b){
        this.opr.push(b);
    }
    add(){
        //alert(this.values.pop());
        
        this.setvalues(Number(this.values.pop()+this.values.pop()));
        //this.ans=this.values.pop();
    }
    subtract(){
       var a=this.values.pop();
       var b=this.values.pop();
        this.setvalues(Number(b-a));
        //this.ans=this.values.pop();
    }
    multiply(){
        
       var a=this.values.pop();
       var b=this.values.pop();
        this.setvalues(Number(b*a));
        //this.ans=this.values.pop();
    } 
    divide(){      
        var a=this.values.pop();
        var b=this.values.pop();
        this.setvalues(Number(b/a));
        //this.ans=this.values.pop();
    }
    modulus(){
        
        var a=this.values.pop();
        var b=this.values.pop();
        this.setvalues(Number(b%a));
    }
    power(){
        
        var a=this.values.pop();
        var b=this.values.pop();
        this.setvalues(Number(Math.pow(a,b)));
    }
}
var cal=new calculator();
function checkprecendence(ind,event2){
   if(event2!='('){
  while((cal.opr.length>0&&cal.opr[cal.opr.length-1]!='(')){
        var opr23=(cal.opr[cal.opr.length-1]);    
        var ind1=matchopr(opr23);
        if(ind<ind1||ind==ind1){
           solve(cal.opr.pop());  
        }
        else
        return;
    }
   }
    return;
}
function empty22(){
    while(cal.opr.length>0){
        solve(cal.opr.pop()); 
    }
    cal.ans=Number(cal.values.pop());    
}
function solve(opr1){
    if(singlevalue(opr1)!=1){
    switch(opr1){
      case '+':
          cal.add();
          break;
          case '-':
            cal.subtract();
            break;
            case '*':
          cal.multiply();
          break;
          case '/':
        cal.divide();
        break;
        case '%':
        cal.modulus();
        break;
        case '^':
        cal.power();

  }
}
  return;
}
var num='';
var flag=0;
function calculate(event2){
 if(cal.number.indexOf(event2)>-1){
    if(event2=='A'){
    num=Number(cal.ans);
}
    else{
    num+=(event2);}
     flag=1;
     return;
 }
 var ind=matchopr(event2);
 if(ind>-1)
 {
     if(flag==1)
    cal.setvalues(Number(num));
    if(event2!='='){
    checkprecendence(ind,event2);
    cal.setopr(event2);   
}
    num=0;
    flag=0;
 }
}
function matchopr(event2){
    for(x=0;x<cal.operator.length;x++){
        if(cal.operator[x].toString().indexOf(event2)>-1)
        return x;
    }
    return -1;
}
function singlevalue(event2){
    if(event2=='s'){
        cal.setvalues(Math.sqrt(cal.values.pop()));
        return 1;  
    }
    else 
    return 0;
}
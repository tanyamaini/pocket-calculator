// TO FIX: -- ALL FIXED
// DECIMAL WONT SHOW UP
// SOMETIMES MESSES UP AND GIVES WRONG ANSWER
// WHEN ANSWER TO BIG, WRITE IN EXPONENTS SO "E" SOMETHING
// COMMAS
// MAKE THE 0 BUTTON SPAN TWO TABLE CELLS
// WHEN TYPE IN NEGATIVE NUMBER AND THEN A SYMBOL AND THEN ANOTHER NUMBER, NEGATIVE DOESN'T EVALUATE
// DECIMALS CONTINUE REPEATING
// IMPLIED ZERO AFTER DECIMAL
var equationString = ""; //STRING OF THE WHOLE EQUATION INCLUDING SIGNS AND NUMBERS
let equationArray= [];
let calculationDone = false;
let numbers = ""; //String of all numbers tped only, not including signs
let errorWord = "Error";
let error = false;
let commas = "";
let numberSplit;
let originalValue = "";
let thereIsDecimal = false;
let zeroPressedAfterDecimal = false;
let commasArray=[]; //Turning commas string into an array to fix thereIsDecimal
function displayValue(valuesInputted) { //VALUESINPUTTED IS THE VALUE OF THE LAST CLICKED BUTTON
  if(calculationDone==true){
    clearDisplay();
  }

  // ignore repeated decimals e.g. 1.2.3
  let findDecimal= commasArray.indexOf(".");
  // alert(findNegative);
  if(findDecimal == "-1"){
    thereIsDecimal = false;
  }
  else{
    thereIsDecimal = true;
  }
  if(thereIsDecimal && valuesInputted == "."){
     return;
  }

  //enable-disable buttons based on 9 digit criteria
  let firstNumberDone= false;
  document.getElementById("one").disabled = false;
  document.getElementById("two").disabled = false;
  document.getElementById("three").disabled = false;
  document.getElementById("four").disabled = false;
  document.getElementById("five").disabled = false;
  document.getElementById("six").disabled = false;
  document.getElementById("seven").disabled = false;
  document.getElementById("eight").disabled = false;
  document.getElementById("nine").disabled = false;
  document.getElementById("zero").disabled = false;

  if(valuesInputted== "1" || valuesInputted=="2" || valuesInputted=="3" || valuesInputted=="4" || valuesInputted=="5" || valuesInputted=="6" || valuesInputted=="7" || valuesInputted=="8" || valuesInputted=="9" || valuesInputted=="0"){
    numbers = numbers + valuesInputted;
  }
  if(valuesInputted=="." || valuesInputted== "1" || valuesInputted=="2" || valuesInputted=="3" || valuesInputted=="4" || valuesInputted=="5" || valuesInputted=="6" || valuesInputted=="7" || valuesInputted=="8" || valuesInputted=="9" || valuesInputted=="0"){
    commas = commas + valuesInputted;
  }

  commasArray = commas.split("");

  if (equationArray.length === 0){
    equationArray[0]= valuesInputted;
    firstNumberDone= true;
  }
  numbers= Number(numbers);
  let digits=numbers.toString().length;
  if(digits >= 9){
    document.getElementById("one").disabled = true;
    document.getElementById("two").disabled = true;
    document.getElementById("three").disabled = true;
    document.getElementById("four").disabled = true;
    document.getElementById("five").disabled = true;
    document.getElementById("six").disabled = true;
    document.getElementById("seven").disabled = true;
    document.getElementById("eight").disabled = true;
    document.getElementById("nine").disabled = true;
    document.getElementById("zero").disabled = true;
  }
   if(valuesInputted == "+" || valuesInputted=="-" || valuesInputted=="/" || valuesInputted=="*"){
    document.getElementById("one").disabled = false;
    document.getElementById("two").disabled = false;
    document.getElementById("three").disabled = false;
    document.getElementById("four").disabled = false;
    document.getElementById("five").disabled = false;
    document.getElementById("six").disabled = false;
    document.getElementById("seven").disabled = false;
    document.getElementById("eight").disabled = false;
    document.getElementById("nine").disabled = false;
    document.getElementById("zero").disabled = false;
   }

  if(numbers <= 999999999){
    if(calculationDone== true){
      clear("");
      calculationDone = false;
  }

  if(firstNumberDone==false){
    equationArray.push(valuesInputted);
    if(valuesInputted == "."){
      equationArray.push("0");
      commas = commas + "0";
    }
  }

  //show a decimal with implied zero
  let arrayLength = equationArray.length;
  if((equationArray[equationArray.length-2] == "0") && (equationArray[equationArray.length-3]==".") && (valuesInputted=="0")){
    zeroPressedAfterDecimal = true;
    equationArray.splice(arrayLength-2, 1);
    commas = commas.replace(".0",'.');
  }

  if((zeroPressedAfterDecimal == false) && (equationArray[arrayLength-2] == "0") && (equationArray[arrayLength-3]==".") && (valuesInputted=="0" || valuesInputted=="1" || valuesInputted=="2" || valuesInputted=="3" || valuesInputted=="4" || valuesInputted=="5" || valuesInputted=="6" || valuesInputted=="7" || valuesInputted=="8" || valuesInputted=="9")){
    equationArray.splice(arrayLength-2, 1);
    commas = commas.replace(".0",'.');
  }

  if((valuesInputted=="*" || valuesInputted=="+" || valuesInputted=="/" || valuesInputted=="-") && (equationArray[arrayLength-2] == "*" || equationArray[arrayLength-2] == "+" || equationArray[arrayLength-2]=="-" || equationArray[arrayLength-2]=="/")){ //equationArray[0] == valuesInputted
    equationArray.splice(arrayLength-2, 1);
  }

  equationString=equationArray.join("");

  if(valuesInputted=="+" || valuesInputted== "-" || valuesInputted== "*" || valuesInputted== "/"){
    clear("");
    numbers="";
    commas = "";
    numbersSplit = "";
  }
  else {
    numbersSplit = "";
    numbersSplit = commas.toString().split(".");
    numbersSplit[0] = numbersSplit[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    numbersSplit= numbersSplit.join(".");
    document.getElementById('displayScreen').value = numbersSplit;
  }
  // if(equationArray[arrayLength-1]=="0" && equationArray[arrayLength-2] =="."){
  //   equationArray.splice(arrayLength-2, 1);
  // }
  }
}

function negative(){
  // document.getElementById('displayScreen').value = document.getElementById('displayScreen').value * -1;
  // equationString = equationString + " * -1";
  // equationArray.push("*", "-", "1");
  equationArray.unshift("*");
  equationArray.unshift("1");
  equationArray.unshift("-");
  equationString=equationArray.join("");

  if(document.getElementById('displayScreen').value.startsWith("-") == false){
    originalValue = document.getElementById('displayScreen').value;
    document.getElementById('displayScreen').value = "-" + document.getElementById('displayScreen').value;
  }
  else {
    document.getElementById('displayScreen').value= originalValue;
  }
}


function percentage(){
  document.getElementById('displayScreen').value = document.getElementById('displayScreen').value / 100;
  equationArray.push("/","1", "0", "0");
  equationString=equationArray.join("");
}


function clear(empty){
  document.getElementById('displayScreen').value = empty;
}


function clearDisplay(empty) {
	document.getElementById('displayScreen').value = empty;
    equationString="";
    numbersSplit="";
    commas="";
    numbers="";
    equationArray=[];
    originalValue="";
}


function resultValue() {
  if (equationString == ""){
    return;
  }
  let arrayLength = equationArray.length;
  error=false;
  if(equationArray[arrayLength-2]=="/" && equationArray[arrayLength-1]=="0"){
    error=true;
  }
  if((equationArray[arrayLength-1] == ".") && (equationArray[arrayLength-2]=="+" || equationArray[arrayLength-2]=="-" || equationArray[arrayLength-2]=="*" || equationArray[arrayLength-2]=="/")){
    document.getElementById('displayScreen').value = "0";
  }
  else if(equationArray=="."){
    document.getElementById('displayScreen').value = "0";
  }
  else if(error==true){
    document.getElementById('displayScreen').value = errorWord;
  }
  else if (error==false){
    let result = eval(equationString);
    let digitsResult=result.toString().length;
    var split = result.toString().split(".");
    split[0] = split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    split= split.join(".");
    let noZeros = result.toExponential(8);
    let noZerosResult = noZeros.toString();
    var numbersSplit = noZerosResult.split(".");
    numbersSplit[0] = numbersSplit[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    numbersSplit= numbersSplit.join(".");
    if(digitsResult > 9){
      if(numbersSplit == "1.00000000e+9"){
        numbersSplit = "1e9";
      }
      document.getElementById('displayScreen').value = numbersSplit;
    }
    else{
    	document.getElementById('displayScreen').value = split;
  }
}
  equationString="";
  calculationDone = true;
  equationArray = [];
  originalValue="";
}

'use strict';
let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}


let money;
let income = "фриланс";
let addExpenses = "интернет, такси, коммуналка";
let deposit = true;
let mission = 55600;
let period = 12;

let start = function(){
  do{
    money = prompt('Ваш месячный доход?');
  }
  while(!isNumber(money));
};
start();
function showTypeOf(data){
  console.log(typeof(data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(","));


money *= 1;
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
console.log(deposit);

let expenses = [];

function getExpensesMonth(){
  let sum = 0;
  let expenseAmount = 0;
  for(let i = 0; i < 2; i++){
    expenses[i] = prompt('Введите обязательную статью расходов?');
    expenseAmount = prompt('Во сколько это обойдется?');
    while(!isNumber(expenseAmount)){
      expenseAmount = prompt('Во сколько это обойдется?');
    }
    expenseAmount *= 1;
    sum += expenseAmount;
  }
  console.log(expenses);
  return sum;
}

let expensesAmount = getExpensesMonth();
console.log("Расходы в месяц: " + expensesAmount);
function getAccumulatedMonth(money){
  let expenses = expensesAmount;
  return money - expenses;
}
let accumulatedMonth = getAccumulatedMonth(money);
console.log("Месячный доход: " + accumulatedMonth);
function getTargetMonth(accumulated, mission){
  if((mission / accumulated) <= 0 || (mission / accumulated) === Infinity){
    return console.log('Цель не будет достигнута');
  }
  else{
    console.log("Цель будет достигнута через " + Math.ceil(mission / accumulated) + " месяцев");
  }
}
getTargetMonth(accumulatedMonth, mission);
let budgetDay = Math.floor(accumulatedMonth / 30);
console.log("Бюджет на день: " + budgetDay);

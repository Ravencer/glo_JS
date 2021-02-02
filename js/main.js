'use strict';

let money = 25500;
let income = "фриланс";
let addExpenses = "интернет, такси, коммуналка";
let deposit = true;
let mission = 55600;
let period = 12;

function showTypeOf(data){
  console.log(typeof(data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(","));


money = prompt('Ваш месячный доход?');
money *= 1;
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
console.log(deposit);
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?');

function getExpensesMonth(price1, price2){
  return Number(price1) + Number(price2);
}
console.log("Расходы в месяц: " + getExpensesMonth(amount1, amount2));
function getAccumulatedMonth(money){
  let expenses = getExpensesMonth(amount1, amount2);
  return money - expenses;
}
let accumulatedMonth = getAccumulatedMonth(money);
console.log("Месячный доход: " + accumulatedMonth);
function getTargetMonth(accumulated, mission){
  return Math.ceil(mission / accumulated);
}
console.log("Цель будет достигнута через " + getTargetMonth(accumulatedMonth, mission) + " месяцев");
let budgetDay = Math.floor(accumulatedMonth / 30);
console.log("Бюджет на день: " + budgetDay);

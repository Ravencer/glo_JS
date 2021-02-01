'use strict';

let money = 25500;
let income = "фриланс";
let addExpenses = "интернет, такси, коммуналка";
let deposit = true;
let mission = 55600;
let period = 12;

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей/долларов/гривен/юани");
addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(","));
let budgetDay = money / 30;
console.log(budgetDay);


money = prompt('Ваш месячный доход?');
money *= 1;
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
console.log(deposit);
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?');
let budgetMonth = money - (Number(amount1) + Number(amount2));
console.log('Бюджет на месяц: ' + budgetMonth);
let missionComplete = 0;
let monthsComplete = 0;
while(missionComplete <= mission){
  missionComplete += budgetMonth;
  monthsComplete += 1;
}
console.log('Цель будет достигнута через ' + monthsComplete + ' месяцев');
budgetDay = Math.floor(money / 30);

  if (budgetDay >= 1200){
    console.log('У вас высокий уровень дохода');
  }
  else if (budgetDay >= 600 && budgetDay < 1200){
    console.log('У вас средний уровень дохода');
  }
  else if (budgetDay > 0 && budgetDay < 600){
    console.log('К сожалению, у вас уровень дохода ниже среднего');
  }
  else if (budgetDay <= 0){
     console.log('Что-то пошло не так');
  }
    

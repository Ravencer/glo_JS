'use strict';


let money;

let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let isStr = function(str){
  return /^[\d\-\/]*$/.test(str);
};

let start = function(){
  do{
    money = prompt('Ваш месячный доход?');
  }
  while(!isNumber(money));
};
start();
money *= 1;

let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  accumulatedMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  asking: function(){
    if (confirm('Есть ли у вас дополнительный заработок?')){
      let itemIncome;
      do{
        itemIncome = prompt('Какой у вас есть дополнительный заработок?');
      }
      while(isStr(itemIncome));
      let cashIncome;
      do{
        cashIncome = prompt('Сколько в месяц зарабатываете на этом?');
      }
      while(!isNumber(cashIncome));
      cashIncome *= 1;
      appData.income[itemIncome] = cashIncome;
    }
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
      appData.addExpenses = addExpenses.toLowerCase().split(",");
      appData.deposit = confirm('Есть ли у вас депозит в банке?');
      for(let i = 0; i < 2; i++){
        let itemExpenses;
        let cashExpenses;
        do{
          itemExpenses = prompt('Введите обязательную статью расходов?');
        }
        while(isStr(itemExpenses));
        do{
          cashExpenses = prompt('Во сколько это обойдется?');
        }
        while(!isNumber(cashExpenses));
        cashExpenses *= 1;
        appData.expenses[itemExpenses] = cashExpenses;
      }
  },
  getExpensesMonth: function(){
    let sum = 0;
    for(let key in appData.expenses){
      sum += appData.expenses[key];
    }
    appData.expensesMonth = sum;
    appData.accumulatedMonth = appData.budget - sum;
  },
  getBudget: function(){
    appData.budgetDay = Math.round((appData.budget - appData.expensesMonth) / 30);
    appData.budgetMonth = (appData.budget - appData.expensesMonth);
  },
  getTargetMonth: function(){
    if((appData.mission / appData.accumulatedMonth) <= 0 || (appData.mission / appData.accumulatedMonth) === Infinity){
      return console.log('Цель не будет достигнута');
    }
    else{
      console.log("Цель будет достигнута через " + Math.ceil(appData.mission / appData.accumulatedMonth) + " месяцев");
    }
  },
  getStatusIncome: function(){
    if (appData.budgetDay >= 1200){
      console.log('У вас высокий уровень дохода');
    }
    else if (appData.budgetDay >= 600 && appData.budgetDay < 1200){
      console.log('У вас средний уровень дохода');
    }
    else if (appData.budgetDay > 0 && appData.budgetDay < 600){
      console.log('К сожалению, у вас уровень дохода ниже среднего');
    }
    else if (appData.budgetDay <= 0){
       console.log('Что-то пошло не так');
    }
  }, 
  getInfoDeposit: function(){
    if(appData.deposit){
      let percentItem;
      let moneyDep;
      do{
        percentItem = prompt('Какой годовой процент?');
      }
      while(!isNumber(percentItem));
      percentItem *= 1;
      appData.percentDeposit = percentItem;
      do{
        moneyDep = prompt('Какая сумма заложена?');
      } 
      while(!isNumber(moneyDep));
      moneyDep *= 1;
      appData.moneyDeposit = moneyDep;
    }
  },
  calcSavedMoney: function(){
    return appData.budgetMonth * appData.period;
  }
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

console.log("Расходы в месяц: " + appData.expensesMonth);
console.log("Месячный доход: " + appData.accumulatedMonth);
console.log('Наша программа включает в себя данные: ');
for(let key in appData){
  console.log(key + ': ' + appData[key]);
}
let str;
let strComplete = '';
for(let i = 0; i < appData.addExpenses.length; i++){
  str = appData.addExpenses[i].trim();
  strComplete = strComplete + str.charAt(0).toUpperCase() + str.slice(1) + ', ';
}
console.log(strComplete);

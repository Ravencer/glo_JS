'use strict';

let buttonCount = document.getElementById('start');
let incomePlus = document.getElementsByTagName('button')[0];
let expensesPlus = document.getElementsByTagName('button')[1];
let depositCheck = document.querySelector('#deposit-check');
let additionalInput = document.querySelectorAll('.additional_income-item');
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let budgetDayVal = document.getElementsByClassName('budget_day-value')[0];
let expensesMonthVal = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeVal = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesVal = document.getElementsByClassName('additional_expenses-value')[0];
let incomePerVal = document.getElementsByClassName('income_period-value')[0];
let targetMontVal = document.getElementsByClassName('target_month-value')[0];
let salaryInput = document.querySelector('.salary-amount');
let incomeTitle = document.querySelectorAll('.income-title')[1];
let addIncomeFirst = document.querySelectorAll('.additional_income-item')[0];
let addIncomeSecnd = document.querySelectorAll('.additional_income-item')[1];
let expensesTitle = document.querySelectorAll('.expenses-title')[1];
let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');
let addExpensesItem = document.querySelector('.additional_expenses-item');
let depAmount = document.querySelector('.deposit-amount');
let depPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let periodRange = document.querySelector('.period-select');
let incomeItem = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');
let incomeAmount = document.querySelector('.income-amount');
let expensesAmount = document.querySelector('.expenses-amount');




let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isStr = function(str){
  if(str === null){
    return false;
  }
  else{
    return /^[\d\-\/]*$/.test(str) || str.trim() === '';
  }
};

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  accumulatedMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function(){
    
    
    appData.budget = salaryInput.value;
    appData.budget *= 1;
    appData.getExpenses();
    appData.getIncome();
    
    
    appData.getExpensesMonth();
    appData.getIncomeMonth();
    appData.getTargetMonth();
    appData.getInfoDeposit();
    appData.getAddExpenses();
    appData.getAddIncome();
    targetMontVal.value = appData.getTargetMonth();

    appData.getBudget();
    appData.showResult();
  },
  showResult: function(){
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayVal.value = appData.budgetDay;
    expensesMonthVal.value = appData.expensesMonth;
    additionalExpensesVal.value = appData.addExpenses.join(', ');
    additionalIncomeVal.value = appData.addIncome.join(', ');
    incomePerVal.value = appData.calcSavedMoney();
    periodRange.addEventListener('change', () => {
      incomePerVal.value = appData.calcSavedMoney();
    });
  },
  addExpensesBlock: function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    let textContentItem = cloneExpensesItem.querySelector('.expenses-title');
    cloneExpensesItem.querySelector('.expenses-title').addEventListener('keyup', function(){
      this.value = this.value.replace(/[^А-Я, а-я]/,'');
    });
    textContentItem.value = '';
    textContentItem = cloneExpensesItem.querySelector('.expenses-amount');
    cloneExpensesItem.querySelector('.expenses-amount').addEventListener('keyup', function(){
      this.value = this.value.replace(/[^\d]/g, '');
    });
    textContentItem.value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  },
  getExpenses: function(){
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      
      if(itemExpenses !== '' && cashExpenses !== ''){
        cashExpenses *= 1;
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  addIncomeBlock: function(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    let textContentItem = cloneIncomeItem.querySelector('.income-title');
    cloneIncomeItem.querySelector('.income-title').addEventListener('keyup', function(){
      this.value = this.value.replace(/[^А-Я, а-я]/,'');
    });
    textContentItem.value = '';
    textContentItem = cloneIncomeItem.querySelector('.income-amount');
    cloneIncomeItem.querySelector('.income-amount').addEventListener('keyup', function(){
      this.value = this.value.replace(/[^\d]/g, '');
    });
    textContentItem.value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
      incomePlus.style.display = 'none';
    }
  },
  getIncome: function(){
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      
      if(itemIncome !== '' && cashIncome !== ''){
        cashIncome *= 1;
        
        appData.income[itemIncome] = cashIncome;
      }
    });
  },
  getAddExpenses: function(){
    let addExpenses = addExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function(){
    additionalInput.forEach(function(item){
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    });
  },
  asking: function(){
    
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
      if(addExpenses !== null){
         appData.addExpenses = addExpenses.toLowerCase().split(",");
      }
      appData.deposit = confirm('Есть ли у вас депозит в банке?');
      
  },
  getExpensesMonth: function(){
    let sum = 0;
    for(let key in appData.expenses){
      sum += appData.expenses[key];
    }
    appData.expensesMonth = sum;
    appData.accumulatedMonth = appData.budget - sum;
  },
  getIncomeMonth: function(){
      let sum = 0;
      for(let key in appData.income){
        sum += appData.income[key];
      }
      appData.incomeMonth = sum;
  },
  getBudget: function(){
    appData.budgetDay = Math.round((appData.budget - appData.expensesMonth + appData.incomeMonth) / 30);
    appData.budgetMonth = (appData.budget + appData.incomeMonth - appData.expensesMonth);
  },
  getTargetMonth: function(){
    if((targetAmount.value / appData.accumulatedMonth) <= 0 || (targetAmount.value / appData.accumulatedMonth) === Infinity){
      return 'Цель не будет достигнута';
    }
    else{
      return "Цель будет достигнута через " + Math.ceil(targetAmount.value / appData.accumulatedMonth) + " месяцев";
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
       console.log('Что-то пошло не так!');
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
    return appData.budgetMonth * periodRange.value;
  }
};

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodRange.addEventListener('change', () => {
  periodAmount.textContent = periodRange.value;
});

buttonCount.addEventListener('click', () =>{
  if(salaryInput.value.trim() !== '' && isNumber(salaryInput.value)){
    appData.start();
  }
});

incomeTitle.addEventListener('keyup', () => {
  incomeTitle.value = incomeTitle.value.replace(/[^А-Я, а-я]/,'');
});
incomeAmount.addEventListener('keyup', function(){
  this.value = this.value.replace(/[^\d]/g, '');
});
addIncomeFirst.addEventListener('keyup', () => {
  addIncomeFirst.value = addIncomeFirst.value.replace(/[^А-Я, а-я]/,'');
});
addIncomeSecnd.addEventListener('keyup', () => {
  addIncomeSecnd.value = addIncomeSecnd.value.replace(/[^А-Я, а-я]/,'');
});
expensesTitle.addEventListener('keyup', () => {
  expensesTitle.value = expensesTitle.value.replace(/[^А-Я, а-я]/,'');
});
expensesAmount.addEventListener('keyup', function(){
  expensesAmount.value = expensesAmount.value.replace(/[^\d]/g, '');
});

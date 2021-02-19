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
let buttonReset = document.querySelector('#cancel');
let expensesAmountAll = document.querySelectorAll('input.expenses-amount');
let expensesTitleAll = document.querySelectorAll('input.expenses-title');
let incomeAmountAll = document.querySelectorAll('input.income-amount');
let incomeTitleAll = document.querySelectorAll('input.income-title');


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
    this.budget = salaryInput.value;
    this.budget *= 1;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getTargetMonth();
    this.getInfoDeposit();
    this.getAddExpenses();
    this.getAddIncome();
    targetMontVal.value = this.getTargetMonth();
    this.getBudget();
    this.showResult();
  },
  reset: function(){
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.accumulatedMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    salaryInput.value = '';
    depositCheck.checked = false;
    expensesItems = document.querySelectorAll('.expenses-items');
    incomeItems = document.querySelectorAll('.income-items');
    if(expensesItems.length > 1){
      for(let i = 1; i < expensesItems.length; i++){
        expensesItems[i].remove();
      }
    }
    if(incomeItems.length > 1){
      for(let i = 1; i < incomeItems.length; i++){
        incomeItems[i].remove();
      }
    }
    incomeTitleAll.forEach(elem => {
      elem.disabled = false;
      elem.value = '';
    });
    incomeAmountAll.forEach(elem => {
      elem.disabled = false;
      elem.value = '';
    });
    expensesTitleAll.forEach(elem => {
      elem.disabled = false;
      elem.value = '';
    });
    expensesAmountAll.forEach(elem => {
      elem.disabled = false;
      elem.value = '';
    });
    salaryInput.disabled = false;
    addIncomeFirst.disabled = false;
    addIncomeFirst.value = '';
    addIncomeSecnd.disabled = false;
    addIncomeSecnd.value = '';
    incomePlus.style.display = 'block';
    expensesPlus.style.display = 'block';
    addExpensesItem.disabled = false;
    targetAmount.disabled = false;
    periodRange.disabled = false;
    addExpensesItem.value = '';
    targetAmount.value = '';
    periodRange.value = 1;
    periodAmount.textContent = periodRange.value;
    budgetMonthValue.value = 0;
    budgetDayVal.value = 0;
    expensesMonthVal.value = 0;
    additionalExpensesVal.value = '';
    additionalIncomeVal.value = '';
    incomePerVal.value = 0;
    targetMontVal.value = '';

    buttonReset.style.display = 'none';
    buttonCount.style.display = 'block';
  },
  showResult: function(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayVal.value = this.budgetDay;
    expensesMonthVal.value = this.expensesMonth;
    additionalExpensesVal.value = this.addExpenses.join(', ');
    additionalIncomeVal.value = this.addIncome.join(', ');
    incomePerVal.value = this.calcSavedMoney();
    periodRange.addEventListener('change', () => {
      incomePerVal.value = this.calcSavedMoney();
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
         this.addExpenses = addExpenses.toLowerCase().split(",");
      }
      this.deposit = confirm('Есть ли у вас депозит в банке?');
      
  },
  getExpensesMonth: function(){
    let sum = 0;
    for(let key in appData.expenses){
      sum += appData.expenses[key];
    }
    this.expensesMonth = sum;
    this.accumulatedMonth = this.budget - sum;
  },
  getIncomeMonth: function(){
      let sum = 0;
      for(let key in appData.income){
        sum += appData.income[key];
      }
      this.incomeMonth = sum;
  },
  getBudget: function(){
    this.budgetDay = Math.round((this.budget - this.expensesMonth + this.incomeMonth) / 30);
    this.budgetMonth = (this.budget + this.incomeMonth - this.expensesMonth);
  },
  getTargetMonth: function(){
    if((targetAmount.value / this.accumulatedMonth) <= 0 || (targetAmount.value / this.accumulatedMonth) === Infinity){
      return 'Цель не будет достигнута';
    }
    else{
      return "Цель будет достигнута через " + Math.ceil(targetAmount.value / this.accumulatedMonth) + " месяцев";
    }
  },
  getStatusIncome: function(){
    if (this.budgetDay >= 1200){
      console.log('У вас высокий уровень дохода');
    }
    else if (this.budgetDay >= 600 && this.budgetDay < 1200){
      console.log('У вас средний уровень дохода');
    }
    else if (this.budgetDay > 0 && this.budgetDay < 600){
      console.log('К сожалению, у вас уровень дохода ниже среднего');
    }
    else if (this.budgetDay <= 0){
       console.log('Что-то пошло не так!');
    }
  }, 
  getInfoDeposit: function(){
    if(this.deposit){
      let percentItem;
      let moneyDep;
      do{
        percentItem = prompt('Какой годовой процент?');
      }
      while(!isNumber(percentItem));
      percentItem *= 1;
      this.percentDeposit = percentItem;
      do{
        moneyDep = prompt('Какая сумма заложена?');
      } 
      while(!isNumber(moneyDep));
      moneyDep *= 1;
      this.moneyDeposit = moneyDep;
    }
  },
  calcSavedMoney: function(){
    return this.budgetMonth * periodRange.value;
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
    salaryInput.disabled = true;
    expensesAmountAll = document.querySelectorAll('input.expenses-amount');
    expensesTitleAll = document.querySelectorAll('input.expenses-title');
    incomeAmountAll = document.querySelectorAll('input.income-amount');
    incomeTitleAll = document.querySelectorAll('input.income-title');
    incomeTitleAll.forEach(elem => {
      elem.disabled = true;
    });
    incomeAmountAll.forEach(elem => {
      elem.disabled = true;
    });
    addIncomeFirst.disabled = true;
    addIncomeSecnd.disabled = true;
    incomePlus.style.display = 'none';
    expensesPlus.style.display = 'none';
    
    expensesTitleAll.forEach(elem => {
      elem.disabled = true;
    });
    
    expensesAmountAll.forEach(elem => {
      elem.disabled = true;
    });
    addExpensesItem.disabled = true;
    
    targetAmount.disabled = true;
    
    periodRange.disabled = true;
    
    buttonCount.style.display = 'none';
    buttonReset.style.display = 'block';
    buttonReset.addEventListener('click', function(){
      appData.reset();
    });
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

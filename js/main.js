'use strict';

let buttonCount = document.getElementById('start'),
  incomePlus = document.getElementsByTagName('button')[0],
  expensesPlus = document.getElementsByTagName('button')[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalInput = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayVal = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthVal = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeVal = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesVal = document.getElementsByClassName('additional_expenses-value')[0],
  incomePerVal = document.getElementsByClassName('income_period-value')[0],
  targetMontVal = document.getElementsByClassName('target_month-value')[0],
  salaryInput = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelectorAll('.income-title')[1],
  addIncomeFirst = document.querySelectorAll('.additional_income-item')[0],
  addIncomeSecnd = document.querySelectorAll('.additional_income-item')[1],
  expensesTitle = document.querySelectorAll('.expenses-title')[1],
  incomeItems = document.querySelectorAll('.income-items'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  addExpensesItem = document.querySelector('.additional_expenses-item'),
  depAmount = document.querySelector('.deposit-amount'),
  depPercent = document.querySelector('.deposit-percent'),
  targetAmount = document.querySelector('.target-amount'),
  periodRange = document.querySelector('.period-select'),
  incomeItem = document.querySelectorAll('.income-items'),
  periodAmount = document.querySelector('.period-amount'),
  incomeAmount = document.querySelector('.income-amount'),
  expensesAmount = document.querySelector('.expenses-amount'),
  buttonReset = document.querySelector('#cancel'),
  expensesAmountAll = document.querySelectorAll('input.expenses-amount'),
  expensesTitleAll = document.querySelectorAll('input.expenses-title'),
  incomeAmountAll = document.querySelectorAll('input.income-amount'),
  incomeTitleAll = document.querySelectorAll('input.income-title'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent');


let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let replaceLetter = function (){
  this.value = this.value.replace(/[^А-Я, а-я]/,'');
};
let replaceNum = function (){
  this.value = this.value.replace(/[^\d]/g, '');
};

let isStr = function(str){
  if(str === null){
    return false;
  }
  else{
    return /^[\d\-\/]*$/.test(str) || str.trim() === '';
  }
};

class AppData {
  constructor(){
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
  }
  start (){
    
    this.budget = salaryInput.value;
    this.budget *= 1;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getTargetMonth();
    this.getAddExpenses();
    this.getAddIncome();
    targetMontVal.value = this.getTargetMonth();
    this.getBudget();
    this.showResult();
    
  }
  reset (){
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
    depositBank.disabled = false;
    depositAmount.disabled = false;
    depositPercent.disabled = false;
    depositCheck.disabled = false;
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
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositPercent.style.display = 'none';
    depositBank.value = '';
    depositAmount.value = '';
    depositPercent.value = '';
  
    buttonReset.style.display = 'none';
    buttonCount.style.display = 'block';
  }
  showResult (){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayVal.value = this.budgetDay;
    expensesMonthVal.value = this.expensesMonth;
    additionalExpensesVal.value = this.addExpenses.join(', ');
    additionalIncomeVal.value = this.addIncome.join(', ');
    incomePerVal.value = this.calcSavedMoney();
    periodRange.addEventListener('change', () => {
      incomePerVal.value = this.calcSavedMoney();
    });
  }
  addExpensesBlock (){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    let textContentItem = cloneExpensesItem.querySelector('.expenses-title');
    cloneExpensesItem.querySelector('.expenses-title').addEventListener('keyup',replaceLetter);
    textContentItem.value = '';
    textContentItem = cloneExpensesItem.querySelector('.expenses-amount');
    cloneExpensesItem.querySelector('.expenses-amount').addEventListener('keyup',replaceNum);
    textContentItem.value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  }
  getExpenses (){
    let _this = this;
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      
      if(itemExpenses !== '' && cashExpenses !== ''){
        cashExpenses *= 1;
        _this.expenses[itemExpenses] = cashExpenses;
      }
    });
  }
  addIncomeBlock (){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    let textContentItem = cloneIncomeItem.querySelector('.income-title');
    cloneIncomeItem.querySelector('.income-title').addEventListener('keyup', replaceLetter);
    textContentItem.value = '';
    textContentItem = cloneIncomeItem.querySelector('.income-amount');
    cloneIncomeItem.querySelector('.income-amount').addEventListener('keyup', replaceNum);
    textContentItem.value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
      incomePlus.style.display = 'none';
    }
  }
  getIncome (){
    let _this = this;
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      
      if(itemIncome !== '' && cashIncome !== ''){
        cashIncome *= 1;
        
        _this.income[itemIncome] = cashIncome;
      }
    });
  }
  getAddExpenses (){
    let addExpenses = addExpensesItem.value.split(',');
    let _this = this;
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item !== ''){
        _this.addExpenses.push(item);
      }
    });
  }
  getAddIncome (){
    let _this = this;
    additionalInput.forEach(function(item){
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        _this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth (){
    let sum = 0;
    for(let key in this.expenses){
      sum += this.expenses[key];
    }
    this.expensesMonth = sum;
    this.accumulatedMonth = this.budget - sum;
  }
  getIncomeMonth (){
    let sum = 0;
    for(let key in this.income){
      sum += this.income[key];
    }
    this.incomeMonth = sum;
  }
  getBudget (){
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetDay = Math.round((this.budget - this.expensesMonth + this.incomeMonth + monthDeposit) / 30);
    this.budgetMonth = Math.round((this.budget + this.incomeMonth - this.expensesMonth) + monthDeposit);
  }
  getTargetMonth (){
    if((targetAmount.value / this.accumulatedMonth) <= 0 || (targetAmount.value / this.accumulatedMonth) === Infinity){
    return 'Цель не будет достигнута';
    }
    else{
    return Math.ceil(targetAmount.value / this.accumulatedMonth);
    }
  }
  getInfoDeposit (){
    if(this.deposit){
      if(!isNumber(depositPercent.value) || Number(depositPercent.value) < 0){
        alert('Введите корректное значение в поле проценты');
        buttonCount.disabled = true;
        depositPercent.addEventListener('change', function(){
          buttonCount.disabled = false;
        });
        return false;
      }
      else{
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
        return true;
      }
    }
    return true;
  }
  changePercent(){
    const valueSelect = this.value;
    if(valueSelect === 'other'){
      depositPercent.style.display = 'inline-block';
      depositPercent.value = '';
    }
    else{
      depositPercent.style.display = 'none';
      depositPercent.value = valueSelect;
    }
  }
  calcSavedMoney (){
    return this.budgetMonth * periodRange.value;
  }
  depositHandler(){
    if(depositCheck.checked){
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    }
    else{
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  eventListeners (){
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    periodRange.addEventListener('change', () => {
    periodAmount.textContent = periodRange.value;
  });
    let _this = this;
    const startFunc = this.start.bind(this);
    buttonCount.addEventListener('click', () =>{
    if(salaryInput.value.trim() !== '' && isNumber(salaryInput.value) && this.getInfoDeposit()){
      startFunc();
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
      depositBank.disabled = true;
      depositAmount.disabled = true;
      depositPercent.disabled = true;
      depositCheck.disabled = true;
      buttonCount.style.display = 'none';
      buttonReset.style.display = 'block';
      buttonReset.addEventListener('click', function(){
        _this.reset();
      });
    }
  });
  incomeTitle.addEventListener('keyup', replaceLetter);
  incomeAmount.addEventListener('keyup', replaceNum);
  addIncomeFirst.addEventListener('keyup', replaceLetter);
  addIncomeSecnd.addEventListener('keyup', replaceLetter);
  expensesTitle.addEventListener('keyup', replaceLetter);
  expensesAmount.addEventListener('keyup', replaceNum);
  depositPercent.addEventListener('keyup', replaceNum);
  depositAmount.addEventListener('keyup', replaceNum);
  salaryInput.addEventListener('keyup', replaceNum);
  depositCheck.addEventListener('change', this.depositHandler.bind(this));
  }
}

const appData2 = new AppData();
appData2.eventListeners();





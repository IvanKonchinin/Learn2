'use strict';


let start = document.getElementById('start'),
      cancel = document.getElementById('cancel'),
      btnPlus = document.getElementsByTagName('button'),
      expenses = document.querySelector('.expenses'),
      incomePlus = btnPlus[0],
      expensesPlus = btnPlus[1],
      depositCheck = document.querySelector('#deposit-check'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      budgetMonthValue = document.querySelector('.budget_month-value'),
      budgetDayValue = document.querySelector('.budget_day-value'),
      expensesMonthValue = document.querySelector('.expenses_month-value'),
      additionalIncomeValue = document.querySelector('.additional_income-value'),
      additionalExpensesValue = document.querySelector('.additional_expenses-value'),
      incomePeriodValue = document.querySelector('.income_period-value'),
      targetMonthValue = document.querySelector('.target_month-value'),
      expensesTitle = document.querySelector('.expenses-title'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      salaryAmount = document.querySelector('.salary-amount'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount'),
      incomeTitle = document.querySelector('.income-items .income-title'),
      incomeItems = document.querySelectorAll('.income-items');

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isText = function (n) {
  if(n === null){
    return false;
  }
  else if(n === ' '){
    return false;
  }
  else if(n === ''){
    return false;
  }
  else if(n.trim().length <= 0){
    return false;
  }
  else{
    return true;
  } 
};

let appData = {
  income: {},
  incomeMonth:0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  budget: 0,
  percentDeposit: 0,
  moneyDeposit: 0,
  
  start: function () {
    
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    
    
    appData.showResult();
  },
  showResult: function(){
    
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    incomePeriodValue.value = this.calcPeriod();
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
  },
  addExpensesBlock: function(){
    

      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      cloneExpensesItem.querySelector('.expenses-title').value = '';
      cloneExpensesItem.querySelector('.expenses-amount').value = '';
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      if(expensesItems.length === 3){
        expensesPlus.style.display = 'none';
      }
    appData.validateOfText();
    appData.validateOfNum();
  },
  addIncomeBlock: function () {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    cloneIncomeItems.querySelector('.income-title').value = '';
    cloneIncomeItems.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
      incomePlus.style.display = 'none';
    }
    appData.validateOfText();
    appData.validateOfNum();
  },
  getExpenses: function(){
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getAddExpenses: function(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },
  getIncome: function(){
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== ''){
        appData.income[itemIncome] = cashIncome;
      }
    });

    for (let key in appData.income){
      appData.incomeMonth += +appData.income[key];
    }

  },
  getAddIncome: function(){
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () { //расходы за месяц
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },
  getBudget: function () {
    
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
   return targetAmount.value / this.budgetMonth;
  },
  getStatusIncome: function () {

    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода!');
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      return ('У вас средний уровень дохода!');
    } else if (this.budgetDay > 0 && this.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего!');
    } else if (this.budgetDay <= 0) {
      return ('Что то пошло не так!');
    }
  },
  getInfoDeposit: function () {
    if(this.deposit){
      do{
        this.percentDeposit = prompt('Какой годовой процент?', 10);
      }
      while (!isNumber(this.percentDeposit));

      do{
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while (!isNumber(this.moneyDeposit));
    }
  },
  calcPeriod: function(){
    return appData.budgetMonth * periodSelect.value;
  },
  periodSelect: function () {
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = appData.calcPeriod();
  },
  
  validateOfText: function(){
    let textInputs = document.querySelectorAll('input[placeholder="Наименование"]');
    textInputs.forEach(function (item, i) {
      item.addEventListener('input', function () {
        item.value = item.value.replace(/[^А-Яа-яЁё,.!? ]/i, '');
      });
    });
  },
  validateOfNum: function () {
    let numInputs = document.querySelectorAll('input[placeholder="Сумма"]');
    numInputs.forEach(function (item, i) {
      item.addEventListener('input', function () {
        item.value = item.value.replace(/[^0-9]/i, '');
      });
    });
  },
  addDisabledStart: function(){
    start.disabled = true;
  },
  checkSalaryAmount: function () {
    let salaryAmountValue = document.querySelector('.salary-amount');
    start.disabled = (isNumber(salaryAmountValue.value)) ? false : true;
  },
  blockInputsLeft: function(){
    let dataInputs = document.querySelectorAll('.data input[type="text"]');
    dataInputs.forEach(function(item){
      item.disabled = true;
      start.style.display = 'none';
      cancel.style.display = 'block';
    });
  },
  resetInputs:function(){
    let allInputs = document.querySelectorAll('input');
    allInputs.forEach(function(item){
      item.disabled = false;
      item.value = '';
      if(item.classList.contains('period-select')){
        item.value = 1;
      }
      periodAmount.textContent = 1;
      cancel.style.display = 'none';
      start.style.display = 'block';
      start.disabled = true;
      appData.budgetMonth = 0;
      appData.budget = 0;
      appData.budgetDay = 0;
    });
    console.dir(this);
  }
};


start.addEventListener('click', appData.start.bind(appData));

start.addEventListener('click', appData.blockInputsLeft);
cancel.addEventListener('click', appData.resetInputs);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', appData.periodSelect);
salaryAmount.addEventListener('input', appData.checkSalaryAmount);

document.addEventListener('DOMContentLoaded', function(){
  appData.validateOfText();
  appData.validateOfNum();
  appData.addDisabledStart();
});

//appData.getStatusIncome();
//appData.getInfoDeposit();

// console.log('Наша программа включает в себя данные:');
// for (let key in appData) {
//   console.log('Ключ ', key, 'и его значение: ', appData[key]);
// }


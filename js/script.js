'use strict';


const start = document.getElementById('start');
const cancel = document.getElementById('cancel');
const btnPlus = document.getElementsByTagName('button');
const expenses = document.querySelector('.expenses');
const incomePlus = btnPlus[0];
const expensesPlus = btnPlus[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const additionalIncomeValue = document.querySelector('.additional_income-value');
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');
const expensesTitle = document.querySelector('.expenses-items .expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const salaryAmount = document.querySelector('.salary-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
const incomeTitle = document.querySelector('.income-items .income-title');
let incomeItems = document.querySelectorAll('.income-items');


class AppData {
  constructor(){
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.budget = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
  }

isNumber(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}

start() {

  this.budget = +salaryAmount.value;
  this.getExpInc();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();

  this.showResult();
}

showResult() {

  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  incomePeriodValue.value = this.calcPeriod();
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
}

addExpensesBlock() {

    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
    
    this.validateOfText();
    this.validateOfNum();
}

addIncomeBlock() {
  const cloneIncomeItem = incomeItems[0].cloneNode(true);
  cloneIncomeItem.querySelector('.income-title').value = '';
  cloneIncomeItem.querySelector('.income-amount').value = '';
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    incomePlus.style.display = 'none';
  }
  
  this.validateOfText();
  this.validateOfNum();
}

getExpInc(){

  const count = item => {
    const startStr = item.className.split('-')[0];
    const itemTitle = item.querySelector(`.${startStr}-title`).value;
    const itemAmount = item.querySelector(`.${startStr}-amount`).value;
    if (itemTitle !== '' && itemAmount !== '') {
      this[startStr][itemTitle] = itemAmount;
    }
  };

  expensesItems.forEach(count);
  incomeItems.forEach(count);

  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
}

getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    }.bind(this));
  }

getAddIncome() {
    additionalIncomeItem.forEach(function (item) {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    }.bind(this));
  }

getExpensesMonth() { //расходы за месяц
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }

getBudget() {

    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }

getStatusIncome() {

    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода!');
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      return ('У вас средний уровень дохода!');
    } else if (this.budgetDay > 0 && this.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего!');
    } else if (this.budgetDay <= 0) {
      return ('Что то пошло не так!');
    }
  }

getInfoDeposit() {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент?', 10);
      }
      while (!this.isNumber(this.percentDeposit));

      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while (!this.isNumber(this.moneyDeposit));
    }
  }

calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

periodSelect() {
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = this.calcPeriod();
  }

validateOfText(){
    const textInputs = document.querySelectorAll('input[placeholder="Наименование"]');
    textInputs.forEach(function (item, i) {
      item.addEventListener('input', function () {
        item.value = item.value.replace(/[^А-Яа-яЁё,.!? ]/i, '');
      });
    });
  }

validateOfNum(){
    const numInputs = document.querySelectorAll('input[placeholder="Сумма"]');
    numInputs.forEach(function (item, i) {
      item.addEventListener('input', function () {
        item.value = item.value.replace(/[^0-9]/i, '');
      });
    });
  }

addDisabledStart(){
    start.disabled = true;
  }

checkSalaryAmount() {
    const salaryAmountValue = document.querySelector('.salary-amount');
    start.disabled = (this.isNumber(salaryAmountValue.value)) ? false : true;
  }

blockInputsLeft(){
    const dataInputs = document.querySelectorAll('.data input[type="text"]');
    dataInputs.forEach(function (item) {
      item.disabled = true;
      start.style.display = 'none';
      cancel.style.display = 'block';
      incomePlus.disabled = true;
      expensesPlus.disabled = true;
    });
  }

resetInputs() {
    
    const appData2 = new AppData();

    for(let key in appData2){
      appData[key] = appData2[key];
    }

    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(function (item) {
      item.disabled = false;
      item.value = '';
      if (item.classList.contains('period-select')) {
        item.value = 1;
      }
    });
    if (expensesItems.length > 1) {
      [...expensesItems].forEach(function (item, i) {
        if (i > 0) {
          item.remove();
        }
        if (expensesPlus.style.display === 'none') {
          expensesPlus.style.display = 'block';
        }
      });
    }
    if (incomeItems.length > 1) {
      [...incomeItems].forEach(function (item, i) {
        if (i > 0) {
          item.remove();
        }
        if (incomePlus.style.display === 'none') {
          incomePlus.style.display = 'block';
        }
      });
    }

    periodAmount.textContent = 1;
    cancel.style.display = 'none';
    start.style.display = 'block';
    start.disabled = true;
    incomePlus.disabled = false;
    expensesPlus.disabled = false;
  }

eventListeners(){
  start.addEventListener('click', this.start.bind(this));
  start.addEventListener('click', this.blockInputsLeft.bind(this));
  cancel.addEventListener('click', this.resetInputs.bind(this));
  expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
  incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
  periodSelect.addEventListener('change', this.periodSelect.bind(this));
  salaryAmount.addEventListener('input', this.checkSalaryAmount.bind(this));
  document.addEventListener('DOMContentLoaded', function () {
    this.validateOfText();
    this.validateOfNum();
    this.addDisabledStart();
  }.bind(this));
}
}

const appData = new AppData();
appData.eventListeners();



//appData.getStatusIncome();
//appData.getInfoDeposit();

// console.log('Наша программа включает в себя данные:');
// for (let key in appData) {
//   console.log('Ключ ', key, 'и его значение: ', appData[key]);
// }

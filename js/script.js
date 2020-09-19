'use strict';


const start = document.getElementById('start'),
      cancel = document.getElementById('cancel'),
      btnPlus = document.getElementsByTagName('button'),
      expenses = document.querySelector('.expenses'),
      incomePlus = btnPlus[0],
      expensesPlus = btnPlus[1],
      depositCheck = document.getElementById('deposit-check'),
      budgetMonthValue = document.querySelector('.budget_month-value'),
      budgetDayValue = document.querySelector('.budget_day-value'),
      expensesMonthValue = document.querySelector('.expenses_month-value'),
      additionalIncomeValue = document.querySelector('.additional_income-value'),
      additionalExpensesValue = document.querySelector('.additional_expenses-value'),
      incomePeriodValue = document.querySelector('.income_period-value'),
      targetMonthValue = document.querySelector('.target_month-value'),
      expensesTitle = document.querySelector('.expenses-items .expenses-title'),
      salaryAmount = document.querySelector('.salary-amount'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount'),
      incomeTitle = document.querySelector('.income-items .income-title'),
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent'),
      expensesItems = document.getElementsByClassName('expenses-items'),
      incomeItems = document.getElementsByClassName('income-items');


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
  this.getAddExpInc(additionalExpensesItem, this.addExpenses);
  this.getAddExpInc(additionalIncomeItem, this.addIncome);
  this.getInfoDeposit();
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

addExpIncBlock(items, selector) {
  let cloneExpIncItem = items[0].cloneNode(true);
  items[0].parentNode.insertBefore(cloneExpIncItem, this);
  if (items.length === 3) {
    this.style.display = 'none';
  }
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

  [...expensesItems].forEach(count);
  [...incomeItems].forEach(count);

  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
}

// getAddExpenses() {
//     const addExpenses = additionalExpensesItem.value.split(',');
//     addExpenses.forEach(function (item) {
//       item = item.trim();
//       if (item !== '') {
//         this.addExpenses.push(item);
//       }
//     }.bind(this));
//   }

// getAddIncome() {
//     additionalIncomeItem.forEach(function (item) {
//       const itemValue = item.value.trim();
//       if (itemValue !== '') {
//         this.addIncome.push(itemValue);
//       }
//     }.bind(this));
//   }

getAddExpInc(elem, arr) {
  elem = elem.tagName === 'INPUT' ? elem.value.split(',') : Array.prototype.slice.call(elem);
  elem.forEach(function(item){
    item = item.tagName === 'INPUT' ? item.value.trim() : item;
    if (item !== '') arr.push(item);
  }.bind(this));
}  

getExpensesMonth() { //расходы за месяц
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }

getBudget() {
    const monthDeposit = Math.floor(this.moneyDeposit * (this.percentDeposit / 100));
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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
    const depositCheck = document.getElementById('deposit-check');
  
  if (depositCheck.checked && salaryAmountValue.value === ''){
    start.disabled = true;
  } 
  else if (salaryAmountValue.value === '' && !depositCheck.checked){
    start.disabled = true;
  }
  else if (depositCheck.checked && salaryAmountValue.value !== '') {
    start.disabled = true;
  }
  else if (this.isNumber(salaryAmountValue.value)) {
    start.disabled = false;
  }
  else{
    start.disabled = false;
  }
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
    depositCheck.checked = false;
    depositAmount.style.display = 'none';
    depositBank.style.display = 'none';
    depositPercent.style.display = 'none';
    depositBank.value = '';

  }

  getInfoDeposit(){
  if(this.deposit){
    this.percentDeposit = depositPercent.value;
    this.moneyDeposit = depositAmount.value;
  }
}

changePercent(){
  const valueSelect = this.value;
  if (valueSelect === 'other'){
    depositPercent.style.display = 'inline-block';
    depositPercent.addEventListener('input', ()=>{
    depositPercent.value = depositPercent.value.replace(/[^0-9]/i, '');
      if (+depositPercent.value > 100) {
        alert('Введите число в диапазоне от 0 до 100!');
        depositPercent.value = '';
      }
    });
  }
  
  else if(valueSelect === ''){
    start.disabled = true;
  }
  else {
    depositPercent.value = valueSelect;
    depositPercent.style.display = 'none';
    if(depositAmount.value !== ''){
      start.disabled = false;
    }
  }

  depositPercent.addEventListener('input', () => {
    if (depositPercent.value === '' || depositAmount.value === '' || salaryAmount.value === '' || depositBank.value === ''){
      start.disabled = true;
    }else{
      start.disabled = false;
    }
  });

  depositAmount.addEventListener('input', () => {
    const depositBank = document.querySelector('.deposit-bank').value;
    if (depositAmount.value === '' || depositPercent.value === '' || salaryAmount.value === '' || depositBank.value === '') {
      start.disabled = true;
    } else {
      start.disabled = false;
    }
  });
}

depositHandler(){
  if(depositCheck.checked){
    start.disabled = true;
    depositBank.style.display = 'inline-block';
    depositAmount.style.display = 'inline-block';
    this.deposit = true;
    depositBank.addEventListener('change', this.changePercent);
  } 
  
  else {
    start.disabled = false;
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositPercent.style.display = 'none';
    depositBank.value = '';
    depositAmount.value = '';
    depositPercent.value = '';
    this.deposit = false;
    depositBank.removeEventListener('change', this.changePercent);
  }
}  

eventListeners(){
  start.addEventListener('click', this.start.bind(this));
  start.addEventListener('click', this.blockInputsLeft.bind(this));
  cancel.addEventListener('click', this.resetInputs.bind(this));
  expensesPlus.addEventListener('click', this.addExpIncBlock.bind(expensesPlus, expensesItems, '.expenses-items'));
  incomePlus.addEventListener('click', this.addExpIncBlock.bind(incomePlus, incomeItems, '.income-items'));
  periodSelect.addEventListener('change', this.periodSelect.bind(this));
  salaryAmount.addEventListener('input', this.checkSalaryAmount.bind(this));
  document.addEventListener('DOMContentLoaded', function () {
    this.validateOfText();
    this.validateOfNum();
    this.addDisabledStart();
    
  }.bind(this));
  depositCheck.addEventListener('change', this.depositHandler.bind(this));
}
}

const appData = new AppData();
appData.eventListeners();


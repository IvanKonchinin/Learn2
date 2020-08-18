'use strict';

const startCalculate = document.getElementById('start');
const income = document.querySelector('.income');
const expenses = document.querySelector('.expenses');
const incomeAdd = income.getElementsByTagName('button');
const expensesAdd = expenses.getElementsByTagName('button');
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.getElementsByClassName('.budget_day-value');
const expensesMonthValue = document.getElementsByClassName('.expenses_month-value');
const additionalIncomeValue = document.getElementsByClassName('.additional_income-value');
const additionalExpensesValue = document.getElementsByClassName('.additional_expenses-value');
const incomePeriodValue = document.getElementsByClassName('.income_period-value');
const targetMonthValue = document.getElementsByClassName('.target_month-value');
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');

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

let money;

let start = function () {
  do {
    money = prompt('Ваш месячный доход?', 50000);
  }
  while (!isNumber(money));
};

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  budget: +money,
  percentDeposit: 0,
  moneyDeposit: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {

    if (confirm('Есть ли у вас доп. заработок?')) {
      let itemIncome;
      let cashIncome;
      do{
        itemIncome = prompt('Какой у вас доп. заработок?', 'Таксую');
      }
      while (isNumber(itemIncome) || !isText(itemIncome));
      
      do{
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
      }
      while(!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
     }

    let addExpenses;

     do{
       addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'коммуналка');
     }
     while (isNumber(addExpenses) || !isText(addExpenses));

    appData.addExpenses = addExpenses.toLowerCase().split(', ');

    for (let i = 0; i < appData.addExpenses.length; i++) {
      appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].substr(1);
    }

    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let itemExpenses;

      do{
        itemExpenses = prompt('Введите обязательную статью расходов?', 'кино').toLowerCase();
      }
      while (isNumber(itemExpenses) || !isText(itemExpenses));

      let cashExpenses;
      do {
        cashExpenses = prompt('Во сколько это обойдется?', 200);
      }
      while (!isNumber(cashExpenses));
      appData.expenses[itemExpenses] = cashExpenses;
      
    }
  },
  getExpensesMonth: function () { //расходы за месяц
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    let res = (Math.ceil(appData.mission / appData.budgetMonth));
    if (res <= 0) {
      return 'Цель не будет достигнута';
    } else {
      return 'Цель будет достигнута за: ' + res + ' месяцев';
    }
  },
  getStatusIncome: function () {

    if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода!');
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return ('У вас средний уровень дохода!');
    } else if (appData.budgetDay > 0 && appData.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего!');
    } else if (appData.budgetDay <= 0) {
      return ('Что то пошло не так!');
    }
  },
  getInfoDeposit: function () {
    if(appData.deposit){
      do{
        appData.percentDeposit = prompt('Какой годовой процент?', 10);
      }
      while (!isNumber(appData.percentDeposit));

      do{
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while (!isNumber(appData.moneyDeposit));
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
appData.getStatusIncome();
appData.getInfoDeposit();

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');
for (let key in appData) {
  console.log('Ключ ', key, 'и его значение: ', appData[key]);
}

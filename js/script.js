'use strict';
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

let start = function() {
  do{
    money = prompt('Ваш месячный доход?');
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
  budget:+money,
  budgetDay:0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'коммуналка');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?'); 
        for (let i = 0; i < 2; i++) {
          let query = prompt('Введите обязательную статью расходов?', 'кино').toLowerCase();  
          let sum = 0;
          do {
            sum = prompt('Во сколько это обойдется?', 200);
          }
          while (!isNumber(sum));
          appData.expenses[query] = +sum;
        }
  },
  getExpensesMonth: function () { //расходы за месяц
    for (let key in appData.expenses){
      appData.expensesMonth += appData.expenses[key];
    }
    return appData.expensesMonth;
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.getExpensesMonth();
    appData.budgetDay = Math.floor(appData.budgetMonth / 30 );
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
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();


console.log('Расходы за месяц: ' + appData.getExpensesMonth());
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

for(let key in appData){
  console.dir('Наша программа включает в себя данные: ключ ' + key + ' и его значение: ' + appData[key]);
}



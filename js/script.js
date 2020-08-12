'use strict';
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = 'фриланс',
    mission = 2000000,
    period = 12,
    expenses1,
    expenses2;

let start = function() {
  do{
    money = prompt('Ваш месячный доход?');
  }  
  while (!isNumber(money));
};    

start();

let expenses = [];

let getExpensesMonth = function() {
  let sum = 0;

  for (let i = 0; i < 2; i++) {

    expenses[i] = prompt('Введите обязательную статью расходов?').toLowerCase();  
  
    let sum2 = 0;
    do{
      sum2 = prompt('Во сколько это обойдется?');
    }
    while (!isNumber(sum2));
    sum += +sum2;
  }
  
  return sum;
};

let expensesAmount = getExpensesMonth();

let getAccumulatedMonth = function() {
  return money - expensesAmount;
};

let getTargetMonth = function() {
  let res = (Math.ceil(mission / accumulatedMonth));
  if (res <= 0){
    return 'Цель не будет достигнута';
  } else {
    return 'Цель будет достигнута за: ' + res + ' месяцев';
  }
};

let accumulatedMonth = getAccumulatedMonth(),
    budgetDay = Math.floor(accumulatedMonth / 30);


//let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'коммуналка');
let deposit = confirm('Есть ли у вас депозит в банке?');   
//console.log('Период равен ' + period + ' месяцев');
//console.log('Цель заработать ' + mission + ' рублей');
console.log('Расходы за месяц: ' + expensesAmount);
console.log(expenses);
//console.log('Бюджет на месяц ' + getAccumulatedMonth());
console.log(getTargetMonth());
console.log('Бюджет на день: ' + budgetDay);

let getStatusIncome = function () {

  if (budgetDay >= 1200) {
    return ('У вас высокий уровень дохода!');
  } else if (budgetDay >= 600 && budgetDay < 1200){
    return ('У вас средний уровень дохода!');
  } else if (budgetDay > 0 && budgetDay < 600){
    return ('К сожалению у вас уровень дохода ниже среднего!');
  } else if (budgetDay <= 0){
    return ('Что то пошло не так!');
  }
};

console.log(getStatusIncome());

let showTypeOf = function (data) {
  console.log(typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);




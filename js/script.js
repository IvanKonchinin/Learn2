'use strict';
let money = +prompt('Ваш месячный доход?', 50000);
while (!parseInt(money) || money === '') {
  money = +prompt('Ваш месячный доход?', 50000);
} 

let income = 'фриланс',
    addExpenses = String(prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'коммуналка')),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 2000000,
    period = 12,
    expenses1 = prompt('Введите обязательную статью расходов?', 'телефон'),
    amount1 = +prompt('Во сколько это обойдется?', 100),
    expenses2 = prompt('Введите обязательную статью расходов?', 'интернет'),
    amount2 = +prompt('Во сколько это обойдется?', 100),
    accumulatedMonth = getAccumulatedMonth(),
    budgetDay = Math.floor(accumulatedMonth / 30);
//let monthsCount = Math.ceil(mission / accumulatedMonth());

function getExpensesMonth() {
  return amount1 + amount2;
}

function getAccumulatedMonth() {
  return money - getExpensesMonth();
}

function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
}

//console.log('Период равен ' + period + ' месяцев');
//console.log('Цель заработать ' + mission + ' рублей');
console.log(getExpensesMonth());
console.log(addExpenses.split(', '));
//console.log('Бюджет на месяц ' + getAccumulatedMonth());
console.log('Цель будет достигнута за: ' + getTargetMonth() + ' месяцев');
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




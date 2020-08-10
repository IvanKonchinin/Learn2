'use strict';
let money = +prompt('Ваш месячный доход?', 50000);
while (!parseInt(money) || money === '') {
  money = +prompt('Ваш месячный доход?', 50000);
} 

let income = 'фриланс';
let addExpenses = String(prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'коммуналка'));
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 2000000;
let period = 12;

let expenses1 = +prompt('Введите обязательную статью расходов1?', 100);
while (!parseInt(expenses1) || expenses1 === '') {
  expenses1 = +prompt('Введите обязательную статью расходов1?', 100);
} 

let expenses2 = +prompt('Введите обязательную статью расходов2?', 100);
while (!parseInt(expenses2) || expenses2 === '') {
  expenses2 = +prompt('Введите обязательную статью расходов2?', 100);
}

let amount1 = +prompt('Введите обязательную статью расходов3?', 100);
while (!parseInt(amount1) || amount1 === '') {
  amount1 = +prompt('Введите обязательную статью расходов3?', 100);
} 

let amount2 = +prompt('Введите обязательную статью расходов4?', 100);
while (!parseInt(amount2) || amount2 === '') {
  amount2 = +prompt('Введите обязательную статью расходов4?', 100);
} 

let budgetMonth = money - (expenses1 + expenses2 + amount1 + amount2);
let budgetDay = Math.floor(budgetMonth / 30);
let monthsCount = Math.ceil(mission / budgetMonth);


console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.split(', '));
console.log('Бюджет на месяц ' + budgetMonth);
console.log('Цель будет достигнута за: ' + monthsCount + ' месяцев');
console.log('Бюджет на день: ' + budgetDay);

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода!');
} else if (budgetDay >= 600 && budgetDay < 1200){
  console.log('У вас средний уровень дохода!');
} else if (budgetDay > 0 && budgetDay < 600){
  console.log('К сожалению у вас уровень дохода ниже среднего!');
} else if (budgetDay <= 0){
  console.log('Что то пошло не так!');
}

//console.log(typeof money);
//console.log(typeof income);
//console.log(typeof deposit);
//console.log(addExpenses.length);
//addExpenses = addExpenses.toLowerCase();
//addExpenses = addExpenses.split(', ');



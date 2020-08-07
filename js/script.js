let money = 50000;
let income = 'фриланс';
let addExpenses = 'Интернет, Телефон, Коммуналка';
let deposit = true;
let mission = 2000000;
let period = 12;
let budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(', ');

console.log(addExpenses);
console.log(budgetDay);
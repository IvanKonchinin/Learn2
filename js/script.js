let money = prompt('Ваш месячный доход?');
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = prompt('Есть ли у вас депозит в банке?');
let mission = 2000000;
let period = 12;
let expenses1 = prompt('Введите обязательную статью расходов?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Введите обязательную статью расходов?');
let budgetMonth = money - ((+expenses1) + (+expenses2) + (+amount1) + (+amount2));
let budgetDay = Math.floor(budgetMonth / 30);
let monthsCount = Math.ceil(mission / budgetMonth);


console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.split(', '));
console.log('Бюджет на месяц ' + budgetMonth);
console.log('Цель будет достигнута за: ' + monthsCount + ' месяцев');
console.log('Бюджет на день: ' + budgetDay);

if (budgetDay > 1200) {
  console.log('У вас высокий уровень дохода!');
} else if (budgetDay > 600 && budgetDay < 1200){
  console.log('У вас средний уровень дохода!');
} else if (budgetDay < 600){
  console.log('К сожалению у вас уровень дохода ниже среднего!');
} else if (budgetDay < 0){
  console.log('Что то пошло не так!');
}

//console.log(typeof money);
//console.log(typeof income);
//console.log(typeof deposit);
//console.log(addExpenses.length);
//addExpenses = addExpenses.toLowerCase();
//addExpenses = addExpenses.split(', ');



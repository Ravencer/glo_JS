let money = 2500;
let income = "фриланс";
let addExpenses = "интернет, такси, коммуналка";
let deposit = true;
let misson = 55600;
let period = 12;

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + misson + " рублей/долларов/гривен/юани");
addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(","));
let budgetDay = money / 30;
console.log(budgetDay);


const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");

var totalExpense=0;
var totalIncome=0;

income.innerHTML= totalIncome;
expense.innerHTML= totalExpense;
balance.innerHTML= totalExpense + totalIncome;

const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];


function transactionsFunction(){
    var inputText=document.getElementById("text").value;
    var inputAmount=document.getElementById("amount").value;
    if (inputText.trim() === "" || inputAmount.trim() === "") {
        document.getElementById("error_msg").innerHTML =
            "<span class='error-style fade-in-text'>Please enter Transaction Name and Amount!</span>";
        setTimeout(
            () => (document.getElementById("error_msg").innerHTML = ""),
            7000
        );
        document.getElementById("text").value="";
        document.getElementById("amount").value="";
        return;
    }
    inputAmount=parseInt(inputAmount);
    if(inputAmount>0){
        totalIncome += inputAmount;
        update(totalIncome , income);
    }else {
        totalExpense += inputAmount;
        update(totalExpense,expense);
    }
    update(totalIncome-(-1)*totalExpense,balance)

    const transaction = {
        text:inputText,
        amount:inputAmount,
    }
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));



    document.getElementById("text").value="";
    document.getElementById("amount").value="";
    document.getElementById("list").innerHTML +=`<li>${inputText} ${inputAmount}</li>`
}
function update(value,inner){
    inner.innerHTML= value;
}
function getFromLocalStorage(transaction){
    const item=document.createElement("li");
    item.innerHTML=`${transaction.text} ${transaction.amount}`;
    list.append(item);
    updateValues;
}
function updateValues(transaction){
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce((bal, value) => (bal += value), 0);
    const incomes = amounts
        .filter((value) => value > 0)
        .reduce((bal, value) => (bal += value), 0);
    const expenses =
        amounts
            .filter((value) => value < 0)
            .reduce((bal, value) => (bal += value), 0) * -(1);

    balance.innerText = `$${total}`;
    income.innerText = `$${incomes}`;
    expense.innerText = `$${expenses}`;

}
list.innerHTML = "";
transactions.forEach(getFromLocalStorage);
updateValues();


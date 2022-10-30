const plusList = document.querySelector('.income-area')
const minusList = document.querySelector('.expenses-area')
const amount = document.querySelector('.available-money')

const addTransactionPanel = document.querySelector('.add-transaction-panel')
const nameTransaction = document.querySelector('#name')
const amountTransaction = document.querySelector('#amount')
const categoryTransaction = document.querySelector('#category')

const addTransaction = document.querySelector('.add-transaction')    
const saveButton = document.querySelector('.save')
const cancelButton = document.querySelector('.cancel')
const deleteTransactionBtn = document.querySelector('.delete')
const deleteAllTransactionBtn = document.querySelector('.delete-all')

const lightButton = document.querySelector('.light')
const darkButton = document.querySelector('.dark')

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];

const checkAddTransactionPanel = () => {
    if (nameTransaction.value !== '' && amountTransaction.value !== '' && categoryTransaction.value !== 'none') {
        addNewTransaction()
    } else {
        alert('wypełnij wszystkie pola formularza')
    }
}

const addNewTransaction = () => {
    const newTransaction = document.createElement('div');
    newTransaction.classList.add('transaction');
    newTransaction.setAttribute('id', ID);
    checkCategoryIcon(selectedCategory);

    newTransaction.innerHTML = `
        <p class="transaction-name">${categoryIcon} ${nameTransaction.value}</p>
        <p class="transaction-amount">${amountTransaction.value} 
        <button class="delete" onclick="deleteTransaction(${ID})"><i class="fas fa-times"></i></button></p>
        `
    if (amountTransaction.value > 0) {  
        newTransaction.classList.add = 'income'
        plusList.appendChild(newTransaction)
    } else if (amountTransaction.value < 0) {
        newTransaction.classList.add = 'expenses'
        minusList.appendChild(newTransaction)
    }

    moneyArr.push(parseFloat(amountTransaction.value));
    // var sumaArray = 0
    // for (var i = 0; i < moneyArr.length; i++) {
    //     sumaArray += moneyArr[i];
    // }
    countMoney(moneyArr);
    ID++;
    cancelPanel();
}


const deleteTransaction = id => {
    const transactionToDelete = document.getElementById(id)
    const transactionAmount = parseFloat(transactionToDelete.childNodes[2].innerText);
    const indexOfTransaction = moneyArr.indexOf(transactionAmount);
    
    moneyArr.splice(indexOfTransaction, 1);
    
    // if (transactionToDelete.classList.contains('income') === true) {
    //     plusList.removeChild(transactionToDelete);
    // } else {
    //     minusList.removeChild(transactionToDelete);
    // }
    countMoney(moneyArr);
    transactionToDelete.classList.contains('income') ? plusList.removeChild(transactionToDelete) : minusList.removeChild(transactionToDelete);

}

const deleteAllTransaction = () => {
    plusList.innerHTML = '<h3>Przychód:</h3>';
    minusList.innerHTML = '<h3>Wydatki:</h3>';
    amount.innerHTML = '0 zł';
    moneyArr = [0];
}

const countMoney = money => {
    const newMoney = money.reduce((a, b) => a + b);
    amount.textContent = `${newMoney} zł`;
}

const selectCategory = () => {
    selectedCategory = categoryTransaction.options[categoryTransaction.selectedIndex].text;
}

const checkCategoryIcon = transaction => {
    switch (transaction) {
        case '[ + ] Przychód':
            categoryIcon = `<i class="fas fa-money-bill-wave"></i>`
            break;
        case '[ - ] Zakupy':
            categoryIcon = `<i class="fas fa-cart-arrow-down"></i>`
            break;
        case '[ - ] Jedzenie':
            categoryIcon = `<i class="fas fa-hamburger"></i>`
            break;
        case '[ - ] Kino':
            categoryIcon = `<i class="fas fa-film"></i>`
            break;
    }
}

const showPanel = () => {
    addTransactionPanel.style.display = 'flex'
}

const cancelPanel = () => {
    addTransactionPanel.style.display = 'none'
    clearPanel();
}

const clearPanel = () => {
    nameTransaction.value = '';
    amountTransaction.value = '';
    categoryTransaction.selectedIndex = 0;
}

const changeToLight = () => {
    root.style.setProperty('--first-color', '#F9F9F9');
    root.style.setProperty('--second-color', '#14161F');
    root.style.setProperty('--border-color', 'rgba(0, 0, 0, .2)');
}

const changeToDark = () => {
    root.style.setProperty('--first-color', '#14161F');
    root.style.setProperty('--second-color', '#F9F9F9');
    root.style.setProperty('--border-color', 'rgba(255, 255, 255, .4)');
}

addTransaction.addEventListener('click', showPanel)
cancelButton.addEventListener('click', cancelPanel)
saveButton.addEventListener('click', checkAddTransactionPanel)
deleteAllTransactionBtn.addEventListener('click', deleteAllTransaction)
lightButton.addEventListener('click', changeToLight)
darkButton.addEventListener('click', changeToDark) 
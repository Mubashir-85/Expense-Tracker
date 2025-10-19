const expensetitle = document.querySelector(".title");
const expenseamount = document.querySelector(".amount");
const btn = document.querySelector(".add-btn");
const list = document.querySelector(".expense-list");
const totalamt = document.querySelector(".total-expense")
const budget = document.querySelector(".budget");
// budget.addEventListener("input",()=>{
//     renderexpense();
// });
console.log(budget.value);


let expense = JSON.parse(localStorage.getItem("expenses")) || []; // try to load the existing expenses from localstorage. If nothing is saved yet, start with an empty array

//Function to render expenses
function renderexpense  (){
    list.innerHTML = "";
    let total = 0;

    expense.forEach((items,index)=>{
        const li  = document.createElement("li");
        li.classList.add("expense-item");
        li.innerHTML = `
        ${items.title} - ₹${items.amount}
        <button class="delete-btn" onClick="deleteExpense(${index})" style="width:50px; background-color:red; color:white ">x</button>
        `;
        list.appendChild(li).style.textDecoration="none";
        total += items.amount;
    });
    totalamt.textContent = total;
    localStorage.setItem("expenses",JSON.stringify(expense))
    if(total >= budget.value){
        totalamt.style.color = "red";
    }else{
    totalamt.style.color = "green";
}
}

// Add new expense
btn.addEventListener("click",()=>{
    const title = expensetitle.value.trim();// In this line the value will return a string and trim() will remove any extra spaces
    const amount = parseFloat(expenseamount.value);// In this line the value will return a string and parseFloat() will convert it to a number
    if(title === ""|| amount <= 0){
        alert("please enter a valid title and amount!")
        return;
    }
    expense.push({title,amount});
    expensetitle.value = "";
    expenseamount.value = "";
    renderexpense();
})
// const deleteExpense = querySelector(".deleteExpense  ")
function deleteExpense(index){
    if(!confirm("Are you sure you want to delete this expense?")){
        return;
    }
    expense.splice(index,1);
    renderexpense();

}

renderexpense();
const expensetitle = document.querySelector(".title");
const expenseamount = document.querySelector(".amount");
const btn = document.querySelector(".add-btn");
const list = document.querySelector(".expense-list");
const totalamt = document.querySelector(".total-expense")


let expense = JSON.parse(localStorage.getItem("expenses")) || [];

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
}

// Add new expense
btn.addEventListener("click",()=>{
    const title = expensetitle.value.trim();
    const amount = parseFloat(expenseamount.value);
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
    expense.splice(index,1);
    renderexpense();

}
renderexpense();
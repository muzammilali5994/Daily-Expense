const  name = document.getElementById("name");
const  number = document.getElementById("number");
const  category = document.getElementById("category");
const  addBtn = document.getElementById("addBtn");
const  tableBody = document.getElementById("tableBody");
const  balance = document.getElementById("balance");
const totalIncome = document.querySelector(".totalIncome");
const totalExpense = document.querySelector(".totalExpense");
  
let transections = JSON.parse(localStorage.getItem("transections"))|| [];

addBtn.addEventListener("click",function(){

  

    const  transection ={
    id : Date.now(),
    name : name.value,
    number :Number( number.value),
    category : category.value

    }
    transections.push(transection);

    localStorage.setItem("transections", JSON.stringify(transections));
     
     showData();
    updateSummary();
    
})

    function showData(){
        tableBody.innerHTML = " ";
        transections.forEach((data,index)=> {
            const row = `
            <tr>
                <td>${index+1}</td>
                <td>${data.name}</td>
                <td>${data.number}</td>
                <td>${data.category}</td>
                <td><button class="btn btn-primary" onClick="deleteData(${data.id})">Delete</button></td>
            </tr>
            `
            tableBody.innerHTML += row;
        });
    }
    function updateSummary(){
        let amount = 0;
        let expense = 0;

        transections.forEach((t)=>{
            if(t.category === "Expense"){
                expense += t.number
            }
            else{
                amount += t.number
            }
        })
        totalExpense.innerText = expense;
        totalIncome.innerText = amount;
        balance.innerText =   amount - expense  ;
    }

window.onload = function() {
    showData();
    updateSummary();
};

function deleteData(id){
    transections = transections.filter(t => t.id !== id);
    localStorage.setItem("transections", JSON.stringify(transections));
    showData();
    updateSummary();
}



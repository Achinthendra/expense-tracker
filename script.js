let balance = 0;
let expenses = [];

// Add Expense
function addExpense() {
    let desc = document.getElementById("desc").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let category = document.getElementById("category").value;
    let time = document.getElementById("time").value;

    if (desc === "" || isNaN(amount)) {
        alert("Please enter valid details");
        return;
    }

    let expense = { desc, amount, category, time };
    expenses.push(expense);

    balance -= amount;
    document.getElementById("balance").innerText = balance;

    let li = document.createElement("li");
    li.innerText = `${desc} - ₹${amount} (${category})`;
    document.getElementById("list").appendChild(li);

    // Clear inputs
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
}

// Generate Report
function generateReport() {
    let total = 0;
    let categoryWise = {};

    expenses.forEach(exp => {
        total += exp.amount;

        if (!categoryWise[exp.category]) {
            categoryWise[exp.category] = 0;
        }
        categoryWise[exp.category] += exp.amount;
    });

    let reportHTML = `<p><b>Total Spent:</b> ₹${total}</p>`;

    for (let cat in categoryWise) {
        reportHTML += `<p>${cat}: ₹${categoryWise[cat]}</p>`;
    }

    document.getElementById("report").innerHTML = reportHTML;
}

// Simple AI Chatbot
function sendMessage() {
    let input = document.getElementById("userInput").value;
    let chatbox = document.getElementById("chatbox");

    if (input === "") return;

    let userMsg = `<p><b>You:</b> ${input}</p>`;
    chatbox.innerHTML += userMsg;

    let response = "";

    if (input.toLowerCase().includes("total")) {
        let total = expenses.reduce((sum, e) => sum + e.amount, 0);
        response = `Your total expenses are ₹${total}`;
    }
    else if (input.toLowerCase().includes("food")) {
        let food = expenses
            .filter(e => e.category === "Food")
            .reduce((sum, e) => sum + e.amount, 0);
        response = `You spent ₹${food} on Food`;
    }
    else {
        response = "Try asking about total or category expenses 😊";
    }

    let botMsg = `<p><b>Bot:</b> ${response}</p>`;
    chatbox.innerHTML += botMsg;

    document.getElementById("userInput").value = "";
}

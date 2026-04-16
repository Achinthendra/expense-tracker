let balance = 0;
let expenses = [];

function addExpense() {
    let desc = document.getElementById("desc").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let category = document.getElementById("category").value;

    if (desc === "" || isNaN(amount)) {
        alert("Enter valid details");
        return;
    }

    let expense = { desc, amount, category };
    expenses.push(expense);

    balance -= amount;
    document.getElementById("balance").innerText = balance;

    let li = document.createElement("li");
    li.innerText = `${desc} - ₹${amount} (${category})`;
    document.getElementById("list").appendChild(li);

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
}

function generateReport() {
    let total = 0;
    let cat = {};

    expenses.forEach(e => {
        total += e.amount;
        cat[e.category] = (cat[e.category] || 0) + e.amount;
    });

    let html = `<p>Total: ₹${total}</p>`;
    for (let c in cat) {
        html += `<p>${c}: ₹${cat[c]}</p>`;
    }

    document.getElementById("report").innerHTML = html;
}

function sendMessage() {
    let input = document.getElementById("userInput").value;
    let chatbox = document.getElementById("chatbox");

    if (!input) return;

    chatbox.innerHTML += `<p><b>You:</b> ${input}</p>`;

    let reply = "Try asking about total expenses";

    if (input.toLowerCase().includes("total")) {
        let total = expenses.reduce((s, e) => s + e.amount, 0);
        reply = `Total expenses: ₹${total}`;
    }

    chatbox.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;
    document.getElementById("userInput").value = "";
}

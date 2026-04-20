// 🔥 GOOGLE SHEETS API URL
const API_URL = "https://script.google.com/macros/s/AKfycbzBcbaRDa2YSXmz79SK9NvhqDp-egxb4mjcFYtFj9vi9IJs1Nb-sY58IucGn7yopsfm/exec";

let balance = 0;
let expenses = [];

// ✅ ADD EXPENSE
function addExpense() {
    let desc = document.getElementById("desc").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let category = document.getElementById("category").value;
    let time = document.getElementById("time").value;

    if (desc === "" || isNaN(amount)) {
        alert("Enter valid details");
        return;
    }

    let expense = { desc, amount, category, time };
    expenses.push(expense);

    // Update balance
    balance -= amount;
    document.getElementById("balance").innerText = balance;

    // Add to UI
    let li = document.createElement("li");
    li.innerText = `${desc} - ₹${amount} (${category})`;
    document.getElementById("list").appendChild(li);

    // 🔥 SEND DATA TO GOOGLE SHEETS
    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(expense),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => console.log("Saved to Sheets:", data))
    .catch(err => console.error("Error:", err));

    // Clear inputs
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
}

// ✅ GENERATE REPORT
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

// ✅ CHATBOT
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

    if (input.toLowerCase().includes("food")) {
        let total = expenses
            .filter(e => e.category === "Food")
            .reduce((s, e) => s + e.amount, 0);
        reply = `Food expenses: ₹${total}`;
    }

    chatbox.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;
    document.getElementById("userInput").value = "";
}

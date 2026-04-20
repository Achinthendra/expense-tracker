const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzBcbaRDa2YSXmz79SK9NvhqDp-egxb4mjcFYtFj9vi9IJs1Nb-sY58IucGn7yopsfm/exec";

let selectedCategory = "Food";

// DROPDOWN
function toggleDropdown() {
    document.getElementById("options").classList.toggle("hidden");
}

function selectOption(value) {
    selectedCategory = value;
    document.getElementById("selected").innerText = value;
    document.getElementById("options").classList.add("hidden");
}

// ADD EXPENSE
async function addExpense() {
    const desc = document.getElementById("desc").value;
    const amount = document.getElementById("amount").value;

    await fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify({
            description: desc,
            amount: amount,
            category: selectedCategory
        })
    });

    loadExpenses();
}

// LOAD DATA
async function loadExpenses() {
    const res = await fetch(WEB_APP_URL);
    const data = await res.json();

    const list = document.getElementById("list");
    const balance = document.getElementById("balance");

    list.innerHTML = "";

    let total = 0;

    for (let i = 1; i < data.length; i++) {
        const li = document.createElement("li");
        li.innerText = `${data[i][1]} - ₹${data[i][2]} (${data[i][3]})`;
        list.appendChild(li);

        total += Number(data[i][2]);
    }

    balance.innerText = "Total Balance: ₹" + total;
}

// CHATBOT
async function sendMessage() {
    const input = document.getElementById("chat-input");
    const msg = input.value.toLowerCase();
    input.value = "";

    const chatBox = document.getElementById("chat-box");

    chatBox.innerHTML += `<div class="msg user">${msg}</div>`;

    const res = await fetch(WEB_APP_URL);
    const data = await res.json();

    let total = 0;
    let food = 0;

    for (let i = 1; i < data.length; i++) {
        const amount = Number(data[i][2]);
        total += amount;

        if (data[i][3].toLowerCase() === "food") {
            food += amount;
        }
    }

    let reply = "Try: total or food";

    if (msg.includes("total")) {
        reply = "Total spending is ₹" + total;
    }

    if (msg.includes("food")) {
        reply = "Food spending is ₹" + food;
    }

    chatBox.innerHTML += `<div class="msg bot">${reply}</div>`;
}

// LOAD ON START
loadExpenses();

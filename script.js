const form = document.getElementById("expense-form");
const list = document.getElementById("list");
const balanceEl = document.getElementById("balance");

let balance = 0;

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const desc = document.getElementById("desc").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;

    balance += amount;
    updateBalance();

    const li = document.createElement("li");
    li.innerHTML = `
        ${desc} (${category}) 
        <span>₹${amount}</span>
    `;

    list.appendChild(li);

    form.reset();
});

function updateBalance() {
    balanceEl.innerText = "₹" + balance;
}

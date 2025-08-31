
// --- Configurable Random Range ---
const MIN_RANDOM_AMOUNT = 1;
const MAX_RANDOM_AMOUNT = 1000;
// ---------------------------------

document.getElementById('calculateBtn').addEventListener('click', calculateChange);
document.getElementById('randomBtn').addEventListener('click', generateRandomAmount);
document.getElementById('totalAmount').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculateChange();
    }
});

function generateRandomAmount() {
    const totalAmountInput = document.getElementById('totalAmount');
    // Generate a random number within the specified range
    const randomAmount = (Math.random() * (MAX_RANDOM_AMOUNT - MIN_RANDOM_AMOUNT) + MIN_RANDOM_AMOUNT).toFixed(2);
    totalAmountInput.value = randomAmount; // Display the random number in the input field
    calculateChange(); // Automatically calculate change for the new random number
}

function calculateChange() {
    const totalAmountInput = document.getElementById('totalAmount');
    const resultsContainer = document.getElementById('results');
    
    // Clear previous results
    resultsContainer.innerHTML = '';

    if (totalAmountInput.value.trim() === '') {
        resultsContainer.innerHTML = '<p style="grid-column: 1 / -1;">Please enter an amount or click "Random".</p>';
        return;
    }

    let totalAmount = parseFloat(totalAmountInput.value);

    if (isNaN(totalAmount) || totalAmount < 0) {
        resultsContainer.innerHTML = '<p style="color: red; grid-column: 1 / -1;">Please enter a valid, non-negative amount.</p>';
        return;
    }

    // Work with cents to avoid floating point issues
    let remainingCents = Math.round(totalAmount * 100);

    const denominations = [
        { name: '$100 Bill', value: 10000 },
        { name: '$50 Bill', value: 5000 },
        { name: '$20 Bill', value: 2000 },
        { name: '$10 Bill', value: 1000 },
        { name: '$5 Bill', value: 500 },
        { name: '$1 Bill', value: 100 },
        { name: 'Quarter', value: 25 },
        { name: 'Dime', value: 10 },
        { name: 'Nickel', value: 5 },
        { name: 'Penny', value: 1 }
    ];

    let animationDelay = 0;
    denominations.forEach(denom => {
        const count = Math.floor(remainingCents / denom.value);
        if (count > 0) {
            remainingCents %= denom.value;

            const card = document.createElement('div');
            card.className = 'result-card';
            card.style.animationDelay = `${animationDelay}s`;
            card.innerHTML = `
                <div class="denomination-name">${denom.name}</div>
                <div class="denomination-count">${count}</div>
            `;
            resultsContainer.appendChild(card);
            animationDelay += 0.05;
        }
    });

    if (resultsContainer.innerHTML === '') {
        resultsContainer.innerHTML = '<p style="grid-column: 1 / -1;">No change needed for $0.00.</p>';
    }
}

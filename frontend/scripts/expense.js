const form = document.querySelector('form');
const token = localStorage.getItem('token');
const premiumButton = document.getElementById('premiumBtn');
const premiumTitle = document.getElementById('premiumTitle');
premiumTitle.style.display = 'none';
const leaderBoardBtn = document.getElementById('leaderBoard');
const leaderBoardList = document.getElementById('leaderBoardList');

leaderBoardBtn.addEventListener('click', async () => {
    try {
        const response = await axios.get('http://localhost:4000/premium/leaderboard', { headers: { "Authorization": token } });
        const leaderboardData = response.data;
        leaderBoardList.innerHTML = '';
        leaderboardData.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `Name: ${user.name}, Total Expense: ${user.totalExpense == null ? 0 : user.totalExpense}`;
            leaderBoardList.appendChild(li);
        });
    }
    catch (error) {
        console.error('Error fetching leaderboard:', error);
    }
});

const ispremiumuser = async () => {
    try {
        const response = await axios.get('http://localhost:4000/premium/premiumStatus', { headers: { "Authorization": token } });
        if (response.data.isPremium) {
            premiumButton.style.display = 'none';
            premiumTitle.style.display = 'block';
        }
    }
    catch (error) {
        console.error('Error fetching premium status:', error);
    }
};
ispremiumuser();

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const expense_amount = document.getElementById('expense_amount').value;
    const expense_description = document.getElementById('expense_description').value;

    const geminiCategory = await axios.get(`http://localhost:4000/gemini/getCategory?des=${expense_description}`);

    console.log(geminiCategory);
    let categoryContent = geminiCategory.data.response.candidates[0].content;
    console.log(categoryContent);   
    let category = categoryContent != {} ? categoryContent.parts[0].text : 'Others';
    try {
        const response = await axios.post('http://localhost:4000/expense/addExpense', {
            expense_amount, expense_description, category: category
        }, { headers: { "Authorization": token } });
        loadExpenses();
        console.log(response.data);
        alert('Expense added successfully!');
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred.');
    }
});

const loadExpenses = async () => {
    try {
        const response = await axios.get('http://localhost:4000/expense/getExpenses', { headers: { "Authorization": token } });
        const expenses = response.data.expenses;
        const expenseList = document.getElementById('expense_list');
        expenseList.innerHTML = '';
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.innerHTML = `${expense.expense_description} - ${expense.expense_amount} [${expense.category}] - <button onclick="deleteExpense(${expense.id},${expense.expense_amount})">Delete-Expense</button>`;
            expenseList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
};


const deleteExpense = async (id,expense_amt) => {
    try {
        await axios.delete(`http://localhost:4000/expense/deleteExpense/${id}?expense_amount=${expense_amt}`, { headers: { "Authorization": token } });
        loadExpenses();
    } catch (error) {
        console.error('Error deleting expense:', error);
    }
};


loadExpenses();


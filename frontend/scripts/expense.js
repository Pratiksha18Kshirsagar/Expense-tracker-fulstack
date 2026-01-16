const form = document.querySelector('form');
const token = localStorage.getItem('token');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const expense_amount = document.getElementById('expense_amount').value;
    const expense_description = document.getElementById('expense_description').value;
    const category = document.getElementById('category').value;
    try {
        const response = await axios.post('http://localhost:4000/expense/addExpense', {
            expense_amount, expense_description, category
        } , { headers: {"Authorization": token} });
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
        const response = await axios.get('http://localhost:4000/expense/getExpenses' , { headers: {"Authorization": token} });
        const expenses = response.data.expenses;
        const expenseList = document.getElementById('expense_list');
        expenseList.innerHTML = '';
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.innerHTML = `${expense.expense_description} - ${expense.expense_amount} [${expense.category}] - <button onclick="deleteExpense(${expense.id})">Delete-Expense</button>`;
            expenseList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
};


const deleteExpense = async (id) => {
    try {
        await axios.delete(`http://localhost:4000/expense/deleteExpense/${id}` , { headers: {"Authorization": token} });
        loadExpenses();
    } catch (error) {   
        console.error('Error deleting expense:', error);
    }
};  


loadExpenses();


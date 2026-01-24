const form = document.querySelector('form')
const token = localStorage.getItem('token')

const premiumButton = document.getElementById('premiumBtn')
const premiumTitle = document.getElementById('premiumTitle')
premiumTitle.style.display = 'none'

const leaderBoardBtn = document.getElementById('leaderBoard')
const leaderBoardList = document.getElementById('leaderBoardList')

const expenseList = document.getElementById('expense_list')
const paginationDiv = document.getElementById('pagination')
const pageSizeSelect = document.getElementById('pageSize')

let allExpenses = []
let currentPage = 1
let expensesPerPage = Number(pageSizeSelect.value)

/* ---------- PAGE SIZE CHANGE ---------- */
pageSizeSelect.addEventListener('change', () => {
  expensesPerPage = Number(pageSizeSelect.value)
  currentPage = 1
  renderExpenses()
  renderPagination()
})

/* ---------- LEADERBOARD ---------- */
leaderBoardBtn.addEventListener('click', async () => {
  const res = await axios.get('http://localhost:4000/premium/leaderboard', {
    headers: { Authorization: token }
  })

  leaderBoardList.innerHTML = ''
  res.data.forEach(u => {
    const li = document.createElement('li')
    li.textContent = `Name: ${u.name}, Total Expense: ${u.totalExpense ?? 0}`
    leaderBoardList.appendChild(li)
  })
})

/* ---------- PREMIUM STATUS ---------- */
const ispremiumuser = async () => {
  const res = await axios.get('http://localhost:4000/premium/premiumStatus', {
    headers: { Authorization: token }
  })

  if (res.data.isPremium) {
    premiumButton.style.display = 'none'
    premiumTitle.style.display = 'block'
  }
}
ispremiumuser()

/* ---------- ADD EXPENSE ---------- */
form.addEventListener('submit', async e => {
  e.preventDefault()

  const expense_amount = document.getElementById('expense_amount').value
  const expense_description = document.getElementById('expense_description').value

  const geminiRes = await axios.get(
    `http://localhost:4000/gemini/getCategory?des=${expense_description}`
  )

  const category =
    geminiRes.data?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
    'Others'

  await axios.post(
    'http://localhost:4000/expense/addExpense',
    { expense_amount, expense_description, category },
    { headers: { Authorization: token } }
  )

  loadExpenses()
})

/* ---------- LOAD EXPENSES ---------- */
const loadExpenses = async () => {
  const res = await axios.get('http://localhost:4000/expense/getExpenses', {
    headers: { Authorization: token }
  })

  allExpenses = res.data.expenses

  const totalPages = Math.ceil(allExpenses.length / expensesPerPage)
  if (currentPage > totalPages) currentPage = totalPages || 1

  renderExpenses()
  renderPagination()
}

/* ---------- RENDER EXPENSES ---------- */
const renderExpenses = () => {
  expenseList.innerHTML = ''

  const start = (currentPage - 1) * expensesPerPage
  const end = start + expensesPerPage

  allExpenses.slice(start, end).forEach(exp => {
    const li = document.createElement('li')
    li.innerHTML = `
      ${exp.expense_description} - ${exp.expense_amount} [${exp.category}]
      <button onclick="deleteExpense(${exp.id}, ${exp.expense_amount})">
        Delete-Expense
      </button>
    `
    expenseList.appendChild(li)
  })
}

/* ---------- PAGINATION ---------- */
const renderPagination = () => {
  paginationDiv.innerHTML = ''

  const totalPages = Math.ceil(allExpenses.length / expensesPerPage)

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button')
    btn.textContent = i
    btn.disabled = i === currentPage

    btn.addEventListener('click', () => {
      currentPage = i
      renderExpenses()
      renderPagination()
    })

    paginationDiv.appendChild(btn)
  }
}

/* ---------- DELETE EXPENSE ---------- */
window.deleteExpense = async (id, expense_amt) => {
  await axios.delete(
    `http://localhost:4000/expense/deleteExpense/${id}?expense_amount=${expense_amt}`,
    { headers: { Authorization: token } }
  )

  loadExpenses()
}

/* ---------- INITIAL LOAD ---------- */
loadExpenses()

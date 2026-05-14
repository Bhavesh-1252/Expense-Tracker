import { useEffect, useState } from 'react'
import './App.css'
import ExpenseForm from "./components/ExpenseForm.jsx"
import HeadTotal from "./components/HeadTotal.jsx"
import ExpenseList from "./components/ExpenseList.jsx"
import SummaryPanel from './components/SummaryPanel.jsx';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState({value: "INR", symbol: "₹"})
  const [rates, setRates] = useState([])

  // Local Storage Key 
  const STORAGE_KEY = 'expense-tracker-data'

  // Fetch Local Storage Data
  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) setExpenses(JSON.parse(data))

    setLoaded(true);
  }, [currentCurrency])

  // Updating data to Local Storage 
  useEffect(() => {
    if (loaded)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses, loaded])

  // Expenses to Display with Currency Converter
  const displayExpenses = currentCurrency.value === "INR"
    ? expenses
    : expenses.map((exp) => ({
      ...exp,
      amount: +(exp.amount * (rates[currentCurrency.value].value || 1)).toFixed(2),
    }));

  // Total Expenses Spent 
  const total = displayExpenses.reduce((sum, e) => sum + e.amount, 0);

  // Category wise total
  const categoryTotals = displayExpenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {})

  // Add Expense form handler
  function addExpense(newExpense) {
    setExpenses(prev => [...prev, {
      id: Date.now(),
      date: new Date(Date.now()).toISOString().split('T')[0],
      ...newExpense
    }])

    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }

  // Delete expense handler
  function deleteExpense(id) {
    const ans = confirm("Do you want the delete the expense?")
    if (ans) {
      setExpenses(prev => prev.filter((e) => e.id != id));
    }
  }

  return (
    <main className="bg-[#FAFAF7] text-[#1C1917] min-h-screen px-4 py-8 sm:px-6 lg:px-8 " >
      <div>
        <section className="max-w-4xl m-auto">
          <div>
            <HeadTotal currentCurrency={currentCurrency} total={total} />
          </div>
          <div>
            <ExpenseForm onAdd={addExpense} />
          </div> 

          <div>
            <ExpenseList rates={rates} setRates={setRates} currentCurrency={currentCurrency} setCurrentCurrency={setCurrentCurrency} total={total} expenses={displayExpenses} onDelete={deleteExpense} />
          </div>

          <div>
            <SummaryPanel currentCurrency={currentCurrency} categoryTotals={categoryTotals} />
          </div>

        </section>
      </div>


    </main>
  )
}

export default App

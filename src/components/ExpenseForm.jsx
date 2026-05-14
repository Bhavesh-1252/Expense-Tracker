import { Plus } from 'lucide-react';
import { useState } from 'react';

export const categories = ["Food", "Travel", "Marketing", "Utilities","Other"]

export const colorClasses = {
  Food: "bg-emerald-100 text-emerald-700",
  Travel: "bg-blue-100 text-blue-700",
  Marketing: "bg-violet-100 text-violet-700",
  Utilities: " bg-orange-100 text-orange-700",
  Other: "bg-pink-100 text-pink-700"
}

const ExpenseForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      amount: parseFloat(amount),
      category,
      color: colorClasses[category],
      id: Date.now(),
      date: new Date(Date.now()).toISOString().split('T')[0],
    }

    if (title && amount && category) {
      onAdd(formData);

      setTitle("");
      setAmount("");
    }
    else {
      alert("Fill all the fields!")
    }

  }

  return (
    <div className="my-10 py-6 px-4 sm:px-8 rounded-xl border-2 border-[#E7E5E0]">
      <h3 className="text-2xl font-semibold">
        Add Expense &nbsp;
        <span className="text-xs text-red-600">(add expense in INR)</span> 
      </h3>

      <div className="mt-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-5">
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Grocery, Ticket"
              className="py-2 px-4 rounded-xl border border-zinc-300 placeholder:text-zinc-500 focus:border-[#D97706] focus:outline-none  hover:ring-2 focus:ring-2 hover:ring-zinc-500/20 focus:ring-[#D97706]/20  sm:w-2/4" />
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Amount"
              className="py-2 px-4 rounded-xl border border-zinc-300 placeholder:text-zinc-500 focus:border-[#D97706] focus:outline-none hover:ring-2 focus:ring-2 hover:ring-zinc-500/20 focus:ring-[#D97706]/20 sm:w-1/4" />

            <select id="category" value={category}
              onChange={e => setCategory(e.target.value)}
              className="py-2 px-4 rounded-xl border border-zinc-300 placeholder:text-zinc-500 focus:border-[#D97706] focus:outline-none hover:ring-2 focus:ring-2 hover:ring-zinc-500/20 focus:ring-[#D97706]/20 sm:w-1/4" >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-5 justify-between mt-5">

            <button
              className="py-2 px-8 flex items-center gap-1 cursor-pointer justify-center rounded-xl bg-[#D97706] hover:bg-[#D07000] text-white border border-zinc-300 placeholder:text-zinc-500 focus:border-[#D97706] focus:outline-none focus:ring-2 focus:ring-[#D97706]/20 ">
              Add
              <Plus className="w-5 h-5" />
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}

export default ExpenseForm

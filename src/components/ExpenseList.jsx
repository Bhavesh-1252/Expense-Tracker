import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react"
import { getLatestRates } from "../features/ExchangeRates.jsx"

export default function ExpenseList({ rates, setRates, currentCurrency, setCurrentCurrency, expenses, total, onDelete }) {
  // Currency code To Currency Symbol Converter
  function getCurrencySymbol(currencyCode, locale = 'en') {
    return Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    })
      .formatToParts(1)
      .find(part => part.type === 'currency').value;
  }

  // Exhcnage Rate API - Fetch Data
  useEffect(() => {
    async function fetchRates() {
      try {
        const data = await getLatestRates();

        setRates(
          Object.fromEntries(
            Object.entries(data)
              .map(([code, value]) => [
                code,
                {
                  value,
                  symbol: getCurrencySymbol(code) || code,
                },
              ])
          )
        );

      } catch (error) {
        console.log(error);
      }
    }

    fetchRates();
  }, []);

  return (
    <div className=" border-2 rounded-xl border-[#E7E5E0] items-center justify-center">
      <div className="w-full py-6 px-4 sm:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">Expenses</h3>
            <p className="mt-1 text-sm text-gray-600">
              Track and manage your recent transactions
            </p>
          </div>

          <div>
            <select
              id="currency"
              value={currentCurrency.value}
              onChange={e => setCurrentCurrency({
                value: e.target.value,
                symbol: getCurrencySymbol(e.target.value) || e.target.value
              })}
              className="bg-[#D97706] text-white p-2 border border-[#D97706] focus:outline-none hover:ring-2 focus:ring-2 hover:ring-[#D97706]/20"
            >
              {
                Object.entries(rates).map(([code, item]) =>
                (
                  <option className="bg-white text-black" key={code} value={code}>
                    {code}
                  </option>
                ))
              }
            </select>
          </div>
        </div>

        <div className="overflow-x-scroll sm:overflow-hidden border-black/10 min-h-96">
          <div className="min-w-[500px]">
            <div className="grid grid-cols-12 sm:px-5 py-4 text-sm font-semibold uppercase tracking-wide ">
              <div className="col-span-3">Category</div>
              <div className="col-span-3">Title</div>
              <div className="col-span-3">Date</div>
              <div className="col-span-2 text-right">Amount</div>
              <div className="col-span-1 text-right"></div>
            </div>

            {
              expenses.length > 0 ? <div className="divide-y divide-white/6 min-w-fit sm:w-full">
                {expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="grid grid-cols-12 items-center sm:px-5 py-5 transition"
                  >
                    <div className="col-span-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${expense.color}`}
                      >
                        {expense.category}
                      </span>
                    </div>

                    <div className="col-span-3  font-medium ">
                      {expense.title}
                    </div>

                    <div className="col-span-2 text-sm text-gray-700">
                      {expense.date}
                    </div>

                    <div className="col-span-3 text-right text-lg  ">
                      {currentCurrency.symbol} {parseFloat(expense.amount).toFixed(2)}
                    </div>

                    <div className="col-span-1 flex justify-end ">
                      <button onClick={() => onDelete(expense.id)} className="cursor-pointer">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="mt-6 flex items-center border-t-2 border-b-4 border-double border-[#0F172A] w-[93%] justify-between  sm:px-5 py-4">
                  <span className="text-sm font-semibold">Total Expenses</span>
                  <span className="text-2xl font-bold ">{currentCurrency.symbol} {parseFloat(total).toFixed(2)}</span>
                </div>
              </div>
                : <div className="text-xl text-center mt-20">No Expense Exists</div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

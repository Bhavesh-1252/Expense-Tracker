import {colorClasses } from "./ExpenseForm.jsx"

const SummaryPanel = ({ currentCurrency, categoryTotals }) => {
    return (
        <div className=" border-2 rounded-xl border-[#E7E5E0] mt-10 py-6 px-4 sm:px-8">
            <div>
                <h3 className="text-2xl font-bold">Category Summary</h3>
                <p className="mt-1 text-sm text-gray-600">
                    Summarize all category expenses
                </p>
            </div>

            <div className="mt-5 gap-4 grid sm:grid-cols-2">
                {
                    categoryTotals && Object.entries(categoryTotals).map(([cat, amt]) =>
                    (

                        <div key={cat} className={`py-3 px-5 flex justify-between rounded-full ${colorClasses[cat]}`}>
                            <span className="font-semibold">{cat}</span>
                            <span className="">{currentCurrency.symbol} {parseFloat(amt).toFixed(2)}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SummaryPanel

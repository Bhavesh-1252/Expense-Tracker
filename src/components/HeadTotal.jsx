const HeadTotal = ({ currentCurrency, total }) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row lg:gap-2 justify-between border-2 border-[#E7E5E0] py-6 px-4 sm:px-8 rounded-xl">
        <div>
          <p className="tracking-[0.3em] text-sm sm:text-base font-semibold bg-[#D97706] w-fit p-2 text-white">EXPENSE TRACKER</p>
          <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Track spending with clarity</h1>
          <p className="mt-3 text-[#78716C]">Add expenses, see totals, and keep the budget organized in one simple app.</p>
        </div>

        <div className="flex flex-col min-w-40 px-2 py-4 lg:p-4 bg-[#F5F5F0] rounded-xl border-1 border-[#E7E5E0]">
          <p className="text-sm font-semibold">Total Spent</p>
          <p className="text-2xl sm:text-3xl mt-3 self-end" key={total}>
            {currentCurrency.symbol} {parseFloat(total).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default HeadTotal

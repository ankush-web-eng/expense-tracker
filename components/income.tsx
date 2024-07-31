type IncomeProps = {
  source: string,
  amount: number,
  date: Date
};

export default function Income({children}: {children: IncomeProps}) {
  return (
    <div className="p-6 shadow-lg rounded-xl md:w-[500px] w-full bg-white dark:bg-slate-800 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-green-100 dark:from-slate-700 dark:to-slate-600 py-4 px-6 rounded-lg">
        <div className="flex items-center space-x-3">
            {/* Placeholder for potential icon */}
            {/* <img src="" alt="" className="w-8 h-8 rounded-full" /> */}
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{children.source}</span>
        </div>
        <span className="text-xl font-bold text-green-600 dark:text-green-400">Rs. {children.amount.toLocaleString('en-IN')}</span>
      </div>
      <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 italic">
        {new Date(children.date).toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
    </div>
  );
}
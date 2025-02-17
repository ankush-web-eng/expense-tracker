type ExpenseProps = {
  source: string,
  amount: number,
  date: Date,
  type: TransactionType
};

export type TransactionType = 'clothes' | 'food' | 'junk' | 'work' | 'other';

const TransactionIcons = {
  clothes: '👕',
  food: '🍔',
  junk: '🛍️',
  work: '💼',
  other: '📦'
};

export default function Expense({children}: {children: ExpenseProps}) {
  return (
    <div className="p-6 shadow-lg rounded-xl md:w-[500px] w-full bg-white dark:bg-slate-800 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-slate-700 dark:to-slate-600 py-4 px-6 rounded-lg">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{children.source}</span>
          <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="mr-2">{TransactionIcons[children.type]}</span>
            <span className="capitalize">{children.type}</span>
          </div>
        </div>
        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Rs. {children.amount.toLocaleString('en-IN')}</span>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 italic">
        {new Date(children.date).toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
    </div>
  );
}
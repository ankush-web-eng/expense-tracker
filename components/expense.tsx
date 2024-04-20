
export default function Expense() {
  return (
    <div className="p-4 border rounded-lg w-fit">
      <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 py-4 px-6 rounded-lg ">
        <div className="flex px-3 ">
            {/* <img src="" alt="" /> */}
            <span className="text-gray-600">Banana Juice</span>
        </div>
        <div className="px-6"></div>
        <span className=" px-3 ">Rs. {100}</span>
      </div>
    </div>
  );
}
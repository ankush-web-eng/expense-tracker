

type incomeProps = {
  source : string,
  amount : number,
  date : Date
};

export default function Income({children} : {children: incomeProps}) {
  return (
    <div className="p-4 border rounded-lg w-fit flex flex-col max-w-full">
      <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 py-4 px-6 rounded-lg ">
        <div className="flex px-3 ">
            {/* <img src="" alt="" /> */}
            <span className="text-gray-600">{children.source}</span>
        </div>
        <div className="px-6"></div>
        <span className=" px-3 ">Rs. {children.amount}</span>
      </div>
      {/* <div>{children.date.toLocaleDateString()}</div> */}
    </div>
  );
}
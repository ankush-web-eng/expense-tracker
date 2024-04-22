import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { IncomeButton } from "./incomebar";
import { ExpenseBar } from "./expensebar";

export default function Card() {
  const [more, setMore] = useState(false);
  const [expense, setExpense] = useState(false);

  const [gaveMoney, setGaveMoney] = useState("");
  const [amount, setAmount] = useState("");
  const [addmoney, setAddMoney] = useState(false);

  const [wherespent, setWhereSpent] = useState("");
  const [spent, setSpent] = useState("");
  const [addExpense, setAddExpense] = useState(false);

  const handleMore = () => {
    setMore(!more);
  };

  const sendMoney = () => {
    setAddMoney(true);
    alert(`You got Rs. ${amount} from ${gaveMoney}`);
    setGaveMoney("");
    setAmount("");
    setAddMoney(false);
    setMore(false);
  };

  const sendExpense = () => {
    setAddExpense(true);
    alert(`You spent Rs. ${spent} for ${wherespent}`);
    setWhereSpent("");
    setSpent("");
    setAddExpense(false);
    setExpense(false);
  };

  const handleExpense = () => {
    setExpense(!expense);
  };

  return (
    <div className="border-slate-400-500 rounded-lg border-2 p-4 dark:border-slate-400">
      <div className="flex flex-col px-2 space-y-2 md:space-y-5 p-4 rounded-lg bg-slate-100 dark:bg-teal-400 w-fit border-sky-500 dark:border-slate-400 ">
        <div className="flex items-center justify-between w-full">
          <span className="px-8 text-black dark:text-white">Money Left: </span>
          <span className="px-8 text-black dark:text-white">Rs. {500}</span>
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="px-8 text-black dark:text-white">Money Spent: </span>
          <span className="px-8 text-black dark:text-white">Rs. {150}</span>
        </div>


        <div className="flex justify-between">
          <div className="relative py-3 flex px-6">
            <IncomeButton />
          </div>

          <div className="relative py-3 flex px-6">
            <ExpenseBar />
          </div>
        </div>


        <div className="flex justify-between px-6 gap-2">
          <Link href="/income">
            <button className="w-fit hover:bg-blue-400 active:bg-teal-700 bg-sky-500 dark:bg-sky-400 rounded-lg p-2 text-white dark:text-black">
              Income History
            </button>
          </Link>

          <Link href="/expenses">
            <button className="w-fit hover:bg-blue-400 active:bg-teal-700 bg-sky-500 dark:bg-sky-400  rounded-lg p-2 text-white dark:text-black">
              Expense History
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

{
  /* <div
              // onClick={handleMore}
              className="w-fit hover:bg-red-600 active:bg-red-700 bg-red-500 dark:bg-red-500 text-white rounded-lg p-2 relative"
            >
              <button onClick={handleExpense}>Add Expense</button>

              {expense && (
                <div className="absolute w-fit bg-white flex flex-col text-black rounded-lg py-4 z-40 border shadow-lg">
                  <div className="flex flex-col gap-2 justify-between p-5">
                    <div className="flex flex-col gap-2">
                      <span className="text-slate-700">
                        Where you spent it ?
                      </span>
                      <input
                        type="text"
                        placeholder="Source"
                        className="rounded-lg px-2 py-1 border w-fit"
                        value={wherespent}
                        onChange={(e) => setWhereSpent(e.target.value)}
                      />
                      <span className="text-slate-700">How much ?</span>
                      <input
                        type="text"
                        placeholder="Enter amount"
                        className="rounded-lg px-2 py-1 border w-fit"
                        value={spent}
                        onChange={(e) => setSpent(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-center">
                      <Button
                        variant={"default"}
                        className="w-fit"
                        onClick={sendExpense}
                      >
                        {addmoney ? "Adding..." : "Add"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div> */
}

{
  /* <div
              // onClick={handleMore}
              className="w-fit hover:bg-teal-600 active:bg-teal-700 bg-teal-500 dark:bg-teal-500 text-white rounded-lg p-2 relative"
            >
              <button onClick={handleMore}>Add Money</button>

              {more && (
                <div className="absolute w-fit bg-white flex flex-col text-black rounded-lg py-4 z-40 border shadow-lg">
                  <div className="flex flex-col gap-2 justify-between p-5">
                    <div className="flex flex-col gap-2">
                      <span className="text-slate-700">
                        Who gave you Money ?
                      </span>
                      <input
                        type="text"
                        placeholder="Source"
                        className="rounded-lg px-2 py-1 border w-fit"
                        value={gaveMoney}
                        onChange={(e) => setGaveMoney(e.target.value)}
                      />
                      <span className="text-slate-700">How much ?</span>
                      <input
                        type="text"
                        placeholder="Enter amount"
                        className="rounded-lg px-2 py-1 border w-fit"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-center">
                      <Button
                        variant={"default"}
                        className="w-fit"
                        onClick={sendMoney}
                      >
                        {addmoney ? "Adding..." : "Add"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div> */
}

// src/components/ui/ExpensesTable.tsx
import React from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
interface ExpenseRow {
  description: string;
  trackNumber: string;
  approvalStatus: string;
  amount: string;
  receiptUrl?: string;
}

interface ExpensesTableProps {
  data: ExpenseRow[];
  onAddExpense?: () => void;
}

const ExpensesTable: React.FC<ExpensesTableProps> = ({
  data,
  onAddExpense,
}) => {
  const navigate = useNavigate();
  return (
    <div className='w-full'>
      <div className='flex justify-end mb-4'>
        <Button
          variant='default'
          onClick={() => navigate("/activities/add-new-expense")}
          className='w-28'
        >
          Add Expense
        </Button>
      </div>

      <div className='bg-[#FCFCFD] rounded-xl shadow-sm p-4 overflow-auto'>
        <table className='min-w-full table-fixed'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-[15px] font-semibold text-[#181C32] bg-transparent'>
                Description
              </th>
              <th className='px-6 py-3 text-left text-[15px] font-semibold text-[#181C32] bg-transparent'>
                Track Number
              </th>
              <th className='px-6 py-3 text-left text-[15px] font-semibold text-[#181C32] bg-transparent'>
                Approval Status
              </th>
              <th className='px-6 py-3 text-left text-[15px] font-semibold text-[#181C32] bg-transparent'>
                Amount
              </th>
              <th className='px-6 py-3 text-left text-[15px] font-semibold text-[#181C32] bg-transparent'>
                Receipets
              </th>
              <th className='px-6 py-3 text-center text-[15px] font-semibold text-[#181C32] bg-transparent'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className='hover:bg-[#F6F6F7] transition-colors'
                style={{ borderBottom: "1px solid #F3F3F4" }}
              >
                <td className='px-6 py-4 whitespace-nowrap text-[15px] text-[#252F4A]'>
                  {row.description}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-[15px] text-[#252F4A]'>
                  {row.trackNumber}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-[15px] text-[#252F4A]'>
                  {row.approvalStatus}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-[15px] text-[#252F4A]'>
                  {row.amount}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-[15px] text-[#21A8DF] underline'>
                  {row.receiptUrl ? (
                    <a
                      href={row.receiptUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Link
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-center'>
                  <button
                    className='inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#A3FFC4] bg-[#F6FFF9] text-[#21C55D] hover:bg-[#ebfff3] transition'
                    aria-label='Add'
                  >
                    <PlusCircle size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpensesTable;

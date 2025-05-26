// src/components/ui/ActivityUpdateTable.tsx
import React from "react";
import { Edit2, PlusCircle } from "lucide-react";

interface ProgressRow {
  item: string;
  metric: string;
  values: number[];
  total: string;
}

interface ActivityUpdateTableProps {
  data: ProgressRow[];
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ActivityUpdateTable: React.FC<ActivityUpdateTableProps> = ({ data }) => {
  return (
    <div className='bg-[#FCFCFD] rounded-xl shadow-sm p-4 overflow-auto'>
      <table className='min-w-full table-fixed'>
        <thead>
          <tr>
            <th className='px-6 py-3 text-left text-[15px] font-semibold text-[#181C32] bg-transparent'>
              Budget Line Item
            </th>
            <th className='px-6 py-3 text-left text-[15px] font-semibold text-[#181C32] bg-transparent'>
              Metric
            </th>
            {days.map((day) => (
              <th
                key={day}
                className='px-2 py-3 text-center text-[15px] font-semibold text-[#181C32] bg-transparent'
              >
                {day}
              </th>
            ))}
            <th className='px-6 py-3 text-center text-[15px] font-semibold text-[#181C32] bg-transparent'>
              Total Comp
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
              className='hover:bg-[#F6F6F7] transition-colors group'
              style={{ borderBottom: "1px solid #F3F3F4" }}
            >
              <td className='px-6 py-4 whitespace-nowrap text-[15px] text-[#252F4A] font-medium'>
                {row.item}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-[15px] text-[#252F4A]'>
                {row.metric}
              </td>
              {row.values.map((val, i) => (
                <td
                  key={i}
                  className='px-2 py-4 whitespace-nowrap text-[15px] text-[#252F4A] text-center'
                >
                  {val}
                </td>
              ))}
              <td className='px-6 py-4 whitespace-nowrap text-[15px] text-[#252F4A] text-center'>
                {row.total}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-center'>
                <button
                  className='inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#C9DBFF] bg-[#F6FAFF] text-[#3772FF] mr-2 hover:bg-[#e7f1ff] transition'
                  aria-label='Edit'
                >
                  <Edit2 size={16} />
                </button>
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
  );
};

export default ActivityUpdateTable;

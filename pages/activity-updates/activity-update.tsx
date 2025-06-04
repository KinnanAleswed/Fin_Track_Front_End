import { useState, type FC } from "react";
import TabBar from "../../components/layouts/tab-bar";
import ActivityUpdateTable from "../../components/page-components/activity-update-table";
import ExpensesTable from "../../components/page-components/expenses-table";
const progressData = [
  {
    item: "ABC Notification",
    metric: "DOE",
    values: [8, 3, 2, 3, 4, 4, 3],
    total: "ABC",
  },
  {
    item: "XYZ Notification",
    metric: "MOH",
    values: [2, 3, 4, 5, 2, 3, 3],
    total: "ABC",
  },
  {
    item: "ABC Notification",
    metric: "MOH",
    values: [3, 3, 3, 3, 3, 3, 3],
    total: "ABC",
  },
  {
    item: "ABC Notification",
    metric: "MOH",
    values: [3, 3, 3, 3, 3, 3, 4],
    total: "ABC",
  },
];

const expensesData = [
  {
    description: "Transportation",
    trackNumber: "00923424",
    approvalStatus: "Not Submitted",
    amount: "2 AED",
    receiptUrl: "#",
  },
  {
    description: "Transportation",
    trackNumber: "00923424",
    approvalStatus: "Not Submitted",
    amount: "4 AED",
    receiptUrl: "#",
  },
];

const tabOptions = [
  { label: "Progress Update", value: "progress" },
  { label: "Expense", value: "Expenses" },
];

const ProgressUpdate: FC = () => {
  const [activeTab, setActiveTab] = useState<"progress" | "Expenses">(
    "progress"
  );

  return (
    <div className='min-h-screen p-2'>
      <TabBar
        tabs={tabOptions}
        active={activeTab}
        onChange={(value) => setActiveTab(value as "progress" | "Expenses")}
      />
      <div className='mt-3'>
        {activeTab === "progress" ? (
          <ActivityUpdateTable data={progressData} />
        ) : (
          <ExpensesTable data={expensesData} />
        )}
      </div>
    </div>
  );
};

export default ProgressUpdate;

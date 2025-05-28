// src/components/ui/Tabs.tsx
import React from "react";

type Tab = {
  label: string;
  value: string;
};

interface TabsProps {
  tabs: Tab[];
  active: string;
  onChange: (value: string) => void;
  className?: string;
}

const TabBar: React.FC<TabsProps> = ({
  tabs,
  active,
  onChange,
  className = "",
}) => (
  <div
    className={`w-full border-b border[#002e4d] flex items-end ${className}`}
  >
    {tabs.map((tab) => (
      <button
        key={tab.value}
        onClick={() => onChange(tab.value)}
        className={`relative px-0 py-0 mr-10 pb-2 text-md font-normal transition-colors
          ${
            active === tab.value
              ? "text-[#002e4d] font-semibold"
              : "text-[#000000]"
          }
          focus:outline-none bg-transparent`}
        style={{ background: "none", border: "none" }}
      >
        {tab.label}
        {active === tab.value && (
          <span className='w-full absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#002e4d] rounded' />
        )}
      </button>
    ))}
  </div>
);

export default TabBar;

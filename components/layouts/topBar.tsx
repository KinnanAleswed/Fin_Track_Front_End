import React from "react";
import { Bell, Settings, ChevronDown } from "lucide-react";
import TSMElogo from "../../assets/icons/TSMElogo.png";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

interface TopBarProps {
  userName: string;
  productName: string;
}

const TopBar: React.FC<TopBarProps> = ({ userName, productName }) => {
  return (
    <div className='flex items-center justify-between px-5 py-3 bg-white border-b border-gray-200'>
      <div className='flex items-center'>
        <div className='text-left'>
          <img
            src={TSMElogo}
            alt='Technology Strategies Middle East Logo'
            className='w-42 h-18'
          />
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <button className='p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors bg-muted flex items-center justify-center rounded-full '>
          <Settings size={20} />
        </button>
        <button className='p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors bg-muted flex items-center justify-center rounded-full'>
          <Bell size={20} />
        </button>
        <div className='flex items-center gap-3'>
          <Avatar>
            <AvatarImage src='' />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className='text-sm'>
            <div className='font-medium text-gray-900'>{userName}</div>
            <div className='text-gray-500 text-xs'>{productName}</div>
          </div>
          <ChevronDown size={16} className='text-gray-500' />
        </div>
      </div>
    </div>
  );
};

export default TopBar;

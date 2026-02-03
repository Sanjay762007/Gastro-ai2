
import React from 'react';
import { Utensils, Users, Clock } from 'lucide-react';
import { Table } from '../types';

const TABLES: Table[] = [
  { id: 1, capacity: 4, status: 'occupied', occupiedTime: '45m' },
  { id: 2, capacity: 2, status: 'available' },
  { id: 3, capacity: 6, status: 'occupied', occupiedTime: '12m' },
  { id: 4, capacity: 4, status: 'reserved' },
  { id: 5, capacity: 2, status: 'occupied', occupiedTime: '85m' },
  { id: 6, capacity: 4, status: 'available' },
  { id: 7, capacity: 2, status: 'available' },
  { id: 8, capacity: 8, status: 'reserved' },
];

const TablesPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-8 animate-fadeIn">
      <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-white/50 p-2 rounded-[24px] overflow-x-auto shadow-sm">
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-[18px] text-[13px] font-bold shadow-lg shadow-blue-100 whitespace-nowrap">All Tables</button>
        <button className="px-6 py-2.5 text-gray-500 hover:bg-gray-100 rounded-[18px] text-[13px] font-bold transition-all whitespace-nowrap">Available (3)</button>
        <button className="px-6 py-2.5 text-gray-500 hover:bg-gray-100 rounded-[18px] text-[13px] font-bold transition-all whitespace-nowrap">Occupied (3)</button>
        <button className="px-6 py-2.5 text-gray-500 hover:bg-gray-100 rounded-[18px] text-[13px] font-bold transition-all whitespace-nowrap">Reserved (2)</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {TABLES.map((table) => (
          <div key={table.id} className={`
            p-6 rounded-[32px] border transition-all duration-300 active:scale-[0.96] cursor-pointer
            ${table.status === 'occupied' ? 'bg-orange-50/50 border-orange-100' : 
              table.status === 'reserved' ? 'bg-blue-50/50 border-blue-100' : 
              'bg-white border-white/50 shadow-sm hover:shadow-md'}
          `}>
            <div className="flex items-start justify-between mb-10">
              <div className={`p-3.5 rounded-2xl ${
                table.status === 'occupied' ? 'bg-orange-500 text-white' : 
                table.status === 'reserved' ? 'bg-blue-500 text-white' : 
                'bg-gray-100 text-gray-400'
              }`}>
                <Utensils size={20} />
              </div>
              <span className="text-3xl font-black text-gray-200/60 tabular-nums">{table.id}</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#1C1C1E] font-bold">
                <Users size={14} className="opacity-50" />
                <span className="text-[15px]">{table.capacity} Seater</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-black uppercase tracking-widest ${
                   table.status === 'occupied' ? 'text-orange-600' : 
                   table.status === 'reserved' ? 'text-blue-600' : 'text-green-600'
                }`}>
                  {table.status}
                </span>
                
                {table.status === 'occupied' && (
                  <div className="flex items-center gap-1 text-[12px] font-bold text-gray-400">
                    <Clock size={12} />
                    <span>{table.occupiedTime}</span>
                  </div>
                )}
              </div>
            </div>

            {table.status === 'occupied' && (
               <div className="mt-4 pt-4 border-t border-orange-100/50">
                 <div className="w-full bg-orange-200/20 h-2 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full" style={{ width: '75%' }}></div>
                 </div>
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablesPage;

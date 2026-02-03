
import React, { useState } from 'react';
import { Package, AlertTriangle, RefreshCw, Plus, Search, Filter, TrendingDown } from 'lucide-react';
import { InventoryItem } from '../types';

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: '1', name: 'Fresh Basil', currentStock: 0.2, minThreshold: 0.5, unit: 'kg', lastRestockDate: '2023-11-20' },
  { id: '2', name: 'Chicken Breast', currentStock: 12.5, minThreshold: 5.0, unit: 'kg', lastRestockDate: '2023-11-22' },
  { id: '3', name: 'Arborio Rice', currentStock: 8.0, minThreshold: 3.0, unit: 'kg', lastRestockDate: '2023-11-15' },
  { id: '4', name: 'Olive Oil', currentStock: 5.2, minThreshold: 2.0, unit: 'L', lastRestockDate: '2023-11-10' },
  { id: '5', name: 'Heavy Cream', currentStock: 3.5, minThreshold: 1.0, unit: 'L', lastRestockDate: '2023-11-21' },
];

const InventoryPage: React.FC = () => {
  const [items] = useState<InventoryItem[]>(INITIAL_INVENTORY);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Inventory Management</h2>
          <p className="text-gray-500">Stock tracking and consumption forecasting</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white text-gray-700 border border-gray-200 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-all">
            <RefreshCw size={18} />
            Bulk Restock
          </button>
          <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
            <Plus size={18} />
            Add New Item
          </button>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex items-start gap-4">
        <div className="p-3 bg-white rounded-xl text-amber-600 shadow-sm border border-amber-100">
          <AlertTriangle size={24} />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-amber-900 mb-1">Low Stock Alerts</h4>
          <p className="text-sm text-amber-800/80 mb-4">The following items are predicted to run out before your next delivery cycle based on current sales trends.</p>
          <div className="flex flex-wrap gap-2">
            {items.filter(i => i.currentStock <= i.minThreshold).map(item => (
              <span key={item.id} className="bg-white px-3 py-1 rounded-full text-xs font-bold text-amber-700 border border-amber-200 flex items-center gap-2">
                {item.name}: {item.currentStock}{item.unit}
                <TrendingDown size={14} className="text-red-500" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="flex items-center bg-gray-50 px-4 py-2 rounded-xl flex-1 max-w-md">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Search ingredients..." className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full" />
          </div>
          <button className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 transition-colors">
            <Filter size={18} />
            Category
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Item Name</th>
                <th className="px-6 py-4">Current Stock</th>
                <th className="px-6 py-4">Min Threshold</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Consumption (Predicted)</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 font-semibold text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.currentStock} {item.unit}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.minThreshold} {item.unit}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      item.currentStock <= item.minThreshold 
                        ? 'bg-red-50 text-red-600' 
                        : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {item.currentStock <= item.minThreshold ? 'Critical' : 'Healthy'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${Math.random() * 60 + 20}%` }}></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-indigo-600 font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;

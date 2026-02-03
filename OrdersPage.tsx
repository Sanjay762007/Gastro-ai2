
import React, { useState, useMemo } from 'react';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  ChevronRight, 
  Filter, 
  IndianRupee, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown,
  X,
  Plus
} from 'lucide-react';
import { Order } from '../types';

const INITIAL_ORDERS: Order[] = [
  { id: 'ORD-101', dishName: 'Paneer Butter Masala', quantity: 2, price: 560.00, timestamp: '19:42', status: 'preparing' },
  { id: 'ORD-102', dishName: 'Butter Naan Basket', quantity: 1, price: 320.00, timestamp: '19:45', status: 'pending' },
  { id: 'ORD-103', dishName: 'Chicken Biryani (Large)', quantity: 1, price: 480.50, timestamp: '19:30', status: 'served' },
  { id: 'ORD-104', dishName: 'Dal Makhani', quantity: 1, price: 350.00, timestamp: '19:50', status: 'pending' },
  { id: 'ORD-105', dishName: 'Masala Dosa', quantity: 3, price: 210.00, timestamp: '19:55', status: 'preparing' },
  { id: 'ORD-106', dishName: 'Gulab Jamun (2pcs)', quantity: 2, price: 120.00, timestamp: '20:05', status: 'served' },
];

type SortKey = 'id' | 'dishName' | 'quantity' | 'price' | 'status';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    dishName: '',
    quantity: 1,
    price: ''
  });

  const handleSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(o => 
      o.dishName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      o.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [orders, searchQuery]);

  const sortedOrders = useMemo(() => {
    if (!sortConfig) return filteredOrders;

    return [...filteredOrders].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredOrders, sortConfig]);

  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newIdNum = orders.length > 0 ? Math.max(...orders.map(o => parseInt(o.id.split('-')[1]))) + 1 : 101;
    
    const newOrder: Order = {
      id: `ORD-${newIdNum}`,
      dishName: formData.dishName,
      quantity: formData.quantity,
      price: parseFloat(formData.price) || 0,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }),
      status: 'preparing'
    };

    setOrders([newOrder, ...orders]);
    setFormData({ dishName: '', quantity: 1, price: '' });
    setIsModalOpen(false);
  };

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return <ArrowUpDown size={14} className="opacity-30 group-hover:opacity-100 transition-opacity" />;
    }
    return sortConfig.direction === 'asc' ? <ArrowUp size={14} className="text-indigo-600" /> : <ArrowDown size={14} className="text-indigo-600" />;
  };

  return (
    <div className="space-y-6 pb-8 animate-fadeIn relative">
      <div className="flex items-center gap-4">
        <div className="flex-1 bg-white/80 backdrop-blur-md border border-white/50 rounded-[20px] px-5 py-3 flex items-center shadow-sm">
          <Filter size={18} className="text-gray-400 mr-3" />
          <input 
            type="text" 
            placeholder="Search orders by ID or dish..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-[15px] font-medium w-full" 
          />
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[32px] overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold">Live Sales Stream</h3>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-tighter">Real-time</span>
          </div>
        </div>

        {/* Localized Header Row with Sorting */}
        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-50 hidden md:flex items-center text-[11px] font-black uppercase tracking-widest text-gray-400 select-none">
          <div className="flex-[2] flex items-center gap-8">
             <button onClick={() => handleSort('dishName')} className="flex items-center gap-1.5 group hover:text-indigo-600 transition-colors ml-14">
               Dish & Item <SortIcon columnKey="dishName" />
             </button>
             <button onClick={() => handleSort('id')} className="flex items-center gap-1.5 group hover:text-indigo-600 transition-colors">
               ID <SortIcon columnKey="id" />
             </button>
          </div>
          <div className="flex-1 flex justify-end gap-16 mr-12">
            <button onClick={() => handleSort('quantity')} className="flex items-center gap-1.5 group hover:text-indigo-600 transition-colors">
              Qty <SortIcon columnKey="quantity" />
            </button>
            <button onClick={() => handleSort('price')} className="flex items-center gap-1.5 group hover:text-indigo-600 transition-colors min-w-[80px] justify-end">
              Sale (₹) <SortIcon columnKey="price" />
            </button>
            <button onClick={() => handleSort('status')} className="flex items-center gap-1.5 group hover:text-indigo-600 transition-colors min-w-[70px] justify-end">
              Status <SortIcon columnKey="status" />
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {sortedOrders.map((order) => (
            <div key={order.id} className="p-6 flex items-center justify-between group hover:bg-gray-50/80 transition-all cursor-pointer">
              <div className="flex items-center gap-5 flex-[2]">
                <div className={`w-14 h-14 rounded-[22px] flex items-center justify-center shrink-0 shadow-sm ${
                  order.status === 'preparing' ? 'bg-orange-500 text-white' :
                  order.status === 'served' ? 'bg-emerald-500 text-white' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {order.status === 'served' ? <CheckCircle size={24} /> : <Clock size={24} />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-extrabold text-[#1C1C1E]">{order.dishName}</h4>
                    <span className="text-[11px] font-bold bg-gray-100 px-2 py-0.5 rounded-md text-gray-500 md:hidden">x{order.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] font-medium text-gray-400">
                    <span>{order.id}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{order.timestamp}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 flex-1 justify-end">
                <div className="hidden md:flex items-center gap-16 mr-6">
                   <p className="text-[15px] font-bold text-gray-600">x{order.quantity}</p>
                   <p className="text-[17px] font-black text-[#1C1C1E] min-w-[80px] text-right">₹{order.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="text-right">
                  <p className="text-[17px] font-black text-[#1C1C1E] md:hidden">₹{order.price.toLocaleString('en-IN')}</p>
                  <p className={`text-[10px] font-black uppercase tracking-widest min-w-[70px] ${
                    order.status === 'preparing' ? 'text-orange-500' :
                    order.status === 'served' ? 'text-emerald-500' : 'text-gray-300'
                  }`}>{order.status}</p>
                </div>
                <div className="bg-gray-100 p-2 rounded-full text-gray-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all shrink-0">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          ))}
          {sortedOrders.length === 0 && (
            <div className="p-20 text-center text-gray-400 font-medium">No sales found matching your search.</div>
          )}
        </div>
      </div>
      
      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-indigo-600 text-white py-5 rounded-[28px] font-black text-lg shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
      >
        <ClipboardList size={22} />
        Log New Sale (POS)
      </button>

      {/* Bharat POS Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fadeIn">
          <div className="absolute inset-0 bg-[#1C1C1E]/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-[40px] w-full max-w-lg p-10 shadow-2xl relative z-10 animate-scaleUp overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-green-600"></div>
            
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black text-[#1C1C1E]">Log New Transaction</h3>
                <p className="text-gray-400 font-medium text-sm">GastroAI Bharat POS Terminal</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddOrder} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-4">Dish Name</label>
                <input 
                  autoFocus required type="text" value={formData.dishName}
                  onChange={(e) => setFormData({...formData, dishName: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-[20px] py-4 px-6 text-[15px] font-semibold focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  placeholder="e.g. Chole Bhature"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-4">Quantity</label>
                  <input required type="number" min="1" value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
                    className="w-full bg-gray-50 border-none rounded-[20px] py-4 px-6 text-[15px] font-semibold focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-4">Price (₹)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-5 flex items-center text-gray-400 pointer-events-none">
                      <IndianRupee size={16} />
                    </div>
                    <input required type="number" step="0.01" value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full bg-gray-50 border-none rounded-[20px] py-4 pl-12 pr-6 text-[15px] font-semibold focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-[22px] font-black text-lg flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-indigo-100">
                  Confirm Sale
                  <Plus size={22} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

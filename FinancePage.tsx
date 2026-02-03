
import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, PieChart, Calendar } from 'lucide-react';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const financeData = [
  { name: 'Mon', revenue: 4000, expenses: 2400, profit: 1600 },
  { name: 'Tue', revenue: 3000, expenses: 1398, profit: 1602 },
  { name: 'Wed', revenue: 2000, expenses: 9800, profit: -7800 },
  { name: 'Thu', revenue: 2780, expenses: 3908, profit: -1128 },
  { name: 'Fri', revenue: 1890, expenses: 4800, profit: -2910 },
  { name: 'Sat', revenue: 2390, expenses: 3800, profit: -1410 },
  { name: 'Sun', revenue: 3490, expenses: 4300, profit: -810 },
].map(d => ({ ...d, profit: d.revenue - d.expenses }));

const FinancePage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Financial Analytics</h2>
          <p className="text-gray-500">Revenue tracking and profit forecasting</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white text-gray-700 border border-gray-200 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-all text-sm">
            <Calendar size={18} />
            Oct 2023 - Nov 2023
          </button>
          <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all text-sm">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FinanceStatCard label="Total Revenue" value="$28,450" change="+8.2%" trend="up" />
        <FinanceStatCard label="Gross Profit" value="$12,120" change="+12.5%" trend="up" />
        <FinanceStatCard label="Operating Expense" value="$16,330" change="-2.1%" trend="down" />
        <FinanceStatCard label="Net Margin" value="42.6%" change="+1.4%" trend="up" />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-bold text-gray-800">Income vs Expenses</h3>
          <div className="flex gap-4">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <span className="text-xs text-gray-500 font-bold">Revenue</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <span className="text-xs text-gray-500 font-bold">Expenses</span>
             </div>
          </div>
        </div>
        
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={financeData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
              />
              <Legend />
              <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={30} />
              <Bar dataKey="expenses" fill="#f87171" radius={[4, 4, 0, 0]} barSize={30} />
              <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
               <PieChart size={18} className="text-indigo-600" />
               Expense Breakdown
            </h4>
            <div className="space-y-4">
               <ExpenseItem label="Food & Beverage" percent={45} amount="$7,348" color="indigo" />
               <ExpenseItem label="Labor & Payroll" percent={30} amount="$4,899" color="blue" />
               <ExpenseItem label="Rent & Utilities" percent={15} amount="$2,449" color="amber" />
               <ExpenseItem label="Marketing" percent={10} amount="$1,633" color="emerald" />
            </div>
         </div>
         
         <div className="bg-indigo-900 p-8 rounded-2xl text-white flex flex-col justify-center">
            <h4 className="text-xl font-bold mb-2">AI-Powered Forecasting</h4>
            <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
               Based on historical data and local seasonal trends, we project a 15% increase in revenue for the upcoming holiday week. Recommended: Increase inventory budget by $1,200.
            </p>
            <div className="bg-white/10 p-4 rounded-xl border border-white/10">
               <p className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-1">Projected Dec Revenue</p>
               <p className="text-3xl font-black">$145,200</p>
            </div>
         </div>
      </div>
    </div>
  );
};

const FinanceStatCard: React.FC<{ label: string, value: string, change: string, trend: 'up' | 'down' }> = ({ label, value, change, trend }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100">
    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">{label}</p>
    <div className="flex items-center justify-between">
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <span className={`text-xs font-bold flex items-center gap-0.5 ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
        {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {change}
      </span>
    </div>
  </div>
);

const ExpenseItem: React.FC<{ label: string, percent: number, amount: string, color: string }> = ({ label, percent, amount, color }) => (
  <div>
    <div className="flex justify-between items-center mb-1 text-sm font-medium">
      <span className="text-gray-600">{label}</span>
      <span className="text-gray-900 font-bold">{amount}</span>
    </div>
    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
      <div className={`bg-${color}-500 h-full rounded-full`} style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);

export default FinancePage;

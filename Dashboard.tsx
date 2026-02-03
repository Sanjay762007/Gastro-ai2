
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp as TrendingIcon, 
  ShoppingBag, 
  IndianRupee, 
  Zap, 
  Target,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';
import { getSmartInsights } from '../geminiService';

const DATA_SETS: Record<string, any[]> = {
  today: [
    { label: '9 AM', sales: 4000 },
    { label: '11 AM', sales: 12000 },
    { label: '1 PM', sales: 45000 },
    { label: '3 PM', sales: 18000 },
    { label: '5 PM', sales: 22000 },
    { label: '7 PM', sales: 85000 },
    { label: '9 PM', sales: 62000 },
  ],
  week: [
    { label: 'Mon', sales: 240000 },
    { label: 'Tue', sales: 190000 },
    { label: 'Wed', sales: 310000 },
    { label: 'Thu', sales: 280000 },
    { label: 'Fri', sales: 520000 },
    { label: 'Sat', sales: 680000 },
    { label: 'Sun', sales: 620000 },
  ],
  month: [
    { label: 'Week 1', sales: 1200000 },
    { label: 'Week 2', sales: 950000 },
    { label: 'Week 3', sales: 1600000 },
    { label: 'Week 4', sales: 1800000 },
    { label: 'Week 5', sales: 1400000 },
    { label: 'Week 6', sales: 2100000 },
  ],
  year: [
    { label: 'Jan', sales: 4500000 },
    { label: 'Feb', sales: 4800000 },
    { label: 'Mar', sales: 5200000 },
    { label: 'Apr', sales: 6100000 },
    { label: 'May', sales: 5900000 },
    { label: 'Jun', sales: 7200000 },
    { label: 'Jul', sales: 6800000 },
    { label: 'Aug', sales: 7500000 },
    { label: 'Sep', sales: 8100000 },
    { label: 'Oct', sales: 8900000 },
    { label: 'Nov', sales: 9500000 },
    { label: 'Dec', sales: 12000000 },
  ]
};

interface Insight {
  title: string;
  description: string;
  impact: string;
}

const Dashboard: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [timeframe, setTimeframe] = useState('today');

  useEffect(() => {
    const fetchInsights = async () => {
      const dataString = "Sales are up 15% in the Mumbai region. AOV is ₹1,450. Top dish: Paneer Tikka Platter.";
      const aiInsights = await getSmartInsights(dataString);
      setInsights(aiInsights);
      setLoadingInsights(false);
    };
    fetchInsights();
  }, []);

  return (
    <div className="space-y-6 pb-8 animate-fadeIn">
      {/* Stats Section - ₹ Localized Widgets */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Widget 
          label="Total Revenue" 
          value="₹4.8L" 
          sub="+15%" 
          trend="up" 
          icon={<IndianRupee size={18} />} 
          color="bg-emerald-500" 
        />
        <Widget 
          label="Orders Today" 
          value="248" 
          sub="+12%" 
          trend="up" 
          icon={<ShoppingBag size={18} />} 
          color="bg-indigo-500" 
        />
        <Widget 
          label="Avg Ticket" 
          value="₹1,250" 
          sub="+8%" 
          trend="up" 
          icon={<Target size={18} />} 
          color="bg-orange-500" 
        />
        <Widget 
          label="Peak Period" 
          value="8-10 PM" 
          sub="Dinner" 
          trend="up" 
          icon={<Zap size={18} />} 
          color="bg-purple-500" 
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Revenue Velocity Card */}
        <div className="lg:col-span-8 bg-white/80 backdrop-blur-xl border border-white/50 rounded-[32px] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">Revenue Velocity</h3>
            <div className="flex gap-1 bg-gray-100 p-1 rounded-full">
              {['today', 'week', 'month', 'year'].map((t) => (
                <button 
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`text-[11px] font-bold px-4 py-1.5 rounded-full transition-all capitalize ${
                    timeframe === t ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:bg-white/50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA_SETS[timeframe]}>
                <defs>
                  <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="label" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis hide />
                <Tooltip 
                  formatter={(value) => [`₹${(value as number).toLocaleString('en-IN')}`, 'Revenue']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    borderRadius: '20px', 
                    border: 'none',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
                    backdropFilter: 'blur(10px)'
                  }} 
                />
                <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={4} fill="url(#velocityGradient)" animationDuration={1000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#1C1C1E] rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6 text-indigo-400">
                <Sparkles size={18} />
                <h3 className="text-lg font-bold tracking-tight text-white">Smart Insights</h3>
              </div>

              {loadingInsights ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse"></div>)}
                </div>
              ) : (
                <div className="space-y-4">
                  {insights.map((insight, idx) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-[24px] border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-bold">{insight.title}</span>
                        <ChevronRight size={14} className="text-gray-500 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-[12px] text-gray-400 leading-snug">{insight.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/20 blur-[80px] rounded-full"></div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[32px] p-6 shadow-sm flex-1">
            <h3 className="text-md font-bold mb-4 flex items-center gap-2 text-indigo-600">
              <TrendingIcon size={18} />
              Recent Trends
            </h3>
            <div className="space-y-4">
              <AlertItem label="Hot Seller" desc="Paneer Tikka (+35%)" color="text-emerald-500" />
              <AlertItem label="Upsell Tip" desc="Add Lassi to combis" color="text-orange-500" />
              <AlertItem label="Next Peak" desc="Sunday Family Brunch" color="text-indigo-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Widget: React.FC<{ label: string, value: string, sub: string, trend: 'up' | 'down', icon: React.ReactNode, color: string }> = ({ label, value, sub, trend, icon, color }) => (
  <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-6 rounded-[32px] shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-default">
    <div className={`w-10 h-10 ${color} text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-gray-200/50`}>
      {icon}
    </div>
    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <div className="flex items-end gap-2">
      <h4 className="text-2xl font-black">{value}</h4>
      <span className={`text-[12px] font-bold mb-1 ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
        {sub}
      </span>
    </div>
  </div>
);

const AlertItem: React.FC<{ label: string, desc: string, color: string }> = ({ label, desc, color }) => (
  <div className="flex items-center justify-between group cursor-pointer">
    <div>
      <p className={`text-[12px] font-bold uppercase tracking-tighter ${color}`}>{label}</p>
      <p className="text-[13px] font-medium text-gray-600">{desc}</p>
    </div>
    <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
  </div>
);

export default Dashboard;


import React from 'react';
import { Users, Award, ShieldCheck, Clock, Zap, Star } from 'lucide-react';
import { Staff } from '../types';

const STAFF_MEMBERS: Staff[] = [
  { id: 'S1', name: 'Maria Garcia', role: 'Head Chef', shift: 'Morning', efficiency: 98, tasksCompleted: 420 },
  { id: 'S2', name: 'Robert Smith', role: 'Server', shift: 'Evening', efficiency: 85, tasksCompleted: 215 },
  { id: 'S3', name: 'Sarah Jones', role: 'Sous Chef', shift: 'Morning', efficiency: 92, tasksCompleted: 340 },
  { id: 'S4', name: 'Kevin Lee', role: 'Bartender', shift: 'Evening', efficiency: 89, tasksCompleted: 180 },
];

const StaffPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Staff Performance</h2>
          <p className="text-gray-500">Optimize scheduling and efficiency</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
          <Clock size={18} />
          Optimize Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StaffMetricCard icon={<Users className="text-blue-600" />} label="Active Staff" value="12" sub="Currently on floor" />
          <StaffMetricCard icon={<Award className="text-amber-600" />} label="Avg. Efficiency" value="88%" sub="+2% from last week" />
          <StaffMetricCard icon={<ShieldCheck className="text-emerald-600" />} label="Compliance" value="100%" sub="Health & Safety" />
        </div>
        <div className="bg-indigo-600 p-6 rounded-2xl text-white">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={20} className="text-amber-400" />
            <h4 className="font-bold">AI Insight</h4>
          </div>
          <p className="text-xs text-indigo-100 leading-relaxed">
            Prediction: Increased traffic expected Friday 7-9 PM. Suggest adding +1 server to shift.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-800">Team Directory</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-y divide-gray-100">
          {STAFF_MEMBERS.map((staff) => (
            <div key={staff.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <img src={`https://picsum.photos/seed/${staff.id}/80/80`} className="w-16 h-16 rounded-2xl object-cover shadow-sm" alt={staff.name} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">{staff.name}</h4>
                      <p className="text-xs text-indigo-600 font-semibold uppercase">{staff.role}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded text-amber-600">
                      <Star size={12} fill="currentColor" />
                      <span className="text-[10px] font-bold">Top performer</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Efficiency</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 h-1 rounded-full">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${staff.efficiency}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-gray-700">{staff.efficiency}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Tasks</p>
                      <p className="text-xs font-bold text-gray-700">{staff.tasksCompleted} items</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StaffMetricCard: React.FC<{ icon: React.ReactNode, label: string, value: string, sub: string }> = ({ icon, label, value, sub }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100">
    <div className="p-2.5 bg-gray-50 rounded-lg w-fit mb-4">{icon}</div>
    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{label}</p>
    <div className="flex items-baseline gap-2">
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <span className="text-[10px] font-medium text-gray-400">{sub}</span>
    </div>
  </div>
);

export default StaffPage;

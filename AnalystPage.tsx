
import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  TrendingUp, 
  Target, 
  IndianRupee, 
  Zap, 
  Sparkles, 
  ChevronRight,
  Loader2,
  FileText
} from 'lucide-react';
import { getExecutiveReport } from '../geminiService';

interface ExecutiveReport {
  greeting: string;
  summary: string;
  pillars: { label: string; strategy: string }[];
  quarterlyPrediction: string;
}

const AnalystPage: React.FC = () => {
  const [report, setReport] = useState<ExecutiveReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      const mockData = "Total Sales ₹18.4 Lakhs, AOV ₹1,250, Repeat Ratio 32%, Festive Growth +24%.";
      const data = await getExecutiveReport(mockData);
      setReport(data);
      setIsLoading(false);
    };
    fetchReport();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Agent Gastro is building your strategy...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-fadeIn max-w-5xl mx-auto">
      <section className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[40px] shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-[#1C1C1E] to-indigo-900 flex items-center justify-center text-white shadow-2xl">
            <BrainCircuit size={40} />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white"></div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-black text-[#1C1C1E] mb-2">{report?.greeting || "Greetings, Strategic Lead."}</h2>
          <p className="text-gray-500 text-[15px] leading-relaxed max-w-2xl">
            {report?.summary || "Revenue trends across the Bharat market are indicating strong growth. Here are the 3 pillars for your next quarter."}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {report?.pillars.map((pillar, idx) => (
          <div key={idx} className="bg-[#1C1C1E] p-8 rounded-[32px] text-white shadow-xl hover:scale-[1.02] transition-all cursor-default relative overflow-hidden group">
            <div className="relative z-10">
              <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform">
                {idx === 0 ? <TrendingUp size={24} /> : idx === 1 ? <Target size={24} /> : <Zap size={24} />}
              </div>
              <h3 className="text-lg font-bold mb-3">{pillar.label}</h3>
              <p className="text-[13px] text-gray-400 leading-relaxed">{pillar.strategy}</p>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/10 blur-3xl"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[40px] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <IndianRupee size={20} className="text-indigo-600" />
              Growth Matrix
            </h3>
            <span className="text-[11px] font-bold bg-gray-100 px-3 py-1 rounded-full text-gray-500 uppercase tracking-tighter">Live Audit</span>
          </div>
          <div className="space-y-6">
            <EfficiencyMetric label="Avg Order Value (AOV)" value={94} color="bg-indigo-600" />
            <EfficiencyMetric label="New User Conversion" value={72} color="bg-indigo-500" />
            <EfficiencyMetric label="Festive Margin Optimization" value={86} color="bg-emerald-500" />
            <EfficiencyMetric label="Operational Efficiency" value={81} color="bg-orange-500" />
          </div>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-[40px] text-white shadow-2xl flex flex-col justify-center relative overflow-hidden">
          <Sparkles className="absolute top-8 right-8 text-indigo-200/40" size={32} />
          <h3 className="text-xl font-black mb-4 flex items-center gap-2">Quarterly Outlook</h3>
          <p className="text-[15px] text-indigo-50/80 leading-relaxed mb-8 italic">
            "{report?.quarterlyPrediction || "Expecting a surge in high-ticket catering orders this wedding season. Scaling logistics now is critical."}"
          </p>
          <button className="bg-white text-indigo-600 w-full py-4 rounded-[22px] font-black text-[15px] shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-all">
            <FileText size={18} /> Export Full Strategy
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const EfficiencyMetric: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="group cursor-default">
    <div className="flex justify-between items-center mb-2">
      <span className="text-[14px] font-bold text-gray-600 group-hover:text-[#1C1C1E] transition-colors">{label}</span>
      <span className="text-[14px] font-black">{value}%</span>
    </div>
    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
      <div className={`${color} h-full rounded-full transition-all duration-1000 ease-out`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

export default AnalystPage;

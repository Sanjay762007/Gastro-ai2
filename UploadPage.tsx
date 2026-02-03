
import React, { useState, useRef } from 'react';
import { 
  CloudUpload, 
  FileText, 
  Database, 
  Link, 
  CheckCircle, 
  Loader2, 
  ChevronRight,
  ShieldCheck,
  Zap,
  BrainCircuit,
  ArrowRight,
  History,
  Info
} from 'lucide-react';

interface UploadPageProps {
  onSyncComplete: () => void;
}

const RECENT_UPLOADS = [
  { id: '1', name: 'Q3_Sales_Report.csv', type: 'Sales Data', size: '12.4 MB', date: 'Oct 24, 2023', status: 'Completed' },
  { id: '2', name: 'Inventory_Audit_Oct.xlsx', type: 'Stock Logs', size: '4.1 MB', date: 'Oct 22, 2023', status: 'Completed' },
  { id: '3', name: 'Labor_Costs_Weekly.json', type: 'Staff Data', size: '0.8 MB', date: 'Oct 19, 2023', status: 'Archived' },
];

const UploadPage: React.FC<UploadPageProps> = ({ onSyncComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'uploading' | 'processing' | 'success'>('idle');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateSync = () => {
    setSyncStatus('uploading');
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setSyncStatus('processing');
        // AI analysis simulation
        setTimeout(() => {
          setSyncStatus('success');
        }, 2500);
      }
    }, 200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      simulateSync();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12">
      <section className="bg-white/80 backdrop-blur-xl border border-white rounded-[40px] p-10 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl font-black text-[#1C1C1E] mb-2 tracking-tight">Secure Data Upload</h2>
              <p className="text-gray-500 text-[15px] font-medium leading-relaxed max-w-md">
                Ingest your latest business metrics. GastroAI analyzes raw data to predict demand and optimize your margins.
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[12px] font-bold">
                <ShieldCheck size={16} />
                AES-256 Encrypted
              </div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mr-2">Ready for Processing</span>
            </div>
          </div>

          {syncStatus === 'idle' ? (
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                group relative border-2 border-dashed rounded-[48px] p-20 flex flex-col items-center justify-center transition-all duration-500 cursor-pointer
                ${isDragging ? 'bg-blue-50/50 border-blue-500 scale-[0.99]' : 'bg-gray-50/50 border-gray-200 hover:bg-white hover:border-blue-400'}
              `}
            >
              <input type="file" ref={fileInputRef} className="hidden" onChange={simulateSync} />
              
              <div className="w-24 h-24 rounded-[32px] bg-white shadow-xl flex items-center justify-center text-blue-600 mb-8 transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500">
                <CloudUpload size={40} />
              </div>
              
              <h3 className="text-xl font-bold text-[#1C1C1E] mb-2">Drop data files here</h3>
              <p className="text-gray-400 text-[14px] font-medium mb-6">Drag your sales, stock, or labor reports</p>
              
              <div className="flex gap-3">
                <div className="bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2 text-gray-600 font-bold text-xs group-hover:text-blue-600 transition-colors">
                  <FileText size={16} />
                  Choose Files
                </div>
              </div>
              
              <div className="absolute bottom-10 flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/80 backdrop-blur p-3 rounded-2xl shadow-sm border border-white/50 flex items-center gap-2">
                  <FileText size={16} className="text-orange-500" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Sales.csv</span>
                </div>
                <div className="bg-white/80 backdrop-blur p-3 rounded-2xl shadow-sm border border-white/50 flex items-center gap-2">
                  <Database size={16} className="text-indigo-500" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Stock.xlsx</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="min-h-[350px] flex flex-col items-center justify-center">
              {syncStatus === 'uploading' && (
                <div className="w-full max-w-sm space-y-6 text-center animate-fadeIn">
                  <div className="relative w-20 h-20 mx-auto">
                    <Loader2 className="w-20 h-20 text-blue-600 animate-spin" strokeWidth={1} />
                    <CloudUpload className="absolute inset-0 m-auto text-blue-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-black">Uploading your data...</h3>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full transition-all duration-300 rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>
                  <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">{progress}% Complete</p>
                </div>
              )}

              {syncStatus === 'processing' && (
                <div className="flex flex-col items-center space-y-8 animate-pulse">
                  <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-[#1C1C1E] to-blue-900 flex items-center justify-center text-white shadow-2xl">
                    <BrainCircuit size={44} className="animate-bounce" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-black mb-2">GastroAI Analysis</h3>
                    <p className="text-gray-500 font-medium">Extracting strategic insights from your dataset...</p>
                  </div>
                </div>
              )}

              {syncStatus === 'success' && (
                <div className="flex flex-col items-center space-y-8 animate-fadeIn text-center">
                  <div className="w-24 h-24 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-100">
                    <CheckCircle size={48} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black mb-2">Upload Successful</h3>
                    <p className="text-gray-500 font-medium mb-8">Business data ingested. Your analyst is ready to report.</p>
                    <button 
                      onClick={onSyncComplete}
                      className="bg-[#1C1C1E] text-white px-8 py-5 rounded-[24px] font-black text-lg flex items-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all"
                    >
                      Consult Agent Gastro
                      <ArrowRight size={22} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-100/50 blur-[120px] rounded-full"></div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* History Section */}
        <div className="lg:col-span-8 bg-white/80 backdrop-blur-xl border border-white rounded-[32px] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <History size={20} className="text-gray-400" />
              Recent History
            </h3>
            <button className="text-blue-600 text-xs font-bold uppercase tracking-widest hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            {RECENT_UPLOADS.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-[#1C1C1E]">{file.name}</p>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 font-bold uppercase tracking-tighter">
                      <span>{file.type}</span>
                      <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                      <span>{file.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[12px] font-bold text-gray-600">{file.date}</p>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{file.status}</p>
                  </div>
                  <button className="p-2 rounded-full text-gray-300 group-hover:text-blue-600 transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#1C1C1E] p-8 rounded-[32px] text-white shadow-xl flex flex-col justify-center relative overflow-hidden">
            <Zap size={32} className="text-amber-400 mb-6" />
            <h3 className="text-xl font-bold mb-3 tracking-tight">Real-time Webhooks</h3>
            <p className="text-gray-400 text-[13px] leading-relaxed mb-6">
              Skip manual uploads. Connect your POS for live data streaming directly to the analyst.
            </p>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
               <span className="text-[12px] font-bold">Auto-Sync State</span>
               <div className="w-10 h-5 bg-blue-600 rounded-full flex items-center px-1">
                  <div className="w-3.5 h-3.5 bg-white rounded-full ml-auto shadow-sm"></div>
               </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[32px] p-8 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Link size={18} className="text-blue-600" />
              POS Partners
            </h3>
            <div className="space-y-4">
              <IntegrationItem name="Square" status="Syncing" icon="https://upload.wikimedia.org/wikipedia/commons/3/33/Square_app_logo.png" active />
              <IntegrationItem name="Clover" status="Connect" icon="https://upload.wikimedia.org/wikipedia/commons/3/3d/Clover_logo.svg" />
              <IntegrationItem name="Toast" status="Connect" icon="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Toast_logo.svg/1024px-Toast_logo.svg.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IntegrationItem: React.FC<{ name: string, status: string, icon: string, active?: boolean }> = ({ name, status, icon, active }) => (
  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all cursor-pointer group">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-50 rounded-lg p-2 flex items-center justify-center border border-gray-100">
        <img src={icon} alt={name} className="w-full h-full object-contain" />
      </div>
      <p className="text-[14px] font-bold">{name}</p>
    </div>
    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-300'}`}>
      {status}
    </span>
  </div>
);

export default UploadPage;

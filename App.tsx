
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Utensils, 
  ClipboardList, 
  ShieldCheck,
  Lock,
  ArrowRight,
  BrainCircuit,
  CloudUpload,
  Search,
  Bell,
  Settings
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import OrdersPage from './pages/OrdersPage';
import AnalystPage from './pages/AnalystPage';
import UploadPage from './pages/UploadPage';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'analyst', label: 'Analytics', icon: BrainCircuit },
    { id: 'upload', label: 'Upload', icon: CloudUpload },
    { id: 'orders', label: 'Sales', icon: ClipboardList },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsAuthenticating(false);
    }, 1200);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center p-6 selection:bg-indigo-100 font-sans">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-3xl border border-white rounded-[40px] shadow-2xl overflow-hidden p-10 relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-green-600"></div>
          
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="bg-indigo-600 w-16 h-16 rounded-[22px] flex items-center justify-center text-white shadow-xl shadow-indigo-100 mb-6">
              <Utensils size={32} />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-[#1C1C1E]">GastroAI India</h1>
            <p className="text-gray-400 text-sm font-medium mt-1">Smart Sales Intelligence</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-4">Access Code</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-5 flex items-center text-gray-400 pointer-events-none">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  defaultValue="••••••••"
                  className="w-full bg-gray-100/50 border-none rounded-[20px] py-4 pl-12 pr-6 text-[15px] font-semibold focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  placeholder="Enter secret key"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isAuthenticating}
              className="w-full bg-[#1C1C1E] text-white py-4 rounded-[22px] font-black text-lg flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-gray-200 disabled:opacity-50"
            >
              {isAuthenticating ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Secure Login
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-[12px] text-gray-400 font-medium">
            Bharat Enterprise v2.5
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard setActiveTab={setActiveTab} />;
      case 'analyst': return <AnalystPage />;
      case 'upload': return <UploadPage onSyncComplete={() => setActiveTab('analyst')} />;
      case 'orders': return <OrdersPage />;
      default: return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F2F2F7] text-[#1C1C1E] selection:bg-indigo-100 pb-24 lg:pb-0 font-sans">
      <aside className="hidden lg:flex w-72 flex-col p-6 sticky top-0 h-screen">
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[32px] h-full flex flex-col shadow-sm">
          <div className="p-8 pb-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-indigo-600 w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <Utensils size={20} />
              </div>
              <h1 className="text-xl font-bold tracking-tight">GastroAI</h1>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200
                    ${activeTab === item.id 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}
                  `}
                >
                  <item.icon size={20} className={activeTab === item.id ? 'text-white' : ''} />
                  <span className="text-[15px] font-semibold">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-6 border-t border-gray-50">
            <div className="bg-gray-50 rounded-[24px] p-4 flex items-center gap-3">
              <img src="https://picsum.photos/seed/admin/80/80" className="w-10 h-10 rounded-full border border-white shadow-sm" alt="User" />
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate">Rajesh Kumar</p>
                <p className="text-[11px] text-gray-400 font-medium">Regional Sales Head</p>
              </div>
              <Settings size={18} className="text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 lg:p-6">
        <header className="sticky top-0 z-30 bg-[#F2F2F7]/80 backdrop-blur-md px-6 py-6 flex items-center justify-between lg:static lg:bg-transparent lg:backdrop-blur-none lg:px-4 lg:pt-2 lg:pb-6">
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">{new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              {menuItems.find(i => i.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white p-3 rounded-full shadow-sm border border-white/50 text-gray-500 hover:bg-gray-50 active:scale-95 transition-all">
              <Search size={20} />
            </button>
            <button className="bg-white p-3 rounded-full shadow-sm border border-white/50 text-gray-500 relative hover:bg-gray-50 active:scale-95 transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="bg-red-50 text-red-600 p-3 rounded-full shadow-sm border border-red-100 hover:bg-red-100 active:scale-95 transition-all"
            >
              <ShieldCheck size={20} />
            </button>
          </div>
        </header>

        <div className="px-6 lg:px-4">
          {renderContent()}
        </div>
      </main>

      <nav className="lg:hidden fixed bottom-6 left-6 right-6 z-50 bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[32px] shadow-2xl flex items-center justify-around py-3 px-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 min-w-[64px] transition-all duration-300 ${activeTab === item.id ? 'text-indigo-600 scale-110' : 'text-gray-400'}`}
          >
            <div className={`p-1.5 rounded-xl ${activeTab === item.id ? 'bg-indigo-50' : 'bg-transparent'}`}>
              <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-bold tracking-tight uppercase">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;

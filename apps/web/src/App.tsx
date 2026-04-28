import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, AlertCircle, TrendingUp, Settings, FileText, PieChart } from 'lucide-react';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
        {/* Sidebar Navigation */}
        <aside className="w-72 bg-slate-900/50 backdrop-blur-2xl border-r border-slate-800 flex flex-col p-6 fixed h-full">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-900/20">FC</div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">FinOps Core</span>
          </div>

          <nav className="flex-1 space-y-2">
            <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Overview" active />
            <NavItem to="/anomalies" icon={<AlertCircle size={20} />} label="Anomalies" />
            <NavItem to="/forecast" icon={<TrendingUp size={20} />} label="Forecasting" />
            <NavItem to="/recommendations" icon={<PieChart size={20} />} label="Optimization" />
            <NavItem to="/reports" icon={<FileText size={20} />} label="Executive Reports" />
          </nav>

          <div className="pt-6 border-t border-slate-800">
            <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-72">
          <header className="h-16 border-b border-slate-800 flex items-center justify-end px-8 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">FinOps Lead</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Global Operations</p>
              </div>
              <div className="w-10 h-10 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center font-bold text-slate-300">FL</div>
            </div>
          </header>

          <div className="p-10">
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
};

const NavItem = ({ to, icon, label, active }: any) => (
  <Link 
    to={to} 
    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${active ? 'bg-emerald-600/10 text-emerald-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
  >
    <span className={`${active ? 'text-emerald-400' : 'group-hover:text-white transition'}`}>{icon}</span>
    <span className="font-medium">{label}</span>
  </Link>
);

export default App;

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle, CreditCard, Layers } from 'lucide-react';

const data = [
  { name: 'Mon', spend: 4000 },
  { name: 'Tue', spend: 3000 },
  { name: 'Wed', spend: 2000 },
  { name: 'Thu', spend: 2780 },
  { name: 'Fri', spend: 1890 },
  { name: 'Sat', spend: 2390 },
  { name: 'Sun', spend: 8490 }, // Spike
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">FinOps Intelligence</h1>
          <p className="text-slate-400 mt-2 text-lg">Real-time spend anomaly detection across multi-cloud environments.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-slate-900 border border-slate-800 text-slate-300 px-6 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition">View Logs</button>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-medium transition shadow-lg shadow-emerald-900/40">Refresh Data</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Monthly Spend" value="$142.5k" change="+12%" icon={<CreditCard className="text-emerald-400" />} />
        <StatCard title="Active Anomalies" value="4" change="+2" icon={<AlertTriangle className="text-rose-400" />} />
        <StatCard title="Forecasted Overrun" value="$12.4k" change="+5%" icon={<TrendingUp className="text-yellow-400" />} />
        <StatCard title="Tagging Compliance" value="82%" change="+5%" icon={<Layers className="text-sky-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-200">
            <span className="w-2 h-6 bg-emerald-600 rounded-full"></span>
            Cross-Cloud Spend Baseline
          </h2>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area type="monotone" dataKey="spend" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-200">
            <span className="w-2 h-6 bg-rose-600 rounded-full"></span>
            Recent Anomalies
          </h2>
          <div className="space-y-4">
            <AnomalyItem cloud="Azure" service="Virtual Machines" amount="$1,250" severity="High" />
            <AnomalyItem cloud="AWS" service="Lambda" amount="$450" severity="Medium" />
            <AnomalyItem cloud="GCP" service="BigQuery" amount="$890" severity="High" />
          </div>
          <button className="w-full mt-10 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl text-sm font-bold transition">View All Anomalies</button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon }: any) => (
  <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl shadow-xl hover:border-emerald-500/30 transition group">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-slate-950 rounded-2xl group-hover:scale-110 transition">{icon}</div>
      <div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{title}</p>
        <div className="flex items-end gap-3 mt-1">
          <p className="text-2xl font-bold text-white">{value}</p>
          <span className={`text-[10px] font-bold pb-1 ${change.startsWith('-') ? 'text-emerald-400' : 'text-rose-400'}`}>{change}</span>
        </div>
      </div>
    </div>
  </div>
);

const AnomalyItem = ({ cloud, service, amount, severity }: any) => (
  <div className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800 rounded-2xl hover:bg-slate-800 transition cursor-pointer">
    <div>
      <p className="text-sm font-bold text-slate-200">{service}</p>
      <p className="text-xs text-slate-500">{cloud}</p>
    </div>
    <div className="text-right">
      <p className="text-sm font-bold text-rose-400">{amount}</p>
      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${severity === 'High' ? 'bg-rose-500/20 text-rose-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
        {severity}
      </span>
    </div>
  </div>
);

export default Dashboard;

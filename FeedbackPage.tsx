
import React, { useState, useEffect } from 'react';
import { MessageSquare, Star, ThumbsUp, ThumbsDown, User, Search, Filter, Sparkles, Loader2, TrendingUp } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { analyzeFeedback } from '../geminiService';
import { Feedback } from '../types';

const INITIAL_FEEDBACK: Feedback[] = [
  { id: '1', customerName: 'Emily Watson', comment: 'The risotto was incredible, but the service was a bit slow today. Overall a great experience.', rating: 4 },
  { id: '2', customerName: 'James Chen', comment: 'Table was sticky and the waiter forgot our drinks twice. Will not be coming back soon.', rating: 2 },
  { id: '3', customerName: 'Sarah Miller', comment: 'Absolutely loved the atmosphere and the wine selection. Perfect for our anniversary!', rating: 5 },
  { id: '4', customerName: 'Michael Brown', comment: 'Food was decent but overpriced for what you get. Probably middle of the pack.', rating: 3 },
];

const sentimentTrendData = [
  { day: 'Mon', positive: 12, neutral: 4, negative: 2 },
  { day: 'Tue', positive: 15, neutral: 6, negative: 3 },
  { day: 'Wed', positive: 10, neutral: 10, negative: 5 },
  { day: 'Thu', positive: 22, neutral: 5, negative: 1 },
  { day: 'Fri', positive: 28, neutral: 8, negative: 4 },
  { day: 'Sat', positive: 35, neutral: 12, negative: 6 },
  { day: 'Sun', positive: 26, neutral: 7, negative: 2 },
];

const FeedbackPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(INITIAL_FEEDBACK);
  const [analyzingIds, setAnalyzingIds] = useState<Set<string>>(new Set());

  const runSentimentAnalysis = async (id: string) => {
    const feedback = feedbacks.find(f => f.id === id);
    if (!feedback || feedback.sentiment) return;

    setAnalyzingIds(prev => new Set(prev).add(id));
    
    const analysis = await analyzeFeedback(feedback.comment);
    
    setFeedbacks(prev => prev.map(f => 
      f.id === id ? { ...f, ...analysis } : f
    ));
    
    setAnalyzingIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const runBatchAnalysis = async () => {
    const unanalyzed = feedbacks.filter(f => !f.sentiment);
    for (const f of unanalyzed) {
      await runSentimentAnalysis(f.id);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Customer Feedback</h2>
          <p className="text-gray-500">Real-time sentiment and satisfaction monitoring</p>
        </div>
        <button 
          onClick={runBatchAnalysis}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
        >
          <Sparkles size={18} />
          AI Batch Analyze
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SentimentStat label="Positive Reviews" value="78%" color="emerald" icon={<ThumbsUp size={20} />} />
        <SentimentStat label="Average Rating" value="4.2/5" color="indigo" icon={<Star size={20} />} />
        <SentimentStat label="Negative Trends" value="12%" color="red" icon={<ThumbsDown size={20} />} />
      </div>

      {/* Sentiment Trend Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp size={18} className="text-indigo-600" />
              Sentiment Analysis Trend
            </h3>
            <p className="text-xs text-gray-400">Feedback distribution over the last 7 days</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] font-bold text-gray-500 uppercase">Positive</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-400"></div>
              <span className="text-[10px] font-bold text-gray-500 uppercase">Neutral</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
              <span className="text-[10px] font-bold text-gray-500 uppercase">Negative</span>
            </div>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sentimentTrendData}>
              <defs>
                <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNeu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNeg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px' }} 
              />
              <Area type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPos)" />
              <Area type="monotone" dataKey="neutral" stroke="#818cf8" strokeWidth={2} fillOpacity={1} fill="url(#colorNeu)" />
              <Area type="monotone" dataKey="negative" stroke="#f87171" strokeWidth={2} fillOpacity={1} fill="url(#colorNeg)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="flex items-center bg-gray-50 px-4 py-2 rounded-xl flex-1 max-w-md">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Filter reviews..." className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full" />
          </div>
          <button className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 transition-colors">
            <Filter size={18} />
            Filters
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {feedbacks.map((f) => (
            <div key={f.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 shrink-0">
                    <User size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-gray-900">{f.customerName}</h4>
                      <div className="flex gap-0.5 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} fill={i < f.rating ? "currentColor" : "none"} strokeWidth={2} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm italic mb-4">"{f.comment}"</p>
                    
                    {f.sentiment ? (
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                        f.sentiment === 'positive' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        f.sentiment === 'negative' ? 'bg-red-50 text-red-700 border-red-100' :
                        'bg-gray-50 text-gray-700 border-gray-100'
                      }`}>
                        <Sparkles size={14} />
                        <span className="text-xs font-bold uppercase tracking-tight">{f.sentiment}</span>
                        <span className="text-xs font-medium text-gray-500 border-l border-gray-200 pl-2 ml-1">
                          AI: {f.analysis}
                        </span>
                      </div>
                    ) : (
                      <button 
                        onClick={() => runSentimentAnalysis(f.id)}
                        disabled={analyzingIds.has(f.id)}
                        className="text-indigo-600 text-xs font-bold flex items-center gap-1.5 hover:underline disabled:opacity-50"
                      >
                        {analyzingIds.has(f.id) ? <Loader2 className="animate-spin" size={14} /> : <Sparkles size={14} />}
                        Analyze Sentiment
                      </button>
                    )}
                  </div>
                </div>
                <div className="text-xs text-gray-400 whitespace-nowrap">2 hours ago</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SentimentStat: React.FC<{ label: string, value: string, color: string, icon: React.ReactNode }> = ({ label, value, color, icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
    <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default FeedbackPage;

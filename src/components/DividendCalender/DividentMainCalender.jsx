import { ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../common/Card';

const DividentMainCalender = ({ monthName, year, days, firstDay, currentDate, activeFilter, dividendData, getIsoDate, changeMonth }) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-8 px-2">
        <h2 className="text-2xl font-black tracking-tighter uppercase text-white">
          {monthName} <span className="text-accent-cyan">{year}</span>
        </h2>
        <div className="flex gap-2">
          <button onClick={() => changeMonth(-1)} className="p-2 bg-primary-mid/60 hover:bg-primary-mid/80 rounded-lg border border-white/10 transition-all text-slate-400 hover:text-accent-cyan">
            <ChevronLeft size={20}/>
          </button>
          
          <button onClick={() => changeMonth(1)} className="p-2 bg-primary-mid/60 hover:bg-primary-mid/80 rounded-lg border border-white/10 transition-all text-slate-400 hover:text-accent-cyan">
            <ChevronRight size={20}/>
          </button>
        </div>
      </div>

      {/* Day Titles */}
      <div className="grid grid-cols-7 gap-3 mb-4 text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
      </div>

      {/* Day Grid */}
      <div className="grid grid-cols-7 gap-3">
        {/* Padding for start of month */}
        {Array(firstDay).fill(null).map((_, i) => (
          <div key={`pad-${i}`} className="h-32 bg-primary-mid/30 rounded-2xl border border-white/10"></div>
        ))}

        {/* Active Days */}
        {days.map(day => {
          const dateStr = `${year}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

          const annItems = activeFilter === "Announcement" ? dividendData.filter(d => getIsoDate(d.dateOfAnnouncement) === dateStr) : [];
          const xdItems = (activeFilter === "XD" || activeFilter === "XD or Payment") ? dividendData.filter(d => getIsoDate(d.xd) === dateStr) : [];
          const payItems = (activeFilter === "Payment" || activeFilter === "XD or Payment") ? dividendData.filter(d => getIsoDate(d.payment) === dateStr) : [];

          return (
            <div key={day} className="h-32 bg-primary-mid/60 hover:bg-primary-mid/80 rounded-2xl p-3 border border-white/10 hover:border-accent-cyan/40 transition-all group relative overflow-hidden">
              <span className="text-xs font-black text-accent-cyan transition-colors">{day}</span>

              <div className="mt-2 space-y-1.5">
                {annItems.map((item, i) => (
                  <div key={i} className="text-[9px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-md flex justify-between">
                    <span className="truncate">{item.symbol.split('.')[0]}</span>
                    <span className="opacity-70">ANN</span>
                  </div>
                ))}
                {xdItems.map((item, i) => (
                  <div key={i} className="text-[9px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-md flex justify-between">
                    <span className="truncate">{item.symbol.split('.')[0]}</span>
                    <span className="opacity-70">XD</span>
                  </div>
                ))}
                {payItems.map((item, i) => (
                  <div key={i} className="text-[9px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-md flex justify-between">
                    <span className="truncate">{item.symbol.split('.')[0]}</span>
                    <span className="opacity-70">PAY</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default DividentMainCalender;

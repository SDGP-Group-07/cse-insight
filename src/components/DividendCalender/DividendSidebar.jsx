import { FileText } from 'lucide-react';

const DividendSidebar = ({ dividendData }) => {
  return (
    <div className="lg:col-span-4 space-y-6">
      <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest px-2 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan"></div>
        Upcoming Details
      </h3>

      <div className="space-y-4 overflow-y-auto max-h-[800px] pr-2 custom-scrollbar">
        {dividendData.map((div, i) => (
          <div key={i} className="group p-5 bg-white/[0.03] border border-white/5 rounded-3xl hover:bg-white/[0.06] transition-all border-l-4 border-l-transparent hover:border-l-accent-cyan">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-black text-white">{div.symbol.split('.')[0]}</h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{div.company}</p>
              </div>
              <a
                href={div.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/5 text-slate-400 hover:text-accent-cyan rounded-xl transition-all border border-white/5"
              >
                <FileText size={20} />
              </a>
            </div>

            <div className="p-4 bg-black/40 border border-white/5 rounded-2xl mb-5">
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium italic">
                "{div.remarks}"
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-2 rounded-xl bg-amber-500/5 border border-amber-500/10">
                <p className="text-[8px] uppercase text-amber-500/60 font-black mb-1">Announced</p>
                <p className="text-[10px] font-bold text-slate-200">{div.dateOfAnnouncement}</p>
              </div>
              <div className="text-center p-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <p className="text-[8px] uppercase text-emerald-500/60 font-black mb-1">Ex-Date</p>
                <p className="text-[10px] font-bold text-slate-200">{div.xd}</p>
              </div>
              <div className="text-center p-2 rounded-xl bg-blue-500/5 border border-blue-500/10">
                <p className="text-[8px] uppercase text-blue-500/60 font-black mb-1">Payment</p>
                <p className="text-[10px] font-bold text-slate-200">{div.payment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DividendSidebar;

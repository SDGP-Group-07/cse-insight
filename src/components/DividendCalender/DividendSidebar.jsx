import { FileText } from 'lucide-react';

const DividendSidebar = ({ dividendData }) => {
  const totalItems = dividendData.length;

  return (
    <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-24" aria-label="Dividend details sidebar">
      <div className="rounded-xl border border-white/10 bg-primary-mid/40 px-3 py-2.5 flex items-center justify-between">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"></div>
          Upcoming Details
        </h3>
        <span className="text-[10px] font-black text-slate-400 border border-white/10 rounded-md px-2 py-1">
          {totalItems}
        </span>
      </div>

      <div className="space-y-4 overflow-y-auto max-h-[720px] pr-2 custom-scrollbar">
        {dividendData.map((div, i) => (
          <article key={i} className="group p-4 sm:p-5 bg-primary-mid/60 border border-white/10 rounded-3xl hover:bg-primary-mid/80 hover:border-white/20 transition-all border-l-4 border-l-transparent hover:border-l-accent-cyan relative overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-accent-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-start gap-4 mb-4">
              <div className="min-w-0">
                <h4 className="text-lg sm:text-xl font-black text-white leading-tight truncate">
                  {(div.symbol || '').split('.')[0] || 'N/A'}
                </h4>
                <p className="mt-1 text-[10px] text-slate-500 font-bold uppercase tracking-wider line-clamp-2">
                  {div.company}
                </p>
              </div>
              <a
                href={div.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open announcement file for ${div.symbol}`}
                title={div.fileOriginalName || 'Open announcement file'}
                className="p-2.5 bg-primary-mid/60 hover:bg-primary-mid/80 text-slate-400 hover:text-accent-cyan rounded-xl transition-all border border-white/10 hover:border-accent-cyan/30"
              >
                <FileText size={20} />
              </a>
            </div>

            <div className="p-4 bg-primary-dark/40 border border-white/10 rounded-2xl mb-4">
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium italic">
                "{div.remarks}"
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
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
          </article>
        ))}

        {dividendData.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-primary-mid/50 p-6 text-center text-sm text-slate-400">
            No dividend entries available.
          </div>
        )}
      </div>
    </aside>
  );
};

export default DividendSidebar;

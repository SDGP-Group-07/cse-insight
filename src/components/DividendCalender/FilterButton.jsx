const FilterButton = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="flex items-center flex-wrap gap-1.5 bg-primary-dark/50 p-1.5 rounded-2xl border border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
      {["Announcement", "XD", "Payment", "XD or Payment"].map((f) => (
        <button
          key={f}
          onClick={() => setActiveFilter(f)}
          className={`px-3 sm:px-4 py-2 rounded-xl text-[10px] sm:text-[11px] font-black transition-all uppercase tracking-tight ${
            activeFilter === f
              ? 'bg-accent-cyan text-[#0d0e12] shadow-lg shadow-accent-cyan/25 border border-accent-cyan/60'
              : 'text-slate-300 hover:text-white bg-primary-mid/40 hover:bg-primary-mid/80 border border-transparent hover:border-white/10'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterButton;

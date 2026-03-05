const FilterButton = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
      {["Announcement", "XD", "Payment", "XD or Payment"].map((f) => (
        <button
          key={f}
          onClick={() => setActiveFilter(f)}
          className={`px-4 py-2 rounded-lg text-[11px] font-black transition-all uppercase tracking-tighter ${
            activeFilter === f
              ? 'bg-accent-cyan text-[#0d0e12] shadow-lg shadow-accent-cyan/20'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterButton;

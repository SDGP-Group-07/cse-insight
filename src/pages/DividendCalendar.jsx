import React, { useEffect, useState, useMemo } from 'react';
import { Calendar as CalendarIcon, Megaphone, Landmark, Wallet } from 'lucide-react';
import Header from '../components/common/Header';
import DividentMainCalender from '../components/DividendCalender/DividentMainCalender';
import FilterButton from '../components/DividendCalender/FilterButton';
import DividendSidebar from '../components/DividendCalender/DividendSidebar';
import dividendService from '../services/dividendService';

const DividendCalendar = () => {
  // 1. State Management
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState('XD or Payment');
  const [dividendData, setDividendData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const loadDividendCalendar = async () => {
      try {
        setIsLoading(true);
        setLoadError('');
        const calendar = await dividendService.getCalendar(year, month);

        if (isMounted) {
          setDividendData(Array.isArray(calendar) ? calendar : []);
        }
      } catch {
        if (isMounted) {
          setLoadError('Failed to load dividend calendar data.');
          setDividendData([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDividendCalendar();

    return () => {
      isMounted = false;
    };
  }, [currentDate]);

  // 3. Date Utility: Handles "DD MMM YYYY" string to "YYYY-MM-DD" comparison
  const getIsoDate = (dateValue) => {
    if (!dateValue) return null;

    if (
      typeof dateValue === 'string' &&
      dateValue.toLowerCase().includes('notified')
    ) {
      return null;
    }

    if (typeof dateValue === 'string') {
      const isoLike = dateValue.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (isoLike) {
        return `${isoLike[1]}-${isoLike[2]}-${isoLike[3]}`;
      }

      const shortMonthMatch = dateValue.match(
        /^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/,
      );
      if (shortMonthMatch) {
        const [, dd, mon, yyyy] = shortMonthMatch;
        const monthMap = {
          Jan: '01',
          Feb: '02',
          Mar: '03',
          Apr: '04',
          May: '05',
          Jun: '06',
          Jul: '07',
          Aug: '08',
          Sep: '09',
          Oct: '10',
          Nov: '11',
          Dec: '12',
        };

        const monthPart = monthMap[mon];
        if (monthPart) {
          return `${yyyy}-${monthPart}-${dd.padStart(2, '0')}`;
        }
      }
    }

    try {
      const d = new Date(dateValue);
      if (isNaN(d.getTime())) return null;

      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    } catch {
      return null;
    }
  };

  // 4. Calendar Logic (Fixed firstDay error)
  const { days, firstDay, monthName, year } = useMemo(() => {
    const y = currentDate.getFullYear();
    const m = currentDate.getMonth();
    const fDay = new Date(y, m, 1).getDay();
    const tDays = new Date(y, m + 1, 0).getDate();
    const mName = currentDate.toLocaleString('default', { month: 'long' });

    return { 
        days: Array.from({ length: tDays }, (_, i) => i + 1), 
        firstDay: fDay, 
        monthName: mName, 
        year: y 
    };
  }, [currentDate]);

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const summaryStats = {
    announcements: dividendData.length,
    xdDates: dividendData.filter((item) => !!getIsoDate(item.xd)).length,
    payments: dividendData.filter((item) => !!getIsoDate(item.payment)).length,
  };

  return (
    <div className="min-h-screen bg-primary-dark text-white font-sans">

      <Header />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        {loadError && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {loadError}
          </div>
        )}

        {/* Page Header & Top Filter */}
        <div className="mb-10 rounded-3xl border border-white/10 bg-primary-mid/50 p-5 sm:p-7 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3 text-white">
                <div className="p-2.5 bg-accent-cyan/10 rounded-xl text-accent-cyan border border-accent-cyan/20">
                <CalendarIcon size={28} />
                </div>
                Dividend Calendar
              </h1>
              <p className="text-slate-400 mt-2 uppercase text-[10px] font-bold tracking-[0.25em]">
                Market Insights / <span className="text-accent-cyan">{activeFilter}</span>
              </p>
            </div>

            <FilterButton activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            <div className="rounded-2xl border border-white/10 bg-primary-mid/60 px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black flex items-center gap-2">
                <Megaphone size={14} className="text-amber-400" />
                Announcements
              </p>
              <p className="text-xl font-black mt-1 text-white">{summaryStats.announcements}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-primary-mid/60 px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black flex items-center gap-2">
                <Landmark size={14} className="text-sky-400" />
                Ex-Dates
              </p>
              <p className="text-xl font-black mt-1 text-white">{summaryStats.xdDates}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-primary-mid/60 px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black flex items-center gap-2">
                <Wallet size={14} className="text-blue-400" />
                Payments
              </p>
              <p className="text-xl font-black mt-1 text-white">{summaryStats.payments}</p>
            </div>
          </div>

          {isLoading && (
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-500 font-bold">
              Loading dividend events...
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Calendar Section */}
          <div className="lg:col-span-8">
            <DividentMainCalender
              monthName={monthName}
              year={year}
              days={days}
              firstDay={firstDay}
              currentDate={currentDate}
              activeFilter={activeFilter}
              dividendData={dividendData}
              getIsoDate={getIsoDate}
              changeMonth={changeMonth}
            />
          </div>

          {/* Sidebar: Detail View */}
          <DividendSidebar dividendData={dividendData} />
        </div>
      </main>
    </div>
  );
};

export default DividendCalendar;
import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import Header from '../components/common/Header';
import DividentMainCalender from '../components/DividendCalender/DividentMainCalender';
import FilterButton from '../components/DividendCalender/FilterButton';
import DividendSidebar from '../components/DividendCalender/DividendSidebar';

const DividendCalendar = () => {
  // 1. State Management
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState('XD or Payment');

  // 2. Mock Data (Matches your refined .NET DTO structure)
  const dividendData = [
    {
      symbol: "AAF.N0000",
      company: "ASIA ASSET FINANCE PLC",
      xd: "16 Dec 2025",
      payment: "05 Jan 2026",
      dateOfAnnouncement: "05 Dec 2025",
      fileUrl: "https://cdn.cse.lk/cmt/announcement_portal_prod/Announcement_38722237209017294.pdf",
      remarks: "Fixed - Non Cumulative Dividend of Cents .70 for the Financial Year 2024/2025"
    },
    {
      symbol: "BUKI.N0000",
/**
 * Move the calendar to the next month.
 * @memberof DividendCalendar
 */
      company: "BUKIT DARAH PLC",
      xd: "17 Dec 2025",
      payment: "06 Jan 2026",
      dateOfAnnouncement: "08 Dec 2025",
      fileUrl: "https://cdn.cse.lk/cmt/announcement_portal_prod/BUKIT_38983850502714039.pdf",
      remarks: "FIRST INTERIM DIVIDEND OF RS.14/43 PER ORDINARY SHARE"
    }
  ];

  // 3. Date Utility: Handles "DD MMM YYYY" string to "YYYY-MM-DD" comparison
  const getIsoDate = (dateStr) => {
    if (!dateStr || dateStr.toLowerCase().includes("notified")) return null;
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return null;
      return d.toISOString().split('T')[0];
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

  return (
    <div className="min-h-screen bg-[#0d0e12] text-slate-200 font-sans">
      <Header />
      
      <main className="container mx-auto px-6 pt-28 pb-12">
        {/* Page Header & Top Filter */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3 text-white">
              <div className="p-2 bg-accent-cyan/10 rounded-lg text-accent-cyan">
                <CalendarIcon size={28} />
              </div>
              Dividend Calendar
            </h1>
            <p className="text-slate-500 mt-1 uppercase text-[10px] font-bold tracking-[0.2em]">
              Market Insights / <span className="text-accent-cyan">{activeFilter}</span>
            </p>
          </div>

          <FilterButton activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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

import React, { useState, useMemo } from 'react';
import { CommunicationEntry } from '../types';
import { BRAZILIAN_HOLIDAYS } from '../constants';

interface CalendarViewProps {
  data: CommunicationEntry[];
  onAddFromCalendar: (date: string) => void;
  onEditEvent: (entry: CommunicationEntry) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ data, onAddFromCalendar, onEditEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const calendarDays = useMemo(() => {
    const days = [];
    const totalDays = daysInMonth(year, month);
    const offset = firstDayOfMonth(year, month);

    // Empty slots before first day
    for (let i = 0; i < offset; i++) {
      days.push(null);
    }

    // Days of the month
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    return days;
  }, [year, month]);

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return data.filter(item => item.date === dateStr);
  };

  const getHolidayForDay = (day: number) => {
    const dayMonth = `${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return BRAZILIAN_HOLIDAYS.find(h => h.date === dayMonth);
  };

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          {monthNames[month]} {year}
        </h2>
        <div className="flex gap-2">
          <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1 text-sm font-medium hover:bg-slate-200 rounded-lg transition-colors border border-slate-300">Hoje</button>
          <button onClick={() => changeMonth(1)} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-slate-100">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
          <div key={day} className="py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50/30">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 auto-rows-[130px]">
        {calendarDays.map((day, idx) => {
          if (day === null) return <div key={`empty-${idx}`} className="border-r border-b border-slate-50 bg-slate-50/10"></div>;

          const events = getEventsForDay(day);
          const holiday = getHolidayForDay(day);
          const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
          const isWeekend = idx % 7 === 0 || idx % 7 === 6;

          return (
            <div key={day} className={`group relative border-r border-b border-slate-100 p-2 transition-all hover:bg-blue-50/30 ${isToday ? 'bg-blue-50/20' : ''} ${isWeekend ? 'bg-slate-50/30' : ''}`}>
              <div className="flex justify-between items-start mb-1">
                <span className={`text-sm font-semibold flex items-center justify-center w-7 h-7 rounded-full ${isToday ? 'bg-blue-600 text-white shadow-md' : holiday ? 'text-rose-600 font-bold' : 'text-slate-500'}`}>
                  {day}
                </span>
                <button 
                  onClick={() => onAddFromCalendar(`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)}
                  className="opacity-0 group-hover:opacity-100 p-1 bg-white text-blue-600 rounded shadow-sm border border-blue-100 hover:bg-blue-600 hover:text-white transition-all transform scale-90"
                  title="Novo Registro"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
              
              <div className="space-y-1 overflow-y-auto max-h-[90px] scrollbar-hide">
                {holiday && (
                  <div className="text-[10px] leading-tight p-1 rounded bg-rose-50 text-rose-700 border border-rose-100 font-bold italic truncate flex items-center gap-1">
                    <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" /></svg>
                    {holiday.name}
                  </div>
                )}
                {events.map(event => (
                  <button 
                    key={event.id} 
                    onClick={() => onEditEvent(event)}
                    className="w-full text-left text-[10px] leading-tight p-1.5 rounded bg-blue-100 text-blue-800 border-l-2 border-blue-600 truncate font-medium shadow-sm hover:brightness-95 hover:translate-x-0.5 transition-all" 
                    title={event.title}
                  >
                    {event.title}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;

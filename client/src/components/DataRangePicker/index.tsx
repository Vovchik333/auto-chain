// components/DateRangePicker.tsx
import { FC } from 'react';
import DatePicker from 'react-datepicker'; // Імпортуємо бібліотеку для календаря
import { format } from 'date-fns'; // Для форматування дат
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslations } from 'next-intl';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  onConfirm: () => void; // Функція для підтвердження
}

const DateRangePicker: FC<DateRangePickerProps> = ({ startDate, endDate, setStartDate, setEndDate, onConfirm }) => {
  const t = useTranslations('dateRange');
  const commonT = useTranslations('common');

  return (
    <div className="flex gap-2 mb-6">
      <div className="text-sm">
        <p>{t('from')}: {startDate ? format(startDate, 'MMM dd, yyyy') : t('selectStartDate')}</p>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)} // Оновлено тип
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="MMM dd, yyyy"
          className="p-2 border rounded-md"
        />
      </div>

      <div className="text-sm">
        <p>{t('to')}: {endDate ? format(endDate, 'MMM dd, yyyy') : t('selectEndDate')}</p>
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)} // Оновлено тип
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate ?? undefined} // Забороняємо вибір кінцевої дати менше за початкову
          dateFormat="MMM dd, yyyy"
          className="p-2 border rounded-md"
        />
      </div>

      {/* Кнопка для підтвердження */}
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-blue-500 text-white rounded-full"
        >
          {commonT('confirm')}
        </button>
      </div>
    </div>
  );
};

export default DateRangePicker;

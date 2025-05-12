// pages/Dashboard.tsx
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'; // Для графіка
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'; // Імпортуємо компонент DateRangePicker
import { format } from 'date-fns'; // Для форматування дат
import DateRangePicker from '../../../../components/DataRangePicker';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Total Value',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)', 
        fill: true,
      },
    ],
  });

  const [latestValue, setLatestValue] = useState<number | null>(null); // Останнє значення на графіку

  // Генерація даних для графіка
  const generateChartData = () => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May']; // Місяці для осі X
    const data = [5, 6, 7, 8, 9]; // Дані для кожного місяця

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Total Value',
          data: data,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    });
  };

  // useEffect для оновлення графіка
  useEffect(() => {
    generateChartData(); // Генерація даних
  }, []); // Виконується лише один раз при завантаженні

  // Підтвердження вибору дат
  const handleConfirm = () => {
    console.log('Selected start date:', startDate);
    console.log('Selected end date:', endDate);
    // Можна додати логіку для фільтрації даних або їх оновлення
  };

  // Форматування дат
  const formattedStartDate = startDate ? format(startDate, 'MMM dd, yyyy') : '';
  const formattedEndDate = endDate ? format(endDate, 'MMM dd, yyyy') : '';

  // Опції для графіка
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Overview - Total Value',
      },
    },
    elements: {
      point: {
        radius: 4, // Розмір точок на графіку
        borderColor: 'green', // Колір точок
        backgroundColor: 'green', // Колір останньої точки
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
        grid: {
          display: false, // Вимикаємо сітку по осі X
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
        grid: {
          display: false, // Вимикаємо сітку по осі Y
        },
      },
    },
  };

  return (
    <div className="p-4 bg-[#1A1F27] text-[#F0F0F0]">
      {/* Заголовок */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Overview</h1>
      </div>

      {/* Календар */}
      <DateRangePicker 
        startDate={startDate} 
        endDate={endDate} 
        setStartDate={setStartDate} 
        setEndDate={setEndDate} 
        onConfirm={handleConfirm} // Підключаємо функцію для підтвердження
      />

      {/* Графік */}
      <div className="bg-[#2A2F38] p-4 shadow-lg rounded-md mb-6">
        <h2 className="text-xl font-semibold">Total Value</h2>
        <p className="text-lg text-[#00FFC6] mt-2">Latest value: $5</p>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;

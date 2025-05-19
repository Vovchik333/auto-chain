import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'; // Для графіка
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { format } from 'date-fns'; // Для форматування дат

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Trend24H = () => {
  // Дані для графіка, що змінюються в залежності від часу
  const [chartData, setChartData] = useState<any>({
    labels: [], // Часові мітки для кожної години
    datasets: [
      {
        label: '24h Trend',
        data: [], // Дані для графіка по годинам
        borderColor: 'rgba(75, 192, 192, 1)', // Колір лінії
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Колір фону лінії
        fill: true,
      },
    ],
  });

  // Останнє значення для позначки
  const [latestValue, setLatestValue] = useState<number | null>(null); // Останнє значення на графіку

  // Генерація даних для графіка
  const generateChartData = () => {
    const labels = [];
    const data = [];
    
    // Заповнення даними для останніх 24 годин
    for (let i = 0; i < 24; i++) {
      labels.push(format(new Date(new Date().getTime() - i * 60 * 60 * 1000), 'HH:mm')); // Час у форматі год/хв
      data.push(Math.random() * 10 + 5); // Випадкові дані (можна замінити на реальні)
    }

    // Останнє значення буде останнім елементом
    setLatestValue(data[data.length - 1]);

    setChartData({
      labels: labels.reverse(), // Часові мітки від найстаршої до новішої
      datasets: [
        {
          label: '24h Trend',
          data: data.reverse(), // Дані для графіка
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    });
  };

  // Оновлення графіка кожну хвилину
  useEffect(() => {
    generateChartData(); // Початкова генерація графіка
    const interval = setInterval(() => {
      generateChartData(); // Оновлення графіка кожні 60 секунд
    }, 60000);

    return () => clearInterval(interval); // Очищення інтервалу при демонтажі
  }, []);

  // Опції для графіка без легенди
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false, // Вимикаємо легенду
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
          text: 'Time (24h)',
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
    <div className="bg-white p-4 shadow-lg rounded-md mb-6">
      <h2 className="text-xl font-semibold">24h Trend</h2>
      <p className="text-lg text-green-600 mt-2">Latest value: ${latestValue}</p>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Trend24H;

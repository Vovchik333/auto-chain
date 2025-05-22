'use client'

// pages/Dashboard.tsx
import { useState, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2'; // Для графіка
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'; // Імпортуємо компонент DateRangePicker
import { format, subDays, isWithinInterval } from 'date-fns'; // Для форматування дат
import DateRangePicker from '../../../../components/DataRangePicker';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Calendar, AlertCircle } from 'lucide-react';
import { useWalletStore } from '@/stores/wallet/wallet.store';
import { useTransactionStore } from '@/stores/transaction/transaction.store';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DEFAULT_DAYS = 30;

const Dashboard = () => {
  const [startDate, setStartDate] = useState<Date | null>(() => subDays(new Date(), DEFAULT_DAYS));
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const { wallets } = useWalletStore();
  const { transactions } = useTransactionStore();

  // Process transactions and calculate daily balances
  const chartData = useMemo(() => {
    if (!transactions.length || !startDate || !endDate) {
      return {
        labels: [],
        datasets: [{
          label: 'Portfolio Value',
          data: [],
          borderColor: '#00FFC6',
          backgroundColor: 'rgba(0, 255, 198, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#00FFC6',
          pointBorderColor: '#1A1F27',
          pointBorderWidth: 2,
          pointHoverBackgroundColor: '#1A1F27',
          pointHoverBorderColor: '#00FFC6',
          pointHoverBorderWidth: 3,
          pointHoverRadius: 6,
        }],
      };
    }

    // Filter transactions within selected date range
    const filteredTransactions = transactions.filter(tx => 
      tx.date && isWithinInterval(new Date(tx.date), { start: startDate, end: endDate })
    );

    // Generate dates array between start and end date
    const dates: Date[] = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Calculate cumulative balance for each date
    const dailyBalances = dates.map(date => {
      const txsBeforeDate = filteredTransactions.filter(tx => 
        tx.date && new Date(tx.date) <= date
      );
      
      return txsBeforeDate.reduce((sum, tx) => sum + (tx.value || 0), 0);
    });

    return {
      labels: dates.map(date => format(date, 'MMM d')),
      datasets: [{
        label: 'Portfolio Value',
        data: dailyBalances,
        borderColor: '#00FFC6',
        backgroundColor: 'rgba(0, 255, 198, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#00FFC6',
        pointBorderColor: '#1A1F27',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: '#1A1F27',
        pointHoverBorderColor: '#00FFC6',
        pointHoverBorderWidth: 3,
        pointHoverRadius: 6,
      }],
    };
  }, [transactions, startDate, endDate]);

  const handleConfirm = () => {
    setIsDatePickerOpen(false);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#2A2F38',
        titleColor: '#F0F0F0',
        bodyColor: '#F0F0F0',
        borderColor: '#353B45',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => `${context.parsed.y.toFixed(4)} ETH`,
        },
      },
    },
    scales: {
      x: {
        type: 'category' as const,
        grid: {
          display: false,
        },
        ticks: {
          color: '#A3A3A3',
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        type: 'linear' as const,
        grid: {
          color: '#2A2F38',
        },
        ticks: {
          color: '#A3A3A3',
          callback: function(this: any, value: string | number) {
            if (typeof value === 'number') {
              return `${value.toFixed(4)} ETH`;
            }
            return value;
          },
        },
      },
    },
  } as const;

  const latestValue = chartData.datasets[0].data[chartData.datasets[0].data.length - 1] || 0;
  const previousValue = chartData.datasets[0].data[chartData.datasets[0].data.length - 2] || 0;
  const percentageChange = previousValue ? ((latestValue - previousValue) / previousValue) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-6"
    >
      {/* Chart Card */}
      <div className="bg-[#1A1F27] border border-[#2A2F38] rounded-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[#F0F0F0]">Portfolio Value</h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-2xl font-bold text-[#F0F0F0]">
                {latestValue} <span className="text-[#00FFC6]">ETH</span>
              </span>
              {percentageChange !== 0 && (
                <div className={`flex items-center gap-1 ${percentageChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {percentageChange >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{Math.abs(percentageChange).toFixed(2)}%</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-[#2A2F38] text-[#F0F0F0] rounded-lg hover:bg-[#353B45] transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {startDate && endDate ? `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')}` : 'Select dates'}
            </span>
          </button>
        </div>

        <AnimatePresence>
          {isDatePickerOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6"
            >
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                setStartDate={(date) => setStartDate(date)}
                setEndDate={(date) => setEndDate(date)}
                onConfirm={handleConfirm}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {transactions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-[400px] text-center"
          >
            <AlertCircle className="w-12 h-12 text-[#A3A3A3] mb-4" />
            <p className="text-[#F0F0F0] font-medium">No Transaction Data</p>
            <p className="text-[#A3A3A3] text-sm mt-2">
              Start making transactions to see your portfolio value over time
            </p>
          </motion.div>
        ) : (
          <div className="h-[400px]">
            <Line data={chartData} options={options} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;

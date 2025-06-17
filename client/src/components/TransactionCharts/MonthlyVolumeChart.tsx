'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { TransactionDto } from '@/common/types/transaction/transaction.dto';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { format, parseISO, startOfMonth, endOfMonth } from 'date-fns';
import { ethers } from 'ethers';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyVolumeChartProps {
  transactions: TransactionDto[];
}

const MonthlyVolumeChart: React.FC<MonthlyVolumeChartProps> = ({ transactions }) => {
  const { theme } = useTheme();
  const t = useTranslations('stats');

  // Process transactions to get monthly volumes
  const monthlyData = transactions.reduce((acc, tx) => {
    const date = parseISO(tx.date);
    const monthKey = format(date, 'MMM yyyy');
    const value = ethers.parseEther(tx.value);
    
    if (!acc[monthKey]) {
      acc[monthKey] = {
        incoming: ethers.parseEther('0'),
        outgoing: ethers.parseEther('0'),
        date: date
      };
    }
    
    if (tx.type === 'deposit') {
      acc[monthKey].incoming += value;
    } else {
      acc[monthKey].outgoing += value;
    }
    
    return acc;
  }, {} as Record<string, { incoming: bigint; outgoing: bigint; date: Date }>);

  // Sort months chronologically
  const sortedMonths = Object.entries(monthlyData)
    .sort(([, a], [, b]) => a.date.getTime() - b.date.getTime());

  // Theme-aware color palettes
  const lightThemeColors = {
    incoming: 'rgba(75, 192, 192, 0.8)',  // Teal
    outgoing: 'rgba(255, 99, 132, 0.8)',  // Pink
  };

  const darkThemeColors = {
    incoming: 'rgba(75, 192, 192, 0.9)',  // Bright Teal
    outgoing: 'rgba(255, 99, 132, 0.9)',  // Bright Pink
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'center' as const,
        labels: {
          color: theme === 'dark' ? '#F0F0F0' : '#1A1F27',
          font: {
            size: 12,
          },
          padding: 20,
          boxWidth: 12,
          boxHeight: 12,
        },
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#2A2F38' : '#FFFFFF',
        titleColor: theme === 'dark' ? '#F0F0F0' : '#1A1F27',
        bodyColor: theme === 'dark' ? '#F0F0F0' : '#1A1F27',
        borderColor: theme === 'dark' ? '#353B45' : '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y;
            return `${context.dataset.label}: ${Number(value).toFixed(4)} ETH`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: theme === 'dark' ? '#F0F0F0' : '#1A1F27',
          font: {
            size: 11,
          },
          callback: function(value) {
            return `${Number(value).toFixed(2)} ETH`;
          }
        },
      },
      x: {
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: theme === 'dark' ? '#F0F0F0' : '#1A1F27',
          font: {
            size: 11,
          },
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  const barData = {
    labels: sortedMonths.map(([month]) => month),
    datasets: [
      {
        label: t('totalReceived'),
        data: sortedMonths.map(([, data]) => Number(ethers.formatEther(data.incoming))),
        backgroundColor: theme === 'dark' ? darkThemeColors.incoming : lightThemeColors.incoming,
        borderColor: theme === 'dark' ? darkThemeColors.incoming.replace('0.9', '1') : lightThemeColors.incoming.replace('0.8', '1'),
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: t('totalSent'),
        data: sortedMonths.map(([, data]) => Number(ethers.formatEther(data.outgoing))),
        backgroundColor: theme === 'dark' ? darkThemeColors.outgoing : lightThemeColors.outgoing,
        borderColor: theme === 'dark' ? darkThemeColors.outgoing.replace('0.9', '1') : lightThemeColors.outgoing.replace('0.8', '1'),
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  return (
    <Card className="bg-background/50 backdrop-blur-sm border-border theme-transition h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-foreground theme-transition text-lg sm:text-xl">{t('chart.monthlyVolume')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] sm:h-[300px] md:h-[350px]">
          <Bar data={barData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyVolumeChart; 
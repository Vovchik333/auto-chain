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

interface TransactionDistributionChartProps {
  transactions: TransactionDto[];
}

const TransactionDistributionChart: React.FC<TransactionDistributionChartProps> = ({ transactions }) => {
  const { theme } = useTheme();
  const t = useTranslations('stats');

  // Define the ranges for transaction amounts
  const ranges = [
    { min: 0, max: 0.01, label: '0 - 0.01 ETH' },
    { min: 0.01, max: 0.1, label: '0.01 - 0.1 ETH' },
    { min: 0.1, max: 1, label: '0.1 - 1 ETH' },
    { min: 1, max: 10, label: '1 - 10 ETH' },
    { min: 10, max: Infinity, label: '10+ ETH' },
  ];

  // Count transactions in each range
  const distribution = transactions.reduce((acc, tx) => {
    // Convert from Wei to ETH
    const amount = Number(tx.value);
    const range = ranges.find(r => amount >= r.min && amount < r.max);
    if (range) {
      acc[range.label] = (acc[range.label] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Ensure all ranges are represented in the data
  const chartData = ranges.map(range => ({
    label: range.label,
    count: distribution[range.label] || 0
  }));

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#2A2F38' : '#FFFFFF',
        titleColor: theme === 'dark' ? '#F0F0F0' : '#1A1F27',
        bodyColor: theme === 'dark' ? '#F0F0F0' : '#1A1F27',
        borderColor: theme === 'dark' ? '#353B45' : '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => {
            return `${context.parsed.y} ${t('chart.transactionDistributionYAxis')}`;
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
          precision: 0,
        },
        title: {
          display: true,
          text: t('chart.transactionDistributionYAxis'),
          color: theme === 'dark' ? '#F0F0F0' : '#1A1F27',
          font: {
            size: 12,
          },
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
        title: {
          display: true,
          text: t('chart.transactionDistributionXAxis'),
          color: theme === 'dark' ? '#F0F0F0' : '#1A1F27',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const barData = {
    labels: chartData.map(d => d.label),
    datasets: [
      {
        data: chartData.map(d => d.count),
        backgroundColor: theme === 'dark' ? 'rgba(75, 192, 192, 0.9)' : 'rgba(75, 192, 192, 0.8)',
        borderColor: theme === 'dark' ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  return (
    <Card className="bg-background/50 backdrop-blur-sm border-border theme-transition h-full">
      <CardHeader className="p-2">
        <CardTitle className="text-foreground theme-transition text-lg sm:text-xl">
          {t('chart.transactionDistribution')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] sm:h-[300px] md:h-[350px]">
          <Bar data={barData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionDistributionChart; 
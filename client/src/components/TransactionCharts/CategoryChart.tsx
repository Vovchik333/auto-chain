'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { TransactionDto } from '@/common/types/transaction/transaction.dto';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { formatStringNumber } from '@/lib/string.utils';
import { ethers } from 'ethers';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface CategoryChartProps {
  transactions: TransactionDto[];
}

const CategoryChart: React.FC<CategoryChartProps> = ({ transactions }) => {
  const { theme } = useTheme();
  const t = useTranslations('stats');

  const categoryData = transactions.reduce((acc, tx) => {
    const category = tx.category || t('uncategorized');
    const value = ethers.parseEther(tx.value);
    acc[category] = (acc[category] || ethers.parseEther('0')) + value;
    return acc;
  }, {} as Record<string, bigint>);

  console.log(categoryData);
  
  const formattedCategoryData = Object.entries(categoryData).reduce((acc, [category, value]) => {
    acc[category] = Number(ethers.formatEther(value));
    return acc;
  }, {} as Record<string, number>);

  // Helper to get translated category label
  const getCategoryLabel = (key: string) =>
    t(`categoriesList.${key}`) || key || t('uncategorized');

  // Theme-aware color palettes
  const lightThemeColors = [
    'rgba(54, 162, 235, 0.8)',  // Blue
    'rgba(255, 99, 132, 0.8)',  // Pink
    'rgba(75, 192, 192, 0.8)',  // Teal
    'rgba(255, 159, 64, 0.8)',  // Orange
    'rgba(153, 102, 255, 0.8)', // Purple
    'rgba(255, 205, 86, 0.8)',  // Yellow
    'rgba(201, 203, 207, 0.8)', // Gray
    'rgba(255, 99, 132, 0.8)',  // Red
  ];

  const darkThemeColors = [
    'rgba(54, 162, 235, 0.9)',  // Bright Blue
    'rgba(255, 99, 132, 0.9)',  // Bright Pink
    'rgba(75, 192, 192, 0.9)',  // Bright Teal
    'rgba(255, 159, 64, 0.9)',  // Bright Orange
    'rgba(153, 102, 255, 0.9)', // Bright Purple
    'rgba(255, 205, 86, 0.9)',  // Bright Yellow
    'rgba(201, 203, 207, 0.9)', // Bright Gray
    'rgba(255, 99, 132, 0.9)',  // Bright Red
  ];

  const chartOptions = {
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
            const value = context.raw;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return [
              `${formatStringNumber(`${value}`)} ${t('chart.eth')}`,
              `(${percentage}%)`
            ];
          },
        },
      },
    },
  };

  const pieData = {
    labels: Object.keys(formattedCategoryData).map(getCategoryLabel),
    datasets: [
      {
        data: Object.values(formattedCategoryData),
        backgroundColor: theme === 'dark' ? darkThemeColors : lightThemeColors,
        borderColor: theme === 'dark' ? '#2A2F38' : '#FFFFFF',
        borderWidth: 2,
        hoverOffset: 4,
        hoverBorderWidth: 3,
        hoverBorderColor: theme === 'dark' ? '#353B45' : '#E5E7EB',
      },
    ],
  };

  return (
    <Card className="bg-background/50 backdrop-blur-sm border-border theme-transition h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-foreground theme-transition text-lg sm:text-xl">{t('chart.categories')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] sm:h-[300px] md:h-[350px]">
          <Pie data={pieData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryChart; 
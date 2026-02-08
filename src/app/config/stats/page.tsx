'use client';

import ProtectedRoute from '@/components/ProtectedRoute/protectedRoute';
import { getConfig } from '@/utils/requests';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#DF3132', '#602E44', '#2E86AB', '#344D49', '#F1C861', '#CE993C', '#10B981', '#8B5CF6'];

const StatsPage = () => {
  const { data: config, isLoading } = useQuery<any>({
    queryKey: ['config'],
    queryFn: getConfig,
  });

  const stats = useMemo(() => {
    if (!config?.categoriesSelected) return null;

    const categories = config.categoriesSelected;
    const totalCategories = categories.length;
    const totalProducts = categories.reduce(
      (acc: number, cat: any) => acc + (cat.products?.length || 0),
      0
    );
    const winnerInterval = config.winnerInterval || 0;

    const productsByCategory = categories.map((cat: any) => ({
      name: cat.categoryId?.name || 'Sin nombre',
      productos: cat.products?.length || 0,
    }));

    const probabilityData = categories.flatMap((cat: any) =>
      (cat.products || []).map((prod: any) => ({
        name: prod.name,
        probabilidad: prod.probability || 0,
      }))
    );

    return {
      totalCategories,
      totalProducts,
      winnerInterval,
      productsByCategory,
      probabilityData,
    };
  }, [config]);

  return (
    <ProtectedRoute>
      <div className="w-full min-h-[82vh] p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Estadisticas</h1>
          <Link
            href="/config"
            className="text-primary hover:underline text-sm"
          >
            Volver a configuracion
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : !stats ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-xl font-bold mb-2">Sin datos</h2>
            <p className="text-gray-500">Configura el juego para ver estadisticas.</p>
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-[#DF3132] to-[#602E44] rounded-xl p-6 text-white">
                <p className="text-sm opacity-80">Categorias Activas</p>
                <p className="text-4xl font-bold mt-2">{stats.totalCategories}</p>
              </div>
              <div className="bg-gradient-to-br from-[#2E86AB] to-[#344D49] rounded-xl p-6 text-white">
                <p className="text-sm opacity-80">Productos Totales</p>
                <p className="text-4xl font-bold mt-2">{stats.totalProducts}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F1C861] to-[#CE993C] rounded-xl p-6 text-white">
                <p className="text-sm opacity-80">Intervalo de Ganador</p>
                <p className="text-4xl font-bold mt-2">
                  Cada {stats.winnerInterval} <span className="text-lg font-normal">tiradas</span>
                </p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bar Chart - Products by Category */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold mb-4">Productos por Categoria</h3>
                {stats.productsByCategory.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stats.productsByCategory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                        interval={0}
                        angle={-20}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="productos" fill="#DF3132" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-gray-400 text-center py-10">Sin datos</p>
                )}
              </div>

              {/* Pie Chart - Distribution */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold mb-4">Distribucion de Productos</h3>
                {stats.productsByCategory.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={stats.productsByCategory}
                        dataKey="productos"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, percent }: any) =>
                          `${name} (${((percent || 0) * 100).toFixed(0)}%)`
                        }
                        labelLine={false}
                      >
                        {stats.productsByCategory.map((_: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-gray-400 text-center py-10">Sin datos</p>
                )}
              </div>

              {/* Probability Table */}
              {stats.probabilityData.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-6 lg:col-span-2">
                  <h3 className="font-bold mb-4">Probabilidades de Productos</h3>
                  <ResponsiveContainer width="100%" height={Math.max(200, stats.probabilityData.length * 40)}>
                    <BarChart data={stats.probabilityData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis type="number" domain={[0, 100]} unit="%" />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={120}
                        tick={{ fontSize: 11 }}
                      />
                      <Tooltip formatter={(value: any) => `${value}%`} />
                      <Bar dataKey="probabilidad" fill="#2E86AB" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default StatsPage;

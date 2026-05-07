'use client';

import ProtectedRoute from '@/components/ProtectedRoute/protectedRoute';
import { getRedemptions, validateRedemptionCode, RedemptionItem } from '@/utils/requests';
import { redeemCode } from '@/utils/mutations';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

const statusBadgeClass = (status: string) => {
  switch (status) {
    case 'pendiente':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'canjeado':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'expirado':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const statusText = (status: string) =>
  status.charAt(0).toUpperCase() + status.slice(1);

const RedemptionsPage = () => {
  const queryClient = useQueryClient();
  const [searchCode, setSearchCode] = useState('');
  const [searchResult, setSearchResult] = useState<RedemptionItem | null>(null);
  const [searchError, setSearchError] = useState('');
  const [now, setNow] = useState(Date.now());

  const {
    data: redemptions = [],
    isLoading,
    isError,
  } = useQuery<RedemptionItem[]>({
    queryKey: ['redemptions'],
    queryFn: getRedemptions,
    refetchInterval: 30000,
  });

  // Ticker cada segundo para el countdown en vivo
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const redeemMutation = useMutation({
    mutationFn: (code: string) => redeemCode(code),
    onSuccess: () => {
      toast.success('Codigo canjeado exitosamente');
      queryClient.invalidateQueries({ queryKey: ['redemptions'] });
      setSearchResult(null);
      setSearchCode('');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSearch = useCallback(async () => {
    const trimmed = searchCode.trim().toUpperCase();
    if (!trimmed) return;
    setSearchError('');
    setSearchResult(null);
    try {
      const result = await validateRedemptionCode(trimmed);
      setSearchResult(result);
    } catch (error: any) {
      setSearchError(error.message || 'Codigo no encontrado');
    }
  }, [searchCode]);

  const stats = useMemo(() => {
    const total = redemptions.length;
    const pending = redemptions.filter((r) => r.status === 'pendiente').length;
    const redeemed = redemptions.filter((r) => r.status === 'canjeado').length;
    const expired = redemptions.filter((r) => r.status === 'expirado').length;
    return { total, pending, redeemed, expired };
  }, [redemptions]);

  const formatTimeRemaining = (item: RedemptionItem) => {
    if (item.status !== 'pendiente') return '-';
    const expiresAt = new Date(item.expiresAt).getTime();
    const remaining = Math.max(0, expiresAt - now);
    if (remaining === 0) return 'Expirado';
    const mins = Math.floor(remaining / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ProtectedRoute>
      <div className="w-full min-h-[82vh] p-4 sm:p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Codigos de Canje</h1>
          <Link
            href="/config"
            className="text-primary hover:underline text-sm"
          >
            Volver a configuracion
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-24 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-4">&#9888;&#65039;</div>
            <p className="text-gray-500">
              Error al cargar los codigos de canje
            </p>
            <button
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ['redemptions'] })
              }
              className="mt-4 bg-primary text-white px-4 py-2 rounded-lg text-sm"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div className="bg-gradient-to-br from-[#2E86AB] to-[#344D49] rounded-xl p-4 text-white">
                <p className="text-xs opacity-80">Total</p>
                <p className="text-3xl font-bold mt-1">{stats.total}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F1C861] to-[#CE993C] rounded-xl p-4 text-white">
                <p className="text-xs opacity-80">Pendientes</p>
                <p className="text-3xl font-bold mt-1">{stats.pending}</p>
              </div>
              <div className="bg-gradient-to-br from-[#10B981] to-[#047857] rounded-xl p-4 text-white">
                <p className="text-xs opacity-80">Canjeados</p>
                <p className="text-3xl font-bold mt-1">{stats.redeemed}</p>
              </div>
              <div className="bg-gradient-to-br from-[#DF3132] to-[#602E44] rounded-xl p-4 text-white">
                <p className="text-xs opacity-80">Expirados</p>
                <p className="text-3xl font-bold mt-1">{stats.expired}</p>
              </div>
            </div>

            {/* Validar Codigo */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-6">
              <h2 className="font-bold mb-4">Validar Codigo</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Ej: WIN-A3B5C7D9"
                  className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#2E86AB] focus:border-[#2E86AB] font-mono text-lg tracking-wider uppercase"
                  aria-label="Codigo de canje a validar"
                />
                <button
                  onClick={handleSearch}
                  className="bg-[#2E86AB] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#236d8e] transition-colors"
                >
                  Validar
                </button>
              </div>

              {/* Resultado de busqueda */}
              {searchResult && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {searchResult.productImageURL && (
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={searchResult.productImageURL}
                        alt={searchResult.productName}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">
                      {searchResult.productName}
                    </p>
                    <p className="font-mono text-sm text-gray-500">
                      {searchResult.code}
                    </p>
                    <span
                      className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full border ${statusBadgeClass(searchResult.status)}`}
                    >
                      {statusText(searchResult.status)}
                    </span>
                  </div>
                  {searchResult.status === 'pendiente' && (
                    <button
                      onClick={() => redeemMutation.mutate(searchResult.code)}
                      disabled={redeemMutation.isPending}
                      className="bg-[#10B981] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#059669] transition-colors disabled:opacity-50 w-full sm:w-auto"
                    >
                      {redeemMutation.isPending ? 'Canjeando...' : 'Canjear'}
                    </button>
                  )}
                </div>
              )}
              {searchError && (
                <p className="mt-3 text-red-500 text-sm">{searchError}</p>
              )}
            </div>

            {/* Tabla de codigos */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Vista mobile: cards */}
              <div className="block sm:hidden">
                {redemptions.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    No hay codigos de canje generados
                  </div>
                ) : (
                  <div className="divide-y">
                    {redemptions.map((item) => (
                      <div key={item._id} className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-sm tracking-wide">
                            {item.code}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full border ${statusBadgeClass(item.status)}`}
                          >
                            {statusText(item.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          {item.productName}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{formatDate(item.createdAt)}</span>
                          <span className="font-mono">
                            {formatTimeRemaining(item)}
                          </span>
                        </div>
                        {item.status === 'pendiente' && (
                          <button
                            onClick={() => redeemMutation.mutate(item.code)}
                            disabled={redeemMutation.isPending}
                            className="w-full text-xs bg-[#10B981] text-white px-3 py-1.5 rounded-lg hover:bg-[#059669] transition-colors disabled:opacity-50"
                          >
                            Canjear
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Vista desktop: tabla */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">
                        Codigo
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">
                        Producto
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">
                        Estado
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">
                        Creado
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">
                        Tiempo
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {redemptions.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center py-10 text-gray-400"
                        >
                          No hay codigos de canje generados
                        </td>
                      </tr>
                    ) : (
                      redemptions.map((item) => (
                        <tr
                          key={item._id}
                          className="border-b last:border-b-0 hover:bg-gray-50"
                        >
                          <td className="px-4 py-3 font-mono font-bold tracking-wide">
                            {item.code}
                          </td>
                          <td className="px-4 py-3">{item.productName}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full border ${statusBadgeClass(item.status)}`}
                            >
                              {statusText(item.status)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-500">
                            {formatDate(item.createdAt)}
                          </td>
                          <td className="px-4 py-3 font-mono">
                            {formatTimeRemaining(item)}
                          </td>
                          <td className="px-4 py-3">
                            {item.status === 'pendiente' && (
                              <button
                                onClick={() =>
                                  redeemMutation.mutate(item.code)
                                }
                                disabled={redeemMutation.isPending}
                                className="text-xs bg-[#10B981] text-white px-3 py-1 rounded-lg hover:bg-[#059669] transition-colors disabled:opacity-50"
                              >
                                Canjear
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-3 text-center">
              Se actualiza automaticamente cada 30 segundos
            </p>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default RedemptionsPage;

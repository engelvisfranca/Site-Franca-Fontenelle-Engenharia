import React, { useMemo, useState } from 'react';
import { RotateCcw, Search } from 'lucide-react';
import { ADMINISTRATIVE_REGIONS } from '../data/mockEngineeringData';
import { AdministrativeRegion, EquipmentStatus, PublicWork } from '../types/engineering';
import { WorkCard } from './WorkCard';

interface WorksScreenProps {
  works: PublicWork[];
  initialRaFilter: AdministrativeRegion | 'Todas';
  onRaFilterChange: (ra: AdministrativeRegion | 'Todas') => void;
  onInspectWork: (work: PublicWork) => void;
}

const STATUS_OPTIONS: ('Todos' | EquipmentStatus)[] = [
  'Todos',
  EquipmentStatus.IN_PROGRESS,
  EquipmentStatus.COMPLETED,
  EquipmentStatus.INSPECTION,
];

export const WorksScreen: React.FC<WorksScreenProps> = ({
  works,
  initialRaFilter,
  onRaFilterChange,
  onInspectWork,
}) => {
  const [statusFilter, setStatusFilter] = useState<'Todos' | EquipmentStatus>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorks = useMemo(() => {
    return works.filter((w) => {
      const matchesRa = initialRaFilter === 'Todas' || w.ra === initialRaFilter;
      const matchesStatus = statusFilter === 'Todos' || w.status === statusFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        w.title.toLowerCase().includes(q) ||
        w.contractCode.toLowerCase().includes(q) ||
        w.locationDetail.toLowerCase().includes(q) ||
        w.artCode.toLowerCase().includes(q);
      return matchesRa && matchesStatus && matchesQuery;
    });
  }, [works, initialRaFilter, statusFilter, searchQuery]);

  const totalFilteredValue = filteredWorks.reduce((sum, w) => sum + w.contractValueBrl, 0);
  const avgProgress = filteredWorks.length
    ? Math.round(
        filteredWorks.reduce((sum, w) => sum + w.physicalProgress, 0) / filteredWorks.length
      )
    : 0;

  const resetAllFilters = () => {
    onRaFilterChange('Todas');
    setStatusFilter('Todos');
    setSearchQuery('');
  };

  return (
    <div className="max-w-[1360px] mx-auto px-5 md:px-12 py-10 space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E2E8F0] pb-6">
        <div>
          <p className="text-xs font-mono font-semibold tracking-wider text-[#43474D]">
            CARTEIRA CONTRATUAL · GDF / NOVACAP / SODF
          </p>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-[#001428] mt-1">
            Obras Públicas &amp; Medições Físicas
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-xs font-mono tabular-nums">
          <div>
            <span className="text-[#43474D] block">Contratos Filtrados</span>
            <span className="text-base font-semibold text-[#0F2942]">{filteredWorks.length}</span>
          </div>
          <div>
            <span className="text-[#43474D] block">Média de Avanço</span>
            <span className="text-base font-semibold text-[#E05A2B]">{avgProgress}%</span>
          </div>
          <div>
            <span className="text-[#43474D] block">Montante Contratual</span>
            <span className="text-base font-semibold text-[#0F2942]">
              {totalFilteredValue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Filter Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 space-y-4">
        {/* Top Row: Search + Status Segmented Filter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search
              className="w-4 h-4 text-[#43474D] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por contrato, ART ou localidade..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
              aria-label="Buscar obras públicas"
            />
          </div>

          <div
            className="flex flex-wrap items-center gap-1 p-1 bg-[#F1F5F9] border border-[#E2E8F0] rounded"
            role="group"
            aria-label="Filtrar por situação da obra"
          >
            {STATUS_OPTIONS.map((status) => {
              const active = statusFilter === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#0F2942] text-white'
                      : 'text-[#43474D] hover:text-[#0F2942] hover:bg-white'
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Row: DF Administrative Regions (RAs) Filter Chips (4px radius) */}
        <div className="pt-3 border-t border-[#E2E8F0]">
          <div className="text-[11px] font-mono font-semibold text-[#43474D] mb-2">
            REGIÕES ADMINISTRATIVAS DO DF
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onRaFilterChange('Todas')}
              className={`px-3 py-1.5 text-xs font-mono font-semibold rounded border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                initialRaFilter === 'Todas'
                  ? 'bg-[#0F2942] text-white border-[#0F2942]'
                  : 'bg-[#F1F5F9] text-[#111C2D] border-[#CBD5E1] hover:border-[#0F2942]'
              }`}
            >
              TODAS AS RAs
            </button>
            {ADMINISTRATIVE_REGIONS.map((ra) => {
              const active = initialRaFilter === ra;
              return (
                <button
                  key={ra}
                  type="button"
                  onClick={() => onRaFilterChange(ra)}
                  className={`px-3 py-1.5 text-xs font-mono font-semibold rounded border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#0F2942] text-white border-[#0F2942]'
                      : 'bg-[#F1F5F9] text-[#111C2D] border-[#CBD5E1] hover:border-[#0F2942]'
                  }`}
                >
                  {ra.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Works Grid or Empty State */}
      {filteredWorks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorks.map((work) => (
            <WorkCard key={work.id} work={work} onInspect={onInspectWork} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-12 text-center">
          <p className="text-base font-display font-semibold text-[#0F2942]">
            Nenhuma obra localizada com os filtros selecionados
          </p>
          <p className="text-sm text-[#43474D] mt-1 max-w-md mx-auto">
            Ajuste a Região Administrativa, a situação contratual ou o termo de pesquisa para
            visualizar os contratos ativos.
          </p>
          <button
            type="button"
            onClick={resetAllFilters}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0F2942] hover:bg-[#163A5E] rounded cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  );
};

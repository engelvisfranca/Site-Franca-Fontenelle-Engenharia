import React from 'react';
import { Activity, AlertTriangle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { EquipmentStatus, PublicWork } from '../types/engineering';
import { EquipmentSchematic } from './SchematicIllustration';

interface WorkCardProps {
  work: PublicWork;
  onInspect: (work: PublicWork) => void;
}

export const StatusTag: React.FC<{ status: EquipmentStatus }> = ({ status }) => {
  if (status === EquipmentStatus.COMPLETED) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-semibold rounded bg-[#F0FDF4] text-[#15803D] border border-[#86EFAC] whitespace-nowrap shrink-0">
        <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
        Concluído / Entregue
      </span>
    );
  }
  if (status === EquipmentStatus.INSPECTION) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-semibold rounded bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA] whitespace-nowrap shrink-0">
        <AlertTriangle className="w-3 h-3" aria-hidden="true" />
        Perícia / Patologia
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-semibold rounded bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74] whitespace-nowrap shrink-0">
      <Activity className="w-3 h-3" aria-hidden="true" />
      Em Execução
    </span>
  );
};

export const WorkCard: React.FC<WorkCardProps> = ({ work, onInspect }) => {
  const isDone = work.physicalProgress >= 100;
  const formattedContractValue = work.contractValueBrl.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });

  return (
    <article className="card-technical flex flex-col overflow-hidden">
      {/* Contract Header */}
      <div className="px-5 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between gap-2 bg-white">
        <span className="text-xs font-mono font-semibold text-[#0F2942] tracking-wide whitespace-nowrap">
          {work.contractCode}
        </span>
        <StatusTag status={work.status} />
      </div>

      {/* Architectural Schematic Drawing */}
      <EquipmentSchematic type={work.equipmentType} areaSqm={work.areaSqm} className="h-44" />

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Clean unboxed metadata */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#43474D] mb-2">
            <span className="font-mono font-medium text-[#0F2942]">{work.ra}</span>
            <span aria-hidden="true">·</span>
            <span>{work.equipmentType}</span>
          </div>

          <h3 className="text-lg font-display font-semibold text-[#111C2D] leading-snug mb-2">
            {work.title}
          </h3>

          <p className="text-sm text-[#43474D] line-clamp-2 mb-5">{work.locationDetail}</p>
        </div>

        <div>
          {/* Physical Progress Measurement Bar */}
          <div className="mb-4">
            <div className="flex items-baseline justify-between text-xs mb-1.5">
              <span className="font-medium text-[#43474D]">Medição Física Acumulada</span>
              <span className="font-mono font-semibold tabular-nums text-[#0F2942]">
                {work.physicalProgress}%
              </span>
            </div>
            <div className="w-full h-2 bg-[#E2E8F0] rounded-sm overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, Math.max(0, work.physicalProgress))}%`,
                  backgroundColor: isDone ? '#2E7D32' : '#E05A2B',
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-[#43474D] mt-1.5">
              <span>Contrato: {formattedContractValue}</span>
              <span>{work.areaSqm.toLocaleString('pt-BR')} m²</span>
            </div>
          </div>

          {/* Footer Dates & Action */}
          <div className="pt-3.5 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
            <div className="text-[11px] font-mono tabular-nums text-[#43474D]">
              <div>Início: {work.startDate}</div>
              <div>Prazo: {work.expectedEndDate}</div>
            </div>
            <button
              type="button"
              onClick={() => onInspect(work)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0F2942] hover:bg-[#163A5E] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Diário &amp; Memorial
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

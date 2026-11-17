import React, { useMemo, useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  FilePlus2,
  Printer,
  Search,
  Shield,
} from 'lucide-react';
import { ForensicReport, PathologySeverity } from '../types/engineering';
import { ForensicDiagram } from './SchematicIllustration';

interface ForensicScreenProps {
  reports: ForensicReport[];
  onOpenNewReport: () => void;
  onUpdateReportStatus: (
    reportId: string,
    newStatus: 'Em Análise' | 'Laudo Emitido' | 'Intervenção Recomendada'
  ) => void;
}

const SeverityTag: React.FC<{ severity: PathologySeverity }> = ({ severity }) => {
  if (severity === PathologySeverity.CRITICAL) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono font-semibold rounded bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA] whitespace-nowrap">
        <AlertOctagon className="w-3 h-3" aria-hidden="true" />
        Crítica
      </span>
    );
  }
  if (severity === PathologySeverity.MODERATE) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono font-semibold rounded bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74] whitespace-nowrap">
        <AlertTriangle className="w-3 h-3" aria-hidden="true" />
        Moderada
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono font-semibold rounded bg-[#F0FDF4] text-[#15803D] border border-[#86EFAC] whitespace-nowrap">
      <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
      Monitorada
    </span>
  );
};

export const ForensicScreen: React.FC<ForensicScreenProps> = ({
  reports,
  onOpenNewReport,
  onUpdateReportStatus,
}) => {
  const [selectedId, setSelectedId] = useState<string>(reports[0]?.id ?? '');
  const [severityFilter, setSeverityFilter] = useState<'Todas' | PathologySeverity>('Todas');
  const [query, setQuery] = useState('');

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchSev = severityFilter === 'Todas' || r.severity === severityFilter;
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        r.reportCode.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.assetName.toLowerCase().includes(q) ||
        r.ra.toLowerCase().includes(q);
      return matchSev && matchQ;
    });
  }, [reports, severityFilter, query]);

  const activeReport =
    filteredReports.find((r) => r.id === selectedId) ||
    filteredReports[0] ||
    reports[0] ||
    null;

  const criticalCount = reports.filter((r) => r.severity === PathologySeverity.CRITICAL).length;
  const openCount = reports.filter((r) => r.status !== 'Laudo Emitido').length;

  return (
    <div className="max-w-[1360px] mx-auto px-5 md:px-12 py-10 space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E2E8F0] pb-6 no-print">
        <div>
          <p className="text-xs font-mono font-semibold tracking-wider text-[#43474D]">
            ASSESSORIA PERICIAL &amp; PATOLOGIAS CONSTRUTIVAS · ABNT NBR 13752
          </p>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-[#001428] mt-1">
            Laudos Técnicos &amp; Inspeções Estruturais
          </h1>
        </div>

        <button
          type="button"
          onClick={onOpenNewReport}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#E05A2B] hover:bg-[#AB3504] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <FilePlus2 className="w-4 h-4" aria-hidden="true" />
          Emitir Novo Laudo
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 no-print">
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-4">
          <div className="text-xs font-mono text-[#43474D]">Acervo de Laudos</div>
          <div className="text-2xl font-display font-bold tabular-nums text-[#0F2942] mt-1">
            {reports.length} pareceres
          </div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-4">
          <div className="text-xs font-mono text-[#43474D]">Em Análise / Intervenção</div>
          <div className="text-2xl font-display font-bold tabular-nums text-[#E05A2B] mt-1">
            {openCount} abertos
          </div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-4">
          <div className="text-xs font-mono text-[#43474D]">Patologias Críticas</div>
          <div className="text-2xl font-display font-bold tabular-nums text-[#B91C1C] mt-1">
            {criticalCount} ocorrência{criticalCount === 1 ? '' : 's'}
          </div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-4">
          <div className="text-xs font-mono text-[#43474D]">Normas de Referência</div>
          <div className="text-sm font-mono font-semibold text-[#0F2942] mt-2">
            NBR 13752 · NBR 6118 · NBR 8800
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 no-print">
        <div className="relative flex-1 max-w-md">
          <Search
            className="w-4 h-4 text-[#43474D] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrar por código LP, equipamento ou RA..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
            aria-label="Buscar laudos periciais"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1 p-1 bg-[#F1F5F9] border border-[#E2E8F0] rounded">
          {(['Todas', PathologySeverity.CRITICAL, PathologySeverity.MODERATE, PathologySeverity.CONTROLLED] as const).map(
            (sev) => {
              const active = severityFilter === sev;
              return (
                <button
                  key={sev}
                  type="button"
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#0F2942] text-white'
                      : 'text-[#43474D] hover:text-[#0F2942] hover:bg-white'
                  }`}
                >
                  {sev === 'Todas' ? 'Todas Severidades' : sev}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Split Workspace: Table + Dossier Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List / Table */}
        <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-lg overflow-hidden no-print">
          <div className="px-5 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between">
            <h2 className="text-sm font-display font-semibold text-[#0F2942]">
              Registro de Perícias Estruturais
            </h2>
            <span className="text-xs font-mono tabular-nums text-[#43474D]">
              {filteredReports.length} registros
            </span>
          </div>

          {filteredReports.length > 0 ? (
            <div className="divide-y divide-[#E2E8F0]">
              {filteredReports.map((report) => {
                const isSelected = activeReport?.id === report.id;
                return (
                  <button
                    key={report.id}
                    type="button"
                    onClick={() => setSelectedId(report.id)}
                    className={`w-full text-left px-5 py-4 transition-colors cursor-pointer block ${
                      isSelected ? 'bg-[#F0F4F8]' : 'bg-white hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#43474D]">
                        <span className="font-semibold text-[#0F2942]">{report.reportCode}</span>
                        <span aria-hidden="true">·</span>
                        <span>{report.ra}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{report.inspectionDate}</span>
                      </div>
                      <SeverityTag severity={report.severity} />
                    </div>
                    <h3 className="text-sm font-semibold text-[#111C2D]">{report.title}</h3>
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-2 text-xs text-[#43474D]">
                      <span>{report.pathologyType}</span>
                      <span className="font-mono text-[#0F2942]">{report.status}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-[#43474D]">
              Nenhum laudo técnico corresponde ao filtro aplicado.
            </div>
          )}
        </div>

        {/* Right Technical Dossier Inspector */}
        <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-lg overflow-hidden">
          {activeReport ? (
            <div>
              <div className="px-5 py-4 bg-[#0F2942] text-white flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#B0C9E8]">
                    <span>{activeReport.reportCode}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeReport.normReference}</span>
                  </div>
                  <h2 className="text-base font-display font-semibold mt-1">
                    {activeReport.assetName}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#163A5E] hover:bg-[#234E78] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer no-print"
                >
                  <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                  Imprimir
                </button>
              </div>

              <div className="p-5 space-y-4">
                <ForensicDiagram
                  element={activeReport.structuralElement}
                  reportCode={activeReport.reportCode}
                />

                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
                  <SeverityTag severity={activeReport.severity} />
                  <span className="text-xs font-mono text-[#43474D]">
                    {activeReport.engineerName} ({activeReport.creaNumber})
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-mono font-semibold text-[#43474D] uppercase mb-1">
                    Constatações de Campo
                  </h3>
                  <p className="text-sm text-[#111C2D] leading-relaxed">
                    {activeReport.technicalFindings}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-mono font-semibold text-[#43474D] uppercase mb-1">
                    Terapia &amp; Intervenção Recomendada
                  </h3>
                  <p className="text-sm text-[#111C2D] leading-relaxed">
                    {activeReport.recommendedAction}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
                    <div className="text-[11px] text-[#43474D]">Estimativa de Reparo</div>
                    <div className="text-sm font-mono font-semibold tabular-nums text-[#0F2942] mt-0.5">
                      {activeReport.estimatedRepairBrl === 0
                        ? 'Sem custo adicional'
                        : activeReport.estimatedRepairBrl.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            maximumFractionDigits: 0,
                          })}
                    </div>
                  </div>

                  <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
                    <div className="text-[11px] text-[#43474D]">Situação do Parecer</div>
                    <div className="text-sm font-semibold text-[#0F2942] mt-0.5">
                      {activeReport.status}
                    </div>
                  </div>
                </div>

                {/* Status Transition Actions */}
                <div className="pt-3 border-t border-[#E2E8F0] no-print">
                  <label className="block text-[11px] font-mono font-semibold text-[#43474D] mb-2">
                    ATUALIZAR SITUAÇÃO DO LAUDO
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Em Análise', 'Intervenção Recomendada', 'Laudo Emitido'] as const).map(
                      (st) => {
                        const isCurr = activeReport.status === st;
                        return (
                          <button
                            key={st}
                            type="button"
                            onClick={() => onUpdateReportStatus(activeReport.id, st)}
                            className={`px-2 py-2 text-[11px] font-medium rounded border transition-colors cursor-pointer ${
                              isCurr
                                ? 'bg-[#0F2942] text-white border-[#0F2942]'
                                : 'bg-white text-[#43474D] border-[#CBD5E1] hover:border-[#0F2942]'
                            }`}
                          >
                            {st}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-[#43474D]">
              <Shield className="w-8 h-8 text-[#94A3B8] mx-auto mb-2" aria-hidden="true" />
              Selecione um laudo para visualizar o dossiê estrutural completo.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

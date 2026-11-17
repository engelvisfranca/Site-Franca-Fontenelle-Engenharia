import React, { useState } from 'react';
import { Calendar, Check, FileText, MapPin, ShieldCheck, UserCheck, X } from 'lucide-react';
import { EquipmentStatus, PublicWork } from '../types/engineering';
import { EquipmentSchematic } from './SchematicIllustration';
import { StatusTag } from './WorkCard';

interface WorkDetailModalProps {
  work: PublicWork | null;
  onClose: () => void;
  onAddMeasurement: (workId: string, newProgress: number, title: string, notes: string) => void;
}

export const WorkDetailModal: React.FC<WorkDetailModalProps> = ({
  work,
  onClose,
  onAddMeasurement,
}) => {
  const [showMeasureForm, setShowMeasureForm] = useState(false);
  const [progressInput, setProgressInput] = useState<string>('');
  const [milestoneTitle, setMilestoneTitle] = useState('');
  const [milestoneNotes, setMilestoneNotes] = useState('');
  const [formError, setFormError] = useState('');

  React.useEffect(() => {
    if (work) {
      setProgressInput(String(Math.min(100, work.physicalProgress + 8)));
      setMilestoneTitle('');
      setMilestoneNotes('');
      setFormError('');
      setShowMeasureForm(false);
    }
  }, [work]);

  if (!work) return null;

  const handleSubmitMeasurement = (e: React.FormEvent) => {
    e.preventDefault();
    const numericProgress = Number(progressInput);
    if (Number.isNaN(numericProgress) || numericProgress < work.physicalProgress || numericProgress > 100) {
      setFormError(`Informe um percentual entre ${work.physicalProgress}% e 100%.`);
      return;
    }
    if (milestoneTitle.trim().length < 5) {
      setFormError('Descreva o marco da medição (mínimo 5 caracteres).');
      return;
    }
    onAddMeasurement(
      work.id,
      numericProgress,
      milestoneTitle.trim(),
      milestoneNotes.trim() || 'Medição física conferida em campo conforme memorial descritivo.'
    );
    setShowMeasureForm(false);
    setFormError('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: 'rgba(15, 41, 66, 0.45)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="work-modal-title"
    >
      <div className="bg-white border-2 border-[#0F2942] rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#0F2942] text-white flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#B0C9E8]">
              <span>{work.contractCode}</span>
              <span aria-hidden="true">·</span>
              <span>{work.ra}</span>
              <span aria-hidden="true">·</span>
              <span>{work.artCode}</span>
            </div>
            <h2 id="work-modal-title" className="text-xl font-display font-semibold text-white mt-1">
              {work.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#B0C9E8] hover:text-white hover:bg-[#163A5E] rounded transition-colors cursor-pointer"
            aria-label="Fechar ficha técnica"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5 border border-[#E2E8F0] rounded overflow-hidden flex flex-col">
              <EquipmentSchematic type={work.equipmentType} areaSqm={work.areaSqm} className="h-44" />
              <div className="p-4 bg-[#F8FAFC] flex-1 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#43474D]">Situação Atual</span>
                  <StatusTag status={work.status} />
                </div>
                <div className="flex items-center gap-2 text-[#111C2D]">
                  <MapPin className="w-3.5 h-3.5 text-[#0F2942] shrink-0" aria-hidden="true" />
                  <span>{work.locationDetail}</span>
                </div>
                <div className="flex items-center gap-2 text-[#111C2D]">
                  <UserCheck className="w-3.5 h-3.5 text-[#0F2942] shrink-0" aria-hidden="true" />
                  <span>{work.leadEngineer}</span>
                </div>
                <div className="flex items-center gap-2 text-[#111C2D]">
                  <Calendar className="w-3.5 h-3.5 text-[#0F2942] shrink-0" aria-hidden="true" />
                  <span className="font-mono tabular-nums">
                    {work.startDate} até {work.expectedEndDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xs font-mono font-semibold tracking-wider text-[#43474D] uppercase mb-1.5">
                  Memorial Descritivo Resumido
                </h3>
                <p className="text-sm text-[#111C2D] leading-relaxed">{work.technicalSummary}</p>
              </div>

              {/* Financial & Physical Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
                  <div className="text-[11px] text-[#43474D]">Avanço Físico</div>
                  <div className="text-xl font-display font-bold tabular-nums text-[#E05A2B] mt-0.5">
                    {work.physicalProgress}%
                  </div>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
                  <div className="text-[11px] text-[#43474D]">Valor Contratual</div>
                  <div className="text-sm font-mono font-semibold tabular-nums text-[#0F2942] mt-1">
                    {work.contractValueBrl.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      maximumFractionDigits: 0,
                    })}
                  </div>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
                  <div className="text-[11px] text-[#43474D]">Medido Acumulado</div>
                  <div className="text-sm font-mono font-semibold tabular-nums text-[#0F2942] mt-1">
                    {work.measuredValueBrl.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      maximumFractionDigits: 0,
                    })}
                  </div>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
                  <div className="text-[11px] text-[#43474D]">População Atendida</div>
                  <div className="text-sm font-mono font-semibold tabular-nums text-[#2E7D32] mt-1">
                    {work.beneficiariesEstimate.toLocaleString('pt-BR')} hab.
                  </div>
                </div>
              </div>

              {/* Technical Specs Table */}
              <div className="border border-[#E2E8F0] rounded overflow-hidden">
                <table className="w-full text-xs">
                  <tbody className="divide-y divide-[#E2E8F0]">
                    <tr>
                      <th className="text-left font-medium text-[#43474D] bg-[#F8FAFC] px-3 py-2 w-36">
                        Órgão Contratante
                      </th>
                      <td className="px-3 py-2 text-[#111C2D]">{work.contractingAgency}</td>
                    </tr>
                    <tr>
                      <th className="text-left font-medium text-[#43474D] bg-[#F8FAFC] px-3 py-2">
                        Sub-base
                      </th>
                      <td className="px-3 py-2 text-[#111C2D]">{work.specifications.subBase}</td>
                    </tr>
                    <tr>
                      <th className="text-left font-medium text-[#43474D] bg-[#F8FAFC] px-3 py-2">
                        Revestimento
                      </th>
                      <td className="px-3 py-2 text-[#111C2D]">{work.specifications.surfaceMaterial}</td>
                    </tr>
                    <tr>
                      <th className="text-left font-medium text-[#43474D] bg-[#F8FAFC] px-3 py-2">
                        Drenagem
                      </th>
                      <td className="px-3 py-2 text-[#111C2D]">{work.specifications.drainage}</td>
                    </tr>
                    <tr>
                      <th className="text-left font-medium text-[#43474D] bg-[#F8FAFC] px-3 py-2">
                        Norma Aplicável
                      </th>
                      <td className="px-3 py-2 font-mono text-[#0F2942]">
                        {work.specifications.normativeCompliance}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Execution Timeline Section */}
          <div className="pt-4 border-t border-[#E2E8F0]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="text-base font-display font-semibold text-[#0F2942]">
                  Linha do Tempo de Execução &amp; Marcos Físicos
                </h3>
                <p className="text-xs text-[#43474D]">
                  Histórico auditável de vistorias, ARTs vinculadas e boletins de medição física.
                </p>
              </div>
              {work.status !== EquipmentStatus.COMPLETED && (
                <button
                  type="button"
                  onClick={() => setShowMeasureForm((prev) => !prev)}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-[#E05A2B] hover:bg-[#AB3504] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {showMeasureForm ? 'Cancelar Registro' : 'Registrar Avanço / Medição'}
                </button>
              )}
            </div>

            {showMeasureForm && (
              <form
                onSubmit={handleSubmitMeasurement}
                className="mb-6 p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded space-y-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#111C2D] mb-1">
                      Novo Avanço Físico (%)
                    </label>
                    <input
                      type="number"
                      min={work.physicalProgress}
                      max={100}
                      value={progressInput}
                      onChange={(e) => setProgressInput(e.target.value)}
                      className="w-full px-3 py-2 text-sm font-mono bg-white border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#111C2D] mb-1">
                      Descrição do Boletim / Etapa Medida
                    </label>
                    <input
                      type="text"
                      value={milestoneTitle}
                      onChange={(e) => setMilestoneTitle(e.target.value)}
                      placeholder="Ex: Medição 05 — Preenchimento com areia quartzosa e elastômero"
                      className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111C2D] mb-1">
                    Notas Técnicas de Vistoria
                  </label>
                  <textarea
                    rows={2}
                    value={milestoneNotes}
                    onChange={(e) => setMilestoneNotes(e.target.value)}
                    placeholder="Registro de ensaios, conformidade normativa ou pendências observadas..."
                    className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
                  />
                </div>
                {formError && <p className="text-xs font-medium text-[#B91C1C]">{formError}</p>}
                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0F2942] hover:bg-[#163A5E] rounded cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    Confirmar Medição no Diário
                  </button>
                </div>
              </form>
            )}

            {/* Vertical Solid Timeline (#E2E8F0) with 12px nodes */}
            <div className="relative pl-6 space-y-5">
              <div
                className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-[#E2E8F0]"
                aria-hidden="true"
              />
              {work.milestones.map((m) => {
                const nodeClass =
                  m.state === 'approved'
                    ? 'bg-[#2E7D32] border-[#2E7D32]'
                    : m.state === 'active'
                    ? 'bg-[#E05A2B] border-[#E05A2B]'
                    : 'bg-white border-[#0F2942]';

                return (
                  <div key={m.id} className="relative">
                    <span
                      className={`absolute -left-6 top-1.5 w-3 h-3 rounded-full border-2 ${nodeClass}`}
                      aria-hidden="true"
                    />
                    <div className="bg-white border border-[#E2E8F0] rounded p-3.5">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#43474D] mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#0F2942]">{m.date}</span>
                          {m.artNumber && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="inline-flex items-center gap-1 text-[#0F2942]">
                                <ShieldCheck className="w-3 h-3 text-[#2E7D32]" aria-hidden="true" />
                                {m.artNumber}
                              </span>
                            </>
                          )}
                        </div>
                        <span className="text-[11px]">
                          {m.state === 'approved'
                            ? 'Inspecionado e Aprovado'
                            : m.state === 'active'
                            ? 'Medição Ativa'
                            : 'Etapa Programada'}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-[#111C2D]">{m.title}</h4>
                      <p className="text-xs text-[#43474D] mt-1">{m.notes}</p>
                      <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t border-[#F1F5F9] text-[11px] text-[#43474D]">
                        <span>Responsável: {m.inspector}</span>
                        {m.attachmentName && (
                          <span className="inline-flex items-center gap-1 font-mono text-[#0F2942]">
                            <FileText className="w-3 h-3" aria-hidden="true" />
                            {m.attachmentName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { ADMINISTRATIVE_REGIONS } from '../data/mockEngineeringData';
import {
  AdministrativeRegion,
  EquipmentStatus,
  ForensicReport,
  PathologySeverity,
  PublicWork,
} from '../types/engineering';

interface NewMeasurementModalProps {
  isOpen: boolean;
  works: PublicWork[];
  onClose: () => void;
  onSubmit: (workId: string, newProgress: number, title: string, notes: string) => void;
}

export const NewMeasurementModal: React.FC<NewMeasurementModalProps> = ({
  isOpen,
  works,
  onClose,
  onSubmit,
}) => {
  const activeWorks = works.filter((w) => w.status !== EquipmentStatus.COMPLETED);
  const [selectedWorkId, setSelectedWorkId] = useState(activeWorks[0]?.id ?? works[0]?.id ?? '');
  const selectedWork = works.find((w) => w.id === selectedWorkId) ?? works[0];

  const [progress, setProgress] = useState(
    String(Math.min(100, (selectedWork?.physicalProgress ?? 0) + 10))
  );
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (selectedWork) {
      setProgress(String(Math.min(100, selectedWork.physicalProgress + 10)));
      setError('');
    }
  }, [selectedWorkId, isOpen]);

  if (!isOpen || !selectedWork) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(progress);
    if (Number.isNaN(num) || num < selectedWork.physicalProgress || num > 100) {
      setError(`Percentual inválido. Informe entre ${selectedWork.physicalProgress}% e 100%.`);
      return;
    }
    if (title.trim().length < 5) {
      setError('Informe a identificação do boletim de medição (mínimo 5 caracteres).');
      return;
    }
    onSubmit(
      selectedWork.id,
      num,
      title.trim(),
      notes.trim() || 'Boletim de medição aprovado pela fiscalização técnica.'
    );
    setTitle('');
    setNotes('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15, 41, 66, 0.45)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-measurement-title"
    >
      <div className="bg-white border-2 border-[#0F2942] rounded-lg w-full max-w-lg overflow-hidden">
        <div className="px-5 py-4 bg-[#0F2942] text-white flex items-center justify-between">
          <div>
            <p className="text-[11px] font-mono text-[#B0C9E8]">BOLETIM DE AVANÇO FÍSICO</p>
            <h2 id="new-measurement-title" className="text-lg font-display font-semibold">
              Registrar Nova Medição
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#B0C9E8] hover:text-white rounded cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#111C2D] mb-1">
              Contrato / Equipamento Público
            </label>
            <select
              value={selectedWorkId}
              onChange={(e) => setSelectedWorkId(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
            >
              {works.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.contractCode} ({w.physicalProgress}%) — {w.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#111C2D] mb-1">
                Medição Atual
              </label>
              <div className="px-3 py-2 text-sm font-mono tabular-nums bg-[#F1F5F9] border border-[#E2E8F0] rounded text-[#43474D]">
                {selectedWork.physicalProgress}%
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#111C2D] mb-1">
                Novo Avanço Acumulado (%)
              </label>
              <input
                type="number"
                min={selectedWork.physicalProgress}
                max={100}
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-white border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#111C2D] mb-1">
              Boletim / Marco Executado
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Medição 05 — Colagem e infill do gramado sintético"
              className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#111C2D] mb-1">
              Observações de Fiscalização
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anotações sobre ensaios, ART vinculada ou conformidade técnica..."
              className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
            />
          </div>

          {error && <p className="text-xs font-medium text-[#B91C1C]">{error}</p>}

          <div className="flex justify-end gap-2 pt-2 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#43474D] border border-[#CBD5E1] rounded cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#E05A2B] hover:bg-[#AB3504] rounded cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
              Aprovar Medição
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface NewForensicReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (report: Omit<ForensicReport, 'id' | 'reportCode' | 'inspectionDate'>) => void;
}

export const NewForensicReportModal: React.FC<NewForensicReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [ra, setRa] = useState<AdministrativeRegion>('RA-I Plano Piloto');
  const [assetName, setAssetName] = useState('');
  const [pathologyType, setPathologyType] = useState('');
  const [severity, setSeverity] = useState<PathologySeverity>(PathologySeverity.MODERATE);
  const [normReference, setNormReference] = useState('ABNT NBR 13752 / NBR 6118');
  const [structuralElement, setStructuralElement] = useState<
    'pillar' | 'slab' | 'truss' | 'retaining-wall'
  >('slab');
  const [technicalFindings, setTechnicalFindings] = useState('');
  const [recommendedAction, setRecommendedAction] = useState('');
  const [estimatedRepairBrl, setEstimatedRepairBrl] = useState('18500');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 5 || assetName.trim().length < 3) return;

    onSubmit({
      title: title.trim(),
      ra,
      assetName: assetName.trim(),
      pathologyType: pathologyType.trim() || 'Anomalia estrutural inspecionada',
      severity,
      status:
        severity === PathologySeverity.CRITICAL ? 'Intervenção Recomendada' : 'Em Análise',
      normReference: normReference.trim() || 'ABNT NBR 13752',
      engineerName: 'Eng. Camila Fontenelle',
      creaNumber: 'CREA-DF 21.045/D',
      structuralElement,
      technicalFindings:
        technicalFindings.trim() ||
        'Inspeção visual e ensaio instrumental realizados conforme protocolo ABNT.',
      recommendedAction:
        recommendedAction.trim() || 'Executar plano corretivo especificado no memorial anexo.',
      estimatedRepairBrl: Math.max(0, Number(estimatedRepairBrl) || 0),
    });

    setTitle('');
    setAssetName('');
    setPathologyType('');
    setTechnicalFindings('');
    setRecommendedAction('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15, 41, 66, 0.45)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-report-title"
    >
      <div className="bg-white border-2 border-[#0F2942] rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="px-5 py-4 bg-[#0F2942] text-white flex items-center justify-between">
          <div>
            <p className="text-[11px] font-mono text-[#B0C9E8]">NÚCLEO DE PERÍCIAS F&amp;F</p>
            <h2 id="new-report-title" className="text-lg font-display font-semibold">
              Emitir Novo Laudo Pericial
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#B0C9E8] hover:text-white rounded cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#111C2D] mb-1">
                Título do Laudo Técnico
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Vistoria de Recalque em Piso Intertravado — Quadra 12"
                className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#111C2D] mb-1">
                Região Administrativa
              </label>
              <select
                value={ra}
                onChange={(e) => setRa(e.target.value as AdministrativeRegion)}
                className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
              >
                {ADMINISTRATIVE_REGIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#111C2D] mb-1">
                Equipamento / Ativo Inspecionado
              </label>
              <input
                type="text"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                placeholder="Ex: Quadra Coberta QNM 18"
                className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#111C2D] mb-1">
                Severidade da Patologia
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as PathologySeverity)}
                className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
              >
                <option value={PathologySeverity.CRITICAL}>Crítica</option>
                <option value={PathologySeverity.MODERATE}>Moderada</option>
                <option value={PathologySeverity.CONTROLLED}>Monitorada</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#111C2D] mb-1">
                Elemento Estrutural
              </label>
              <select
                value={structuralElement}
                onChange={(e) =>
                  setStructuralElement(
                    e.target.value as 'pillar' | 'slab' | 'truss' | 'retaining-wall'
                  )
                }
                className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
              >
                <option value="slab">Laje / Radier / Junta</option>
                <option value="pillar">Pilar / Base Metálica</option>
                <option value="retaining-wall">Muro de Arrimo / Contenção</option>
                <option value="truss">Rampa / Cobertura / Acessibilidade</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#111C2D] mb-1">
                Norma ABNT Aplicada
              </label>
              <input
                type="text"
                value={normReference}
                onChange={(e) => setNormReference(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono bg-white border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#111C2D] mb-1">
                Estimativa de Reparo (R$)
              </label>
              <input
                type="number"
                min={0}
                value={estimatedRepairBrl}
                onChange={(e) => setEstimatedRepairBrl(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono bg-white border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#111C2D] mb-1">
              Classificação da Patologia
            </label>
            <input
              type="text"
              value={pathologyType}
              onChange={(e) => setPathologyType(e.target.value)}
              placeholder="Ex: Fissura por retração térmica, corrosão em armadura, recalque..."
              className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#111C2D] mb-1">
              Constatações de Campo
            </label>
            <textarea
              rows={2}
              value={technicalFindings}
              onChange={(e) => setTechnicalFindings(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#111C2D] mb-1">
              Intervenção Recomendada
            </label>
            <textarea
              rows={2}
              value={recommendedAction}
              onChange={(e) => setRecommendedAction(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#43474D] border border-[#CBD5E1] rounded cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0F2942] hover:bg-[#163A5E] rounded cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
              Registrar Laudo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

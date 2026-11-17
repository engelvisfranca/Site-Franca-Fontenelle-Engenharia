import React, { useState } from 'react';
import {
  CheckCircle2,
  CloudSun,
  Database,
  Plus,
  RefreshCw,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { FieldDiaryEntry, PublicWork, SyncConnector } from '../types/engineering';

interface DiarySyncScreenProps {
  works: PublicWork[];
  diaryEntries: FieldDiaryEntry[];
  connectors: SyncConnector[];
  onSyncConnector: (connectorId: string) => void;
  onSyncAll: () => void;
  onAddDiaryEntry: (entry: Omit<FieldDiaryEntry, 'id' | 'syncedToNotion'>) => void;
}

export const DiarySyncScreen: React.FC<DiarySyncScreenProps> = ({
  works,
  diaryEntries,
  connectors,
  onSyncConnector,
  onSyncAll,
  onAddDiaryEntry,
}) => {
  const [contractFilter, setContractFilter] = useState<string>('Todos');
  const [showForm, setShowForm] = useState(false);

  const [selectedWorkId, setSelectedWorkId] = useState(works[0]?.id ?? '');
  const [weather, setWeather] = useState<'Tempo Firme' | 'Nublado' | 'Chuva Moderada'>('Tempo Firme');
  const [crewCount, setCrewCount] = useState('12');
  const [equipmentDeployed, setEquipmentDeployed] = useState('');
  const [summary, setSummary] = useState('');
  const [author, setAuthor] = useState('Eng. Elvis França');

  const filteredDiary = diaryEntries.filter(
    (entry) => contractFilter === 'Todos' || entry.contractCode === contractFilter
  );

  const handleSubmitEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const targetWork = works.find((w) => w.id === selectedWorkId) || works[0];
    if (!targetWork || summary.trim().length < 8) return;

    const today = new Date().toLocaleDateString('pt-BR');
    onAddDiaryEntry({
      date: today,
      contractCode: targetWork.contractCode,
      workTitle: targetWork.title,
      ra: targetWork.ra,
      weather,
      crewCount: Math.max(1, Number(crewCount) || 8),
      equipmentDeployed: equipmentDeployed.trim() || 'Equipamentos padrão de frente de serviço',
      summary: summary.trim(),
      author: author.trim() || 'Eng. Elvis França',
    });

    setEquipmentDeployed('');
    setSummary('');
    setShowForm(false);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-5 md:px-12 py-10 space-y-8 pb-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E2E8F0] pb-6">
        <div>
          <p className="text-xs font-mono font-semibold tracking-wider text-[#43474D]">
            RASTREABILIDADE DE CAMPO · INTEGRAÇÃO NOTION &amp; API DE FISCALIZAÇÃO
          </p>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-[#001428] mt-1">
            Diário de Obras &amp; Sincronização Técnica
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onSyncAll}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0F2942] bg-white border-[1.5px] border-[#0F2942] hover:bg-[#F1F5F9] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
            Sincronizar Bases
          </button>
          <button
            type="button"
            onClick={() => setShowForm((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#E05A2B] hover:bg-[#AB3504] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
            {showForm ? 'Fechar Formulário' : 'Novo Registro de Campo'}
          </button>
        </div>
      </div>

      {/* Notion / API Sync Connectors Grid */}
      <section aria-labelledby="sync-section-title">
        <div className="flex items-center justify-between mb-4">
          <h2 id="sync-section-title" className="text-base font-display font-semibold text-[#0F2942]">
            Módulos de Sincronização &amp; Integridade Documental
          </h2>
          <span className="text-xs font-mono text-[#43474D]">
            Backup técnico automático após cada boletim
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {connectors.map((conn) => {
            const isSyncing = conn.status === 'Sincronizando';
            return (
              <div key={conn.id} className="card-technical p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#0F2942]">
                      <Database className="w-3.5 h-3.5" aria-hidden="true" />
                      {conn.databaseId}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono font-semibold rounded border ${
                        isSyncing
                          ? 'bg-[#FFF7ED] text-[#C2410C] border-[#FDBA74]'
                          : 'bg-[#F0FDF4] text-[#15803D] border-[#86EFAC]'
                      }`}
                    >
                      {isSyncing ? (
                        <RefreshCw className="w-3 h-3 animate-spin" aria-hidden="true" />
                      ) : (
                        <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                      )}
                      {conn.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-display font-semibold text-[#111C2D]">
                    {conn.name}
                  </h3>
                  <p className="text-xs text-[#43474D] mt-1">{conn.endpointLabel}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E2E8F0] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono tabular-nums text-[#43474D]">
                    <span>Último backup: {conn.lastSyncAt}</span>
                    <span className="font-semibold text-[#0F2942]">{conn.recordsCount} reg.</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#43474D]">
                      <ShieldCheck className="w-3 h-3 text-[#2E7D32]" aria-hidden="true" />
                      {conn.checksum}
                    </span>
                    <button
                      type="button"
                      disabled={isSyncing}
                      onClick={() => onSyncConnector(conn.id)}
                      className="px-2.5 py-1 text-xs font-medium text-[#0F2942] border border-[#CBD5E1] hover:border-[#0F2942] rounded transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {isSyncing ? 'Sincronizando...' : 'Sincronizar'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* New Field Diary Form */}
      {showForm && (
        <form
          onSubmit={handleSubmitEntry}
          className="bg-white border-2 border-[#0F2942] rounded-lg p-5 space-y-4"
        >
          <h3 className="text-base font-display font-semibold text-[#0F2942]">
            Registrar Ocorrência no Diário de Obras
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-[#111C2D] mb-1">
                Contrato / Obra
              </label>
              <select
                value={selectedWorkId}
                onChange={(e) => setSelectedWorkId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
              >
                {works.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.contractCode} — {w.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#111C2D] mb-1">
                Condição Climática
              </label>
              <select
                value={weather}
                onChange={(e) =>
                  setWeather(e.target.value as 'Tempo Firme' | 'Nublado' | 'Chuva Moderada')
                }
                className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
              >
                <option value="Tempo Firme">Tempo Firme</option>
                <option value="Nublado">Nublado</option>
                <option value="Chuva Moderada">Chuva Moderada</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#111C2D] mb-1">
                Efetivo em Campo (Operários)
              </label>
              <input
                type="number"
                min={1}
                max={120}
                value={crewCount}
                onChange={(e) => setCrewCount(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono bg-[#F8FAFC] border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-[#111C2D] mb-1">
                Equipamentos Mobilizados
              </label>
              <input
                type="text"
                value={equipmentDeployed}
                onChange={(e) => setEquipmentDeployed(e.target.value)}
                placeholder="Ex: Compactador vibratório, nível a laser, caminhão basculante"
                className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#111C2D] mb-1">
                Engenheiro Responsável
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#111C2D] mb-1">
              Relato Técnico das Atividades Executadas
            </label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Descreva frentes de serviço, quantitativos executados no dia, ensaios ou ocorrências..."
              className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-xs font-medium text-[#43474D] border border-[#CBD5E1] rounded cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0F2942] hover:bg-[#163A5E] rounded cursor-pointer"
            >
              Salvar no Diário &amp; Enfileirar Notion
            </button>
          </div>
        </form>
      )}

      {/* Chronological Field Diary Log */}
      <section className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-display font-semibold text-[#0F2942]">
              Registros Cronológicos do Diário de Obras
            </h2>
            <p className="text-xs text-[#43474D]">
              Apontamentos diários de efetivo, clima e progresso executivo
            </p>
          </div>

          <select
            value={contractFilter}
            onChange={(e) => setContractFilter(e.target.value)}
            aria-label="Filtrar diário por contrato"
            className="px-3 py-1.5 text-xs font-mono bg-[#F8FAFC] border border-[#CBD5E1] rounded focus:outline-none focus:border-[#0F2942]"
          >
            <option value="Todos">Todos os Contratos ({diaryEntries.length})</option>
            {works.map((w) => (
              <option key={w.id} value={w.contractCode}>
                {w.contractCode} · {w.ra}
              </option>
            ))}
          </select>
        </div>

        <div className="divide-y divide-[#E2E8F0]">
          {filteredDiary.map((entry) => (
            <article key={entry.id} className="p-5 hover:bg-[#F8FAFC] transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#43474D] mb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-[#0F2942] tabular-nums">{entry.date}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-[#0F2942]">{entry.contractCode}</span>
                  <span aria-hidden="true">·</span>
                  <span>{entry.ra}</span>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] rounded border ${
                    entry.syncedToNotion
                      ? 'bg-[#F0FDF4] text-[#15803D] border-[#86EFAC]'
                      : 'bg-[#FFF7ED] text-[#C2410C] border-[#FDBA74]'
                  }`}
                >
                  {entry.syncedToNotion ? 'Sincronizado Notion' : 'Aguardando Sync'}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-[#111C2D]">{entry.workTitle}</h3>
              <p className="text-sm text-[#43474D] mt-1.5 leading-relaxed">{entry.summary}</p>

              <div className="flex flex-wrap items-center gap-5 mt-3 pt-3 border-t border-[#F1F5F9] text-xs text-[#43474D]">
                <span className="inline-flex items-center gap-1.5">
                  <CloudSun className="w-3.5 h-3.5 text-[#0F2942]" aria-hidden="true" />
                  {entry.weather}
                </span>
                <span className="inline-flex items-center gap-1.5 tabular-nums">
                  <Users className="w-3.5 h-3.5 text-[#0F2942]" aria-hidden="true" />
                  {entry.crewCount} colaboradores
                </span>
                <span>Equipamentos: {entry.equipmentDeployed}</span>
                <span className="ml-auto font-mono text-[#0F2942]">{entry.author}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

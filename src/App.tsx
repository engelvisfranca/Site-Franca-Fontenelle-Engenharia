/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { NewForensicReportModal, NewMeasurementModal } from './components/ActionModals';
import { DiarySyncScreen } from './components/DiarySyncScreen';
import { ForensicScreen } from './components/ForensicScreen';
import { ActiveTab, Header } from './components/Header';
import { OverviewScreen } from './components/OverviewScreen';
import { WorkDetailModal } from './components/WorkDetailModal';
import { WorksScreen } from './components/WorksScreen';
import {
  INITIAL_FIELD_DIARY,
  INITIAL_FORENSIC_REPORTS,
  INITIAL_PUBLIC_WORKS,
  INITIAL_SYNC_CONNECTORS,
} from './data/mockEngineeringData';
import {
  AdministrativeRegion,
  EquipmentStatus,
  FieldDiaryEntry,
  ForensicReport,
  PublicWork,
  SyncConnector,
} from './types/engineering';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [works, setWorks] = useState<PublicWork[]>(INITIAL_PUBLIC_WORKS);
  const [reports, setReports] = useState<ForensicReport[]>(INITIAL_FORENSIC_REPORTS);
  const [diaryEntries, setDiaryEntries] = useState<FieldDiaryEntry[]>(INITIAL_FIELD_DIARY);
  const [connectors, setConnectors] = useState<SyncConnector[]>(INITIAL_SYNC_CONNECTORS);

  const [selectedRaFilter, setSelectedRaFilter] = useState<AdministrativeRegion | 'Todas'>('Todas');
  const [inspectedWorkId, setInspectedWorkId] = useState<string | null>(null);
  const [isNewMeasurementOpen, setIsNewMeasurementOpen] = useState(false);
  const [isNewReportOpen, setIsNewReportOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const inspectedWork = works.find((w) => w.id === inspectedWorkId) || null;

  const handleNavigateToWorks = (ra?: AdministrativeRegion) => {
    if (ra) {
      setSelectedRaFilter(ra);
    }
    setActiveTab('works');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddMeasurement = (
    workId: string,
    newProgress: number,
    title: string,
    notes: string
  ) => {
    const today = new Date().toLocaleDateString('pt-BR');
    const newArt = `ART-DF2026${Math.floor(100000 + Math.random() * 899999)}`;

    setWorks((prev) =>
      prev.map((work) => {
        if (work.id !== workId) return work;

        const isCompleted = newProgress >= 100;
        const updatedMeasuredValue = Math.round((work.contractValueBrl * newProgress) / 100);

        const updatedMilestones = work.milestones.map((m) =>
          m.state === 'active' ? { ...m, state: 'approved' as const } : m
        );

        updatedMilestones.push({
          id: `m-${Date.now()}`,
          title,
          date: today,
          artNumber: newArt,
          inspector: work.leadEngineer.split(' (')[0],
          notes,
          attachmentName: `Boletim_${work.contractCode.replace('/', '_')}_${newProgress}pct.pdf`,
          state: isCompleted ? 'approved' : 'active',
        });

        return {
          ...work,
          physicalProgress: newProgress,
          measuredValueBrl: updatedMeasuredValue,
          status: isCompleted ? EquipmentStatus.COMPLETED : work.status,
          milestones: updatedMilestones,
        };
      })
    );

    const target = works.find((w) => w.id === workId);
    showToast(
      `Medição de ${newProgress}% registrada em ${target?.contractCode ?? 'contrato'}.`
    );
  };

  const handleAddReport = (
    reportData: Omit<ForensicReport, 'id' | 'reportCode' | 'inspectionDate'>
  ) => {
    const nextNumber = String(reports.length + 15).padStart(3, '0');
    const today = new Date().toLocaleDateString('pt-BR');
    const created: ForensicReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
      reportCode: `LP-2026/${nextNumber}`,
      inspectionDate: today,
    };

    setReports((prev) => [created, ...prev]);
    showToast(`Laudo pericial ${created.reportCode} emitido com sucesso.`);
  };

  const handleUpdateReportStatus = (
    reportId: string,
    newStatus: 'Em Análise' | 'Laudo Emitido' | 'Intervenção Recomendada'
  ) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: newStatus } : r))
    );
    showToast(`Situação do laudo atualizada para "${newStatus}".`);
  };

  const handleAddDiaryEntry = (entry: Omit<FieldDiaryEntry, 'id' | 'syncedToNotion'>) => {
    const created: FieldDiaryEntry = {
      ...entry,
      id: `d-${Date.now()}`,
      syncedToNotion: false,
    };
    setDiaryEntries((prev) => [created, ...prev]);
    showToast(`Apontamento registrado no Diário de Obras (${entry.contractCode}).`);
  };

  const handleSyncConnector = (connectorId: string) => {
    setConnectors((prev) =>
      prev.map((c) => (c.id === connectorId ? { ...c, status: 'Sincronizando' } : c))
    );

    window.setTimeout(() => {
      const now = new Date();
      const timeLabel = `${now.toLocaleDateString('pt-BR')} às ${now
        .toTimeString()
        .slice(0, 5)}`;
      const hashFragment = Math.random().toString(16).slice(2, 6);

      setConnectors((prev) =>
        prev.map((c) =>
          c.id === connectorId
            ? {
                ...c,
                status: 'Sincronizado',
                lastSyncAt: timeLabel,
                recordsCount:
                  c.id === 'sync-notion' ? diaryEntries.length + 144 : c.recordsCount + 1,
                checksum: `SHA256:${hashFragment}...9f2a`,
              }
            : c
        )
      );

      if (connectorId === 'sync-notion') {
        setDiaryEntries((prev) => prev.map((e) => ({ ...e, syncedToNotion: true })));
      }

      showToast('Base técnica sincronizada e validada com integridade.');
    }, 650);
  };

  const handleSyncAll = () => {
    connectors.forEach((c) => handleSyncConnector(c.id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#111C2D]">
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenNewMeasurement={() => setIsNewMeasurementOpen(true)}
      />

      <main className="flex-1">
        {activeTab === 'overview' && (
          <OverviewScreen
            works={works}
            reportsCount={reports.length}
            selectedMapRa={selectedRaFilter}
            onSelectMapRa={(ra) => setSelectedRaFilter(ra)}
            onNavigateToWorks={handleNavigateToWorks}
            onNavigateToForensic={() => {
              setActiveTab('forensic');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onInspectWork={(work) => setInspectedWorkId(work.id)}
          />
        )}

        {activeTab === 'works' && (
          <WorksScreen
            works={works}
            initialRaFilter={selectedRaFilter}
            onRaFilterChange={(ra) => setSelectedRaFilter(ra)}
            onInspectWork={(work) => setInspectedWorkId(work.id)}
          />
        )}

        {activeTab === 'forensic' && (
          <ForensicScreen
            reports={reports}
            onOpenNewReport={() => setIsNewReportOpen(true)}
            onUpdateReportStatus={handleUpdateReportStatus}
          />
        )}

        {activeTab === 'diary' && (
          <DiarySyncScreen
            works={works}
            diaryEntries={diaryEntries}
            connectors={connectors}
            onSyncConnector={handleSyncConnector}
            onSyncAll={handleSyncAll}
            onAddDiaryEntry={handleAddDiaryEntry}
          />
        )}
      </main>

      {/* Quiet Institutional Footer */}
      <footer className="bg-white border-t border-[#E2E8F0] no-print">
        <div className="max-w-[1360px] mx-auto px-5 md:px-12 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-display font-bold text-[#0F2942]">
              Franca &amp; Fontenelle Engenharia Ltda.
            </div>
            <p className="text-xs text-[#43474D] mt-0.5">
              Brasília · Distrito Federal · Obras Públicas, Infraestrutura Esportiva e Assessoria
              Pericial
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-xs text-[#43474D]">
            <button
              type="button"
              onClick={() => setActiveTab('works')}
              className="hover:text-[#0F2942] cursor-pointer"
            >
              Contratos DF
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('forensic')}
              className="hover:text-[#0F2942] cursor-pointer"
            >
              Laudos ABNT
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('diary')}
              className="hover:text-[#0F2942] cursor-pointer"
            >
              Diário de Obras
            </button>
            <span className="font-mono text-[#0F2942]">CREA-DF · 2026</span>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 bg-[#0F2942] text-white px-4 py-3 rounded shadow-lg border border-[#314863] flex items-center gap-3 max-w-md no-print"
        >
          <CheckCircle2 className="w-4 h-4 text-[#88D982] shrink-0" aria-hidden="true" />
          <span className="text-xs font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-[#B0C9E8] hover:text-white cursor-pointer"
            aria-label="Dispensar aviso"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Detail & Action Modals */}
      <WorkDetailModal
        work={inspectedWork}
        onClose={() => setInspectedWorkId(null)}
        onAddMeasurement={handleAddMeasurement}
      />

      <NewMeasurementModal
        isOpen={isNewMeasurementOpen}
        works={works}
        onClose={() => setIsNewMeasurementOpen(false)}
        onSubmit={handleAddMeasurement}
      />

      <NewForensicReportModal
        isOpen={isNewReportOpen}
        onClose={() => setIsNewReportOpen(false)}
        onSubmit={handleAddReport}
      />
    </div>
  );
}

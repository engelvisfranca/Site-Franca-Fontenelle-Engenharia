export enum EquipmentStatus {
  IN_PROGRESS = 'Em Execução',
  COMPLETED = 'Concluído / Entregue',
  INSPECTION = 'Perícia / Patologia',
}

export enum EquipmentType {
  SYNTHETIC_FIELD = 'Campo Sintético',
  PEC = 'PEC Comunitário',
  CALISTHENICS = 'Estação de Calistenia',
  MULTISPORT_COURT = 'Quadra Poliesportiva',
  CIVIC_PLAZA = 'Praça Cívica',
}

export type AdministrativeRegion =
  | 'RA-I Plano Piloto'
  | 'RA-III Taguatinga'
  | 'RA-IX Ceilândia'
  | 'RA-X Guará'
  | 'RA-XII Samambaia'
  | 'RA-XV Recanto das Emas';

export type MilestoneState = 'approved' | 'active' | 'upcoming';

export interface WorkMilestone {
  id: string;
  title: string;
  date: string;
  artNumber?: string;
  inspector: string;
  notes: string;
  attachmentName?: string;
  state: MilestoneState;
}

export interface PublicWork {
  id: string;
  contractCode: string;
  title: string;
  ra: AdministrativeRegion;
  locationDetail: string;
  equipmentType: EquipmentType;
  status: EquipmentStatus;
  physicalProgress: number;
  contractValueBrl: number;
  measuredValueBrl: number;
  areaSqm: number;
  beneficiariesEstimate: number;
  startDate: string;
  expectedEndDate: string;
  artCode: string;
  leadEngineer: string;
  contractingAgency: string;
  technicalSummary: string;
  specifications: {
    subBase: string;
    surfaceMaterial: string;
    drainage: string;
    normativeCompliance: string;
  };
  milestones: WorkMilestone[];
}

export enum PathologySeverity {
  CRITICAL = 'Crítica',
  MODERATE = 'Moderada',
  CONTROLLED = 'Monitorada',
}

export interface ForensicReport {
  id: string;
  reportCode: string;
  title: string;
  ra: AdministrativeRegion;
  assetName: string;
  pathologyType: string;
  severity: PathologySeverity;
  status: 'Em Análise' | 'Laudo Emitido' | 'Intervenção Recomendada';
  normReference: string;
  inspectionDate: string;
  engineerName: string;
  creaNumber: string;
  structuralElement: 'pillar' | 'slab' | 'truss' | 'retaining-wall';
  technicalFindings: string;
  recommendedAction: string;
  estimatedRepairBrl: number;
}

export interface FieldDiaryEntry {
  id: string;
  date: string;
  contractCode: string;
  workTitle: string;
  ra: AdministrativeRegion;
  weather: 'Tempo Firme' | 'Nublado' | 'Chuva Moderada';
  crewCount: number;
  equipmentDeployed: string;
  summary: string;
  author: string;
  syncedToNotion: boolean;
}

export interface SyncConnector {
  id: string;
  name: string;
  endpointLabel: string;
  databaseId: string;
  lastSyncAt: string;
  recordsCount: number;
  checksum: string;
  status: 'Sincronizado' | 'Sincronizando' | 'Pendente';
}

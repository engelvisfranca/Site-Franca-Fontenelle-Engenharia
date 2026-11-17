import React from 'react';
import { AdministrativeRegion, EquipmentType, PublicWork } from '../types/engineering';

interface EquipmentSchematicProps {
  type: EquipmentType;
  areaSqm: number;
  className?: string;
}

export const EquipmentSchematic: React.FC<EquipmentSchematicProps> = ({
  type,
  areaSqm,
  className = '',
}) => {
  return (
    <div
      className={`relative overflow-hidden bg-[#F0F4F8] border-b border-[#E2E8F0] select-none ${className}`}
      aria-label={`Planta esquemática de ${type}`}
    >
      {/* Subtle architectural drafting grid */}
      <svg
        viewBox="0 0 400 180"
        className="w-full h-full block"
        role="img"
        aria-label={`Desenho técnico: ${type} (${areaSqm.toLocaleString('pt-BR')} m²)`}
      >
        <defs>
          <pattern id={`grid-${type}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#CBD5E1" strokeWidth="0.5" strokeOpacity="0.6" />
          </pattern>
        </defs>
        <rect width="400" height="180" fill="#F8FAFC" />
        <rect width="400" height="180" fill={`url(#grid-${type})`} />

        {/* Border frame & corner ticks */}
        <rect x="12" y="12" width="376" height="156" fill="none" stroke="#94A3B8" strokeWidth="0.8" />
        <text
          x="22"
          y="26"
          fill="#475569"
          fontSize="8.5"
          fontFamily="IBM Plex Mono, monospace"
          fontWeight="500"
        >
          PLANTA TÉCNICA · {areaSqm.toLocaleString('pt-BR')} M²
        </text>

        {type === EquipmentType.SYNTHETIC_FIELD && (
          <g>
            {/* Turf field */}
            <rect x="64" y="38" width="272" height="112" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5" />
            {/* Drainage herringbone lines */}
            <line x1="84" y1="94" x2="316" y2="94" stroke="#81C784" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="120" y1="54" x2="145" y2="94" stroke="#81C784" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="180" y1="54" x2="205" y2="94" stroke="#81C784" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="240" y1="54" x2="265" y2="94" stroke="#81C784" strokeWidth="0.8" strokeDasharray="3 3" />
            {/* Pitch markings */}
            <rect x="74" y="46" width="252" height="96" fill="none" stroke="#2E7D32" strokeWidth="1.2" />
            <line x1="200" y1="46" x2="200" y2="142" stroke="#2E7D32" strokeWidth="1.2" />
            <circle cx="200" cy="94" r="20" fill="none" stroke="#2E7D32" strokeWidth="1.2" />
            <circle cx="200" cy="94" r="2.2" fill="#2E7D32" />
            {/* Penalty boxes */}
            <rect x="74" y="68" width="34" height="52" fill="none" stroke="#2E7D32" strokeWidth="1.1" />
            <rect x="292" y="68" width="34" height="52" fill="none" stroke="#2E7D32" strokeWidth="1.1" />
            {/* Floodlight towers */}
            <circle cx="58" cy="36" r="4" fill="#0F2942" />
            <circle cx="342" cy="36" r="4" fill="#0F2942" />
            <circle cx="58" cy="152" r="4" fill="#0F2942" />
            <circle cx="342" cy="152" r="4" fill="#0F2942" />
            {/* Dimension cotas */}
            <line x1="74" y1="158" x2="326" y2="158" stroke="#0F2942" strokeWidth="0.9" />
            <text x="182" y="166" fill="#0F2942" fontSize="8" fontFamily="IBM Plex Mono, monospace">
              90,00 m
            </text>
          </g>
        )}

        {type === EquipmentType.PEC && (
          <g>
            {/* Concrete circular plaza */}
            <circle cx="200" cy="96" r="56" fill="#FFFFFF" stroke="#0F2942" strokeWidth="1.5" />
            <circle cx="200" cy="96" r="42" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="0.9" strokeDasharray="4 2" />
            {/* Radial walkways */}
            <line x1="112" y1="96" x2="288" y2="96" stroke="#0F2942" strokeWidth="1.2" />
            <line x1="200" y1="32" x2="200" y2="160" stroke="#0F2942" strokeWidth="1.2" />
            {/* Pergola shading ribs */}
            <rect x="166" y="62" width="68" height="68" fill="none" stroke="#E05A2B" strokeWidth="1.4" />
            <line x1="166" y1="78" x2="234" y2="78" stroke="#E05A2B" strokeWidth="0.7" />
            <line x1="166" y1="96" x2="234" y2="96" stroke="#E05A2B" strokeWidth="0.7" />
            <line x1="166" y1="114" x2="234" y2="114" stroke="#E05A2B" strokeWidth="0.7" />
            {/* Equipment anchor nodes */}
            <rect x="176" y="70" width="10" height="10" fill="#0F2942" />
            <rect x="214" y="70" width="10" height="10" fill="#0F2942" />
            <rect x="176" y="112" width="10" height="10" fill="#0F2942" />
            <rect x="214" y="112" width="10" height="10" fill="#0F2942" />
            {/* Tactile pathway indicator */}
            <rect x="70" y="92" width="42" height="8" fill="#E05A2B" fillOpacity="0.22" stroke="#E05A2B" strokeWidth="0.8" />
            <text x="270" y="42" fill="#0F2942" fontSize="8" fontFamily="IBM Plex Mono, monospace">
              NBR 9050 · Ø 14,0m
            </text>
          </g>
        )}

        {type === EquipmentType.CALISTHENICS && (
          <g>
            {/* Concrete slab & EPDM mat */}
            <rect x="52" y="130" width="296" height="18" fill="#E2E8F0" stroke="#0F2942" strokeWidth="1.2" />
            <rect x="64" y="124" width="272" height="6" fill="#E05A2B" fillOpacity="0.85" />
            {/* Tubular steel elevation */}
            <line x1="88" y1="54" x2="88" y2="124" stroke="#0F2942" strokeWidth="3" />
            <line x1="146" y1="44" x2="146" y2="124" stroke="#0F2942" strokeWidth="3" />
            <line x1="216" y1="44" x2="216" y2="124" stroke="#0F2942" strokeWidth="3" />
            <line x1="274" y1="68" x2="274" y2="124" stroke="#0F2942" strokeWidth="3" />
            <line x1="316" y1="68" x2="316" y2="124" stroke="#0F2942" strokeWidth="3" />
            {/* Horizontal monkey & pull-up bars */}
            <line x1="88" y1="68" x2="146" y2="68" stroke="#E05A2B" strokeWidth="2.5" />
            <line x1="146" y1="50" x2="216" y2="50" stroke="#E05A2B" strokeWidth="2.5" />
            <line x1="274" y1="86" x2="316" y2="86" stroke="#E05A2B" strokeWidth="2.5" />
            {/* Parallel bar rungs */}
            <line x1="156" y1="50" x2="156" y2="56" stroke="#0F2942" strokeWidth="1.2" />
            <line x1="172" y1="50" x2="172" y2="56" stroke="#0F2942" strokeWidth="1.2" />
            <line x1="188" y1="50" x2="188" y2="56" stroke="#0F2942" strokeWidth="1.2" />
            <line x1="204" y1="50" x2="204" y2="56" stroke="#0F2942" strokeWidth="1.2" />
            {/* Height cota */}
            <line x1="42" y1="44" x2="42" y2="124" stroke="#64748B" strokeWidth="0.8" />
            <text x="48" y="84" fill="#0F2942" fontSize="8" fontFamily="IBM Plex Mono, monospace">
              h=2,40m
            </text>
            <text x="260" y="42" fill="#0F2942" fontSize="8" fontFamily="IBM Plex Mono, monospace">
              EPDM 25mm
            </text>
          </g>
        )}

        {type === EquipmentType.MULTISPORT_COURT && (
          <g>
            {/* Court slab */}
            <rect x="64" y="42" width="272" height="106" fill="#EFF6FF" stroke="#0F2942" strokeWidth="1.6" />
            {/* Court markings */}
            <rect x="82" y="54" width="236" height="82" fill="#FFFFFF" stroke="#0F2942" strokeWidth="1.2" />
            <line x1="200" y1="54" x2="200" y2="136" stroke="#0F2942" strokeWidth="1.2" />
            <circle cx="200" cy="95" r="16" fill="none" stroke="#E05A2B" strokeWidth="1.3" />
            {/* 3-point arcs */}
            <path d="M 82 68 A 28 28 0 0 1 82 122" fill="none" stroke="#0F2942" strokeWidth="1.1" />
            <path d="M 318 68 A 28 28 0 0 0 318 122" fill="none" stroke="#0F2942" strokeWidth="1.1" />
            {/* Truss projection lines */}
            <line x1="64" y1="42" x2="336" y2="148" stroke="#94A3B8" strokeWidth="0.6" strokeDasharray="4 4" />
            <line x1="336" y1="42" x2="64" y2="148" stroke="#94A3B8" strokeWidth="0.6" strokeDasharray="4 4" />
            {/* Bleachers */}
            <rect x="82" y="140" width="236" height="6" fill="#CBD5E1" stroke="#0F2942" strokeWidth="0.8" />
            <text x="266" y="28" fill="#0F2942" fontSize="8" fontFamily="IBM Plex Mono, monospace">
              VÃO LIVRE 24,0m
            </text>
          </g>
        )}

        {type === EquipmentType.CIVIC_PLAZA && (
          <g>
            {/* Monumental axis layout */}
            <rect x="52" y="42" width="296" height="106" fill="#FFFFFF" stroke="#0F2942" strokeWidth="1.3" />
            {/* Portuguese stone mosaic strips */}
            <rect x="64" y="54" width="126" height="82" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="0.9" />
            <rect x="210" y="54" width="126" height="82" fill="#E8F5E9" stroke="#86EFAC" strokeWidth="0.9" />
            {/* Central axial promenade */}
            <rect x="184" y="42" width="32" height="106" fill="#E05A2B" fillOpacity="0.16" stroke="#E05A2B" strokeWidth="1" />
            {/* Concrete benches */}
            <rect x="82" y="70" width="36" height="8" fill="#0F2942" />
            <rect x="82" y="112" width="36" height="8" fill="#0F2942" />
            {/* Cerrado native tree circles */}
            <circle cx="246" cy="80" r="11" fill="#2E7D32" fillOpacity="0.22" stroke="#2E7D32" strokeWidth="1.1" />
            <circle cx="298" cy="110" r="13" fill="#2E7D32" fillOpacity="0.22" stroke="#2E7D32" strokeWidth="1.1" />
            <circle cx="256" cy="116" r="8" fill="#2E7D32" fillOpacity="0.22" stroke="#2E7D32" strokeWidth="1.1" />
            <text x="242" y="28" fill="#0F2942" fontSize="8" fontFamily="IBM Plex Mono, monospace">
              PISO NBR 9781 · 8cm
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

interface ForensicDiagramProps {
  element: 'pillar' | 'slab' | 'truss' | 'retaining-wall';
  reportCode: string;
}

export const ForensicDiagram: React.FC<ForensicDiagramProps> = ({ element, reportCode }) => {
  return (
    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded p-3">
      <div className="flex items-center justify-between text-[11px] font-mono text-[#43474D] mb-2">
        <span>CROQUI PERICIAL · {reportCode}</span>
        <span>ESCALA ESQUEMÁTICA</span>
      </div>
      <svg viewBox="0 0 360 140" className="w-full h-36 block" role="img" aria-label={`Diagrama estrutural ${reportCode}`}>
        <rect width="360" height="140" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        {/* Grid ticks */}
        <line x1="0" y1="70" x2="360" y2="70" stroke="#F1F5F9" strokeWidth="1" />
        <line x1="180" y1="0" x2="180" y2="140" stroke="#F1F5F9" strokeWidth="1" />

        {element === 'slab' && (
          <g>
            {/* Radier & Bleacher slab joint */}
            <rect x="30" y="75" width="145" height="28" fill="#E2E8F0" stroke="#0F2942" strokeWidth="1.4" />
            <rect x="183" y="55" width="147" height="48" fill="#CBD5E1" stroke="#0F2942" strokeWidth="1.4" />
            {/* Expansion joint crack */}
            <path d="M 179 50 L 179 108" stroke="#B91C1C" strokeWidth="2" strokeDasharray="3 2" />
            <circle cx="179" cy="75" r="14" fill="#FEF2F2" fillOpacity="0.65" stroke="#B91C1C" strokeWidth="1.2" />
            <text x="198" y="42" fill="#B91C1C" fontSize="9" fontFamily="IBM Plex Mono, monospace" fontWeight="600">
              JUNTA: ABERTURA 0,45 mm
            </text>
            <text x="36" y="122" fill="#0F2942" fontSize="8.5" fontFamily="IBM Plex Mono, monospace">
              RADIER PROTENDIDO e=12cm
            </text>
          </g>
        )}

        {element === 'pillar' && (
          <g>
            {/* Concrete footing */}
            <rect x="120" y="100" width="120" height="26" fill="#CBD5E1" stroke="#0F2942" strokeWidth="1.4" />
            {/* Base plate */}
            <rect x="145" y="92" width="70" height="8" fill="#475569" stroke="#0F2942" strokeWidth="1.2" />
            {/* Steel column */}
            <rect x="168" y="22" width="24" height="70" fill="#E2E8F0" stroke="#0F2942" strokeWidth="1.5" />
            {/* Corrosion highlight at bolts */}
            <circle cx="154" cy="94" r="9" fill="#FEF2F2" fillOpacity="0.7" stroke="#B91C1C" strokeWidth="1.3" />
            <circle cx="206" cy="94" r="9" fill="#FEF2F2" fillOpacity="0.7" stroke="#B91C1C" strokeWidth="1.3" />
            <text x="220" y="88" fill="#B91C1C" fontSize="9" fontFamily="IBM Plex Mono, monospace" fontWeight="600">
              CORROSÃO CHUMBADOR M20
            </text>
            <text x="24" y="38" fill="#0F2942" fontSize="8.5" fontFamily="IBM Plex Mono, monospace">
              TORRE METÁLICA H=12,0m
            </text>
          </g>
        )}

        {element === 'retaining-wall' && (
          <g>
            {/* Soil embankment */}
            <polygon points="30,36 140,36 140,114 30,114" fill="#F1F5F9" />
            {/* Retaining wall profile */}
            <polygon points="140,32 162,32 178,114 140,114" fill="#CBD5E1" stroke="#0F2942" strokeWidth="1.5" />
            {/* Foundation */}
            <rect x="120" y="114" width="90" height="16" fill="#94A3B8" stroke="#0F2942" strokeWidth="1.4" />
            {/* Barbacã weep hole */}
            <line x1="138" y1="86" x2="174" y2="86" stroke="#E05A2B" strokeWidth="3" />
            <circle cx="174" cy="86" r="10" fill="none" stroke="#E05A2B" strokeWidth="1.2" />
            <text x="190" y="84" fill="#AB3504" fontSize="9" fontFamily="IBM Plex Mono, monospace" fontWeight="600">
              BARBACÃ COLMATADO DN75
            </text>
            <text x="36" y="28" fill="#0F2942" fontSize="8.5" fontFamily="IBM Plex Mono, monospace">
              EMPUXO LATERAL OK (L/800)
            </text>
          </g>
        )}

        {element === 'truss' && (
          <g>
            {/* Accessible ramp profile */}
            <polygon points="40,106 240,106 240,72" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5" />
            <rect x="240" y="72" width="80" height="34" fill="#E2E8F0" stroke="#0F2942" strokeWidth="1.3" />
            <line x1="40" y1="62" x2="240" y2="62" stroke="#0F2942" strokeWidth="1" strokeDasharray="3 3" />
            <text x="84" y="54" fill="#2E7D32" fontSize="9" fontFamily="IBM Plex Mono, monospace" fontWeight="600">
              INCLINAÇÃO CONFORME: 7,4% (MÁX 8,33%)
            </text>
            <text x="246" y="92" fill="#0F2942" fontSize="8.5" fontFamily="IBM Plex Mono, monospace">
              PATAMAR NBR 9050
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

interface BrasiliaRaMapProps {
  works: PublicWork[];
  selectedRa: AdministrativeRegion | 'Todas';
  onSelectRa: (ra: AdministrativeRegion) => void;
  onInspectWork: (work: PublicWork) => void;
}

const RA_COORDS: Record<AdministrativeRegion, { x: number; y: number; short: string }> = {
  'RA-I Plano Piloto': { x: 268, y: 92, short: 'RA-I' },
  'RA-X Guará': { x: 215, y: 126, short: 'RA-X' },
  'RA-III Taguatinga': { x: 146, y: 128, short: 'RA-III' },
  'RA-IX Ceilândia': { x: 78, y: 108, short: 'RA-IX' },
  'RA-XII Samambaia': { x: 112, y: 174, short: 'RA-XII' },
  'RA-XV Recanto das Emas': { x: 164, y: 204, short: 'RA-XV' },
};

export const BrasiliaRaMap: React.FC<BrasiliaRaMapProps> = ({
  works,
  selectedRa,
  onSelectRa,
  onInspectWork,
}) => {
  const activeRegion: AdministrativeRegion =
    selectedRa === 'Todas' ? 'RA-IX Ceilândia' : selectedRa;

  const regionWorks = works.filter((w) => w.ra === activeRegion);
  const featuredWork = regionWorks[0] || works[0];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 mb-3">
        <div>
          <p className="text-[11px] font-mono font-semibold tracking-wider text-[#43474D]">
            MALHA DE ATUAÇÃO · DISTRITO FEDERAL
          </p>
          <h3 className="text-base font-display font-semibold text-[#0F2942] mt-0.5">
            Mapa Esquemático de Contratos por RA
          </h3>
        </div>
        <span className="text-xs font-mono tabular-nums text-[#0F2942] bg-[#F1F5F9] border border-[#CBD5E1] px-2.5 py-1 rounded">
          {works.length} contratos ativos
        </span>
      </div>

      {/* Interactive SVG Map */}
      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded p-2">
        <svg viewBox="0 0 360 236" className="w-full h-56 block" role="img" aria-label="Mapa esquemático das RAs do DF">
          <defs>
            <pattern id="df-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#E2E8F0" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="360" height="236" fill="url(#df-grid)" />

          {/* Lago Paranoá abstraction */}
          <path
            d="M 295 45 C 325 60, 338 112, 310 146 C 296 158, 286 138, 294 110 C 298 92, 282 70, 295 45 Z"
            fill="#DBEAFE"
            stroke="#93C5FD"
            strokeWidth="1"
          />

          {/* Plano Piloto Monumental Axis Cross (Brasília modernist wing motif) */}
          <path d="M 244 48 Q 266 92 246 138" fill="none" stroke="#94A3B8" strokeWidth="2.5" />
          <line x1="210" y1="92" x2="294" y2="92" stroke="#0F2942" strokeWidth="1.5" strokeDasharray="4 2" />

          {/* Connecting Infrastructure Axes (EPTG / Estrutural / BR-060) */}
          <line x1="78" y1="108" x2="268" y2="92" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="78" y1="108" x2="146" y2="128" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="146" y1="128" x2="215" y2="126" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="146" y1="128" x2="112" y2="174" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="112" y1="174" x2="164" y2="204" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Interactive RA Nodes */}
          {(Object.keys(RA_COORDS) as AdministrativeRegion[]).map((ra) => {
            const { x, y, short } = RA_COORDS[ra];
            const isSelected = activeRegion === ra;
            const raWork = works.find((w) => w.ra === ra);
            const nodeColor =
              raWork?.status === 'Concluído / Entregue'
                ? '#2E7D32'
                : raWork?.status === 'Perícia / Patologia'
                ? '#B91C1C'
                : '#E05A2B';

            return (
              <g
                key={ra}
                onClick={() => onSelectRa(ra)}
                className="cursor-pointer group"
                role="button"
                tabIndex={0}
                aria-label={`Selecionar ${ra}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectRa(ra);
                  }
                }}
              >
                {isSelected && (
                  <circle cx={x} cy={y} r="17" fill="#0F2942" fillOpacity="0.1" stroke="#0F2942" strokeWidth="1.2" />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 8 : 6.5}
                  fill={isSelected ? '#0F2942' : '#FFFFFF'}
                  stroke={isSelected ? '#0F2942' : nodeColor}
                  strokeWidth="2.5"
                />
                <text
                  x={x}
                  y={y - 13}
                  textAnchor="middle"
                  fill={isSelected ? '#0F2942' : '#43474D'}
                  fontSize="9.5"
                  fontWeight={isSelected ? '700' : '600'}
                  fontFamily="IBM Plex Mono, monospace"
                >
                  {short}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected RA Live Summary Footer */}
      {featuredWork && (
        <div className="mt-3 pt-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-mono text-[#43474D]">
              <span className="font-semibold text-[#0F2942]">{activeRegion}</span>
              <span aria-hidden="true">·</span>
              <span>{featuredWork.contractCode}</span>
            </div>
            <p className="text-sm font-medium text-[#111C2D] truncate mt-0.5">{featuredWork.title}</p>
          </div>
          <button
            type="button"
            onClick={() => onInspectWork(featuredWork)}
            className="px-3 py-1.5 text-xs font-medium text-[#0F2942] border border-[#0F2942] rounded hover:bg-[#0F2942] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Abrir Ficha ({featuredWork.physicalProgress}%)
          </button>
        </div>
      )}
    </div>
  );
};

interface StructuralElevationShowcaseProps {
  works: PublicWork[];
  selectedRa: AdministrativeRegion | 'Todas';
  onSelectRa: (ra: AdministrativeRegion) => void;
  onInspectWork: (work: PublicWork) => void;
}

export const StructuralElevationShowcase: React.FC<StructuralElevationShowcaseProps> = ({
  works,
  selectedRa,
  onSelectRa,
  onInspectWork,
}) => {
  const [viewMode, setViewMode] = React.useState<'elevation' | 'map'>('elevation');
  const [activeBay, setActiveBay] = React.useState<'fundacao' | 'pilares' | 'trelica'>('trelica');

  const bayDetails: Record<
    'fundacao' | 'pilares' | 'trelica',
    { code: string; title: string; spec: string; norm: string }
  > = {
    fundacao: {
      code: 'EIXO 01 · INFRAESTRUTURA',
      title: 'Fundações Profundas & Radier Protendido',
      spec: 'Estacas escavadas Ø 40 cm, blocos de coroamento Fck 30 MPa e lastro drenante em brita graduada.',
      norm: 'ABNT NBR 6122 / NBR 6118',
    },
    pilares: {
      code: 'EIXO 02 · SUPRAESTRUTURA',
      title: 'Pórticos em Concreto Aparente & Pilotis',
      spec: 'Pilares moldados in loco com fôrma plastificada, cobrimento nominal 35 mm e prumo verificado a laser.',
      norm: 'ABNT NBR 6118 / NBR 14931',
    },
    trelica: {
      code: 'EIXO 03 · COBERTURA METÁLICA',
      title: 'Treliça Espacial Metálica & Fechamento',
      spec: 'Perfis tubulares ASTM A36 galvanizados a fogo, vão livre de 24,0 m e telha termoacústica.',
      norm: 'ABNT NBR 8800 / NBR 6123',
    },
  };

  const currentBay = bayDetails[activeBay];

  return (
    <div className="bg-white border border-[#CBD5E1] rounded-lg p-5 flex flex-col justify-between h-full">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] pb-3 mb-3">
        <div>
          <p className="text-[11px] font-mono font-semibold tracking-wider text-[#43474D]">
            PRANCHA EXECUTIVA · CORTE ESTRUTURAL AA
          </p>
          <h3 className="text-base font-display font-semibold text-[#0F2942] mt-0.5">
            {viewMode === 'elevation'
              ? 'Estrutura Porticada & Treliça de Cobertura'
              : 'Malha de Contratos por RA'}
          </h3>
        </div>

        <div className="flex items-center gap-1 p-1 bg-[#F1F5F9] border border-[#E2E8F0] rounded">
          <button
            type="button"
            onClick={() => setViewMode('elevation')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap ${
              viewMode === 'elevation'
                ? 'bg-[#0F2942] text-white'
                : 'text-[#43474D] hover:text-[#0F2942]'
            }`}
          >
            Corte Estrutural
          </button>
          <button
            type="button"
            onClick={() => setViewMode('map')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap ${
              viewMode === 'map'
                ? 'bg-[#0F2942] text-white'
                : 'text-[#43474D] hover:text-[#0F2942]'
            }`}
          >
            Mapa DF ({works.length})
          </button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <div className="flex-1 flex flex-col justify-between">
          <BrasiliaRaMap
            works={works}
            selectedRa={selectedRa}
            onSelectRa={onSelectRa}
            onInspectWork={onInspectWork}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between">
          {/* Architectural Structural Elevation SVG */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded p-2">
            <svg
              viewBox="0 0 440 245"
              className="w-full h-56 block"
              role="img"
              aria-label="Corte estrutural de pórtico em concreto e treliça metálica"
            >
              <defs>
                <pattern id="struct-grid" width="22" height="22" patternUnits="userSpaceOnUse">
                  <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#E2E8F0" strokeWidth="0.7" />
                </pattern>
              </defs>
              <rect width="440" height="245" fill="url(#struct-grid)" />

              {/* Axis Vertical Centerlines (EIXO A / B / C / D) */}
              {[80, 175, 265, 360].map((x, idx) => (
                <g key={x}>
                  <line
                    x1={x}
                    y1="20"
                    x2={x}
                    y2="215"
                    stroke="#94A3B8"
                    strokeWidth="0.8"
                    strokeDasharray="5 3"
                  />
                  <circle cx={x} cy="16" r="8" fill="#FFFFFF" stroke="#0F2942" strokeWidth="1" />
                  <text
                    x={x}
                    y="19"
                    textAnchor="middle"
                    fill="#0F2942"
                    fontSize="8"
                    fontFamily="IBM Plex Mono, monospace"
                    fontWeight="600"
                  >
                    {['A', 'B', 'C', 'D'][idx]}
                  </text>
                </g>
              ))}

              {/* Elevation Level Lines (+8,60m / +4,20m / +0,00m) */}
              <line x1="22" y1="52" x2="418" y2="52" stroke="#CBD5E1" strokeWidth="0.7" />
              <text x="12" y="48" fill="#43474D" fontSize="8" fontFamily="IBM Plex Mono, monospace">
                +8,60 m
              </text>

              <line x1="22" y1="114" x2="418" y2="114" stroke="#CBD5E1" strokeWidth="0.7" />
              <text x="12" y="110" fill="#43474D" fontSize="8" fontFamily="IBM Plex Mono, monospace">
                +4,20 m
              </text>

              <line x1="22" y1="184" x2="418" y2="184" stroke="#0F2942" strokeWidth="1.2" />
              <text x="12" y="180" fill="#0F2942" fontSize="8" fontWeight="600" fontFamily="IBM Plex Mono, monospace">
                +0,00 m
              </text>

              {/* Interactive Layer 1: Steel Roof Truss */}
              <g
                onClick={() => setActiveBay('trelica')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveBay('trelica');
                  }
                }}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label="Selecionar Treliça Espacial Metálica"
              >
                <polygon
                  points="62,52 220,30 378,52 378,66 62,66"
                  fill={activeBay === 'trelica' ? '#FFF7ED' : '#F1F5F9'}
                  stroke={activeBay === 'trelica' ? '#E05A2B' : '#0F2942'}
                  strokeWidth={activeBay === 'trelica' ? '2' : '1.4'}
                />
                {/* Truss diagonal webbing */}
                <polyline
                  points="80,66 112,48 144,66 175,38 205,66 220,32 235,66 265,38 296,66 328,48 360,66"
                  fill="none"
                  stroke={activeBay === 'trelica' ? '#E05A2B' : '#0F2942'}
                  strokeWidth="1.3"
                />
              </g>

              {/* Interactive Layer 2: Concrete Pillars & Mid Beam */}
              <g
                onClick={() => setActiveBay('pilares')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveBay('pilares');
                  }
                }}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label="Selecionar Pórticos em Concreto Aparente"
              >
                {/* Horizontal structural beam */}
                <rect
                  x="72"
                  y="110"
                  width="296"
                  height="11"
                  fill={activeBay === 'pilares' ? '#0F2942' : '#CBD5E1'}
                  stroke="#0F2942"
                  strokeWidth="1.2"
                />
                {/* 4 Concrete columns */}
                {[74, 169, 259, 354].map((px) => (
                  <rect
                    key={px}
                    x={px}
                    y="66"
                    width="12"
                    height="118"
                    fill={activeBay === 'pilares' ? '#E05A2B' : '#FFFFFF'}
                    stroke="#0F2942"
                    strokeWidth="1.5"
                  />
                ))}
              </g>

              {/* Interactive Layer 3: Foundations & Radier */}
              <g
                onClick={() => setActiveBay('fundacao')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveBay('fundacao');
                  }
                }}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label="Selecionar Fundações Profundas e Radier"
              >
                {/* Radier slab */}
                <rect
                  x="62"
                  y="184"
                  width="316"
                  height="10"
                  fill={activeBay === 'fundacao' ? '#2E7D32' : '#CBD5E1'}
                  stroke="#0F2942"
                  strokeWidth="1.2"
                />
                {/* Footings & deep piles */}
                {[68, 163, 253, 348].map((fx) => (
                  <g key={fx}>
                    <rect
                      x={fx}
                      y="194"
                      width="24"
                      height="11"
                      fill={activeBay === 'fundacao' ? '#E05A2B' : '#94A3B8'}
                      stroke="#0F2942"
                      strokeWidth="1.2"
                    />
                    <rect
                      x={fx + 7}
                      y="205"
                      width="10"
                      height="24"
                      fill={activeBay === 'fundacao' ? '#0F2942' : '#CBD5E1'}
                      stroke="#0F2942"
                      strokeWidth="1"
                    />
                  </g>
                ))}
              </g>

              {/* Bottom Dimension Cota */}
              <line x1="80" y1="236" x2="360" y2="236" stroke="#0F2942" strokeWidth="0.9" />
              <line x1="80" y1="232" x2="80" y2="240" stroke="#0F2942" strokeWidth="0.9" />
              <line x1="360" y1="232" x2="360" y2="240" stroke="#0F2942" strokeWidth="0.9" />
              <rect x="184" y="229" width="72" height="14" fill="#F8FAFC" />
              <text
                x="220"
                y="239"
                textAnchor="middle"
                fill="#0F2942"
                fontSize="8.5"
                fontWeight="600"
                fontFamily="IBM Plex Mono, monospace"
              >
                VÃO 24,00 m
              </text>
            </svg>
          </div>

          {/* Interactive Structural Element Selector Strip */}
          <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              {(
                [
                  { id: 'trelica', label: '01. Treliça Metálica' },
                  { id: 'pilares', label: '02. Pórticos & Pilotis' },
                  { id: 'fundacao', label: '03. Fundações & Radier' },
                ] as const
              ).map((tab) => {
                const isSelected = activeBay === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveBay(tab.id)}
                    className={`px-2.5 py-1 text-[11px] font-mono font-semibold rounded border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#0F2942] text-white border-[#0F2942]'
                        : 'bg-[#F1F5F9] text-[#43474D] border-[#CBD5E1] hover:border-[#0F2942]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-[11px] font-mono text-[#E05A2B] font-semibold">
                  {currentBay.code} · {currentBay.norm}
                </div>
                <div className="text-sm font-semibold text-[#111C2D]">{currentBay.title}</div>
                <p className="text-xs text-[#43474D] mt-0.5">{currentBay.spec}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


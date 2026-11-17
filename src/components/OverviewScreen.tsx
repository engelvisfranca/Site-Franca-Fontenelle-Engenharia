import React from 'react';
import { ArrowRight, Building2, Compass, FileCheck2 } from 'lucide-react';
import { AdministrativeRegion, PublicWork } from '../types/engineering';
import { StructuralElevationShowcase } from './SchematicIllustration';
import { WorkCard } from './WorkCard';

interface OverviewScreenProps {
  works: PublicWork[];
  reportsCount: number;
  selectedMapRa: AdministrativeRegion | 'Todas';
  onSelectMapRa: (ra: AdministrativeRegion) => void;
  onNavigateToWorks: (ra?: AdministrativeRegion) => void;
  onNavigateToForensic: () => void;
  onInspectWork: (work: PublicWork) => void;
}

const CAPABILITIES = [
  {
    index: '01.',
    title: 'Campos de Grama Sintética & Drenagem Profunda',
    description:
      'Execução completa de sub-base em brita graduada, rede coletora espinha de peixe em PEAD e gramado monofilamento certificado para uso comunitário contínuo.',
  },
  {
    index: '02.',
    title: 'PECs, Calistenia & Mobiliário Cívico',
    description:
      'Restauração de Pontos de Encontro Comunitário e estações de treino em aço carbono galvanizado com pisos amortecedores em EPDM e rotas acessíveis NBR 9050.',
  },
  {
    index: '03.',
    title: 'Perícias Estruturais & Patologias Técnicas',
    description:
      'Inspeções instrumentadas com fissurômetro óptico, esclerometria e ultrassom para emissão de laudos conclusivos e planos de reforço estrutural.',
  },
  {
    index: '04.',
    title: 'Medição Física Auditável & Diário Digital',
    description:
      'Boletins de medição sincronizados com órgãos contratantes, rastreabilidade integral de ARTs no CREA-DF e histórico fotográfico georreferenciado.',
  },
];

export const OverviewScreen: React.FC<OverviewScreenProps> = ({
  works,
  reportsCount,
  selectedMapRa,
  onSelectMapRa,
  onNavigateToWorks,
  onNavigateToForensic,
  onInspectWork,
}) => {
  const totalAreaSqm = works.reduce((acc, w) => acc + w.areaSqm, 0);
  const totalPopulation = works.reduce((acc, w) => acc + w.beneficiariesEstimate, 0);
  const syntheticTurfSqm = works
    .filter((w) => w.equipmentType === 'Campo Sintético')
    .reduce((acc, w) => acc + w.areaSqm, 0);
  const pecsAndStations = works.filter(
    (w) =>
      w.equipmentType === 'PEC Comunitário' ||
      w.equipmentType === 'Estação de Calistenia' ||
      w.equipmentType === 'Praça Cívica'
  ).length;

  const featuredWorks = works.slice(0, 3);

  return (
    <div className="space-y-14 pb-16">
      {/* Construction Structure Hero Section */}
      <section className="bg-architectural-grid border-b border-[#CBD5E1]">
        {/* Structural Blueprint Top Title Band with Prominent Company Name */}
        <div className="bg-[#001428] text-white border-b border-[#314863]">
          <div className="max-w-[1360px] mx-auto px-5 md:px-12 py-8 md:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-9">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#B0C9E8] mb-3">
                  <span>PRANCHA MESTRA 01</span>
                  <span aria-hidden="true">·</span>
                  <span>BRASÍLIA · DISTRITO FEDERAL</span>
                  <span aria-hidden="true">·</span>
                  <span>ENGENHARIA CIVIL &amp; PERÍCIAS</span>
                </div>

                <h1
                  className="font-display font-bold tracking-tight text-white leading-[1.04]"
                  style={{ fontSize: 'clamp(2.35rem, 4.8vw, 4.1rem)', textWrap: 'balance' }}
                >
                  Franca &amp; Fontenelle Engenharia
                </h1>

                {/* Structural Truss Line Accent */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="h-1 w-20 bg-[#E05A2B] block" aria-hidden="true" />
                  <span className="h-px flex-1 bg-[#314863] block" aria-hidden="true" />
                </div>
              </div>

              {/* Architectural Stamp Box (Selo Técnico de Prancha) */}
              <div className="lg:col-span-3 border border-[#314863] bg-[#0F2942] rounded p-3.5 text-xs font-mono">
                <div className="flex items-center justify-between text-[#B0C9E8] border-b border-[#314863] pb-1.5 mb-2">
                  <span>REGISTRO TÉCNICO</span>
                  <span>DF · 2026</span>
                </div>
                <div className="flex items-center justify-between text-white">
                  <span>Modalidade</span>
                  <span className="font-semibold">Obras &amp; Laudos</span>
                </div>
                <div className="flex items-center justify-between text-[#B0C9E8] mt-1">
                  <span>Normativa</span>
                  <span>ABNT / NOVACAP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Split Body: Structural Frame Grid + Elevation Showcase */}
        <div className="max-w-[1360px] mx-auto px-5 md:px-12 py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Institutional & Structural Proposition */}
            <div className="lg:col-span-6 bg-white border border-[#CBD5E1] rounded-lg p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-[#43474D] pb-3 mb-5 border-b border-[#E2E8F0]">
                  <span className="inline-flex items-center gap-1.5 text-[#0F2942]">
                    <Compass className="w-3.5 h-3.5 text-[#E05A2B]" aria-hidden="true" />
                    MEMORIAL ESTRUTURAL DE ATUAÇÃO
                  </span>
                  <span>ESCALA URBANA · DF</span>
                </div>

                <h2
                  className="font-display font-bold text-[#001428] tracking-tight leading-[1.15] mb-4"
                  style={{ fontSize: 'clamp(1.65rem, 2.5vw, 2.25rem)', textWrap: 'balance' }}
                >
                  Estruturas sólidas, arenas esportivas e infraestrutura cívica construídas para
                  durar
                </h2>

                <p className="text-base text-[#43474D] leading-relaxed mb-6">
                  Executamos obras públicas de alta exigência técnica em todo o Distrito Federal —
                  de fundações, pórticos em concreto aparente e coberturas metálicas a campos de
                  grama sintética, PECs e perícias estruturais instrumentadas.
                </p>

                {/* Structural Construction Pillar Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7">
                  <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
                    <div className="text-[11px] font-mono text-[#E05A2B] font-semibold">VÃO 01</div>
                    <div className="text-xs font-semibold text-[#0F2942] mt-0.5">
                      Obras Esportivas
                    </div>
                    <div className="text-[11px] text-[#43474D] mt-0.5">
                      Campos sintéticos e quadras cobertas
                    </div>
                  </div>
                  <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
                    <div className="text-[11px] font-mono text-[#E05A2B] font-semibold">VÃO 02</div>
                    <div className="text-xs font-semibold text-[#0F2942] mt-0.5">
                      Equipamentos Cívicos
                    </div>
                    <div className="text-[11px] text-[#43474D] mt-0.5">
                      PECs, calistenia e praças acessíveis
                    </div>
                  </div>
                  <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
                    <div className="text-[11px] font-mono text-[#E05A2B] font-semibold">VÃO 03</div>
                    <div className="text-xs font-semibold text-[#0F2942] mt-0.5">
                      Engenharia Pericial
                    </div>
                    <div className="text-[11px] text-[#43474D] mt-0.5">
                      Laudos NBR 13752 e patologias
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => onNavigateToWorks()}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0F2942] hover:bg-[#163A5E] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Building2 className="w-4 h-4" aria-hidden="true" />
                  Explorar Carteira de Obras
                </button>

                <button
                  type="button"
                  onClick={onNavigateToForensic}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#0F2942] bg-white border-[1.5px] border-[#0F2942] hover:bg-[#F1F5F9] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4" aria-hidden="true" />
                  Consultar Laudos Técnicos
                </button>
              </div>
            </div>

            {/* Right Interactive Structural Elevation & DF Map */}
            <div className="lg:col-span-6">
              <StructuralElevationShowcase
                works={works}
                selectedRa={selectedMapRa}
                onSelectRa={onSelectMapRa}
                onInspectWork={onInspectWork}
              />
            </div>
          </div>

          {/* 4-Column Community Impact KPI Strip (Full-width row below hero split) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#CBD5E1]">
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-5">
              <div className="text-xs font-mono text-[#43474D]">Grama Sintética &amp; Obras</div>
              <div className="text-2xl sm:text-3xl font-display font-bold tabular-nums text-[#0F2942] mt-1">
                {totalAreaSqm.toLocaleString('pt-BR')} m²
              </div>
              <div className="text-xs text-[#43474D] mt-1">
                Sendo {syntheticTurfSqm.toLocaleString('pt-BR')} m² em gramado FIFA Quality
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-lg p-5">
              <div className="text-xs font-mono text-[#43474D]">População Atendida</div>
              <div className="text-2xl sm:text-3xl font-display font-bold tabular-nums text-[#0F2942] mt-1">
                {totalPopulation.toLocaleString('pt-BR')}
              </div>
              <div className="text-xs text-[#43474D] mt-1">
                Beneficiários diretos em 6 RAs do Distrito Federal
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-lg p-5">
              <div className="text-xs font-mono text-[#43474D]">Equipamentos Comunitários</div>
              <div className="text-2xl sm:text-3xl font-display font-bold tabular-nums text-[#2E7D32] mt-1">
                18 PECs · {pecsAndStations} frentes
              </div>
              <div className="text-xs text-[#43474D] mt-1">
                PECs restaurados, calistenia e praças acessíveis
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-lg p-5">
              <div className="text-xs font-mono text-[#43474D]">Laudos &amp; Perícias</div>
              <div className="text-2xl sm:text-3xl font-display font-bold tabular-nums text-[#E05A2B] mt-1">
                {reportsCount + 30} Laudos
              </div>
              <div className="text-xs text-[#43474D] mt-1">
                Pareceres estruturais emitidos sob normas ABNT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Works Section */}
      <section className="max-w-[1360px] mx-auto px-5 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-mono font-semibold tracking-wider text-[#43474D]">
              FISCALIZAÇÃO &amp; AVANÇO FÍSICO
            </p>
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-[#0F2942] mt-1">
              Obras em Destaque por Região Administrativa
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigateToWorks()}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F2942] hover:text-[#E05A2B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Ver todos os {works.length} contratos
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredWorks.map((work) => (
            <WorkCard key={work.id} work={work} onInspect={onInspectWork} />
          ))}
        </div>
      </section>

      {/* Editorial Numbered Technical Capabilities */}
      <section className="max-w-[1360px] mx-auto px-5 md:px-12">
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <p className="text-xs font-mono font-semibold tracking-wider text-[#E05A2B]">
                METODOLOGIA CONSTRUTIVA
              </p>
              <h2 className="text-2xl font-display font-semibold text-[#0F2942] mt-1.5">
                Rigor normativo do projeto executivo ao termo definitivo
              </h2>
              <p className="text-sm text-[#43474D] mt-3 leading-relaxed">
                Cada frente de serviço opera com ensaios tecnológicos de concreto, controle de
                compactação em campo e rastreabilidade documental integrada aos órgãos de controle
                do Distrito Federal.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {CAPABILITIES.map((cap) => (
                <div key={cap.index} className="pt-4 border-t border-[#E2E8F0]">
                  <span className="text-xs font-mono font-semibold text-[#E05A2B]">{cap.index}</span>
                  <h3 className="text-base font-display font-semibold text-[#0F2942] mt-1">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-[#43474D] mt-1.5 leading-relaxed">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

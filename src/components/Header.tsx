import React from 'react';
import { Menu, Plus, X } from 'lucide-react';

export type ActiveTab = 'overview' | 'works' | 'forensic' | 'diary';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenNewMeasurement: () => void;
}

const NAV_ITEMS: { id: ActiveTab; label: string }[] = [
  { id: 'overview', label: 'Visão Geral' },
  { id: 'works', label: 'Obras & Medições' },
  { id: 'forensic', label: 'Laudos & Perícias' },
  { id: 'diary', label: 'Diário & Sync' },
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenNewMeasurement,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (tab: ActiveTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] no-print">
      <div className="max-w-[1360px] mx-auto px-5 md:px-12 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('overview')}
          className="text-lg font-display font-bold tracking-tight text-[#0F2942] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2942]"
        >
          Franca &amp; Fontenelle
        </button>

        {/* Zone 2: 4 single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`py-5 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                  isActive
                    ? 'border-[#0F2942] text-[#0F2942]'
                    : 'border-transparent text-[#43474D] hover:text-[#0F2942] hover:border-[#CBD5E1]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenNewMeasurement}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[#E05A2B] hover:bg-[#AB3504] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2942]"
          >
            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
            Nova Medição
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-[#0F2942] border border-[#E2E8F0] rounded cursor-pointer"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#E2E8F0] px-5 py-4 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded transition-colors ${
                  isActive
                    ? 'bg-[#0F2942] text-white'
                    : 'text-[#111C2D] hover:bg-[#F1F5F9]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenNewMeasurement();
            }}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#E05A2B] rounded"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Nova Medição
          </button>
        </div>
      )}
    </header>
  );
};

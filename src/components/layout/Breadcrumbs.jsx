import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Breadcrumbs({ items, tone = 'light' }) {
  const { t } = useTranslation();
  const isDark = tone === 'dark';
  return (
    <nav aria-label={t('common.breadcrumb')} className="mb-8">
      <ol className={`flex flex-wrap items-center gap-2 text-[0.72rem] font-semibold ${isDark ? 'text-sage/65' : 'text-muted'}`}>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight
                  className="directional-icon h-3 w-3 flex-none opacity-50"
                  aria-hidden="true"
                />
              )}
              {item.to && !last ? (
                <Link to={item.to} className={`transition-colors ${isDark ? 'hover:text-paper' : 'hover:text-forest'}`}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={isDark ? 'text-sage' : 'text-forest'}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

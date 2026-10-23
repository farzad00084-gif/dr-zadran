import Breadcrumbs from '../layout/Breadcrumbs.jsx';

export default function PageIntro({
  eyebrow,
  title,
  lead,
  breadcrumb,
  children,
  count,
  tone = 'light',
}) {
  const isDark = tone === 'dark';
  return (
    <section className={`relative overflow-hidden ${isDark ? 'bg-forest text-paper' : 'bg-ivory'}`}>
      <div className="container-editorial pt-8 pb-14 md:pt-10 md:pb-20">
        {breadcrumb ? <Breadcrumbs items={breadcrumb} tone={tone} /> : null}
        <div className={`grid gap-8 border-t pt-10 lg:grid-cols-12 lg:gap-10 ${isDark ? 'border-paper/15' : 'border-line/80'}`}>
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4">
              <p className={`eyebrow ${isDark ? '!text-sage' : ''}`}>{eyebrow}</p>
              {count ? (
                <span className={`number-ltr text-[0.7rem] font-semibold ${isDark ? 'text-sage/50' : 'text-muted/60'}`}>
                  {count}
                </span>
              ) : null}
            </div>
            <h1 className={`display-lg mt-5 max-w-4xl ${isDark ? '!text-paper' : ''}`}>{title}</h1>
          </div>
          <div className="lg:col-span-4 lg:pt-12">
            <p className={`max-w-md text-base leading-relaxed ${isDark ? 'text-sage/80' : 'text-muted'}`}>
              {lead}
            </p>
            {children ? <div className="mt-6">{children}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

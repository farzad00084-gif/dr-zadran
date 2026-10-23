import { Link } from 'react-router-dom';

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  link,
  tone = 'light',
  className = '',
  id,
}) {
  const isDark = tone === 'dark';
  return (
    <div className={`grid gap-6 lg:grid-cols-12 lg:items-end ${className}`}>
      <div className="lg:col-span-8">
        {eyebrow ? <p className={`eyebrow ${isDark ? '!text-sage' : ''}`}>{eyebrow}</p> : null}
        <h2
          id={id}
          className={`display-md mt-4 max-w-3xl ${isDark ? '!text-paper' : ''}`}
        >
          {title}
        </h2>
      </div>
      {(intro || link) && (
        <div className={`lg:col-span-4 ${isDark ? 'text-sage/80' : 'text-muted'}`}>
          {intro ? <p className="text-[0.965rem] leading-relaxed">{intro}</p> : null}
          {link ? <div className="mt-5">{link}</div> : null}
        </div>
      )}
    </div>
  );
}

export function TextLink({ to, children, tone = 'light', className = '' }) {
  return (
    <Link
      to={to}
      className={`link-editorial ${tone === 'dark' ? '!border-sage/40 !text-paper hover:!border-gold' : ''} ${className}`}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="directional-icon">
        →
      </span>
    </Link>
  );
}

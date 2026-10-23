import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const styles = {
  primary:
    'btn btn-primary',
  outline:
    'btn btn-outline',
  light:
    'btn btn-light',
  ghost:
    'btn btn-ghost-light',
};

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  icon: Icon,
  showArrow = false,
  external = false,
  ...props
}) {
  const content = (
    <>
      {Icon ? <Icon className="h-4 w-4 flex-none" aria-hidden="true" /> : null}
      <span>{children}</span>
      {showArrow ? (
        <ArrowUpRight className="directional-icon h-4 w-4 flex-none" aria-hidden="true" />
      ) : null}
    </>
  );

  const classes = `${styles[variant] ?? styles.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
}

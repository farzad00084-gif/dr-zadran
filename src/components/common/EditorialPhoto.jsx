import { useTranslation } from 'react-i18next';

/**
 * Responsive, credited editorial photography. The frame reserves its aspect
 * ratio before load to avoid layout shift, and the caption keeps stock imagery
 * from being mistaken for the clinic, a patient, or the doctor's own record.
 */
export default function EditorialPhoto({
  image,
  className = '',
  frameClassName = '',
  aspect = 'aspect-[4/3]',
  sizes = '100vw',
  tone = 'light',
  priority = false,
  showCaption = true,
  notClinic = false,
}) {
  const { t } = useTranslation();
  if (!image) return null;

  const isDark = tone === 'dark';
  const captionTone = isDark ? 'text-sage/90' : 'text-muted';
  const creditTone = isDark
    ? 'text-sage decoration-sage/40 hover:text-gold-light'
    : 'text-forest decoration-forest/30 hover:text-teal';

  return (
    <figure className={`editorial-photo ${className}`}>
      <div className={`editorial-photo-frame relative overflow-hidden ${aspect} ${frameClassName}`}>
        <picture>
          <source type="image/webp" srcSet={image.srcSet.webp} sizes={sizes} />
          <source type="image/jpeg" srcSet={image.srcSet.jpeg} sizes={sizes} />
          <img
            src={image.src}
            alt={t(`media.${image.key}.alt`)}
            width={image.width}
            height={image.height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            className="editorial-photo-img"
          />
        </picture>
        <span className="editorial-photo-tint" aria-hidden="true" />
        <span className="editorial-photo-mark editorial-photo-mark--start" aria-hidden="true" />
        <span className="editorial-photo-mark editorial-photo-mark--end" aria-hidden="true" />
      </div>

      {showCaption ? (
        <figcaption className={`editorial-photo-caption ${captionTone}`}>
          <span>
            {t(`media.${image.key}.caption`)}
            {notClinic ? <span className="font-semibold text-forest"> {t('media.notClinic')}</span> : null}
          </span>
          {image.credit ? (
            <span className="editorial-photo-credit">
              <a
                href={image.credit.url || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${creditTone} ${image.credit.url ? 'underline decoration-1 underline-offset-2' : 'no-underline'}`}
              >
                {image.credit.label}
              </a>
              {image.credit.licenseUrl ? (
                <>
                  <span aria-hidden="true"> · </span>
                  <a
                    href={image.credit.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`underline decoration-1 underline-offset-2 transition-colors ${creditTone}`}
                  >
                    {image.credit.license}
                  </a>
                </>
              ) : null}
            </span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

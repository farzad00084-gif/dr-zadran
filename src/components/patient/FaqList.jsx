import { Plus } from 'lucide-react';

export default function FaqList({ items }) {
  if (!Array.isArray(items)) return null;

  return (
    <div className="border-t border-line">
      {items.map((item, index) => (
        <details key={item.q} className="faq-item group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start gap-4 py-5 [&::-webkit-details-marker]:hidden">
            <span className="number-ltr mt-1 text-[0.6rem] font-semibold tracking-[0.12em] text-gold">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="flex-1 font-display text-[1.2rem] leading-snug text-forest transition-colors group-hover:text-teal sm:text-[1.35rem]">
              {item.q}
            </span>
            <span className="mt-1 flex h-7 w-7 flex-none items-center justify-center border border-forest/15 text-forest transition-colors group-open:border-forest group-open:bg-forest group-open:text-paper">
              <Plus
                className="h-3.5 w-3.5 transition-transform duration-300 group-open:rotate-45"
                aria-hidden="true"
              />
            </span>
          </summary>
          <div className="pb-6 ps-9 pe-11 sm:ps-10">
            <p className="max-w-2xl text-sm leading-relaxed text-muted">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

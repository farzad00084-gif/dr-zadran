import { SearchX } from 'lucide-react';

export default function EmptyState({ title, body, action, icon: Icon = SearchX }) {
  return (
    <div className="border border-line bg-paper px-6 py-14 text-center md:px-12">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mint text-teal">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mx-auto mt-5 max-w-xl font-display text-2xl leading-tight text-forest">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">{body}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}

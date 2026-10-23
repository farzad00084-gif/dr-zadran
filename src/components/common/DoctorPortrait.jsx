import EditorialPhoto from './EditorialPhoto.jsx';

export default function DoctorPortrait({ image, className = '' }) {
  return (
    <EditorialPhoto
      image={image}
      aspect="aspect-[4/5]"
      sizes="(min-width: 1024px) 280px, 70vw"
      className={className}
      frameClassName="border border-forest/12 bg-mint"
    />
  );
}

import { copy, type Review } from '../content/site';

export function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="rcard">
      <blockquote>
        <p>{`\u201C${r.text}\u201D`}</p>
      </blockquote>
      <figcaption className="label">{r.author === 'Cliente' ? copy.reviews.source : `${r.author} · ${copy.reviews.source}`}</figcaption>
    </figure>
  );
}

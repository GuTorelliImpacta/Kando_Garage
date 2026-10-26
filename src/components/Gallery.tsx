import { fichaCaption, gallery, gallerySection as G, links } from '../content/site';

/** Galeria: só renderiza quando houver fotos reais em site.ts. */
export function Gallery() {
  if (!gallery.length) return null;
  return (
    <section id="galeria" className="sec dark-b grain" aria-labelledby="gal-h">
      <div className="wrap">
        <p className="label label--amber">{fichaCaption('gallery')}</p>
        <h2 id="gal-h" className="h2">{G.h2}</h2>
        <ul className="gallery" role="list">
          {gallery.map((g) => (
            <li key={g.src}>
              <figure className="crop crop--4">
                <img src={g.src} alt={g.alt} loading="lazy" decoding="async" width="800" height="600" />
                <figcaption className="fine">{g.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <a className="tlink" href={links.instagram} target="_blank" rel="noopener noreferrer">{G.cta}</a>
      </div>
    </section>
  );
}

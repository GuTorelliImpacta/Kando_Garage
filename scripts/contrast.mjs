// Calcula razões de contraste WCAG para os pares de cor do design system.
const lum = (h) => { const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4); return .2126*c[0]+.7152*c[1]+.0722*c[2]; };
export const ratio = (a,b) => { const [x,y]=[lum(a),lum(b)].sort((p,q)=>q-p); return (x+0.05)/(y+0.05); };
const pairs = JSON.parse(process.argv[2] ?? '[]');
if (import.meta.url === `file://${process.argv[1]}`) for (const [n,f,b] of pairs) console.log(`${ratio(f,b).toFixed(2)}\t${n}\t${f} on ${b}`);

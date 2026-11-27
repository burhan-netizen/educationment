// Downloads the chosen Unsplash photos and writes compressed WebP versions to assets/img.
const fs = require('fs'), path = require('path');
const sharp = require(path.join(__dirname, '../../educationment-logos/final/build/node_modules/sharp'));
const OUT = path.join(__dirname, '../assets/img'); fs.mkdirSync(OUT, { recursive: true });
const P = [
  ['subj-international-business-management','photo-1769144256181-698b8f807066','w8VfTO3TGs8','Daniel Miksha'],
  ['subj-computer-science','photo-1515879218367-8466d910aaa4','ieic5Tq8YMk','Chris Ried'],
  ['subj-medical','photo-1675851143055-23ae996bb212','nvmVK78tE5I','Jiří Suchý'],
  ['subj-mathematics','photo-1770719269462-d3c1ed7e184f','aTpgq-1PdrU','Erwan Hesry'],
  ['subj-finance','photo-1560221328-12fe60f83ab8','Wb63zqJ5gnE','Nicholas Cappello'],
  ['subj-sciences','photo-1595500381966-eee2034aae48','Yl6VGTjWVkw','Raghav Bhasin'],
  ['subj-nursing','photo-1505751172876-fa1923c5c528','yo01Z-9HQAw','Hush Naidoo Jade Photography'],
  ['subj-law','photo-1767972463877-b64ba4283cd0','FaTLrG5-ViE','Sasun Bughdaryan'],
  ['subj-engineering','photo-1721244654392-9c912a6eb236','URnyBZCnlIs','Amsterdam City Archives'],
  ['subj-it','photo-1695668548342-c0c1ad479aee','2JJ3wBHu4_0','Kevin Ache'],
  ['svc-thesis-dissertation-writing','photo-1709924168698-620ea32c3488','GxCLXVWAJMY','Jayanth Muppaneni'],
  ['svc-research-papers','photo-1583521214690-73421a1829a9','snNHKZ-mGfE','Wesley Tingey'],
  ['svc-research-proposals','photo-1760720962384-e470ee773c1f','lbUGjGg0cvM','Kelly Sikkema'],
  ['svc-case-studies','photo-1632152133952-98b268dc4b86','VnK5iT01HYQ','2H Media'],
  ['svc-live-sessions','photo-1487017159836-4e23ece2e4cf','9l_326FISzk','Luca Bravo'],
  ['svc-business-plans','photo-1707157284454-553ef0a4ed0d','heiYgqp0Tsk','Jakub Żerdzicki'],
  ['svc-annotated-bibliography','photo-1457369804613-52c61a468e7d','Oaqk7qqNh_c','Patrick Tomasso'],
  ['svc-content-writing','photo-1471107340929-a87cd0f5b5f3','xG8IQMqMITM','Aaron Burden'],
  ['svc-presentations-posters','photo-1757192420362-3629ce30d2e3','DknG_UtWXyA','Allen Y'],
  ['home-library','photo-1577985051167-0d49eec21977','bByhWydZLW0','Paul Melki'],
  ['about-campus','photo-1618255630366-f402c45736f6','ORzZtY2i50k','Dora Dalberto'],
];
(async () => {
  const credits = [];
  for (const [name, photo, id, author] of P) {
    const res = await fetch(`https://images.unsplash.com/${photo}?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=2000`);
    if (!res.ok) { console.log('FAILED', name, res.status); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf).resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 70 }).toBuffer().then(b => fs.writeFileSync(path.join(OUT, `${name}.webp`), b));
    await sharp(buf).resize({ width: 640 }).webp({ quality: 68 }).toBuffer().then(b => fs.writeFileSync(path.join(OUT, `${name}-sm.webp`), b));
    credits.push({ file: `${name}.webp`, author, source: `https://unsplash.com/photos/${id}` });
    console.log('ok', name);
  }
  fs.writeFileSync(path.join(OUT, 'CREDITS.json'), JSON.stringify(credits, null, 2));
})();

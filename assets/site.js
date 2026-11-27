/* EducationMent shared site script. Every block checks its elements exist, so one file serves every page. */
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduced) document.documentElement.classList.add('reduced');
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
function toast(msg){ const t=$('#toast'); if(!t) return; t.textContent=msg; t.classList.add('show'); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove('show'),3600); }
window.toast = toast;

/* ---------- quote forms: send by WhatsApp or email ---------- */
// web3key: paste the Web3Forms access key here to email every quote request to the inbox automatically
const CONTACT = { wa:'918849724179', email:'educationment.in@gmail.com', web3key:'f97c0d3a-3ec3-4cf6-b778-f1fac45570f7' };
function formSummary(f){
  const lines=[];
  $$('input, select, textarea',f).forEach(el=>{
    if(el.name==='botcheck' || el.type==='checkbox') return;
    if(el.type==='file'){ if(el.files && el.files.length) lines.push(`Files: I have ${el.files.length} file(s) to share`); return; }
    const v=(el.value||'').trim(); if(!v) return;
    const lab=(el.id && $(`label[for="${el.id}"]`,f)) || (el.closest('.field, .cf-grid > div') || el.parentElement).querySelector('label');
    lines.push(`${lab ? lab.textContent.trim() : el.name || 'Detail'}: ${v}`);
  });
  const tab=$('.tabs button.on',f); if(tab) lines.unshift(`Type: ${tab.textContent.trim()}`);
  return lines;
}
function sendModal(lines, mode='choose'){
  let m=$('#sendModal');
  if(!m){
    document.body.insertAdjacentHTML('beforeend',`<div class="send-modal" id="sendModal" role="dialog" aria-modal="true" aria-labelledby="smTitle">
      <div class="sm-card"><button class="sm-x" aria-label="Close">×</button>
        <span class="eyebrow">Almost there</span><h3 id="smTitle">How would you like to send your brief?</h3>
        <p>Your details are ready. Choose WhatsApp for the fastest reply, or email if you prefer.</p>
        <pre class="sm-sum"></pre>
        <div class="sm-btns"><a class="btn btn-primary sm-wa" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z"/></svg>Send on WhatsApp</a><a class="btn btn-dark sm-mail"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>Send by email</a></div>
      </div></div>`);
    m=$('#sendModal');
    const close=()=>m.classList.remove('show');
    $('.sm-x',m).addEventListener('click',close);
    m.addEventListener('click',e=>{ if(e.target===m) close(); });
    addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
    $$('.sm-btns a',m).forEach(a=>a.addEventListener('click',()=>setTimeout(close,300)));
  }
  const body=['Hi EducationMent, I\'d like a quote for my assignment.','',...lines].join('\n');
  const T={
    choose:['Almost there','How would you like to send your brief?','Your details are ready. Choose WhatsApp for the fastest reply, or email if you prefer.'],
    sending:['One moment','Sending your brief…','We are sending your details to our team.'],
    sent:['Brief received','Thank you, we have your brief.','Our team will reply shortly with your instant quote. Want an even faster reply? Continue on WhatsApp, and share any files there.'],
  }[mode];
  $('.eyebrow',m).textContent=T[0]; $('h3',m).textContent=T[1]; $('.sm-card>p',m).textContent=T[2];
  $('.sm-sum',m).textContent=lines.join('\n');
  $('.sm-btns',m).style.display = mode==='sending' ? 'none' : '';
  $('.sm-mail',m).style.display = mode==='sent' ? 'none' : '';
  $('.sm-btns',m).style.gridTemplateColumns = mode==='sent' ? '1fr' : '';
  $('.sm-wa',m).href=`https://wa.me/${CONTACT.wa}?text=${encodeURIComponent(body)}`;
  $('.sm-mail',m).href=`mailto:${CONTACT.email}?subject=${encodeURIComponent('Quote request')}&body=${encodeURIComponent(body)}`;
  m.classList.add('show');
  if(mode!=='sending') setTimeout(()=>$('.sm-wa',m).focus(),50);
}
async function emailBrief(f, lines){
  const val=re=>{ const l=lines.find(x=>re.test(x)); return l ? l.split(': ').slice(1).join(': ') : ''; };
  const contact=val(/^(WhatsApp or email|WhatsApp \/ Email): /);
  const payload={
    access_key:CONTACT.web3key,
    subject:`New quote request: ${val(/^Service: /)||'Website enquiry'}${val(/^Subject: /)?' · '+val(/^Subject: /):''}`,
    from_name:'EducationMent website',
    name:val(/^Your name: /)||'Website visitor',
    contact, page:location.pathname,
    message:lines.join('\n'),
    botcheck:$('input[name=botcheck]',f)?.checked||false,
  };
  if(/@/.test(contact)) payload.replyto=contact;
  const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload)});
  const j=await r.json().catch(()=>({}));
  if(!r.ok || !j.success) throw new Error(j.message||'send failed');
}
$$('form.quote, form.contact-form').forEach(f=>{
  // hidden spam trap for bots; real visitors never see or tick it
  f.insertAdjacentHTML('beforeend','<input type="checkbox" name="botcheck" tabindex="-1" autocomplete="off" style="display:none">');
  f.addEventListener('submit',async e=>{
    e.preventDefault();
    const lines=formSummary(f);
    const typed=$$('input:not([type=file]):not([name=botcheck]), textarea',f).some(el=>el.value.trim());
    if(!typed){ toast('Please add a few details, such as your deadline or contact, first.'); return; }
    if(!CONTACT.web3key){ sendModal(lines); return; }
    sendModal(lines,'sending');
    try{ await emailBrief(f,lines); sendModal(lines,'sent'); f.reset(); }
    catch(err){ sendModal(lines,'choose'); }
  });
});
$$('.cf-drop').forEach(d=>{ const inp=$('input[type=file]',d), b=$('b',d); if(inp) inp.addEventListener('change',()=>{ if(inp.files.length) b.textContent=`${inp.files.length} file(s) selected. You can share them in the chat.`; }); });

/* ---------- reviews (placeholders) ---------- */
(function(){
  const host=$('#revRows'); if(!host) return;
  const REVIEWS = [
    ['The structure and referencing in my dissertation chapters were on another level. My supervisor\'s feedback was the best I\'d had all year.','A. R.','MSc Finance · United Kingdom','#F57C1F'],
    ['They matched me with a nurse educator who understood exactly what my care plan needed. Delivered a day early.','S. K.','BSc Nursing · Australia','#2F6FD6'],
    ['My business plan presentation looked like it came from a consulting firm. Clear, sharp and on brand.','M. A.','MBA · Dubai','#14965A'],
    ['Fast replies on WhatsApp at 2am my time made all the difference before my deadline.','J. T.','BEng Mechanical · Canada','#8B5CF6'],
    ['Annotated bibliography with genuinely relevant sources, perfectly formatted in APA 7th edition.','L. M.','MA Psychology · USA','#E11D48'],
    ['The case analysis used the exact frameworks my module asked for. Easily the most helpful service I\'ve used.','R. P.','LLB Law · New Zealand','#0EA5E9'],
    ['A live session with my statistics expert finally made the analysis click for me.','D. N.','BSc Mathematics · Europe','#F59E0B'],
    ['Professional from the first message to delivery. I\'ve recommended them to my whole cohort.','P. S.','MSc Computer Science · India','#10B981'],
  ];
  const star = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.9 7.5.6-5.7 4.9 1.8 7.3L12 17.8 5.4 21.7l1.8-7.3L1.5 9.5 9 8.9z"/></svg>';
  const card=([q,n,w,c])=>`<article class="rev"><div class="top"><span class="stars">${star.repeat(5)}</span><span class="chip">Sample review</span></div><blockquote>“${q}”</blockquote><div class="who"><i style="background:${c}">${n.replace(/[^A-Z]/g,'')}</i><div><b>${n}</b><span>${w}</span></div></div></article>`;
  const half=Math.ceil(REVIEWS.length/2);
  [REVIEWS.slice(0,half),REVIEWS.slice(half)].forEach((set,i)=>{
    const cards=set.map(card).join('');
    host.insertAdjacentHTML('beforeend',`<div class="rev-row ${i?'r2':''}"><div class="rev-track">${cards}${cards}${cards}${cards}</div></div>`);
  });
})();

/* ---------- FAQ accordions ---------- */
$$('.qa').forEach(qa=>{
  const a=$('.a',qa);
  if(qa.classList.contains('open')) a.style.height='auto';
  $('button',qa).addEventListener('click',()=>{
    const open=qa.classList.contains('open'), group=qa.parentElement;
    $$('.qa.open',group).forEach(o=>{ if(o!==qa){ const oa=$('.a',o); oa.style.height=oa.scrollHeight+'px'; requestAnimationFrame(()=>oa.style.height='0'); o.classList.remove('open'); }});
    if(open){ a.style.height=a.scrollHeight+'px'; requestAnimationFrame(()=>a.style.height='0'); qa.classList.remove('open'); }
    else { qa.classList.add('open'); a.style.height=a.scrollHeight+'px'; a.addEventListener('transitionend',()=>{ if(qa.classList.contains('open')) a.style.height='auto'; },{once:true}); }
  });
});

/* ---------- quote tabs ---------- */
$$('.quote .tabs').forEach(tabs=>{
  const sel=$('select[name=service]',tabs.closest('form'));
  $$('button',tabs).forEach((b,i,all)=>b.addEventListener('click',()=>{
    all.forEach(x=>x.classList.remove('on')); b.classList.add('on'); tabs.dataset.i=i;
    if(sel) sel.value = i ? 'Presentation & Poster' : (sel.dataset.default||'Research Paper');
  }));
});

/* ---------- menus ---------- */
const burger=$('.burger');
if(burger) burger.addEventListener('click',()=>document.body.classList.toggle('menu-open'));
$$('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('menu-open')));
$$('.has-mega').forEach(li=>{
  let t; const open=()=>{ clearTimeout(t); $$('.has-mega.open').forEach(o=>o!==li&&o.classList.remove('open')); li.classList.add('open'); };
  const close=()=>{ t=setTimeout(()=>li.classList.remove('open'),140); };
  li.addEventListener('pointerenter',open); li.addEventListener('pointerleave',close);
  li.addEventListener('focusin',open); li.addEventListener('focusout',e=>{ if(!li.contains(e.relatedTarget)) li.classList.remove('open'); });
});
addEventListener('keydown',e=>{ if(e.key==='Escape') $$('.has-mega.open').forEach(o=>o.classList.remove('open')); });

/* ---------- hero dot grid ---------- */
$$('canvas.grid').forEach(c=>{
  const x=c.getContext('2d'); let w,h,dpr,mx=-999,my=-999,t=0;
  function size(){ dpr=Math.min(devicePixelRatio,2); w=c.clientWidth; h=c.clientHeight; c.width=w*dpr; c.height=h*dpr; x.setTransform(dpr,0,0,dpr,0,0); }
  size(); addEventListener('resize',size);
  c.parentElement.addEventListener('pointermove',e=>{ const r=c.getBoundingClientRect(); mx=e.clientX-r.left; my=e.clientY-r.top; });
  c.parentElement.addEventListener('pointerleave',()=>{mx=my=-999});
  const G=34;
  (function draw(){
    x.clearRect(0,0,w,h); t+=0.006;
    for(let gx=G/2; gx<w; gx+=G) for(let gy=G/2; gy<h; gy+=G){
      const d=Math.hypot(gx-mx,gy-my), near=Math.max(0,1-d/220);
      const wave=(Math.sin(gx*0.012+t*2)+Math.cos(gy*0.014-t*1.6))*0.25+0.5;
      const a=0.06+wave*0.08+near*0.7;
      x.fillStyle=near>0.02?`rgba(255,155,78,${a})`:`rgba(160,190,240,${a})`;
      x.beginPath(); x.arc(gx,gy,1+near*1.6,0,6.283); x.fill();
    }
    if(!reduced) requestAnimationFrame(draw);
  })();
});

/* ---------- globe: real continents, great circle routes ---------- */
(async function(){
  const c=$('#globe'); if(!c || !window.d3) return;
  const x=c.getContext('2d'); let S=0,dpr=1;
  function size(){ dpr=Math.min(devicePixelRatio,2); S=c.clientWidth; c.width=S*dpr; c.height=S*dpr; x.setTransform(dpr,0,0,dpr,0,0); }
  size(); addEventListener('resize',size);
  const PLACES=[
    {name:'United Kingdom',ll:[-0.1,51.5],left:true},{name:'United States',ll:[-74,40.7]},{name:'Australia',ll:[151.2,-33.9],left:true},
    {name:'Dubai',ll:[55.3,25.2]},{name:'New Zealand',ll:[174.8,-36.8]},{name:'Canada',ll:[-79.4,43.7],left:true},
    {name:'Europe',ll:[13.4,52.5]},{name:'India',ll:[72.9,19.1]}];
  const HUB=PLACES[7].ll;
  const proj=d3.geoOrthographic().clipAngle(90).precision(0.4), path=d3.geoPath(proj,x), grat=d3.geoGraticule10();
  let land=null, dots=[];
  try{
    const topo=await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json').then(r=>r.json());
    land=topojson.feature(topo,topo.objects.land);
    const mw=1080,mh=540,m=document.createElement('canvas'); m.width=mw; m.height=mh;
    const mc=m.getContext('2d',{willReadFrequently:true});
    const eq=d3.geoEquirectangular().scale(mw/(2*Math.PI)).translate([mw/2,mh/2]);
    mc.fillStyle='#000'; mc.beginPath(); d3.geoPath(eq,mc)(land); mc.fill();
    const data=mc.getImageData(0,0,mw,mh).data, step=1.35;
    for(let lat=-58; lat<=84; lat+=step){
      const n=Math.max(1,Math.round(360*Math.cos(lat*Math.PI/180)/step));
      for(let i=0;i<n;i++){
        const lon=-180+(i+0.5)*360/n;
        const px=Math.min(mw-1,Math.floor((lon+180)/360*mw)), py=Math.min(mh-1,Math.floor((90-lat)/180*mh));
        if(data[(py*mw+px)*4+3]>100) dots.push([lon,lat]);
      }
    }
  }catch(e){}
  let lambda=-HUB[0]+40, phi=-18, target=null, dragging=false, lx=0, ly=0, hl=-1;
  c.addEventListener('pointerdown',e=>{dragging=true;target=null;lx=e.clientX;ly=e.clientY;c.setPointerCapture(e.pointerId)});
  c.addEventListener('pointermove',e=>{ if(!dragging) return; lambda+=(e.clientX-lx)*0.35; phi=Math.max(-60,Math.min(60,phi-(e.clientY-ly)*0.25)); lx=e.clientX; ly=e.clientY; });
  c.addEventListener('pointerup',()=>{dragging=false;});
  const aim=i=>{ hl=i; const p=PLACES[i].ll; target=[-p[0],Math.max(-45,Math.min(45,-p[1]))]; };
  $$('#regions .region').forEach(r=>{
    r.addEventListener('mouseenter',()=>aim(+r.dataset.i));
    r.addEventListener('mouseleave',()=>{ hl=-1; target=null; });
    r.addEventListener('click',()=>{ $$('#regions .region').forEach(o=>o.classList.toggle('hl',o===r)); aim(+r.dataset.i); });
  });
  const routes=PLACES.slice(0,7).map(p=>({p,interp:d3.geoInterpolate(HUB,p.ll)}));
  const t0=performance.now();
  function frame(now){
    const t=(now-t0)/1000;
    if(target){ const dl=((target[0]-lambda+540)%360)-180; lambda+=dl*0.08; phi+=(target[1]-phi)*0.08; }
    else if(!dragging){ lambda+=0.09; phi+=(-18-phi)*0.01; }
    const R=S*0.43; proj.scale(R).translate([S/2,S/2]).rotate([lambda,phi]);
    const centre=[-lambda,-phi];
    x.clearRect(0,0,S,S);
    let g=x.createRadialGradient(S/2,S/2,R*0.92,S/2,S/2,R*1.22);
    g.addColorStop(0,'rgba(80,140,255,.28)'); g.addColorStop(1,'rgba(80,140,255,0)');
    x.fillStyle=g; x.beginPath(); x.arc(S/2,S/2,R*1.22,0,6.283); x.fill();
    g=x.createRadialGradient(S/2-R*0.35,S/2-R*0.4,R*0.1,S/2,S/2,R);
    g.addColorStop(0,'#1A3F86'); g.addColorStop(.55,'#0C2457'); g.addColorStop(1,'#061436');
    x.fillStyle=g; x.beginPath(); x.arc(S/2,S/2,R,0,6.283); x.fill();
    x.beginPath(); path(grat); x.strokeStyle='rgba(140,180,255,.08)'; x.lineWidth=1; x.stroke();
    if(land){
      x.beginPath(); path(land); x.fillStyle='rgba(90,140,230,.16)'; x.fill();
      x.strokeStyle='rgba(150,190,255,.22)'; x.lineWidth=.7; x.stroke();
      const ds=Math.max(1.1,R/260);
      for(const d of dots){ const dist=d3.geoDistance(d,centre); if(dist>1.52) continue; const p=proj(d); x.fillStyle=`rgba(190,215,255,${0.25+Math.cos(dist)*0.6})`; x.fillRect(p[0]-ds/2,p[1]-ds/2,ds,ds); }
    }
    x.beginPath(); x.arc(S/2,S/2,R,0,6.283); x.strokeStyle='rgba(140,185,255,.35)'; x.lineWidth=1.2; x.stroke();
    x.lineCap='round';
    routes.forEach((r,i)=>{
      const on=hl===i||hl===7;
      x.beginPath(); path({type:'LineString',coordinates:[HUB,r.p.ll]});
      x.strokeStyle=on?'rgba(255,160,90,.95)':'rgba(245,124,31,.55)'; x.lineWidth=on?2.6:1.6;
      x.shadowColor='rgba(245,124,31,.8)'; x.shadowBlur=on?14:6; x.stroke(); x.shadowBlur=0;
      const pt=r.interp(((t*0.22)+i*0.17)%1);
      if(d3.geoDistance(pt,centre)<1.5){ const q=proj(pt); x.fillStyle='#FFE2CC'; x.shadowColor='#F57C1F'; x.shadowBlur=12; x.beginPath(); x.arc(q[0],q[1],2.6,0,6.283); x.fill(); x.shadowBlur=0; }
    });
    const font=getComputedStyle(document.documentElement).getPropertyValue('--sans');
    PLACES.forEach((p,i)=>{
      const dist=d3.geoDistance(p.ll,centre); if(dist>1.45) return;
      const q=proj(p.ll), big=hl===i, hub=i===7, a=Math.min(1,Math.cos(dist)*1.6), pulse=(t*0.8+i*0.21)%1;
      x.strokeStyle=`rgba(245,124,31,${(1-pulse)*0.7*a})`; x.lineWidth=1.5; x.beginPath(); x.arc(q[0],q[1],5+pulse*(big?26:16),0,6.283); x.stroke();
      x.fillStyle=hub?'#fff':'#F57C1F'; x.beginPath(); x.arc(q[0],q[1],big||hub?5.5:4,0,6.283); x.fill();
      x.strokeStyle='#050F27'; x.lineWidth=1.5; x.stroke();
      if(S<480 && !big) return;
      x.font=`700 ${big?14:12}px ${font}`;
      const label=hub?'India (HQ)':p.name, tw=x.measureText(label).width;
      const lxp=Math.max(8,Math.min(S-tw-10,p.left?q[0]-10-tw:q[0]+10)), lyp=Math.max(18,q[1]-10);
      x.fillStyle=`rgba(5,15,39,${0.75*a})`; x.beginPath(); x.roundRect(lxp-6,lyp-13,tw+12,20,6); x.fill();
      x.fillStyle=`rgba(255,255,255,${a})`; x.fillText(label,lxp,lyp+1);
    });
    if(!reduced) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

/* ---------- CTA flowing lines ---------- */
$$('canvas.cta-lines').forEach(c=>{
  const x=c.getContext('2d'); let w,h,dpr,t=0;
  function size(){ dpr=Math.min(devicePixelRatio,2); w=c.clientWidth; h=c.clientHeight; c.width=w*dpr; c.height=h*dpr; x.setTransform(dpr,0,0,dpr,0,0); }
  size(); addEventListener('resize',size);
  (function draw(){
    t+=0.004; x.clearRect(0,0,w,h);
    for(let i=0;i<22;i++){
      x.beginPath();
      for(let px=0; px<=w; px+=12){ const y=h*0.5+Math.sin(px*0.004+t*2+i*0.25)*h*0.18+Math.cos(px*0.002-t+i*0.4)*h*0.12+(i-11)*9; px?x.lineTo(px,y):x.moveTo(px,y); }
      x.strokeStyle=i%5===0?'rgba(245,124,31,.22)':'rgba(140,175,240,.05)'; x.lineWidth=1; x.stroke();
    }
    if(!reduced) requestAnimationFrame(draw);
  })();
});

/* ---------- card spotlight + tilt ---------- */
$$('.tilt').forEach(el=>{
  el.addEventListener('pointermove',e=>{
    const r=el.getBoundingClientRect(), px=(e.clientX-r.left)/r.width, py=(e.clientY-r.top)/r.height;
    el.style.setProperty('--mx',px*100+'%'); el.style.setProperty('--my',py*100+'%');
    if(!reduced) el.style.transform=`perspective(900px) rotateX(${(0.5-py)*5}deg) rotateY(${(px-0.5)*5}deg) translateY(-4px)`;
  });
  el.addEventListener('pointerleave',()=>{ el.style.transform=''; });
});

/* ---------- magnetic buttons ---------- */
if(!reduced && matchMedia('(pointer:fine)').matches){
  $$('.magnetic').forEach(b=>{
    b.addEventListener('pointermove',e=>{ const r=b.getBoundingClientRect(); b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*0.18}px,${(e.clientY-r.top-r.height/2)*0.12}px)`; });
    b.addEventListener('pointerleave',()=>{ b.style.transition='transform .6s cubic-bezier(.22,1,.36,1), box-shadow .4s'; b.style.transform=''; setTimeout(()=>b.style.transition='',600); });
  });
}

/* ---------- nav state ---------- */
addEventListener('scroll',()=>{ const n=$('#nav'); if(n) n.classList.toggle('scrolled',scrollY>40); },{passive:true});

/* ---------- project tracker loop (homepage) ---------- */
(function(){
  const fg=$('#ringFg'), pc=$('#ringPct'), stg=$('#stage'); if(!fg) return;
  const STAGES=['Brief reviewed','Expert assigned','Research & drafting','Quality check','Delivered']; let i=1;
  function tick(){
    const p=i*20; fg.style.strokeDashoffset=113.1*(1-p/100); pc.textContent=p+'%';
    stg.style.opacity=0; setTimeout(()=>{ stg.textContent=STAGES[i-1]; stg.style.opacity=1; i=i>=5?1:i+1; },250);
    setTimeout(tick, i===5?2600:1500);
  }
  setTimeout(tick, reduced?0:2600);
})();

/* ---------- GSAP motion ---------- */
if (window.gsap && !reduced) {
  gsap.registerPlugin(ScrollTrigger);
  const has=s=>!!$(s);
  if (window.Lenis){
    const lenis=new Lenis({duration:1.15,smoothWheel:true});
    lenis.on('scroll',ScrollTrigger.update);
    gsap.ticker.add(t=>lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{ const id=a.getAttribute('href'); if(id.length>1 && $(id)){ e.preventDefault(); lenis.scrollTo(id,{offset:-90}); } }));
    if(location.hash && $(location.hash)) setTimeout(()=>lenis.scrollTo(location.hash,{offset:-90,immediate:true}),60);
  }
  gsap.to('.progress',{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:true}});

  if(has('.loader') && has('#ul')){
    /* homepage: preloader then hero intro */
    const ul=$('#ul'), L=ul.getTotalLength();
    gsap.set(ul,{strokeDasharray:L,strokeDashoffset:L});
    gsap.set('.loader',{clipPath:'inset(0 0 0% 0)'});
    gsap.set('.loader .word span',{yPercent:115});
    const pctEl=$('#loaderPct'), pct={v:0};
    const tl=gsap.timeline({defaults:{ease:'expo.out'},paused:true});
    tl.to('.loader .mark',{opacity:1,y:0,duration:.7})
      .to('.loader .word span',{yPercent:0,duration:.9,stagger:.035},'-=.45')
      .to('.loader .meta',{opacity:1,duration:.4},'-=.7')
      .to('.loader .bar i',{scaleX:1,duration:1.1,ease:'power2.inOut'},'<')
      .to(pct,{v:100,duration:1.1,ease:'power2.inOut',onUpdate:()=>pctEl.textContent=Math.round(pct.v)+'%'},'<')
      .to('.loader .brand',{y:-24,opacity:0,duration:.5,ease:'power2.in'},'+=.15')
      .to('.loader',{clipPath:'inset(0 0 100% 0)',duration:.9,ease:'expo.inOut'},'-=.15')
      .set('.loader',{display:'none'})
      .from('.hero h1 .line>span',{yPercent:110,rotate:3,duration:1.2,stagger:.1},'-=.45')
      .to(ul,{strokeDashoffset:0,duration:1,ease:'power3.inOut'},'-=.6')
      .from('.h-fade',{y:30,opacity:0,duration:1,stagger:.08},'-=1')
      .from('.quote',{y:60,opacity:0,duration:1.2},'-=1')
      .from('.fc-human',{x:-40,opacity:0,duration:1},'-=.8')
      .from('.fc-track',{y:40,opacity:0,duration:1},'-=.85')
      .from('.marquee',{opacity:0,duration:1},'-=.8');
    Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,1200))]).then(()=>tl.play());
    gsap.to('.fc-human',{y:-12,duration:3,repeat:-1,yoyo:true,ease:'sine.inOut',delay:3});
    gsap.to('.fc-track',{y:10,duration:3.6,repeat:-1,yoyo:true,ease:'sine.inOut',delay:3});
    gsap.matchMedia().add('(min-width:1101px)',()=>{
      gsap.to('.hero-grid',{y:-60,opacity:.4,scrollTrigger:{trigger:'.hero',start:'center top',end:'bottom top',scrub:true}});
    });
  } else if(has('.page-hero')){
    /* inner pages: quick, confident entrance */
    const tl=gsap.timeline({defaults:{ease:'expo.out'}});
    tl.from('.page-hero .ph-in',{y:40,opacity:0,duration:1.1,stagger:.08})
      .from('.page-hero .quote, .page-hero .ph-card',{y:50,opacity:0,duration:1.2},'-=.9');
  }
  if(has('.ph-bg')) gsap.from('.ph-bg',{scale:1.12,opacity:0,duration:2.4,ease:'expo.out'});
  $$('.pb-frame img').forEach(img=>gsap.fromTo(img,{yPercent:-6},{yPercent:6,ease:'none',scrollTrigger:{trigger:img.parentElement,start:'top bottom',end:'bottom top',scrub:true}}));
  if(has('.hero .orb.o1')) gsap.to('.hero .orb.o1',{yPercent:30,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});

  $$('h2.split').forEach(h=>{
    const walk=node=>{ [...node.childNodes].forEach(n=>{
      if(n.nodeType===3){ const frag=document.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach(part=>{ if(!part) return; if(/^\s+$/.test(part)){ frag.append(part); return; } const o=document.createElement('span'); o.style.cssText='display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em;margin-bottom:-.08em'; const i=document.createElement('span'); i.className='wi'; i.style.display='inline-block'; i.textContent=part; o.append(i); frag.append(o); }); n.replaceWith(frag); }
      else if(n.nodeType===1){ walk(n); } }); };
    walk(h);
    gsap.from($$('.wi',h),{yPercent:110,duration:1.1,ease:'expo.out',stagger:.035,scrollTrigger:{trigger:h,start:'top 85%'}});
  });
  $$('.reveal').forEach(el=>gsap.from(el,{y:30,opacity:0,duration:1,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 92%'}}));
  $$('.reveal-group').forEach(g=>gsap.from(g.children,{y:40,opacity:0,duration:1,ease:'expo.out',stagger:.07,scrollTrigger:{trigger:g,start:'top 88%'}}));
  $$('.svc-grid').forEach(g=>gsap.from($$('.svc',g),{y:60,opacity:0,duration:1.1,ease:'expo.out',stagger:.07,scrollTrigger:{trigger:g,start:'top 85%'}}));
  if(has('.chapters')) gsap.from('.chapters li',{x:-20,opacity:0,duration:.8,ease:'expo.out',stagger:.1,scrollTrigger:{trigger:'.chapters',start:'top 85%'}});

  $$('.count').forEach(el=>{ const to=+el.dataset.to, o={v:0};
    gsap.to(o,{v:to,duration:2.2,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%'},onUpdate:()=>el.textContent=Math.round(o.v).toLocaleString('en')}); });

  const st=$('#statement');
  if(st){
    const parts=[];
    st.childNodes.forEach(n=>{ if(n.nodeType===3) n.textContent.split(/(\s+)/).forEach(p=>parts.push({t:p,acc:false})); else parts.push({t:n.textContent,acc:true}); });
    st.innerHTML=parts.map(p=>/^\s+$/.test(p.t)||!p.t?p.t:`<span class="w${p.acc?' acc':''}">${p.t}</span>`).join('');
    const words=$$('.w',st);
    ScrollTrigger.create({trigger:st,start:'top 80%',end:'bottom 45%',scrub:true,onUpdate:s=>{ const n=Math.round(s.progress*words.length); words.forEach((w,i)=>w.classList.toggle('on',i<n)); }});
  }

  if(has('#steps')){
    gsap.to('.steps .rail i',{scaleX:1,ease:'none',scrollTrigger:{trigger:'#steps',start:'top 75%',end:'bottom 55%',scrub:true}});
    $$('.step').forEach((s,i)=>ScrollTrigger.create({trigger:'#steps',start:()=>`top+=${i*40} 70%`,onEnter:()=>s.classList.add('on'),onLeaveBack:()=>s.classList.remove('on')}));
    gsap.from('.step',{y:50,opacity:0,duration:1,ease:'expo.out',stagger:.12,scrollTrigger:{trigger:'#steps',start:'top 80%'}});
  }
  if(has('.seal .spin')) gsap.to('.seal .spin',{rotate:360,duration:20,repeat:-1,ease:'none'});
  if(has('.cta-box')) gsap.from('.cta-box',{scale:.92,duration:1.4,ease:'expo.out',scrollTrigger:{trigger:'.cta-box',start:'top 85%'}});
  if(has('.big-word')) gsap.from('.big-word',{yPercent:40,opacity:0,duration:1.6,ease:'expo.out',scrollTrigger:{trigger:'.big-word',start:'top 98%'}});
} else {
  $$('.count').forEach(el=>el.textContent=(+el.dataset.to).toLocaleString('en'));
  $$('.step').forEach(s=>s.classList.add('on'));
  const l=$('.loader'); if(l) l.style.display='none';
  $$('.steps .rail i').forEach(i=>i.style.transform='scaleX(1)');
}

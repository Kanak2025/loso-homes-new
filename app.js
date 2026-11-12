(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const INR=n=>'₹'+Math.round(n).toLocaleString('en-IN');
const norm=a=>((a+540)%360)-180;
const IG='https://www.instagram.com/loso.homes';
const IGI='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.8" r=".9" fill="currentColor" stroke="none"/></svg>';

/* ---------- live marble preview (used by the Customize studio only) ---------- */
const M={travertine:{n:'Italian Travertine',c:['#e4d8bf','#a38c64']},emperador:{n:'Emperador Brown',c:['#6e4c39','#d2b496']},verde:{n:'Verde Alpi',c:['#2c5a47','#cfe3d6']},carrara:{n:'Carrara White',c:['#f0eeea','#8e969b']},nero:{n:'Nero Marquina',c:['#1a1a1b','#d8d4cc']},rosso:{n:'Rosso Levanto',c:['#8b2e2a','#efcfa8']},makrana:{n:'Makrana White',c:['#f6f4ef','#b2aa9c']},pink:{n:'Pink Marble',c:['#d9aba3','#f6e6e1']}};
const MK=Object.keys(M);let U=0;
const rgb=h=>[1,3,5].map(i=>(parseInt(h.substr(i,2),16)/255).toFixed(3));
const e=(x,y,a,b)=>`M${x-a} ${y}a${a} ${b} 0 1 0 ${2*a} 0a${a} ${b} 0 1 0 ${-2*a} 0z`,r=(x,y,w,h)=>`M${x} ${y}h${w}v${h}h${-w}z`;
const SH={side:[[e(100,62,58,14),0],['M42 62v12a58 14 0 0 0 116 0v-12z',.2],[r(86,86,28,74),.3],['M60 160v6a40 10 0 0 0 80 0v-6z',.3],[e(100,160,40,10),.06]],
coffee:[['M30 66h140l14 16H16z',0],[r(16,82,168,16),.2],[r(36,98,34,64),.3],[r(130,98,34,64),.3]],
dining:[[e(100,70,86,22),0],['M14 70v14a86 22 0 0 0 172 0v-14z',.2],['M80 92h40l10 70H70z',.3],['M54 164v6a46 9 0 0 0 92 0v-6z',.3],[e(100,164,46,9),.06]],
bowl:[['M24 90h152c0 50-30 76-76 76S24 140 24 90z',.14],[e(100,90,76,14),.42]],
vase:[['M82 40h36l-4 22c34 20 44 60 24 90-6 10-80 10-88 0-20-30-10-70 24-90z',.12],[e(100,40,18,5),.45]],
tray:[[e(100,120,84,26),0],['M16 120v10a84 26 0 0 0 168 0v-10z',.24],[e(100,118,72,20),.14]],
stool:[[e(100,84,44,11),0],['M56 84v8a44 11 0 0 0 88 0v-8z',.2],['M66 98h68l-5 66H71z',.3],['M70 164v4a30 7 0 0 0 60 0v-4z',.3]]};
function art(t,mk,sx=1,sy=1){const id='a'+(++U),[b,v]=M[mk].c,P=SH[t],[R,G,B]=rgb(v);
  return `<svg class="art" viewBox="8 34 184 148" role="img" aria-label="${M[mk].n} ${t}"><defs><filter id="${id}f" x="0" y="0" width="100%" height="100%"><feTurbulence type="turbulence" baseFrequency=".011 .026" numOctaves="4" seed="${(U*7)%90}"/><feColorMatrix type="matrix" values="0 0 0 0 ${R} 0 0 0 0 ${G} 0 0 0 0 ${B} -26 0 0 0 3.0"/></filter><clipPath id="${id}c">${P.map(p=>`<path d="${p[0]}"/>`).join('')}</clipPath></defs><ellipse cx="100" cy="172" rx="${70*sx}" ry="7" fill="rgba(0,0,0,.22)"/><g transform="translate(100 170) scale(${sx} ${sy}) translate(-100 -170)"><g clip-path="url(#${id}c)"><rect width="200" height="200" fill="${b}"/><rect width="200" height="200" filter="url(#${id}f)"/></g>${P.map(p=>`<path d="${p[0]}" fill="#000" opacity="${p[1]}"/>`).join('')}<path d="${P[0][0]}" fill="url(#gl)"/></g></svg>`}
const sw=m=>`linear-gradient(135deg,${M[m].c[0]},${M[m].c[1]})`;

/* ---------- catalogue (real photos) ---------- */
const L=window.LOSO_ITEMS,P=L.map(it=>({...it,id:'p'+it.id}));
const byId=id=>P.find(p=>p.id===id),pid=n=>byId('p'+n);
const CATS=[['all','All'],['side','Side Tables'],['coffee','Coffee Tables'],['dining','Dining'],['bath','Bath & Basins'],['decor','Décor & Garden'],['best','Bestsellers'],['sale','Sale']];
const pct=p=>p.mrp?Math.round((1-p.price/p.mrp)*100):0;
const img=p=>`<img alt="${p.name}" src="${p.img}" onerror="this.remove()">`;
const bg=p=>`background:linear-gradient(155deg,${p.tone[0]},${p.tone[1]})`;
const card=p=>`<a class="pc rv" href="#/p/${p.id}"><div class="pv" style="${bg(p)}">${img(p)}${p.mrp?`<span class="bdg">−${pct(p)}%</span>`:''}<div class="acts"><button data-add="${p.id}">Add to cart</button><button data-enq="${p.id}">Enquire</button></div></div><div class="pn">${p.name}</div><div class="pp"><b>${INR(p.price)}</b>${p.mrp?`<s>${INR(p.mrp)}</s>`:''}</div></a>`;

/* ---------- toast, cart, enquiry, overlays ---------- */
let tt;const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),2800)};
let cart=[];try{cart=JSON.parse(localStorage.getItem('loso_cart2')||'[]')}catch(_){}
const save=()=>{try{localStorage.setItem('loso_cart2',JSON.stringify(cart))}catch(_){}};
function addCart(id,qty=1){const f=cart.find(c=>c.id===id);f?f.qty+=qty:cart.push({id,qty});save();paintCart();const c=$('#cc');c.classList.add('bump');setTimeout(()=>c.classList.remove('bump'),250);toast(`Added to cart — ${byId(id).name}`)}
function paintCart(){
  const n=cart.reduce((a,c)=>a+c.qty,0),sub=cart.reduce((a,c)=>a+byId(c.id).price*c.qty,0);$('#cc').textContent=n;
  $('#cb').innerHTML=cart.length?cart.map(c=>{const p=byId(c.id);return `<div class="ci"><div class="pv" style="${bg(p)}">${img(p)}</div><div><b>${p.name}</b><small>${p.mat}</small><div class="qty" style="margin-top:.4rem"><button data-q="${c.id}" data-d="-1">−</button><span>${c.qty}</span><button data-q="${c.id}" data-d="1">+</button></div></div><div style="text-align:right"><div>${INR(p.price*c.qty)}</div><button data-rm="${c.id}" class="eb" style="margin-top:.5rem;color:var(--mut)">Remove</button></div></div>`}).join(''):'<p style="text-align:center;padding:4rem 0;color:var(--mut)">Your cart is empty.<br><a class="lnk" href="#/shop/all" data-close style="display:inline-block;margin-top:1rem">Explore collections</a></p>';
  const left=Math.max(0,25000-sub);
  $('#cf').innerHTML=cart.length?`<div class="eb">${left?`Add ${INR(left)} more for free shipping`:'You unlocked free shipping ✓'}</div><div class="bar"><i style="width:${Math.min(100,sub/250)}%"></i></div><div style="display:flex;justify-content:space-between;font:500 24px var(--serif);margin-bottom:1rem"><span>Subtotal</span><span>${INR(sub)}</span></div><button class="btn" style="width:100%" data-checkout>Checkout</button><button class="btn g" style="width:100%;margin-top:.5rem" data-enq="cart">Send enquiry for this cart</button>`:'';
}
const openD=s=>{$(s).classList.add('open');$('#ov').classList.add('open');document.body.style.overflow='hidden';if(s==='#so')setTimeout(()=>$('#si').focus(),300)};
const closeAll=()=>{$$('.drawer,.so').forEach(x=>x.classList.remove('open'));$('#nav').classList.remove('open');$('#burger').setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');$('#ov').classList.remove('open');if(!$('#modal').classList.contains('open')&&!$('#enq').classList.contains('open'))document.body.style.overflow=''};
function enquire(p,cartMode){
  const m=$('#enq');let msg='',title='Tell us what you’re looking for',sub='';
  if(cartMode){msg='I’d like to enquire about: '+cart.map(c=>byId(c.id).name+' ×'+c.qty).join(', ')+'.';title='Enquiry for your cart'}
  else if(p){msg=`I’m interested in ${p.name}. Please share availability, size options and delivery time.`;title=p.name;sub=`${INR(p.price)} · ${p.mat}`}
  m.innerHTML=`<div class="slab enq"><button class="mx" data-xe aria-label="Close">✕</button><div class="ev" style="--t1:${p?p.tone[0]:'#d8c9a8'};--t2:${p?p.tone[1]:'#8a7a5c'}">${p?img(p):''}</div><form class="minfo" id="ef"><div class="eb">Send enquiry</div><h3>${title}</h3>${sub?`<p style="color:var(--mut)">${sub}</p>`:''}<label class="fld"><span>Name</span><input name="n" required></label><label class="fld"><span>Phone / WhatsApp</span><input name="t" required></label><label class="fld"><span>Email (optional)</span><input type="email" name="e"></label><label class="fld"><span>Message</span><textarea name="m" rows="3">${msg}</textarea></label><button class="btn">Send enquiry</button></form></div>`;
  m.classList.add('open');document.body.style.overflow='hidden';
  $('#ef').onsubmit=ev=>{ev.preventDefault();closeEnq();toast('Thank you — we’ll reply within 24 hours')};
}
const closeEnq=()=>{$('#enq').classList.remove('open');if(!$('#modal').classList.contains('open'))document.body.style.overflow=''};
function search(q){q=q.trim().toLowerCase();const r=q?P.filter(p=>(p.name+' '+p.cat+' '+p.mat).toLowerCase().includes(q)).slice(0,8):P.filter(p=>p.best).slice(0,4);$('#sr').innerHTML=r.length?r.map(p=>card(p).replace('rv','rv in')).join(''):'<p>No results — try “table” or “basin”.</p>'}

document.addEventListener('click',ev=>{
  const t=ev.target,a=t.closest('[data-add]');
  if(a){ev.preventDefault();addCart(a.dataset.add);return}
  const en=t.closest('[data-enq]');if(en){ev.preventDefault();en.dataset.enq==='cart'?enquire(null,1):enquire(en.dataset.enq?byId(en.dataset.enq):null);return}
  if(t.closest('[data-xe]')||t.id==='enq'){closeEnq();return}
  const q=t.closest('[data-q]');if(q){const c=cart.find(x=>x.id===q.dataset.q);c.qty+=+q.dataset.d;if(c.qty<1)cart=cart.filter(x=>x!==c);save();paintCart();return}
  const rm=t.closest('[data-rm]');if(rm){cart=cart.filter(x=>x.id!==rm.dataset.rm);save();paintCart();return}
  if(t.closest('[data-checkout]')){toast('Mock checkout — payment gateway connects here');return}
  if(t.closest('[data-close]')||t.id==='ov')closeAll();
  if(t.closest('#cbtn'))openD('#drawer');if(t.closest('#sbtn')){openD('#so');search('')}if(t.closest('#fab'))enquire(null);
  const f=t.closest('.fq button');if(f)f.parentElement.classList.toggle('o');
  if(t.closest('nav a')){ $('#nav').classList.remove('open'); $('#burger').setAttribute('aria-expanded','false'); document.body.classList.remove('menu-open'); }
});
addEventListener('keydown',ev=>{if(ev.key==='Escape'){closeEnq();closeAll()}});
$('#burger').onclick=()=>{const opened=$('#nav').classList.toggle('open');$('#burger').setAttribute('aria-expanded',String(opened));document.body.classList.toggle('menu-open',opened);};
$('#ov').addEventListener('click',()=>{$('#nav').classList.remove('open');$('#burger').setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')});
$('#nav').addEventListener('click',ev=>{if(ev.target.closest('a')){ $('#nav').classList.remove('open');$('#burger').setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');}});
document.addEventListener('click',ev=>{if($('#nav').classList.contains('open')&&!ev.target.closest('#nav')&&!ev.target.closest('#burger')){$('#nav').classList.remove('open');$('#burger').setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')}});
$('#si').oninput=ev=>search(ev.target.value);

/* ---------- reveal + counters ---------- */
const IO=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');IO.unobserve(x.target);$$('[data-count]',x.target).concat(x.target.dataset.count?[x.target]:[]).forEach(count)}}),{threshold:.12});
function count(el){const T=+el.dataset.count,t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/1600);el.textContent=Math.round(T*(1-Math.pow(1-k,3))).toLocaleString('en-IN');if(k<1)requestAnimationFrame(f)})(t0)}
const reveal=()=>{$$('.rv:not(.in)').forEach((el,i)=>{el.style.setProperty('--d',(i%4)*.08+'s');IO.observe(el)})};
const split=(t,em)=>{const s=t.split(' ').map((w,i)=>`<span class="w"><i style="--i:${i+(em?2:0)}">${w}</i></span>`).join(' ');return em?`<em>${s}</em>`:s};

/* ---------- pages ---------- */
const faqs=[['Is marble scratch-resistant?','Our pieces are polished and sealed to resist everyday scratches and spills. As with all natural stone, avoid dragging heavy objects across the surface.'],['How do I care for marble?','Wipe daily with a soft damp cloth. Avoid harsh scrubs and acidic cleaners such as vinegar or lemon.'],['Do you deliver across India?','Yes — insured, crated delivery across India, with international shipping on request.'],['Can I customise a piece?','Absolutely. Use our Customize studio or send an enquiry and we’ll quote within 48 hours.']];
const reviews=[['A showpiece. Every guest asks where the coffee table came from.','Aarav M., Mumbai'],['The team helped customize a basin for our powder room. Flawless finish.','Ishita R., Bengaluru'],['Heavy, honest, beautiful stone. Packaging was exceptional.','Kabir S., Delhi'],['Our fluted side table is the quiet hero of the living room.','Meera T., Jaipur']];
const LOOKS=[[2,50,58,'Living room'],[5,50,66,'Bath'],[14,56,42,'Dining']];
const ph2=(n,cls)=>{const p=pid(n);return `<div class="${cls}" style="${bg(p)}"><img alt="" src="${p.img}" onerror="this.remove()"></div>`};

function home(){
  const html=`
  <section class="hero"><canvas class="fx" id="fx"></canvas><div class="hero-t"><div><span class="eb" style="color:var(--br2)">LOSO Homes · Makrana, Rajasthan</span><h1 style="margin-top:.8rem">${split('Where stone')} ${split('becomes art',1)}</h1></div>
  <div><p>Hand-carved marble furniture and décor. Click any piece in the ring to open it, or drag to turn the gallery.</p><div class="btns"><a class="btn" href="#/shop/all">Shop all</a><a class="btn g" href="#/customize">Customize</a></div></div></div>
  <div class="stage" id="stage" aria-label="Rotating 3D catalog"><div class="floor"></div><div class="ring" id="ring"></div></div>
  <div class="readout" aria-live="polite"><div class="c" id="rc"></div><h2 id="rn"></h2><div class="s" id="rs"></div></div>
  <div class="ctrl"><button class="ib" id="prev" aria-label="Previous"><svg width="16" height="16" fill="none" stroke="currentColor"><path d="M10 3 5 8l5 5"/></svg></button><button class="ib" id="play" aria-label="Pause"><svg id="pi" width="16" height="16" fill="currentColor"><path d="M4 3h3v10H4zM9 3h3v10H9z"/></svg></button><button class="ib" id="next" aria-label="Next"><svg width="16" height="16" fill="none" stroke="currentColor"><path d="m6 3 5 5-5 5"/></svg></button>
  <button class="chip on" data-f="all">All</button><button class="chip" data-f="bath">Bath</button><button class="chip" data-f="table">Tables</button><button class="chip" data-f="decor">Décor</button></div>
  <div class="hint">Click a piece to open · Drag or use ← → to rotate</div></section>
  <div class="band"><div>${'<span>Hand-carved</span><i>◆</i><span>100% natural marble</span><i>◆</i><span>Made in Makrana</span><i>◆</i><span>Insured delivery</span><i>◆</i>'.repeat(4)}</div></div>
  <section class="sec"><div class="hd rv"><div><span class="eb">Shop by category</span><h2>Furniture, <em>sculpted</em></h2></div><a class="lnk" href="#/shop/all">View all</a></div>
  <div class="cats">${[['side','Side Tables',13],['coffee','Coffee Tables',2],['bath','Bath & Basins',7],['dining','Dining Tables',14],['decor','Décor & Garden',12]].map(c=>`<a class="cat rv" href="#/shop/${c[0]}" style="${bg(pid(c[2]))}"><img alt="${c[1]}" src="${pid(c[2]).img}" onerror="this.remove()"><span>${c[1]}<i>→</i></span></a>`).join('')}</div></section>
  <section class="sec" style="padding-top:0"><div class="look"><div class="rv"><span class="eb">Shop the look</span><h2 style="margin-top:.8rem">Rooms, <em>ready to shop</em></h2><p style="color:var(--mut);margin-top:.8rem">Tap the glowing dot to meet the piece.</p><div class="lt" id="lt">${LOOKS.map((l,i)=>`<button class="${i?'':'on'}" data-i="${i}"><small>${l[3]}</small>${pid(l[0]).name}</button>`).join('')}</div></div>
  <div class="lstage rv" id="ls">${LOOKS.map((l,i)=>`<img class="${i?'':'on'}" alt="${l[3]}" src="${pid(l[0]).img}" onerror="this.remove()"><span class="hot ${i?'':'on'}" style="left:${l[1]}%;top:${l[2]}%" data-i="${i}"></span>`).join('')}<div class="lpop" id="lp"></div></div></div></section>
  <section class="sec" style="padding-top:0"><div class="hd rv"><div><span class="eb">Most loved</span><h2>Bestsellers</h2><p>Drag to explore. Hover a piece to add it to your cart or send an enquiry.</p></div><a class="lnk" href="#/shop/best">View all</a></div><div class="scroller" id="scr">${P.filter(p=>p.best).map(card).join('')}</div></section>
  <section class="sec stone-story"><div class="rg"><div class="mzs rv" aria-label="Two moving columns of close-up natural marble photographs"><div class="mc">${[1,4,5,6,9,10,11,1,4,5,6,9,10,11].map(n=>ph2(n,'mz')).join('')}</div><div class="mc r">${[12,13,14,2,3,7,8,12,13,14,2,3,7,8].map(n=>ph2(n,'mz')).join('')}</div></div>
  <div class="phone rv">${[2,3,7,8,12].map((n,i)=>ph2(n,'sl2').replace('class="sl2"',`class="sl2" data-d="${i}"`).replace('<div class="sl2" data-d="'+i+'" style="',`<div class="sl2" style="animation-delay:${i*4}s;`)).join('')}<video autoplay muted loop playsinline src="media/reel.mp4" onerror="this.remove()"></video><div class="stories" id="stories"><i class="a"></i><i></i><i></i><i></i><i></i></div><div class="rh">loso.homes</div><div class="rcap">Hand-carved in Makrana</div></div>
  <div class="rv story-copy"><span class="eb">The art of natural stone</span><h2 style="margin-top:.8rem">Watch the stone <em>come alive</em></h2><p>From the quarry floor in Makrana to your living room — every vein, curve and finish tells its own story.</p><a class="btn g" href="${IG}" target="_blank" rel="noopener">Explore our making <span aria-hidden="true">↗</span></a></div></div></section>
  <section class="sec material-moments"><div class="hd rv"><div><span class="eb">Find your finish</span><h2>Stone, in <em>every mood</em></h2><p>Move across the natural palette and discover a finish with its own character.</p></div></div><div class="mood-grid">${[['media/01.jpg','Ivory calm','Soft, quiet and timeless'],['media/03.jpg','Veined elegance','A statement written by nature'],['media/13.jpg','Sculpted warmth','Tactile forms with a gentle glow'],['media/07.jpg','Dramatic depth','A rich, expressive stone story']].map((x,i)=>`<a class="mood-card" href="#/shop/all"><img src="${x[0]}" alt="${x[1]}" loading="lazy"><span class="mood-no">0${i+1}</span><span class="mood-copy"><b>${x[1]}</b><small>${x[2]}</small></span></a>`).join('')}</div></section>
  <section class="sec signature-edit"><div class="signature-head rv"><span class="eb">The LOSO perspective</span><h2>Not simply furniture.<br><em>A lasting point of view.</em></h2><p>Natural stone has its own rhythm. We let the material lead — then shape each piece to bring quiet character into the everyday.</p><a class="btn" href="#/shop/all">Explore the collection <span aria-hidden="true">↗</span></a></div><div class="signature-visuals"><a class="signature-tile large rv" href="#/shop/coffee"><img src="media/02.jpg" alt="Sculptural marble coffee table" loading="lazy"><span><small>01 / FORM</small><b>Grounded<br>in nature</b></span></a><a class="signature-tile rv" href="#/shop/side"><img src="media/13.jpg" alt="Sculpted stone side table" loading="lazy"><span><small>02 / DETAIL</small><b>Made to<br>be noticed</b></span></a><a class="signature-tile rv" href="#/shop/dining"><img src="media/14.jpg" alt="Natural stone dining setting" loading="lazy"><span><small>03 / LIVING</small><b>Designed for<br>everyday rituals</b></span></a></div></section>
  <section class="sec" style="padding-bottom:0"><div class="hd rv"><div><span class="eb">Just in</span><h2>New arrivals</h2></div><a class="lnk" href="#/shop/all">View all</a></div><div class="grid">${P.filter(p=>p.isNew).slice(0,4).map(card).join('')}</div></section>
  <section class="sec"><div class="cz"><div class="rv"><span class="eb">Customize</span><h2 style="margin-top:.8rem">Tailored luxury, <em>just for you</em></h2><p style="color:var(--mut);margin:1rem 0 1.6rem;max-width:30rem">Pick the form, the stone, the proportions. Watch it reshape live — then send it to our atelier for a quote.</p><a class="btn" href="#/customize">Customize now</a></div><div class="frame rv"><img alt="Fluted travertine side table" src="${pid(13).img}" onerror="this.remove()"></div></div></section>
  <section class="sec" style="padding-top:0"><div class="feat">${[['8','Marble varieties','Makrana white to Italian travertine'],['40','Master artisans','Decades of hand-carving experience'],['1200','Pieces delivered','Insured, crated, white-glove'],['100','% Natural stone','No composites, ever']].map(f=>`<div class="rv"><b data-count="${f[0]}">0</b><h4>${f[1]}</h4><p>${f[2]}</p></div>`).join('')}</div></section>
  <section class="sec premium-reviews"><div class="review-top rv"><span class="eb">Words that stay with us</span><h2>Hear from our <em>customers</em></h2><p>Thoughtful pieces, meaningful spaces, and stories that become part of the home.</p></div><div class="review-shell rv"><div class="review-mark">“</div><div class="rev" id="rev">${reviews.map((r,i)=>`<div class="sl ${i?'':'on'}"><div class="st">★★★★★</div><q>“${r[0]}”</q><p class="review-author">${r[1]}</p><span class="review-note">LOSO HOMES · VERIFIED EXPERIENCE</span></div>`).join('')}</div><div class="dots" id="dots">${reviews.map((_,i)=>`<button class="${i?'':'on'}" aria-label="Review ${i+1}"></button>`).join('')}</div></div><div class="review-foot">NATURAL STONE. PERSONAL STORIES. LASTING IMPRESSIONS.</div></section>
  <section class="sec atelier-section"><div class="atelier-intro rv"><span class="eb">From the atelier</span><h2>Made by hand.<br><em>Meant to be kept.</em></h2><p>Every LOSO piece begins with a carefully chosen block of natural stone. Our artisans shape, refine and finish each form by hand — preserving the character that makes every piece one of a kind.</p><a class="lnk" href="https://www.aykasys.com/" target="_blank" rel="noopener">Discover our digital studio</a></div><div class="atelier-visual rv"><img src="media/14.jpg" alt="A considered marble dining space" loading="lazy"><div class="atelier-note"><span>01 / THE CRAFT</span><b>Quietly exceptional,<br>down to the last detail.</b></div></div><div class="atelier-points rv"><div><i>01</i><b>Selected stone</b><p>Natural character, chosen with care.</p></div><div><i>02</i><b>Artisan shaping</b><p>Thoughtful hands behind every curve.</p></div><div><i>03</i><b>Lasting finish</b><p>Made to live beautifully for years.</p></div></div></section>
  <section class="sec" style="padding-top:0"><div class="hd rv" style="justify-content:center"><h2>Questions, answered</h2></div><div class="faq">${faqs.map(f=>`<div class="fq rv"><button>${f[0]}<i>+</i></button><div><p>${f[1]}</p></div></div>`).join('')}</div></section>
  <section class="sec dark" style="text-align:center"><span class="eb">Join the list</span><h2 style="margin-top:.8rem">Sign up, save <em>10%</em></h2><form class="nl" id="nl"><input type="email" required placeholder="Your email address"><button class="btn">Subscribe</button></form></section>`;
  return{html,init(){
    const un=[initRing()];
    const sc=$('#scr');let d=null;sc.onpointerdown=ev=>{d={x:ev.clientX,l:sc.scrollLeft,m:0}};
    const mv=ev=>{if(d){const dx=ev.clientX-d.x;if(Math.abs(dx)>5){d.m=1;sc.scrollLeft=d.l-dx}}},up=()=>{if(d&&d.m)sc.addEventListener('click',ev=>ev.preventDefault(),{capture:true,once:true});d=null};
    addEventListener('pointermove',mv);addEventListener('pointerup',up);
    /* shop the look */
    let li=0,pt;const lp=$('#lp'),imgs=$$('#ls>img'),hots=$$('.hot'),tabs=$$('#lt button');
    const showPop=()=>{const p=pid(LOOKS[li][0]);lp.innerHTML=`<img alt="" src="${p.img}"><div><b>${p.name}</b><span>${INR(p.price)}</span></div><div style="display:grid;gap:.4rem"><button class="btn" data-add="${p.id}">Add</button><button class="btn g" data-enq="${p.id}" style="color:var(--ink)">Enquire</button></div>`;lp.classList.add('on')};
    const setLook=i=>{li=i;lp.classList.remove('on');imgs.forEach((x,k)=>x.classList.toggle('on',k===i));hots.forEach((x,k)=>x.classList.toggle('on',k===i));tabs.forEach((x,k)=>x.classList.toggle('on',k===i));clearTimeout(pt);pt=setTimeout(showPop,1000)};
    tabs.forEach((b,i)=>b.onclick=()=>setLook(i));hots.forEach(h=>h.onclick=()=>lp.classList.contains('on')?lp.classList.remove('on'):showPop());setLook(0);
    let ri=0;const sl=$$('#rev .sl'),dt=$$('#dots button');const show=i=>{ri=i;sl.forEach((s,k)=>s.classList.toggle('on',k===i));dt.forEach((s,k)=>s.classList.toggle('on',k===i))};dt.forEach((b,i)=>b.onclick=()=>show(i));const rt=setInterval(()=>show((ri+1)%sl.length),5200);
    let si=0;const bars=$$('#stories i');const st=setInterval(()=>{si=(si+1)%5;bars.forEach((b,k)=>{b.className=k<si?'d':k===si?'a':''})},4000);
    $('#nl').onsubmit=ev=>{ev.preventDefault();toast('Welcome — your 10% code is on its way');ev.target.reset()};
    return()=>{un.forEach(f=>f());removeEventListener('pointermove',mv);removeEventListener('pointerup',up);clearInterval(rt);clearInterval(st);clearTimeout(pt)}}}}

function shop(arg='all'){
  const st={cat:CATS.some(c=>c[0]===arg)?arg:'all',sort:'f',v:100};
  const html=`<div class="ph-head"><div><span class="eb">Collections</span><h1 id="st"></h1></div></div>
  <div class="shop"><aside class="side"><h4>Category</h4><div class="cl" id="cl">${CATS.map(c=>`<button data-c="${c[0]}">${c[1]}</button>`).join('')}</div><h4>Max price · <span id="pv2"></span></h4><input type="range" id="pr" min="0" max="100" value="100"></aside>
  <div><div class="tb"><span id="cnt" class="eb"></span><select id="so2" style="width:auto"><option value="f">Featured</option><option value="l">Price: low to high</option><option value="h">Price: high to low</option><option value="n">Name</option></select></div><div class="grid" id="gr"></div></div></div>`;
  return{html,init(){
    const mx=v=>Math.round(2000*Math.pow(300,v/100)/500)*500;
    const draw=()=>{$$('#cl button').forEach(b=>b.classList.toggle('on',b.dataset.c===st.cat));
      $('#st').textContent=(CATS.find(c=>c[0]===st.cat)||[0,'All'])[1];$('#pv2').textContent=st.v>=100?'Any':INR(mx(st.v));
      let r=P.filter(p=>(st.cat==='all'||(st.cat==='best'?p.best:st.cat==='sale'?p.mrp:p.cat===st.cat))&&(st.v>=100||p.price<=mx(st.v)));
      if(st.sort==='l')r.sort((a,b)=>a.price-b.price);if(st.sort==='h')r.sort((a,b)=>b.price-a.price);if(st.sort==='n')r.sort((a,b)=>a.name.localeCompare(b.name));
      $('#cnt').textContent=r.length+' pieces';$('#gr').innerHTML=r.length?r.map(card).join(''):'<p style="grid-column:1/-1;padding:3rem 0;color:var(--mut)">Nothing matches — loosen a filter, or <a class="lnk" href="#" data-enq="">send us an enquiry</a>.</p>';reveal()};
    $('#cl').onclick=ev=>{const b=ev.target.closest('button');if(b){st.cat=b.dataset.c;history.replaceState(null,'','#/shop/'+st.cat);draw()}};
    $('#pr').oninput=ev=>{st.v=+ev.target.value;draw()};$('#so2').onchange=ev=>{st.sort=ev.target.value;draw()};draw()}}}

function product(id){
  const p=byId(id);if(!p)return{html:'<div class="sec"><h2>Piece not found</h2><a class="lnk" href="#/shop/all">Back to collections</a></div>'};
  const V=[['50% 50%',1],['22% 30%',2],['78% 72%',2]];let vw=0,q=1;
  const rel=P.filter(x=>x.id!==p.id&&x.cat===p.cat).concat(P.filter(x=>x.best&&x.id!==p.id)).filter((x,i,a)=>a.indexOf(x)===i).slice(0,4);
  const html=`<div class="crumb"><a href="#/">Home</a> / <a href="#/shop/${p.cat}">${(CATS.find(c=>c[0]===p.cat)||[0,'Shop'])[1]}</a> / ${p.name}</div>
  <div class="pd"><div><div class="pdv" id="pv" style="${bg(p)}">${img(p)}</div><div class="thumbs" id="th">${V.map((v,i)=>`<button class="th ${i?'':'on'}" data-v="${i}" aria-label="View ${i+1}" style="background-image:url('${p.img}');background-size:${i?'320%':'cover'};background-position:${v[0]}"></button>`).join('')}</div></div>
  <div><span class="eb">${p.tag||p.code}</span><h1 style="font-size:clamp(34px,4.4vw,60px);margin:.6rem 0">${p.name}</h1><div class="price" id="pr2"></div><p style="color:var(--mut);max-width:34rem">${p.blurb}</p>
  <div style="display:flex;gap:.8rem;flex-wrap:wrap;margin:1.6rem 0 .8rem"><div class="qty"><button id="qm">−</button><span id="qv">1</span><button id="qp">+</button></div><button class="btn" id="ac" style="flex:1;min-width:170px">Add to cart</button></div>
  <button class="btn g" data-enq="${p.id}" style="width:100%">Send enquiry about this piece</button>
  <div class="lg" style="margin-top:1.8rem"><div><span>Material</span><span>${p.mat}</span></div><div><span>Weight</span><span>${p.kg}</span></div><div><span>Origin</span><span>${p.origin}</span></div><div><span>Finish</span><span>${p.finish}</span></div><div><span>Delivery</span><span>2–6 weeks, insured &amp; crated</span></div></div>
  <p style="margin-top:1.2rem;color:var(--mut);font-size:13px">Want a different size or stone? <a class="lnk" href="#/customize">Customize it</a></p></div></div>
  <section class="sec" style="padding-top:0"><div class="hd rv"><h2>You may also like</h2></div><div class="grid">${rel.map(card).join('')}</div></section>`;
  return{html,init(){
    const pv=$('#pv'),im=$('img',pv);
    const paint=()=>{$('#pr2').innerHTML=INR(p.price*q)+(p.mrp?`<s>${INR(p.mrp*q)}</s>`:'');$('#qv').textContent=q;if(im){im.style.transformOrigin=V[vw][0];im.style.transform=`scale(${V[vw][1]})`}};
    pv.onpointermove=ev=>{if(vw||!im)return;const b=pv.getBoundingClientRect();im.style.transformOrigin=`${(ev.clientX-b.left)/b.width*100}% ${(ev.clientY-b.top)/b.height*100}%`;im.style.transform='scale(2)'};pv.onpointerleave=()=>{if(!vw&&im)im.style.transform='scale(1)'};
    $$('.th').forEach(b=>b.onclick=()=>{vw=+b.dataset.v;$$('.th').forEach(x=>x.classList.toggle('on',x===b));paint()});
    $('#qm').onclick=()=>{q=Math.max(1,q-1);paint()};$('#qp').onclick=()=>{q++;paint()};$('#ac').onclick=()=>{addCart(p.id,q);openD('#drawer')};paint()}}}

function customize(){
  const BASE={side:18000,coffee:48000,dining:150000,bowl:7500,vase:6500,tray:4200,stool:9500},MM={travertine:1,emperador:1.15,verde:1.25,carrara:1.1,nero:1.3,rosso:1.35,makrana:1.2,pink:1.1},FM={Polished:1,Honed:1.05,Leathered:1.12};
  const s={t:'side',m:'makrana',w:100,h:100,f:'Polished'};
  const html=`<div class="ph-head"><div><span class="eb">Bespoke studio</span><h1>Customize <em>your piece</em></h1></div><p style="color:var(--mut);max-width:26rem">Shape it live. Your configuration goes straight to our atelier.</p></div>
  <section class="sec"><div class="two"><div class="cfv" id="cv"></div><div class="cf"><div class="eb">1 · Form</div><div class="tabs" id="ct">${Object.keys(BASE).map(t=>`<button class="chip ${t==='side'?'on':''}" data-t="${t}">${t}</button>`).join('')}</div>
  <div class="eb">2 · Marble</div><div class="sws" id="cm">${MK.map(k=>`<button class="swb ${k==='makrana'?'on':''}" data-k="${k}" aria-label="${M[k].n}" style="background:${sw(k)}"></button>`).join('')}</div>
  <label class="fld"><span>3 · Width — <b id="wv">100</b>%</span><input type="range" id="cw" min="70" max="140" value="100"></label><label class="fld"><span>Height — <b id="hv">100</b>%</span><input type="range" id="ch" min="70" max="140" value="100"></label>
  <div class="eb">4 · Finish</div><div class="opt" id="cfn">${Object.keys(FM).map((f,i)=>`<button data-f="${f}" class="${i?'':'on'}">${f}</button>`).join('')}</div>
  <div class="sumbox"><span class="eb" style="color:var(--br2)">Estimated price</span><div><b id="cp"></b></div><small id="cs"></small></div>
  <form id="cfm"><label class="fld"><span>Name</span><input required></label><label class="fld"><span>Phone / email</span><input required></label><button class="btn" style="width:100%">Request quote</button></form></div></div></section>`;
  return{html,init(){
    const paint=()=>{$('#cv').innerHTML=art(s.t,s.m,s.w/100,s.h/100);const pr=BASE[s.t]*Math.pow(s.w/100*s.h/100,.8)*MM[s.m]*FM[s.f];$('#cp').textContent=INR(Math.round(pr/100)*100);$('#cs').textContent=`${M[s.m].n} ${s.t} · ${s.f} · ${s.w}% × ${s.h}% · 3–5 weeks`;$('#wv').textContent=s.w;$('#hv').textContent=s.h};
    $('#ct').onclick=ev=>{const b=ev.target.closest('button');if(!b)return;s.t=b.dataset.t;$$('#ct .chip').forEach(x=>x.classList.toggle('on',x===b));paint()};
    $('#cm').onclick=ev=>{const b=ev.target.closest('button');if(!b)return;s.m=b.dataset.k;$$('#cm .swb').forEach(x=>x.classList.toggle('on',x===b));paint()};
    $('#cfn').onclick=ev=>{const b=ev.target.closest('button');if(!b)return;s.f=b.dataset.f;$$('#cfn button').forEach(x=>x.classList.toggle('on',x===b));paint()};
    $('#cw').oninput=ev=>{s.w=+ev.target.value;paint()};$('#ch').oninput=ev=>{s.h=+ev.target.value;paint()};
    $('#cfm').onsubmit=ev=>{ev.preventDefault();toast('Quote request sent — we reply within 48 hours');ev.target.reset()};paint()}}}

function about(){
  const html=`<section class="about-h"><div class="bg">${[7,2,14].map(n=>`<img alt="" src="${pid(n).img}" style="width:100%;height:100%;object-fit:cover" onerror="this.remove()">`).join('')}</div><div><span class="eb" style="color:var(--br2)">Our story</span><h1 style="margin-top:1rem">Hand-crafted to <em>last centuries</em></h1></div></section>
  <section class="sec"><div class="two"><div class="rv"><span class="eb">Philosophy</span><h2 style="margin-top:.8rem">Weight as <em>sanctuary</em></h2></div><p class="rv" style="color:var(--mut);font-size:17px">From Makrana — the Rajasthan town whose white marble built the Taj Mahal — we choose each block ourselves. Every piece is cut, chiselled and sealed by hand: 100% natural, never composite. Curation, craftsmanship and exacting standards are the pillars everything stands on.</p></div></section>
  <section class="sec" style="background:var(--bg2)"><div class="hd rv" style="justify-content:center"><div style="text-align:center"><span class="eb">Timeline</span><h2 style="margin-top:.6rem">Our <em>story</em></h2></div></div><div class="tlh rv" id="tl">${[['2019','The first block','Founded by two designers and a quarry master.'],['2021','The atelier opens','A dedicated workshop for carving and finishing.'],['2024','Bespoke studio','Clients begin shaping pieces to their own proportions.'],['2026','Worldwide','Insured shipping to homes and hotels across the globe.']].map((t,i)=>`<div style="--i:${i}"><b>${t[0]}</b><h3 style="font-size:28px;margin:.4rem 0">${t[1]}</h3><p style="color:var(--mut)">${t[2]}</p></div>`).join('')}</div></section>
  <section class="sec"><div class="feat">${[['40','Master artisans','Decades of hand-carving'],['8','Marble varieties','Curated worldwide'],['7','Years of craft','Since 2019'],['100','% Natural','No composites']].map(f=>`<div class="rv"><b data-count="${f[0]}">0</b><h4>${f[1]}</h4><p>${f[2]}</p></div>`).join('')}</div></section>`;
  return{html,init(){const bgd=$('.about-h .bg');const f=()=>{bgd.style.transform=`translateY(${scrollY*.15}px)`};addEventListener('scroll',f,{passive:true});f();return()=>removeEventListener('scroll',f)}}}

function contact(){
  const html=`<div class="ph-head"><div><span class="eb">Bulk &amp; trade</span><h1>Bulk <em>enquiry</em></h1></div><p style="color:var(--mut);max-width:26rem">Hotels, studios and developers — tell us about your project.</p></div>
  <section class="sec"><div class="two"><form class="cf rv" id="ct" novalidate><label class="fld"><span>Name</span><input name="n"></label><label class="fld"><span>Email</span><input name="e" type="email"></label><label class="fld"><span>Enquiry type</span><select><option>Bulk order</option><option>Trade / designer</option><option>Hospitality project</option><option>Custom commission</option></select></label><label class="fld"><span>Project details</span><textarea name="m" rows="4"></textarea></label><button class="btn" style="width:100%">Send enquiry</button></form>
  <div class="rv"><h2>Visit the <em>workshop</em></h2><p style="margin:1rem 0 2rem;color:var(--mut)">Private viewings by appointment — walk among raw blocks and finished works.</p><div class="lg"><div><span>Workshop</span><span>Makrana, Rajasthan, India</span></div><div><span>Hours</span><span>Mon–Sat · 10:00–18:00</span></div></div><a class="igf" href="${IG}" target="_blank" rel="noopener" aria-label="LOSO Homes on Instagram" style="color:var(--ink);border-color:var(--line);margin-top:1.6rem">${IGI}</a></div></div></section>`;
  return{html,init(){$('#ct').onsubmit=ev=>{ev.preventDefault();let ok=1;['n','e','m'].forEach(k=>{const el=ev.target.elements[k],bad=!el.value.trim()||(k==='e'&&!/^\S+@\S+\.\S+$/.test(el.value));el.closest('.fld').classList.toggle('err',bad);if(bad)ok=0});if(ok){toast('Enquiry received — we’ll be in touch');ev.target.reset()}}}}}

/* ---------- hero fx: drifting gold veins + dust ---------- */
function fx(cv,sg){const c=cv.getContext('2d');let W,H,pts=[],t=0;
  const rs=()=>{W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight;pts=Array.from({length:70},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.8+.4,s:Math.random()*.45+.12,a:Math.random()}))};rs();addEventListener('resize',rs,sg);
  (function f(){if(!document.body.contains(cv))return;t+=.004;c.clearRect(0,0,W,H);c.lineWidth=1;
    for(let k=0;k<7;k++){c.beginPath();c.strokeStyle=`rgba(236,213,155,${.05+k*.012})`;for(let x=0;x<=W;x+=24){const y=H*(.12+k*.12)+Math.sin(x*.004+t*(1+k*.15)+k)*60+Math.sin(x*.011-t*2)*14;x?c.lineTo(x,y):c.moveTo(x,y)}c.stroke()}
    pts.forEach(p=>{p.y-=p.s;if(p.y<0){p.y=H;p.x=Math.random()*W}c.fillStyle=`rgba(236,213,155,${.2+.5*Math.abs(Math.sin(t*3+p.a*9))})`;c.beginPath();c.arc(p.x,p.y,p.r,0,7);c.fill()});requestAnimationFrame(f)})()}

/* ---------- 3D catalog ring: inward curve, wide radius, tight spacing, click to open ---------- */
function initRing(){
  const ac=new AbortController(),sg={signal:ac.signal},stage=$('#stage'),ring=$('#ring'),n=L.length,step=360/n,T0=performance.now();let alive=1;
  let cw,ch,R,S,angle=0,vel=0,BASE=.3,paused=false,drag=null,moved=false,tween=null,filter='all',lastFront=-1,mx=0,my=0,sx=0,sy=0,tl=0,openIdx=-1;
  const pad=i=>String(i+1).padStart(2,'0'),it=i=>P[i],ok=i=>filter==='all'||(filter==='table'?['coffee','side','dining'].includes(it(i).cat):it(i).cat===filter),modalOpen=()=>openIdx>=0;
  fx($('#fx'),sg);
  const slots=P.map((p,i)=>{const s=document.createElement('div');s.className='slot';s.tabIndex=0;s.setAttribute('role','button');s.setAttribute('aria-label',p.name);s.style.cursor='pointer';
    s.innerHTML=`<div class="card"><div class="ph" style="--t1:${p.tone[0]};--t2:${p.tone[1]}"><span class="num">N° ${pad(i)}</span><img alt="${p.name}" src="${p.img}" onerror="this.remove()"></div><div class="meta"><div class="c">${p.code} · ${INR(p.price)}</div><b>${p.name}</b></div></div>`;
    s.addEventListener('click',()=>{if(!moved)openModal(i)});s.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();openModal(i)}});
    ring.appendChild(s);return s});
  const readout=i=>{const p=it(i);$('#rc').textContent=`N° ${pad(i)} · ${p.code}`;$('#rn').textContent=p.name;$('#rs').textContent=`${p.mat} · ${INR(p.price)}`};
  stage.addEventListener('pointermove',ev=>{const b=stage.getBoundingClientRect();mx=(ev.clientX-b.left)/b.width-.5;my=(ev.clientY-b.top)/b.height-.5},sg);stage.addEventListener('pointerleave',()=>{mx=my=0},sg);
  function layout(){const W=stage.clientWidth,mob=W<700;cw=mob?Math.max(140,W*.39):Math.min(300,Math.max(190,W*.16));ch=cw*1.34;R=(cw*1.18)/(2*Math.sin(Math.PI/n));S=R*(mob?.62:.55);
    stage.style.setProperty('--sh',Math.round(ch*1.25+120)+'px');stage.style.perspective=Math.max(900,R*2.4)+'px';
    slots.forEach(s=>{s.style.setProperty('--w',cw+'px');s.style.setProperty('--h',ch+'px')})}
  addEventListener('resize',layout,sg);
  const front=()=>{let b=0,m=1e9;for(let i=0;i<n;i++){const a=Math.abs(norm(i*step+angle));if(a<m){m=a;b=i}}return b};
  const nextMatch=d=>{const f=front();for(let k=1;k<=n;k++){const j=(f+d*k+n*3)%n;if(ok(j))return j}return f};
  const rotateTo=i=>{const d=norm(-i*step-angle);tween={from:angle,to:angle+d,t:0,dur:Math.max(35,Math.abs(d)*1.5)}};
  const bo=p=>{const c1=1.7,x=p-1;return 1+(c1+1)*x*x*x+c1*x*x};
  let last=performance.now();
  function frame(t){if(!alive||!document.body.contains(stage))return;
    const dt=Math.min(3,(t-last)/16.67);last=t;const k0=Math.min(1,(t-T0)/2600),ek=1-Math.pow(1-k0,3),Rk=R*(.45+.55*ek);
    const idle=drag||modalOpen()||paused||tween;vel+=((idle?0:BASE)-vel)*.05*dt;
    if(tween){tween.t+=dt;const u=Math.min(1,tween.t/tween.dur);angle=tween.from+(tween.to-tween.from)*(1-Math.pow(1-u,3));if(u>=1)tween=null}else if(!drag)angle+=vel*dt;
    sx+=(mx-sx)*.06;sy+=(my-sy)*.06;tl+=(sy*-5-tl)*.1;stage.style.perspectiveOrigin=`${50+sx*8}% ${42+sy*8}%`;
    const spin=(1-ek)*200;ring.style.transform=`translateZ(${S*ek}px) rotateX(${tl}deg) rotateY(${angle+spin}deg)`;
    for(let i=0;i<n;i++){const s=slots[i],a=norm(i*step+angle+spin),ab=Math.abs(a),g=ok(i),p=Math.max(0,Math.min(1,(t-T0-300-i*110)/650));
      s.style.transform=`rotateY(${i*step}deg) translateZ(${-Rk}px)`;
      s.style.opacity=g?(ab>100?0:Math.max(0,(.3+.7*Math.cos(Math.min(ab,90)*Math.PI/180))*Math.min(1,p*1.4))).toFixed(3):(ab>100?0:.2);
      s.style.pointerEvents=ab>82||!g||k0<1?'none':'auto';s.classList.toggle('dim',!g);
      s.firstChild.style.transform=`translateY(0) scale(${.94+.06*bo(p)})`}
    if(!drag&&!modalOpen()){const f=front();if(f!==lastFront&&ok(f)){lastFront=f;readout(f)}}
    requestAnimationFrame(frame)}
  stage.addEventListener('pointerdown',ev=>{drag={x:ev.clientX,a:angle,lx:ev.clientX,v:0};moved=false;tween=null},sg);
  addEventListener('pointermove',ev=>{if(!drag)return;const dx=ev.clientX-drag.x;if(Math.abs(dx)>6){moved=true;stage.classList.add('drag')}if(moved){drag.v=ev.clientX-drag.lx;angle=drag.a+dx*.22}drag.lx=ev.clientX},sg);
  addEventListener('pointerup',()=>{if(!drag)return;if(moved)vel=Math.max(-5,Math.min(5,drag.v*.25));drag=null;stage.classList.remove('drag');setTimeout(()=>moved=false,30)},sg);
  addEventListener('keydown',ev=>{if(modalOpen()){if(ev.key==='Escape')closeModal();if(ev.key==='ArrowRight')go(1);if(ev.key==='ArrowLeft')go(-1);return}if(/INPUT|TEXTAREA/.test(ev.target.tagName))return;if(ev.key==='ArrowRight')rotateTo(nextMatch(1));if(ev.key==='ArrowLeft')rotateTo(nextMatch(-1))},sg);
  $('#prev').onclick=()=>rotateTo(nextMatch(-1));$('#next').onclick=()=>rotateTo(nextMatch(1));
  $('#play').onclick=()=>{paused=!paused;$('#pi').innerHTML=paused?'<path d="M4 2.5v11l9-5.5z"/>':'<path d="M4 3h3v10H4zM9 3h3v10H9z"/>'};
  $$('.ctrl .chip[data-f]').forEach(c=>c.onclick=()=>{$$('.ctrl .chip[data-f]').forEach(x=>x.classList.toggle('on',x===c));filter=c.dataset.f;const f=front();rotateTo(ok(f)?f:nextMatch(1));lastFront=-1});
  /* detail modal */
  const modal=$('#modal'),slab=$('#slab');
  function openModal(i,from){openIdx=i;const p=it(i),src=from||slots[i].querySelector('.ph').getBoundingClientRect();
    slab.innerHTML=`<div class="mimg" id="mimg"><div class="ph" style="--t1:${p.tone[0]};--t2:${p.tone[1]}"><img alt="${p.name}" src="${p.img}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1" onerror="this.remove()"></div><div class="mnav"><button class="ib" id="mp" aria-label="Previous">‹</button><button class="ib" id="mn" aria-label="Next">›</button></div></div>
    <div class="minfo"><button class="mx" id="mx" aria-label="Close">✕</button><div class="eb">N° ${pad(i)} · ${p.code}</div><h3>${p.name}</h3><div><span class="pill">${p.mat}</span>${p.tag?`<span class="pill">${p.tag}</span>`:''}</div><p style="color:var(--mut)">${p.blurb}</p><div style="font:500 32px var(--serif)">${INR(p.price)}${p.mrp?`<s style="font-size:18px;color:var(--mut);margin-left:.6rem">${INR(p.mrp)}</s>`:''}</div><div class="lg"><div><span>Finish</span><span>${p.finish}</span></div><div><span>Weight</span><span>${p.kg}</span></div><div><span>Origin</span><span>${p.origin}</span></div></div>
    <div class="btns2"><button class="btn" id="ad">Add to cart</button><button class="btn g" id="en" style="color:var(--ink)">Send enquiry</button><a class="btn g" id="vp" href="#/p/${p.id}" style="color:var(--ink)">View piece</a></div></div>`;
    modal.classList.add('open');document.body.style.overflow='hidden';const to=slab.getBoundingClientRect();
    slab.animate([{transform:`translate(${src.left+src.width/2-(to.left+to.width/2)}px,${src.top+src.height/2-(to.top+to.height/2)}px) scale(${src.width/to.width},${src.height/to.height})`,opacity:.3},{transform:'none',opacity:1}],{duration:620,easing:'cubic-bezier(.2,.8,.2,1)'});
    $('#mx').onclick=closeModal;$('#mp').onclick=()=>go(-1);$('#mn').onclick=()=>go(1);$('#vp').onclick=closeModal;$('#ad').onclick=()=>addCart(p.id);$('#en').onclick=()=>enquire(p);
    const mi=$('#mimg'),ph=mi.querySelector('.ph');mi.addEventListener('pointermove',ev=>{const r=mi.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width-.5,y=(ev.clientY-r.top)/r.height-.5;ph.style.transform=`rotateY(${x*10}deg) rotateX(${-y*8}deg) scale(1.08)`});mi.addEventListener('pointerleave',()=>ph.style.transform='')}
  const go=d=>{let j=openIdx;do{j=(j+d+n)%n}while(!ok(j));openModal(j,slab.getBoundingClientRect());angle+=norm(-j*step-angle)};
  function closeModal(){openIdx=-1;modal.classList.remove('open');if(!$('#enq').classList.contains('open'))document.body.style.overflow='';lastFront=-1}
  modal.addEventListener('pointerdown',ev=>{if(ev.target===modal)closeModal()},sg);
  layout();requestAnimationFrame(frame);
  return()=>{alive=0;ac.abort();closeModal()};
}

/* ---------- polish: progress bar, cursor, magnetic buttons, card tilt ---------- */
document.body.insertAdjacentHTML('beforeend','<div class="sbar" id="sbar"></div><div class="cur" id="cur"></div>');
addEventListener('scroll',()=>{$('#sbar').style.width=scrollY/(document.documentElement.scrollHeight-innerHeight)*100+'%'},{passive:true});
let mg=null,tv=null;
addEventListener('pointermove',ev=>{if(ev.pointerType!=='mouse')return;const c=$('#cur'),t=ev.target;
  c.style.opacity=1;c.style.transform=`translate(${ev.clientX-c.offsetWidth/2}px,${ev.clientY-c.offsetHeight/2}px)`;c.classList.toggle('big',!!(t.closest&&t.closest('a,button,.slot,.pc,.cat')));
  const b=t.closest&&t.closest('.btn');if(mg&&mg!==b){mg.style.transform='';mg=null}if(b){const r=b.getBoundingClientRect();b.style.transform=`translate(${(ev.clientX-r.left-r.width/2)*.16}px,${(ev.clientY-r.top-r.height/2)*.28}px)`;mg=b}
  const v=t.closest&&t.closest('.pc .pv');if(tv&&tv!==v){tv.style.setProperty('--rx','0deg');tv.style.setProperty('--ry','0deg');tv=null}
  if(v){const r=v.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width,y=(ev.clientY-r.top)/r.height;v.style.setProperty('--ry',(x-.5)*10+'deg');v.style.setProperty('--rx',(.5-y)*8+'deg');v.style.setProperty('--gx',x*100+'%');v.style.setProperty('--gy',y*100+'%');tv=v}});

/* ---------- router with curtain transition ---------- */
let cleanup=null,first=1,rtm;
function route(){
  cleanup&&cleanup();cleanup=null;closeAll();clearTimeout(rtm);
  const render=()=>{
    const [rt='',a]=location.hash.replace(/^#\/?/,'').split('/');
    const pg=({'':home,shop,p:product,customize,about,contact}[rt]||home)(a);
    const app=$('#app');app.style.animation='none';app.offsetHeight;app.style.animation='';
    app.innerHTML=pg.html;scrollTo(0,0);
    $$('nav a[data-r]').forEach(x=>x.classList.toggle('on',x.dataset.r===rt||(rt==='p'&&x.dataset.r==='shop')));
    cleanup=pg.init&&pg.init();reveal();$$('.tlh').forEach(el=>IO.observe(el))};
  if(first){first=0;render()}else{$('#curtain').animate([{opacity:0,transform:'scaleY(.98)'},{opacity:1,transform:'scaleY(1)',offset:.35},{opacity:1,transform:'scaleY(1)',offset:.55},{opacity:0,transform:'scaleY(1.02)'}],{duration:720,easing:'cubic-bezier(.2,.8,.2,1)'});rtm=setTimeout(render,300)}
}
addEventListener('hashchange',route);paintCart();route();
})();

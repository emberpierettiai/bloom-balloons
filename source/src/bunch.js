/* ===== Build Your Helium Balloon Bunch: colours, live preview, sizes, decals ===== */
const PAL=[["Monet", "#C9D9F0"], ["Baby Blue", "#94C9E9"], ["Georgia", "#709EC2"], ["Blue", "#148BCD"], ["Navy", "#153B5F"], ["Blossom", "#C1B1D8"], ["Lavender", "#A582C4"], ["Plum Purple", "#4A3060"], ["Seafoam", "#54B9A9"], ["Empower-Mint", "#B6CDC3"], ["Meadow", "#879F87"], ["Evergreen", "#25574E"], ["Romey", "#EBBDC8"], ["Baby Pink", "#F7BDD3"], ["Pink", "#E98DB2"], ["Pixie", "#D86FA8"], ["Fuchsia", "#C32669"], ["Sangria", "#642739"], ["Red", "#CC2536"], ["Coral", "#F48281"], ["Aloha", "#E76A56"], ["Orange", "#F28735"], ["Lemonade", "#F6EAA2"], ["Yellow", "#F5D043"], ["Blush", "#EDD0A8"], ["White", "#FFFFFF"], ["Black", "#171717"], ["Camel (Beige)", "#DCC9C2"], ["Silver", "#BABDC7"], ["Metallic Gold", "#E5C281"], ["Metallic Silver", "#DEE2E7"]];
const PALI=Object.fromEntries(PAL.map((c,i)=>[c[0],i]));
const RED="#CC2536", MET=["Metallic Gold","Metallic Silver"];
const hex2rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const rgb2hex=r=>"#"+r.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,"0")).join("");
const mix=(h,t,f)=>rgb2hex(hex2rgb(h).map((v,i)=>v+(hex2rgb(t)[i]-v)*f));
const shade=(h,f)=>mix(h,"#000000",f), tint=(h,f)=>mix(h,"#FFFFFF",f);
const lum=h=>{const[r,g,b]=hex2rgb(h);return (0.299*r+0.587*g+0.114*b)/255};
const pale=h=>lum(h)>0.86;

Object.assign(T.en,{bunch_h:"Build Your Helium Balloon Bunch",bunch_sub:"Choose up to 3 colors",
 th_color:"Color",th_qty:"Quantity",th_notes:"Special notes · optional",ph_note:"Add a note",
 col_n:n=>`Color ${n}`,pick_c:"Choose a color",rm_c:"Remove",
 sel_sum:n=>`${n} ${n===1?"balloon":"balloons"} selected · Up to 10 per color`,
 more_b:"More balloons? Contact us",pal_h:"Standard Balloon Colors",
 pal_note:"Actual balloon colors may vary slightly from your screen.",
 size_h:"Balloon size",std:"Standard",check_av:"Subject to availability",sz_enc:"Encapsulated",sz_name:s=>s==="enc"?"Encapsulated":s+"″",avail_h:"Subject to availability",avail_p:"18″, 24″ and encapsulated balloons are brought in to order, so these colors are not always in stock. We confirm every large-balloon order by text before making it.",ck_av:"Ask about availability first",bag_l:"Add a transport bag · $2.99 each",bag_sub:"Keeps the balloons together on the way home. One bag holds up to 15 balloons.",bag_n:(n,v)=>`${n} ${n===1?"bag":"bags"} · ${v}`,
 decal_l:"Add a custom decal · $8 per word or symbol",
 decal_12:"Available for encapsulated balloons.",
 decal_w:"Words or symbols",decal_wph:"Happy Birthday",decal_n:"On how many balloons?",
 decal_cost:(n,v)=>`${n} ${n===1?"word or symbol":"words or symbols"} · ${v} in decals`,
 prev_cap:n=>`Color preview · ${n} balloons shown as a sample arrangement.`,
 enc_note:"18″ and 24″ are encapsulated balloons, made to order. Text us and we’ll confirm availability and the price.",
 req_av:"Check Availability by Text",need_c:"Choose at least one color first.",
 lim_note:"Online orders: up to 10 balloons per color, 30 in total. For more, text us.",
 bm:{hi:"Hi Bloom Balloons! I’d like helium balloons:",av:"Hi Bloom Balloons! I’d like to check availability:",mo:"Hi Bloom Balloons! I’d like more balloons than the website allows:",
  size:"Size",tot:"Total balloons",price:"Estimated price",bag:"Transport bag",dec:"Custom decal",decn:n=>`on ${n} ${n===1?"balloon":"balloons"}`,end:"Please confirm availability and total."}});
Object.assign(T.es,{bunch_h:"Arma tu ramo de globos con helio",bunch_sub:"Elige hasta 3 colores",
 th_color:"Color",th_qty:"Cantidad",th_notes:"Notas especiales · opcional",ph_note:"Agrega una nota",
 col_n:n=>`Color ${n}`,pick_c:"Elige un color",rm_c:"Quitar",
 sel_sum:n=>`${n} ${n===1?"globo seleccionado":"globos seleccionados"} · Hasta 10 por color`,
 more_b:"¿Más globos? Escríbenos",pal_h:"Colores estándar de globos",
 pal_note:"Los colores reales pueden variar un poco respecto a los de tu pantalla.",
 size_h:"Tamaño del globo",std:"Estándar",check_av:"Sujeto a disponibilidad",sz_enc:"Encapsulado",sz_name:s=>s==="enc"?"Encapsulado":s+"″",avail_h:"Sujeto a disponibilidad",avail_p:"Los globos de 18″, 24″ y los encapsulados se piden a pedido, así que estos colores no siempre están en existencia. Confirmamos por texto cada pedido de globos grandes antes de hacerlo.",ck_av:"Consultar disponibilidad primero",bag_l:"Agrega una bolsa de transporte · $2.99 cada una",bag_sub:"Mantiene los globos juntos en el camino a casa. Una bolsa lleva hasta 15 globos.",bag_n:(n,v)=>`${n} ${n===1?"bolsa":"bolsas"} · ${v}`,
 decal_l:"Agrega una calcomanía personalizada · $8 por palabra o símbolo",
 decal_12:"Disponible para globos encapsulados.",
 decal_w:"Palabras o símbolos",decal_wph:"Feliz Cumpleaños",decal_n:"¿En cuántos globos?",
 decal_cost:(n,v)=>`${n} ${n===1?"palabra o símbolo":"palabras o símbolos"} · ${v} en calcomanías`,
 prev_cap:n=>`Vista previa de color · se muestran ${n} globos como ejemplo.`,
 enc_note:"Los globos de 18″ y 24″ son encapsulados y se hacen bajo pedido. Escríbenos y confirmamos disponibilidad y precio.",
 req_av:"Consultar disponibilidad por texto",need_c:"Primero elige al menos un color.",
 lim_note:"Pedidos en línea: hasta 10 globos por color y 30 en total. Para más, escríbenos.",
 bm:{hi:"¡Hola, Bloom Balloons! Me gustaría pedir globos con helio:",av:"¡Hola, Bloom Balloons! Quiero consultar disponibilidad:",mo:"¡Hola, Bloom Balloons! Quiero más globos de los que permite el sitio:",
  size:"Tamaño",tot:"Total de globos",price:"Precio estimado",bag:"Bolsa de transporte",dec:"Calcomanía personalizada",decn:n=>`en ${n} ${n===1?"globo":"globos"}`,end:"Por favor, confirmen la disponibilidad y el total."}});

/* ---- preview: 9 balloons, three vertical colour columns ---- */
const SZ={12:{p:3.5,rows:[200,365,530],x:[128,260,392],rx:56,ry:66,off:[18,-26,4]},
 18:{p:9.5,rows:[238,432],x:[118,260,402],rx:72,ry:85,off:[22,-30,6]},
 24:{p:18.99,rows:[300],x:[112,260,408],rx:92,ry:108,off:[26,-34,8]},
 enc:{p:21,rows:[300],x:[112,260,408],rx:92,ry:108,off:[26,-34,8],enc:true}};
const BAGP=2.99, BAGCAP=15;
let BRX=56, BRY=66; const BQX=260, BQY=662;
function balloon(i,cx,cy,hex){const g="bg"+i,met=hex===PAL[PALI["Metallic Gold"]][1]||hex===PAL[PALI["Metallic Silver"]][1];
 const tipY=cy+BRY-2, st=pale(hex)?` stroke="${shade(hex,0.18)}" stroke-width="1.5"`:"";
 return `<defs><radialGradient id="${g}" cx="34%" cy="26%" r="82%"><stop offset="0" stop-color="${tint(hex,met?0.55:0.4)}"/><stop offset="0.5" stop-color="${hex}"/><stop offset="1" stop-color="${shade(hex,met?0.42:0.34)}"/></radialGradient></defs>`
 +`<g><path d="M${cx-10} ${tipY}L${cx} ${tipY+18}L${cx+10} ${tipY}Z" fill="${shade(hex,pale(hex)?0.16:0.3)}"${st}/>`
 +`<ellipse cx="${cx}" cy="${cy}" rx="${BRX}" ry="${BRY}" fill="url(#${g})"${st}/>`
 +(met?`<ellipse cx="${cx-BRX*0.18}" cy="${cy}" rx="${BRX*0.26}" ry="${BRY*0.82}" fill="${tint(hex,0.6)}" opacity=".45"/>`:"")
 +`<ellipse cx="${cx-BRX*0.34}" cy="${cy-BRY*0.33}" rx="${BRX*0.21}" ry="${BRY*0.14}" fill="#fff" opacity="${met?0.8:0.62}" transform="rotate(-28 ${cx-BRX*0.34} ${cy-BRY*0.33})"/>`
 +`</g>`}
function balloonEnc(i,cx,cy,hex){const g="bg"+i,st=` stroke="rgba(120,110,105,.35)" stroke-width="1.5"`,tipY=cy+BRY-2;
 const r=(k)=>{const a=(i*53+k*97)%360, rr=(k*37%100)/100; return [cx+Math.cos(a)*BRX*0.82*rr, cy+Math.sin(a*1.7)*BRY*0.82*rr]};
 let dots="";for(let k=1;k<=42;k++){const[px,py]=r(k);dots+=`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${1.6+(k%3)*0.7}" fill="#fff" opacity=".85"/>`}
 return `<defs><radialGradient id="${g}" cx="34%" cy="26%" r="82%"><stop offset="0" stop-color="#ffffff"/><stop offset="0.55" stop-color="#f2f0ee"/><stop offset="1" stop-color="#cfcbc8"/></radialGradient></defs>`
 +`<g><path d="M${cx-10} ${tipY}L${cx} ${tipY+18}L${cx+10} ${tipY}Z" fill="${shade(hex,0.18)}"${st}/>`
 +`<ellipse cx="${cx}" cy="${cy}" rx="${BRX}" ry="${BRY}" fill="url(#${g})" opacity=".42" stroke="rgba(255,255,255,.8)" stroke-width="2.5"/>`
 +`<ellipse cx="${cx}" cy="${cy+BRY*0.14}" rx="${BRX*0.68}" ry="${BRY*0.62}" fill="${hex}"${pale(hex)?` stroke="${shade(hex,0.16)}" stroke-width="1.2"`:""}/>`
 +`<ellipse cx="${cx-BRX*0.24}" cy="${cy+BRY*0.02}" rx="${BRX*0.17}" ry="${BRY*0.14}" fill="#fff" opacity=".45" transform="rotate(-28 ${cx-BRX*0.24} ${cy+BRY*0.02})"/>`
 +dots
 +`<ellipse cx="${cx-BRX*0.34}" cy="${cy-BRY*0.33}" rx="${BRX*0.2}" ry="${BRY*0.13}" fill="#fff" opacity=".75" transform="rotate(-28 ${cx-BRX*0.34} ${cy-BRY*0.33})"/></g>`}
function bunchSvg(hexes,base,cfg){let s="",rib="";
 BRX=cfg.rx;BRY=cfg.ry;
 const pts=[];
 for(let r=0;r<cfg.rows.length;r++)for(let c=0;c<3;c++)pts.push([c,cfg.x[c],cfg.rows[r]+cfg.off[c]]);
 pts.forEach(([c,x,y],k)=>{rib+=`<path d="M${x} ${y+BRY+16}C${x} ${y+BRY+90} ${x+(BQX-x)*0.55} ${BQY-70} ${BQX} ${BQY}" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity=".8"/>`});
 pts.forEach(([c,x,y],k)=>{s+=(cfg.enc?balloonEnc:balloon)(k,x,y,hexes[c])});
 const bb=[[BQX-32,BQY+54,21],[BQX+2,BQY+46,22],[BQX+34,BQY+56,20],[BQX-17,BQY+79,21],[BQX+19,BQY+81,21],[BQX+1,BQY+68,18]]
  .map((b,j)=>`<ellipse cx="${b[0]}" cy="${b[1]}" rx="${b[2]}" ry="${b[2]*0.92}" fill="${j%2?tint(base,0.12):base}"${pale(base)?` stroke="${shade(base,0.18)}" stroke-width="1.2"`:""}/>`).join("");
 return `<svg viewBox="0 0 520 790" role="img" aria-label="${esc(T[L].prev_cap(pts.length))}"><rect width="520" height="790" fill="#D9D5D8"/><ellipse cx="${BQX}" cy="762" rx="118" ry="13" fill="#000" opacity=".12"/>${rib}${s}<path d="M${BQX-14} ${BQY}q14 -10 28 0" fill="none" stroke="#EFE7DD" stroke-width="3"/>${bb}</svg>`}

/* ---- state ---- */
const BQ={c:[null,null,null],q:[3,3,3],n:["","",""],act:0,size:12,bag:false,dec:false,dw:"",dn:1,msg:""};
const bagsFor=n=>n?Math.ceil(n/BAGCAP):0;
function bunchTotal(b){const cfg=SZ[b.size]||SZ[12],n=b.items.reduce((a,x)=>a+x.q,0);
 return n*cfg.p+(b.bag?bagsFor(n)*BAGP:0)+(b.decal?b.decal.w*8*b.decal.n:0)}
const bqFilled=()=>BQ.c.map((v,i)=>({v,i})).filter(o=>o.v!=null);
const bqTotal=()=>bqFilled().reduce((a,o)=>a+BQ.q[o.i],0);
const bqHex=n=>PAL[PALI[n]][1];
function bqCols(){const f=bqFilled().map(o=>bqHex(o.v));
 if(!f.length)return[RED,RED,RED];
 if(f.length===1)return[f[0],f[0],f[0]];
 if(f.length===2)return[f[0],f[0],f[1]];
 return[f[0],f[1],f[2]]}
const bqCfg=()=>SZ[BQ.size]||SZ[12];
const bqCount=()=>bqCfg().rows.length*3;
function bqPreview(){const c=bqCols(),f=bqFilled();return bunchSvg(c,f.length?bqHex(f[0].v):RED,bqCfg())}
function bqDecWords(){return BQ.dw.trim()?BQ.dw.trim().split(/\s+/).length:0}
function bqBunch(){return{size:BQ.size,items:bqFilled().map(o=>({c:o.v,q:BQ.q[o.i],n:BQ.n[o.i].trim()})),bag:BQ.bag,decal:(BQ.size==="enc"&&BQ.dec&&bqDecWords())?{t:BQ.dw.trim(),w:bqDecWords(),n:BQ.dn}:null}}
function bqMsg(kind){const t=T[L],m=t.bm,L1=[];
 bqFilled().forEach(o=>L1.push(`• ${BQ.q[o.i]}× ${o.v}${BQ.n[o.i].trim()?" — "+BQ.n[o.i].trim():""}`));
 const a=[kind==="av"?m.av:kind==="mo"?m.mo:m.hi,"",...(L1.length?L1:["• —"]),"",`${m.size}: ${t.sz_name(BQ.size)}`,`${m.tot}: ${bqTotal()}`];
 if(BQ.bag)a.push(`${m.bag}: ${t.bag_n(bagsFor(bqTotal()),usd(bagsFor(bqTotal())*BAGP))}`);
 if(BQ.size==="enc"&&BQ.dec&&bqDecWords())a.push(`${m.dec}: “${BQ.dw.trim()}” ${m.decn(BQ.dn)} (${usd(bqDecWords()*8*BQ.dn)})`);
 a.push(`${m.price}: ${usd(bunchTotal(bqBunch()))}`);
 a.push("",m.end);return a.join("\n")}

function renderBunch(p){const t=T[L],c=C(p.cat);setMeta(t.bunch_h,t.hel_inc);
 const sw=(n,inner)=>{const h=bqHex(n);return `<span class="sw${pale(h)?" pl":""}" style="--sw:${h}">${inner||""}</span>`};
 const row=i=>{const v=BQ.c[i];
  return `<div class="bq-row${BQ.act===i?" act":""}" data-row="${i}"><b>${t.col_n(i+1)}</b>`
  +`<button type="button" class="bq-pick" data-pick="${i}">${v?sw(v):'<span class="sw add">+</span>'}<span>${v?v:t.pick_c}</span>${v?'<i class="x" aria-hidden="true">×</i>':""}</button>`
  +`<select class="bq-q" data-q="${i}"${v?"":" disabled"} aria-label="${t.th_qty}">${[...Array(10)].map((_,k)=>`<option value="${k+1}"${k+1===BQ.q[i]?" selected":""}>${k+1}</option>`).join("")}</select>`
  +`<input class="bq-n" data-n="${i}" maxlength="60" placeholder="${t.ph_note}" value="${esc(BQ.n[i])}" aria-label="${t.th_notes}">`
  +`</div>`};
 const palHtml=PAL.map((cc,k)=>{const idx=BQ.c.indexOf(cc[0]);
  return `<button type="button" class="pal-c${idx>=0?" on":""}" data-c="${k}" title="${esc(cc[0])}">${sw(cc[0],idx>=0?`<i class="bdg">${idx+1}</i>`:"")}<span>${cc[0]}</span></button>`}).join("");
 const cfg=bqCfg(), enc=BQ.size==="enc", big=BQ.size!==12, words=bqDecWords(), nb=bqTotal(), bags=bagsFor(nb);
 const sizes=[12,18,24,"enc"].map(s=>{const on=BQ.size===s;
  return `<button type="button" class="bq-size${on?" on":""}" data-size="${s}"><b>${t.sz_name(s)}</b><u>${usd(SZ[s].p)}</u><span>${s===12?t.std:t.check_av}${on?" ✓":""}</span></button>`}).join("");
 $("#app").innerHTML=crumbs([[t.home,"index.html"],[c[L],curl(c)],[t.bunch_h]])+
 `<div class="pwrap bq"><div class="pgal"><div class="ph bq-prev" id="bq-prev">${bqPreview()}</div><p class="note ctr" style="margin-top:10px">${t.prev_cap(bqCount())}</p></div>
  <div class="pinfo"><h1 class="ph1">${t.bunch_h}</h1><p class="pbig">${usd(cfg.p)} <small>${t.each} · ${t.sz_name(BQ.size)}</small></p>
  <h2 class="bq-h2">${t.bunch_sub}</h2>
  <div class="bq-head"><span>${t.th_color}</span><span>${t.th_qty}</span><span>${t.th_notes}</span></div>
  ${[0,1,2].map(row).join("")}
  <div class="bq-sum"><span>${t.sel_sum(nb)}</span><a class="lnk2" id="bq-more">${t.more_b}</a></div>
  <section class="bq-pal"><h3>${t.pal_h}</h3><div class="pal-g">${palHtml}</div><p class="note">${t.pal_note}</p></section>
  <h2 class="bq-h2">${t.size_h}</h2><div class="bq-sizes">${sizes}</div>
  ${big?`<div class="bq-av"><b>${t.avail_h}</b><p>${t.avail_p}</p></div>`:""}
  <label class="bq-dec${enc?"":" off"}"><input type="checkbox" id="bq-dec"${BQ.dec&&enc?" checked":""}${enc?"":" disabled"}><span><b>${t.decal_l}</b><small>${t.decal_12}</small></span></label>
  ${enc&&BQ.dec?`<div class="bq-dw"><label>${t.decal_w}<input id="bq-dw" maxlength="60" placeholder="${t.decal_wph}" value="${esc(BQ.dw)}"></label><label>${t.decal_n}<select id="bq-dn">${[...Array(10)].map((_,k)=>`<option value="${k+1}"${k+1===BQ.dn?" selected":""}>${k+1}</option>`).join("")}</select></label>${words?`<p class="note full">${t.decal_cost(words,usd(words*8*BQ.dn))}</p>`:""}</div>`:""}
  <label class="bq-dec"><input type="checkbox" id="bq-bag"${BQ.bag?" checked":""}><span><b>${t.bag_l}</b><small>${t.bag_sub}${BQ.bag&&bags?" · "+t.bag_n(bags,usd(bags*BAGP)):""}</small></span></label>
  <div class="pc gtg-sel" aria-live="polite"><span>Total</span><b>${usd(bunchTotal(bqBunch()))}</b><small>${t.gtg.tax}</small></div>
  <div class="row"><button type="button" class="btn pri big" id="bq-add">${t.add}</button>${big?`<a class="btn big" id="bq-av">${t.ck_av}</a>`:""}</div>
  <p id="bq-msg" role="status">${BQ.msg}</p>
  <ul class="gtg-list">${big?`<li>${t.avail_p}</li>`:""}<li>${t.lim_note}</li><li>${t.hel_i2}</li><li>${t.lead_std}</li><li>${t.hel_i3}</li><li>${t.gtg.tax}</li></ul>
  </div></div>
  <h2 class="also ctr">${t.also}</h2><div class="pgrid">${catOf(p.cat).filter(x=>x.id!==p.id).slice(0,4).map(pcard).join("")}</div>`;
 bqWire(p)}

function bqRefresh(p){const keep=document.activeElement&&document.activeElement.id;renderBunch(p);if(keep){const e=$("#"+keep);if(e){e.focus();if(e.setSelectionRange&&e.value)try{e.setSelectionRange(e.value.length,e.value.length)}catch(x){}}}}
function bqWire(p){const t=T[L];
 $$(".bq-pick").forEach(b=>b.onclick=e=>{const i=+b.dataset.pick;
  if(e.target.classList.contains("x")){BQ.c[i]=null;BQ.n[i]="";BQ.act=i}else BQ.act=i;
  BQ.msg="";bqRefresh(p)});
 $$(".pal-c").forEach(b=>b.onclick=()=>{const nm=PAL[+b.dataset.c][0],at=BQ.c.indexOf(nm);
  if(at>=0){BQ.c[at]=null;BQ.n[at]="";BQ.act=at}
  else{let i=BQ.c[BQ.act]==null?BQ.act:BQ.c.indexOf(null);if(i<0)i=BQ.act;BQ.c[i]=nm;BQ.act=i}
  BQ.msg="";bqRefresh(p)});
 $$(".bq-q").forEach(s=>s.onchange=()=>{BQ.q[+s.dataset.q]=+s.value;bqRefresh(p)});
 $$(".bq-n").forEach(x=>x.oninput=()=>{BQ.n[+x.dataset.n]=x.value;const e=$("#bq-prev");if(e)0});
 $$(".bq-size").forEach(b=>b.onclick=()=>{const v=b.dataset.size;BQ.size=v==="enc"?"enc":+v;if(BQ.size!=="enc")BQ.dec=false;BQ.msg="";bqRefresh(p)});
 const bg=$("#bq-bag");if(bg)bg.onchange=()=>{BQ.bag=bg.checked;bqRefresh(p)};
 const av=$("#bq-av");if(av)av.href=smsLink(bqMsg("av"));
 const d=$("#bq-dec");if(d)d.onchange=()=>{BQ.dec=d.checked;bqRefresh(p)};
 const dw=$("#bq-dw");if(dw)dw.oninput=()=>{BQ.dw=dw.value};
 const dwb=$("#bq-dw");if(dwb)dwb.onblur=()=>bqRefresh(p);
 const dn=$("#bq-dn");if(dn)dn.onchange=()=>{BQ.dn=+dn.value;bqRefresh(p)};
 const mo=$("#bq-more");if(mo)mo.href=smsLink(bqMsg("mo"));
 $("#bq-add").onclick=()=>{
  if(!bqFilled().length){BQ.msg=t.need_c;$("#bq-msg").textContent=t.need_c;return}
  const it={id:p.id,qty:1,bunch:bqBunch()};
  const key=JSON.stringify(it.bunch),ex=CART.find(i=>i.bunch&&JSON.stringify(i.bunch)===key);
  if(ex)ex.qty=Math.min(20,ex.qty+1);else CART.push(it);
  saveCart();BQ.msg=`${t.added} <a href="cart.html">${t.view_cart}</a>`;$("#bq-msg").innerHTML=BQ.msg}}

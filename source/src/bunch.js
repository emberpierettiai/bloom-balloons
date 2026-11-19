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
 size_h:"Balloon size",std:"Standard",check_av:"Check availability",
 decal_l:"Add a custom decal · $8 per word or symbol",
 decal_12:"Available for 18″ and 24″ encapsulated balloons by request.",
 decal_w:"Words or symbols",decal_wph:"Happy Birthday",decal_n:"On how many balloons?",
 decal_cost:(n,v)=>`${n} ${n===1?"word or symbol":"words or symbols"} · ${v} in decals`,
 prev_cap:"Color preview · 9 balloons shown as a sample arrangement.",
 enc_note:"18″ and 24″ are encapsulated balloons, made to order. Text us and we’ll confirm availability and the price.",
 req_av:"Check Availability by Text",need_c:"Choose at least one color first.",
 lim_note:"Online orders: up to 10 balloons per color, 30 in total. For more, text us.",
 bm:{hi:"Hi Bloom Balloons! I’d like helium balloons:",av:"Hi Bloom Balloons! I’d like to check availability:",mo:"Hi Bloom Balloons! I’d like more balloons than the website allows:",
  size:"Size",tot:"Total balloons",price:"Estimated price",dec:"Custom decal",decn:n=>`on ${n} ${n===1?"balloon":"balloons"}`,end:"Please confirm availability and total."}});
Object.assign(T.es,{bunch_h:"Arma tu ramo de globos con helio",bunch_sub:"Elige hasta 3 colores",
 th_color:"Color",th_qty:"Cantidad",th_notes:"Notas especiales · opcional",ph_note:"Agrega una nota",
 col_n:n=>`Color ${n}`,pick_c:"Elige un color",rm_c:"Quitar",
 sel_sum:n=>`${n} ${n===1?"globo seleccionado":"globos seleccionados"} · Hasta 10 por color`,
 more_b:"¿Más globos? Escríbenos",pal_h:"Colores estándar de globos",
 pal_note:"Los colores reales pueden variar un poco respecto a los de tu pantalla.",
 size_h:"Tamaño del globo",std:"Estándar",check_av:"Consultar disponibilidad",
 decal_l:"Agrega una calcomanía personalizada · $8 por palabra o símbolo",
 decal_12:"Disponible para globos encapsulados de 18″ y 24″ bajo consulta.",
 decal_w:"Palabras o símbolos",decal_wph:"Feliz Cumpleaños",decal_n:"¿En cuántos globos?",
 decal_cost:(n,v)=>`${n} ${n===1?"palabra o símbolo":"palabras o símbolos"} · ${v} en calcomanías`,
 prev_cap:"Vista previa de color · se muestran 9 globos como ejemplo.",
 enc_note:"Los globos de 18″ y 24″ son encapsulados y se hacen bajo pedido. Escríbenos y confirmamos disponibilidad y precio.",
 req_av:"Consultar disponibilidad por texto",need_c:"Primero elige al menos un color.",
 lim_note:"Pedidos en línea: hasta 10 globos por color y 30 en total. Para más, escríbenos.",
 bm:{hi:"¡Hola, Bloom Balloons! Me gustaría pedir globos con helio:",av:"¡Hola, Bloom Balloons! Quiero consultar disponibilidad:",mo:"¡Hola, Bloom Balloons! Quiero más globos de los que permite el sitio:",
  size:"Tamaño",tot:"Total de globos",price:"Precio estimado",dec:"Calcomanía personalizada",decn:n=>`en ${n} ${n===1?"globo":"globos"}`,end:"Por favor, confirmen la disponibilidad y el total."}});

/* ---- preview: 9 balloons, three vertical colour columns ---- */
const COLX=[128,260,392], ROWY=[200,365,530], OFF=[18,-26,4], BRX=56, BRY=66, BQX=260, BQY=662;
function balloon(i,cx,cy,hex){const g="bg"+i,met=hex===PAL[PALI["Metallic Gold"]][1]||hex===PAL[PALI["Metallic Silver"]][1];
 const tipY=cy+BRY-2, st=pale(hex)?` stroke="${shade(hex,0.18)}" stroke-width="1.5"`:"";
 return `<defs><radialGradient id="${g}" cx="34%" cy="26%" r="82%"><stop offset="0" stop-color="${tint(hex,met?0.55:0.4)}"/><stop offset="0.5" stop-color="${hex}"/><stop offset="1" stop-color="${shade(hex,met?0.42:0.34)}"/></radialGradient></defs>`
 +`<g><path d="M${cx-10} ${tipY}L${cx} ${tipY+18}L${cx+10} ${tipY}Z" fill="${shade(hex,pale(hex)?0.16:0.3)}"${st}/>`
 +`<ellipse cx="${cx}" cy="${cy}" rx="${BRX}" ry="${BRY}" fill="url(#${g})"${st}/>`
 +(met?`<ellipse cx="${cx-BRX*0.18}" cy="${cy}" rx="${BRX*0.26}" ry="${BRY*0.82}" fill="${tint(hex,0.6)}" opacity=".45"/>`:"")
 +`<ellipse cx="${cx-BRX*0.34}" cy="${cy-BRY*0.33}" rx="${BRX*0.21}" ry="${BRY*0.14}" fill="#fff" opacity="${met?0.8:0.62}" transform="rotate(-28 ${cx-BRX*0.34} ${cy-BRY*0.33})"/>`
 +`</g>`}
function bunchSvg(hexes,base){let s="",rib="";let i=0;
 const pts=[];
 for(let r=0;r<3;r++)for(let c=0;c<3;c++)pts.push([c,COLX[c],ROWY[r]+OFF[c]]);
 pts.forEach(([c,x,y],k)=>{rib+=`<path d="M${x} ${y+BRY+16}C${x} ${y+BRY+90} ${x+(BQX-x)*0.55} ${BQY-70} ${BQX} ${BQY}" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity=".8"/>`});
 pts.forEach(([c,x,y],k)=>{s+=balloon(k,x,y,hexes[k])});
 const bb=[[BQX-32,BQY+54,21],[BQX+2,BQY+46,22],[BQX+34,BQY+56,20],[BQX-17,BQY+79,21],[BQX+19,BQY+81,21],[BQX+1,BQY+68,18]]
  .map((b,j)=>`<ellipse cx="${b[0]}" cy="${b[1]}" rx="${b[2]}" ry="${b[2]*0.92}" fill="${j%2?tint(base,0.12):base}"${pale(base)?` stroke="${shade(base,0.18)}" stroke-width="1.2"`:""}/>`).join("");
 return `<svg viewBox="0 0 520 790" role="img" aria-label="${esc(T[L].prev_cap)}"><rect width="520" height="790" fill="#D9D5D8"/><ellipse cx="${BQX}" cy="762" rx="118" ry="13" fill="#000" opacity=".12"/>${rib}${s}<path d="M${BQX-14} ${BQY}q14 -10 28 0" fill="none" stroke="#EFE7DD" stroke-width="3"/>${bb}</svg>`}

/* ---- state ---- */
const BQ={c:[null,null,null],q:[3,3,3],n:["","",""],act:0,size:12,dec:false,dw:"",dn:1,msg:""};
const bqFilled=()=>BQ.c.map((v,i)=>({v,i})).filter(o=>o.v!=null);
const bqTotal=()=>bqFilled().reduce((a,o)=>a+BQ.q[o.i],0);
const bqHex=n=>PAL[PALI[n]][1];
function bqPreview(){const f=bqFilled().map(o=>bqHex(o.v));
 let cols;
 if(!f.length)cols=[RED,RED,RED];
 else if(f.length===1)cols=[f[0],f[0],f[0]];
 else if(f.length===2)cols=[f[0],f[0],f[1]];
 else cols=[f[0],f[1],f[2]];
 const hexes=[];for(let r=0;r<3;r++)for(let c=0;c<3;c++)hexes.push(cols[c]);
 return bunchSvg(hexes,f.length?f[0]:RED)}
function bqDecWords(){return BQ.dw.trim()?BQ.dw.trim().split(/\s+/).length:0}
function bqMsg(kind){const t=T[L],m=t.bm,L1=[];
 bqFilled().forEach(o=>L1.push(`• ${BQ.q[o.i]}× ${o.v}${BQ.n[o.i].trim()?" — "+BQ.n[o.i].trim():""}`));
 const a=[kind==="av"?m.av:kind==="mo"?m.mo:m.hi,"",...(L1.length?L1:["• —"]),"",`${m.size}: ${BQ.size}″`,`${m.tot}: ${bqTotal()}`];
 if(BQ.size===12)a.push(`${m.price}: ${usd(bqTotal()*PR.hel.price)}`);
 if(BQ.size!==12&&BQ.dec&&bqDecWords())a.push(`${m.dec}: “${BQ.dw.trim()}” ${m.decn(BQ.dn)} (${usd(bqDecWords()*8*BQ.dn)})`);
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
 const sizes=[[12,t.std],[18,t.check_av],[24,t.check_av]].map(s=>
  `<button type="button" class="bq-size${BQ.size===s[0]?" on":""}" data-size="${s[0]}"><b>${s[0]}″</b><span>${s[1]}${BQ.size===s[0]&&s[0]===12?" ✓":""}</span></button>`).join("");
 const enc=BQ.size!==12, words=bqDecWords();
 $("#app").innerHTML=crumbs([[t.home,"index.html"],[c[L],curl(c)],[t.bunch_h]])+
 `<div class="pwrap bq"><div class="pgal"><div class="ph bq-prev" id="bq-prev">${bqPreview()}</div><p class="note ctr" style="margin-top:10px">${t.prev_cap}</p></div>
  <div class="pinfo"><h1 class="ph1">${t.bunch_h}</h1><p class="pbig">${usd(PR.hel.price)} <small>${t.each} · 12″</small></p>
  <h2 class="bq-h2">${t.bunch_sub}</h2>
  <div class="bq-head"><span>${t.th_color}</span><span>${t.th_qty}</span><span>${t.th_notes}</span></div>
  ${[0,1,2].map(row).join("")}
  <div class="bq-sum"><span>${t.sel_sum(bqTotal())}</span><a class="lnk2" id="bq-more">${t.more_b}</a></div>
  <section class="bq-pal"><h3>${t.pal_h}</h3><div class="pal-g">${palHtml}</div><p class="note">${t.pal_note}</p></section>
  <h2 class="bq-h2">${t.size_h}</h2><div class="bq-sizes">${sizes}</div>
  <label class="bq-dec${enc?"":" off"}"><input type="checkbox" id="bq-dec"${BQ.dec&&enc?" checked":""}${enc?"":" disabled"}><span><b>${t.decal_l}</b><small>${t.decal_12}</small></span></label>
  ${enc&&BQ.dec?`<div class="bq-dw"><label>${t.decal_w}<input id="bq-dw" maxlength="60" placeholder="${t.decal_wph}" value="${esc(BQ.dw)}"></label><label>${t.decal_n}<select id="bq-dn">${[...Array(10)].map((_,k)=>`<option value="${k+1}"${k+1===BQ.dn?" selected":""}>${k+1}</option>`).join("")}</select></label>${words?`<p class="note full">${t.decal_cost(words,usd(words*8*BQ.dn))}</p>`:""}</div>`:""}
  ${enc?`<p class="note">${t.enc_note}</p>`:`<div class="pc gtg-sel" aria-live="polite"><span>Total</span><b>${usd(bqTotal()*PR.hel.price)}</b><small>${t.gtg.tax}</small></div>`}
  <div class="row"><button type="button" class="btn pri big" id="bq-add">${enc?t.req_av:t.add}</button></div>
  <p id="bq-msg" role="status">${BQ.msg}</p>
  <ul class="gtg-list"><li>${t.lim_note}</li><li>${t.hel_i2}</li><li>${t.lead_std}</li><li>${t.hel_i3}</li><li>${t.gtg.tax}</li></ul>
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
 $$(".bq-size").forEach(b=>b.onclick=()=>{BQ.size=+b.dataset.size;if(BQ.size===12)BQ.dec=false;BQ.msg="";bqRefresh(p)});
 const d=$("#bq-dec");if(d)d.onchange=()=>{BQ.dec=d.checked;bqRefresh(p)};
 const dw=$("#bq-dw");if(dw)dw.oninput=()=>{BQ.dw=dw.value};
 const dwb=$("#bq-dw");if(dwb)dwb.onblur=()=>bqRefresh(p);
 const dn=$("#bq-dn");if(dn)dn.onchange=()=>{BQ.dn=+dn.value;bqRefresh(p)};
 const mo=$("#bq-more");if(mo)mo.href=smsLink(bqMsg("mo"));
 $("#bq-add").onclick=()=>{
  if(!bqFilled().length){BQ.msg=t.need_c;$("#bq-msg").textContent=t.need_c;return}
  if(BQ.size!==12){location.href=smsLink(bqMsg("av"));return}
  const it={id:p.id,qty:1,bunch:{size:12,items:bqFilled().map(o=>({c:o.v,q:BQ.q[o.i],n:BQ.n[o.i].trim()}))}};
  const key=JSON.stringify(it.bunch),ex=CART.find(i=>i.bunch&&JSON.stringify(i.bunch)===key);
  if(ex)ex.qty=Math.min(20,ex.qty+1);else CART.push(it);
  saveCart();BQ.msg=`${t.added} <a href="cart.html">${t.view_cart}</a>`;$("#bq-msg").innerHTML=BQ.msg}}

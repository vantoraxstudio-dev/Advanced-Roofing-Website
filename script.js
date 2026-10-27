(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const SERVICES=[['Roof repair','Fix leaks, flashing and damaged shingles.','repair'],['Roof replacement','A full new roof system, planned in writing.','replacement'],['Storm damage & inspection','Documented review after hail or wind.','storm'],['Roof maintenance','Routine checks that extend roof life.','maintenance']];
const PROJECTS=[['Slate-look gable','Replacement','Full replacement concept on a steep gable.','#1f3350'],['Ridge flashing fix','Repair','Flashing repair concept at a chimney.','#2c5a47'],['Hail inspection','Storm Damage','Inspection concept after a hailstorm.','#4a3b2a'],['Low-slope update','Replacement','Replacement concept for a low-slope roof.','#27405f'],['Valley repair','Repair','Valley repair concept for recurring leaks.','#3b5646'],['Wind-lifted shingles','Storm Damage','Storm assessment concept after high winds.','#5a4630']];
const AREAS=['Northvale','Pinecrest Heights','Lakeshore Mills','Redwood Junction','Harbor Glen','Stonebridge'];
const FAQS=[['Is SummitPeak a real company?','No. It is a fictional concept used by Vantorax Studio to demonstrate web design.'],['Does the form send my request?','No. It is a demonstration form and nothing is submitted.'],['How long does a roof replacement take?','This is a sample answer. A real company would give honest timelines based on roof size and weather.'],['Do you offer warranties?','No warranty is claimed in this concept. Real terms would be listed here.']];
function roof(c,i){const k=['M30 190 200 70l170 120z','M20 200 200 60l180 140z','M40 200 120 90h160l80 110z','M20 190h360v-40L200 80 20 150z'][i%4];
return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="400" height="300" fill="${c}"/><rect y="230" width="400" height="70" fill="#0d1b2e" opacity=".5"/><rect x="60" y="190" width="280" height="80" fill="#faf6ec" opacity=".9"/><path d="${k}" fill="#0d1b2e" stroke="#b8934a" stroke-width="4"/><rect x="170" y="220" width="40" height="50" fill="#b8934a"/></svg>`}
function renderArt(){$$('[data-art]').forEach(e=>{e.innerHTML=roof(['#27405f','#2c5a47','#1f3350','#4a3b2a'][e.dataset.art%4],+e.dataset.art)})}
function render(){
$$('[data-render]').forEach(el=>{const n=+el.dataset.limit||99;let h='';
if(el.dataset.render==='services')h=SERVICES.map(s=>`<article class="card"><h3>${s[0]}</h3><p>${s[1]}</p><a href="#${s[2]}" data-nav>Learn more</a></article>`).join('');
if(el.dataset.render==='areas')h=AREAS.slice(0,n).map(a=>`<article class="card"><h3>${a}</h3><p>Sample placeholder city. Fictional.</p></article>`).join('');
if(el.dataset.render==='faq')h=FAQS.slice(0,n).map((f,i)=>`<div class="acc"><h3><button aria-expanded="false" aria-controls="a${el.dataset.limit||0}${i}">${f[0]}</button></h3><div class="a" id="a${el.dataset.limit||0}${i}" hidden>${f[1]}</div></div>`).join('');
if(el.dataset.render==='gallery')h=PROJECTS.slice(0,n).map((p,i)=>`<button class="proj" data-cat="${p[1]}" data-i="${i}" aria-label="Enlarge ${p[0]}"><div class="art">${roof(p[3],i)}</div><div class="t"><span class="tag">${p[1]}</span><span class="tag s">Sample project</span><h3>${p[0]}</h3><p>${p[2]}</p></div></button>`).join('');
el.innerHTML=h});}
let last=null;
function route(){const id=(location.hash||'#home').slice(1);const v=document.getElementById(id);const view=v&&v.classList.contains('view')?v:$('#home');
$$('.view').forEach(x=>x.classList.toggle('on',x===view));
$$('nav a[data-nav]').forEach(a=>{const t=a.getAttribute('href').slice(1);a.classList.toggle('on',t===view.id||(a.dataset.group||'').split(' ').includes(view.id));a.toggleAttribute('aria-current',t===view.id)});
document.title=`${view.dataset.title} | SummitPeak Roofing (Fictional Concept)`;
$('nav').classList.remove('open');$('.menu-btn').setAttribute('aria-expanded','false');
if(last!==null){window.scrollTo({top:0,behavior:reduce?'auto':'smooth'});$('#main').focus({preventScroll:true})}last=view.id}
function menu(){const b=$('.menu-btn'),n=$('#nav');b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu')});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&n.classList.contains('open')){n.classList.remove('open');b.setAttribute('aria-expanded','false');b.focus()}})}
function faq(){document.addEventListener('click',e=>{const b=e.target.closest('.acc button');if(!b)return;const open=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!open);document.getElementById(b.getAttribute('aria-controls')).hidden=open})}
function filters(){$$('.chip').forEach(c=>c.addEventListener('click',()=>{$$('.chip').forEach(x=>{x.classList.toggle('on',x===c);x.setAttribute('aria-pressed',x===c)});$$('#projects .proj').forEach(p=>p.hidden=c.dataset.f!=='all'&&p.dataset.cat!==c.dataset.f)}))}
function lightbox(){const lb=$('#lb');let from=null;
const close=()=>{lb.hidden=true;from&&from.focus()};
document.addEventListener('click',e=>{const p=e.target.closest('.proj');if(!p)return;from=p;const d=PROJECTS[p.dataset.i];$('.lb-art').innerHTML=roof(d[3],+p.dataset.i);$('.lb-cap').textContent=d[0]+' (sample concept illustration)';lb.hidden=false;$('.lb-x').focus()});
$('.lb-x').addEventListener('click',close);lb.addEventListener('click',e=>{if(e.target===lb)close()});
document.addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='Tab'){e.preventDefault();$('.lb-x').focus()}})}
function form(){const f=$('#est'),R=$('#result');
const rules={name:v=>v.trim()?'':'Enter your full name.',email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)?'':'Enter an email like name@example.com.',phone:v=>v.replace(/\D/g,'').length>=7?'':'Enter a phone number with at least 7 digits.',zip:v=>/^[A-Za-z0-9][A-Za-z0-9 \-]{2,9}$/.test(v.trim())?'':'Enter a valid ZIP or postal code.',service:v=>v?'':'Choose a service.',details:v=>v.trim().length>=10?'':'Add at least 10 characters about your project.'};
function check(k){const el=f.elements[k],m=rules[k](el.value);$('#e-'+k).textContent=m;m?(el.setAttribute('aria-invalid','true'),el.setAttribute('aria-describedby','e-'+k)):(el.removeAttribute('aria-invalid'),el.removeAttribute('aria-describedby'));return !m}
Object.keys(rules).forEach(k=>f.elements[k].addEventListener('blur',()=>check(k)));
f.addEventListener('submit',e=>{e.preventDefault();const bad=Object.keys(rules).filter(k=>!check(k));R.className='show';
if(bad.length){R.classList.add('bad');R.textContent=`Please fix ${bad.length} field${bad.length>1?'s':''} before continuing.`;f.elements[bad[0]].focus()}
else{R.textContent='Your entries look valid. This is a demonstration form, so nothing was submitted and no one received your details.';R.focus()}})}
function top(){const t=$('#top');addEventListener('scroll',()=>{t.hidden=scrollY<600},{passive:true});t.addEventListener('click',()=>scrollTo({top:0,behavior:reduce?'auto':'smooth'}))}
renderArt();render();menu();faq();filters();lightbox();form();top();addEventListener('hashchange',route);route();
})();

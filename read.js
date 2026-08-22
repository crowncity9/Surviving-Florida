const chapters=window.SF_CHAPTERS||[];
const list=document.querySelector('#chapterList'),body=document.querySelector('#chapterBody'),title=document.querySelector('#chapterTitle'),label=document.querySelector('#chapterLabel'),aside=document.querySelector('#chapters');
const saved=Number(localStorage.getItem('sfChapter')||1);
let current=Math.max(0,Math.min(chapters.length-1,(+location.hash.replace('#chapter-','')||saved)-1));
let fontSize=Math.max(16,Math.min(28,Number(localStorage.getItem('sfFont')||21)));
const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
function paragraphs(text){return text.split(/\n\s*\n/).map(p=>p.trim()==='---'?'<hr>':`<p>${esc(p).replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>')}</p>`).join('')}
function drawList(){list.innerHTML=chapters.map((c,i)=>`<button class="chapter-link${i===current?' active':''}" data-i="${i}"><span>${String(c.number).padStart(2,'0')}</span><b>${esc(c.title.replace(/^Chapter [^—]+ — /,''))}</b></button>`).join('');list.querySelectorAll('button').forEach(b=>b.onclick=()=>select(+b.dataset.i))}
function render(){const c=chapters[current];label.textContent=`Chapter ${c.number} of ${chapters.length}`;title.textContent=c.title.replace(/^Chapter [^—]+ — /,'');body.innerHTML=paragraphs(c.body);body.style.fontSize=`${fontSize}px`;document.querySelector('#prev').disabled=current===0;document.querySelector('#next').disabled=current===chapters.length-1;history.replaceState(null,'',`#chapter-${c.number}`);localStorage.setItem('sfChapter',c.number);drawList();document.title=`${c.title} — Surviving Florida`;window.scrollTo({top:document.querySelector('#reader').offsetTop-65,behavior:'smooth'})}
function select(i){current=i;aside.classList.remove('open');document.querySelector('#chaptersBtn').setAttribute('aria-expanded','false');render()}
function setFont(delta){fontSize=Math.max(16,Math.min(28,fontSize+delta));localStorage.setItem('sfFont',fontSize);body.style.fontSize=`${fontSize}px`}
document.querySelector('#chaptersBtn').onclick=()=>{aside.classList.add('open');document.querySelector('#chaptersBtn').setAttribute('aria-expanded','true')};
document.querySelector('#closeChapters').onclick=()=>aside.classList.remove('open');
document.querySelector('#prev').onclick=()=>current>0&&select(current-1);
document.querySelector('#next').onclick=()=>current<chapters.length-1&&select(current+1);
document.querySelector('#smaller').onclick=()=>setFont(-1);
document.querySelector('#larger').onclick=()=>setFont(1);
document.querySelector('#theme').onclick=()=>{document.body.classList.toggle('night');localStorage.setItem('sfTheme',document.body.classList.contains('night')?'night':'paper')};
if(localStorage.getItem('sfTheme')==='night')document.body.classList.add('night');
document.querySelector('#topBtn').onclick=()=>scrollTo({top:0,behavior:'smooth'});
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('#progress').style.width=`${max?scrollY/max*100:0}%`;document.querySelector('#topBtn').classList.toggle('show',scrollY>500)});
render();

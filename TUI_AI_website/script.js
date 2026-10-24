const $=(s,r=document)=>r.querySelectorAll(s),still=matchMedia('(prefers-reduced-motion:reduce)').matches;

// scroll progress bar
const bar=document.getElementById('bar');
addEventListener('scroll',()=>bar.style.width=scrollY/(document.body.scrollHeight-innerHeight)*100+'%',{passive:true});

// reveal on scroll
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.15});
$('.rv').forEach(el=>io.observe(el));

// tabs (gallery + install)
$('.tabset').forEach(s=>{
  const b=$('.tabs button',s),p=$('.pane',s);
  b.forEach((x,i)=>x.onclick=()=>b.forEach((y,j)=>{y.classList.toggle('on',i==j);p[j].classList.toggle('on',i==j)}));
});

// copy buttons
$('.copy').forEach(b=>b.onclick=async()=>{
  try{await navigator.clipboard.writeText(b.nextElementSibling.innerText);b.textContent='copied ✓'}
  catch{b.textContent='press Ctrl+C'}
  setTimeout(()=>b.textContent='copy',1600);
});

// hero terminal: types commands, prints output, loops
const term=document.getElementById('term'),
script=[['$ git clone https://github.com/itzme4/TUI_AI.git','k'],['$ pip install -r requirements.txt','k'],['cd src','k'],['$ python -m tui-ai','k'],
        ['Welcome to TUI AI  ◇ offline and online ◇','o'],['Jarvis: Good evening! How can I help?','a'],
        ['Ravi: explain python in one line','k'],['Jarvis: A readable, general-purpose language.','a']];
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function run(){
  for(;;){
    term.innerHTML='';
    for(const [txt,cls] of script){
      const line=document.createElement('div');line.className=cls;term.appendChild(line);
      if(still){line.textContent=txt;continue}
      line.classList.add('cur');
      if(cls==='k'){for(const ch of txt){line.textContent+=ch;await wait(38)}}
      else{await wait(350);line.textContent=txt}
      line.classList.remove('cur');await wait(420);
    }
    if(still)return;
    term.lastChild.classList.add('cur');await wait(4200);
  }
}
run();

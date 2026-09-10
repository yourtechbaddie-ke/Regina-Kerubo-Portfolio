const mobileStyle=document.createElement('link');mobileStyle.rel='stylesheet';mobileStyle.href='mobile.css';document.head.appendChild(mobileStyle);
const flagshipStyle=document.createElement('link');flagshipStyle.rel='stylesheet';flagshipStyle.href='flagship-projects.css';document.head.appendChild(flagshipStyle);

const nav=document.querySelector('.nav');
const reveals=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -30px'});
reveals.forEach(el=>observer.observe(el));

let ticking=false;
window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{nav.classList.toggle('scrolled',window.scrollY>30);ticking=false})},{passive:true});

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));

document.querySelectorAll('.project-visual').forEach(v=>{v.addEventListener('mousemove',e=>{if(innerWidth<900)return;const r=v.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;v.style.transform=`perspective(900px) rotateX(${y*-2.2}deg) rotateY(${x*2.2}deg) scale(.992)`});v.addEventListener('mouseleave',()=>v.style.transform='')});

const aureliaCard=document.querySelector('.dark-couture-card');
if(aureliaCard){const project=aureliaCard.closest('.project');if(project){const title=project.querySelector('h3'),meta=project.querySelector('.project-meta'),description=project.querySelector('p'),link=project.querySelector('.project-link');if(meta)meta.innerHTML='<span>08 · Luxury travel / Campaign</span><span>Creative direction · UX · Story</span>';if(title)title.textContent='Aurelia Journeys';if(description)description.textContent='A luxury travel campaign translating destination storytelling, digital experience and curated escape inspiration into one immersive journey.';if(link){link.textContent='Enter Aurelia Journeys ↗';link.href='https://aurelia-journeys.onrender.com';link.target='_blank';link.rel='noreferrer'}}}

document.querySelector('.campaign-image.tall')?.remove();
document.querySelectorAll('.marketing-case img').forEach(img=>img.addEventListener('error',()=>img.closest('.campaign-image,.campaign-hero-image')?.remove(),{once:true}));

const projectList=document.querySelector('.project-list');
if(projectList){
  const flagship=[
    {num:'09',cls:'private-letter-visual',title:'The Private Letter',category:'Email marketing / Client nurturing',stack:'Editorial strategy · Conversion · UX',desc:'A private-club-inspired nurture experience turning thoughtful correspondence into a refined client acquisition journey.',url:'https://the-private-letter.onrender.com',cta:'Enter The Private Letter ↗',visual:'THE PRIVATE<br>LETTER',note:'PRIVATE CORRESPONDENCE'},
    {num:'01',cls:'house-her-visual',title:'The House of Her',category:'Personal digital experience',stack:'Identity · Story · Brand architecture · Experience',desc:'A personal digital house that introduces Regina before the rest of the work: who she is, what she creates and builds, how she thinks, what she is learning, and the life beyond the work.',url:'https://the-house-of-her.onrender.com',cta:'Enter The House of Her ↗',visual:'THE HOUSE<br>OF HER',note:'PERSONAL DIGITAL HOUSE'},
    {num:'10',cls:'conversion-room-visual',title:'The Conversion Room',category:'Marketing analytics / Growth intelligence',stack:'Funnel analysis · Campaign measurement · UX',desc:'A campaign intelligence dashboard built to turn marketing numbers into decisions: diagnose friction, compare channel roles and find the next intervention.',url:'https://the-conversion-room.onrender.com',cta:'Enter The Conversion Room ↗',visual:'ATTENTION<br>→ INTENT',note:'CAMPAIGN INTELLIGENCE / SIMULATED'},
    {num:'11',cls:'creators-table-visual',title:"The Creator's Table",category:'UGC / Influencer campaign',stack:'Creator strategy · Creative direction · Measurement',desc:'A campaign studio demonstrating how creator fit, content roles, storytelling and measurement can work as one system instead of a list of sponsored posts.',url:'https://the-creators-table.onrender.com',cta:"Enter The Creator's Table ↗",visual:"THE CREATOR'S<br>TABLE",note:'UGC / CREATOR CAMPAIGN'},
    {num:'12',cls:'the-drop-visual',title:'The Drop',category:'Sales / Product launch campaign',stack:'Launch strategy · Product storytelling · Conversion',desc:'A premium product-launch experience built to create anticipation, reveal the offer with intention and move interested audiences toward purchase.',url:'https://the-drop-4chp.onrender.com',cta:'Enter The Drop ↗',visual:'THE<br>DROP',note:'PRODUCT LAUNCH / SALES'},
    {num:'13',cls:'scroll-sale-visual',title:'From Scroll to Sale',category:'Social + WhatsApp conversion',stack:'Social strategy · Direct response · Customer journey',desc:'A conversion-focused campaign experience showing how social discovery can become a direct, human sales conversation through WhatsApp.',url:'https://from-scroll-to-sale.onrender.com',cta:'Enter From Scroll to Sale ↗',visual:'SCROLL<br>→ SALE',note:'SOCIAL / WHATSAPP CONVERSION'},
    {num:'14',cls:'regina-brands-visual',title:'REGINA × BRANDS',category:'Creator / Influencer partnerships',stack:'UGC · Sponsored content · Creative direction · Campaign strategy',desc:'A creator partnership showcase built around product storytelling, travel content, digital campaigns and brand worlds that feel human rather than manufactured.',url:'https://regina-x-brands.onrender.com',cta:'Enter REGINA × BRANDS ↗',visual:'REGINA<br>× BRANDS',note:'CREATOR PARTNERSHIPS'}
  ];

  flagship.forEach(f=>{
    if(projectList.querySelector(`[data-flagship="${f.cls}"]`))return;
    const el=document.createElement('article');
    el.className='project project-feature reveal';
    el.dataset.flagship=f.cls;
    el.innerHTML=`<div class="project-visual ${f.cls}"><div class="flagship-art"><span>${f.note}</span><strong>${f.visual}</strong><i>↗</i></div><div class="flagship-scribble">crafted, not templated</div></div><div class="project-meta"><span>${f.num} · ${f.category}</span><span>${f.stack}</span></div><h3>${f.title}</h3><p>${f.desc}</p><a href="${f.url}" target="_blank" rel="noreferrer" class="project-link">${f.cta}</a>`;
    projectList.appendChild(el);
    observer.observe(el);
    const visual=el.querySelector('.project-visual');
    visual.addEventListener('mousemove',e=>{if(innerWidth<900)return;const r=visual.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;visual.style.transform=`perspective(900px) rotateX(${y*-2.2}deg) rotateY(${x*2.2}deg) scale(.992)`});
    visual.addEventListener('mouseleave',()=>visual.style.transform='');
  });

  const house=projectList.querySelector('[data-flagship="house-her-visual"]');
  if(house)projectList.insertBefore(house,projectList.firstElementChild);

  projectList.querySelectorAll('.project').forEach((project,index)=>{
    const number=String(index+1).padStart(2,'0');
    const first=project.querySelector('.project-meta span:first-child');
    if(first)first.textContent=first.textContent.replace(/^\d+/,number);
  });
}
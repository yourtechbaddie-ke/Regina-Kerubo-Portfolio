const nav=document.querySelector('.nav');const reveals=document.querySelectorAll('.reveal');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -30px'});reveals.forEach(el=>observer.observe(el));let ticking=false;window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{nav.classList.toggle('scrolled',window.scrollY>30);ticking=false})},{passive:true});document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));document.querySelectorAll('.project-visual').forEach(v=>{v.addEventListener('mousemove',e=>{if(innerWidth<900)return;const r=v.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;v.style.transform=`perspective(900px) rotateX(${y*-2.2}deg) rotateY(${x*2.2}deg) scale(.992)`});v.addEventListener('mouseleave',()=>v.style.transform='')});

const aureliaCard=document.querySelector('.dark-couture-card');
if(aureliaCard){
  const project=aureliaCard.closest('.project');
  if(project){
    const label=aureliaCard.querySelector('small');
    const visualTitle=aureliaCard.querySelector('strong');
    const title=project.querySelector('h3');
    const meta=project.querySelector('.project-meta');
    const description=project.querySelector('p');
    const link=project.querySelector('.project-link');
    if(label)label.textContent='AURELIA JOURNEYS';
    if(visualTitle)visualTitle.innerHTML='Travel <i>beautifully.</i>';
    if(meta)meta.innerHTML='<span>07 · Luxury travel / Campaign</span><span>Creative direction · UX · Story</span>';
    if(title)title.textContent='Aurelia Journeys';
    if(description)description.textContent='A luxury travel campaign translating destination storytelling, digital experience and curated escape inspiration into one immersive journey.';
    if(link){link.textContent='Enter Aurelia Journeys ↗';link.href='https://aurelia-journeys.onrender.com';link.target='_blank';link.rel='noreferrer'}
  }
}

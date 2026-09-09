const nav=document.querySelector('.nav');const reveals=document.querySelectorAll('.reveal');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -30px'});reveals.forEach(el=>observer.observe(el));let ticking=false;window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{nav.classList.toggle('scrolled',window.scrollY>30);ticking=false})},{passive:true});document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));document.querySelectorAll('.project-visual').forEach(v=>{v.addEventListener('mousemove',e=>{if(innerWidth<900)return;const r=v.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;v.style.transform=`perspective(900px) rotateX(${y*-2.2}deg) rotateY(${x*2.2}deg) scale(.992)`});v.addEventListener('mouseleave',()=>v.style.transform='')});

const projectList=document.querySelector('.project-list');
if(projectList&&!document.querySelector('.couture-project')){
  const article=document.createElement('article');
  article.className='project project-dark reveal couture-project';
  article.innerHTML=`<div class="project-visual" style="background:linear-gradient(135deg,rgba(12,6,10,.25),rgba(91,18,48,.72)),url('https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1800') center/cover"><div class="visual-copy"><small>DARK COUTURE / CAMPAIGN</small><strong>Make an <i style="font-family:'Playfair Display';color:#b8d0cd">entrance.</i></strong></div></div><div class="project-meta"><span>07 · Creative Technology / Campaign</span><span>Art Direction · UX · Story</span></div><h3>Dark Couture</h3><p>A high-fashion campaign microsite translating software, storytelling and luxury into one cinematic digital experience.</p><a href="campaign.html" class="project-link">Enter the campaign ↗</a>`;
  projectList.appendChild(article);
  observer.observe(article);
  const visual=article.querySelector('.project-visual');
  visual.addEventListener('mousemove',e=>{if(innerWidth<900)return;const r=visual.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;visual.style.transform=`perspective(900px) rotateX(${y*-2.2}deg) rotateY(${x*2.2}deg) scale(.992)`});
  visual.addEventListener('mouseleave',()=>visual.style.transform='');
}

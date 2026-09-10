const mobileStyle=document.createElement('link');mobileStyle.rel='stylesheet';mobileStyle.href='mobile.css';document.head.appendChild(mobileStyle);
const nav=document.querySelector('.nav');
const reveals=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -30px'});
reveals.forEach(el=>observer.observe(el));
let ticking=false;
window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{nav.classList.toggle('scrolled',window.scrollY>30);ticking=false})},{passive:true});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));
document.querySelectorAll('.project-visual').forEach(v=>{v.addEventListener('mousemove',e=>{if(innerWidth<900)return;const r=v.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;v.style.transform=`perspective(900px) rotateX(${y*-2.2}deg) rotateY(${x*2.2}deg) scale(.992)`});v.addEventListener('mouseleave',()=>v.style.transform='')});
// Campaign case-study pages are not part of the portfolio showcase. Individual projects remain available when selected by Regina.
document.querySelector('#luxury-travel-campaign')?.remove();

/* Final contact + footer polish — isolated from portfolio content. */
(()=>{
  const instagramUrl='https://www.instagram.com/hernameis_rey/';
  const whatsappUrl='https://wa.me/254706168307';
  const phoneRegex=/\+?254[\s-]?706[\s-]?168[\s-]?307/;
  const footerCopy='© 2026 Regina Kerubo Shiholo • Built to feel alive';

  const fixFooter=()=>{
    const footer=document.querySelector('footer');
    if(!footer)return;

    footer.querySelectorAll('a[href^="https://wa.me/"], [data-rk-social-links]').forEach(el=>el.remove());

    const walker=document.createTreeWalker(footer,NodeFilter.SHOW_TEXT);
    const nodes=[];
    let node;
    while(node=walker.nextNode()) nodes.push(node);

    const signatureNode=nodes.find(n=>/©\s*2026\s*Regina/i.test(n.nodeValue||'')||/Kerubo/i.test(n.nodeValue||'')||/Built\s*(with\s+intention|to\s+feel\s+alive)/i.test(n.nodeValue||''));
    if(signatureNode){
      const parent=signatureNode.parentElement;
      if(parent){
        parent.textContent='';
        parent.appendChild(document.createTextNode('© 2026 Regina Kerubo Shiholo '));
        const built=document.createElement('span');
        built.className='rk-footer-built';
        built.textContent='• Built to feel alive';
        parent.appendChild(built);
        parent.classList.add('rk-footer-signature');
      }
    }
  };

  const applyPolish=()=>{
    const contact=document.querySelector('#contact');
    if(contact){
      const email=contact.querySelector('a[href^="mailto:"]');
      if(email && !contact.querySelector('[data-rk-instagram]')){
        const link=document.createElement('a');
        link.dataset.rkInstagram='true';
        link.href=instagramUrl;link.target='_blank';link.rel='noreferrer';
        link.className='contact-social';
        link.setAttribute('aria-label','Instagram @hernameis_rey');
        link.innerHTML='<span>Instagram · @hernameis_rey ↗</span>';
        email.insertAdjacentElement('afterend',link);
      }
      const candidates=[...contact.querySelectorAll('a,span,p,div')];
      const existing=candidates.find(el=>phoneRegex.test(el.textContent||''));
      if(existing){
        const anchor=existing.closest('a')||existing;
        if(anchor.tagName==='A'){
          anchor.href=whatsappUrl;anchor.target='_blank';anchor.rel='noreferrer';
          anchor.classList.add('contact-social','contact-whatsapp');
          anchor.setAttribute('aria-label','WhatsApp +254 706 168 307');
          if(!anchor.textContent.includes('↗')) anchor.innerHTML=`<span>${anchor.textContent.trim()} ↗</span>`;
        }else{
          const walker=document.createTreeWalker(existing,NodeFilter.SHOW_TEXT);
          let textNode;
          while(textNode=walker.nextNode()){
            const match=textNode.nodeValue?.match(phoneRegex);
            if(!match) continue;
            const link=document.createElement('a');
            link.href=whatsappUrl;link.target='_blank';link.rel='noreferrer';
            link.className='contact-social contact-whatsapp';
            link.setAttribute('aria-label','WhatsApp +254 706 168 307');
            link.innerHTML=`<span>${match[0]} ↗</span>`;
            textNode.parentNode.replaceChild(link,textNode);
            break;
          }
        }
      }
    }
    fixFooter();
  };

  const style=document.createElement('style');
  style.textContent=`
    .contact-social{display:inline-flex!important;align-items:center;gap:12px;margin-top:18px;margin-left:4px;padding:0!important;border:0!important;font:clamp(15px,1.55vw,20px) 'Playfair Display',serif;color:#f3e8dc;text-decoration:none;letter-spacing:.01em;transition:color .3s ease,transform .3s ease}
    .contact-social:hover{color:#c7ded9;transform:translateY(-2px)}
    .contact-whatsapp{margin-left:0}
    .rk-footer-signature{display:inline-flex!important;align-items:baseline;gap:8px!important;font-family:'Playfair Display',serif!important;font-size:clamp(12px,1.1vw,16px)!important;font-weight:500!important;letter-spacing:.08em!important;color:#d8c6b7!important;line-height:1.7!important;text-transform:none!important;opacity:.94}
    .rk-footer-signature .rk-footer-built{display:inline-block!important;margin-left:0!important;white-space:nowrap!important;font-style:italic;letter-spacing:.06em;color:#efe1d4}
    @media(max-width:700px){.contact-social{display:flex!important;width:max-content;max-width:100%;margin-left:0}.rk-footer-signature{display:flex!important;flex-wrap:wrap;gap:5px!important;font-size:12px!important;letter-spacing:.05em!important}.rk-footer-signature .rk-footer-built{margin-left:0!important;letter-spacing:.04em}}
  `;
  document.head.appendChild(style);

  const run=()=>{applyPolish();setTimeout(fixFooter,250);};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  setTimeout(run,500);setTimeout(run,1500);setTimeout(run,3000);
  new MutationObserver(()=>fixFooter()).observe(document.body,{childList:true,subtree:true,characterData:true});
})();

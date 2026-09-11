/* Final contact + footer polish — isolated from portfolio content. */
(()=>{
  const instagramUrl='https://www.instagram.com/hernameis_rey/';
  const whatsappUrl='https://wa.me/254706168307';
  const phoneRegex=/\+?254[\s-]?706[\s-]?168[\s-]?307/;
  const approvedFooter='© 2026 Regina Kerubo Shiholo • Built to feel alive';

  const fixFooter=()=>{
    const footer=document.querySelector('footer'); if(!footer)return;

    // Remove only legacy/duplicate footer social elements. Never clear footer.innerHTML.
    footer.querySelectorAll('a[href^="https://wa.me/"], [data-rk-social-links]').forEach(el=>el.remove());
    [...footer.querySelectorAll('*')].forEach(el=>{
      if(el.children.length===0 && /(?:Built|But)\s+with\s+intention/i.test(el.textContent||'')) el.remove();
    });
    footer.querySelectorAll('.rk-footer-built').forEach(el=>el.remove());

    // Preserve all existing footer copy; normalize only the approved signature node.
    const walker=document.createTreeWalker(footer,NodeFilter.SHOW_TEXT);
    const nodes=[]; let node;
    while(node=walker.nextNode())nodes.push(node);
    let signature=nodes.find(n=>/©\s*2026\s*Regina/i.test(n.nodeValue||'')||/Kerubo\s+Shiholo/i.test(n.nodeValue||'')||/Built\s*to\s*feel\s*alive/i.test(n.nodeValue||''));
    if(signature&&signature.parentElement){
      signature.parentElement.textContent=approvedFooter;
      signature.parentElement.classList.add('rk-footer-signature');
    }else if(!footer.querySelector('.rk-footer-signature')){
      const el=document.createElement('span');
      el.className='rk-footer-signature';
      el.textContent=approvedFooter;
      footer.appendChild(el);
    }
  };

  const restoreWhatsApp=contact=>{
    if(!contact)return;
    const existing=[...contact.querySelectorAll('a,span,p,div')].find(el=>el.children.length===0&&phoneRegex.test(el.textContent||''));
    if(!existing)return;
    const anchor=existing.closest('a')||existing;
    if(anchor.tagName==='A'){
      anchor.href=whatsappUrl; anchor.target='_blank'; anchor.rel='noreferrer';
      anchor.classList.add('contact-social','contact-whatsapp');
      anchor.setAttribute('aria-label','WhatsApp +254 706 168 307');
      const clean=anchor.textContent.replace(/\s*↗\s*$/,'').trim();
      anchor.innerHTML=`<span>${clean} ↗</span>`;
    }else if(!contact.querySelector('a.contact-whatsapp')){
      const link=document.createElement('a');
      link.href=whatsappUrl; link.target='_blank'; link.rel='noreferrer';
      link.className='contact-social contact-whatsapp';
      link.setAttribute('aria-label','WhatsApp +254 706 168 307');
      link.innerHTML=`<span>${existing.textContent.trim()} ↗</span>`;
      existing.replaceWith(link);
    }
  };

  const applyPolish=()=>{
    const contact=document.querySelector('#contact');
    if(contact){
      const email=contact.querySelector('a[href^="mailto:"]');
      if(email&&!contact.querySelector('[data-rk-instagram]')){
        const link=document.createElement('a');
        link.dataset.rkInstagram='true';
        link.href=instagramUrl; link.target='_blank'; link.rel='noreferrer';
        link.className='contact-social';
        link.innerHTML='<span>Instagram · @hernameis_rey ↗</span>';
        email.insertAdjacentElement('afterend',link);
      }
      restoreWhatsApp(contact);
    }
    fixFooter();
  };

  const style=document.createElement('style');
  style.textContent=`
    .contact-social{display:inline-flex!important;align-items:center;gap:12px;margin-top:18px;margin-left:4px;padding:0!important;border:0!important;font-family:'Playfair Display',serif!important;font-size:clamp(15px,1.55vw,20px)!important;font-weight:500!important;color:#f3e8dc;text-decoration:none}
    .contact-whatsapp{margin-left:0}
    .rk-footer-signature{display:block!important;width:100%;text-align:center;font-family:'Playfair Display',serif!important;font-size:clamp(12px,1.1vw,16px)!important;font-weight:500!important;font-style:normal!important;letter-spacing:.08em!important;color:#d8c6b7!important;line-height:1.7!important}
    @media(max-width:700px){
      .contact-social{display:flex!important;width:max-content;max-width:100%;margin-left:0}
      .rk-footer-signature{display:block!important;font-size:12px!important;letter-spacing:.05em!important;text-align:center}
    }
  `;
  document.head.appendChild(style);

  const run=()=>{applyPolish();setTimeout(applyPolish,250);setTimeout(applyPolish,750);};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  setTimeout(run,1500);setTimeout(run,3000);
})();
/* Final contact + footer polish — isolated from portfolio content. */
(()=>{
  const instagramUrl='https://www.instagram.com/hernameis_rey/';
  const whatsappUrl='https://wa.me/254706168307';
  const phoneRegex=/\+?254[\s-]?706[\s-]?168[\s-]?307/;
  const contact=document.querySelector('#contact');

  if(contact){
    // Instagram: keep it in Contact with the luxury ↗ treatment.
    const email=contact.querySelector('a[href^="mailto:"]');
    if(email && !contact.querySelector('[data-rk-instagram]')){
      const link=document.createElement('a');
      link.dataset.rkInstagram='true';
      link.href=instagramUrl;
      link.target='_blank';
      link.rel='noreferrer';
      link.className='contact-social';
      link.setAttribute('aria-label','Instagram @hernameis_rey');
      link.innerHTML='<span>Instagram · @hernameis_rey ↗</span>';
      email.insertAdjacentElement('afterend',link);
    }

    // WhatsApp: repair an existing contact link OR wrap the visible number if it is plain text.
    const candidates=[...contact.querySelectorAll('a,span,p,div')];
    const existing=candidates.find(el=>phoneRegex.test(el.textContent||''));
    if(existing){
      const anchor=existing.closest('a')||existing;
      if(anchor.tagName==='A'){
        anchor.href=whatsappUrl;
        anchor.target='_blank';
        anchor.rel='noreferrer';
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

  // WhatsApp must never appear in the footer.
  document.querySelectorAll('footer a[href^="https://wa.me/"],footer [data-rk-social-links]').forEach(el=>el.remove());

  // Replace the footer signature with an explicit space between Kerubo and Built.
  const footer=document.querySelector('footer');
  if(footer){
    const walker=document.createTreeWalker(footer,NodeFilter.SHOW_TEXT);
    const nodes=[];let node;
    while(node=walker.nextNode()) nodes.push(node);
    nodes.forEach(textNode=>{
      if(/©\s*2026\s*Regina\s*Kerubo\s*Built\s*with\s*intention\.?/i.test(textNode.nodeValue||'')){
        const signature=document.createElement('span');
        signature.className='rk-footer-signature';
        signature.innerHTML='© 2026 Regina Kerubo&nbsp;<span>Built with intention.</span>';
        textNode.parentNode.replaceChild(signature,textNode);
      }
    });
  }

  const style=document.createElement('style');
  style.textContent=`
    .contact-social{display:inline-flex!important;align-items:center;gap:12px;margin-top:18px;margin-left:4px;padding:10px 0 9px;border-bottom:1px solid rgba(233,225,213,.34);font:clamp(15px,1.55vw,20px) 'Playfair Display',serif;color:#f3e8dc;text-decoration:none;letter-spacing:.01em;transition:color .3s ease,border-color .3s ease,transform .3s ease}
    .contact-social:hover{color:#c7ded9;border-color:#c7ded9;transform:translateY(-2px)}
    .contact-whatsapp{margin-left:0}
    .rk-footer-signature{display:inline-flex!important;align-items:baseline;gap:10px;font-family:'Playfair Display',serif!important;font-size:clamp(12px,1.1vw,16px)!important;font-weight:500!important;letter-spacing:.08em!important;color:#d8c6b7!important;line-height:1.7!important;text-transform:none!important;opacity:.94}
    .rk-footer-signature span{font-style:italic;letter-spacing:.06em;color:#efe1d4}
    @media(max-width:700px){.contact-social{display:flex!important;width:max-content;max-width:100%;margin-left:0}.rk-footer-signature{display:flex!important;flex-wrap:wrap;gap:5px;font-size:12px!important;letter-spacing:.05em!important}.rk-footer-signature span{letter-spacing:.04em}}
  `;
  document.head.appendChild(style);
})();

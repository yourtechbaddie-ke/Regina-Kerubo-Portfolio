/* Premium contact + footer polish — intentionally isolated from portfolio content. */
(()=>{
  const instagramUrl='https://www.instagram.com/hernameis_rey/';
  const instagramLabel='Instagram · @hernameis_rey ↗';
  const whatsappUrl='https://wa.me/254706168307';
  const whatsappPattern=/\+?254[\s-]?706[\s-]?168[\s-]?307/;

  const contact=document.querySelector('#contact');
  if(contact){
    const email=contact.querySelector('a[href^="mailto:"]');
    if(email && !contact.querySelector('[data-rk-instagram]')){
      const link=document.createElement('a');
      link.dataset.rkInstagram='true';
      link.href=instagramUrl;
      link.target='_blank';
      link.rel='noreferrer';
      link.className='contact-social';
      link.setAttribute('aria-label','Instagram @hernameis_rey');
      link.innerHTML=`<span>${instagramLabel}</span>`;
      email.insertAdjacentElement('afterend',link);
    }

    // Make the existing WhatsApp number directly tappable with the same ↗ treatment.
    if(!contact.querySelector('[data-rk-whatsapp]')){
      const walker=document.createTreeWalker(contact,NodeFilter.SHOW_TEXT);
      const nodes=[]; let node;
      while(node=walker.nextNode()) nodes.push(node);
      for(const textNode of nodes){
        if(textNode.parentElement?.closest('a,[data-rk-whatsapp]')) continue;
        const match=textNode.nodeValue?.match(whatsappPattern);
        if(!match) continue;
        const value=match[0].replace(/\s+/g,' ').trim();
        const link=document.createElement('a');
        link.dataset.rkWhatsapp='true';
        link.href=whatsappUrl;
        link.target='_blank';
        link.rel='noreferrer';
        link.className='contact-social contact-whatsapp';
        link.setAttribute('aria-label','WhatsApp +254 706 168 307');
        link.innerHTML=`<span>${value} ↗</span>`;
        const before=textNode.nodeValue.slice(0,match.index);
        const after=textNode.nodeValue.slice(match.index+match[0].length);
        const fragment=document.createDocumentFragment();
        if(before) fragment.appendChild(document.createTextNode(before));
        fragment.appendChild(link);
        if(after) fragment.appendChild(document.createTextNode(after));
        textNode.parentNode.replaceChild(fragment,textNode);
        break;
      }
    }
  }

  // WhatsApp stays out of the footer; it belongs in Contact only.
  document.querySelectorAll('footer a[href^="https://wa.me/"], footer [data-rk-social-links]').forEach(el=>el.remove());

  // Refined editorial footer signature.
  const footer=document.querySelector('footer');
  if(footer){
    footer.querySelectorAll('*').forEach(el=>{
      if(el.children.length===0 && /©\s*2026\s*Regina\s*Kerubo\s*Built with intention\.?/i.test(el.textContent||'')) el.classList.add('rk-footer-signature');
    });
  }

  const style=document.createElement('style');
  style.textContent=`
    .contact-social{display:inline-flex;align-items:center;gap:12px;margin-top:18px;margin-left:4px;padding:10px 0 9px;border-bottom:1px solid rgba(233,225,213,.34);font:clamp(15px,1.55vw,20px) 'Playfair Display',serif;color:#f3e8dc;letter-spacing:.01em;transition:color .3s ease,border-color .3s ease,transform .3s ease}
    .contact-social:hover{color:#c7ded9;border-color:#c7ded9;transform:translateY(-2px)}
    .contact-whatsapp{margin-left:0}
    .rk-footer-signature{font-family:'Playfair Display',serif!important;font-size:clamp(12px,1.1vw,16px)!important;font-weight:500!important;letter-spacing:.08em!important;color:#d8c6b7!important;text-transform:none!important;opacity:.92}
    @media(max-width:700px){.contact-social{display:flex;width:max-content;max-width:100%;margin-left:0}.rk-footer-signature{letter-spacing:.05em!important}}
  `;
  document.head.appendChild(style);
})();

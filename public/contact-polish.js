/* Final contact + footer polish — isolated from portfolio content. */
(()=>{
  const instagramUrl='https://www.instagram.com/hernameis_rey/';
  const whatsappUrl='https://wa.me/254706168307';
  const phoneRegex=/\+?254[\s-]?706[\s-]?168[\s-]?307/;
  const approvedFooter='© 2026 Regina Kerubo Shiholo • Built to feel alive';

  const fixFooter=()=>{
    const footer=document.querySelector('footer'); if(!footer)return;

    // The footer is intentionally only the approved signature. Never merge legacy copy into it.
    footer.querySelectorAll('a[href^="https://wa.me/"], [data-rk-social-links], .rk-footer-built').forEach(el=>el.remove());
    footer.innerHTML='';
    const signature=document.createElement('span');
    signature.className='rk-footer-signature';
    signature.textContent=approvedFooter;
    footer.appendChild(signature);
  };

  const restoreWhatsApp=contact=>{
    if(!contact)return;
    const existingAnchor=contact.querySelector('a[href^="https://wa.me/"]');
    if(existingAnchor){
      existingAnchor.href=whatsappUrl;
      existingAnchor.target='_blank';
      existingAnchor.rel='noreferrer';
      existingAnchor.classList.add('contact-social','contact-whatsapp');
      existingAnchor.setAttribute('aria-label','WhatsApp +254 706 168 307');
      const label=existingAnchor.textContent.replace(/\s*↗\s*$/,'').trim();
      existingAnchor.innerHTML=`<span>${label||'WhatsApp · +254 706 168 307'} ↗</span>`;
      return;
    }

    const phoneNode=[...contact.querySelectorAll('*')].find(el=>el.children.length===0&&phoneRegex.test(el.textContent||''));
    if(phoneNode){
      const currentText=phoneNode.textContent.trim();
      const anchor=document.createElement('a');
      anchor.href=whatsappUrl;
      anchor.target='_blank';
      anchor.rel='noreferrer';
      anchor.className='contact-social contact-whatsapp';
      anchor.setAttribute('aria-label','WhatsApp +254 706 168 307');
      anchor.innerHTML=`<span>${currentText.replace(/\s*↗\s*$/,'')} ↗</span>`;
      phoneNode.replaceWith(anchor);
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
    .contact-social span{display:inline-block}
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
  new MutationObserver(()=>{restoreWhatsApp(document.querySelector('#contact'));fixFooter()}).observe(document.body,{childList:true,subtree:true,characterData:true});
})();
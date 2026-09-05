
const menuButton=document.querySelector('.menu-button');const nav=document.querySelector('.site-nav');if(menuButton&&nav){menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));}
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;const revealers=document.querySelectorAll('[data-reveal]');if(reduced||!('IntersectionObserver'in window)){revealers.forEach(el=>el.classList.add('revealed'));}else{const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');io.unobserve(entry.target);}}),{threshold:.08,rootMargin:'0px 0px -30px'});revealers.forEach(el=>io.observe(el));}


const contactForm=document.querySelector('[data-contact-form]');
if(contactForm){
  const status=contactForm.querySelector('[data-form-status]');
  const submit=contactForm.querySelector('button[type="submit"]');
  contactForm.addEventListener('submit',async event=>{
    event.preventDefault();
    if(!contactForm.reportValidity()) return;
    const original=submit.textContent;
    submit.disabled=true;
    submit.textContent='Sending…';
    status.textContent='';
    status.className='form-status';
    try{
      const response=await fetch(contactForm.action,{
        method:'POST',
        body:new FormData(contactForm),
        headers:{'Accept':'application/json'}
      });
      if(response.ok){
        contactForm.reset();
        status.textContent='Thanks — your message has been sent. I’ll be in touch soon.';
        status.className='form-status success';
      }else{
        status.textContent='I couldn’t send that message. Please try again or connect with me on LinkedIn.';
        status.className='form-status error';
      }
    }catch(error){
      status.textContent='I couldn’t send that message. Please try again or connect with me on LinkedIn.';
      status.className='form-status error';
    }finally{
      submit.disabled=false;
      submit.textContent=original;
    }
  });
}

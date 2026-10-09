document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.querySelector('.menu-toggle'), nav=document.querySelector('nav');
 if(menu) menu.addEventListener('click',()=>nav.classList.toggle('open'));
 document.querySelectorAll('.filters button').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  document.querySelectorAll('.product-card').forEach(card=>card.style.display=(btn.dataset.filter==='all'||card.dataset.category===btn.dataset.filter)?'block':'none');
 }));
});
function sendMessage(e){e.preventDefault();const n=document.getElementById('name').value;document.getElementById('form-status').textContent=`Thank you, ${n}! Your enquiry has been noted. Please call or message us to confirm your order.`;e.target.reset();}

// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.3 };
const appearOnScroll = new IntersectionObserver((entries, observer)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);
faders.forEach(fader=>appearOnScroll.observe(fader));

// Popup logic
const popup = document.getElementById('popup');
const popupImg = document.getElementById('popup-img');
const closeBtn = document.getElementById('close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let images = [];
let currentIndex = 0;

// Features popup
document.querySelectorAll('.feature').forEach((feature, i)=>{
  feature.dataset.images = `img/feature${i+1}-1.png,img/feature${i+1}-2.png`;
  feature.addEventListener('click', ()=>{
    images = feature.dataset.images.split(',');
    currentIndex = 0;
    popupImg.src = images[currentIndex];
    popup.classList.add('show');
  });
});

// Gallery popup
document.querySelectorAll('.gallery img').forEach(img=>{
  img.addEventListener('click', ()=>{
    images = [img.src];
    currentIndex = 0;
    popupImg.src = images[currentIndex];
    popup.classList.add('show');
  });
});

// Close popup
closeBtn.addEventListener('click', ()=> popup.classList.remove('show'));

// Prev / Next buttons
prevBtn.addEventListener('click', ()=>{
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  popupImg.src = images[currentIndex];
});
nextBtn.addEventListener('click', ()=>{
  currentIndex = (currentIndex + 1) % images.length;
  popupImg.src = images[currentIndex];
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault(); // หยุด default jump
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' }); // scroll แบบ smooth
  });
});

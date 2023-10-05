//Script to preload image header + loading
function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = resolve;
    img.onerror = reject;
  });
}

window.onload = () => {
  let myVar;
  function myFunction() {
    myVar = setTimeout(showPage, 3000);
  }
  function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
  }
  myFunction();
  preloadImage("../image/profil.webp")
    .then(() => {
      console.log("Gambar profil berhasil dimuat pertama");
    })
    .catch((error) => {
      console.error("Gagal memuat gambar profil:", error);
    });
};

//Script To Reveal Content
function reveal() {
  let reveals = document.querySelectorAll(".reveal, .inreveal");

  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let elementTop = reveals[i].getBoundingClientRect().top;
    let elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

//Script For Up To Scroll
// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//script for comments disqus
function loadDisqus() {
  let disqus_config = function () {
    this.page.identifier = "Daffabot";
    this.page.url = "https://www.daffabot.my.id";
    this.page.title = "Portofolio Daffa Ahmad Ibrahim";
    };

  let d = document, s = d.createElement('script');
  s.src = 'https://daffabot-main.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);

  document.getElementById('loadDisqus').classList.add('closeport');
}

// Menambahkan event listener ke tombol
document.getElementById('loadDisqus').addEventListener('click', function() {
  loadDisqus(); // Memanggil fungsi saat tombol diklik
});

let VisitorAPI=function(t,e,a){let s=new XMLHttpRequest;s.onreadystatechange=function(){let t;s.readyState===XMLHttpRequest.DONE&&(200===(t=JSON.parse(s.responseText)).status?e(t.data):a(t.status,t.result))},s.open("GET","https://api.visitorapi.com/api/?pid="+t),s.send(null)};

VisitorAPI(
  "nS9amRNv2qBUhHBqYFQf",
  function(data){
    console.log('Data user:', data);
    const trafficCountElement = document.getElementById('visitor');
    if (trafficCountElement) {
      trafficCountElement.innerHTML = `Browser: ${data.browser} <br>Versi Browser: ${data.browserVersion} <br>Kota: ${data.city} <br>Negara: ${data.countryName} <br>Brand Device Mobile: ${data.deviceBrand} <br>OS: ${data.os} <br>Versi OS: ${data.osVersion}`;
    }
  },
  function(errorCode, errorMessage){
    console.log(errorCode, errorMessage);
  }
);

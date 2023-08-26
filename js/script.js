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
  var myVar;
  function myFunction() {
    myVar = setTimeout(showPage, 3000);
  }
  function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
  }
  myFunction();
  preloadImage("../image/profil.png")
    .then(() => {
      console.log("Gambar profil berhasil dimuat pertama");
    })
    .catch((error) => {
      console.error("Gagal memuat gambar profil:", error);
    });
};

//Script To Reveal Content
function reveal() {
  var reveals = document.querySelectorAll(".reveal, .inreveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

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
disqusLoader(".disqustret", {
  scriptUrl: "//daffabot-main.disqus.com/embed.js",
  disqusConfig: function () {
    this.page.identifier = "Daffabot";
    this.page.url = "https://www.daffabot.my.id";
    this.page.title = "Portofolio Daffa Ahmad Ibrahim";
  },
});

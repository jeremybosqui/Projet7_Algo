'use strict'

const scrollToTopBtn = document.querySelector(".scrollToTopBtn")
const rootElement = document.documentElement

function handleScroll() {
  // donner les indications au bouton en lui disant de remonter en haut de la page et definir une hauteur
  var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight
  if ((rootElement.scrollTop / scrollTotal) > 0.45) {
    // montrer le bouton
    scrollToTopBtn.classList.add("showBtn")
  } else {
    // cacher le bouton grave a la suppression
    scrollToTopBtn.classList.remove("showBtn")
  }
}
function scrollToTop() {
  // scroll en haut de la page avec un comportement doux pour que le scroll ne soit pas violent vers le haut de la page
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}
scrollToTopBtn.addEventListener("click", scrollToTop)
document.addEventListener("scroll", handleScroll)

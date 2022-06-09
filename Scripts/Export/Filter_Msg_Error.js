/* export function errorMsg () {
  //========== ingredients
  const ingredient = document.querySelectorAll('.ingredient-dropdown li:not(.hidden-by-tags):not(.already-selected):not(.hidden-by-keydown)')
  if (ingredient.length === 0){
    document.querySelector('.ingredient-dropdown .error-msg').classList.add('visible')
  } else {
    document.querySelector('.ingredient-dropdown .error-msg').classList.remove('visible')
  }
  //============= appareils
  const appareil = document.querySelectorAll('.appareil-dropdown li:not(.hidden-by-tags):not(.already-selected):not(.hidden-by-keydown)')
  if(appareil.length === 0) {
    document.querySelector('.appareil-dropdown .error-msg').classList.add('visible')
  }else{
    document.querySelector('.appareil-dropdown .error-msg').classList.remove('visible')
  }
  //======= ustensils
  const ustensils = document.querySelectorAll('.ustensile-dropdown li:not(.hidden-by-tags):not(.hidden-by-keydown):not(.already-selected)')
  if(ustensils.length === 0) {
    document.querySelector('.ustensile-dropdown .error-msg').classList.add('visible')
  }else{
    document.querySelector('.ustensile-dropdown .error-msg').classList.remove('visible')
  }

} */
/* const errorMsg = {
  ingredient,
  appareil,
  ustensils
}
export default errorMsg */
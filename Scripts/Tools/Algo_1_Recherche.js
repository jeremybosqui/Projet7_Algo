//========== mise en place des imports

import DropdownFilter from "../Export/Class_Dropdown_Filter.js";
//import elemntsDom from "./Elements_dom.js";
/**
 * @param {*} filtres 
 * @param {*} recettes 
 */
const Algo1recherche = (filtres, recettes) => {
  let MainRecherche 
  
  if(document.getElementById('main-rech__input').value.length >= 3){
    MainRecherche = document.getElementById('main-rech__input').value
  }
  recettes.forEach(recette => {
    let visible = true
    if (filtres !== []){
      let superArray = [recette.appareils]
      superArray = superArray.concat(recette.ingredients.map(ingredients => ingredients.ingredient))
      superArray = superArray.concat(recette.ustensils.map(ustensil => ustensil))
      filtres.forEach(filtre => {
        if(!superArray.includes(filtre.name)){
          visible = false
        }
      })  
    }

    if(MainRecherche !== undefined) {
      let Algo1recherche = MainRecherche
      recette.ingredients.forEach(current => {
        if(!current.ingredient.includes(MainRecherche) && !recette.description.includes(Algo1recherche) && !recette.name.includes(MainRecherche)) {
          visible = false
        }
      })  
    }
    if (recette.element.classList.contains("hidden") === visible) {
      recette.ShowHiddenToggle()
    }
  })
  if(document.querySelectorAll('.container_of_recipes .recipes:not(.hidden)').length === 0) {
    document.querySelector('.container_of_recipes .empty_msg').classList.add('visible')
  }else {
    document.querySelector('.container_of_recipes .empty_msg').classList.remove('visible')
  }
  DropdownFilter.MajDropdown()
}
export default Algo1recherche

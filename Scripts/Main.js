//========= mise en place des imports
import api from "./Export/Class_Api.js"
import DropdownFilter from "./Export/Class_Dropdown_Filter.js"
import Tags from "./Export/Class_Tags.js"
import elemntsDom from "./Tools/Elements_dom.js"
import Recette from "./Export/Class_Recipe.js"

const MainSearch = document.getElementById('main-rech__input')
try {
  await api.requete()
  //========== initier la recuparation des elements tags ingredients / appareils / ustensils via l'appel de l'api
  const getIngredients = api.setIngredients().map(ingredient => {
    return new Tags('ingredient', ingredient)
  })
  //=======
  const getAppareils = api.setAppliances().map(appareil => {
    return new Tags('appareil', appareil)
  })
  //=======
  const getUstensils = api.setUstensils().map(ustensil => {
    return new Tags ('ustensil', ustensil)
  })
  //======= creation de la liste dropdown en assiociation avec les tags
  new DropdownFilter('ingredient', getIngredients)
  new DropdownFilter('appareil', getAppareils)
  new DropdownFilter('ustensil', getUstensils)
  //======== ajoute les listes dropdown dans le dom
  DropdownFilter.instances.forEach(dropdown => {
    elemntsDom.append(dropdown.element, document.getElementById('dropdown_filters'))
  })
  //====== creer les recette qui seront ajouter dans le dom
  api.setEvryRecipes().forEach(recipe => {
    const item = new Recette(recipe)
    elemntsDom.append(item.Recette, document.getElementById('container_of_recipes'))
  })
  // ajouter l'ecouteur d'evenements sur la barre de recherche principal
  MainSearch.addEventListener('input', (e) => {
    //============ 
    if (e.target.value.length >= 3 || e.inputType === "deleteContentBackward"){
      console.log
      //algoRecherche(Tags.active, Recette.instances)
    } 
  })



} catch (error) {
  const showError = document.createElement('h1')
  showError.setAttribute('class', 'showErrorMsg')
  showError.innerText = error
  document.body.appendChild(showError)
}
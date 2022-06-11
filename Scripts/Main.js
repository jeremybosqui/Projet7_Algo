import elemntsDom from "./Tools/Elements_dom.js";
import Api from "./Export/Class_Api.js";
import DropdownFilters from "./Export/Class_Dropdown_Filter.js";
import Tags from "./Export/Class_Tags.js";
import Recette from "./Export/Class_Recipe.js";
import algo1Recherche from "./Tools/Algo_1_Recherche.js";
//=======
const searchPrincipal = document.getElementById('main-rech__input');
//=========
try {
  await Api.init();
  //=========
  const ingredients = Api.getAllIngredients().map(ingredient => {
    return new Tags('ingredient', ingredient);
  });
  const appareil = Api.getAllAppliances().map(appareil => {
    return new Tags('appareil', appareil);
  });
  const ustensils = Api.getAllUstensils().map(ustensil => {
    return new Tags('ustensile', ustensil);
  });
  //=========
  new DropdownFilters('ingredient', ingredients);
  new DropdownFilters('appareil', appareil);
  new DropdownFilters('ustensile', ustensils);
  //==========
  DropdownFilters.instances.forEach(dropdown => {
    elemntsDom.elemntAppend(dropdown.element, document.getElementById('dropdown_filters'));
  });
  //=========
  Api.getAllRecipes().forEach(recipe => {
    const item = new Recette(recipe);
    elemntsDom.elemntAppend(item.displayRecipeCard(), document.getElementById("containerOfrecipes"));
  });
  //============
  searchPrincipal.addEventListener('input', (e) => {
    //======== 
    if (e.target.value.length >= 3 || e.inputType === "deleteContentBackward") {
      algo1Recherche(Tags.active, Recette.instances);
    }
  })
} catch (error) {
  const errorMsg = document.createElement('h1');
  errorMsg.setAttribute('class', 'error-msg');
  errorMsg.innerText = error;
  console.log(error);
  document.body.appendChild(errorMsg);
}

// mise en place des imports 
import DropdownFilters from '../Export/Class_Dropdown_Filter.js';
//=============
const algo1Recherche = (filters, recipes) => {
  let principalSearch;

  if (document.getElementById('main-rech__input').value.length >= 3) {
    principalSearch = document.getElementById('main-rech__input').value
  }

  recipes.forEach(recipe => {
    let visible = true;

    if (filters !== []) {
      let superArray = [recipe.appareils];
      superArray = superArray.concat(recipe.ingredients.map(ingredients => ingredients.ingredient.toLowerCase()));
      superArray = superArray.concat(recipe.ustensils.map(ustensil => ustensil.toLowerCase()));

      filters.forEach(filter => {
        if(!superArray.includes(filter.name.toLowerCase())){
          visible = false;
        }
      })
    }

    if (principalSearch !== undefined) {
      let search = principalSearch;

      recipe.ingredients.forEach(current => {
        if (!current.ingredient.toLowerCase().includes(principalSearch) && !recipe.description.toLowerCase().includes(search) && !recipe.name.toLowerCase().includes(search)) {
          visible = false;
        }
      });
    }

    if (recipe.element.classList.contains("hidden") === visible) {
      recipe.ShowOrHideToggle();
    }
  });

  if (document.querySelectorAll('.containerOfrecipes .recipes:not(.hidden)').length === 0) {
    document.querySelector('.containerOfrecipes .empty_msg').classList.add('visible');
  }else{
    document.querySelector('.containerOfrecipes .empty_msg').classList.remove('visible');
  }

  DropdownFilters.dropdownMajFilters();
}
export default algo1Recherche;

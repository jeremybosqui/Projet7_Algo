// mise en place des imports 
import DropdownFilters from '../Export/Class_Dropdown_Filter.js';
//=============
const algoRecherche = (filters, recipes) => {
  const searchBar = document.getElementById('main-rech__input');
  const algoRecherche = (searchBar.value.length >= 3) ? searchBar.value : null;
  //============= boucle sur chaque recette et test s'il y a une correspondance avec les filtres ou la recherche de l'utilisateur
  recipes.forEach(recipe => {
    let visible = true;
    if (filters.length > 0) {
      const appareils = [recipe.appareils.toLowerCase()];
      const ingrédients = recipe.ingredients.map(ingredients => ingredients.ingredient.toLowerCase());
      const ustensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
      const allFilters = [...appareils, ...ingrédients, ...ustensils];
      filters.forEach(filter => {
        if(!allFilters.includes(filter.name.toLowerCase())){
          visible = false;
        }
      })
    }
    if (algoRecherche) {
      recipe.ingredients.forEach(current => {
        if (!current.ingredient.toLowerCase().includes(algoRecherche) && !recipe.description.toLowerCase().includes(algoRecherche) && !recipe.name.toLowerCase().includes(algoRecherche)) {
          visible = false;
        }
      });
    }
    if (recipe.element.classList.contains("hidden") === visible) {
      recipe.ShowOrHideToggle();
    }
  });
  DropdownFilters.dropdownMajFilters(); //=========== met à jour les filtres disponibles
  // si aucune recette ne correspond, affiche un message à l'utilisateur qu'aucune recette ne correspond à sa recherche
  if (document.querySelectorAll('.containerOfrecipes .recipes:not(.hidden)').length === 0) {
    document.querySelector('.containerOfrecipes .empty_msg').classList.add('visible');
  }else{
    document.querySelector('.containerOfrecipes .empty_msg').classList.remove('visible');
  }
}
export default algoRecherche;
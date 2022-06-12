// mise en place des imports 
import DropdownFilters from '../Export/Class_Dropdown_Filter.js';
//=============
/**
 * @param {*} filters 
 * @param {*} recipes 
 */
const algo2Recherche = (filters, recipes) => {
  const searchBar = document.getElementById('main-rech__input');

  const search = searchBar.value.length >= 3 ? searchBar.value : null;
  // creation d'une boucle for qui boucle sur chaque recette et test s'il y a une correspondances avec les filtres ou avec la recherche de l'utilisateur effectuer dans la barre de recherche principale
  for (let i = 0; i < recipes.length; i++) {
    let recipe = recipes[i];
    let visible = true;

    if (filters.length > 0) {
      let appareil = recipe.appareils.toLowerCase();
      let ingredients = recipe.ingredients;
      let ustensils = recipe.ustensils;
      let allFilters = [appareil];
      //======= boucle sur les ingredients
      for (let i = 0; i < ingredients.length; i++) {
        const current = ingredients[i].ingredient.toLowerCase();
                
        allFilters = [...allFilters, current];
      }
      //========= boucle sur les ustensils
      for (let i = 0; i < ustensils.length; i++) {
        const current = ustensils[i].toLowerCase();
                
        allFilters = [...allFilters, current];
      }
      //===== boucle sur les filtres
      for (let i = 0; i < filters.length; i++) {
        let filter = filters[i];

        if(!allFilters.includes(filter.name.toLowerCase())){
          visible = false;
        }
      }
    }
    //=======
    if (search !== null) {
      for (let i = 0; i < recipe.ingredients.length; i++) {
        const current = recipe.ingredients[i];
        if(!current.ingredient.toLowerCase().includes(search) && !recipe.description.toLowerCase().includes(search) && !recipe.name.toLowerCase().includes(search)){
          visible = false;
        }
      }
    }
    if(recipe.element.classList.contains("hidden") === visible) {
      recipe.ShowOrHideToggle();
    }
  }
  //======= met à jour les filtres disponibles
  DropdownFilters.dropdownMajFilters(); 
  //======== si il n'y a aucun match au niveau de la recherche utilisateur , lui afficher le message qu'aucune de ses recherches ne correspond aux recettes présentent
  if (document.querySelectorAll('.containerOfrecipes .recipes:not(.hidden)').length === 0) {
    document.querySelector('.containerOfrecipes .empty_msg').classList.add('visible');
  }else{
    document.querySelector('.containerOfrecipes .empty_msg').classList.remove('visible');
  }
}
export default algo2Recherche;
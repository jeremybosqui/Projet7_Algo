import FilterDropdown from '../class/FilterDropdown.js';

const search = (filters, recipes) => {

  let principalSearch;

  if (document.getElementById('search-principal__input').value.length >= 3) {
    principalSearch = document.getElementById('search-principal__input').value
  }

  recipes.forEach(recipe => {
    let visible = true;

    if (filters !== []) {
      let superArray = [recipe.appareils.toLowerCase()];
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
      recipe.toggleVisibility();
    }
  });

  if (document.querySelectorAll('.recipes-container .recipes:not(.hidden)').length === 0) {
    document.querySelector('.recipes-container .empty-msg').classList.add('visible');
  }else{
    document.querySelector('.recipes-container .empty-msg').classList.remove('visible');
  }

  FilterDropdown.updateDropDowns();
}

export default search;
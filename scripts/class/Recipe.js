import utils from "../modules/utils"

export default class Recipe {

    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.description = data.description
        this.appareils = data.appliance.toLowerCase()
        this.ingredients = data.ingredients
        this.servings = data.servings
        this.time = data.time
        this.visible = true

        Recipe.instances = [...Recipe.instances, this]
    }

    static instances = []

    /**
     * creation de la vue d'une recette type
     * @returns {HTMLElement}
     */
    view = () => {
        const container = document.createElement('article')
        container.setAttribute('class', 'recipes')

        const image = document.createElement('img')
        image.setAttribute('class','recipes__img')
        image.setAttribute('src', 'http://via.placeholder.com/380x300')

        const description = document.createElement('div')
        description.setAttribute('class', 'recipes__description')

        const descTop = document.createElement('div')
        descTop.setAttribute('class', 'recipes__description__top')
        descTop.innerHTML = `
        <h2 class="name>${this.name}</h2>
        <span class="duration><i class="far fa-clock"></i>${this.time} min</span>`

        const ingredients = document.createElement('ul')
        ingredients.setAttribute('class','ingredients-list')
        
        this.ingredients.forEach(ingredient => {
            ingredients.innerHTML += `<li class="ingredients-list__item"><span>${ingredient.ingredient}: </span>${ingredient.quantity} ${ingredient.unit || ''}</li>`
        })

        const process = document.createElement('p')
        process.setAttribute('class', 'process')

        if (this.description.length >= 200) {
            process.innerText = utils.truncateStringEllipsis(this.description, 200)
        } else {
            process.innerHTML = this.description
        }

        const descBottom = document.createElement('div')
        descBottom.setAttribute('class', 'recipes__description__bottom')

        descBottom.appendChild(ingredients)
        descBottom.appendChild(process)

        description.appendChild(descTop)
        description.appendChild(descBottom)

        container.appendChild(image)
        container.appendChild(description)

        this.element = container

        return container

    }

    // basculer la visibilite entre visible et non visible
    toggleVisibility = () => {
        this.element.classList.toggle('hidden')
        this.visible = !this.visible
    }
}
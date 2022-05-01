import utils from "../modules/utils.js";
import Recipe from "./Recipe.js";

export default class FilterDropdown {
    constructor (type, items) {
        this.type = type
        this.items = items
        this.label = (type === "ingredient") ? "ingredient" : type
        this.tagList = []
        this.create()

        FilterDropdown.instances = [...FilterDropdown.instances, this]
    }

    static instances = []

    // creation du visuel du filtre Dropdown
    create = () => {
        // creation du contenant
        const container = document.createElement('div')
        container.setAttribute('class', `dropdown-item dd-${this.type}`)
        container.setAttribute('data-state', 'close')

        // creation du champ de recherche
        const input = document.createElement('input')
        input.setAttribute('type', 'text')
        input.setAttribute('class', 'dropdown-item__input')
        input.setAttribute('id', `${this.type}-input`)
        input.setAttribute('name', `${this.type}-input`)
        input.setAttribute('placeholder', `Rechercher un${this.label}`)

        // ajout de mon eventlistener sur le champ de saisie de ma barre de recherche
        input.addEventListener('input', this.search)

        // creation du label
        const label = document.createElement('p')
        label.setAttribute('class', 'dropdown-item__label')
        label.innerText = `${this.label}s`

        //creation de l'icon chevron-down
        const icon = document.createElement('i')
        icon.setAttribute('class', 'fas fa-chevron-down dropdown-item__icon')
        this.closeIcon = icon

        //creation de la liste d'element
        const list = document.createElement('ul')
        list.setAttribute('class', `dropdown-item__list ${this.type}-dropdown`)

        // remplissage de la list
        this.items.forEach(item => {
            list.appendChild(item.listElement())
            this.tagList = [...this.tagList, item]
        })

        // ajout des elements creer dans le contenant
        container.appendChild(input)
        container.appendChild(label)
        container.appendChild(icon)
        container.appendChild(list)

        //ajout de l'ecouteur de clique pour l'ouverture
        container.addEventListener('click', this.open)

        this.element = container

    }

    /**
     * rechercher dans la liste contenant les tags une coresspondance avec ceux-ci lors de la saisie par l'utilisateur
     * @param {InputEvent} e
     */
    search = (e) => {
        const content = e.target.value.toLowerCase()
        if (content.length >= 3 || (e.inputType === 'deleteContentBackward' && content.length >=3)) {
            this.tagList.forEach(tag => {
                if (str.includes(content)) {
                    tag.listElementRes.classList.remove('hidden-by-keydown')
                } else {
                    tag.listElementRes.classList.add('hidden-by-keydown')
                }
            })
        } else {
            this.tagList.forEach(tag => {
                tag.listElementRes.classList.remove('hidden-by-keydown')
            })
        }
    }

    /**
     * ouverture du dropdown lors du clique de l'utilisateur
     * @param {PointerEvent} e
     */
    open = (e) => {
        e.stopPropagation()

        FilterDropdown.instances.forEach(dropdown => {
            if (dropdown.element.getAttribute('data-state') === 'open' && dropdown.element !==this.element) {
                dropdown.element.setAttribute('data-state', 'close')
                document.removeEventListener('click', dropdown.close)
                dropdown.element.addEventListener('click', dropdown.open)
            }
        })

        if (this.element.getAttribute('data-state') === 'close') {
            this.element.setAttribute('data-state', 'open')
            
            this.element.removeEventListener('click', this.open)
            document.addEventListener('click', this.close)
        }

    }

    /**
     * ferme le dropdown si l'utilisateur clique sur l'icon ou s'il clique en dehors de celle-ci
     * @param {PointerEvent} e
     */
    close = (e) => {
        
        if (utils.clickOut(e.target, this.element) || e.target === this.closeIcon) {
            this.element.setAttribute('data-state', 'close')

            document.removeEventListener('click', this.close)
            this.element.addEventListener('click', this.open)
        }
    }

    static updateDropdowns = () => {
        const lis = document.querySelectorAll('.dropdown-item__list li')
        lis.forEach(li => li.classList.add('hidden-by-tags'))

        const recipes = Recipe.instances.filter(recipe => recipe.visible)

        recipes.forEach(recipe => {
            const appareils = document.querySelectorAll(`.appareil-dropdown [data-value="${recipe.appareils}"]`)
            appareils.forEach(appareil => appareil.classList.remove('hidden-by-tags'))


            const ingredients = recipe.ingredients
            ingredients.forEach(current => {
                const ingredientElement = document.querySelector(`.ingredient-dropdown [data-value="${current.ingredient.toLowerCase()}"]`)
                ingredientElement.classList.remove('hidden-by-tags')
            })

            const ustensils = recipe.ustensils
            ustensils.forEach(current => {
                const ustensilElement = document.querySelector(`.ustensile-dropdown [data-value="${current.toLowerCase()}"]`)
                ustensilElement.classList.remove('hidden-by-tags')
            })
        })
    }

}
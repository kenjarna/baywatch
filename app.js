const app = {
    init: function(selectors) {
        this.max = 0
        this.flick_array = []
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.handlesubmit.bind(this))

    },

    removeFlick(flick, ev) {
        //remove from the DOM
        const listitem = ev.target.closest('.flick')
        listitem.remove()

        //remove from the array
        const index = this.flick_array.indexOf(flick)
        this.flick_array.splice(index, 1)
    },

    favFlick(flick, ev) {
        const listItem = ev.target.closest('.flick')
        flick.fav = listItem.classList.toggle('fav')


    },

    UVFlick(flick, ev) {
        const listItem = ev.target.closest('.flick')
        console.log(listItem)
        const index = this.flick_array.indexOf(flick)

        if (index > 0) {
            //reorder the array
            const t = this.flick_array[index]
            this.flick_array[index] = this.flick_array[index - 1]
            this.flick_array[index - 1] = t


            //reorder the DOM
            this.list.insertBefore(listItem, listItem.previousElementSibling)

        }
    },

    DVFlick(flick, ev) {
        const listItem = ev.target.closest('.flick')

        const index = this.flick_array.indexOf(flick)

        if (index < this.flick_array.length - 1) {
            this.list.insertBefore(listItem.nextElementSibling, listItem)

            const nextFlick = this.flick_array[index + 1]
            this.flick_array[index + 1] = flick
            this.flick_array[index] = nextFlick

        }
    },

    renderListItem(flick) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id

        item
            .querySelector('.flick-name')
            .textContent = flick.name

        item
            .querySelector('button.remove')
            .addEventListener(
                'click',
                this.removeFlick.bind(this, flick)
            )

        item
            .querySelector('button.fav')
            .addEventListener(
                'click',
                this.favFlick.bind(this, flick)
            )

        item
            .querySelector('button.upvote')
            .addEventListener(
                'click',
                this.UVFlick.bind(this, flick)
            )

        item
            .querySelector('button.downvote')
            .addEventListener(
                'click',
                this.DVFlick.bind(this, flick)
            )

        return item
    },




    renderUpButton() {

        //use previousSibling and insertBefore functions!!
        const button = document.createElement("button")
        button.className += "primary button"
        button.innerHTML = "Up Vote"

        button.addEventListener('click', function(ev) {
            const listelement = ev.target.parentElement
            const flickname = listelement.dataset.flickname

            if (index === 0) { button.disabled } else {
                const t = this.flick_array[index]
                const x = this.flick_array[index - 1]
                this.flick_array[index] = x
                this.flick_array[index - 1] = t
            }
        }.bind(this))

        return button
    },

    renderDownButton() {
        const button = document.createElement("button")
        button.className += "secondary button"
        button.innerHTML = "Down Vote"

        return button
    },

    handlesubmit(ev) {
        ev.preventDefault()
        const f = ev.target
        const flick = {
            id: this.max + 1,
            name: f.flickName.value,
            fav: 'false'
        }

        const listItem = this.renderListItem(flick)
        this.flick_array.unshift(flick)
        this.list.insertBefore(listItem, this.list.firstElementChild)
        this.max++
            f.reset()

    },
}

app.init({
    formSelector: 'form#flick-form',
    listSelector: '#flick-list',
    templateSelector: '.flick.template',
})
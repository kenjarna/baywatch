const app = {
    init: function(selectors) {
        this.max = 0
        this.flick_array = []
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.handleFormSubmit.bind(this))

        this.load()
    },

    removeFlick(flick, ev) {
        //remove from the DOM
        const listitem = ev.target.closest('.flick')
        listitem.remove()

        //remove from the array
        const index = this.flick_array.indexOf(flick)
        this.flick_array.splice(index, 1)

        this.save()
    },

    favFlick(flick, ev) {
        const listItem = ev.target.closest('.flick')
        flick.fav = listItem.classList.toggle('fav')
        this.save()
    },

    upvoteFlick(flick, ev) {
        const listItem = ev.target.closest('.flick')
        const index = this.flick_array.indexOf(flick)

        if (index > 0) {
            //reorder the array
            const t = this.flick_array[index]
            this.flick_array[index] = this.flick_array[index - 1]
            this.flick_array[index - 1] = t

            //reorder the DOM
            this.list.insertBefore(listItem, listItem.previousElementSibling)
            this.save()
        }
    },

    downvoteFlick(flick, ev) {
        const listItem = ev.target.closest('.flick')

        const index = this.flick_array.indexOf(flick)

        if (index < this.flick_array.length - 1) {
            this.list.insertBefore(listItem.nextElementSibling, listItem)

            const nextFlick = this.flick_array[index + 1]
            this.flick_array[index + 1] = flick
            this.flick_array[index] = nextFlick
            this.save()
        }

    },

    editFlick(flick, ev) {
        const listItem = ev.target.closest('.flick')
        const spanItem = listItem.querySelector('span#flick-name')
        const editable = spanItem.getAttribute('contenteditable')

        if (editable === 'false') {
            spanItem.setAttribute('contenteditable', 'true')
            spanItem.focus()
        } else {
            spanItem.setAttribute('contenteditable', 'false')
        }

        //Handle an empty item
        if (spanItem.textContent === '') {
            listItem.remove()

            //remove from the array
            const index = this.flick_array.indexOf(flick)
            this.flick_array.splice(index, 1)
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
                this.upvoteFlick.bind(this, flick)
            )

        item
            .querySelector('button.downvote')
            .addEventListener(
                'click',
                this.downvoteFlick.bind(this, flick)
            )

        item
            .querySelector('button.edit')
            .addEventListener(
                'click',
                this.editFlick.bind(this, flick)
            )

        return item
    },

    save() {
        localStorage.setItem('flick_array', JSON.stringify(this.flick_array))
    },

    load() {
        //load JSON from local storage
        const flickJSON = localStorage.getItem('flick_array')
        console.log(flickJSON)

        const flickArray = JSON.parse(flickJSON)
        console.log(flickArray)

        // set flick_array with JSON flicks
        flickArray
            .reverse()
            .map(this.handlesubmit.bind(this))
    },

    handlesubmit(flick) {

        const listItem = this.renderListItem(flick)
        this.list.insertBefore(listItem, this.list.firstElementChild)

        this.flick_array.unshift(flick)
        this.save()
        this.max++

    },

    handleFormSubmit(ev) {
        ev.preventDefault()

        const flick = {
            id: this.max + 1,
            name: ev.target.flickName.value,
            fav: 'false',
        }

        this.handlesubmit(flick)

        ev.target.reset()
    },
}

app.init({
    formSelector: 'form#flick-form',
    listSelector: '#flick-list',
    templateSelector: '.flick.template',
})
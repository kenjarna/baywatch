const app = {
    init: function(selectors) {
        this.max = 0
        this.flick_array = []
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)
        this.flick_name = document.querySelector(selectors.flick_nameSelector)
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

    upvoteFlick(flick, ev) {
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

    downvoteFlick(flick, ev) {
        const listItem = ev.target.closest('.flick')

        const index = this.flick_array.indexOf(flick)

        if (index < this.flick_array.length - 1) {
            this.list.insertBefore(listItem.nextElementSibling, listItem)

            const nextFlick = this.flick_array[index + 1]
            this.flick_array[index + 1] = flick
            this.flick_array[index] = nextFlick
        }
    },

    editFlick(flick, ev) {
        const listItem = ev.target.closest('.flick')
        const spanItem = listItem.querySelector('span#flick-name')
        const editable = spanItem.getAttribute('contenteditable')

        if (editable === 'false') {
            spanItem.setAttribute('contenteditable', 'true')

        } else {
            spanItem.setAttribute('contenteditable', 'false')

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

    handlesubmit(ev) {
        ev.preventDefault()
        const f = ev.target
        const flick = {
            id: this.max + 1,
            name: f.flickName.value,
            fav: 'false',
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
    flick_nameSelector: 'span#flick-name'
})
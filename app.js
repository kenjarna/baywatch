const app = {
    init: function(selectors) {
        this.max = 0
        this.flick_array = []
        this.list = document.querySelector(selectors.listSelector)
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.handlesubmit.bind(this))

    },

    renderListItem(flick) {
        const item = document.createElement('li')
        item.textContent = flick.name
        item.dataset.flickname = flick.name

        const likebutton = this.renderLikeButton()
        const removebutton = this.renderRemoveButton()
        const upbutton = this.renderUpButton()
        const downbutton = this.renderDownButton()

        item.appendChild(likebutton)
        item.appendChild(upbutton)
        item.appendChild(downbutton)
        item.appendChild(removebutton)
        console.log(this.flick_array)
        return item
    },

    renderLikeButton() {
        const button = document.createElement("button")

        button.className += "warning button"
        button.innerHTML = "Like"
        button.addEventListener('click', function() {
            if (this.parentElement.style.backgroundColor === 'rgb(255, 174, 0)') {
                this.parentElement.style.backgroundColor = ''
            } else {
                this.parentElement.style.backgroundColor = '#ffae00'
            }
        })
        return button
    },

    renderRemoveButton() {
        const button = document.createElement("button")
        button.className += "alert button"
        button.innerHTML = "DELETE"

        button.addEventListener('click', function(ev) {
            const listelement = ev.target.parentElement
            const flickname = listelement.dataset.flickname
            const index = this.flick_array.findIndex(function(flick) {
                return flickname === flick.name
            })
            this.flick_array.splice(index, 1)
            listelement.parentElement.removeChild(ev.target.parentElement)
        }.bind(this))
        return button
    },

    renderUpButton() {

        const button = document.createElement("button")
        button.className += "primary button"
        button.innerHTML = "Up Vote"

        button.addEventListener('click', function(ev) {
            const listelement = ev.target.parentElement
            const flickname = listelement.dataset.flickname
            const index = this.flick_array.findIndex(function(flick) {
                return flickname === flick.name
            })
            if (index === 0) { button.disabled } else {
                const t = this.flick_array[index]
                const x = this.flick_array[index - 1]
                this.flick_array[index] = x
                this.flick_array[index - 1] = t
                console.log(this.flick_array)
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
        }

        const listItem = this.renderListItem(flick)
        this.flick_array.push(flick)
        this.list.appendChild(listItem)
        this.max++
            f.reset()
    },
}

app.init({
    formSelector: 'form#flick-form',
    listSelector: '#flick-list',
})
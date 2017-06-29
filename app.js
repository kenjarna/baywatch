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
        item.appendChild(likebutton)
        item.appendChild(removebutton)
        return item
    },

    renderLikeButton() {
        const button = document.createElement("button")
        button.setAttribute("class", "warning button")
        button.innerHTML = "Like"
        button.addEventListener('click', function() {
            this.parentElement.style.backgroundColor = '#ffae00'
        })
        return button
    },

    renderRemoveButton() {
        const button = document.createElement("button")
        button.setAttribute("class", "alert button")
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


    handlesubmit(ev) {
        ev.preventDefault()
        const f = ev.target
        const flick = {
            id: this.max + 1,
            name: f.flickName.value,
        }

        const listItem = this.renderListItem(flick)
        console.log(this.flick_array)
        this.flick_array.push(flick)
        this.list.appendChild(listItem)
        this.max++
    },
}

app.init({
    formSelector: 'form#flick-form',
    listSelector: '#flick-list',
})
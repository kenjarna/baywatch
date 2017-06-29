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
        const button = this.renderLikeButton()
        item.appendChild(button)
        item.setAttribute("onclick", "this.style.backgroundColor = '#ffae00'")
        return item
    },

    renderLikeButton() {
        const button = document.createElement("button")
        button.setAttribute("class", "warning button")
        button.innerHTML = "Like"
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
    },
}

app.init({
    formSelector: 'form#flick-form',
    listSelector: '#flick-list',
})
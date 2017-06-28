const app = {
    init: function(formSelector) {
        document
            .querySelector(formSelector)
            .addEventListener('submit', this.handlesubmit)
    },

    handlesubmit: function(ev) {
        ev.preventDefault()
        const f = ev.target
        console.log(f.flickname.value)
    },
}

app.init('form#flick-form')
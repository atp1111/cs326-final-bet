const userTemplate = document.querySelector("[listings-template]")
const listingsContainer = document.querySelector("[data-listings-container]")
const searchInput = document.querySelector("[listing-search]")

let listings = []

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    listings.forEach(listing => {
        const isVisible = listing.name.toLowerCase().includes(value) || listing.email.toLowerCase().includes(value)
        listing.element.classList.toggle("hide", !isVisible)
    })
})

fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()).then(data => {
    listings = data.map(listing => {
        const card = userTemplate.content.cloneNode(true).children[0]
        const header = card.querySelector("[data-header]")
        const body = card.querySelector("[data-body]")
        header.textContent = listing.name
        body.textContent = listing.email
        listingsContainer.append(card)
        return {name: listing.name, email: listing.email, element: card}
    });
})

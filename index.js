let readingList = []
let rlcount = 0
let counter = document.querySelectorAll(".rl-counter")
let sortElem = document.getElementById("sorting")
let catElem = document.getElementById("categories")
let categories = []
let rlSwitchEl = document.getElementById("rl-switch")
let mainSwitch = document.getElementById("main-switch")

rlSwitchEl.addEventListener("click", () => {
    document.querySelector(".main-screen").classList.add("hidden")
    document.querySelector(".reading-screen").classList.remove("hidden")
})
mainSwitch.addEventListener("click", () => {
    document.querySelector(".reading-screen").classList.add("hidden")
    document.querySelector(".main-screen").classList.remove("hidden")

})

sortElem.addEventListener("click", function (e) {
    if (sortElem.innerText === "Ascending") {
        sortElem.innerText = "Descending"
    } else {
        sortElem.innerText = "Ascending"
    }
    renderBooks(sortBooks(filterBooks(books)))
})

catElem.addEventListener("change", function (e) {
    renderBooks(sortBooks(filterBooks(books)))
})



function filterBooks(books) {
    if (catElem.value === "") {
        return books
    } else {
        return books.filter(function (book) {
            return book.categories === catElem.value
        })
    }
}

function sortBooks(books) {
    if (sortElem.innerText === "Ascending") {
        return books.sort(function (a, b) {
            return a.title.localeCompare(b.title)
        })
    }
    return books.sort(function (a, b) {
        return b.title.localeCompare(a.title)
    })
}

function generateCategories() {
    for (let book of books) {
        if (!categories.includes(book.categories)) {
            categories.push(book.categories)
        }
    }
}

function renderCategories() {
    let select = document.getElementById("categories")

    for (let category of categories) {
        let option = document.createElement("option")
        option.innerText = category

        select.appendChild(option)
    }
}

function increaseCount(readingList) {
    rlcount += 1
    counter.forEach(function (el) {
        el.innerText = rlcount
    })
    renderRLBooks(readingList)
}
function decreaseCount(readingList) {
    rlcount -= 1
    counter.forEach(function (el) {
        if (rlcount < 1) {
            el.innerText = ""
        } else {
            el.innerText = rlcount
        }
    })
    renderRLBooks(readingList)
}

function addBook(id) {
    let index = readingList.findIndex(function (book) {
        return book.id === id
    })
    if (index === -1) {
        readingList = [...readingList, books.find(function (book) {
            return book.id === id
        })]
        increaseCount(readingList)

    } else {
        document.getElementById("rl-error").classList.add("visible")
        document.body.style.overflow = 'hidden'
    }
}
function removeBook(id) {
    let index = readingList.findIndex(function (book) {
        return book.id === id
    })
    if (index !== -1) {
        readingList = readingList.filter(function (book) {
            return book.id !== id
        })
        decreaseCount(readingList)
    }
}

function hideErrorOnClick() {
    let errElem = document.getElementById("rl-error")
    errElem.addEventListener("click", () => {
        document.getElementById("rl-error").classList.remove("visible")
        document.body.style.overflow = 'scroll'
    })
}

function renderRLBooks(readingList) {
    let booksCont = document.getElementById("rlbooks-list")
    booksCont.textContent = '';
    console.log(readingList)
    for (let book of readingList) {
        let cont = document.createElement("div")
        cont.classList.add("book")

        let cover = document.createElement("div")
        cover.classList.add("cover")

        let coverimg = document.createElement("img")
        coverimg.src = book.cover
        // coverimg.alt = "book-cover"
        coverimg.width = 200
        coverimg.height = 320
        cover.append(coverimg)

        let header = document.createElement("div")
        header.classList.add("description")

        let title = document.createElement("h3")
        title.innerText = book.title

        let id = document.createElement("span")
        id.innerText = "ID: " + book.id

        let year = document.createElement("span")
        year.innerText = "Year: " + book.year

        let pages = document.createElement("span")
        pages.innerText = "Pages: " + book.pages

        header.appendChild(title)
        header.append(id)
        header.appendChild(year)
        header.appendChild(pages)

        let removeButton = document.createElement("button")
        removeButton.classList.add("add-reading-list")
        removeButton.innerText = "Remove from Reading List"

        removeButton.onclick = function () {
            removeBook(book.id)
        }


        cont.appendChild(cover)
        cont.appendChild(header)
        cont.appendChild(removeButton)

        booksCont.appendChild(cont)
    }
}

function renderBooks(books) {
    let booksCont = document.getElementById("books-list")
    booksCont.textContent = '';

    for (let book of books) {
        let cont = document.createElement("div")
        cont.classList.add("book")

        let cover = document.createElement("div")
        cover.classList.add("cover")

        let coverimg = document.createElement("img")
        coverimg.src = book.cover
        // coverimg.alt = "book-cover"
        coverimg.width = 200
        coverimg.height = 320
        cover.append(coverimg)

        let header = document.createElement("div")
        header.classList.add("description")

        let title = document.createElement("h3")
        title.innerText = book.title

        let id = document.createElement("span")
        id.innerText = "ID: " + book.id

        let year = document.createElement("span")
        year.innerText = "Year: " + book.year

        let pages = document.createElement("span")
        pages.innerText = "Pages: " + book.pages

        header.appendChild(title)
        header.append(id)
        header.appendChild(year)
        header.appendChild(pages)

        let addButton = document.createElement("button")
        addButton.classList.add("add-reading-list")
        addButton.innerText = "Add to Reading List"

        addButton.onclick = function () {
            addBook(book.id)
        }

        let hidden = document.createElement("div")
        hidden.classList.add("to-hide")
        let details = document.createElement("ul")
        details.classList.add("details")

        let detailData = [['By:', book.author], ['Edition:', book.edition], ['Language:', book.language]]

        for (let detail of detailData) {
            let li = document.createElement("li")
            li.appendChild(document.createTextNode(detail[0]))
            let p = document.createElement("p")
            p.innerText = detail[1]
            li.appendChild(p)
            details.append(li)
        }


        hidden.appendChild(details)

        cont.appendChild(cover)
        cont.appendChild(header)
        cont.appendChild(hidden)
        cont.appendChild(addButton)

        booksCont.appendChild(cont)

        cover.addEventListener("click", () => {
            console.log("OPENING")
            cont.classList.toggle("open")
        })
    }
}


window.addEventListener("load", function () {
    generateCategories()
    renderCategories()
    renderBooks(sortBooks(books))
    hideErrorOnClick()
})


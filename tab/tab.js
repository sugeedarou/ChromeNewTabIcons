chrome.storage.local.get('bookmarks', (result) => {
    if (typeof result.bookmarks != 'undefined') {
        createList(result.bookmarks)
    }
})

function createList(bookmarks) {
    const bbar = document.createElement('div')
    const div = document.createElement('div')
    bbar.className = 'blist'
    for (let bm of bookmarks) {
        const a = document.createElement('a')
        const img = document.createElement('img')
        img.src = 'chrome://favicon/size/32@1x/' + bm.url
        a.href = bm.url
        a.appendChild(img)
        div.appendChild(a)
        bbar.appendChild(div)
    }

    document.body.appendChild(bbar)
}
chrome.storage.local.get('bookmarks', (result) => {
    if (typeof result.bookmarks != 'undefined') {
        loadBackgroundImage()
        createList(result.bookmarks)
    }
})

function createList(bookmarks) {
    const bbar = document.getElementById('blist')
    const div = document.createElement('div')
    const blurDiv = document.createElement('div')
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

let backgrounds = []
let maxPreloadedImagesCount = 5;

function loadBackgroundImage() {
    chrome.storage.local.get('backgrounds', async (result) => {
        if (typeof result.backgrounds == 'undefined') {
            await preloadImage(0);
            addImageToPage(backgrounds[0])
            preloadImages()
        } else {
            backgrounds = result.backgrounds
            bgImg = backgrounds[0]
            addImageToPage(bgImg)
            preloadImages()
        }
    })

}

async function preloadImages() {
    for (let i = backgrounds.length; i < maxPreloadedImagesCount + 1; i++) {
        await preloadImage(i)
    }
    chrome.storage.local.set({ backgrounds })
}

async function preloadImage(i) {
    let data = await fetch(`https://source.unsplash.com/random/2560x1600/?sig=${i}`)
    let img = new Image()
    img.src = data.url
    if (i < maxPreloadedImagesCount) {
        backgrounds.push(img.src)
    } else {
        backgrounds.shift()
        backgrounds.push(img.src)
    }
}

function addImageToPage(src) {
    const bg = document.getElementById('background')
    const img = document.createElement('img')
    img.src = src
    img.addEventListener('load', () => {
        bg.style.backgroundImage = `url(${img.src})`
        bg.classList.add('loaded')
    })
}
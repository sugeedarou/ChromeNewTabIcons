chrome.storage.local.get('bookmarks', (result) => {
	if (typeof result.bookmarks != 'undefined') {
		createSidebar(result.bookmarks)
		listenToMouseEvents()
	}
})

let bbar = null

function createSidebar(bookmarks) {
	bbar = document.createElement('div')
	const div = document.createElement('div')
	bbar.className = 'bbar'
	for (let bm of bookmarks) {
		const a = document.createElement('a')
		const img = document.createElement('img')
		img.src = bm.iconSrc
		a.href = bm.url
		a.appendChild(img)
		div.appendChild(a)
		bbar.appendChild(div)
	}

	document.body.appendChild(bbar)
}

function listenToMouseEvents() {
	window.addEventListener('mousemove', (e) => {
		if (e.path.includes(bbar)) {
			bbar.classList.add('visible')
		} else {
			bbar.classList.remove('visible')
		}
	})
}
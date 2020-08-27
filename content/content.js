chrome.storage.local.get('bookmarks', (result) => {
	if (typeof result.bookmarks != 'undefined') {
		createSidebar(result.bookmarks)
		listenToEvents()
	}
})

let bbar = null

function createSidebar(bookmarks) {
	bbar = document.createElement('div')
	bbar.className = 'bbar hiddenBBB'
	for (let bm of bookmarks) {
		const a = document.createElement('a')
		const img = document.createElement('img')
		img.src = bm.iconSrc
		a.href = bm.url
		a.appendChild(img)
		bbar.appendChild(a)
	}

	document.documentElement.insertAdjacentElement('afterbegin', bbar)
}

function listenToEvents() {
	window.addEventListener('mousemove', (e) => {
		if (e.path.includes(bbar)) {
			bbar.classList.remove('hiddenBBB')
		} else {
			bbar.classList.add('hiddenBBB')
		}
	})
}
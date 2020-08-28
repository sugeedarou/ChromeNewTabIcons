chrome.storage.local.get('bookmarks', (result) => {
	if (typeof result.bookmarks != 'undefined') {
		createBookmarkList(result.bookmarks)
		listenToEvents()
	}
})

let blist = null

function createBookmarkList(bookmarks) {
	blist = document.createElement('div')
	blist.className = 'blist hiddenBBB'
	for (let bm of bookmarks) {
		const a = document.createElement('a')
		const img = document.createElement('img')
		img.src = bm.iconSrc
		a.href = bm.url
		a.appendChild(img)
		blist.appendChild(a)
	}

	document.documentElement.insertAdjacentElement('afterbegin', blist)
}

function listenToEvents() {
	window.addEventListener('mousemove', (e) => {
		if (e.path.includes(blist)) {
			blist.classList.remove('hiddenBBB')
		} else {
			blist.classList.add('hiddenBBB')
		}
	})
}
let tree = chrome.bookmarks.getTree(async (nodes) => {
    let nodeList = nodes[0].children[0].children;
    let bookmarks = []
    for (let node of nodeList) {
        let dataURL = await getImgDataUrl('chrome://favicon/size/32@1x/' + node.url)
        bookmarks.push({
            url: node.url,
            iconSrc: dataURL
        })
    }
    chrome.storage.local.set({ bookmarks: bookmarks })
})

async function getImgDataUrl(url) {
    return new Promise((resolve, reject) => {
        let can = document.createElement("canvas");
        let ctx = can.getContext("2d");
        let img = new Image();
        img.src = url;
        img.addEventListener('load', function () {
            can.width = this.width;
            can.height = this.height
            ctx.drawImage(img, 0, 0);
            let imgData = can.toDataURL('image/jpg')
            resolve(imgData)
        })
    })
}

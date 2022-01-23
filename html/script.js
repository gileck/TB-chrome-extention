// chrome.history.search({text: '', 'maxResults': 1000000}, array => {
//     console.log(array)
//     console.log(array.filter(item => item.url.includes('gileck5.wixsite')))
// })

// const isChecked = document.getElementById('http-checkbox').checked
// console.log(isChecked)
function addQueryParams(queryParams, options = {}) {
    const tuples = Object.entries(queryParams)
    // console.log({tuples})
    chrome.tabs.getSelected(null,function({url, id}) {
        const urlObj = new URL(url)
        tuples.forEach(([key, value]) => urlObj.searchParams.set(key, _.isFunction(value) ? value() : value))
        tuples.filter(([key, value]) => value === undefined).forEach(([key]) => urlObj.searchParams.delete(key))


        if (tuples.some(([key, value]) => key === 'ssrDebug' && value === true)) {
            urlObj.href = urlObj.href.replace('https', 'http')
            urlObj.searchParams.delete('forceThunderbolt')
        }
        if (tuples.some(([key, value]) => key === 'forceThunderbolt' && value === true)) {
            urlObj.searchParams.delete('ssrDebug')
        }
        if (options.newTab) {
            chrome.tabs.create({'url': urlObj.href})
            return
        }

        chrome.tabs.update(id, {url: urlObj.href});
    });
}

function clearQueryParams() {
    chrome.tabs.getSelected(null,function({url, id}) {
        const urlObj = new URL(url)
        Array.from(urlObj.searchParams.keys()).forEach(key => urlObj.searchParams.delete(key))
        chrome.tabs.update(id, {url: urlObj.href});
    });
}
const addOnClick = (id, fn) => document.getElementById(id).addEventListener("click", fn)
const addButton = (name, value) => {
    const button = document.createElement('button')
    button.id = name
    button.innerText = value.displayName || name
    document.getElementById('buttons').appendChild(button)
}
const addLink = (name, url) => {
    const href = document.createElement('a')
    href.id = name
    href.href = url
    href.innerText = name
    href.onclick = (e) => {
        e.preventDefault()
        chrome.tabs.create({url})
    }
    const div = document.createElement('div')
    div.appendChild(href)
    document.getElementById('links').appendChild(div)
}



sitesConfig.forEach((name) => {
    if (_.isString(name)) {
        addLink(name, `https://gileck5.wixsite.com/${name}`)
    }
})
Object.entries(queryParamConfig).forEach(([name, value]) => {
    addButton(name, value)
    addOnClick(name, () => addQueryParams(value.query, value.options))

})

addOnClick("clear", clearQueryParams);




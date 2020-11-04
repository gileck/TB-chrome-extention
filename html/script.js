function addQueryParams(key, value) {
    chrome.tabs.getSelected(null,function({url, id}) {
        const urlObj = new URL(url)
        urlObj.searchParams.set(key, value)
        if (key === 'ssrDebug') {
            urlObj.href = urlObj.href.replace('https', 'http')
        }
        if (key === 'forceThunderbolt') {
            urlObj.searchParams.delete('ssrDebug')
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

document.getElementById("ssrDebug").addEventListener("click", () => addQueryParams('ssrDebug', true));
document.getElementById("forceThunderbolt").addEventListener("click", () => addQueryParams('forceThunderbolt', true));
document.getElementById("forceBolt").addEventListener("click", () => addQueryParams('petri_ovr', 'specs.EnableThunderboltRenderer:false'));
document.getElementById("excludeSSR").addEventListener("click", () => addQueryParams('petri_ovr', 'specs.ExcludeSiteFromSsr:true'));

document.getElementById("clear").addEventListener("click", clearQueryParams);




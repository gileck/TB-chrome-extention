function addQueryParams(...tuples) {
    chrome.tabs.getSelected(null,function({url, id}) {
        const urlObj = new URL(url)
        tuples.forEach(([key, value]) => urlObj.searchParams.set(key, value))
        tuples.filter(([key, value]) => value === undefined).forEach(([key]) => urlObj.searchParams.delete(key))

        if (tuples.some(([key, value]) => key === 'ssrDebug' && value === true)) {
            urlObj.href = urlObj.href.replace('https', 'http')
            urlObj.searchParams.delete('forceThunderbolt')
        }
        if (tuples.some(([key, value]) => key === 'forceThunderbolt' && value === true)) {
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
const addOnClick = (id, fn) => document.getElementById(id).addEventListener("click", fn)

addOnClick("ssrDebug" , () => addQueryParams(['ssrDebug', true], ['forceThunderbolt', undefined]));
addOnClick("forceThunderbolt", () => addQueryParams(['forceThunderbolt', true], ['ssrDebug', undefined]));
addOnClick("forceBolt", () => addQueryParams(['petri_ovr', 'specs.EnableThunderboltRenderer:false']));
addOnClick("excludeSSR", () => addQueryParams(['petri_ovr', 'specs.ExcludeSiteFromSsr:true']));
addOnClick("ThunderboltGA", () => addQueryParams(['forceThunderbolt', true], ['petri_ovr', 'specs.RolloutThunderboltFleet:GA']));
addOnClick("clear", clearQueryParams);






if (document.readyState === 'ready' || document.readyState === 'complete') {
    console.log('not')
} else {
    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            console.log('comp')
        }
    }
}
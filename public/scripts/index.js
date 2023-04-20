function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const quotes = [
    'hello',
    'bro',
    'this',
    'is',
    'title'
]

async function demo() {
    while (true) {
        for (var i = 0; i < quotes.length; i++) {
            console.log(document.getElementsByClassName("quote")[0]);
            await sleep(2*1000)
        }
    }
    console.log('Done');
}


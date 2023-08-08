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
            document.getElementsByClassName("quote")[0] = "The moment a creature turns its face towards Me (says the Lord) the sin committed by it through millions of births are dissolved then and there."
            await sleep(2*1000)
        }
    }
    console.log('Done');
}

demo()
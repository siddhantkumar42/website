function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function changeHeadQuote() {
    var element = document.getElementById("quote");
    var quotes = [
        "So what's up, fuckers?",
        "You are dead.",
        "I am the hero hunter.",
        "Your mom.",
        "Hehe boi.",
        "I am invisible.",
        "Levi is a fucking traitor.",
        "You egoist."
    ];
    while (true) {
        var index = Math.floor(Math.random() * quotes.length);
        element.innerHTML = quotes[index];
        await sleep(1000);
    }
}

changeHeadQuote()
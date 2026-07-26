const news = document.getElementById("news");

async function loadNews() {
    try {
        const url = "https://api.allorigins.win/raw?url=" +
            encodeURIComponent("https://feeds.bbci.co.uk/news/rss.xml");

        const response = await fetch(url);
        const xmlText = await response.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, "text/xml");

        const items = xml.querySelectorAll("item");

        let headlines = [];

        items.forEach(item => {
            headlines.push(item.querySelector("title").textContent);
        });

        news.innerHTML = headlines.join(" &nbsp;&nbsp; ● &nbsp;&nbsp; ");

    } catch (e) {
        news.innerHTML = "Unable to load BBC News.";
    }
}

loadNews();

// Refresh every 5 minutes
setInterval(loadNews, 300000);

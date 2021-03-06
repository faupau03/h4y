const express = require('express');
const ua = require('useragent');
const app = express();
const ejs = require('ejs');
const res = require('express/lib/response');
app.set('view engine', 'ejs');
app.set("trust proxy", "172.18.0.10");



function isBot (useragent) {
    const agent = ua.is(useragent);
    return !agent.webkit && !agent.opera && !agent.ie &&
        !agent.chrome && !agent.safari && !agent.mobile_safari &&
        !agent.firefox && !agent.mozilla && !agent.android;
}

const uAgentMiddleware = async (req, res, next) => {
    const local_url = 'h4y.paffnet.de';

    if (!isBot(req.headers['user-agent'])) {
        next ()
    } else {
        console.log("Bot detected");
        if (req.path == "/match") {
            await ejs
                .renderFile(__dirname + '/dist/og/match.ejs', { name: req.protocol + "://" + req.hostname })
                .then(output => res.send(output));
        }
        else if (req.path == "/gym") {
            await ejs
                .renderFile(__dirname + '/dist/og/gym.ejs', { name: req.protocol + "://" + req.hostname })
                .then(output => res.send(output));
        }
        else if (req.path == "/team") {
            await ejs
                .renderFile(__dirname + '/dist/og/team.ejs', { name: req.protocol + "://" + req.hostname })
                .then(output => res.send(output));
        }
        else if (req.path == "/club") {
            await ejs
                .renderFile(__dirname + '/dist/og/club.ejs', { name: req.protocol + "://" + req.hostname })
                .then(output => res.send(output));
        }
        else if (req.path == "/search") {
            await ejs
                .renderFile(__dirname + '/dist/og/search.ejs', { name: req.protocol + "://" + req.hostname })
                .then(output => res.send(output));
        }
        else if (req.path == "/favorites") {
            await ejs
                .renderFile(__dirname + '/dist/og/favorites.ejs', { name: req.protocol + "://" + req.hostname })
                .then(output => res.send(output));
        }
        else {
            next ()
        }
    //     try {
    //         console.log("This is a bot");
    //         console.log("URL", `${req.protocol}://${req.get('host')}${req.originalUrl}`);

    //         const browser = await puppeteer.launch({
    //           'args' : [
    //             '--disable-gpu',
    //             '--disable-dev-shm-usage',
    //             '--no-sandbox',
    //             '--disable-setuid-sandbox'
    //           ]
    //         })
    //         const page = await browser.newPage();
    //         await page.setUserAgent('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36');
    //         await page.goto(`${req.protocol}://${req.get('host')}${req.originalUrl}`, {
    //             waitUntil: "networkidle0",
    //         });
    //         await page.waitForSelector('#loading_bot');
    //         const html = await page.evaluate(() => {
    //             return document.documentElement.innerHTML;
    //         });
    //         await browser.close();
    //         console.log("HTML", html);
    //         res.send(html);
    //     } catch (err) {
    //         console.log("Error", err);
    //         res.send(err)
    //     }
        
    }
}

app.use(uAgentMiddleware)


app.use(express.static('dist'));

app.get('/favorites', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})
app.get('/search', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})
app.get('/leagues', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})
app.get('/team', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})
app.get('/match', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})
app.get('/club', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})
app.get('/gym', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})





const port = 80;
app.listen(port, () => {
    console.log(`App listening on port ${port}'`);
});
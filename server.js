const express = require('express');
const puppeteer = require('puppeteer');
const ua = require('useragent');
const app = express();

app.set("trust proxy", "172.18.0.10");



function isBot (useragent) {
    const agent = ua.is(useragent);
    return !agent.webkit && !agent.opera && !agent.ie &&
        !agent.chrome && !agent.safari && !agent.mobile_safari &&
        !agent.firefox && !agent.mozilla && !agent.android;
}

const uAgentMiddleware = async (req, res, next) => {
    const local_url = 'h4y.paffnet.de';
    console.log("This is a bot");

    if (!isBot(req.headers['user-agent'])) {
        next ()
    } else {

        try {
            const browser = await puppeteer.launch({
              'args' : [
                '--no-sandbox',
                '--disable-setuid-sandbox'
              ]
            })
            const page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36');
            await page.goto(local_url, {
                waitUntil: "networkidle0",
            });
            const html = await page.evaluate(() => {
                return document.documentElement.innerHTML;
            });
            await browser.close();

            res.send(html);
        } catch (err) {
            res.send(err)
        }
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
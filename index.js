const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const LOCALHOST_BASE_URL = "http://host.docker.internal"; // Use this url to navigate to host

const takeScreenshot = async (driver, name) => {
    let encodedString = await driver.takeScreenshot();
    // Save the screenshot as a file
    fs.writeFileSync(__dirname + `/screenshots/${name ?? "testScreenshot"}.png`, encodedString, 'base64')
}
async function fn() {
    let driver;
    driver = await new Builder()
        .forBrowser('chrome')
        .usingServer('http://localhost:4444/wd/hub') // URL to Selenium Hub
        .setChromeOptions(new chrome.Options().headless().addArguments("--no-sandbox", "--disable-dev-shm-usage"))
        .build();

    console.log('HELLO INSTANCIATED DRIVER')
    try {
        await driver.get('https://www.youtube.com/');
        await takeScreenshot(driver)
    } catch (e) {
        console.error('ERROR: ', e)
    } finally {
        await driver.quit();
    }
}
fn()

const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

const navigateToLogin = async (driver) => {
    await driver.wait(until.elementLocated(By.id('header-login-link')), 7000);
    await driver.executeScript("document.querySelector('#header-login-link > p').click();");
    await driver.wait(until.elementLocated(By.id('sign-in-btn')), 7000);
}
const navigateToRegister = async (driver) => {
    await navigateToLogin(driver)
    await driver.wait(until.elementLocated(By.id('sign-up-link')), 2000);
    const signUpLinkElem = await driver.findElement(By.id('sign-up-link'))
    await signUpLinkElem.click()
    await driver.wait(until.elementLocated(By.id('sign-up-btn')), 7000);
}

const email = 'randomuser9@noreply.com'
const password = 'changeme1234'

const signUpFlow = async (driver) => {
    // Fill sign-up form
    const inputFieldEmail = await driver.findElement(By.id('sign-up-email-input'));
    await inputFieldEmail.sendKeys(email);
    const inputFieldPassword = await driver.findElement(By.id('sign-up-password-input'));
    await inputFieldPassword.sendKeys(password);
    const inputFieldRePassword = await driver.findElement(By.id('sign-up-repassword-input'));
    await inputFieldRePassword.sendKeys(password);
    const signUpButton = await driver.findElement(By.id('sign-up-btn'));
    await signUpButton.click()
    await driver.wait(async () => { // Wait to load session and be redirected to '/'
        return (
            (new URL(await driver.getCurrentUrl()).pathname === '/')
            && until.elementLocated(By.id('header-session-user-id'))
            && until.elementIsVisible(By.id('home-page'))
        )
    }, 10000);
}

const signInFlow = async (driver) => {
    // Fill sign-in form
    const inputFieldEmail = await driver.findElement(By.id('sign-in-email-input'));
    await inputFieldEmail.sendKeys(email);
    const inputFieldPassword = await driver.findElement(By.id('sign-in-password-input'));
    await inputFieldPassword.sendKeys(password);
    const signInButton = await driver.findElement(By.id('sign-in-btn'));
    await signInButton.click()
    await driver.wait(async () => { // Wait to load session and be redirected to '/'
        return (
            (new URL(await driver.getCurrentUrl()).pathname === '/')
            && until.elementLocated(By.id('header-session-user-id'))
            && until.elementIsVisible(By.id('home-page'))
        )
    }, 10000);
}


const fnRegister = async () => {
    let driver;
    driver = await new Builder()
        .forBrowser('chrome')
        .usingServer('http://localhost:4444/wd/hub') // URL to Selenium Hub
        .setChromeOptions(new chrome.Options().headless().addArguments("--no-sandbox", "--disable-dev-shm-usage"))
        .build();

    console.log('HELLO INSTANCIATED DRIVER')
    try {
        await driver.get('http://bo-cristian.protofy.xyz:8080/');
        console.log('Navigated to /')
        await navigateToRegister(driver)
        console.log('Navigated to register')
        await signUpFlow(driver)
        let encodedString = await driver.takeScreenshot();
        // Save the screenshot as a file
        fs.writeFileSync(__dirname + '/screenshotRegister.png', encodedString, 'base64')
    } catch (e) {
        console.error('ERROR: ', e)
    } finally {
        await driver.quit();
    }
}

const fnLogin = async () => {
    let driver;
    driver = await new Builder()
        .forBrowser('chrome')
        .usingServer('http://localhost:4444/wd/hub') // URL to Selenium Hub
        .setChromeOptions(new chrome.Options().headless().addArguments("--no-sandbox", "--disable-dev-shm-usage"))
        .build();

    try {
        await driver.get('http://bo-cristian.protofy.xyz:8080/');
        await navigateToLogin(driver)
        await signInFlow(driver)
        let encodedString = await driver.takeScreenshot();
        // Save the screenshot as a file
        fs.writeFileSync(__dirname + '/screenshotLogin.png', encodedString, 'base64')
    } catch (e) {
        console.error('ERROR: ', e)
    } finally {
        await driver.quit();
    }
}


// fnRegister()
// fnLogin()

async function a() {
    let driver;
    driver = await new Builder()
        .forBrowser('chrome')
        .usingServer('http://localhost:4444/wd/hub') // URL to Selenium Hub
        .setChromeOptions(new chrome.Options().headless().addArguments("--no-sandbox", "--disable-dev-shm-usage"))
        .build();

    console.log('HELLO INSTANCIATED DRIVER')
    try {
        await driver.get('http://host.docker.internal:8080/');
        await driver.findElement(By.id('home-page'));
        let encodedString = await driver.takeScreenshot();
        // Save the screenshot as a file
        fs.writeFileSync(__dirname + '/screenshotLogin.png', encodedString, 'base64')
    } catch (e) {
        console.error('ERROR: ', e)
    } finally {
        await driver.quit();
    }
}
a()ﬁ

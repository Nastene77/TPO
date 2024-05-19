const { Builder } = require('selenium-webdriver');
const WildberriesPage = require('../pages/WbHomePage');

async function ColorFilterTest() {
  const driver = await new Builder().forBrowser('chrome').build();
  const page = new WildberriesPage(driver);

  try {
    await page.navigateTo();
    await page.offCookies();
    await page.loginToAccount();

  } finally {
    //await driver.quit();
  }
}

ColorFilterTest();
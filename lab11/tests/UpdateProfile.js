const { Builder } = require('selenium-webdriver');
const WildberriesPage = require('../pages/WbProfilePage');

async function ColorFilterTest() {
  const driver = await new Builder().forBrowser('chrome').build();
  const page = new WildberriesPage(driver);

  try {
    await page.navigateTo();
    await page.offCookies();
    await page.updateName();
    await page.saveUpdate();

  } finally {
    //await driver.quit();
  }
}

ColorFilterTest();
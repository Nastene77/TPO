const { Builder } = require('selenium-webdriver');
const WBProductPage = require('../pages/WBProductPage');

async function AddProductToFavoriteTest() {
  const driver = await new Builder().forBrowser('chrome').build();
  const page = new WBProductPage(driver);

  try {
    await page.navigateToProductPage();
    await page.offCookies();
    await page.addToFavorite();

  } finally {
    //await driver.quit();
  }
}

AddProductToFavoriteTest();
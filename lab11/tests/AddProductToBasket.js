const { Builder } = require('selenium-webdriver');
const WBProductPage = require('../pages/WBProductPage');

async function AddProductToBasketTest() {
  const driver = await new Builder().forBrowser('chrome').build();
  const page = new WBProductPage(driver);

  try {
    await page.navigateToProductPage();
    await page.offCookies();
    await page.addProductToBasket();

  } finally {
    //await driver.quit();
  }
}

AddProductToBasketTest();
const { Builder } = require('selenium-webdriver');
const WildberriesPage = require('../pages/WbHomePage');

async function ColorFilterTest() {
  const driver = await new Builder().forBrowser('chrome').build();
  const page = new WildberriesPage(driver);

  try {
    await page.navigateTo();
    await page.offCookies();
    await page.searchProduct('Атласные ленты');
    await page.applyColorFilter();

    const resultsCount = await page.getSearchResultsCount('Атласные ленты');

    console.log(`Результаты поиска с примененным фильтром: ${resultsCount} товар(ов)`);
  } finally {
    //await driver.quit();
  }
}

ColorFilterTest();
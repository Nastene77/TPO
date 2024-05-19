const { Builder } = require('selenium-webdriver');
const WildberriesPage = require('../pages/WbHomePage');

async function SearchProductTest() {
  const driver = await new Builder().forBrowser('chrome').build();
  const page = new WildberriesPage(driver);

  try {
    await page.navigateTo();
    await page.offCookies();
    await page.searchProduct('Атласные ленты');

    const resultsCount = await page.getSearchResultsCount('Атласные ленты');

    console.log(`Результаты поиска: ${resultsCount} товар(ов/а)`);
  } finally {
    await driver.quit();
  }
}

SearchProductTest();
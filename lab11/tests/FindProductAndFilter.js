const { Builder } = require('selenium-webdriver');
const WildberriesPage = require('../pages/WbHomePage');

class WildberriesTest {
  constructor() {
    this.driver = null;
    this.page = null;
  }

  async setup() {
    this.driver = await new Builder().forBrowser('chrome').build();
    this.page = new WildberriesPage(this.driver);
  }

  async teardown() {
    await this.driver.quit();
  }

  async run() {
    try {
      await this.page.navigateTo();
      await this.page.offCookies();
      await this.page.searchProduct('Атласные ленты');
      await this.page.applyColorFilter();

      const resultsCount = await this.page.getSearchResultsCount('Атласные ленты');

      if (resultsCount > 0) {
        console.log(`Товары, содержащие "Атласные ленты" в названии и отфильтрованные по цвету, найдены: ${resultsCount}`);
      } else {
        console.log('Товары, содержащие "Атласные ленты" в названии и отфильтрованные по цвету, не найдены.');
      }
    } finally {
      await this.teardown();
    }
  }
}

async function runTest() {
  const test = new WildberriesTest();
  await test.setup();
  await test.run();
}

runTest();
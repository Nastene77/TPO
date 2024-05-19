const { Builder } = require('selenium-webdriver');
const WildberriesPage = require('../pages/WbHomePage');
const assert = require('assert');

describe('Wildberries Search Test', function() {
  let driver;
  let page;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    page = new WildberriesPage(driver);
  });

  after(async function() {
    await driver.quit();
  });

  it('should return correct search results count', async function() {
    await page.navigateTo();
    await page.offCookies();
    await page.searchProduct('Атласные ленты');

    const resultsCount = await page.getSearchResultsCount('Атласные ленты');

    assert.strictEqual(resultsCount, 5, 'Incorrect search results count');
  });
});
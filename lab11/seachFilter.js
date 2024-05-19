const { Builder, By, Key, until } = require('selenium-webdriver');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class WildberriesPage {
  constructor(driver) {
    this.driver = driver;
    this.searchInput = By.css('.search-component-input');
    this.searchResults = By.id('route-content');
    this.filterButton = By.xpath("//*[@id='route-content']/div/div[2]/div[2]/div[1]/div[2]/div/div[1]/div[1]/button[2]");
    this.cookiesButton = By.xpath("//*[@id='wbx-app']/div[5]/div/div/div/div/div/div[2]/button[2]");
    this.colorFilterButton = By.xpath("//*[@id='route-content']/div/div[2]/div[1]/div[2]/div[3]/div[7]/div[2]/div[11]/button");
    this.showProductsButton = By.xpath("//*[@id='route-content']/div/div[2]/div[1]/div[2]/div[4]/div[1]/div/button");
  }

  async searchProduct(productName) {
    await this.driver.get('https://www.wildberries.by');

    const searchInput = await this.driver.wait(
      until.elementLocated(this.searchInput),
      5000
    );

    await searchInput.sendKeys(productName);
    await searchInput.sendKeys(Key.ENTER);
    await this.driver.wait(until.elementLocated(this.searchResults));
  }

  async getSearchResultsCount(productName) {
    const products = await this.driver.findElements(
      By.xpath(`//*[contains(text(), '${productName}')]`)
    );

    return products.length;
  }

  async offCookies() {
    const cookiesButton = await this.driver.wait(
      until.elementLocated(this.cookiesButton),
      5000
    );

    await cookiesButton.click();
  }

  async applyColorFilter() {
    const filterButton = await this.driver.wait(
      until.elementLocated(this.filterButton),
      5000
    );
    await filterButton.click();
    await sleep(3000);

    const colorFilterButton = await this.driver.wait(
      until.elementLocated(this.colorFilterButton),
      5000
    );
    await colorFilterButton.click();
    await sleep(3000);


    const showProductsButton = await this.driver.wait(
      until.elementLocated(this.showProductsButton),
      5000
    );

    await showProductsButton.click();
  }
}

async function searchProductTest() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    const wildberriesPage = new WildberriesPage(driver);

    await wildberriesPage.searchProduct('Атласные ленты');
    await wildberriesPage.offCookies();
    await wildberriesPage.applyColorFilter();

    const resultsCount = await wildberriesPage.getSearchResultsCount('Атласные ленты');

    if (resultsCount > 0) {
      console.log(`Товары, содержащие "Атласные ленты" в названии и отфильтрованные по цвету, найдены: ${resultsCount}`);
    } else {
      console.log('Товары, содержащие "Атласные ленты" в названии и отфильтрованные по цвету, не найдены.');
    }
  } finally {
    //await driver.quit();
  }
}

searchProductTest();
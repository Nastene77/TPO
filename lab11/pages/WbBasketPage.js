const { By, Key, until } = require('selenium-webdriver');

class WildberriesPage {
  constructor(driver) {
    this.driver = driver;
    this.searchInput = By.css('.search-component-input');
    this.searchResults = By.id('route-content');
    this.filterButton = By.xpath("//*[@id='route-content']/div/div[2]/div[2]/div[1]/div[2]/div/div[1]/div[1]/button[2]");
    this.cookiesButton = By.xpath("//*[@id='wbx-app']/div[5]/div/div/div/div/div/div[2]/button[2]");
    this.colorFilterButton = By.xpath("//*[@id='route-content']/div/div[2]/div[1]/div[2]/div[3]/div[7]/div[2]/div[11]/button");
    this.widthFilterButton = By.xpath("//*[@id='route-content']/div/div[2]/div[1]/div[2]/div[3]/div[8]/div[3]/div[1]/div[4]");
    this.showProductsButton = By.xpath("//*[@id='route-content']/div/div[2]/div[1]/div[2]/div[4]/div[1]/div/button");
  }

  async navigateTo() {
    await this.driver.get('https://www.wildberries.by/basket');
  }

  async searchProduct(productName) {
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
    const cookiesButton = await this.driver.wait(until.elementLocated(this.cookiesButton),5000);
    await cookiesButton.click();
  }

  async applyColorFilter() {
    const filterButton = await this.driver.wait(until.elementLocated(this.filterButton),5000);
    await filterButton.click();
    await this.driver.sleep(3000);

    const colorFilterButton = await this.driver.wait(until.elementLocated(this.colorFilterButton),5000);
    await colorFilterButton.click();
    await this.driver.sleep(3000);

    /*const WidthFilterButton = await this.driver.wait(until.elementLocated(this.widthFilterButton),5000);
    await WidthFilterButton.click();
    await this.driver.sleep(3000);*/

    const showProductsButton = await this.driver.wait(until.elementLocated(this.showProductsButton),5000);
    await showProductsButton.click();
  }
}

module.exports = WildberriesPage;
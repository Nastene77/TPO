const { By, Key, until } = require('selenium-webdriver');

class WbPrifilePage {
  constructor(driver) {
    this.driver = driver;
    this.searchInput = By.css('.search-component-input');
    this.searchResults = By.id('route-content');
    this.filterButton = By.xpath("//*[@id='route-content']/div/div[2]/div[2]/div[1]/div[2]/div/div[1]/div[1]/button[2]");
    this.cookiesButton = By.xpath("//*[@id='wbx-app']/div[5]/div/div/div/div/div/div[2]/button[2]");
    this.colorFilterButton = By.xpath("//*[@id='route-content']/div/div[2]/div[1]/div[2]/div[3]/div[7]/div[2]/div[11]/button");
    this.widthFilterButton = By.xpath("//*[@id='route-content']/div/div[2]/div[1]/div[2]/div[3]/div[8]/div[3]/div[1]/div[4]");
    this.showProductsButton = By.xpath("//*[@id='route-content']/div/div[2]/div[1]/div[2]/div[4]/div[1]/div/button");
    this.accountButton = By.xpath("//*[@id='wbx-app']/header/div[1]/div[2]/ul/li[3]/a");
    this.saveUpdate = By.xpath("//*[@id='phone-input']");
    this.updateName = By.xpath("//*[@id='wbx-app']/div[2]/div/div/div/div/div/div/div/div[5]/div/div[1]");
    this.NameButton = By.xpath("//*[@id='firstName']");
  }

  async navigateTo() {
    await this.driver.get('https://www.wildberries.by/profile/details');
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
  async updateName() {
    const updateName = await this.driver.wait(until.elementLocated(this.updateName),5000);
    await updateName.click();
  }
  async saveUpdate() {
    const saveUpdate = await this.driver.wait(until.elementLocated(this.saveUpdate),5000);
    await saveUpdate.click();
  }
}

module.exports = WbPrifilePage;
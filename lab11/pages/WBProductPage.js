const { Builder, By, Key, until, Capabilities } = require('selenium-webdriver');

class WBProductPage {
  constructor(driver) {
    this.driver = driver;
    this.searchInput = By.css('.search-component-input');
    this.cookiesButton = By.xpath("//*[@id='wbx-app']/div[5]/div/div/div/div/div/div[2]/button[2]");
    this.favoriteButton = By.xpath("//*[@id='route-content']/div/div[1]/div[2]/div[3]/div[2]/div[1]/div[4]/div[1]/button/svg");
    this.basketButton = By.xpath("//*[@id='route-content']/div/div[1]/div[2]/div[3]/div[2]/div[1]/div[4]/div[1]/div[2]/div[1]/div/button");
    this.catalogFavoritesButton = By.xpath("//*[@id='wbx-app']/header/div[1]/div[2]/ul/li[2]/a/span[1]/svg");
}

  async navigateToProductPage() {
    await this.driver.manage().window().maximize();
    await this.driver.get('https://www.wildberries.by/product?card=177960834&option=294624368');
    await this.driver.sleep(3000);  
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

  async offCookies() {
    const cookiesButton = await this.driver.wait(until.elementLocated(this.cookiesButton),5000);
    await cookiesButton.click();
  }

  async addToFavorite() {
    const favoriteButton = await this.driver.wait(until.elementLocated(this.favoriteButton),5000);
    await favoriteButton.click();
  }

  async addProductToBasket() {
    const basketButton = await this.driver.wait(until.elementLocated(this.basketButton),5000);
    await basketButton.click();
  }

  async addToCatalogFavorites() {
    const catalogFavoritesButton = await this.driver.wait(until.elementLocated(this.catalogFavoritesButton),5000);
    await catalogFavoritesButton.click();
  }

}

module.exports = WBProductPage;
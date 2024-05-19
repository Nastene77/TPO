const { By, until } = require('selenium-webdriver');

class WildberriesBasketPage {
  constructor(driver) {
    this.driver = driver;
    this.productsCount = By.xpath("//*[@id='route-content']/div/div[1]/div[2]/div[3]/section[1]/section/div[2]/div/div[2]/div");
    this.removeButton = By.xpath("//*[@id='route-content']/div/div[1]/div[2]/div[3]/section[1]/section/div[2]/div/div[2]/div/div[1]/div[2]/div[2]/div[1]/div/button[1]");
    this.addButton = By.xpath("//*[@id='catalog-content']/div[2]/div[1]/div[1]/div[1]/div[1]/div/div/div[1]/div[2]/div[2]/div[1]/div[2]/div[1]/div[2]/div[2]/div[2]/div[1]/div[1]/div[1]/div[2]/button");
  }

  async getProductsCount() {
    const productsCountElement = await this.driver.wait(
      until.elementLocated(this.productsCount),
      5000
    );

    const productsCountText = await productsCountElement.getText();
    return parseInt(productsCountText);
  }

  async removeProductFromBasket() {
    const removeButton = await this.driver.wait(
      until.elementLocated(this.removeButton),
      5000
    );

    await removeButton.click();
  }

  async addProductToBasket() {
    const addButton = await this.driver.wait(
      until.elementLocated(this.addButton),
      5000
    );

    await addButton.click();
  }
}

module.exports = WildberriesBasketPage;
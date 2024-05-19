const { Builder } = require('selenium-webdriver');
const WildberriesBasketPage = require('..pages/WildberriesBasketPage');

async function basketTest() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    const wildberriesBasketPage = new WildberriesBasketPage(driver);

    await driver.get('https://www.wildberries.by/basket');

    const productsCount = await wildberriesBasketPage.getProductsCount();
    console.log(`Количество товаров в корзине: ${productsCount}`);

    if (productsCount > 0) {
      await wildberriesBasketPage.removeProductFromBasket();
      console.log('Один товар удален из корзины.');
    } else {
      await wildberriesBasketPage.addProductToBasket();
      console.log('Товар добавлен в корзину.');
      await driver.sleep(5000); // Ждем 5 секунд
      await wildberriesBasketPage.removeProductFromBasket();
      console.log('Один товар удален из корзины.');
    }
  } finally {
    // await driver.quit();
  }
}

basketTest();
const { Builder, By, Key, until } = require('selenium-webdriver');

async function searchProduct() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://www.wildberries.by');

    const searchInput = await driver.wait(
      until.elementLocated(By.css('.search-component-input')),
      5000 
    );

    await searchInput.sendKeys('Атласные ленты');
    await searchInput.sendKeys(Key.ENTER);
    await driver.wait(until.elementLocated(By.id('route-content')));

    const products = await driver.findElements(By.xpath(`//*[contains(text(), 'Атласные ленты')]`));
    if (products.length > 0) {
      console.log('Товары, содержащие "Атласные ленты" в названии, найдены.');
    } else {
      console.log('Товары, содержащие "Атласные ленты" в названии, не найдены.');
    }
  } finally {
  }
}

searchProduct();
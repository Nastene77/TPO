const { Builder, By, Key, until } = require('selenium-webdriver');

async function searchProduct() {
  // Создаем экземпляр драйвера
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Открываем сайт Wildberries
    await driver.get('https://www.wildberries.by');

    // Ожидаем загрузку строки поиска
    const searchInput = await driver.wait(
      until.elementLocated(By.css('.search-component-input')),
      5000 // Установите таймаут в миллисекундах, например, 5000 (5 секунд)
    );

    // Находим строку поиска и вводим ключевое слово
    await searchInput.sendKeys('Атласные ленты');

    // Нажимаем клавишу Enter для выполнения поиска
    await searchInput.sendKeys(Key.ENTER);

    // Дожидаемся загрузки страницы с результатами поиска
    await driver.wait(until.elementLocated(By.id('route-content')));

    // Проверяем наличие товара, содержащего "Атласные ленты" в названии
    const products = await driver.findElements(By.xpath(`//*[contains(text(), 'Атласные ленты')]`));
    if (products.length > 0) {
      console.log('Товары, содержащие "Атласные ленты" в названии, найдены.');
    } else {
      console.log('Товары, содержащие "Атласные ленты" в названии, не найдены.');
    }
  } finally {
    // Не закрываем браузер после завершения теста
    // await driver.quit();
  }
}

// Запускаем тест
searchProduct();
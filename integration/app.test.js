/* global page */
describe('App todolist', () => {
  it('base example, visually looks correct', async () => {
    // APIs from jest-puppeteer
    await page.goto(
      'http://localhost:9009/iframe.html?id=todolists-add-item-form--add-item-form-story&args=&viewMode=story',
    );
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});

describe('Adding new element', () => {
  it('base example, visually looks correct', async () => {
    // APIs from jest-puppeteer
    await page.goto(
      'http://localhost:9009/iframe.html?id=todolists-adding-a-new-element--adding-new-task&args=&viewMode=story',
    );
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});

describe('Editable task', () => {
  it('base example, visually looks correct', async () => {
    // APIs from jest-puppeteer
    await page.goto(
      'http://localhost:9009/iframe.html?id=todolists-editable-task--editable-task&args=&viewMode=story',
    );
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});

describe('Todolist', () => {
  it('base example, visually looks correct', async () => {
    // APIs from jest-puppeteer
    await page.goto(
      'http://localhost:9009/iframe.html?id=todolists-todolist--todolist-component&args=&viewMode=story',
    );
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});

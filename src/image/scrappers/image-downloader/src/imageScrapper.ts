import puppeteer from 'puppeteer';
import fs from 'fs';
import fetch from 'node-fetch';
import { join } from 'path';
import write from 'write';

let browser = null;
let page = null;

const imageScrapper = async () => {
  browser = await puppeteer.launch({
    headless: true,
  });

  page = await browser.newPage();

  await page.goto('https://picsum.photos/1080/1040');

  await page.waitForSelector('img');

  const imageURL = await page.$eval('img', (element) => element.src);

  const filename = imageURL.split('/').pop();

  console.log(filename);

  //await write(`./temp/${filename}.jpg`, filename);

  fetch(imageURL).then((res) => {
    const dest = fs.createWriteStream(`temp/${filename}.jpg`); //join('temp', `${filename}.jpg`)); //join(`./temp/${filename}.jpg`));
    res.body.pipe(dest);
  });

  await browser.close();

  return `${filename}.jpg`;
};

export default imageScrapper;

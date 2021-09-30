var puppeteer = require('puppeteer');
var delay = require('delay');

var fig = require('./config.redd.json');

var config = fig.config;
const $log = console.log;

$log(config)

async function run(){
  const browser = await puppeteer.launch({
    product:'firefox',
    headless:false,
    // executablePath:'C:/Program Files/Mozilla Firefox/firefox.exe',
    slowMo:10,
    devtools:true
    });
    const obj = {};

  // less is better
  const page = await browser.newPage();



  let res = await page.goto(config.base, {waitUntil:"load"});
  const visible = {waitUntil:"visible"}
  let  selector = 'a[role="button"]';

  await page.keyboard.press("Tab");
  await page.waitForNavigation();
  res = await page.focus("input[type=search]", element => element);
  $log("first log is " + res.toString().substring(0,16) );
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  page.keyboard.press("Enter");

  res =await page.waitForNavigation();
  await page.focus("input[type=search]", element => element, {waitUntil:"networkidle0"});

  res = await page.keyboard.type('KeyboardEKDFSFSKRKS', { delay: 67 });
  $log(res);

  // res = await page.focus(selector, element => element, {waitUntil:'load'});
  // let bool = res.hasOwnProperty("text");
  // $log("result is " + res );


}

run();

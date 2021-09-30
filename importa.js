#!/usr/bin/env node
// This is your Editor pane. Write your JavaScript here and
// use the command line to execute commands
var puppeteer = require('puppeteer');
var delay = require('delay');
var path = require('path');

var fig = require(path.join(__dirname, 'config.linux.json') );

var config = fig.config;
const $log = console.log;

$log(config)

// nlp.addDocument("I want a pizza!", "pizza", { fromFullSentence: true, expandIntent: true });
// console.log(nlp.test("Want pizza, please").intent);

const keywords = [ "carta" ];
// create a name/id key pair
// nlp.term("mojito", "mio")
var exit = false;
var ac = {};
var sc = config.screenshots;
const myshot = (countObj) => {
  page.screenshot({ path: `${sc}/github-${countObj.cc}.png` });countObj.cc=countObj.cc+1;
}
var iteration = 0;
ac.cc = 0;

var nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(smtpConfig);
  if (transporter) $log('created ' + transporter + ' , transport'); else throw new Error('error nodemailer')

async function run(){
  const browser = await puppeteer.launch({
    // executablePath:"/usr/bin/chromium-browser",
    args:[ '--no-sandbox',

          ],
    headless:config.headless,
    slowMo:10,
    defaultViewport:null
    });
    const obj = {};



  const page = await browser.newPage();



  // await page.setViewport({ width: 1024, height: 768});
  const timeout = 60000;
  page.setDefaultNavigationTimeout(timeout /2 );
  page.setDefaultTimeout(timeout)
  // page.goto("http://cercatore.github.com", {waitUntil:"load"});
  // page.goto(config.baseJobEngine, {waitUntil:"load"});
  let res = await page.goto("https://maps.google.com",{ waitUntil: 'load' }); // init
  await res;

  //await page.$$eval ('')
  const element = await page.waitForSelector('span[aria-hidden="true"]:not(:empty)', { visible: true });
  await element.click();
  console.log(`Element has been clicked`);
  // res = await page.$$eval('input[name="q"]' , element => element )
  // $log(res );
  // $log(config.search.keywords);
  // await page.type('input[name="q"]', config.search.keywords, {delay:10});
  // await page.type('input[name="l"]', config.search.location, {delay:10});
  // // await page.$$eval( 'button[value="Cerca Lavoro"]' , butt => butt[0].click() )
  // await page.keyboard.press('Enter');
  // // altra roba setDefaultNavigationTimeout
  // const foundHash = {}
  $log("So far, ... all good")
/*
    logfield job {

        termine : indica il termine di ricerca
        jobid ( vk)
        detectedText
        date ( ordinale 0..30 )





**************************************************************&*/
async function getSingleItem(select, page ){
  let item;
  try{
      let elements = await page.$$eval( select, element=>element.map(a => a.getAttribute("href")), {visible:true});
      console.log("elements : " + elements);
      item = elements[0]

  }catch(err){$log(err.message)};
  return item;
  }

  await page.waitForNavigation();
  try{
    var hrefs = 0;
    var empty = 1;
    let freshItem = {}
    while ( !exit ){
        ac.stat = parseInt( iteration, 10);
        $log(ac.stat + ":");
        // if (hrefs !== 0 ) await page.reload();

        var list = 'a.jobtitle[target="_blank"]';							// forse ERROR se headless
        // await page.waitForSelector("h2.jobTitle > a", { visible:true, waitUntil:'networkidle0'});
// ()=>{throw new Error("oh-oh")}   zz
        hrefs = await page.$$eval(list , element=>element.map(a => a.getAttribute("id")), {visible:true});
        $log (hrefs)

        let isNewOffer = 'span.new'
        let isNewText = await getSingleItem(isNewOffer, page);
        $log("text inside: " + isNewText);
        freshItem.id = hrefs[0];
        freshItem.date = isNewText;

        var start = new Date()
        $log("********* " + start);
        var simulateTime = 2000
        exit = false;











        setTimeout(function(argument) {
          // execution time simulated with setTimeout function
          var end = new Date() - start
          console.info('Execution time: %dms', end)
          $log("lapse " + (iteration-ac.stat));
        }, simulateTime)

      iteration = iteration+ 1;


  //******** second round */
    for ( var ii = 0; ii < hrefs.length; ii++){
        var item = hrefs[ii];
        var _id = item.substring(item.indexOf("jk" + 3));
        var followUrl= "" + config.baseJobEngine + "/" + item;
        const  jobhound = {};
        var trovata = 0;
		 if (!empty){
		 	Object.keys(foundHash).forEach( (trovate ) => {
		 		if (item === trovate ) {
		        	trovata = 1;

		        }

		      });
		    }
		else {
			 foundHash[item] = '1';
		}
		if (!trovata && !empty) {
			foundHash[item] = '1';
		          var ticker = "puppeteer cosmic " + config.baseJobEngine + "/" + item + "<br/>" + "<small>and the wiwinner is: </small><br/>" + "<b>" + config.search.keywords + "</b> yay <br/>";
			$log("trovata nuova " + ticker );
			mySendMail(ticker);
		}

        jobhound.termine = config.search.keywords;
        jobhound.debug = '1';


        jobhound.id = item;


    }
    if (foundHash[111]) $log("dsfmvg");
    $log("empty " + empty + "")

    if (empty == 1) {
      // const result = await mySendMail("puppeteer started");
      $log("mail ok" );
      empty = 0;


    }

await    delay(60000);
    $log("next time in " + 60 + ", secs. ");



  } // while
  }
  catch(error){handleThis(error);}
  browser.close();


}
const landing = async (page)=>{
  await page.type('input[name="q"]',0, {delay:60});
  await page.type('input[name="l"]', "milano", {delay:60})
}
// let result = await page.evaluate( (document)=> {
//
//     var obj = document.querySelector('input[name]');
//     $log(obj);
//     obj.click();
// });

run();

const handleThis = (error) => {
  $log("handle the error " + error + ", some way better");
  $log(error.stack)
}
/*
*     ticker should be the message, e.g. " ho trovato un nuovo lavoro con soldi > XXX $ "
*
*
///////////////////////////////////////////////////////////*/
async function  mySendMail( ticker ){
  const result = await transporter.sendMail({
   from:  '"fred <small>👻 </small>" <knows@amail.com>',
      to: 'homegreen18@gmail.com',
      replyTo: '"my ghost email shadow who nobody" <knows@amail.com>',
      subject: 'doing stuff sayiong people coffe',
      html:  ticker
    });
  }

async function mydouglas(page, selector) {

     try {

        const hrefs = await page.$$eval( ".jobTitle", a => a.children[0]);
        console.log(hrefs);

     } catch(error) {
       // do as you wish with this error and then do your next actions
          $log(error)
           try {
                page.goto('someUrl');
           } catch(error) {
               throw new Error(error);
           }
     }

}

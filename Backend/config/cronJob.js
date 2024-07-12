var schedule = require('node-schedule');
//const DbActions = require("../models/dbactions.model");
const SummaryModel = require("../models/summary.model");
const mailer = require('../mailer/mailer');
const sharedCtrl = require('../controller/common.controller');
const summaryCtrl = require('../controller/summary.controller');
const CustomSummaryCtrl = require('../controller/custom_summary.controller');

//*    *    *    *    *    *
//┬    ┬    ┬    ┬    ┬    ┬
//│    │    │    │    │    │
//│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
//│    │    │    │    └───── month (1 - 12)
//│    │    │    └────────── day of month (1 - 31)
//│    │    └─────────────── hour (0 - 23)
//│    └──────────────────── minute (0 - 59)
//└───────────────────────── second (0 - 59, OPTIONAL)
//*/1 * * * * every minute
//1 0 * * * every date at 00:01
//5 */1 * * * every 65 mins

// //every night 01:01
// var summaryJob24hrs = schedule.scheduleJob('1 0 */1 * *', function () {

//     let queryObject = {};
//     //queryObject.divisionInterval = 86400; //in seconds //24hrs
//     queryObject.divisionIntervalMinutes = 1440;
//     queryObject.durationType = 'hours'; //hours / minutes/ days
//     queryObject.recordDuration = 24; //int value based on type

//     SummaryModel.runSummaryData(queryObject, (err, dataresp) => {
//         if (dataresp) {
//             console.log('job done at every 24 hrs ==>', new Date());
//         }
//     })
// });

// //every hours and 1 minute
// var summaryJob60Min = schedule.scheduleJob('1 */1 * * *', function () {

//     let queryObject = {};
//     //queryObject.divisionInterval = 3600; //in seconds //600 = 1hr mins
//     queryObject.divisionIntervalMinutes = 60;
//     queryObject.durationType = 'hours'; //hours / minutes/ days
//     queryObject.recordDuration = 1; //int value based on type

//     SummaryModel.runSummaryData(queryObject, (err, dataresp) => {
//         if (dataresp) {
//             console.log('job done at every 60 min ==>', new Date());
//         }
//     })
// });
// //every hours and 11 minutes
// var summaryJob10Min = schedule.scheduleJob('*/11 * * * *', function () {

//     let queryObject = {};
//     //queryObject.divisionInterval = 600; //in seconds //600 = 10 mins
//     queryObject.divisionIntervalMinutes = 10;
//     queryObject.durationType = 'minutes'; //hours / minutes/ days
//     queryObject.recordDuration = 10; //int value based on type

//     SummaryModel.runSummaryData(queryObject, (err, dataresp) => {
//         if (dataresp) {
//             console.log('job done at every 10 min ==>', new Date());
//         }
//     })
// });

// var summaryJobEveryMin = schedule.scheduleJob('*/1 * * * *', function () {
//     let queryObject = {};
//     //queryObject.divisionInterval = 60; //in seconds //1 mins
//     queryObject.divisionIntervalMinutes = 1;
//     queryObject.durationType = 'minutes'; //hours / minutes/ days
//     queryObject.recordDuration = 1; //int value based on type

//     SummaryModel.runSummaryData(queryObject, (err, dataresp) => {
//         if (dataresp) {
//             // mailer.mailerFromTo('brijeshpant83@gmail.com', process.env.NO_REPLY, 'Cron Job Running', 'Cron Job Run at ' + new Date(), '', function (error, resp) {
//             //     console.log('job mail  ==>', resp);
//             // })
//             console.log('job done at every one min ==>', new Date());
//         }
//     })
// });
// summaryJobEveryMin.cancel();
// summaryJob10Min.cancel();
// summaryJob60Min.cancel();
// summaryJob24hrs.cancel();

setTimeout(() => {
    sharedCtrl.setTagScheduler();
    summaryCtrl.setSummaryConfigJob();
    CustomSummaryCtrl.setCustomSummaryConfigJob();
}, 200);
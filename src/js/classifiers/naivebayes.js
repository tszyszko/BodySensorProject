import walk from './saved_walk_params.csv';
import still from './saved_still_params.csv';
import crouch from './saved_crouches_params.csv';


console.log(walk);
console.log(still);
console.log(crouch);

/**
 * Created by LIn on 12/02/2018.
 */
let frameSize = 100;

let behaviors =["walk", "crouches", "still"];

let priors = {
    walk: 0.4,
    still: 0.4,
    crouch: 0.2
};


let behaviorsCounts = {};
let mean_mu_params = {};
let mean_var_params = {};
let variance_mu_params = {};
let variance_var_params = {};
let steps = 0;
let scale = 0.001;

let axs = [];
let ays = [];
let azs = [];
let gxs = [];
let gys = [];
let gzs = [];
let mxs = [];
let mys = [];
let mzs = [];

// for (let i = 0; i < behaviors.length; i++) {
//     let behavior = behaviors[i];
//     behaviorsCounts[behavior] = 0;
//     let fileName = "saved_" + behavior + "_params.csv";
//     $.ajax({
//         type: "GET",
//         url: fileName,
//         dataType: "text",
//         async: false,
//         success: function(data) {readTrainedParams(behavior, data);}
//     });
// }

function getMean(values) {
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i]
  }
  return sum / (values.length);
}

function getVariance(mean, values) {
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += (values[i] - mean) * (values[i] - mean)
  }
  return sum / (values.length);
}

function getMostLikelyBehavior(probabilities) {
  let behav = "None";
  let maxP = 0.0;
  Object.keys(probabilities).forEach(function (key) {
    let prob = probabilities[key];
    if (prob >= maxP) {
      maxP = prob;
      behav = key;
    }
  });
  return behav;
}

function isLowerThanThreshold(value, threshold) {
  if (threshold < 0) {
  }
}

function readTrainedParams(behavior, data) {
    let lines = data.split(/\r\n|\n/);
    mean_mu_params[behavior] = lines[0].split(',');
    console.log("mean_mu of still: " + mean_mu_params['still']);
    mean_var_params[behavior] = lines[1].split(',');
    variance_mu_params[behavior] = lines[2].split(',');
    variance_var_params[behavior] = lines[3].split(',');
}

function likelihood(x, mu, sigma2) {
  let p = Math.sqrt(1.0/(2*Math.PI*sigma2)) * Math.exp(-0.5*(x-mu)*(x-mu)/sigma2);
  return p;
}

export function handleIMUNotifications(event) {
    let value = event.target.value;

    let ax = value.getInt16(1, true);
    let ay = value.getInt16(3, true);
    let az = value.getInt16(5, true);
    let gx = value.getInt16(7, true);
    let gy = value.getInt16(9, true);
    let gz = value.getInt16(11, true);
    let mx = value.getInt16(13, true);
    let my = value.getInt16(15, true);
    let mz = value.getInt16(17, true);
    if (mx < 0) mx *= -1;
    if (my < 0) my *= -1;
    if (mz < 0) mz *= -1;

    axs.push(ax);
    ays.push(ay);
    azs.push(az);
    gxs.push(gx);
    gys.push(gy);
    gzs.push(gz);
    mxs.push(mx);
    mys.push(my);
    mzs.push(mz);

    if (steps==frameSize) {
        let probabilities = {};
        let meanAx = getMean(axs);
        let meanAy = getMean(ays);
        let meanAz = getMean(azs);
        let meanGx = getMean(gxs);
        let meanGy = getMean(gys);
        let meanGz = getMean(gzs);
        let meanMx = getMean(mxs);
        let meanMy = getMean(mys);
        let meanMz = getMean(mzs);

        let varAx = getVariance(meanAx, axs);
        let varAy = getVariance(meanAy, ays);
        let varAz = getVariance(meanAz, azs);
        let varGx = getVariance(meanGx, gxs);
        let varGy = getVariance(meanGy, gys);
        let varGz = getVariance(meanGz, gzs);
        let varMx = getVariance(meanMx, mxs);
        let varMy = getVariance(meanMy, mys);
        let varMz = getVariance(meanMz, mzs);

        let prob = 1.0;
        for (let i = 0; i < behaviors.length; i++) {
            let behav = behaviors[i];
            let p1 = likelihood(meanAx, mean_mu_params[behav][0], variance_mu_params[behav][0]);
            let p2 = likelihood(meanAy, mean_mu_params[behav][1], variance_mu_params[behav][1]);
            let p3 = likelihood(meanAz, mean_mu_params[behav][2], variance_mu_params[behav][2]);
            let p4 = likelihood(meanGx, mean_mu_params[behav][3], variance_mu_params[behav][3]);
            let p5 = likelihood(meanGy, mean_mu_params[behav][4], variance_mu_params[behav][4]);
            let p6 = likelihood(meanGz, mean_mu_params[behav][5], variance_mu_params[behav][5]);
            let p7 = likelihood(meanMx, mean_mu_params[behav][6], variance_mu_params[behav][6]);
            let p8 = likelihood(meanMy, mean_mu_params[behav][7], variance_mu_params[behav][7]);
            let p9 = likelihood(meanMz, mean_mu_params[behav][8], variance_mu_params[behav][8]);

            let p1v = likelihood(varAx, mean_var_params[behav][0], variance_var_params[behav][0]);
            let p2v = likelihood(varAy, mean_var_params[behav][1], variance_var_params[behav][1]);
            let p3v = likelihood(varAz, mean_var_params[behav][2], variance_var_params[behav][2]);
            let p4v = likelihood(varGx, mean_var_params[behav][3], variance_var_params[behav][3]);
            let p5v = likelihood(varGy, mean_var_params[behav][4], variance_var_params[behav][4]);
            let p6v = likelihood(varGz, mean_var_params[behav][5], variance_var_params[behav][5]);
            let p7v = likelihood(varMx, mean_var_params[behav][6], variance_var_params[behav][6]);
            let p8v = likelihood(varMy, mean_var_params[behav][7], variance_var_params[behav][7]);
            let p9v = likelihood(varMz, mean_var_params[behav][8], variance_var_params[behav][8]);

            prob = p1 * p2 * p3 * p4 * p5 * p6 * p7 * p8 * p9;
            prob = prob * p1v * p2v * p3v * p4v * p5v * p6v * p7v * p8v * p9v;
            probabilities[behav] = prob;
        }

        let predictedBehavior = getMostLikelyBehavior(probabilities);
        behaviorsCounts[predictedBehavior] += 1;
        console.log(predictedBehavior);
        document.getElementById(predictedBehavior).innerHTML = predictedBehavior + ": " + behaviorsCounts[predictedBehavior];

        steps = 0;
        axs = [];
        ays = [];
        azs = [];
        gxs = [];
        gys = [];
        gzs = [];
        mxs = [];
        mys = [];
        mzs = [];
    }
    steps += 1;
}
import walk from './saved_walk_params.csv';
import still from './saved_still_params.csv';
import crouch from './saved_crouches_params.csv';


export class NaiveBayesClassifier {


  constructor(eventCallback) {
    this.callback = eventCallback;
    this.frameSize = 100;

    this.behaviors = ["walk", "crouch", "still"];

    this.priors = {
      walk: 0.4,
      still: 0.4,
      crouch: 0.2
    };


    this.behaviorsCounts = {};

    this.mean_mu_params = {
      walk: walk[0],
      still: still[0],
      crouch: crouch[0]
    };

    this.mean_var_params = {
      walk: walk[1],
      still: still[1],
      crouch: crouch[1]
    };

    this.variance_mu_params = {
      walk: walk[2],
      still: still[2],
      crouch: crouch[2]
    };

    this.variance_var_params = {
      walk: walk[3],
      still: still[3],
      crouch: crouch[3]
    };

    this.steps = 0;

    this.scale = 0.001;

    this.axs = [];
    this.ays = [];
    this.azs = [];
    this.gxs = [];
    this.gys = [];
    this.gzs = [];
    this.mxs = [];
    this.mys = [];
    this.mzs = [];
  }




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



// function readTrainedParams(behavior, data) {
//     let lines = data.split(/\r\n|\n/);
//     mean_mu_params[behavior] = lines[0].split(',');
//     console.log("mean_mu of still: " + mean_mu_params['still']);
//     mean_var_params[behavior] = lines[1].split(',');
//     variance_mu_params[behavior] = lines[2].split(',');
//     variance_var_params[behavior] = lines[3].split(',');
// }



  handleIMUNotifications = (event) => {
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

    this.axs.push(ax);
    this.ays.push(ay);
    this.azs.push(az);
    this.gxs.push(gx);
    this.gys.push(gy);
    this.gzs.push(gz);
    this.mxs.push(mx);
    this.mys.push(my);
    this.mzs.push(mz);

    if (this.steps == this.frameSize) {
      let probabilities = {};
      let meanAx = getMean(this.axs);
      let meanAy = getMean(this.ays);
      let meanAz = getMean(this.azs);
      let meanGx = getMean(this.gxs);
      let meanGy = getMean(this.gys);
      let meanGz = getMean(this.gzs);
      let meanMx = getMean(this.mxs);
      let meanMy = getMean(this.mys);
      let meanMz = getMean(this.mzs);

      let varAx = getVariance(meanAx, this.axs);
      let varAy = getVariance(meanAy, this.ays);
      let varAz = getVariance(meanAz, this.azs);
      let varGx = getVariance(meanGx, this.gxs);
      let varGy = getVariance(meanGy, this.gys);
      let varGz = getVariance(meanGz, this.gzs);
      let varMx = getVariance(meanMx, this.mxs);
      let varMy = getVariance(meanMy, this.mys);
      let varMz = getVariance(meanMz, this.mzs);

      let prob = 1.0;
      for (let behav of this.behaviors) {
        let p1 = likelihood(meanAx, this.mean_mu_params[behav].AX, this.variance_mu_params[behav].AX);
        let p2 = likelihood(meanAy, this.mean_mu_params[behav].AY, this.variance_mu_params[behav].AY);
        let p3 = likelihood(meanAz, this.mean_mu_params[behav].AZ, this.variance_mu_params[behav].AZ);
        let p4 = likelihood(meanGx, this.mean_mu_params[behav].GX, this.variance_mu_params[behav].GX);
        let p5 = likelihood(meanGy, this.mean_mu_params[behav].GY, this.variance_mu_params[behav].GY);
        let p6 = likelihood(meanGz, this.mean_mu_params[behav].GZ, this.variance_mu_params[behav].GZ);
        let p7 = likelihood(meanMx, this.mean_mu_params[behav].MX, this.variance_mu_params[behav].MX);
        let p8 = likelihood(meanMy, this.mean_mu_params[behav].MY, this.variance_mu_params[behav].MY);
        let p9 = likelihood(meanMz, this.mean_mu_params[behav].MZ, this.variance_mu_params[behav].MZ);

        let p1v = likelihood(varAx, this.mean_var_params[behav].AX, this.variance_var_params[behav].AX);
        let p2v = likelihood(varAy, this.mean_var_params[behav].AY, this.variance_var_params[behav].AY);
        let p3v = likelihood(varAz, this.mean_var_params[behav].AZ, this.variance_var_params[behav].AZ);
        let p4v = likelihood(varGx, this.mean_var_params[behav].GX, this.variance_var_params[behav].GX);
        let p5v = likelihood(varGy, this.mean_var_params[behav].GY, this.variance_var_params[behav].GY);
        let p6v = likelihood(varGz, this.mean_var_params[behav].GZ, this.variance_var_params[behav].GZ);
        let p7v = likelihood(varMx, this.mean_var_params[behav].MX, this.variance_var_params[behav].MX);
        let p8v = likelihood(varMy, this.mean_var_params[behav].MY, this.variance_var_params[behav].MY);
        let p9v = likelihood(varMz, this.mean_var_params[behav].MZ, this.variance_var_params[behav].MZ);

        prob = p1 * p2 * p3 * p4 * p5 * p6 * p7 * p8 * p9;
        prob = prob * p1v * p2v * p3v * p4v * p5v * p6v * p7v * p8v * p9v;
        probabilities[behav] = prob;
      }

      let predictedBehavior = getMostLikelyBehavior(probabilities);
      this.behaviorsCounts[predictedBehavior] += 1;
      // console.log(predictedBehavior);
      this.callback({type: predictedBehavior});
      this.steps = 0;
      this.axs = [];
      this.ays = [];
      this.azs = [];
      this.gxs = [];
      this.gys = [];
      this.gzs = [];
      this.mxs = [];
      this.mys = [];
      this.mzs = [];
    }
    this.steps += 1;
  }
}

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

function likelihood(x, mu, sigma2) {
  let p = Math.sqrt(1.0 / (2 * Math.PI * sigma2)) * Math.exp(-0.5 * (x - mu) * (x - mu) / sigma2);
  return p;
}
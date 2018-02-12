/**
 * Created by LIn on 12/02/2018.
 */
frameSize = 100;

behaviors =["walk", "crouches", "still"];
priors = {};
priors["walk"] = 0.4;
priors["still"] = 0.4;
priors["crouch"] = 0.2;
behaviorsCounts = {};
mean_mu_params = {};
mean_var_params = {};
variance_mu_params = {};
variance_var_params = {};
var steps = 0;
var scale = 0.001;

axs = [];
ays = [];
azs = [];
gxs = [];
gys = [];
gzs = [];
mxs = [];
mys = [];
mzs = [];

for (var i = 0; i < behaviors.length; i++) {
    var behavior = behaviors[i];
    behaviorsCounts[behavior] = 0;
    var fileName = "saved_" + behavior + "_params.csv";
    $.ajax({
        type: "GET",
        url: fileName,
        dataType: "text",
        async: false,
        success: function(data) {readTrainedParams(behavior, data);}
    });
}

function readTrainedParams(behavior, data) {
    var lines = data.split(/\r\n|\n/);
    mean_mu_params[behavior] = lines[0].split(',');
    console.log("mean_mu of still: " + mean_mu_params['still']);
    mean_var_params[behavior] = lines[1].split(',');
    variance_mu_params[behavior] = lines[2].split(',');
    variance_var_params[behavior] = lines[3].split(',');
}

function handleIMUNotifications(event) {
    //read the IMU sensor data and plot the data out
    if (window.recording) {
        logEventNotifications(event)
    }
    let value = event.target.value;

    var ax = value.getInt16(1, true);
    var ay = value.getInt16(3, true);
    var az = value.getInt16(5, true);
    var gx = value.getInt16(7, true);
    var gy = value.getInt16(9, true);
    var gz = value.getInt16(11, true);
    var mx = value.getInt16(13, true);
    var my = value.getInt16(15, true);
    var mz = value.getInt16(17, true);
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
        var probabilities = {};
        var meanAx = getMean(axs);
        var meanAy = getMean(ays);
        var meanAz = getMean(azs);
        var meanGx = getMean(gxs);
        var meanGy = getMean(gys);
        var meanGz = getMean(gzs);
        var meanMx = getMean(mxs);
        var meanMy = getMean(mys);
        var meanMz = getMean(mzs);

        var varAx = getVariance(meanAx, axs);
        var varAy = getVariance(meanAy, ays);
        var varAz = getVariance(meanAz, azs);
        var varGx = getVariance(meanGx, gxs);
        var varGy = getVariance(meanGy, gys);
        var varGz = getVariance(meanGz, gzs);
        var varMx = getVariance(meanMx, mxs);
        var varMy = getVariance(meanMy, mys);
        var varMz = getVariance(meanMz, mzs);

        var prob = 1.0;
        for (var i = 0; i < behaviors.length; i++) {
            var behav = behaviors[i];
            var p1 = likelihood(meanAx, mean_mu_params[behav][0], variance_mu_params[behav][0]);
            var p2 = likelihood(meanAy, mean_mu_params[behav][1], variance_mu_params[behav][1]);
            var p3 = likelihood(meanAz, mean_mu_params[behav][2], variance_mu_params[behav][2]);
            var p4 = likelihood(meanGx, mean_mu_params[behav][3], variance_mu_params[behav][3]);
            var p5 = likelihood(meanGy, mean_mu_params[behav][4], variance_mu_params[behav][4]);
            var p6 = likelihood(meanGz, mean_mu_params[behav][5], variance_mu_params[behav][5]);
            var p7 = likelihood(meanMx, mean_mu_params[behav][6], variance_mu_params[behav][6]);
            var p8 = likelihood(meanMy, mean_mu_params[behav][7], variance_mu_params[behav][7]);
            var p9 = likelihood(meanMz, mean_mu_params[behav][8], variance_mu_params[behav][8]);

            var p1v = likelihood(varAx, mean_var_params[behav][0], variance_var_params[behav][0]);
            var p2v = likelihood(varAy, mean_var_params[behav][1], variance_var_params[behav][1]);
            var p3v = likelihood(varAz, mean_var_params[behav][2], variance_var_params[behav][2]);
            var p4v = likelihood(varGx, mean_var_params[behav][3], variance_var_params[behav][3]);
            var p5v = likelihood(varGy, mean_var_params[behav][4], variance_var_params[behav][4]);
            var p6v = likelihood(varGz, mean_var_params[behav][5], variance_var_params[behav][5]);
            var p7v = likelihood(varMx, mean_var_params[behav][6], variance_var_params[behav][6]);
            var p8v = likelihood(varMy, mean_var_params[behav][7], variance_var_params[behav][7]);
            var p9v = likelihood(varMz, mean_var_params[behav][8], variance_var_params[behav][8]);

            prob = p1 * p2 * p3 * p4 * p5 * p6 * p7 * p8 * p9;
            prob = prob * p1v * p2v * p3v * p4v * p5v * p6v * p7v * p8v * p9v;
            probabilities[behav] = prob;
        }

        var predictedBehavior = getMostLikelyBehavior(probabilities);
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
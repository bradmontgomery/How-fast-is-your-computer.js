/* given an array of values, calculate and return the mean */
var mean = function(values) {
    var sum = 0;
    for(var i = 0; i < values.length; i++) {
        sum += values[i];
    }
    return Math.round(sum / values.length);
};


var getOperands = function(dataType) {
    var operands;
    switch(dataType) {
        case "integer":
            operands = [
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100)
            ];
            break;
        case "float":
            operands = [Math.random(), Math.random() * 100];
    }
    return operands.sort();
};


var calculate = function(config, results) {
    var operands, start, end, _;
    switch(config.operation) {
        case "addition":
            start = new Date();
            for(x=0; x < config.numCalculations; x++) {
                operands = getOperands(config.dataType);
                _ = operands[0] + operands[1];
            }
            end = new Date();
            results.push(end - start);
            break;
        case "subtraction":
            start = new Date();
            for(x=0; x < config.numCalculations; x++) {
                // Note, operands are sorted smallest-largest.
                _ = operands[1] - operands[0];
            }
            end = new Date();
            results.push(end - start);
            break;
        case "multiplication":
            start = new Date();
            for(x=0; x < config.numCalculations; x++) {
                _ = operands[0] * operands[1];
            }
            end = new Date();
            results.push(end - start);
            break;
        case "division":
            start = new Date();
            for(x=0; x < config.numCalculations; x++) {
                _ = operands[0] / operands[1];
            }
            end = new Date();
            results.push(end - start);
            break;
    }

};

var run = function(config) {
    var results = [];  // array of time to computer on each iteration.
    var mean_results = 0; // mean time after all iterations.

    for(var i=0; i < config.iterations; i++) {
        calculate(config, results);
    }
    mean_results = mean(results);
    console.log("Ran " + config.iterations + "iterations.");
    console.log("Completed in a mean time of: " + mean_results);
    return mean_results;
};


// set up web worker communication.
onmessage = function(e) {
    m = run(e.data);
    postMessage(m);
};

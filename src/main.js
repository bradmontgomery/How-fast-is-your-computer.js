var build = function() {
    return {
        numCalculations: parseInt(document.getElementById("numCalculations").value),
        dataType: document.getElementById("dataType").value,
        operation: document.getElementById("operation").value,
        iterations: parseInt(document.getElementById("iterations").value)
    };
};


var runExperiment = function() {
    var config = build();
    var button = document.getElementById("run");
    var msg = document.getElementById("message");
    msg.innerHTML = "Running calculations. Please Wait...";
    button.disabled = true;
    if(!!window.Worker) {
        var w = new Worker("worker.js");
        w.postMessage(config);
        w.onmessage = function(e) {
            document.getElementById("time").innerHTML = e.data;
            button.disabled = false;
            msg.innerHTML = "Done!";
        };
    }

};
document.getElementById("run").onclick = runExperiment;

(function(global) {
  var WORKER_PATH = 'wav2speexWorker.js';
  var encodeSpeex = function() {
    var wavBuffer, workerPath, callback, worker;
    if (arguments.length == 2) {
      wavBuffer = arguments[0];
      callback = arguments[1];
    } else {
      wavBuffer = arguments[0];
      workerPath = arguments[1];
      callback = arguments[2];
    }

    workerPath = workerPath || WORKER_PATH;
    worker = new Worker(workerPath);
    worker.postMessage(wavBuffer);

    worker.onmessage = function(e) {
      callback(e.data);
    }
  }
  global.Wav2Speex = {
    encode: encodeSpeex
  }
}(this));
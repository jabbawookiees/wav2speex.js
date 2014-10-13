# wav2speex.js

This is a very simple wrapper around speex.js. Encodes WAV into speex and puts it in an .ogg format.

Usage is as follows:

`Wav2Speex.encode(ArrayBuffer, workerScriptURL, callback)`

* arrayBuffer - An [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) with WAV data. Obtainable by reading a file, for example.
* workerScriptURL - Where wav2speexWorker.js is located
* callback - This callback function will be passed an ArrayBuffer containing ogg-formatted, speex-encoded data.

This fires an asynchronous Web Worker to do the encoding.


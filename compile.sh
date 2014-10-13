#! /bin/bash
mkdir -p dist
cp src/wav2speex.js dist/wav2speex.js
cat lib/bitstring.js lib/pcmdata.js lib/speex.js src/wav2speexWorker.js > dist/wav2speexWorker.js
uglifyjs dist/wav2speex.js -cmo dist/wav2speex.min.js
uglifyjs dist/wav2speexWorker.js -cmo dist/wav2speexWorker.min.js

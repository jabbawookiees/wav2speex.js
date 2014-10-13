(function(global) {
  var wavDemux = function(buf) {
    var filebuf = new Uint8Array(buf)
      , wavHeader = filebuf.subarray(0, 44)
      , wavData = filebuf.subarray(44)
      , pcm = PCMData.decode(String.fromCharCode
            .apply(null, wavHeader));
    pcm.samples = new Int16Array(wavData.buffer);
    return pcm;
  };

  var encodeSpeex = function(arrayBuffer) {
    var pcm = wavDemux(arrayBuffer)
      , isNarrowband = pcm.sampleRate < 16000
      , spxcodec = new Speex({
           quality: 8
         , mode: isNarrowband ? 0 : 1
         , bits_size: isNarrowband ? 38 : 70
      })
      , spxhdr, spxcmt, spxdata
      , oggdata = new Ogg(null, {file: true}), r;

    spxcodec.bits_size = isNarrowband ? 15 : 70;
    start = new Date();
    spxdata = spxcodec.encode(pcm.samples, true);
    spxhdr = new SpeexHeader({
      bitrate: -1,
      extra_headers: 0,
      frame_size: isNarrowband ? 160 : 320,
      frames_per_packet: 1,
      header_size: 80,
      mode: isNarrowband ? 0 : 1,
      mode_bitstream_version: 4,
      nb_channels: 1,
      rate: pcm.sampleRate,
      reserved1: 0,
      reserved2: 0,
      speex_string: "Speex   ",
      speex_version_id: 1,
      speex_version_string:
        "1.2rc1\0\0\0\0\0\0\0\0\0\0\0\0\0\0",
      vbr: 0
    });

    spxcmt = "Encoded with speex.js";
    spxcmt = new SpeexComment({
      vendor_string: spxcmt
      , vendor_length: spxcmt.length
    });
    return oggdata.mux([spxhdr.raw, spxcmt.raw, spxdata]);
  }

  this.onmessage = function(e) {
    buffer = e.data;
    str = encodeSpeex(buffer);
    arrayBuffer = Speex.util.str2ab(str);
    postMessage(arrayBuffer);
    this.close();
  }
}(this));

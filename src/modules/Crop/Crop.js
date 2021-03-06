module.exports = function Crop(input,options,callback) {

  var getPixels = require("get-pixels"),
      savePixels = require("save-pixels"),
      base64 = require('base64-stream');

  getPixels(input.src,function(err,pixels){
    var newdata = [];
    var ox = options.x || 0;
    var oy = options.y || 0;
    var w = options.w || Math.floor(0.5*pixels.shape[0]);
    var h = options.h || Math.floor(0.5*pixels.shape[1]);
    var iw = pixels.shape[0]; //Width of Original Image
    newarray = new Uint8Array(4*w*h);
    for (var n = oy; n < oy + h; n++) {
      newarray.set(pixels.data.slice(n*4*iw + ox, n*4*iw + ox + 4*w),4*w*(n-oy));
    }
    pixels.data = newarray;
    pixels.shape = [w,h,4];
    pixels.stride[1] = 4*w;

    options.format = "jpeg";

    w = base64.encode();
    var r = savePixels(pixels, options.format);
    r.pipe(w).on('finish',function(){
      data = w.read().toString();
      datauri = 'data:image/' + options.format + ';base64,' + data;
      callback(datauri,options.format);
    });
  });

}

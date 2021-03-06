/*
 * Image Cropping module
 * Usage:
 *    Expected Inputs:
 *      options.x : x-coordinate of image where the modules starts cropping | default : 0
 *      options.y : y-coordinate of image where the modules starts cropping | default : 0
 *      options.w : width of the resulting cropped image | default : 50% of input image width
 *      options.h : height of the resulting cropped image | default : 50% of input image height
 *    Output:
 *      The cropped image, which is essentially a rectangle bounded by the lines:
 *          x = options.x
 *          x = options.x + options.w
 *          y = options.y
 *          y = options.y + options.h
 */
 module.exports = function CropModule(options) {
   options = options || {};
   options.title = "Crop Image";
   var this_ = this;
   var output

   function draw(input,callback) {

     const this_ = this;

     require('./Crop')(input,options,function(out,format){
       this_.output = {
         src: out,
         format: format
       }
       callback();
     });


   }

   return {
     options: options,
     draw: draw,
     output: output
   }
 }

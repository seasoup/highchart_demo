var Slider = (function () {
  return {
    slider: {},
    
    create: function (options, callback) {
      this.set(options, callback);
      return this;
    },

    label:  function (name) {
      $( "#amount" ).val( name );
    },
    
    value: function (value) {
      $( "#slider" ).slider( 'value', value );
    },

    set: function (options, callback) {
      this.slider = $( "#slider" ).slider({
        value: 0,
        min:   0,
        max:   options.max,
        step:  1,
        change: callback,
        slide: callback
      });
    }
  };
})();
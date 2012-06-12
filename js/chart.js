var Highchart = (function () {
  return { 
    chart: {},
    chart_data: [],
    slider: {},
    
    loadChart: function () {
      var hash = location.hash.substr(1),
        num    = parseInt(hash, 10),
        the_hash_is_not_a_number = isNaN(num), 
        data;

      if (the_hash_is_not_a_number) {
        num = 0;
      }
      
      data = this.chart_data[num];
      
      this.slider.label( data.name );
      this.slider.value( num );
      this.update( data );
    },
    create: function() {
      this.preloadImages();
    
      this.chart = new Highcharts.Chart({
        'chart':   { 
          type: 'spline', 
          renderTo: 'container', 
          turboThreshold: 1, 
          plotBackgroundImage: 'images/maps/map_1.gif',
          borderRadius: 4
        },
        
        'title':   { 
          text: 'iPhone Ringers Turned On / Off',
          style: {
            fontSize: '20px',
            color: '#5e5e5e'
          } 
        },
        
        'subtitle': {
          style: {
            text: 'by Timezone',
            color: '#5e5e5e'
          }
        },
        
        'credits': { enabled: false },
        
        'tooltip': {
          valueSuffix: ",000",
          pointFormat: '{series.name}: <b>{point.y}</b><br/>',
          shared:      true,
          borderColor: '#aaa',
          crosshairs:  true
        },
        
        'legend': {
          align: 'left',
          verticalAlign: 'top',
          y: 10,
          x: 65,
          floating: true,
          borderWidth: 1,
          backgroundColor: '#fff'
        },
        
        'xAxis': {
          categories: [
            '12am','1am','2am','3am','4am','5am','6am','7am','8am','9am','10am','11am',
            '12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm'
          ]
        },
        
        'yAxis': {
          title: { text: '# of iPhones (in thousands)', style: { color: '#5e5e5e' } },
          minRange: 0,
          min: 0,
          max: 1500
        },
        
        'series': [
          {
            id  : "ringer_on", 
            name: 'Ringer Turned On',
            data: [],
            color: 'green'
          }, 
          {
            id  : "ringer_off", 
            name: 'Ringer Turned Off',
            data: [],
            color: 'darkred'
          }
        ]
      });
      var chart = this;
      $(window).bind('hashchange', function () { chart.loadChart(); });
      return this;
    },
    
    fetch: function (options, callback) {
      $.ajax({
        url:      options.url, 
        dataType: 'text',
        success:  callback
      });
    },
    
    update: function (data) {
      this.chart.setTitle( 
      { text: 'iPhone Ringers Turned On / Off' },
      { text:  'by Timezone (' + data.name.toUpperCase() + ')' });
      $('.highcharts-container image').attr('href', "images/maps/map_" + data.map_id + ".gif");
      this.chart.get( 'ringer_on'  ).setData( data.ringer_on  );
      this.chart.get( 'ringer_off' ).setData( data.ringer_off ); 
    },
    
    processData: function (data) {
      var lines = data.split('\n'), 
        line,
        next_line,
        lineNo;
      
      for (lineNo = 0; lineNo < lines.length; lineNo += 2) {
        line   = lines[lineNo], 
        ringer_on  = this.processLine(line),
        next_line  = lines[lineNo + 1],
        ringer_off = this.processLine(next_line);

        this.chart_data.push({
          name:       ringer_on.data_id,
          map_id:     ringer_on.map_id,
          ringer_on:  ringer_on.data,
          ringer_off: ringer_off.data
        });
      }
    },
    
    processLine: function(line) {
      var items   = line.split( ',' ),
        data_id   = items.shift(),
        series_id = items.shift(),
        map_id    = items.shift(),
        data      = $.map( items, function ( item ) {
          return parseInt(item, 10);
        });
      return {data_id: data_id, series_id: series_id, map_id: map_id, data: data}
    },
    
    preloadImages: function () {
      for (var a=1; a < 24; a++) {
        new Image().src = 'images/maps/map_' + a + '.gif';
      }
    }
  }
})();
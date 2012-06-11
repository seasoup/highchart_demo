This is a demo of highcharts.  It fetches the data from a csv using jQuery .get() method, so it does not work locally in chrome 
unless you start chrome with the --allow-file-access-from-files option.  This chart also incorporates the use of a jQuery 
slider to control which time zone of data you are looking at.  The background of the chart highlights the timezone that you are currently
looking at, the mapping between the image and the actual timezones is not accurate.

The updating of the chart is actually driven by the url, the jquery slider just updates the url hash which triggers a hash change event on
the window, which looks at the number after the hash and updates the chart to that number timezone.  This lets you save the url and email or
chat it to someone and have them see the exact same chart that you were looking at with all of the same settings.  This is a great way to
control charts because it lets you pass all the settings along when emailing it to someone.  A more advanced version of this would become
a name/value pair listing so that multiple parameters can be passed at the same time.  Another side effect, you can use the back and forward buttons to
navigate through the changes you've made to the chart.  Nifty!

If you are familiar with Single Page Applications, this is old hat.  The hash change event would be processed by a client side router and
update the page based on the hash changes.
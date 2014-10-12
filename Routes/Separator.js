var groupAPI  =  require("../index");
var email = require("../Email/EmailConfig");
var unirest = require('unirest');
var dot = require('dot');
var sendgrid  = require('sendgrid')('apenchev', 'pendel148');

var timeouts = function(){
	var timeInMs  =  Date.now(),
		morning = 1*1000*60*60* 9,
		noon = 1*1000*60*60*13,
		evening = 1*1000*60*60*18;

	var morningTimeOut = morning-timeInMs,
		noonTimeOut = noon-timeInMs;
	eveningTimeOut = evening-timeInMs;

	var timeouts = [];

	if (morningTimeOut>0)
		timeouts[0] = morningTimeOut;
	else
		timeouts[0] = -1;

	if (noonTimeOut>0)
		timeouts[1] = noonTimeOut;
	else
		timeouts[1] = -1;

	if(eveningTimeOut>0)
		timeouts[2] = eveningTimeOut;
	else
		timeouts[2] = -1;

	return timeouts;
};

var tasksList;
var toEmail;
var city;

var forTimePeriodI = 0;
var forTimePeriodLength;

var Tesco = [];
var Concert = {};
var Map;

var toEmail;
var city;

function forTimePeriod() {
	forTaskListI = 0;
	if (forTimePeriodI == forTimePeriodLength) {
		console.log('Success.');
		var suppliedData = {tesco: Tesco, concert: Concert, map: Map};
		var html = '<!DOCTYPE html><html style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;margin: 0;padding: 0;"><head><meta http-equiv="Content-Type" content="text/html;charset=utf-8"><meta name="viewport" content="width=device-width"><meta charset="utf-8"><title>ZURBemails</title></head><body bgcolor="#FFFFFF" topmargin="0" leftmargin="0" marginheight="0" marginwidth="0" style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;-webkit-font-smoothing: antialiased;-webkit-text-size-adjust: none;width: 100% !important;height: 100%;margin: 0;padding: 0;"><table bgcolor="" style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;width: 100%;margin: 0;padding: 0;"><tr style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;margin: 0;padding: 0;"><td style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;margin: 0;padding: 0;"></td><td align="" bgcolor="#FFFFFF" style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;display: block !important;max-width: 600px !important;clear: both !important;margin: 0 auto;padding: 0;">{{~it.tesco :prod:index}}<div style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;max-width: 600px;display: block;margin: 0 auto;padding: 15px;"><table bgcolor="" style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;width: 100%;margin: 0;padding: 0;"><tr style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;margin: 0;padding: 0;"><td width="20%" style="vertical-align: top;font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;margin: 0;padding: 0 10px 0 0;" valign="top"><img src="{{=prod.img_url}}" style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;max-width: 100%;margin: 0;padding: 0;"></td><td style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;margin: 0;padding: 0;"><h4 style="font-family: \'HelveticaNeue-Light\', \'Helvetica Neue Light\', \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif;line-height: 1.1;color: #000;font-weight: 500;font-size: 23px;margin: 0 0 15px;padding: 0;">{{=prod.title}}<small style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;font-size: 60%;color: #6f6f6f;line-height: 0;text-transform: none;margin: 0;padding: 0;">{{=prod.price}}</small></h4><a href="{{=prod.url}}" style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;color: #FFF;text-decoration: none;font-weight: bold;text-align: center;cursor: pointer;display: block !important;background-image: none !important;background-color: #666;margin: 0 0 10px;padding: 10px 16px;">Clickity Click »</a></td></tr></table></div>{{~}}<div style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;max-width: 600px;display: block;margin: 0 auto;padding: 15px;"><table bgcolor="" style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;width: 100%;margin: 0;padding: 0;"><tr style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;margin: 0;padding: 0;"><td style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;margin: 0;padding: 0;"><h3 style="font-family: \'HelveticaNeue-Light\', \'Helvetica Neue Light\', \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif;line-height: 1.1;color: #000;font-weight: 500;font-size: 27px;margin: 0 0 15px;padding: 0;">Concert</h3></td></tr></table></div><div style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;max-width: 600px;display: block;margin: 0 auto;padding: 15px;"><table bgcolor="" style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;width: 100%;margin: 0;padding: 0;"><tr style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;margin: 0;padding: 0;"><td width="20%" style="vertical-align: top;font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;margin: 0;padding: 0 10px 0 0;" valign="top"></td><td style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;margin: 0;padding: 0;"><h4 style="font-family: \'HelveticaNeue-Light\', \'Helvetica Neue Light\', \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif;line-height: 1.1;color: #000;font-weight: 500;font-size: 23px;margin: 0 0 15px;padding: 0;">{{=it.concert.title}}<small style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;font-size: 60%;color: #6f6f6f;line-height: 0;text-transform: none;margin: 0;padding: 0;">{{=it.concert.date}}</small></h4><p style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;font-weight: normal;font-size: 14px;line-height: 1.6;margin: 0 0 10px;padding: 0;">{{=it.concert.venue}},{{=it.concert.city}}</p><a href="{{=it.concert.url}}" style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;color: #FFF;text-decoration: none;font-weight: bold;text-align: center;cursor: pointer;display: block !important;background-image: none !important;background-color: #666;margin: 0 0 10px;padding: 10px 16px;">Clickity Click »</a></td></tr></table></div><div style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;max-width: 600px;display: block;margin: 0 auto;padding: 15px;"><table style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;width: 100%;margin: 0;padding: 0;"><tr style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;margin: 0;padding: 0;"><td style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;margin: 0;padding: 0;"><h1 style="font-family: \'HelveticaNeue-Light\', \'Helvetica Neue Light\', \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif;line-height: 1.1;color: #000;font-weight: 200;font-size: 44px;margin: 0 0 15px;padding: 0;">Great Scott!</h1><p style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;font-weight: normal;font-size: 17px;line-height: 1.6;margin: 0 0 10px;padding: 0;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et.</p><p style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;font-weight: normal;font-size: 14px;line-height: 1.6;margin: 0 0 10px;padding: 0;"><img src="{{=it.map}}" style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;max-width: 100%;margin: 0;padding: 0;"></p></td></tr></table></div></td><td style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;margin: 0;padding: 0;"></td></tr></table><table style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;width: 100%;clear: both !important;margin: 0;padding: 0;"><tr style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;margin: 0;padding: 0;"><td style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;margin: 0;padding: 0;"></td><td style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;display: block !important;max-width: 600px !important;clear: both !important;margin: 0 auto;padding: 0;"><div style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;max-width: 600px;display: block;margin: 0 auto;padding: 15px;"><table style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;width: 100%;margin: 0;padding: 0;"><tr style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;margin: 0;padding: 0;"><td align="center" style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;margin: 0;padding: 0;"><p style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;font-weight: normal;font-size: 14px;line-height: 1.6;margin: 0 0 10px;padding: 0;"><a href="#d41d8cd98f00b204e9800998ecf8427e" style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;color: #2BA6CB;margin: 0;padding: 0;">Terms</a> |<a href="#d41d8cd98f00b204e9800998ecf8427e" style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;color: #2BA6CB;margin: 0;padding: 0;">Privacy</a> |<a href="#d41d8cd98f00b204e9800998ecf8427e" style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;color: #2BA6CB;margin: 0;padding: 0;"><unsubscribe style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;margin: 0;padding: 0;">Unsubscribe</unsubscribe></a></p></td></tr></table></div></td><td style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif;margin: 0;padding: 0;"></td></tr></table></body></html>';
		var tempFn = dot.template(html);
		var resultText = tempFn(suppliedData);
		console.log(resultText);
		sendgrid.send({
		  to:       toEmail,
		  from:     'atanas.penchev@outlook.com',
		  subject:  'Spiffy Digest',
		  html:     resultText
		}, function(err, json) {
		  if (err) { return console.error(err); }
		  console.log(json);
		});

		return;
	}
	forTaskList();
}

var forTaskListI;
var forTaskListLength = 0;

function forTaskListNext() {
	forTaskListI++;
	forTaskList();
}

function forTaskList() {

	if (forTaskListI == tasksList[forTimePeriodI].length) {
		forTimePeriodI++;
		forTimePeriod();
		return;
	}
	
	var task = tasksList[forTimePeriodI][forTaskListI];
	var taskText = '';
	var taskGroup = '';

	if (task.length > 1) {
		taskText = tasksList[forTimePeriodI][forTaskListI][1];
	} else {
		taskText = tasksList[forTimePeriodI][forTaskListI][0];
	}
	console.log('About to group: ' + forTimePeriodI + ' ' + forTaskListI + ' ' + taskText);
	taskGroup = groupAPI.find(taskText);
	
	switch(taskGroup) {
		case 'grocery':
			var matches = groupAPI.getGroceryMatches(taskText);

			for (var i = 0; i < matches.length; i++) {
	            var grocery = matches[i];
	            var url = 'https://www.kimonolabs.com/api/7m933hrw?apikey=Xsl3cYFlK0VE1yiHq8HJ1yW9UMwt4lPV&searchBox=' + grocery;
	            unirest.get(url).end(function(response) {
	            	//console.log(response.body.results.Tesco[0]);
	            	var prod = response.body.results.Tesco[0];
	            	Tesco.push({
	            		title: prod.name.text,
	            		price: prod.price,
	            		category: grocery,
	            		img_url: prod.image.src,
	            		url: prod.name.href
	            	});
	            	console.log(Tesco);
	            	forTaskListNext();
	            });
	        }
	        break;
		case 'band':
			var matches = groupAPI.getArtistMatches(taskText);

			for (i = 0; i < matches.length; i++) {
	        	var artist = matches[i];
	        	artist = artist.replace(' ', '+');
	        	city = city.replace(' ', '+');
	        	var url = 'http://api.eventful.com/json/events/search?app_key=5d6RcT8nZgJDFLNt&keywords=' + artist + '&location=' + city + '&date=Future';
	        	unirest.get(url).end(function(response) {
	        		var ev = JSON.parse(response.body).events.event[0];

	        		Concert.title = ev.title;
	        		Concert.venue = ev.venue_address;
	        		Concert.city = ev.city_name;
	        		Concert.date = ev.start_time;
	        		Concert.url = ev.url;
	        		console.log(Concert);

	            	forTaskListNext();
	            });
	        }
			break;
		case 'address':
			console.log('This is a map.');

			var re = /([1-9]+.+?(Road|Street|St|Rd|st|street|rd|road))/;
			var street = taskText.match(re);
			street = street[0];
			street = street.replace(' ', '+');
			var url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + street + '+' + city;
			unirest.get(url).end(function(response) {
				var loc = response.body.results[0].geometry.location;
				Map = 'http://maps.googleapis.com/maps/api/staticmap?center=' + street + '+' + city + '&zoom=13&size=600x300&maptype=roadmap&markers=color:green%7Clabel:S%7C' + loc.lat + ',' + loc.lng;
	        	//var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + street + ', ' + city;
	        	forTaskListNext();
	        });
			break;
	}
}

exports.route = function(req,res){
	
	// POST data
	tasksList = req.body.tasksList;
	toEmail = req.body.email;
	city = req.body.city;

	console.log(tasksList);
	console.log(toEmail);
	console.log(city);

	/*tasksList = [
		[['11', 'go to get some beer']],
		[['17', 'I would not also mind some oranges']],
		[['8', 'some bon jovi madness'], ['21', 'After I visit Pavlo on 31 New City St']],
		[['milk']]
	];
	toEmail = 'atanaspich@gmail.com';
	city = 'Glasgow';*/

	var task;
	var taskText;
	var taskGroup;

	forTimePeriodLength = tasksList.length;
	forTimePeriod();

		/*switch (timePeriod) {
			case 0:
				if (timeouts()[0] !== -1) {
					var subject = ""; //add subject info
					var htmlBody = ""; //add body
					setTimeout(email.sendEmail(toEmail, subject, htmlBody), timeout()[0]);
				}
				//setTimeout(function() { email.sendEmail(toEmail, subject, htmlBody); }, 2000);
				break;
			case 1:
				if (timeouts()[1]!== -1){
					var subject = ""; //add subject info
					var htmlBody = ""; //add body
					setTimeout(email.sendEmail(toEmail, subject, htmlBody), timeout()[1]);
				}
				break;
			case 2:
				if (timeouts()[2] !== -1) {
					var subject = ""; //add subject info
					var htmlBody = ""; //add body
					setTimeout(email.sendEmail(toEmail, subject, htmlBody), timeout()[2]);
				}
				break;
			case 3:
				for (i = 0; i < 3; i++) {
					if (timeout()[i] !== -1) {
						var subject = ""; //add subject info
						var htmlBody = ""; //add body
						setTimeout(email.sendEmail(toEmail, subject, htmlBody), timeout()[1]);
						break;
					}
				} // for (i = 0

		} // switch

	} // for(timePeriod
	*/
}; //  exports.route

var timeouts = function(){
	var timeInMs  =  Date.now(),
		morning = 1*1000*60*60* 9,
		noon = 1*1000*60*60*13,
		evening = 1*1000*60*60*18;

	var morningTimeOut = morning-timeInMs,
		noonTimeOut = noon-timeInMs;
		eveningTimeOut = evening-timeInMs;

	var timeouts = [];

	if (morningTimeOut>0)
		timeouts[0] = morningTimeOut;
	else
		timeouts[0] = -1;

	if (noonTimeOut>0)
		timeouts[1] = noonTimeOut;
	else
		timeouts[1] = -1;

	if(eveningTimeOut>0)
		timeouts[2] = eveningTimeOut;
	else
		timeouts[2] = -1;

	return timeouts;
};
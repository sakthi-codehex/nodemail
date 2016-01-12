var api_key = 'key-202621ef3bda58743661d2e163bdac15';
var domain = 'sandbox9fe370943eb44419ba8bd90a81ac6fdf.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var http = require('http');
var qs = require('querystring');
const PORT=8080;

function handleRequest(request, response){
var qs = require('querystring');
if (request.method == 'POST') {
    var body = '';
    request.on('data', function (data) {
        body += data;
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6) {
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            request.connection.destroy();
        }
    });
    request.on('end', function () {

        var POST = qs.parse(body);
        console.log(POST.username);
        console.log(POST.company);
        console.log(POST.pos);
        console.log(POST.contact);
        console.log(POST["companyemail"]);
	console.log(POST.country);
	var uname = POST.username;
        var comp = POST.company;
        var posi = POST.pos;
        var cont = POST.contact;
        var cemail = POST.companyemail;
        var count = POST["country"];
	var fulldata = " <br/><p><strong> Username:</strong></p>" +uname+ " <br/><p><strong> Company:</strong></p>" +comp+ "<br/><p><strong> Position:</strong></p> " +posi+ " <br/><p><strong> Contact Number:</strong></p>" +cont+ "<br/><p><strong> Company Email: </strong></p> " + cemail + "<br/><p><strong> Country:</strong></p> " +count+ " ";
        var datas = {
            from: 'sakthi.codehex <postmaster@sandbox9fe370943eb44419ba8bd90a81ac6fdf.mailgun.org>',
            to: 'request.boston@gmail.com',
            subject: 'Contact Request',
            html: fulldata
        };
        mailgun.messages().send(datas, function (error, bodye) {
            console.log(bodye);
        });
    });
}   
        response.end('It Works!! Path Hit: ' + request.url);
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        
}
    //Create a server
    var server = http.createServer(handleRequest);

    //start server
    server.listen(process.env.PORT, function(){
        //Callback triggered when server is successfully listening.
        //console.log("Server listening on: http://localhost:%s", PORT);
    });
var sg_username = "apenchev",
    sg_password = "pendel148",
    from_address = "alex9407@abv.bg ",
    to_address = "",
    subject = "",
    text_body = "",
    html_body = "";


exports.sendEmail=function(toAddress,subjectInfo,htmlBody){

    to_address=toAddress;
    subject=subjectInfo;
    text_body="";
    html_body=htmlBody;

    var sendgrid = require("sendgrid")(sg_username, sg_password);

    try {
        sendgrid.send({
            to:         to_address,
            from:       from_address,
            subject:    subject,
            text:       text_body,
            html:       html_body
        }, function(err, json) {
            if (err) return console.error(err);
            console.log(json);
        });
    } catch(e) {
        console.log(e);
    }
};



/* ADD THE ATTACHMENT
 *===========================================*/
//email.addFile({
//    path: "sendgrid_logo.jpg"
//});



/* SEND THE EMAIL
 *===========================================*/
//sendgrid.send(email, function(err, json) {
//    if (err) return console.log(err);
//    console.log(json);
//});
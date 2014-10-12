/**
 * Created by Ip-Consult on 07.10.2014.
 */

exports.index=function (req,res){
    var data={title1:"ivan", source:123};
    //Getting data from the user
    // console.dir(req.files.picture);
    //db.addCustomer({name:req.body.name}); // in case of postrequest
    //db.addCustomer({name:req.params.name}); // in case of get request exp: url/?id=5&...
    res.render("view1",data);
};
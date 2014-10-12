/**
 * Created by Ip-Consult on 07.10.2014.
 */
exports.CreateCustomer=function(req,res){
    console.dir(req.files.picture);
    db.addCustomer({name:req.body.name});
    res.redirect('customer');
};
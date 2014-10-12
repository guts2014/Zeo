/**
 * Created by Ip-Consult on 07.10.2014.
 */

exports.picture=function(req,res){
    var customer =db.getCustomerById(req.params.id);
    if (req.query.attachment==='true'){ // if localhost:1234/customer/picture/3?attachment=true
        res.download(customer.picture);//address to picture -> offer the client to download the picture
    }
    else
    {
        res.sendfile(customer.picture); //load the picture
    }
};
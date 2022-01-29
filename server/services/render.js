const axios=require("axios");


exports.homeRoute=(req,res) => {
    //Make a get request to /api/users
    axios.get("http://localhost:5000/api/users")
    .then(function(response){
        console.log(response.data)
        res.render('index',{users:response.data})
    })
    .catch(err=>{
        res.send(err)
    })
}

exports.add_user=(req,res) => {
    res.render('add_user')
}

exports.update_user=(req,res) => {
    axios.get("http://localhost:5000/api/users",{params:{id:req.query.id}})
    .then(function(userdata){
        res.render('update_user',{user:userdata.data})
    })
    .catch(err=>{
        res.send(err)
    })
}
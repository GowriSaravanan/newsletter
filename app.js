const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const client = require("@mailchimp/mailchimp_marketing");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})


app.post("/",function(req,res){
  const firstName=req.body.fname;
  const lastName=req.body.lname;
  const email=req.body.email;

  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData=JSON.stringify(data);

  const url = "https://us2.api.mailchimp.com/3.0/lists/030b3cea8b";

  const options={
      method:"POST",
      auth:"gows14:ab1af24a7fe178ab5eb893edfc57909c-us21"
    }
    const request=https.request(url,options,function(response){
      if (response.statusCode===200)
      {
        res.sendFile(__dirname+"/success.html");
      }
      else{
        res.sendFile(__dirname+"/failure.html");

      }
      response.on("data",function(data){
        console.log(JSON.parse(data));

      })
  })

request.write(jsonData);
request.end();

});
//ab1af24a7fe178ab5eb893edfc57909c-us21
//030b3cea8b

app.post("/failure",function(req,res){
  res.redirect("/");
})


app.listen(process.env.PORT || 3000,function() {
  console.log("Server 3000 is Running ");
})

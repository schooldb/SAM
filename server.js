var express = require("express");

var mysql = require("mysql");
var md5 = require("MD5");
var session = require('express-session');
var app = express();
var multer = require('multer');
var fs = require('fs');
var parseXlsx = require('excel');
var datetime = require('node-datetime');
var _ = require("underscore");
app.use(express.bodyParser());
/*
* Configure MySQL parameters.
*/
app.use(function (req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});
var connection = mysql.createConnection({
host : "localhost",
user : "root",
password : "123",
database : "test"
});

/*Connecting to Database*/

connection.connect(function(error){
if(error)
{
console.log("Problem with MySQL"+error);
}
else
{
console.log("Connected with Database");
}
});


/*
* Here we will call Database.
* Fetch news from table.
* Return it in JSON.
*/
 app.get('/excelchk',function(req,res){
parseXlsx('./uploads/WMBE Attendee Data Updated.xlsx', function(err, data) {
  if(err) throw err;
  console.log(data[0]);
	// data is an array of arrays
});
});
 
  
  app.post('/upload', function(req, res) {
var classdetails=JSON.parse(req.body.data);

			fs.readFile(req.files.file.path, function (err, data) {
			  var newPath =  "./uploads/student.xlsx";
			  fs.writeFile(newPath, data, function (err) {
			  });
			  parseXlsx(newPath, function(err, data) {
		  			if(err) throw err;

		  			for(i=1;i<data.length;i++)
		  			{
		  				
		  				
		  					var dt = datetime.create();
							var fomratted = dt.format('Y/m/d H:M:S');
				  			 var post  = {
				  			 studentName: data[i][1], 
				  			 rollNo: data[i][0],
				  			 className:classdetails.standard,
				             sectionName:classdetails.section,
				             fatherName:data[i][2],
				             contactNumber:data[i][3],
				             contactAddress:data[i][4],
				             createdOn:fomratted
				  			 };

				  			var query = connection.query('INSERT INTO student SET ?', post, function(err, result) {
				                    if(!err){
				                    		res.end("1");
				                    	}else
				                    	{
				                    			res.end("0");
				                    	}
								});
				  			
		  			}
				
			
				});
			});

	
  
	 
});
	   
   

app.get('/load',function(req,res){
			connection.query("SELECT * from employees",function(err,rows){
						if(err)
						{
								console.log("Problem with MySQL"+err);
						}
						else
						{
							 res.end(JSON.stringify(rows));
						}
			});
});

app.post('/loginch1k', function(req, res){
  var user_name=req.body.email;
  //res.send(user_name);
  var password=md5(req.body.password);
  //res.send(password);
  connection.query("SELECT * from employees where name='"+user_name+"' and password ='"+password+"'",function(err,rows){
					  
						if(err)
						{
								console.log("Problem with MySQL"+err);
						}
						else
						{   if(rows.length >0){
						  session.email=req.body.email;
							 res.status(200).send({ success: "Successfully logged in" ,code:"1"});
						   }else{
							  res.status(200).send({ success: "Login Unsuccessfully",code:"0" });

						   }
						}
			});

});

				app.post('/logincheckuser',function(req,res){

						if(session.email) 
						{
							 res.status(200).send({ success: " logged in" ,code:"1"});
						}
						else
						{
							 res.status(200).send({ success: " wrong user" ,code:"0"});
						}
		   
  
 
					});

				 app.post('/addemployee',function(req,res){
 //connection.query("insert into employees
  //(name, location, password) VALUES ('Learn PHP', 'John Pou', NOW())");
				password=md5('xx');
 var post  = {name: req.body.firstName, location: req.body.lastName,password:password};
var query = connection.query('INSERT INTO employees SET ?', post, function(err, result) {
  // Neat!
});
res.end("1");
					  //  console.log(req.body.firstName);
		   
				 
 
					});
app.post('/login',function(req,res){
var user_name=req.body.email;
  var password=req.body.password;
  connection.query("SELECT * from employees where name='"+user_name+"' and password ='"+password,function(err,rows){
						if(err)
						{
								console.log("Problem with MySQL"+err);
						}
						else
						{
							 res.end(JSON.stringify(rows));
						}
			});
  
 // console.log(user_name);
  //res.end(JSON.stringify(user_name));
});


app.post("/addschool",function(req,res){
		var dt = datetime.create();
var fomratted = dt.format('Y/m/d H:M:S');
 var post  = {schoolName: req.body.schoolName, 
 			contactEmailID: req.body.schoolEmail,
 			contactLandline:req.body.schoolLandlinenum,
 			contactMobile:req.body.schoolMobilenum,
 			Address:req.body.schoolAddress,
 			principalName:req.body.schoolPrinciname,
 			createdOn:fomratted

 		 };
var query = connection.query('INSERT INTO school SET ?', post, function(err, result) {
  // Neat!
});
res.end("1");
});


app.get('/listschool',function(req,res){
			connection.query("SELECT * from school",function(err,rows){
						if(err)
						{
								console.log("Problem with MySQL"+err);
						}
						else
						{
							 res.end(JSON.stringify(rows));
						}
			});
});

   app.post('/liststudent',function(req,res){
   	var classID=req.body.standardID;
   	var sectionID=req.body.sectionID;
			connection.query("SELECT * from student,class,section where student.classID=class.classID and student.sectionID=section.sectionID and student.classID='"+classID+"'and student.sectionID='"+sectionID+"'",function(err,rows){
						if(err)
						{
								console.log("Problem with MySQL"+err);
						}
						else
						{
							 res.end(JSON.stringify(rows));
						}
			});
     });


 app.get('/listteacher',function(req,res){
			connection.query("SELECT * from teacher where schoolID='1'",function(err,rows){
						if(err)
						{
								console.log("Problem with MySQL"+err);
						}
						else
						{
							 res.end(JSON.stringify(rows));
						}
			});
     });

 app.get('/listclass',function(req,res){
			connection.query("SELECT * from class",function(err,rows){
						if(err)
						{
								console.log("Problem with MySQL"+err);
						}
						else
						{
							 res.end(JSON.stringify(rows));
						}
			});
     });
 app.get('/listsection',function(req,res){
			connection.query("SELECT * from section",function(err,rows){
						if(err)
						{
								console.log("Problem with MySQL"+err);
						}
						else
						{
							 res.end(JSON.stringify(rows));
						}
			});
     });
 app.get('/listsubject',function(req,res){
			connection.query("SELECT * from subject",function(err,rows){
						if(err)
						{
								console.log("Problem with MySQL"+err);
						}
						else
						{
							 res.end(JSON.stringify(rows));
						}
			});
     });
			 app.get('/classsubjectassignment',function(req,res){
						connection.query("SELECT * from classsubjectteachermapping as cstm LEFT JOIN class ON cstm.classID=class.classID LEFT JOIN section ON cstm.sectionID=section.sectionID LEFT JOIN subject ON cstm.subjectID=subject.subjectID LEFT JOIN teacher ON cstm.teacherID=teacher.teacherID ",function(err,rows){
									if(err)
									{
											console.log("Problem with MySQL"+err);
									}
									else
									{
										 res.end(JSON.stringify(rows));
									}
						});
			     });

			 app.get('/class',function(req,res){
						connection.query("SELECT * from class  ",function(err,rows){
									if(err)
									{
											console.log("Problem with MySQL"+err);
									}
									else
									{
										 res.end(JSON.stringify(rows));
									}
						});
			     });



 app.post('/classdetail',function(req,res){

 	var classID=req.body.classID;
 	var sectionID=req.body.sectionID;
 	console.log(req.body);
 	console.log("SELECT * from classsubjectteachermapping as cstm LEFT JOIN class ON cstm.classID=class.classID LEFT JOIN section ON cstm.sectionID=section.sectionID  LEFT JOIN subject ON cstm.subjectID=subject.subjectID LEFT JOIN teacher ON cstm.teacherID=teacher.teacherID where cstm.classID='"+classID+"' and cstm.sectionID='"+sectionID+"'");
		connection.query("SELECT * from classsubjectteachermapping as cstm LEFT JOIN class ON cstm.classID=class.classID LEFT JOIN section ON cstm.sectionID=section.sectionID  LEFT JOIN subject ON cstm.subjectID=subject.subjectID LEFT JOIN teacher ON cstm.teacherID=teacher.teacherID where cstm.classID='"+classID+"' and cstm.sectionID='"+sectionID+"'",function(err,rows){
									if(err)
									{
											console.log("Problem with MySQL"+err);
									}
									else
									{
										 res.end(JSON.stringify(rows));
									}
						});
			     });


/*Start the Server*/

app.listen(3000,function(){
console.log("It's Started on PORT 3000");
});

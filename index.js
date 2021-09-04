




/**
 * Required External Modules
 */
const express=require("express");
const path=require("path");

/** 
 * App Variables
*/
const app=express();
const port=process.env.PORT || 8000;

/** 
 * App Configuration
*/
app.use(express.static("public"));



/** 
 * Routes Definitions
*/
app.get("/",(req,res)=>{
	// res.status(200).send("Hello world");
	res.sendFile(path.join(__dirname,"index.html"));
});


/** 
 * Server Activation
*/
app.listen(port,()=>{
	console.log("listening on port " + port);
})
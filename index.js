const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();


app.get('/api' , (req , res) => { 
    // the /api gets directoed to localhost:5000/api/
    // getting the request from the /api 

    // sending the json object back
    res.json({
        message : "Welcome to the API"
    })
})

// creating a route to protect
app.post('/api/posts' , verifyToken , (req , res) => {
    // the verifyToken is the middleware function 
    // when the user enters the protected, route 
    // he needs to first verify the token 
    // if successful, then sends the json object below
    
    // verifying the jwt token 
    jwt.verify(req.token , 'secretkey' , (err , authData) => {
        // checking for an error 
        if(err){
            // send the 403 status 
            res.status(403).json({message : '403 status'})
        }else{
            res.json({
                message : 'Post created...',
                authData
            })
        }
    })
    
    res.json({
        message: 'Post created...'
    })
})

app.post('/api/login' , (req , res) => {
    // creating a mock user 
    const user = {
        id : 1,
        username : 'atharva',
        email : 'atharva0300@gmail.com',
    }
    // we will get such kind of request from the client 
    // we have just created a dummy user 

    console.log(res);

    jwt.sign({user} , 'secretkey', {expiresIn : '30s'} , (err , token) => {
        //callback function 
        
        // expiresIn sets the expiration time
        // here we have given it as 30 seconds
         // we ca give the vlaue in minutes, hours, days
        
        // if successfull, return token 
        res.json({
            token
        })
    });
    // the jwt contains 3 compoents 
    // 1. the header 
    // 2. the payload ( or all the data) 
    // 3. the signature ( sign )


    // the jwt signs the user object and creates a token 
    
})

// format of token 
// authorization : Bearer <access_token>


// verifying token 
// creating a middleware function 
function verifyToken(req , res , next){
    // get auth header value 
    const bearerHeader  = req.headers['authorization'];
    // extracting the header
    // and from that, getting the authorizatoin header ( the user )

    // checking if the bearer is undefined 
    if(typeof(bearerHeader)!== 'undefined'){
        // split at the space 
        const bearer = bearerHeader.split(' ');
        
        // get token from array 
        const bearerToken = bearer[1];

        // set the token
        req.token = bearerToken;

        // call the next middleware 
        next();
    }else{
        // it will be forbidded 
        // send the status 404 
        res.status(403).json({ errorMessage : 'undefined bearerHeader'})
    }
}

const PORT  = process.env.PORT || 5000

app.listen(PORT , () => {
    console.log('Server is running on port number : ' , PORT)
})
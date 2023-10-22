const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
app.use(bodyParser.json());

// Use body-parser to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Connect to MongoDB
mongoose.connect("mongodb+srv://user1:kmit1@cluster0.l7gcslq.mongodb.net/AlumniNetworkProject?retryWrites=true&w=majority", { useNewUrlParser: true });

// Create a MongoDB schema for the form data
const alumniregisterSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String,unique: true, required: true },
  loginId: { type: String, required: true },
  password: { type: String, required: true }
});

// Create a MongoDB model based on the form schema
const arForm = mongoose.model("alumniregisters1", alumniregisterSchema);



// Define a POST endpoint for storing form data
app.post("/AlumniRegister1", async (req, res) => {
  const { email,password,repassword } = req.body;
  try{
  const user=await arForm.findOne({ email:email })
  if(user){
    console.log("I am here");
    res.status(500).send({ error: "User already registered. Register with a different email" });  
  }
  else if(password!==repassword)
    {
      console.log(password,repassword);
      res.status(500).send({ error: "Your password and confirmation password do not match" });
    }
  else if(!user){  
    const arformData = new arForm({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    loginId: req.body.loginId,
    password: req.body.password
  });

  arformData
    .save()
    .then(() => {
      res.status(200).json({ message: "You have registered successfully!" });
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
  }

}
catch (error) {
   res.status(500).send({ error: error.message });
}
});



// app.post("/AlumniLogin1", async (req, res) => {
//   const { email, password } = req.body;
//   console.log(email,password)
//   await arForm.findOne({email: email})
//   .then((ans) => {
//     console.log(ans)
//   }).catch((err) => {
//     console.log(err.Message);
//   })
// });



// const userSchema = new mongoose.Schema({
//   username: { type: String, unique: true, required: true },
//   password: { type: String, required: true }
// });

// // Compile the User model from the schema
// const User = mongoose.model("User", userSchema);

// Log in a user

app.post("/AlumniLogin1", async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)
  try {
    const user = await arForm.findOne({ email:email });
    if (!user) {
      return res.status(500).json({ message: "User not registered" });
    }
    if(user){
      if (password!=user.password) {
        res.status(500).json({ message: 'Invalid username or password. Please try again.' });
      }
      else{
          return res.status(200).send({message: "User logged in" , ud:user.firstName ,ud1:user.lastName,ud2:user.email });  
        }
        
      }
    
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// app.get('/Home', (req, res) => {
//   const user2 = req.session.user1;

//   if (!user2) {
//     res.redirect('/AlumniLogin');
//     return;
//   }

//   res.json(user2);
// });

// app.get('/user-data', (req, res) => {
//   // try {
//     // const user = await arForm.findOne({ email:email });
//   const user = {
//     name: 'John Doe',
//     email: 'john.doe@example.com'
//   };
//   res.json(user);
// });

// Serve the client-side code at the root route
// app.use(express.static('public'));



//for admin

const adminregisterSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String,unique: true, required: true },
  loginId: { type: String, required: true },
  password: { type: String, required: true }
});

// Create a MongoDB model based on the form schema
const adrForm = mongoose.model("adminregisters1", adminregisterSchema);



// Define a POST endpoint for storing form data
app.post("/AdminRegister1", async (req, res) => {
  const { email,password,repassword } = req.body;
  try{
  const user=await adrForm.findOne({ email:email })
  if(user){
    console.log("I am here");
    res.status(500).send({ message: "User already registered. Register with a different email" });  
  }
  else if(password!==repassword)
    {
      console.log(password,repassword);
      res.status(500).send({ message: "Your password and confirmation password do not match" });
    }
  else if(!user){  
    const adrformData = new adrForm({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    loginId: req.body.loginId,
    password: req.body.password
  });

  adrformData
    .save()
    .then(() => {
      res.status(200).json({ message: "You have registered successfully!" });
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
  }

}
catch (error) {
   res.status(500).send({ error: error.message });
}
});



// app.post("/AlumniLogin1", async (req, res) => {
//   const { email, password } = req.body;
//   console.log(email,password)
//   await arForm.findOne({email: email})
//   .then((ans) => {
//     console.log(ans)
//   }).catch((err) => {
//     console.log(err.Message);
//   })
// });



// const userSchema = new mongoose.Schema({
//   username: { type: String, unique: true, required: true },
//   password: { type: String, required: true }
// });

// // Compile the User model from the schema
// const User = mongoose.model("User", userSchema);

// Log in a user

app.post("/AdminLogin1", async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)
  try {
    const user = await adrForm.findOne({ email:email });
    if (!user) {
      return res.status(500).json({ message: "User not registered" });
    }
    if(user){
      if (password!=user.password) {
        res.status(500).json({ message: 'Invalid username or password. Please try again.' });
      }
      else{
        return res.status(200).send({message: "User logged in" });     
      }
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

//PROFILE 
const profile = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  course: { type: String, required: true },
  selectedBranch: { type: String, required: true },
  trade: { type: String, required: true }
});

// Create a MongoDB model based on the form schema
const pForm = mongoose.model("profile1", profile);
app.post("/Profile1", async (req, res) => {
  const {firstName,lastName,email,course,selectedBranch,trade} = req.body;
  try{ 
    const pformData = new pForm({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    course: req.body.course,
    selectedBranch: req.body.selectedBranch,
    trade: req.body.trade
  });

  pformData
    .save()
    .then(() => {
      res.status(200).json({ message: "Profile created successfully!" ,
      firstName: firstName,
      lastName: lastName,
      course: course,
      selectedBranch: selectedBranch,
      trade: trade});
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
  }
catch (error) {
   res.status(500).send({ error: error.message });
}
});


//table for verify page

app.get('/table', async(req, res) => {
  console.log(req);   
  res.statusCode = 200;  
    const tech=await pForm.findOne({})
    if(tech)
    {
      res.json({ success:true,techdetails:tech });
    }
    else{
      res.json({ success:false, error:err });
    }
});



app.listen(8000, () => {
  console.log(`Server listening on port 8000...`);
});




//CHAT GPT CODE
// Backend (Node.js + Express + MongoDB) code

// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");

// const app = express();
// app.use(bodyParser.json());

// // Connect to the MongoDB database
// mongoose.connect("mongodb://localhost/my-app", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// Define a schema for the User model
// const userSchema = new mongoose.Schema({
//   username: { type: String, unique: true, required: true },
//   password: { type: String, required: true }
// });

// // Compile the User model from the schema
// const User = mongoose.model("User", userSchema);

// // Log in a user
// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(401).send({ error: "Username or password is incorrect" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).send({ error: "Username or password is incorrect" });
//     }
//     res.send({ message: `Welcome, ${username}` });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });

























// HUSAIF CODE
// const express = require("express");
// const cors = require("cors");
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/home", (req, res) => { 
//   res.json({ message: "Hello from maggi!" });
// });
// app.get("/about", (req, res) => { 
//   res.json({ message: "Hello from server!" });
// });
// app.get('/AlumniRegister1', async (req, res) => {
//   try {
//       await mongoose.connect("mongodb+srv://user1:kmit1@cluster0.l7gcslq.mongodb.net/AlumniNetwork?retryWrites=true&w=majority", { useNewUrlParser: true });
//       console.log("Connected to MongoDB Atlas");
//       const db = mongoose.connection;
//       const typeSchema = new mongoose.Schema({
//           firstname: String,
//           last: String,
//           user: String,
//           email: String,
//           password: String

//       });

//       const testreg = mongoose.model('blood', typeSchema);
//       await testreg.create({
//           firstname: req.body.firstname,
//           last: req.body.last,
//           user: req.body.user,
//           email: req.body.email,
//           password: req.body.password
//       });

//       // const type1Schema = new mongoose.Schema({
//       //   email: String,
//       //   password: String
//       // });

//       // const testlog = mongoose.model('blood', type1Schema);
//       // await testlog.create({
//       //   email: req.body.email,
//       //   password: req.body.password
//       // });

//       console.log("Data added to the database");
//       res.send("siuuuuu")
//   } catch (error) {
//       console.error(error);
//     }
// })
// app.get('/AlumniRegister1',(req,resp) => {
//   resp.send("data is sent")
//   resp.send(req)
// })

// app.listen(8000, () => {
//   console.log(`Server is running on port 8000.`);
// });


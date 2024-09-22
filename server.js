// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const jobsRouter = require('./Routes/adminroutes');
const userApplyRouter = require('./Routes/applicantsRoute');


// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests

// Database Connection
const mongoURI = 'mongodb+srv://pavan:kalyan@cluster0.qhztdim.mongodb.net/jobportal?retryWrites=true&w=majority&appName=Cluster0"'; // Replace with your MongoDB URI
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.use('/admin',jobsRouter)
app.use('/career',userApplyRouter);



// Port and server startup
const PORT = process.env.PORT || 5000; // Use PORT from environment variables or default to 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

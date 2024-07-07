require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000; // Use 5000 as a fallback if PORT is not set

console.log(PORT);
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
// Enable CORS globally for all routes
app.use(cors({
    origin: 'http://ec2-16-171-197-219.eu-north-1.compute.amazonaws.com:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow all HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  }));

// Routes
app.use('/api/boq', require('./routes/boqRoutes')); // Ensure this route is correct
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/partners', require('./routes/partnerRoutes'));
app.use('/api/admins', require('./routes/adminRoutes'));
app.use('/api/transports', require('./routes/transportRoutes'));

// Serve static files from the React app in the client/build directory
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

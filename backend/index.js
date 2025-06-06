const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const residentsRouter = require('./routes/residents');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware 
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://Ashish5161:Ashish0328@cluster0.esaia.mongodb.net/residentsbook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/residents', residentsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Function to try different ports
const startServer = (port) => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy. Trying port ${port + 1}`);
      startServer(port + 1);
    } else {
      console.error('Server error:', error);
    }
  }
};

// Start the server
startServer(PORT); 
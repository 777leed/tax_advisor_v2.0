const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const chatRoutes = require('./routes/chat');

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:3001' // Replace with your frontend origin
}));app.use(express.json());

app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

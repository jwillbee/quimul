const express = require('express');
const cors = require('cors');
const problemRoutes = require('./routes/problems');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/problems', problemRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

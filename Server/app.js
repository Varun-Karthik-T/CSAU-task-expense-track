const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const expenseRoutes = require('./routes/expenseRoutes');
const cors = require('cors');

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.use('/expenses', expenseRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

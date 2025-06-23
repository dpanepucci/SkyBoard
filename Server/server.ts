import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRouter from './routes/weather';

dotenv.config();
console.log('API Key length:', process.env.WEATHER_API_KEY?.length);

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/weather', weatherRouter);

app.get('/api/ping', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));


import express from 'express';
import '../mongoose';

const app = express();

app.listen(3333, () => {
  console.log('Server started on PORT 3333');
});

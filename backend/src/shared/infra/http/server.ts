import express from 'express';

const app = express();

app.listen(3333, () => {
  console.log('Server started on PORT 3333');
});

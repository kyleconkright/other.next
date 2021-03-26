import app from './app';

app.listen(5001, () => {
  console.log(`Server Running... ${process.env.API_URL}`);
})
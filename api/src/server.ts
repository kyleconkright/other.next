import app from './app';

// app.listen(process.env.PORT, () => {
//     console.log(`Express server listening on port ${process.env.PORT} in the ${process.env.NODE_ENV} environment`);
//     console.log(`API ${process.env.API_URL}`);
// })

app.listen(5001, () => {
  console.log('listening on port 5001')
})
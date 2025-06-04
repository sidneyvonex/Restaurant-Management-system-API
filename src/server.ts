import express, { Application } from 'express';

const app:Application =express();
const PORT = process.env.PORT || 3000;


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.get('/', (req, res) => {
    res.send('Welcome to my Restaurant Management API');
}); //Default route

// Start the server
app.listen(PORT, () => {
    console.log(`🌟🌟Server is running on http://localhost:${PORT}🌟🌟`);
});
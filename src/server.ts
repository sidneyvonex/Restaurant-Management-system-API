import express, { Application } from 'express';
import { stateRouter } from './states/state.route';
import { cityRouter } from './city/city.route';
import { categoryRouter } from './category/category.route';
import { menuItemRouter } from './menuitem/menuitem.routes';
import { restaurantRouter } from './restaurant/restaurant.route';
import { userRouter } from './user/user.route';
import { restaurantOwnerRouter } from './restaurant-owner/restaurantowner.router';
import { driverRouter } from './driver/driver.route';
import dotenv from 'dotenv';
import { addressRouter } from './address/adress.router';
import { ordersRouter } from './orders/orders.router';
import { configDotenv } from 'dotenv';
import { ordersStatusRouter } from './order-Status/order-status.routes';
import { ordersMenuItemRouter } from './order-Menu-Item/orderMenuItem.route';
import { statusCatalogrouter } from './status-catalog/status-catalog.router';



dotenv.config(); // Load environment variables from .env file
const app:Application =express();
const PORT = process.env.PORT || 3000;


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.get('/', (req, res) => {
    res.send('Welcome to my Restaurant Management API');
}); //Default route

//Other Routes
app.use('/api',stateRouter);
app.use('/api',cityRouter);
app.use('/api',restaurantRouter)
app.use('/api',menuItemRouter);
app.use('/api',categoryRouter);
app.use('/api',userRouter);
app.use('/api',restaurantOwnerRouter);
app.use('/api',driverRouter);
app.use('/api',addressRouter);
app.use('/api',ordersRouter);
app.use('/api',ordersStatusRouter);
app.use('/api',ordersMenuItemRouter);
app.use('/api',statusCatalogrouter)



// Start the server
app.listen(PORT, () => {
    console.log(`🌟🌟Server is running on http://localhost:${PORT}🌟🌟`);
});
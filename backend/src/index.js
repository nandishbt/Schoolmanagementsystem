import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './db/config.js';
dotenv.config();




const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded())
app.use(express.static('public'))
app.use(cookieParser())

const port = process.env.PORT || 3000;

connectDB()
.then(()=> {
    console.log("DB Connected");
})
.catch(()=>{
    console.log("DB connection failed");
    
})

//import routes

import adminRoute from './routes/admin.route.js'
import classRoute from './routes/class.route.js'
import studentRoute from './routes/student.route.js'
import teacherRoute from './routes/teacher.route.js'
// Routes

app.use('/api/admin',adminRoute)
app.use('/api/class',classRoute)
app.use('/api/student',studentRoute)
app.use('/api/teacher',teacherRoute)













app.listen(port,()=>{
    console.log("app is listening on port " + port);
    
})





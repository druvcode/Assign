import express from "express"
import env from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import fs from "fs"
env.config();

const port=process.env.PORT ||4000
const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:['http://localhost:5173','http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

const routeFiles = fs.readdirSync('./routes');
const routes = Array.from(routeFiles);
routes.forEach(async route => {
  const routeModule = await import(`./routes/${route}`);
  app.use('/api', routeModule.default);
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

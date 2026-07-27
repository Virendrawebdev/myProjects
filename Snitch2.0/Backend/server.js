import { configDotenv } from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { config } from "./src/config/config.js";
configDotenv()

const PORT = config.PORT || 5000

const startServer = async () => {
    try{
await connectDB();
    app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`)
    })
    }catch(error){
    console.error(`Failed to start server`, error.message)
    }
   
}
startServer()


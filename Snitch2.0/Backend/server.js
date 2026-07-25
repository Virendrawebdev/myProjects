import { configDotenv } from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
configDotenv()

const PORT = process.env.PORT || 5000

const startServer = async () => {
   await connectDB();
    app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`)
    })
}
startServer()


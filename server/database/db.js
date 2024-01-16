import mongoose from "mongoose";
import colors from "colors";
const Connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to databse ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`error in mongodb ${error}`.bgRed.white);
    }
}
export default Connectdb;
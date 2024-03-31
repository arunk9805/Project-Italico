import mongoose from "mongoose";
import ejs from "ejs";
import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import { dirname } from 'path';
import { fileURLToPath } from "url";

//import routes and models
import GuestData from "./guest.model.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');

// Server static files
app.use(express.static("public"));
app.use("/CSS", express.static(__dirname + ".public/CSS"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + 'index.html');
});

function formatDate(Stringdate) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date(Stringdate);
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
    const dateOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return [dayOfWeek, dateOfMonth, month, year];
}

// const temp ="";
// const convertedDate =  formatDate("2024-03-31T00:00:00.000Z");
// console.log(`${convertedDate[0]}, ${convertedDate[1]}, ${convertedDate[2]}, ${convertedDate[3]}`);
// console.log(convertedDate);


app.get("/submit", (req, res) => {
    const saveGuestData = {
        Name: 'Arun Kumar',
        GuestNumber: '2',
        PhoneNumber: '',
        email: 'arunk9805@gmail.com',
        time: '05:14 PM',
        date: "2024-03-25T00:00:00.000Z",
      }
      const convertedDate =  formatDate(saveGuestData.date);
    res.render(__dirname + "/views/regSuccess.ejs", {saveGuestData, convertedDate});
});

app.post("/regSuccess", async (req, res) => {
    try {
        const guestData = new GuestData(req.body);
        const saveGuestData = await guestData.save();
        const convertedDate =  formatDate(saveGuestData.date);
        console.log("Reservation Successful: ", saveGuestData, convertedDate);     
        res.render(__dirname + "/views/regSuccess.ejs", {saveGuestData, convertedDate});
    } catch (error) {
        console.log("Error while saving data: ", error);
        res.status(500).send("Server-side ERROR!!\n Error while saving data!")
    }
});

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Italico")
        console.log("database connected")
        app.listen(3000, () => {
            console.log("Server running at port: 3000");
        });
    } 
    catch (error) {
        console.log("MONGODB connection FAILED!", error);
        process.exit(1);
    }

}

connectDB();

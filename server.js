import mongoose from "mongoose";
import ejs from "ejs";
import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import GuestData from "./guest.model.js";
import { dirname } from 'path';
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.sendFile(__dirname + 'index.html');
});

app.post("/regSuccess", async (req, res) => {
    try {
        const guestData = new GuestData(req.body);
        const saveGuestData = await guestData.save();
        console.log("Reservation Successful: ", saveGuestData);
        
        res.render(__dirname + "/views/regSuccess.ejs", {saveGuestData});
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

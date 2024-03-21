import GuestData from '../guest.model.js';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import mongoose from 'mongoose';

const htmlContent = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(htmlContent);
global.document = dom.window.document;

document.addEventListener('DOMContentLoaded', async ()=> {
    // document.getElementById('reservation-form').addEventListener('submit', async function(event) {
    document.getElementById('reservation-form').addEventListener('change', async function(event) {
        event.preventDefault();

        const guestData = {
            Name: document.getElementById('guestName').value,
            GuestNumber: document.getElementById('guestNumber').value,
            PhoneNumber: document.getElementById('phoneNum').value,
            email: document.getElementById('guestEmail').value,
            time: document.getElementById('time').value,
            date: document.getElementById('date').value 
        };

        console.log(guestData);

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(guestData)
            });

            if (response.ok) {
                console.log("Reservation Successful");
            } else {
                console.error("Failed to submit reservation");
            }
        } catch (error) {
            console.error("Error while submitting reservation:", error);
        }
    });
});

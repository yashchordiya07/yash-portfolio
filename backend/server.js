const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Dynamic Data for your Portfolio
const profileData = {
    projects: [
        {
            id: 1,
            title: "Sign Language Recognition",
            tech: ["Python", "MediaPipe", "OpenCV"],
            description: "Real-time AI gesture recognition."
        }
    ],
    education: [
        {
            institution: "Engineering College",
            degree: "B.E. in AI & Data Science",
            year: "2022 - 2026"
        }
    ],
    socials: {
        linkedin: "https://linkedin.com/in/yourprofile",
        github: "https://github.com/yourprofile"
    }
};

app.get('/api/profile', (req, res) => {
    res.json(profileData);
});

app.get('/', (req, res) => {
    res.send("Backend is running!");
});

app.listen(PORT, () => {
    console.log(`Server is sprinting on http://localhost:${PORT}`);
});
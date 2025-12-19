It's a weather app that I made for a school project. It gives the current heat, air quality, air pollution and humidity for the day.

[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=20912938&assignment_repo_type=AssignmentRepo)


# 🌦️ CE2000 Weather Dashboard  
Dynamic Web Technologies – Coursework Submission  
Author: *Tobe Oji*  
Module: CE2000 – Dynamic Web Technologies  

---

## 📌 Overview  
This project is a **dynamic weather dashboard** that retrieves real-time weather data from the **OpenWeather API** and presents it using a modern, responsive interface.  

The system includes:

- a **front-end** built with **Bootstrap**, **jQuery**, and custom JavaScript  
- a **server-side back-end** using **Node.js**, **Express**, and **EJS templating**  

It demonstrates:

✔ Front-end frameworks  
✔ DOM manipulation  
✔ Server-side routing & templating  
✔ Use of 3rd-party APIs  
✔ A functioning back-end web service  
✔ Deployment on Codio  
✔ A coherent, crash-free design  

---

## 🚀 Features

### 🔹 Front-End
- Responsive UI built with **Bootstrap 5**
- Search bar with HTML5 **datalist** autocomplete for major world cities
- Quick-select city buttons
- Recent search history stored using **localStorage**
- Dynamic weather card showing:
  - Temperature  
  - Description  
  - Humidity  
  - Wind speed  
  - “Feels like” temperature  
  - Weather icons  
  - Last updated timestamp  

### 🔹 Back-End
- Express server with routes:
  - `GET /` — Home page
  - `GET /about` — About page
  - `GET /api/weather` — Weather API endpoint
  - `GET *` — Custom 404 page
- Server-side call to OpenWeather API
- Clean JSON response formatting
- EJS page templating with shared components

---

## 🌐 APIs Used

### **1. OpenWeather API (Third-Party Web Service)**  
**Endpoint:**
https://api.openweathermap.org/data/2.5/weather


Used to retrieve real-time data including:
- Temperature  
- Weather conditions  
- Humidity  
- Wind speed  
- Icons  

---

### **2. Internal Weather API (Your Express Back-End)**  
**Endpoint:**
GET /api/weather?city={cityName}


Purpose:
- Calls OpenWeather securely on the server  
- Cleans/normalises returned JSON  
- Sends simplified weather data to the front-end  
- Keeps API key hidden  

---

### **3. Browser Web APIs**
These count toward the “web technologies” criteria:

| API | Purpose |
|-----|---------|
| **DOM API** | Updating UI dynamically |
| **LocalStorage API** | Saving recent searches |
| **HTML5 Datalist** | Autocomplete suggestions |
| **Fetch API (server-side)** | Fetching OpenWeather data |

---

## 📁 Project Structure


```text
ProjectCE2000/
  .env
  package.json
  server.js
  views/
    index.ejs
    about.ejs
    404.ejs
    partials/
      head.ejs
      navbar.ejs
      footer.ejs
  public/
    style.css
    script.js
```

---

## How to Run in Codio

### **Open Terminal**
```bash
cd ProjectCE2000
npm nstall
npm start

Output: Server running on port 3000

(Press Box URL to run)
(If any error occurs, configure Box URL and confirm that the number '3000' is present next to any of the domains)

```

**Testing Instructions**
Try multiple cities (typed + dropdown suggestions)

Check quick-select buttons

Turn network offline to test error handling

Validate HTML via W3C validator

Inspect accessibility using browser tools

Ensure no console errors appear

**Accessibility & Design Notes**
Responsive Bootstrap layout

High-contrast dark theme

Labels on all inputs and buttons

Shared templates ensure UI consistency

Minimal inline styling, mostly in CSS

**Acknowledgements**
Weather data powered by OpenWeather

UI powered by Bootstrap

Interactivity via jQuery

Back-end logic using Node.js & Express

HTML templating via EJS

**AI Use Statement (Optional for CE2000)**
“I acknowledge the use of ChatGPT by OpenAI to assist with structuring, documenting, and explaining parts of this project. Prompts were used to improve clarity, organisation, and code readability.”





---








## 📂 Project Structure

```text
ProjectCE2000/
  .env
  package.json
  server.js
  views/
    index.ejs
    about.ejs
    404.ejs
    partials/
      head.ejs
      navbar.ejs
      footer.ejs
  public/
    style.css
    script.js


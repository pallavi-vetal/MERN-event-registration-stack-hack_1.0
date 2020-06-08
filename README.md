<a href="https://stackhack-by-pallavi-and-omkar.herokuapp.com/"><img src="https://user-images.githubusercontent.com/21281869/83597857-f18cee80-a585-11ea-9bcf-3e63cefcef95.png" title="stackhack" alt="stackhack-logo"></a>

<!-- [![FVCproductions](https://avatars1.githubusercontent.com/u/4284691?v=3&s=200)](http://fvcproductions.com) -->


# HackerEarth FullStack Challenge sponsored by UpSkills 

> Theme :  [Event Registration Application ](https://www.hackerearth.com/challenges/hackathon/stackhack-v1/) 

> Built user-friendly event registration web application using MERN stack

> FrontEnd : 
- ReactJS
- React-Redux
- Material-UI
- FilePond
> BackEnd :
- NodeJS - Express Framework
- bcryptjs     
- nodemailer
- jsonwebtoken
- passport-jwt authentication
> Database :
- MongoDB
> Deployment :
- Heroku CLI


[![Build Status](http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square)](https://travis-ci.org/badges/badgerbadgerbadger) [![Coverage Status](http://img.shields.io/coveralls/badges/badgerbadgerbadger.svg?style=flat-square)](https://coveralls.io/r/badges/badgerbadgerbadger)




***DESKTOP View***



![temp (2)](https://user-images.githubusercontent.com/21281869/83600020-45e69d00-a58b-11ea-9a2f-b9220a907eea.gif)






***Mobile View View***



![temp2 (1)](https://user-images.githubusercontent.com/21281869/83601863-1043b300-a58f-11ea-891f-85f588fc4c69.gif)




## Table of Contents 


- [Requirements](#requirements)
- [Sending Feedbacks](#sending-feedbacks)
- [Additional Features](#Additional-Features)
- [Folder Structure](#folder-structure)
- [Setup](#setup)
- [Available Scripts](#available-scripts)
- [MongoDb Data restore](#mongodb-data-restore)
- [API Testing](#api-testing)
- [Team](#team)


---



## Requirements

### On Front End :

> A form on the UI which captures :
  - Fields for Data Capture (All fields are mandatory)
    - Full Name
    - Mobile
    - E-Mail
    - Upload ID Card (Formats: png, jpeg)
    - Registration type : Self/Group/Corporate/Others
    - No of Tickets: (If self prepopulate to 1, rest case mandate user to enter)
> Provide a preview Screen which should :
  - List all the fields as above.
  - Display ID card in the preview.

> On Submission :
  - Registration ID is generated and displayed on Success Screen.
  - Store all the information captured in a local database (we have used mongoDb)
  - (Registration Date is generated as system date and get stored in Database)

### On Back end :
  - This Backend has database bindings to store the event registration info received from the Front End.
  - The backend is able to receive from and render to Front End all the event information, also store in and fetch from the database.
  - Admin Login functionality using jwt and passport authenctication strategy.
  - Display a Chart detailing count of Registration types.
  - List all Registrations (Registration No, Date, Name fields should be displayed)
  - Hyperlink to view on Click on Registration No


---
## Sending Feedbacks
We are always open to [your feedback](https://github.com/omkarlanghe/MERN-event-registration-stack-hack_1.0/issues).


## Additional Features
- Mail Service : User will get event registration summary on the registered mail address.
- Admin Dashboard : Admin is presented with intuitive dashboard containing multiple graphs giving insights on registrations and event tickets sold.
- User Interface : User friendly and responsive is provided.
- Feedback Service is provided to user where user can give valuable feedback about event.
- Query mailbox : Query mailbox is provided to user to resolve any issues/queries.


---


## Folder Structure
This node express server directory structure, error handling guidelines, etc is inspired from [NODE.js Best Practices](https://github.com/goldbergyoni/nodebestpractices). 
```
MERN-EVENT-REGISTRATION-STACK-HACK_1.0/
    client/
    components/
        event/
            event.controller.js
            event.DAL.js
            event.presentation.js
            event.validation.js
        user/
            user.controller.js
            user.DAL.js
            user.presentation.js
            user.validation.js
    configurations/
        config.js
        mongo.config.js
        passport.js
    node_modules/
    services/
        mail/
            service.mail.js
    utils/
        error.js
        mongo.util.js
    webServer/
        routes.js
        wsEvent.js
        wsUser.js
    .env
    .gitignore
    package.json
    README.md
    server.js
```

---

## Setup

  ### 1. Clone this repository:
  - Navigate to the directory where you want to clone this repository from git command line.
  - Once you navigate to the directory, On git command line type,<br>
  `git clone https://github.com/omkarlanghe/MERN-event-registration-stack-hack_1.0.git`
  - A local copy of this remote repository will be cloned on your local machine at specified location.
  
  ### 2. Navigate inside your local git respository by typing below command on terminal.
  `cd MERN-event-registration-stack-hack_1.0`

  ### 3. Once you are inside this repository, type the below command on terminal.
  `npm install`
  - This will install all the dependancies required to run backend server (i.e all npm packages, third party libraries, etc).

  ### 4. Navigate to the client folder located inside MERN-event-registration-stack-hack_1.0 by typing below command on terminal.
  `cd client`

  ### 5. Once you are inside this repository, type the below command on terminal.
  `npm install`
  - This will install all the dependancies required to run react front end (i.e all npm packages, third party libraries, etc).

---

## Available Scripts
In this project directory, you can run:

### `npm run server or node server.js`
- Runs node express server in development mode on http://localhost/8000.<br>

### `npm run client or npm start --prefix client`
- Runs the app in the development mode.<br>
- Open [http://localhost:3000](http://localhost:8000) to view it in the browser.
- The page will reload if you make edits.<br>
- You will also see any lint errors in the console.

### `npm run build --prefix client`
- Builds the app for production to the `build` folder.<br>
- It correctly bundles React in production mode and optimizes the build for the best performance.
- The build is minified and the filenames include the hashes.<br>
- Your app is ready to be deployed!

---

## MongoDb Data restore
Go to your installation directory where mongodb is installed and inside "/bin" folder, type
### `mongorestore.exe --db events <dump location of bson files of your collections>`<br>
### `example: mongorestore.exe --db events dump/events`
- This will restore your database locally.
---

## API Testing
Please find all [API signatures](https://www.getpostman.com/collections/8977920279c340c5ccf4) here


## Team

> Frontend Developer : Pallavi Vetal


> Backend Developer : Omkar Langhe

| <a href="https://www.linkedin.com/in/pallavi-vetal-21031996/" target="_blank">**Pallavi Vetal**</a> | <a href="https://www.linkedin.com/in/omkar-langhe-787bb5134/" target="_blank">**Omkar Langhe**</a> |
| :---: |:---:|
| [![Pallavi Vetal](https://media-exp1.licdn.com/dms/image/C5603AQGvUOzxXZv5sg/profile-displayphoto-shrink_100_100/0?e=1596672000&v=beta&t=aMNlChdJqEkQdhsIJpwj4JBZiP3PhHaY_BZhcuXPPOY)](https://github.com/pallavi-vetal) | [![Omkar Langhe](https://media-exp1.licdn.com/dms/image/C5103AQG2ZR444IUhXA/profile-displayphoto-shrink_100_100/0?e=1596672000&v=beta&t=FMJo2tf7Ja850Xs_GdNBoCA6GZOv4d5YvNGpXi_0iBA)](https://github.com/omkarlanghe)  |
| <a href="http://github.com/pallavi-vetal" target="_blank">`github.com/pallavi-vetal`</a> | <a href="http://github.com/omkarlanghe" target="_blank">`github.com/omkarlanghe`</a> |


---

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
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Running project on local machine](#Setup) 
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



## Additional Features
- Mail Service : User will get event registration summary on the registered mail address.
- Admin Dashboard : Admin is presented with intuitive dashboard containing multiple graphs giving insights on registrations and event tickets sold.
- User Interface : User friendly and responsive is provided.
- Feedback Service is provided to user where user can give valuable feedback about event.
- Query mailbox : Query mailbox is provided to user to resolve any issues/queries


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
```
Code
```



---



## Team

> Frontend Developer : Pallavi Vetal


> Backend Developer : Omkar Langhe

| <a href="https://www.linkedin.com/in/pallavi-vetal-21031996/" target="_blank">**Pallavi Vetal**</a> | <a href="https://www.linkedin.com/in/omkar-langhe-787bb5134/" target="_blank">**Omkar Langhe**</a> |
| :---: |:---:|
| [![Pallavi Vetal](https://media-exp1.licdn.com/dms/image/C5603AQGvUOzxXZv5sg/profile-displayphoto-shrink_100_100/0?e=1596672000&v=beta&t=aMNlChdJqEkQdhsIJpwj4JBZiP3PhHaY_BZhcuXPPOY)](https://github.com/pallavi-vetal) | [![Omkar Langhe](https://media-exp1.licdn.com/dms/image/C5103AQG2ZR444IUhXA/profile-displayphoto-shrink_100_100/0?e=1596672000&v=beta&t=FMJo2tf7Ja850Xs_GdNBoCA6GZOv4d5YvNGpXi_0iBA)](https://github.com/omkarlanghe)  |
| <a href="http://github.com/pallavi-vetal" target="_blank">`github.com/pallavi-vetal`</a> | <a href="http://github.com/omkarlanghe" target="_blank">`github.com/omkarlanghe`</a> |


---

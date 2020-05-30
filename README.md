# MERN-event-registration-stack-hack_1.0
## (Application Overview)
## On Front End :

### A form on the UI which captures :
  - Fields for Data Capture (All fields are mandatory)
    - Full Name
    - Mobile
    - E-Mail
    - Upload ID Card (Formats: png, jpeg)
    - Registration type : Self/Group/Corporate/Others
    - No of Tickets: (If self prepopulate to 1, rest case mandate user to enter)
### Provide a preview Screen which should :
  - List all the fields as above.
  - Display ID card in the preview.

## On Submission :
  - Registration ID is generated and displayed on Success Screen.
  - Store all the information captured in a local database (we have used mongoDb)
  - (Registration Date is generated as system date and get stored in Database)

## On Back end :
  - This Backend has database bindings to store the event registration info received from the Front End.
  - The backend is able to receive from and render to Front End all the event information, also store in and fetch from the database.
  - Admin Login functionality using jwt and passport authenctication strategy.
  - Display a Chart detailing count of Registration types.
  - List all Registrations (Registration No, Date, Name fields should be displayed)
  - Hyperlink to view on Click on Registration No

## Ideal Stack Used :
  - #### MERN (mongoDb-Express-React-Node)

## Table of Contents :
- [Sending Feedback](#sending-feedback)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)

## Sending Feedback

We are always open to [your feedback](https://github.com/omkarlanghe/MERN-event-registration-stack-hack_1.0/issues).
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
## Available Scripts
In this project directory, you can run:

### `npm run server or node server.js`
Runs node express server in development mode on http://localhost/3007.<br>

### `npm run client or npm start --prefix client`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build --prefix client`
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### Supported Browsers
By default, the generated project uses the latest version of React.

You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.

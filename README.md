# MERN-event-registration-stack-hack_1.0
## (Application Overview)
## On Front End:

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

## On Back end:
  - This Backend has database bindings to store the event registration info received from the Front End.
  - The backend is able to receive from and render to Front End all the event information, also store in and fetch from the database.
  - Admin Login functionality using jwt and passport authenctication strategy.
  - Display a Chart detailing count of Registration types.
  - List all Registrations (Registration No, Date, Name fields should be displayed)
  - Hyperlink to view on Click on Registration No

## Ideal Stack Used:
  - #### MERN (mongoDb-Express-React-Node)

## Table of Contents

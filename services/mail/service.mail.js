/**
 * service.mail.js: mailing service initiated when user successfully register's for an event.
 * Confirmation mail is sent, once registration succeeds.
 */

const node_mailer = require('nodemailer');
const { email } = require('../../configurations/config');

const mail_transporter = node_mailer.createTransport({
    service: 'gmail',
    auth: { user: email.emailId, pass: email.password }
});

exports.sendMail = (p_details) => {
    try {
        let mail_options = {
            from: email.emailId,
            to: p_details.email,
            subject: 'StackHack 1.0 Event Registration.',
            html: `
        <h2> Thank you for stack hack 1.0 registration.</h2>
        <h3> Please find your registration details. </h3>
        <div>
            <strong>Registration Id</strong>:   ${p_details._id}<br>
            <strong>Registered Name</strong>:   ${p_details.fullName}<br>
            <strong>Mobile Number</strong>:     ${p_details.mobile}<br>
            <strong>Registered Email</strong>:  ${p_details.email}<br>
            <strong>Registration Type</strong>: ${p_details.registrationType}<br>
            <strong>Number of Tickets</strong>: ${p_details.numberOfTickets}<br>
            <strong>Registration Date</strong>: ${p_details.date}<br>
        </div>
        `
        };


        mail_transporter.sendMail(mail_options, (err, info) => {
            if (err) {
                throw err;
            }
            console.info('email sent :: ' + info.response);
        });

    } catch (error) {
        throw error;
    }
};

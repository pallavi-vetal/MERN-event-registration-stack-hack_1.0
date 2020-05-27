const node_mailer = require('nodemailer');

const mail_transporter = node_mailer.createTransport({
    service: 'gmail',
    auth: { user: 'mail address of email service provider', pass: 'password of email service provider' }
});

exports.sendMail = (p_details) => {
    try {
        let mail_options = {
            from: 'mail address of email service provider',
            to: 'senders mail address',
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

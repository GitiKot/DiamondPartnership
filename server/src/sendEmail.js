const sgMail = require('@sendgrid/mail')
console.log(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
pathToAttachment = `${__dirname}/attachment.pdf`;
attachment = fs.readFileSync(pathToAttachment).toString("base64");

const msg = {
  to: '6762692@gmail.com', // Change to your recipient
  from: '0548510016S@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  attachments:[
    {
        content: attachment,
        filename: "attachment.pdf",
        type: "application/pdf",
        disposition: "attachment"
      }
  ]
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
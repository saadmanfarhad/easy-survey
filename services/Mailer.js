const postmark = require('postmark');
const keys = require('../config/keys');

class Mailer {
  constructor({ subject, recipients }, content) {
    this.client = new postmark.Client(keys.postmarkKey);
    this.mails = recipients.map(recipient => {
      return {
        From: 'saadmanfarhad@iut-dhaka.edu',
        To: recipient.email,
        Subject: subject,
        HtmlBody: content,
        TrackLinks: 'HtmlOnly'
      };
    });
  }

  async send() {
    const sendResponse = await this.client.sendEmailBatch(this.mails);
    console.log(sendResponse);
    return sendResponse;
  }
}

module.exports = Mailer;

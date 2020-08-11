const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for your feedback');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const { Recipient, OriginalLink } = req.body;
    const pathname = new URL(OriginalLink).pathname;
    const p = new Path('/api/surveys/:surveyId/:choice');
    const match = p.test(pathname);

    if (match) {
      Survey.updateOne(
        {
          _id: match.surveyId,
          recipients: {
            $elemMatch: {
              email: Recipient,
              responded: false
            }
          }
        },
        {
          $inc: { [match.choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }
      ).exec();
    }

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, recipients, body } = req.body;
    const recipientsObject = recipients.split(',').map(recipient => {
      return {
        email: recipient.trim()
      };
    });

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipientsObject,
      _user: req.user.id,
      dateSent: Date.now()
    });

    try {
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (e) {
      res.status(422).send(e);
    }
  });
};

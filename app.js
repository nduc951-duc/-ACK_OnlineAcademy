import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import homeRouter from './routes/home.route.js';
import accountRouter from './routes/account.route.js';

const app = express();
const PORT = 5000;

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Middleware để chia sẻ dữ liệu session với tất cả các view
app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.authUser = req.session.authUser;
  next();
});

app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/', homeRouter);
app.use('/account', accountRouter);

app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session'; // <-- Phải có dòng này
import homeRouter from './routes/home.route.js';
import accountRouter from './routes/account.route.js';
import categoryRouter from './routes/category.route.js';
import { restrict, restrictAdmin } from './middlewares/auth.mdw.js';


const app = express();
const PORT = 5000;

// 1. Cấu hình session
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// 2. Middleware chia sẻ dữ liệu session cho views (RẤT QUAN TRỌNG)
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

app.use('/admin/categories', restrict, restrictAdmin, categoryRouter);


app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
import express from 'express';
import { engine } from 'express-handlebars';
import * as homeRouter from './routes/home.route.js';

const app = express();
const PORT = 3000;

// Cấu hình View Engine (Handlebars)
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware để xử lý request body
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('home'); // Render trang home.handlebars
});

// Sử dụng router cho các trang khác (ví dụ)
// app.use('/courses', courseRouter);

// Bắt lỗi 404
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
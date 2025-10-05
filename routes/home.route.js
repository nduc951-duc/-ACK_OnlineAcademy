import express from 'express';

const router = express.Router();

// Router này sẽ xử lý request đến trang chủ ('/')
router.get('/', function (req, res) {
  res.render('home');
});

export default router;
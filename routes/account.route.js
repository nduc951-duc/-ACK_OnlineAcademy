import express from 'express';
import bcrypt from 'bcryptjs';
import userModel from '../models/user.model.js';

const router = express.Router();

// --- ĐĂNG KÝ --- (Giữ nguyên)
router.get('/signup', function (req, res) {
  res.render('vwAccount/signup');
});

router.post('/signup', async function (req, res) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const user = {
    full_name: req.body.full_name,
    email: req.body.email,
    password: hash,
  };
  await userModel.add(user);
  res.render('vwAccount/signup', { success: true });
});

// --- ĐĂNG NHẬP (NÂNG CẤP) ---
router.get('/signin', function (req, res) {
  res.render('vwAccount/signin');
});

router.post('/signin', async function (req, res) {
  const { email, password } = req.body;

  // 1. Tìm user trong CSDL bằng email
  const user = await userModel.findByEmail(email);
  if (user === null) {
    // Nếu không tìm thấy user, báo lỗi
    return res.render('vwAccount/signin', { error: true });
  }

  // 2. So sánh mật khẩu người dùng nhập với mật khẩu đã hash trong CSDL
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    // Nếu mật khẩu sai, báo lỗi
    return res.render('vwAccount/signin', { error: true });
  }

  // 3. Đăng nhập thành công, lưu thông tin vào session
  req.session.isAuthenticated = true;
  req.session.authUser = {
      id: user.id,
      fullName: user.full_name,
      role: user.role
  };

  // Chuyển hướng về trang chủ
  res.redirect('/');
});

// --- ĐĂNG XUẤT --- (Giữ nguyên)
router.post('/signout', function (req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});

export default router;
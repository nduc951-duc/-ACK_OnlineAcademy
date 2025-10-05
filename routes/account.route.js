import express from 'express';
import bcrypt from 'bcryptjs';
import userModel from '../models/user.model.js'; // <-- THÊM DÒNG NÀY

const router = express.Router();

// --- ĐĂNG KÝ ---
router.get('/signup', function (req, res) {
  res.render('vwAccount/signup');
});

router.post('/signup', async function (req, res) {
  // Mã hóa mật khẩu
  const hash = bcrypt.hashSync(req.body.password, 10);

  // Tạo đối tượng user để lưu vào CSDL
  const user = {
    full_name: req.body.full_name,
    email: req.body.email,
    password: hash,
    // role mặc định là 0 (student) nên không cần thêm vào
  };

  // Gọi model để thêm user
  await userModel.add(user);

  // Render lại trang signup với thông báo thành công
  res.render('vwAccount/signup', { success: true });
});


// --- ĐĂNG NHẬP & ĐĂNG XUẤT (Giữ nguyên như cũ) ---

router.get('/signin', function (req, res) {
  res.render('vwAccount/signin');
});

router.post('/signin', async function (req, res) {
  // (Code đăng nhập sẽ được nâng cấp ở bước sau)
  res.redirect('/');
});

router.post('/signout', function (req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});

export default router;
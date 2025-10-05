// Middleware kiểm tra đã đăng nhập chưa
export function restrict(req, res, next) {
  if (req.session.isAuthenticated) {
    return next();
  }
  res.redirect('/account/signin');
}

// Middleware kiểm tra có phải admin không
export function restrictAdmin(req, res, next) {
  if (req.session.authUser.role === 2) { // 2 là role của admin
    return next();
  }
  res.status(403).send('Bạn không có quyền truy cập vào trang này.');
}
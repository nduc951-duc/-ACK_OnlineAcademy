import db from '../utils/db.js'; // Import kết nối CSDL bạn vừa tạo

export default {
  /**
   * Thêm một user mới vào CSDL.
   * @param {object} user Đối tượng chứa thông tin người dùng (full_name, email, password)
   * @returns
   */
  async add(user) {
    return db('users').insert(user);
  }

  // Các hàm khác sẽ được thêm vào đây sau (ví dụ: tìm user theo email)
}
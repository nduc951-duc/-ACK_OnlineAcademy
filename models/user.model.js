import db from '../utils/db.js';

export default {
  async add(user) {
    return db('users').insert(user);
  },

  /**
   * Tìm người dùng bằng email.
   * @param {string} email Email cần tìm
   * @returns User object hoặc null nếu không tìm thấy
   */
  async findByEmail(email) {
    const list = await db('users').where('email', email);
    if (list.length === 0) {
      return null;
    }
    return list[0];
  }
}
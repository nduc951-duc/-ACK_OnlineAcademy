import db from '../utils/db.js';

export default {
  findAll() {
    return db('categories');
  },

  findById(id) {
    return db('categories').where('id', id).first();
  },

  add(category) {
    return db('categories').insert(category);
  },

  del(id) {
    return db('categories').where('id', id).del();
  },

  patch(id, category) {
    return db('categories').where('id', id).update(category);
  }
};
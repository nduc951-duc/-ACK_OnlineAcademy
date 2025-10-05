import express from 'express';
import categoryModel from '../models/category.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const list = await categoryModel.findAll();
  res.render('vwAdmin/vwCategories/list', {
    categories: list,
    layout: 'admin' // Sử dụng layout riêng cho admin
  });
});

router.get('/add', function (req, res) {
  res.render('vwAdmin/vwCategories/add', { layout: 'admin' });
});

router.post('/add', async function (req, res) {
  await categoryModel.add({ name: req.body.catName });
  res.redirect('/admin/categories');
});

router.get('/edit/:id', async function (req, res) {
  const category = await categoryModel.findById(req.params.id);
  res.render('vwAdmin/vwCategories/edit', {
    category: category,
    layout: 'admin'
  });
});

router.post('/patch', async function (req, res) {
  await categoryModel.patch(req.body.id, { name: req.body.name });
  res.redirect('/admin/categories');
});

router.post('/delete', async function (req, res) {
  await categoryModel.del(req.body.id);
  res.redirect('/admin/categories');
});

export default router;
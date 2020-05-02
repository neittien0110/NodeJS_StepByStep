/** Yêu cầu sử dụng module express MVC, hoặc chỉ đích danh bằng đường dẫn C:/.... */
var express = require('express');
var router = express.Router();

/* Gán các hàm callback cho từng URL để chúng phụ trách trả về HTTP reponse */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home page' });
});

module.exports = router;

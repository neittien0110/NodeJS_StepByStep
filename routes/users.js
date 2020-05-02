/** Yêu cầu sử dụng module express MVC, hoặc chỉ đích danh bằng đường dẫn C:/.... */
var express = require('express');
/** Đối tượng quản lý các đường dẫn URI */
var router = express.Router();

/* Gán các hàm callback cho từng URL để chúng phụ trách trả về HTTP reponse */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

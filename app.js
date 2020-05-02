/**  Tạo đổi đối tượng mã lỗi HTTP error */
var createError = require('http-errors');   
/** Yêu cầu sử dụng module express MVC, hoặc chỉ đích danh bằng đường dẫn C:/.... */
var express = require('express');
/** Module hỗ trợ tìm đường dẫn file */
var path = require('path');
var cookieParser = require('cookie-parser');
/** Yêu cầu sử dụng module morgan: ở tầng middleware phụ trách ghi log các HTTP request. */
var logger = require('morgan');

/** đối tượng quản lý module tự lập trình routes/index.js */
var indexRouter = require('./routes/index');
/** đối tượng quản lý module tự lập trình routes/users.js */
var usersRouter = require('./routes/users');

var app = express();

/** Chỉ định tham số views = <đường dẫn hiện thời>/views, là thư mục chứa các file pug */
app.set('views', path.join(__dirname, 'views'));
/**  Chỉ định tham số view engine, cho biết loại template library nào sẽ sử dụng */
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/**  Chỉ định thư mục chứa website sau khi biên dịch khi sử dụng pug */
app.use(express.static(path.join(__dirname, 'public')));

/** Với đường dẫn URI = /*, thì gọi hàm đáp ứng là phù hợp*/
app.use('/', indexRouter);
/** Với đường dẫn URI = /users/*, thì gọi hàm đáp ứng là phù hợp*/
app.use('/users', usersRouter);

/** Các đường dẫn còn lại (không thỏa mãn các điều kiện của @see app.use ở trên_
 *  thì sẽ được bẫy và thực hiện bởi  */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  /** @see require('http-errors') */
  next(createError(404)); /**  Tạo đối tượng Http Error với mã lỗi 404 và tiếp tục forward tiếp.  */
});

/** Đón nhận sự kiện lỗi và xử lý tiếp phần giao diện hiển thị */
app.use(function(err, req, res, next) {
  // chỉ thiện thông báo với địa chỉ local, khi đang trong quá trình phát triển
  res.locals.message = "Lỗi: " + err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  // Hiển thị trang error.pug
  res.render('error');
});

module.exports = app;

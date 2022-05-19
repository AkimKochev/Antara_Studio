import path from 'path';
import express from 'express';
import {fileURLToPath} from 'url';
import logger from 'morgan';
import debug from 'debug';
import http from 'http';
import parser from 'ua-parser-js';

const app = express();
// app.use(cookieParser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'views')));

app.use(function (req, res, next) {
	var ua = parser(req.headers['user-agent']);
	res.locals.isDesktop = ua.device.type === undefined;
	res.locals.isMobile = ua.device.type === 'mobile';
	res.locals.isTablet = ua.device.type === 'tablet';
	console.log(`App listening at http://localhost:${port}`);

	next();
});

app.get('/', function (req, res, next) {
	res.render('index');
});

app.get('/about', function (req, res, next) {
	res.render('');
});

app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('pages/four04');
});

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) return val;
	if (port >= 0) return port;
	return false;
}

function onError(error) {
	if (error.syscall !== 'listen') throw error;

	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	debug('Listening on ' + bind);
}

var express = require("express");
var app = express();

var multer = require("multer");
var upload = multer({ dest: process.cwd() });

var cors = require('cors');
app.use(cors());

app.route('/').get(function(req, res) {
	res.sendFile(process.cwd() + '/index.html')
});

app.post('/action', upload.single('user-file'), function(req, res) {

	var metadata = {
		'Name': req.file.originalname,
		'MimeType': req.file.mimetype,
		'Size': req.file.size // size provides in bytes
	};

	res.send(metadata);

	var fs = require('fs');
	fs.unlink(req.file.path, function(err) { // https://nodejs.org/api/fs.html#fs_fs_unlink_path_callback
		if (err) throw err;
	});

});

var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log('Node.js listening on port ' + port)
});

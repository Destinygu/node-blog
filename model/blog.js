var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//存储发表日期
var date = new Date();
var today = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';

var blogSchema = new Schema({
	author: {
		type: ObjectId,
		ref: 'user'
	},
	title: {
		type: String
	},
	content: {
		type: String
	},
	time: {
		type: String,
		default: today
	},
	pv: {
		type: Number,
		default: 1
	}
});
module.exports = mongoose.model('blog', blogSchema);
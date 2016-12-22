/**
 * 用户表
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var BaseModel=require('./base_model');
var ObjectId=Schema.Types.ObjectId;
var UserSchema=new Schema({
	name:{type:String},
	loginname:{type:String},
	pass:{type:String},
	email:{type:String},
	phone:{type:String},
	job:{type:String},
	location:{type:String},
	role:{type:Number,default:0}, //角色，没有使用
	profile_image_url:{type:String}, //头像url
	signature:{type:String}, //签名
	score:{type:Number, default: 0}, //积分
	groupid:{type:ObjectId}, //所属用户组
    is_block: {type: Boolean, default: false},//是否ban
	reply_count:{ type: Number, default: 0 },
	create_at:{type:Date,default:Date.now},
	update_at: { type: Date, default: Date.now },
    
	active: { type: Boolean, default: false }, //状态

	retrieve_time: {type: Number},
	retrieve_key: {type: String},

	accessToken: {type: String} //可用来生成二维码图片扫描授权
});

UserSchema.plugin(BaseModel);
UserSchema.virtual('avatar_url').get(function () {
 var url = this.avatar || ('http://zengwei.duapp.com/assets/avatar.jpg?size=48');
  return url;
});

UserSchema.virtual('isAdvanced').get(function () {
  // 积分高于 700 则认为是高级用户
  return this.score > 700 || this.is_star;
});
//创建索引
UserSchema.index({loginname:1},{unique:true});
UserSchema.index({email:1},{unique:true});
UserSchema.index({score:-1});

mongoose.model('User',UserSchema);
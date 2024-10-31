//회원정보저장해야하니까 유저스키마만들거야.
// const mongoose = require("../db");
const mongoose=require('mongoose');
const {isEmail, isLowercase} = require("validator");
const bcrypt = require("bcrypt");//단방향 해싱 알고리즘

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true, "이메일을 입력해 주세요."],
        unique : true,
        lowercase : true,
        validate : [isEmail, "올바른 이메일 형식이 아닙니다"],


    },
    password : {
        type : String,
        required : [true,"비밀번호가 입력돼야 합니다"]
    }
});

userSchema.statics.signUp = async function (email, password) 
{
    const salt = await bcrypt.genSalt();
    console.log(salt);
    try{
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await this.create({email, password:
            hashedPassword
        });
        return {
            _id: user._id,
            email : user.email,
        };
    }catch (err) {
        throw err;
    }
    
}

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        //bcrypt알고리즘으로 해시되지않은 비번(password)과, 해시된비번(user.password)을비교
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user.visibleUser;
      }
      throw Error("incorrect password");
    }
    throw Error("incorrect email");
  };
  
const visibleUser = userSchema.virtual("visibleUser");

visibleUser.get(function (value, virtual, doc) {
  return {
    _id: doc._id,
    email: doc.email,
  };
});

const User = mongoose.model("user", userSchema);

module.exports = User;
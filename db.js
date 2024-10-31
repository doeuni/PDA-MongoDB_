const mongoose = require('mongoose');
const MONGO_HOST = 'mongodb+srv://admin:admin1234@cluster0.2inwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(MONGO_HOST, {
    retryWrites : true,
    w: "majority"
}).then(db =>{
    // console.log(db)
    console.log('db connect')
}).catch(err=>{
    console.error(err)
})

module.exports = mongoose;
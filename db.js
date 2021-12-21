function dbConnect() {
    //Db connection
const mongoose=require('mongoose')
const url='mongodb://localhost/comments'

mongoose.connect(url,{
  //  userNewUrlParser: true,
    useUnifiedTopology: true,
   // useFindAndModify: true
});


const connection=mongoose.connection

connection.once('open', function() {
    console.log('Database connected...');
}).on('error',function(error){
    console.log('this is error');
});

}
module.exports=dbConnect
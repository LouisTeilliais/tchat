var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://Louis:synology@cluster0.zapuf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const CompletedSchema = new mongoose.Schema({
    name: String,
    idt: Number
});

const fillSchema = mongoose.model('BDD', CompletedSchema);

const test = new fillSchema({ name: 'hello', idt: 1});
test.save();


async function start(){
    const print = await fillSchema.find();
    console.log(print);
}

start();

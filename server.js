const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const { dirname } = require('path');
// configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/barber', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
console.log('Connected to database successfully');
})
.catch((error) => {
console.log('Error connecting to database:', error.message);
});
const userSchema = new mongoose.Schema({
email: {
type: String,
required: true
},
password: {
type: String,
required: true
}
});
const Schema = new mongoose.Schema({
    name: {
    type: String,
    required: true
    },
    email: {
    type: String,
    required: true
    },
    phone:{
    type: String,
    required: true
    },
    date:{
        type: String,
        required: true 
    },
    time:{
        type:String,
        reqired:true
    },
    });
const User = mongoose.model('cust', userSchema);
const User1 = mongoose.model('book', Schema);
app.get('/', (req, res) => {
    res.send('<h1>Welcome</h1>');
});
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password });
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        if (existingUser.password !== password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    }else{
        const user = await User.create({ email, password });
    }
    res.sendFile(__dirname+'/untitled-2.html')
});
app.post('/book', async (req, res) => {
    const { name, email,phone, date, time } = req.body;
    console.log({ name, email,phone, date, time });
    User1.create({ name, email,phone, date, time });
    res.sendFile(__dirname+'/untitled-3.html')
});
app.use(express.static('Barber_Shop_img'));
app.listen(3000, () => {
    console.log('Server started on port 3000');
});8
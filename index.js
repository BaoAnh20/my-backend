const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); 

// 1. KẾT NỐI DATABASE (Đã sửa: Thêm /myOS vào trước dấu ?)
const mongoURI = "mongodb+srv://BaoAnh:ba20@myos.yymyzkf.mongodb.net/myOS?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
    .then(() => console.log("Đã kết nối MongoDB thành công!"))
    .catch(err => console.log("Lỗi kết nối DB:", err));

// 2. TẠO MODEL (Đã sửa: Thêm tham số 'tasks' để trỏ đúng bảng dữ liệu của Bảo Anh)
// const Task = mongoose.model('Task', { name: String }, 'tasks');

const Task = mongoose.model('Task', { name: String }, 'tasks');
// 3. CÁC ĐƯỜNG DẪN API
app.get('/', (req, res) => {
    res.send('Backend BAO ANH đã kết nối Database thành công!');
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Lỗi lấy dữ liệu" });
    }
});

app.post('/tasks', async (req, res) => {
    try {
        const newTask = new Task({ name: req.body.name });
        await newTask.save();
        res.json(newTask);
    } catch (error) {
        res.status(500).json({ error: "Lỗi thêm dữ liệu" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy tại port ${PORT}`));
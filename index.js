// const express = require('express');
// const app = express();
// app.get('/', (req, res) => res.send('API đang chạy!'));
// app.listen(process.env.PORT || 3000);






// const express = require('express');
// const cors = require('cors'); // Thêm thư viện để Frontend truy cập được
// const app = express();

// // Sử dụng middleware cors
// app.use(cors()); 

// app.get('/', (req, res) => {
//     res.send('Kết nối Backend - Frontend thành công! Dữ liệu từ Render đã về BAO ANH.');
// });

// // Render sẽ tự cấp PORT thông qua biến môi trường
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // Để đọc được dữ liệu JSON từ Frontend gửi lên

// 1. KẾT NỐI DATABASE
// Thay thế chuỗi dưới đây bằng chuỗi kết nối bạn vừa lấy được từ MongoDB Atlas
// const mongoURI = "mongodb+srv://BaoAnh:baoanh@myos.yymyzkf.mongodb.net/?appName=myOS";

// const mongoURI = "mongodb+srv://BaoAnh:baoanh@myos.yymyzkf.mongodb.net/myOS?retryWrites=true&w=majority";

// Thêm /myOS vào trước dấu ?
const mongoURI = "mongodb+srv://BaoAnh:baoanh@myos.yymyzkf.mongodb.net/myOS?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
    .then(() => console.log("Đã kết nối MongoDB thành công!"))
    .catch(err => console.log("Lỗi kết nối DB:", err));

// 2. TẠO MODEL (Cấu trúc bảng dữ liệu)
// const Task = mongoose.model('Task', { name: String }, 'tasks');


const Task = mongoose.model('Task', { name: String }, 'tasks');
// 3. CÁC ĐƯỜNG DẪN API (Chức năng website)
app.get('/', (req, res) => {
    res.send('Backend BAO ANH đã kết nối Database thành công!');
});

// API Lấy danh sách task từ Database
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// API Thêm task mới vào Database
app.post('/tasks', async (req, res) => {
    const newTask = new Task({ name: req.body.name });
    await newTask.save();
    res.json(newTask);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy tại port ${PORT}`));
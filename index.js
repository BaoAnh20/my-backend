// const express = require('express');
// const app = express();
// app.get('/', (req, res) => res.send('API đang chạy!'));
// app.listen(process.env.PORT || 3000);

const express = require('express');
const cors = require('cors'); // Thêm thư viện để Frontend truy cập được
const app = express();

// Sử dụng middleware cors
app.use(cors()); 

app.get('/', (req, res) => {
    res.send('Kết nối Backend - Frontend thành công! Dữ liệu từ Render đã về BAO ANH.');
});

// Render sẽ tự cấp PORT thông qua biến môi trường
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
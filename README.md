## 1. Methodology

เว็บไซต์มีส่วนประกอบของฟังก์ชันดังนี้:
- **Master Table (Table.jsx)**: แสดงรายชื่อผู้ใช้งานในรูปแบบตาราง
- **Detail (UserDetail.jsx)**: เมื่อคลิกที่ปุ่มหรือชื่อผู้ใช้ในตาราง จะแสดงรายละเอียดของผู้ใช้
- สามารถ **เพิ่ม/แก้ไข/ลบ** ข้อมูลผู้ใช้งานได้

### หลักการออกแบบที่ใช้
- **SOLID Principles**
  - **Single Responsibility Principle**: 
    - **Frontend**: แยกแต่ละ Component ใน `src/components/` ออกเป็นไฟล์ย่อย เช่น `UserTable`, `UserDetailModal` เพื่อให้ส่วน UI แต่ละส่วนรับผิดชอบหน้าที่ของตัวเอง
    - **Backend**: แยกโค้ดตามหน้าที่โดยให้ `models/`, `controllers/`, และ `routes/` มีหน้าที่เดียว
  - **Open/Closed Principle**: 
    - **Backend**: เพิ่ม Middleware หรือ Route ใหม่ได้โดยไม่แก้โค้ดเดิม
  - **Interface Segregation Principle**: 
    - **Backend**: Controller แต่ละตัวมีฟังก์ชันเฉพาะ เช่น `UserController`
    - **Frontend**: เช่นการเรียก API จะแยกไว้ใน `services/`
  - **Dependency Inversion Principle**:
    - **Frontend**: แยก Service API ออกจาก Component หลัก
- **MVC Architecture**: แยกส่วน Model, View และ Controller
- **Asynchronous Programming**: การใช้ async await
- **DRY (Don't Repeat Yourself)**: ลดการเขียนโค้ดซ้ำซ้อน
---

## 2. Setup and Run Instructions

### ขั้นตอนการติดตั้ง
1. **ติดตั้ง Dependencies**
   - ไปที่โฟลเดอร์ `frontend` และ `backend`
   ```bash
   cd frontend
   npm install
   cd ..
   cd backend
   npm install
   ```

2. **ตั้งค่า Environment Variables**
   - แก้ไขไฟล์ `.env` ในโฟลเดอร์ `frontend` และ `backend` เพื่อกำหนดค่าการเชื่อมต่อฐานข้อมูลและ API 

3. **รันฐานข้อมูล**
   - ตั้งค่าฐานข้อมูลตามโครงสร้างที่กำหนดในโฟลเดอร์ `models` โดยใช้ MongoDB 

4. **เริ่มต้น Backend Server**
   ```bash
   cd backend
   npm start
   ```

5. **เริ่มต้น Frontend**
   ```bash
   cd frontend
   npm run dev
   ```
---

## 3. Assignment Details

### โครงสร้างโค้ด (Code Structure)
#### Backend:
- **`index.js`**: ตัวเซิร์ฟเวอร์
- **`routes/`**: กำหนด API endpoints
- **`controllers/`**: จัดการ service ต่างๆ ของ API
- **`models/`**: กำหนดโครงสร้างของข้อมูล
- **`middlewares/`**: ฟังก์ชันที่กำหนด Middleware

#### Frontend:
- **`src/`**
  - **`components/`**: ส่วนประกอบของ UI เช่น ตาราง
  - **`pages/`**: หน้าเว็บ
  - **`services/`**: การเรียกใช้งาน API และ service

### โครงสร้างฐานข้อมูล (Database Structure)
- ฐานข้อมูลใช้ MongoDB
- Schema ของฐานข้อมูล (ไฟล์ใน `models/`):
  ```javascript
  const UserSchema = new mongoose.Schema({
    hn: {
        type: String,
        required: true,
        unique: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
  });
  ```

# Fe_Challenge_Bees

Dự án này bao gồm hai phần chính: một bài kiểm tra logic với hàm `processWithDelay` và một ứng dụng React được xây dựng bằng Vite và TypeScript với các tính năng CRUD cơ bản.

---

## Phần 1: LogicTest - Hàm `processWithDelay`

### Mục đích

Hàm `processWithDelay` được thiết kế để xử lý một tác vụ đồng bộ (synchronous task) sau một khoảng thời gian chờ (delay) có thể cấu hình được.

### Cách thức hoạt động

1.  **Sử dụng `setTimeout`**: Hàm này dùng `setTimeout` của JavaScript để lên lịch thực thi công việc sau một khoảng thời gian nhất định.
2.  **Trả về `Promise`**: Hàm trả về một `Promise`. Điều này cho phép bạn sử dụng cú pháp `async/await` để đợi cho đến khi công việc hoàn thành sau khoảng thời gian delay.
3.  **Delay Cấu hình được**: Khoảng thời gian delay có thể được chỉ định thông qua tham số đầu vào của hàm.

---

## Phần 2: App Development Test - Vite + React + TypeScript

### Giới thiệu

Phần này là một ứng dụng web được xây dựng với các công nghệ hiện đại bao gồm Vite, React và TypeScript. Ứng dụng cung cấp các chức năng quản lý dữ liệu cơ bản.

### Các tính năng chính

-   **Sắp xếp (Sort)**: Cho phép người dùng sắp xếp dữ liệu theo các cột như `name`, `balance`, `email` theo thứ tự tăng dần (A -> Z) hoặc giảm dần (Z -> A).
-   **Lọc (Filter)**: Cung cấp khả năng lọc dữ liệu dựa trên tên người dùng, giúp tìm kiếm thông tin nhanh chóng.
-   **Phân trang (Pagination)**: Chia nhỏ tập dữ liệu lớn thành các trang, chỉ hiển thị một số lượng bản ghi nhất định trên mỗi trang để cải thiện hiệu suất và trải nghiệm người dùng.
-   **Chế độ Sáng/Tối (Dark/Light Mode)**: Cho phép người dùng chuyển đổi giao diện giữa chế độ nền sáng (light) và nền tối (dark) tùy theo sở thích.

### Cài đặt và Chạy dự án

#### Yêu cầu

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt **Node.js** (khuyến nghị phiên bản LTS mới nhất). Nếu chưa có, bạn có thể tải và cài đặt từ trang chủ: [https://nodejs.org/](https://nodejs.org/)

#### Các bước cài đặt

1.  **Clone repository:**
    Mở terminal hoặc command prompt và chạy lệnh sau để tải mã nguồn về máy:
    ```bash
    git clone [https://github.com/LilWhiteFoxxx/Fe_Challenge_Bees.git](https://github.com/LilWhiteFoxxx/Fe_Challenge_Bees.git)
    ```

2.  **Di chuyển vào thư mục dự án:**
    ```bash
    cd Fe_Challenge_Bees
    ```
    *(Lưu ý: Thay `Fe_Challenge_Bees` bằng tên thư mục thực tế nếu khác)*

3.  **Cài đặt các phụ thuộc:**
    Sử dụng `npm` hoặc `yarn` để cài đặt tất cả các thư viện cần thiết cho dự án:
    ```bash
    npm install
    ```
    *Hoặc nếu bạn dùng Yarn:*
    ```bash
    yarn install
    ```

#### Chạy ứng dụng ở chế độ phát triển

Sau khi cài đặt xong các phụ thuộc, bạn có thể khởi động server phát triển bằng lệnh:
```bash
npm run dev

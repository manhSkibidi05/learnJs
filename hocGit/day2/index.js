// tạo mã ssh : giúp cho mỗi lần đẩy code lên 1 dự án mới sẽ biết ai là người đẩy và không cần đăng nhập 

// Các câu lệnh thường sử dụng đối với git trong việc quản lí mã nguồn

// + đối với dự án cá nhân
// - git init : tạo file .git cho dự án của bạn -> giúp cho git quản lí (quan sát sự thay đổi trong các file) các file trong dự án 
// - git add : thêm các file code đưa vào trạng thái chuẩn bị -> git add . (thêm toàn bộ file mới tạo hoặc những file có sự thay đối) sang trạng thái chuẩn bị
// - git status : kiểm tra trạng thái của các file code (vd : trước khi git add chưa cb , sau git add cb)
// - git commit -m : lưu lại các file ở trạng thái chuẩn bị vào file .git (lưu lại lịch sử của file code , người nào lưu , lời nhắn khi lưu)
// - git remote : tạo kết nối với kho lưu trữ cloud (lúc này tạo kết nối giữa dự án của bạn đối với repo trên github)
// - git push : đẩy toàn bộ file code đã được lưu lại trong file .git lên trên kho lưu trữ cloud (đẩy code lên repo đã kết nối trên github)

// -> lúc này sẽ thao tác các câu lệnh trong terminal trên folder dự án của bạn giúp lưu lại 1 phiên bản của dự án đẩy nó lên kho lưu trữ cloud 
// -> bạn có thể cập nhật lại các phiên bản mới trên kho lưu trữ cloud và xem lại các phiên bản cũ của dự án một cách dễ dàng


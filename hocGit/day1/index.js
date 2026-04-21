// git dùng để quản lí phiên bản của code trong 1 dự án
// -> git giúp lưu lại toàn bộ code dự án tại 1 thời điểm 

// các câu lệnh thực hành với git 

// - clone dự án trên mạng về :
// git clone http...(đường dẫn của dự án bạn muốn clone về máy của mình)

// - upload dự án lên repo trên github
// + cách 1 : 
// B1 :tạo 1 repo trống 
// B2 :clone dự án trống của repo đó về -> sử dụng git clone http..
// B3 :tạo file mới trong dự án đó
// B4 :đẩy file mới lên repo -> git add . (thêm toàn bộ file mới trong dự án)
// git commit m- "lời nhắn" -> git push origin (đẩy file đã chọn lên repo)
// -> cách này phù hợp với người mới 

// + cách 2 :
// B1 : sử dụng dự án đã có sẵn của bản thân
// B2 : git init dựa án đó -> giúp cho git quản lí các file trong dự án để thực hiện các lệnh của git tiếp
// B3 : git add . (chọn toàn bộ file trong dự án đó) -> git commit -m "lời nhắn"
// B4 : tạo repo mới trên github
// B5 : tạo kết nối repo đó với dự án muốn đẩy lên github -> git remote add origin http...(đường dẫn repo mới đó)
// B6 : đẩy lên github -> git push origin master  
// sau khi đẩy dự án lên lần đầu thành công -> những lần thay đổi file sau chỉ cần -> git add . -> git commit -m "lời nhắn" -> git push origin master
// -> vì lúc này đã có sẵn kết nối với repo trên github rồi và git đã quản lí các file trong dự án đó bằng lệnh git init 
// -> với những lần thay đổi code của dự án sau chỉ cần 2 bước 3 và bước 6
// -> sử dụng cách này thường xuyên 
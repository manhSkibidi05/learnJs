// câu lệnh git thường được sử dụng khi làm việc nhóm

// - git branch :  xem mình đang làm việc với nhánh nào , xem tất cả các nhánh , tạo nhánh mới 
// -> thường sẽ là tạo nhánh mới để phát triển độc lập 1 chức năng tách riêng với nhánh chính
// -> khi ở nhánh này các thao tác thay đổi và cập nhật file code khi push lên sẽ không ảnh hưởng tới file code ở nhánh chính chỉ tác động với nhánh đang làm việc

// - git checkout + nhánh : chuyển sang làm việc với nhánh do bạn chọn 
// -> thay đổi các file code khi chuyển sang nhánh tương ứng 

// - git pull origin + nhánh : lấy những file code do nhóm mới cập nhật về folder của mình
// -> khi nhóm bạn mới cập nhật code nhánh main bạn cần chuyển sang nhánh main rồi kéo những file code mới đó về folder của bạn

// - git merge + nhánh : gộp file code của nhánh riêng vào nhánh chính 
// -> kiểm tra xem có xung đột giữa các file của 2 nhánh chuẩn bị gộp với nhau 
// -> nhánh login đang muốn gộp vào nhánh main sau khi làm xong chức năng của nhánh login : lúc này nhánh login phải có những file code nằm trong main không thay đổi
// -> nhánh login sẽ có thêm những file mới muốn gộp vào main -> chuyển sang main git merge login -> gộp hoàn tất nhánh main có những file giống nhánh login
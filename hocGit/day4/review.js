// Các câu lệnh của git thao tác với file code -> giúp quản lí mã nguồn của dự án

// + Các thao tác với dự án cá nhân :
    // - git init : giúp cho git quản lí các file code trong dự án -> tạo folder .git giúp lưu trữ lịch sử các phiên bản code được commit
    // - git add : chuyển đổi trạng thái của file code sang trạng thái sẵn sàng -> các file sẵn sàng được hiển thị màu xanh trong terminal
    // - git status : kiểm tra tình trạng và trạng thái của file code -> kiểm tra các file bị xóa , bị sửa , sẵn sàng chuẩn bị được commit
    // - git commit -m : lưu lại lịch sử những file đang ở trang thái sẵn sàng , bao gồm lời nhắn , người commit vào folder .git
    // - git remote : giúp kết nối dự án của bạn đối với kho lưu trữ trên cloud (repo trên github)
    // - git push origin + nhánh : đẩy file code lên nhánh đã chọn của kho lưu trữ trên cloud 
    // - git clone + đường dẫn của dự án : clone dự án về máy của mình
    // -> các câu lệnh trên giúp quản lí dự án cá nhân -> đẩy các phiên bản của dự án lên kho lưu trữ cloud  , giúp kiểm soát lịch sử các phiên bản 
    // -> lưu trữ dự án online tránh mất file 

// + Các thao tác với dự án nhóm :
    // - git branch + nhánh: tạo ra nhánh làm việc mới , kiểm soát các nhánh làm việc hiện có 
    // -> với 1 dự án nhóm sẽ chia ra nhiều nhánh khác nhau để phát triển các chức năng khác nhau 
    // -> việc chia nhánh sẽ không làm ảnh hưởng tới nhánh chính -> sau khi xong chức năng có thể gộp vào nhánh chính rồi phát triển thêm các chức năng khác
    
    // - git checkout + nhánh: chuyển sang nhánh làm việc khác 
    // -> thay đổi nhánh làm việc ngay trong folder của mình giúp linh hoạt chuyển qua lại 2 nhánh 
    // -> thực chất việc chuyển nhánh là xóa hết file của nhánh cũ rồi sao chép các file trong nhánh mới vào folder hiện tại

    // - git pull origin + nhánh : kéo file code của nhánh bạn chọn về nhánh hiện tại
    // -> khi có thay đổi code tại 1 nhánh do đồng đội bạn thay đổi bạn cần kéo những thay đổi đó về nhánh hiện tại bạn làm việc
    // -> trường hợp đội bạn làm xong chức năng push code lên nhánh main bạn cần pull code mới trong nhánh main về 

    // - git merge + nhánh : gộp nhánh với nhau 
    // -> việc gộp nhánh khi bạn hoàn thành chức năng tại nhánh làm việc của riêng bạn -> bạn cần gộp vào nhánh main rồi push code lên cho đội bạn
    // -> việc gộp nhánh cần phải cẩn thận nếu có sự thay đổi file giữa 2 nhánh chuần bị gộp thì có thể gây ra conflict -> lỗi bất đồng bộ 
    // -> với các thao tác với dự án nhóm giúp việc chia ra các nhánh phát triển các chức năng sẽ giúp có không gian làm việc riêng của từng thành viên
    // -> khi hoàn thành chức năng cần gộp lại nhánh main để mọi người đều theo dõi tiến trình của dự án 
    // -> mỗi khi gộp cần lưu ý những thay đổi các file tránh gây lỗi conflict 
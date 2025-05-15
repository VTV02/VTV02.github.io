<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quản lý Bàn Giao/Thu Hồi Máy Tính</title>
    <link rel="icon" type="image/x-icon" href="assert/logo.jpg">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="wrapper">
        <h1 class="app-title">Quản lý Bàn Giao/Thu Hồi Máy Tính</h1>
        
        <div class="container">
            <!-- Form nhập liệu -->
            <div class="form-container">
                <h2 class="form-title">Thêm mới bản ghi</h2>
                
                <div class="row">
                    <div class="col-50">
                        <div class="form-group">
                            <label for="computerName" class="required-field">Tên máy tính</label>
                            <input type="text" id="computerName" placeholder="Nhập tên máy tính" required>
                        </div>
                    </div>
                    <div class="col-50">
                        <div class="form-group">
                            <label for="serialNumber" class="required-field">Số serial</label>
                            <input type="text" id="serialNumber" placeholder="Nhập số serial" required>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="configuration" class="required-field">Cấu hình máy</label>
                    <input type="text" id="configuration" placeholder="Nhập cấu hình máy" required>
                </div>
                
                <div class="row">
                    <div class="col-50">
                        <div class="form-group">
                            <label for="date">Ngày bàn giao/thu hồi</label>
                            <input type="date" id="date">
                        </div>
                    </div>
                    <div class="col-50">
                        <div class="form-group">
                            <label for="typeDevice">Loại thiết bị</label>
                            <select id="typeDevice">
                                <option value="Laptop">Laptop</option>
                                <option value="PC">PC</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="type">Hình thức</label>
                    <select id="type">
                        <option value="handover">Bàn giao</option>
                        <option value="recovery">Thu hồi</option>
                    </select>
                </div>
                
                <div class="row">
                    <div class="col-50">
                        <div class="form-group">
                            <label for="receiveBy" class="required-field">Người nhận</label>
                            <input type="text" id="receiveBy" placeholder="Nhập tên người nhận" required>
                        </div>
                    </div>
                    <div class="col-50">
                        <div class="form-group">
                            <label for="employeeId" class="required-field">Mã số nhân viên</label>
                            <input type="text" id="employeeId" placeholder="Nhập mã số nhân viên" required>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-50">
                        <div class="form-group">
                            <label for="department" class="required-field">Phòng ban</label>
                            <input type="text" id="department" placeholder="Nhập phòng ban" required>
                        </div>
                    </div>
                    <div class="col-50">
                        <div class="form-group">
                            <label for="responsible" class="required-field">Người giao</label>
                            <input type="text" id="responsible" placeholder="Nhập tên người giao" required>
                        </div>
                    </div>
                </div>
                
                <button class="add-btn" onclick="addEntry()">
                    <i class="fas fa-plus-circle"></i> Thêm vào lịch sử
                </button>
            </div>
            
            <!-- Bảng hiển thị -->
            <div class="data-container">
                <h2 class="form-title">Lịch sử bàn giao/thu hồi</h2>
                
                <div class="search-section">
                    <div class="search-box">
                        <i class="fas fa-search search-icon"></i>
                        <input type="text" id="searchInput" placeholder="Tìm kiếm..." oninput="searchEntries()">
                    </div>
                    
                    <div class="search-filters">
                        <select id="searchType" onchange="searchEntries()">
                            <option value="all">Tất cả</option>
                            <option value="computerName">Tên máy</option>
                            <option value="serialNumber">Số serial</option>
                            <option value="employeeId">Mã nhân viên</option>
                            <option value="receiveBy">Người nhận</option>
                            <option value="department">Phòng ban</option>
                        </select>
                        
                        <select id="filterType" onchange="searchEntries()">
                            <option value="all">Tất cả loại</option>
                            <option value="handover">Bàn giao</option>
                            <option value="recovery">Thu hồi</option>
                        </select>
                        
                        <select id="filterDevice" onchange="searchEntries()">
                            <option value="all">Tất cả thiết bị</option>
                            <option value="Laptop">Laptop</option>
                            <option value="PC">PC</option>
                        </select>
                    </div>
                </div>
                
                <div class="table-container">
                    <table id="historyTable">
                        <thead>
                            <tr>
                                <th>Tên máy</th>
                                <th>Số Serial</th>
                                <th>Thiết bị</th>
                                <th>Ngày</th>
                                <th>Loại</th>
                                <th>Người nhận</th>
                                <th>Mã NV</th>
                                <th>Phòng ban</th>
                                <th>Người giao</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">
                            <!-- Dữ liệu sẽ được thêm vào đây bằng JavaScript -->
                        </tbody>
                    </table>
                    <div id="emptyMessage" class="empty-message" style="display: none;">
                        Không có dữ liệu phù hợp với tìm kiếm
                    </div>
                </div>
                
                <div class="table-footer">
                    <div class="records-info">
                        <span id="recordCount">0</span> bản ghi
                    </div>
                    <div class="export-section">
                        <button class="export-btn" onclick="exportToExcel()">
                            <i class="fas fa-file-excel"></i> Xuất ra Excel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="footer">
        <p>Hệ thống Quản lý Bàn Giao/Thu Hồi Máy Tính</p>
        <p>© Copyright 2025 - Võ Văn Trung</p>
        <p>Địa chỉ: Khu Liên Hợp Snoul, THACO AGRI</p>
    </footer>

    <script src="scripts.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
</body>
</html>

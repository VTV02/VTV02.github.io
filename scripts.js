// Khởi tạo dữ liệu
let entries = JSON.parse(localStorage.getItem('computerHistory')) || [];

// Set ngày mặc định
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('date').value = new Date().toISOString().slice(0, 10);
    
    // Render bảng ban đầu
    renderTable(entries);
    updateRecordCount(entries.length);
    
    // Thêm sự kiện cho phím Enter trên trường tìm kiếm
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchEntries();
        }
    });
});

function addEntry() {
    const computerName = document.getElementById('computerName').value.trim();
    const serialNumber = document.getElementById('serialNumber').value.trim();
    const configuration = document.getElementById('configuration').value.trim();
    const receiveBy = document.getElementById('receiveBy').value.trim();
    const employeeId = document.getElementById('employeeId').value.trim();
    const department = document.getElementById('department').value.trim();
    const responsible = document.getElementById('responsible').value.trim();
    const typeDevice = document.getElementById('typeDevice').value;
    const type = document.getElementById('type').value;
    const date = document.getElementById('date').value;

    // Kiểm tra các trường bắt buộc
    if (!computerName || !serialNumber || !configuration || !receiveBy || !employeeId || !department || !responsible) {
        alert('Vui lòng điền đầy đủ các trường bắt buộc (*)');
        return;
    }

    const entry = {
        computerName: computerName,
        serialNumber: serialNumber,
        configuration: configuration,
        receiveBy: receiveBy,
        employeeId: employeeId,
        department: department,
        responsible: responsible,
        typeDevice: typeDevice,
        type: type,
        date: date,
        timestamp: new Date().getTime()
    };

    entries.unshift(entry); // Thêm vào đầu mảng để hiển thị mới nhất đầu tiên
    saveToLocalStorage();
    renderTable(entries);
    updateRecordCount(entries.length);
    clearForm();
    
    // Hiệu ứng thông báo
    showNotification('Thêm bản ghi thành công!', 'success');
}

function deleteEntry(timestamp) {
    if (confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) {
        entries = entries.filter(entry => entry.timestamp !== timestamp);
        saveToLocalStorage();
        renderTable(entries);
        updateRecordCount(entries.length);
        
        // Hiệu ứng thông báo
        showNotification('Đã xóa bản ghi!', 'warning');
    }
}

function searchEntries() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const searchType = document.getElementById('searchType').value;
    const filterType = document.getElementById('filterType').value;
    const filterDevice = document.getElementById('filterDevice').value;
    
    let filtered = entries;
    
    // Lọc theo loại thiết bị nếu không phải "all"
    if (filterDevice !== 'all') {
        filtered = filtered.filter(entry => entry.typeDevice === filterDevice);
    }
    
    // Lọc theo loại bàn giao/thu hồi nếu không phải "all"
    if (filterType !== 'all') {
        filtered = filtered.filter(entry => entry.type === filterType);
    }
    
    // Lọc theo từ khóa tìm kiếm và loại tìm kiếm
    if (searchTerm) {
        if (searchType === 'all') {
            filtered = filtered.filter(entry => 
                entry.computerName.toLowerCase().includes(searchTerm) ||
                entry.serialNumber.toLowerCase().includes(searchTerm) ||
                entry.employeeId.toLowerCase().includes(searchTerm) ||
                entry.receiveBy.toLowerCase().includes(searchTerm) ||
                entry.department.toLowerCase().includes(searchTerm) ||
                entry.responsible.toLowerCase().includes(searchTerm)
            );
        } else {
            filtered = filtered.filter(entry => 
                entry[searchType].toLowerCase().includes(searchTerm)
            );
        }
    }
    
    renderTable(filtered);
    updateRecordCount(filtered.length);
    
    // Hiển thị thông báo khi không có kết quả
    const emptyMessage = document.getElementById('emptyMessage');
    if (filtered.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }
}

function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    
    if (data.length === 0) {
        tbody.innerHTML = '';
        return;
    }
    
    tbody.innerHTML = data.map(entry => `
        <tr>
            <td>${entry.computerName}</td>
            <td>${entry.serialNumber}</td>
            <td><span class="badge badge-${entry.typeDevice === 'Laptop' ? 'laptop' : 'pc'}">${entry.typeDevice}</span></td>
            <td>${formatDate(entry.date)}</td>
            <td><span class="badge badge-${entry.type === 'handover' ? 'handover' : 'recovery'}">${entry.type === 'handover' ? 'Bàn giao' : 'Thu hồi'}</span></td>
            <td>${entry.receiveBy}</td>
            <td>${entry.employeeId}</td>
            <td>${entry.department}</td>
            <td>${entry.responsible}</td>
            <td>
                <button class="delete-btn" onclick="deleteEntry(${entry.timestamp})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

function updateRecordCount(count) {
    document.getElementById('recordCount').textContent = count;
}

function saveToLocalStorage() {
    localStorage.setItem('computerHistory', JSON.stringify(entries));
}

function clearForm() {
    document.getElementById('computerName').value = '';
    document.getElementById('serialNumber').value = '';
    document.getElementById('configuration').value = '';
    document.getElementById('receiveBy').value = '';
    document.getElementById('employeeId').value = '';
    document.getElementById('department').value = '';
    document.getElementById('responsible').value = '';
    document.getElementById('date').value = new Date().toISOString().slice(0, 10);
    document.getElementById('typeDevice').value = 'Laptop';
    document.getElementById('type').value = 'handover';
}

function showNotification(message, type) {
    // Tạo phần tử thông báo
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Thêm vào body
    document.body.appendChild(notification);
    
    // Hiển thị với animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function exportToExcel() {
    if (entries.length === 0) {
        alert("Không có dữ liệu để xuất!");
        return;
    }

    // Lấy dữ liệu hiện tại trên bảng (đã được lọc nếu có)
    const tableBody = document.getElementById('tableBody');
    const rows = tableBody.getElementsByTagName('tr');
    
    // Nếu không có dữ liệu hiển thị (đã lọc hết), thông báo
    if (rows.length === 0) {
        alert("Không có dữ liệu phù hợp để xuất!");
        return;
    }
    
    // Thu thập dữ liệu từ bảng hiện tại
    const visibleData = [];
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const rowData = {
            computerName: cells[0].textContent,
            serialNumber: cells[1].textContent,
            typeDevice: cells[2].textContent,
            date: cells[3].textContent,
            type: cells[4].textContent === 'Bàn giao' ? 'handover' : 'recovery',
            receiveBy: cells[5].textContent,
            employeeId: cells[6].textContent,
            department: cells[7].textContent,
            responsible: cells[8].textContent
        };
        visibleData.push(rowData);
    }

    const worksheetData = [
        ["Tên máy", "Số Serial", "Loại thiết bị", "Cấu hình", "Ngày", "Loại", "Người nhận", "Mã nhân viên", "Phòng ban", "Người phụ trách"],
        ...visibleData.map(entry => {
            // Tìm entry ban đầu để lấy thông tin cấu hình
            const originalEntry = entries.find(e => e.serialNumber === entry.serialNumber && e.employeeId === entry.employeeId);
            const configuration = originalEntry ? originalEntry.configuration : '';
            
            return [
                entry.computerName,
                entry.serialNumber,
                entry.typeDevice,
                configuration,
                entry.date,
                entry.type === 'handover' ? 'Bàn giao' : 'Thu hồi',
                entry.receiveBy,
                entry.employeeId,
                entry.department,
                entry.responsible
            ];
        })
    ];
    
    // Tạo worksheet
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    
    // Thiết lập độ rộng cột
    const columnWidths = [
        { wch: 15 }, // Tên máy
        { wch: 15 }, // Số Serial
        { wch: 12 }, // Loại thiết bị
        { wch: 25 }, // Cấu hình
        { wch: 12 }, // Ngày
        { wch: 10 }, // Loại
        { wch: 20 }, // Người nhận
        { wch: 12 }, // Mã nhân viên
        { wch: 15 }, // Phòng ban
        { wch: 20 }  // Người phụ trách
    ];
    ws['!cols'] = columnWidths;
    
    // Định dạng tiêu đề
    const headerStyle = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "4472C4" } },
        alignment: { horizontal: "center", vertical: "center" }
    };
    
    // Áp dụng style cho hàng tiêu đề
    const headerRange = XLSX.utils.decode_range(ws['!ref']).s.r; // Dòng đầu tiên
    for (let col = 0; col <= 9; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: headerRange, c: col });
        if (!ws[cellAddress]) continue;
        if (!ws[cellAddress].s) ws[cellAddress].s = {};
        ws[cellAddress].s = headerStyle;
    }
    
    // Định dạng cho các hàng dữ liệu (dải màu)
    for (let row = headerRange + 1; row <= visibleData.length + headerRange; row++) {
        const rowStyle = {
            fill: { fgColor: { rgb: row % 2 === 0 ? "E9EDF4" : "FFFFFF" } },
            alignment: { vertical: "center" }
        };
        
        for (let col = 0; col <= 9; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
            if (!ws[cellAddress]) continue;
            if (!ws[cellAddress].s) ws[cellAddress].s = {};
            ws[cellAddress].s = rowStyle;
        }
    }
    
    // Border cho toàn bộ bảng
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let row = range.s.r; row <= range.e.r; row++) {
        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
            if (!ws[cellAddress]) continue;
            if (!ws[cellAddress].s) ws[cellAddress].s = {};
            if (!ws[cellAddress].s.border) ws[cellAddress].s.border = {};
            
            ws[cellAddress].s.border = {
                top: { style: "thin", color: { rgb: "D0D7E5" } },
                left: { style: "thin", color: { rgb: "D0D7E5" } },
                bottom: { style: "thin", color: { rgb: "D0D7E5" } },
                right: { style: "thin", color: { rgb: "D0D7E5" } }
            };
        }
    }
    
    // Tạo workbook và thêm worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Lịch sử bàn giao");
    
    // Thêm trang thông tin
    const infoData = [
        ["THÔNG TIN BÁO CÁO"],
        ["Ngày xuất báo cáo:", new Date().toLocaleDateString('vi-VN')],
        ["Tổng số bản ghi:", visibleData.length.toString()],
        ["Bộ lọc đã áp dụng:", document.getElementById('searchInput').value || "Không có"],
        ["Xuất bởi:", "Hệ thống quản lý thiết bị"]
    ];
    
    const wsInfo = XLSX.utils.aoa_to_sheet(infoData);
    
    // Style cho trang thông tin
    const titleStyle = {
        font: { bold: true, size: 14, color: { rgb: "2F5597" } },
        alignment: { horizontal: "center" }
    };
    
    // Merge các ô cho tiêu đề
    wsInfo['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }];
    
    // Áp dụng style cho tiêu đề
    const titleCell = XLSX.utils.encode_cell({ r: 0, c: 0 });
    if (!wsInfo[titleCell].s) wsInfo[titleCell].s = {};
    wsInfo[titleCell].s = titleStyle;
    
    // Thêm worksheet thông tin vào workbook
    XLSX.utils.book_append_sheet(wb, wsInfo, "Thông tin");
    
    // Xuất file
    const fileName = `Lich_su_ban_giao_may_tinh_${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(wb, fileName);
    
    // Hiển thị thông báo xuất thành công
    showNotification('Xuất Excel thành công!', 'success');
}

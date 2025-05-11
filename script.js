// Khởi tạo dữ liệu
let entries = JSON.parse(localStorage.getItem('computerHistory')) || [];

// Set ngày mặc định
document.getElementById('date').value = new Date().toISOString().slice(0, 10);

// Render bảng ban đầu
renderTable(entries);

function addEntry() {
    const computerName = document.getElementById('computerName').value.trim();
    const serialNumber = document.getElementById('serialNumber').value.trim();
    const responsible = document.getElementById('responsible').value.trim();
    const configuration = document.getElementById('configuration').value.trim();
    const typeDevice = document.getElementById('typeDevice').value;
    const receiveBy = document.getElementById('receiveBy').value.trim();
    const employeeId = document.getElementById('employeeId').value.trim();
    const department = document.getElementById('department').value.trim();
    const type = document.getElementById('type').value;

    if (!computerName || !serialNumber || !responsible) {
        alert('Vui lòng điền đầy đủ các trường bắt buộc (*)');
        return;
    }

    const entry = {
        computerName: computerName,
        serialNumber: serialNumber,
        date: document.getElementById('date').value,
        type: type,
        responsible: responsible,
        timestamp: new Date().getTime(),
        configuration: configuration,
        receiveBy: receiveBy,
        employeeId: employeeId,
        department: department,
        typeDevice: typeDevice
    };

    entries.push(entry);
    saveToLocalStorage();
    renderTable(entries);
    clearForm();
}

function deleteEntry(timestamp) {
    if (confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) {
        entries = entries.filter(entry => entry.timestamp !== timestamp);
        saveToLocalStorage();
        renderTable(entries);
    }
}

function searchEntries() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = entries.filter(entry => 
        entry.computerName.toLowerCase().includes(searchTerm) ||
        entry.serialNumber.toLowerCase().includes(searchTerm) ||
        entry.responsible.toLowerCase().includes(searchTerm)
    );
    renderTable(filtered);
}

function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = data.map(entry => `
        <tr>
            <td>${entry.computerName}</td>
            <td>${entry.serialNumber}</td>
            <td>${entry.configuration || ''}</td>
            <td>${entry.typeDevice === 'Laptop' ? 'Laptop' : 'PC'}</td>
            <td>${entry.date}</td>
            <td>${entry.type === 'handover' ? 'Bàn giao' : 'Thu hồi'}</td>
            <td>${entry.receiveBy || ''}</td>
            <td>${entry.employeeId || ''}</td>
            <td>${entry.department || ''}</td>
            <td>${entry.responsible}</td>
            <td>
                <button class="delete-btn" onclick="deleteEntry(${entry.timestamp})">Xóa</button>
            </td>
        </tr>
    `).join('');
}

function saveToLocalStorage() {
    localStorage.setItem('computerHistory', JSON.stringify(entries));
}

function clearForm() {
    document.getElementById('computerName').value = '';
    document.getElementById('serialNumber').value = '';
    document.getElementById('configuration').value = '';
    document.getElementById('date').value = new Date().toISOString().slice(0, 10);
    document.getElementById('typeDevice').value = '';
    document.getElementById('receiveBy').value = '';
    document.getElementById('employeeId').value = '';
    document.getElementById('department').value = '';
    document.getElementById('responsible').value = '';      
}

function exportToExcel() {
    if (entries.length === 0) {
        alert("Không có dữ liệu để xuất!");
        return;
    }

    const worksheetData = [
        ["Tên máy", "Số Serial", "Cấu hình", "Loại thiết bị", "Ngày", "Loại", "Người nhận", "Mã nhân viên", "Phòng ban", "Người phụ trách"],
        ...entries.map(entry => [
            entry.computerName,
            entry.serialNumber,
            entry.configuration || '',
            entry.typeDevice === 'Laptop' ? 'Laptop' : 'PC',
            entry.date,
            entry.type === 'handover' ? 'Bàn giao' : 'Thu hồi',
            entry.receiveBy || '',
            entry.employeeId || '',
            entry.department || '',
            entry.responsible
        ])
    ];
    
    // Tạo worksheet
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    
    // Thiết lập độ rộng cột
    const columnWidths = [
        { wch: 15 }, // Tên máy
        { wch: 15 }, // Số Serial
        { wch: 25 }, // Cấu hình
        { wch: 12 }, // Loại thiết bị
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
    for (let row = headerRange + 1; row <= entries.length + headerRange; row++) {
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
        ["Tổng số bản ghi:", entries.length.toString()],
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
    XLSX.writeFile(wb, 'Lich_su_ban_giao_may_tinh.xlsx');
}
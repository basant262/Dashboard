// تفعيل البحث في الجداول
document.addEventListener('DOMContentLoaded', function() {
    // تفعيل وظيفة البحث
    const searchBoxes = document.querySelectorAll('.search-box input');
    
    searchBoxes.forEach(searchBox => {
        searchBox.addEventListener('input', function() {
            const table = this.closest('.table-container').querySelector('table');
            const rows = table.querySelectorAll('tbody tr');
            const searchTerm = this.value.toLowerCase();
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
    
    // تفعيل أزرار الإجراءات
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            const row = this.closest('tr');
            const id = row.cells[0].textContent;
            const name = row.cells[1].textContent;
            
            switch(action) {
                case 'عرض':
                    alert(`عرض بيانات ${name} (ID: ${id})`);
                    break;
                case 'تعديل':
                    alert(`تعديل بيانات ${name} (ID: ${id})`);
                    break;
                case 'حذف':
                    if (confirm(`هل أنت متأكد من حذف ${name}؟`)) {
                        row.remove();
                    }
                    break;
            }
        });
    });
    
    // تفعيل النماذج
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('تم حفظ البيانات بنجاح!');
        });
    });
});
// تفعيل أزرار العرض في صفحة المستخدمين
document.addEventListener('DOMContentLoaded', function() {
    // إذا كانت الصفحة الحالية هي صفحة المستخدمين
    if (window.location.pathname.includes('users.html') || 
        window.location.pathname === '/users.html') {
        
        const viewButtons = document.querySelectorAll('.btn-view');
        
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const userId = row.cells[0].textContent;
                const userName = row.cells[1].textContent;
                
                // الانتقال إلى صفحة الملف الشخصي
                window.location.href = `user-profile.html?id=${userId}&name=${encodeURIComponent(userName)}`;
            });
        });
        
        // تفعيل أزرار التعديل
        const editButtons = document.querySelectorAll('.btn-edit');
        
        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const userId = row.cells[0].textContent;
                const userName = row.cells[1].textContent;
                
                // الانتقال إلى صفحة التعديل
                window.location.href = `user-edit.html?id=${userId}&name=${encodeURIComponent(userName)}`;
            });
        });
    }
    
    // معالجة معلمات URL في صفحات الملف الشخصي والتعديل
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    const userName = urlParams.get('name');
    
    if (userId) {
        // تحديث البيانات بناءً على معرّف المستخدم
        console.log(`تحميل بيانات المستخدم: ${userId}`);
        
        if (userName) {
            // تحديث العنوان إذا كان هناك اسم مستخدم
            const pageTitle = document.querySelector('.page-title');
            if (pageTitle && pageTitle.textContent.includes('المستخدم')) {
                pageTitle.textContent = `${pageTitle.textContent} - ${userName}`;
            }
        }
    }
});
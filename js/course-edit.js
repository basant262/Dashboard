// تفعيل صفحة تعديل الدورة
document.addEventListener('DOMContentLoaded', function() {
    // تفعيل التبويبات
    const formTabs = document.querySelectorAll('.form-tab');
    const tabContents = document.querySelectorAll('.form-tab-content');
    
    formTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // إزالة النشاط من جميع الأزرار والمحتوى
            formTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // إضافة النشاط للزر والمحتوى المحدد
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // تفعيل رفع الصورة
    const courseImage = document.getElementById('course-image');
    const courseAvatar = document.querySelector('.edit-course-avatar');
    
    courseImage.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                courseAvatar.innerHTML = `
                    <img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 25px;">
                    <input type="file" id="course-image" accept="image/*">
                    <div class="change-text">تغيير الصورة</div>
                `;
                // إعادة تفعيل المستمع
                document.getElementById('course-image').addEventListener('change', arguments.callee);
            };
            reader.readAsDataURL(file);
        }
    });

    // تفعيل أزرار إضافة الدروس
    document.querySelectorAll('.add-lesson').forEach(button => {
        button.addEventListener('click', function() {
            const lessonsList = this.previousElementSibling;
            const newLesson = document.createElement('div');
            newLesson.className = 'lesson-item';
            newLesson.innerHTML = `
                <input type="text" class="lesson-input" placeholder="اسم الدرس">
                <input type="text" class="lesson-duration-input" placeholder="المدة">
                <button type="button" class="btn btn-danger btn-sm">
                    <i class="fas fa-times"></i>
                </button>
            `;
            lessonsList.appendChild(newLesson);
            
            // تفعيل زر الحذف للدرس الجديد
            newLesson.querySelector('.btn-danger').addEventListener('click', function() {
                newLesson.remove();
            });
        });
    });

    // تفعيل أزرار فتح/إغلاق الأقسام
    document.querySelectorAll('.btn-toggle').forEach(button => {
        button.addEventListener('click', function() {
            const section = this.closest('.section-editor');
            const lessonsList = section.querySelector('.lessons-list');
            const icon = this.querySelector('i');
            
            if (lessonsList.style.display === 'none') {
                lessonsList.style.display = 'block';
                icon.className = 'fas fa-chevron-up';
            } else {
                lessonsList.style.display = 'none';
                icon.className = 'fas fa-chevron-down';
            }
        });
    });

    // تفعيل زر إضافة قسم جديد
    document.getElementById('addSectionBtn').addEventListener('click', function() {
        const curriculumEditor = document.querySelector('.curriculum-editor');
        const newSection = document.createElement('div');
        newSection.className = 'section-editor';
        newSection.innerHTML = `
            <div class="section-header">
                <input type="text" class="section-title-input" placeholder="اسم القسم الجديد">
                <div class="section-actions">
                    <button type="button" class="btn btn-danger btn-sm">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button type="button" class="btn btn-secondary btn-sm btn-toggle">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            </div>
            <div class="lessons-list" style="display: none;">
                <!-- دروس ستظهر عند النقر -->
            </div>
            <button type="button" class="btn btn-secondary btn-sm add-lesson">
                <i class="fas fa-plus"></i> إضافة درس جديد
            </button>
        `;
        
        curriculumEditor.insertBefore(newSection, this);
        
        // تفعيل الأزرار في القسم الجديد
        newSection.querySelector('.btn-danger').addEventListener('click', function() {
            newSection.remove();
        });
        
        newSection.querySelector('.btn-toggle').addEventListener('click', function() {
            const lessonsList = newSection.querySelector('.lessons-list');
            const icon = this.querySelector('i');
            
            if (lessonsList.style.display === 'none') {
                lessonsList.style.display = 'block';
                icon.className = 'fas fa-chevron-up';
            } else {
                lessonsList.style.display = 'none';
                icon.className = 'fas fa-chevron-down';
            }
        });
        
        newSection.querySelector('.add-lesson').addEventListener('click', function() {
            const lessonsList = newSection.querySelector('.lessons-list');
            const newLesson = document.createElement('div');
            newLesson.className = 'lesson-item';
            newLesson.innerHTML = `
                <input type="text" class="lesson-input" placeholder="اسم الدرس">
                <input type="text" class="lesson-duration-input" placeholder="المدة">
                <button type="button" class="btn btn-danger btn-sm">
                    <i class="fas fa-times"></i>
                </button>
            `;
            lessonsList.appendChild(newLesson);
            
            newLesson.querySelector('.btn-danger').addEventListener('click', function() {
                newLesson.remove();
            });
        });
    });

    // تفعيل النموذج
    document.getElementById('editCourseForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // محاكاة حفظ البيانات
        const courseName = document.getElementById('course-name').value;
        
        // عرض رسالة نجاح
        showNotification('تم حفظ التعديلات بنجاح', 'success');
        
        // إعادة التوجيه بعد ثانيتين
        setTimeout(() => {
            window.location.href = 'course-details.html?id=1';
        }, 2000);
    });

    // تفعيل زر الإلغاء
    document.getElementById('cancelBtn').addEventListener('click', function() {
        if (confirm('هل تريد إلغاء التعديلات؟ سيتم فقدان جميع التغييرات غير المحفوظة.')) {
            window.location.href = 'course-details.html?id=1';
        }
    });

    // تفعيل زر المعاينة
    document.getElementById('previewBtn').addEventListener('click', function() {
        alert('فتح صفحة معاينة الدورة');
        // يمكن فتح نافذة جديدة أو تبويب للمعاينة
    });

    // دالة عرض الإشعارات
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // إظهار الإشعار
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // إخفاء الإشعار بعد 3 ثوانٍ
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});
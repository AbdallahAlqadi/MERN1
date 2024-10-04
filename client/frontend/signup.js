var form = document.getElementById('form');

form.addEventListener('submit', async function (e) {
    e.preventDefault(); // منع الإرسال التلقائي للنموذج

    // الحصول على القيم الحالية من الحقول
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;

    // post
    const userData = {
        username: username,
        email: email,
        password: password
    };

    try {
        const response = await fetch('http://127.0.0.1:5002/api/signup', {
            method: 'POST',  //لازم capital
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        // تحقق مما إذا كانت الاستجابة ناجحة
        if (!response.ok) {
            const errorText = await response.text(); // قراءة نص الاستجابة
            throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
        }

        // تحويل الاستجابة إلى JSON
        const data = await response.json();
        console.log('Success:', data); // طباعة البيانات المستلمة من الـ backend

        // بعد نجاح عملية التسجيل، قم بتحديث البيانات في الجدول
        getData();

        // مسح الحقول بعد نجاح التسجيل
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('email').value = '';

    } catch (error) {
        console.error('Error:', error); // التعامل مع الخطأ في حال حدوثه
    }
});

// دالة getData لعرض البيانات في الجدول

// دالة getData لعرض البيانات في الجدول
var AllData = [];
async function getData() {
    try {
        const response = await fetch('http://127.0.0.1:5002/api/signup/users');
        const data = await response.json();
        console.log(data);
        AllData = data;

        var tbody = document.getElementById('tbody'); // افتراض وجود عنصر tbody بـ id 'tbody' في الـ HTML

        // مسح المحتوى الحالي للـ tbody قبل إضافة الصفوف الجديدة
        tbody.innerHTML = '';

        // التحقق من أن AllData موجودة وهي مصفوفة
        for (let i = 0; i < AllData.length; i++) {
            // إنشاء صف جديد
            var tr1 = document.createElement('tr');
            tr1.className = 'tr1-t6';
        
            // إنشاء عمود 'id'
            var td1 = document.createElement('td');
            td1.className = 'td1-t6';
            td1.innerHTML = AllData[i]._id;
        
            // إنشاء عمود 'username'
            var td2 = document.createElement('td');
            td2.className = 'td2-t6';
            td2.innerHTML = AllData[i].username;
        
            // إنشاء عمود 'email'
            var td3 = document.createElement('td');
            td3.className = 'td3-t6';
            td3.innerHTML = AllData[i].email;
        
            // إنشاء عمود 'password'
            var td4 = document.createElement('td');
            td4.className = 'td4-t6';
            td4.innerHTML = AllData[i].password;
        
            // زر الحذف
            var button = document.createElement('button');
            button.className = 'button-t6';
            button.innerHTML = 'Delete';
            var td5 = document.createElement('td');
            td5.className = 't5-t6';
            td5.appendChild(button);
        
            // دالة الضغط لحذف المستخدم
            (function(id) {
                button.onclick = function() {
                    deleteData(id); 
                };
            })(AllData[i]._id);
        
            // زر التحديث
            var button2 = document.createElement('button');
            button2.className = 'button2-t6';
            button2.innerHTML = 'Update'; // تعديل الاسم ليكون بالحروف الكبيرة
            
            var td6 = document.createElement('td');
            td6.className = 't6-t6';
            td6.appendChild(button2);
        
            // ربط زر التحديث مع دالة updateData داخل الحلقة
            (function(id, usernameField, emailField, passwordField) {
                button2.onclick = function() {
                    // إدخال البيانات الجديدة لتحديث المستخدم من الحقول في النموذج
                    const updatedUser = {
                        username: usernameField.value,
                        email: emailField.value,
                        password: passwordField.value
                    };
        
                    // استدعاء دالة التحديث
                    updateData(id, updatedUser);
                };
            })(AllData[i]._id, 
              document.getElementById('username'), 
              document.getElementById('email'), 
              document.getElementById('password'));
        
            // إضافة الأعمدة إلى الصف
            tr1.append(td1);
            tr1.append(td2);
            tr1.append(td3);
            tr1.append(td4);
            tr1.append(td5);
            tr1.append(td6);
        
            // إضافة الصف إلى tbody
            tbody.append(tr1);
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
}


// استدعاء function
getData(); // Call the function to fetch and render the data



//Delete
async function deleteData(id) {
    try {
        const response = await fetch(`http://127.0.0.1:5002/api/signup/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();  // قراءة الاستجابة النصية للتفاصيل
            throw new Error(`Failed to delete data: ${response.statusText}. Response: ${errorText}`);
        }

        if (response.status !== 204) {  // إذا لم تكن الحالة 204 (لا توجد محتويات)
            const result = await response.json(); // تحليل إذا كانت الاستجابة JSON
            console.log('Success:', result);
        } else {
            console.log('Deletion successful. No content returned.');
        }

        // تحديث البيانات بعد الحذف
        getData();

    } catch (error) {
        console.error('Error:', error);
    }

    console.log('Deleted ID:', id); // Log the id of the deleted item
}





// PUT (تحديث البيانات)
async function updateData(id, updatedUser) {
    try {
        const response = await fetch(`http://127.0.0.1:5002/api/signup/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser) // إرسال البيانات الجديدة لتحديث المستخدم
        });

        if (!response.ok) {
            const errorText = await response.text();  // قراءة الاستجابة النصية للتفاصيل
            throw new Error(`Failed to update data: ${response.statusText}. Response: ${errorText}`);
        }

        const result = await response.json();
        console.log('Update Success:', result);

        // تحديث البيانات بعد التعديل
        getData();

    } catch (error) {
        console.error('Error:', error);
    }
}


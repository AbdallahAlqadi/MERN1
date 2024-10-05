var form = document.getElementById('form');

// post
form.addEventListener('submit', async function (e) {
    e.preventDefault(); // منع الإرسال التلقائي للنموذج

    // الحصول على القيم الحالية من الحقول
    const userData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('http://127.0.0.1:5002/api/signup', {
            method: 'POST', //لازم capital
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        console.log('Success:', data);
        getData(); 

        // مسح الحقول
        form.reset();
    

    } catch (error) {
        console.error('Error:', error);
        
    }
});

// دالة getData لعرض البيانات في الجدول
//get
async function getData() {
    try {
        const response = await fetch('http://127.0.0.1:5002/api/signup/users');
        const data = await response.json();

        const tbody = document.getElementById('tbody');
        tbody.innerHTML = ''; // مسح المحتوى الحالي
        var i = 1;
        data.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${i}</td>
                <td>${user._id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td><button id="delete" onclick="deleteData('${user._id}')">Delete</button></td>
                <td><button id="update" data-toggle="modal" data-target="#exampleModal" onclick="updateinfo('${user._id}', '${user.username}', '${user.email}','${user.password}')">Update</button></td>
            `;
            tbody.append(tr);
            i++;
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

// استدعاء getData عند تحميل الصفحة
getData();




// Delete
async function deleteData(id) {
    try {
        const response = await fetch(`http://127.0.0.1:5002/api/signup/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        getData(); // تحديث الجدول بعد الحذف

    } catch (error) {
        console.error('Error:', error);
    }
}

// Update
var currentUserId; // متغير لتخزين معرف المستخدم الحالي

function updateinfo(id, username, email) {
    currentUserId = id; // تخزين معرف المستخدم الحالي
    document.getElementById('muser').value = username;
    document.getElementById('memail').value = email;
    document.getElementById('mpass').value = password; // مسح كلمة المرور القديمة
}

// إضافة حدث زر التحديث
document.getElementById('change').addEventListener('click', async function(e) {
    e.preventDefault(); //

    // الحصول على القيم الجديدة من الحقول
    const updatedUser = {
        username: document.getElementById('muser').value,
        email: document.getElementById('memail').value,
        password: document.getElementById('mpass').value // يمكنك ترك كلمة المرور فارغة إذا لم تكن تريد تغييرها
    };

    try {
        const response = await fetch(`http://127.0.0.1:5002/api/signup/update/${currentUserId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser)
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        console.log('Update Success');
        getData(); // تحديث الجدول بعد التحديث

        // إغلاق المودال بعد التحديث
        $('#exampleModal').modal('hide'); // استخدم jQuery لإغلاق المودال

    } catch (error) {
        console.error('Error:', error);
    }
});

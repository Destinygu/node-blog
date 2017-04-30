var dagu = {};
dagu._data = {};

// reg.html
dagu.regData = function(_this) {
    // 表单验证
    if ($("#name").val() == "") {
        $("#name").focus();
        alert('姓名不能为空');
        return false;
    }

    if ($("#email").val().indexOf("@") == -1 || $("#email").val().indexOf(".") == -1) {
        alert('邮箱格式不对');
        $("#name").focus();
        return false;
    }

    var pw = $("#password").val().trim();

    if (/^\w{6,}$/.test(pw)) {
        alert('密码长度至少要六位');
        $("#password").focus();
        return false;
    }

    if ($("#confpw").val() != $("#password").val()) {
        alert('两次密码不同');
        $("#confw").focus();
        return false;
    }

    //传递数据
    $.post('/reg', {
        "name": $('#name').val(),
        "password": $('#password').val(),
        "email": $("#email").val()
    }, function(data) {
        console.log(data);
        $('#content').html(data.msg);
        $('#myModal').modal('show');
        dagu._data = data;
    });

};
// 如果注册成功,就跳转到主页
dagu.gotoUrl = function(_this) {
    if (dagu._data.status) {
        window.location.href = '/';
    }
};

//   login.html
dagu.loginData = function(_this) {
    $.post('/login', {
        "email": $('#email').val(),
        "password": $('#password').val()
    }, function(data) {
        $('#content').html(data.msg);
        $('#myModal').modal('show');
        if (data.status) {
            window.location.href = '/';
        }
    });
};

// 修改文章
dagu.updateData = function() {
    var view_id = $('#view_id').val();
    $.post("/list/view_id/editor", {
        "_id": view_id,
        "title": $('#title').val(),
        "content": $('#content').val()
    }, function(data) {
        if (data.status) {
            alert("修改成功");
            window.location.href = '/list';
        } else {
            alert("修改失败");
        }
    });
};

dagu.confirmAct = function() {
    if (confirm('确定要执行此操作吗?')) {
        return true;
    }
    return false;
};
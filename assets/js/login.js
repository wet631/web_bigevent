$(function () {
    // 点击去注册账号让 登录框隐藏，注册框显示
    $('#link_reg').click(() => {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 点击去登录让注册框隐藏，登录框显示
    $('#link_login').click(() => {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //引入form模块
    const form = layui.form;
    // 从 LayUI 中获取 form 对象
    const layer = layui.layer;

    // 通过 form.verify() 方法自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: value => {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            const pwd = $('#form_reg [name=password]').val();
            if (pwd !== value) return "两次密码不一致";
        }
    });

    const baseUrl = 'http://www.liulongbin.top:3007';

    //注册功能
    $('#form_reg').on('submit', (e) => {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg  [name=password]').val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg('注册失败');
                layer.msg('注册成功')
                $('#link_login').click();
            }
        })
    })

    //登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            //username=zs&password=123456
            success: (res) => {
                if (res.status !== 0) return layer.msg('登录失败')
                layer.msg('登录成功')
                //登录成功后需要把token存放到本地
                //登录的唯一标识并存到本地
                localStorage.setItem('token', res.token)
                // console.log(token);
                //跳转到主页
                location.href = '/index.html'
            }
        })
    })



})
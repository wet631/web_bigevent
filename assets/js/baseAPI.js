// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter((options) => {
    // console.log(option.url);
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = `http://www.liulongbin.top:3007` + options.url;

    //为/my/相关接口注入token
    if (options.url.includes("/my/")) {
        options.headers = {
            Authorization: localStorage.getItem("token"),
        };
    }


    //每次发送请求回来效验 token是否存在
    // 不论成功还是失败，最终都会调用 complete 回调函数
    options.complete = res => {
        // console.log(res);
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 &&
            res.responseJSON.message === "身份认证失败！") {
            //1.强制清空
            localStorage.removeItem('token')
            //2.跳转登录页面
            location.href = '/login.html'
        }
    }
});
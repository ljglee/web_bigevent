//每次调用$.get() $.post() $.ajax()的时候会优先调用ajaxPrefilter 在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
// 发起真正的Ajax请求之前,统一拼接请求的根路径
options.url='http://ajax.frontend.itheima.net'+options.url;
if(options.url.indexOf('/my/')!==-1){
    options.headers={
        Authorization:localStorage.getItem('token')||''
    }
    options.complete=function(res){
        if(res.responseJSON.status===1&& responseJSON.message==='身份认证失败!')
        {
            localStorage.removeItem('token')
            location.href('/login.html')
        }
    }
}

})
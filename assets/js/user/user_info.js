$(function(){
    var form=layui.form

    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                form.val('formUserInfo',res.data)
            }
    
        })
    }
    initUserInfo()


    $('#btnReset').on('click',function(e){
        e.preventDdfault()
        initUserInfo()        
    })

    // 发起请求更新用户信息
    $('.layui-form').on('submit',function(e){
        e.preventDdfault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新用户失败!')

                }
                layer.msg('更新用户成功')
                // 调用父页面中方法，重新渲染用户头像和用户信息
                window.parent.getUserInfo()

            }

        })
    })



})


$(function(){
    var layer=layui.layer
    var form=layer.form
    initCate()
    // 定义加载文章分类方法
    function initCate(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('初始化文章分类失败!')
                }
                    // 调用模板引擎，渲染分类下拉菜单
                var htmlStr=template('tpl-cate',res)
                $('[home=cate_id]').html(htmlStr)
                form.render()
            }
        

        })
    }

// 初始化富文本编辑器
initEditor()

// 初始化图片剪辑
var $image=$('#image')
// 裁剪选项
var options={
    aspectRatio:400/280,
    preview:'.img-preview'
}
// 初始化裁剪区域
$image.cropper(options)
// // 用户选择文件
// var file=e.target.files[0]
// var newImgURL=URL.createObjectURL(file)

// $image
//     .cropper('destroy')
//     .attr('src',newImgURL)
//     .cropper(options)
// $image
//     .cropper('getCroppedCanvas',{width:400,height:280})
//      .toBlob(function(blob){  //将画布内容转化为文件对象。

//     })


$('#btnChooseImage').on('click',function(){
    $('#coverFile').click()
})
$('#coverFile').on('change',function(e){
    // 获取文件的列表
    var files=e.target.files
    // 判断用户是否选择了文件
    if(files.length===0){
        return
    }
    var newImgURL=URL.createObjectURL(file)
    
    // 裁剪区重新设置图片
    $image
    .cropper('destroy')
    .attr('src',newImgURL)
    .cropper(options)
})

var art_state='已发布'

$('#btnSave2').on('click',function(){
    art_state='草稿'
})

// 基于form的id创建formdata
$('#form-pub').on('submit',function(e){
    e.preventDefault()
    var fd=new FormData($(this)[0])
    fd.append('state',art_state)
    $image
        .cropper('getCroppedCanvas',{
            width:400,
            height:280
        })
        .toBlob(function(blob){
            fd.append('cover_img',blob)
            publishArticle(fd)

        })
})
// 发布文章方法
function publishArticle(fd){
    $.ajax({
        method:'POST',
        url:'/my/article/add',
        data:fd,
        contenType:false,
        processData:false,
        success:function(res){
            if(res.status!==0){
                return layer.msg('发布文章失败!')
            }
            layer.msg('发布文章成功!')
            location.href='/article/art_list.html'
        }

    })
}
})




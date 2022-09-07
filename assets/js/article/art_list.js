var q={
    pagenum:1,
    pagesize:2,
    cate_id:'',
    state:''
}
initTable()
var layer=layui.layer
var form=layer.form
function initTable(){
    $.ajax({
        method:'GET',
        url:'/my/article/list',
        data:q,
        success:function(res){
            if(res.status!==0){
                return layer.msg('获取文章列表失败！')
            }
        var htmlStr=template('tpl-table',res)
        $('tbody').html(htmlStr)
        // 调用渲染分页的方法
        renderPage(res.total)

        }
    })
}
// 时间格式
template.defaults.imports.dataFormat=function(date){
    const dt=new Date(date)

    var y=dt.getFullYear()
    var m=padZero(dt.getMonth()+1)
    var d=padZero(dt.getDate())

    var hh=padZero(dt.getHours())
    var mm=padZero(dt.getMinutes())
    var ss=padZero(dt.getSeconds())

    return y+'-'+m+'-'+d+' '+hh+':'+mm+':'+ss
}
// 补零函数
function padZero(n){
return n>9?n:'0'+n
}

// 请求文章分类列表
initCate()

// 初始化文章分类方法
function initCate(){
    $.ajax({
        method:'GET',
        url:'/my/article/cates',
        success:function(res){
            if(res.status!==0){
                return layer.msg('获取分类数据失败!')
            }
            // 调用模板引擎渲染分类的可选项
            var htmlStr=template('tpl-cate',res)
            $('[name=cate_id]').html(htmlStr)
            form.render()
        }
    })
}

// 筛选功能
$('#form-search').on('submit',function(e){
    e.preventDefault()
    var cate_id=$('[name=cate_id]').val()
    var state=$('[name=state]').val()
    q.cate_id=cate_id
    q.state=state
    initTable()
})



// 定义渲染分页的方法
function renderPage(total){
    laypage.render({
        elem:'pageBox',//分页容器的Id
        count:total,//总数据条数
        limit:q.pagesize,//每页显示几条数据
        curr:q.pagenum,//设置默认被选中的分页
        layout:['count','limit','prev','page','next','skip'],
        limits:[2,3,5,10],
        // 分页切换时触发jump回调
        jump:function(obj,first){
            // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调 
            // 如果 first 的值为 true，证明是方式2触发的 
            // 否则就是方式1触发的
            console.log(first);
            console.log(obj.curr);
            // 最新页码值，赋值到qdata中
            q.pagenum=obj.curr
            // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
            q.pagesize=obj.limit
            if(!first){
                initTable()
            }
        }
    })
    console.log(total);
}

$('tbody').on('click','.btn-delete',function(){
    var len=$('.btn-delete').length
    var id=$(this).attr('data-id')
    layer.confirm('确认删除?',{icon:3,title:'提示'},function(index){
        $.ajax({
            method:'GET',
            url:'/my/article/delete/'+id,
            success:function(res){
                if(res.status!==0){
                    return layer.msg('删除文章失败!')
                }
                layer.msg('删除文章成功!')
                if(len===1){
                    q.pagenum=q.pagenum===1?1:q.pagenum-1
                }
                initTable()
            }
        })
        layer.close(index)
    })
})



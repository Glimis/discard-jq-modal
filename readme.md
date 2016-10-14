https://github.com/Glimis/blog/blob/master/%E5%89%8D%E7%AB%AF/%E6%A8%A1%E6%80%81%E6%A1%86%E5%A4%8D%E7%94%A8.md
# bts-modal复用的实现
只用jq实现复用,包含几个问题

* 作用域
模态框的页面一定不止静态态,为了防止jq加载污染,用这种山寨的方式简易处理
```javascript
  j.replace(/\$\(([^\)]*)\)/,function(v,clz){
    return '$(".'+modalClz+' '+clz+'")'
  })
```
* 数据传递
不在通过回调函数,而是通过传输数据用以解耦,modal下传递数据有两种方式    
1.重写modal
```javascript
$('.modal').modal('close',data);
```
2.将数据保存至顶级节点
```javascript
$('.modal').data('data',data);
```
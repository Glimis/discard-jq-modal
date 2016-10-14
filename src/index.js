let i=0;
async function  modal(name,params){
  var def=$.Deferred();
  //获取地址
  var {htmlPath,jsPath}=name2path(name);
  var h= await $.get(htmlPath);
  //记忆节点
  var $div=$(h);
  //减少modal下的js污染
  var modalClz=getModalClass();
  $div.addClass(modalClz);

  $('body').append($div);
  //加载删除事件
  $div.on('hidden.bs.modal', function (e) {
     var data=$div.data('data');
     $div.remove();
     def.resolve(data);
  })
  //获取js信息,处理后在加载
  var j=await $.ajax({
        url:jsPath,
        method:'get',
        dataType: 'html'
      })

  j.replace(/\$\(([^\)]*)\)/,function(v,clz){
    return '$(".'+modalClz+' '+clz+'")'
  })
  eval(j);
  $div.modal()
  return def;
}

function getModalClass(){
  return 'modal'+i++;
}

function name2path(name){
  return {
    htmlPath:'../modals/'+name+'/index.html',
    jsPath:'../modals/'+name+'/index.js',
  }
}


$.modal=modal;
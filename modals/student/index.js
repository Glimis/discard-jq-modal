$('.cls').click(function(){
  console.log('删除');
  $('.modal').data('data',{a:1});
  $('.modal').modal('hide');
})
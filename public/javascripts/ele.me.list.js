/**
 * Created by hanjinchi on 15/6/18.
 */
$(function () {
  $('.eleme-help-remove').bind('click', function () {
    var id = $(this).data('value');
    var parent = $(this).parent();
    swal({
      title: "确认删除?",
      text: "删除QA无法恢复",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "确认",
      cancelButtonText: "取消"
    },function(isConfirm){
      if(isConfirm){
        $.ajax(
          {
            url: '/help/questiondelete/' + id,
            method: 'GET',
            dataType: 'json'
          }
        ).promise().then(function () {
            parent.animate({
              height: 0
            }, 'fast', function () {
              $(this).remove();
            });
          }, function () {
            alert('failed');
          });
      }
    });
  });
});
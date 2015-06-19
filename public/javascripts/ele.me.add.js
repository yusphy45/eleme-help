/**
 * Created by hanjinchi on 15/6/16.
 */
$(function () {
  var opts = {
    container: 'epiceditor',
    textarea: null,
    basePath: '/bower_components/EpicEditor/epiceditor',
    clientSideStorage: false,
    localStorageName: 'epiceditor',
    useNativeFullscreen: true,
    parser: marked,
    file: {
      name: 'epiceditor',
      defaultContent: '',
      autoSave: 100
    },
    theme: {
      base: '/themes/base/epiceditor.css',
      preview: '/themes/preview/github.css',
      editor: '/themes/editor/epic-dark.css'
    },
    button: {
      preview: true,
      fullscreen: true,
      bar: "auto"
    },
    focusOnLoad: false,
    shortcut: {
      modifier: 18,
      fullscreen: 70,
      preview: 80
    },
    string: {
      togglePreview: 'Toggle Preview Mode',
      toggleEdit: 'Toggle Edit Mode',
      toggleFullscreen: 'Enter Fullscreen'
    },
    autogrow: false
  };
  var editor = new EpicEditor(opts).load();

  $('#btn').bind('click', function () {
    var theContent = editor.exportFile();

    var arr = $('#helpAdd').serializeArray();

    var obj = {user: '', editor: ''};

    arr.forEach(function(item, index){
      obj[item.name] = item.value;
    });

    obj.answer = theContent;

    $.ajax(
      {
        url:'/help/questionadd',
        method: 'POST',
        data: obj,
        dataType: 'json'
      }
    ).promise().then(function(){
        swal({
          title: "添加成功!",
          text: "3秒后返回主页",
          showConfirmButton: false
        });
        setTimeout(function(){
          location.href = '/help/v-question';
        },3000);
      },function(){
        swal("添加失败");
      })
  });
});

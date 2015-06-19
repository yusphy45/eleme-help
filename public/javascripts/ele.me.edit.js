/**
 * Created by hanjinchi on 15/6/18.
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

  //init
  (function () {
    var answerContent = '';
    answerContent = $('#answerContent').val();
    editor.getElement('editor').body.innerText = answerContent;
    editor.preview();
    var hot = $('#hot');
    if (hot.data('value') === 'on') {
      hot.attr('checked', 'true');
    }
    $('select').each(function (index, element) {
      var value = $(this).data('value');
      $(this).children('[value="' + value + '"]').attr('selected', 'selected');
    });
  }());

  $('#btn').bind('click', function () {
    var id = $('#idContent').val();

    var theContent = editor.exportFile();

    var arr = $('#helpAdd').serializeArray();

    var obj = {user: '', editor: ''};

    arr.forEach(function (item, index) {
      obj[item.name] = item.value;
    });

    obj.answer = theContent;

    $.ajax(
      {
        url: '/help/questionput',
        method: 'POST',
        data: obj,
        dataType: 'json'
      }
    ).promise().then(function () {
        swal({
          title: "更新成功!",
          text: "3秒后返回主页",
          showConfirmButton: false
        });
        setTimeout(function () {
          location.href = '/help/v-question';
        }, 3000);
      }, function () {
        swal("更新失败");
      });
  });
});

(function () {

  /*
   * ctrl   控制: 自调用的主代码
   * check  检查: 检查用户是否登陆
   * model  模板: 登陆注册的模拟弹窗
   * test   测试: 
   * 
   * ajax   数据: 通过XHR与后端交互并且返回结果
   * render 渲染: 对首屏数据进行渲染
   * hint   提示: 操作时候的状态信息
   * handle 处理: 登陆注册和修改编辑
   */

  // ctrl   控制: 自调用的主代码

  (function () {

    const loginState = check().login();

    // event listener

    // $( document ).on( events, selector, data, handler );        // jQuery 1.7+

    if (!loginState) {
      let login = $('#login'),
          loginId = login.attr('id'),
          loginTarget = login.attr('data-target').replace('#',''),
          register = $('#register'),
          registerId = register.attr('id'),
          registerTarget = register.attr('data-target').replace('#','');

      // login botton
      login.click( () => {model(loginId,loginTarget);} );
      // login confirm (动态生成的class直接使用.click不能监听到)
      $(document).on('click','.loginConfirm', () => {handle().login();window.event.cancelBubble = true;} );
      // register botton
      register.click( () => model(registerId,registerTarget) );
      // register confirm
      $(document).on('click','.registerConfirm', () => handle().register() );
    }
    else {
      render('GET','./api/note/search.php');
      let edit = $('.ctrl-edit'),
        del = $('.ctrl-del');
      let add = $('.ctrl-add');
      let addId = add.attr('id'),
        addTarget = add.attr('data-target');
      let logout = $('.logout');
      // add botton
      add.click( () => model(addId,addTarget) );
      // add confirm (动态生成的class直接使用.click不能监听到)
      $(document).on('click','.addConfirm', () => handle().add() );
      // logout confirm
      logout.click( () => handle().logout() );
      $(document).on('click','.ctrl-edit', function (){
        handle($(this)).edit();
      } );
      $(document).on('click','.ctrl-del', function () {
        handle($(this)).del();
      } );
    }
    
  })();

  // check  检查: 

  function check (state) {
    function login () {
      let login = $('.note-login'),
        logined = $('.note-logined');
      if($.cookie('user')){
        let userCookie = $.cookie('user'),
            userName = $('.user-name');
        login.hide();
        userName.text(userCookie);
        logined.show();
        return true;
      }
      else {
        logined.hide();
        login.show();
      };
      return false;
    };
    return {
      login: login,
    }
  };

  // model  模板: 登陆注册的模拟弹窗 BUG: 添加成功但是不显示模拟弹窗

  function model (type,typeId) {
    let myModal = $('.modal'),
      modalTitle = $('.modal-title'),
      modalBody = $('.modal-body'),
      modalFooter = $('.modal-footer');
    myModal.attr('id',typeId.replace('#',''));
    modalTitle.empty();
    modalBody.empty();
    modalFooter.empty();
    const data = {
      login: {
        title: `登陆`,
        body: `
          <form>
                <div class="form-group">
                  <label for="user" class="control-label">账号</label>
                  <input type="text" class="form-control loginUser" id="user">
                </div>
                <div class="form-group">
                  <label for="pass" class="control-label">密码</label>
                   <input type="password" class="form-control loginPass" id="pass">
                </div>
              </form>
        `,
        footer:`
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary loginConfirm">登陆</button>
        `
      },
      register: {
        title: `注册`,
        body: `
          <form>
                <div class="form-group">
                  <label for="user" class="control-label">账号</label>
                  <input type="text" class="form-control registerUser" id="user">
                </div>
                <div class="form-group">
                  <label for="pass" class="control-label">密码</label>
                  <input type="password" class="form-control registerPass1" id="pass">
                </div>
                <div class="form-group">
                  <label for="confirm-pass" class="control-label">确定密码</label>
                  <input type="password" class="form-control registerPass2" id="confirm-pass">
                </div>
              </form>
        `,
        footer:`
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary registerConfirm">注册</button>
        `
      },
      add: {
        title: `添加`,
        body: `
          <form>
            <div class="form-group">
              <label for="title" class="control-label">标题</label>
              <input type="text" class="form-control addTitle" id="title">
            </div>
            <div class="form-group">
              <label for="content" class="control-label">内容</label>
              <textarea  class="form-control addContent" id="content"></textarea>
            </div>
            <div class="form-group">
              <label for="tag" class="control-label">标签</label>
              <input type="text" class="form-control addTag" id="tag">
            </div>
          </form>
        `,
        footer:`
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary addConfirm">添加</button>
        `
      }
    };
    modalTitle.append(data[type].title);
    modalBody.append(data[type].body);
    modalFooter.append(data[type].footer);
    // modalBody.find('input').eq(0),focus();
    // not work
  };

  // ajax   数据: 通过XHR与后端交互并且返回结果

  function ajax (method,url,data) {
    let XMLHttp = new XMLHttpRequest();
    XMLHttp.open(method,url,true);
    XMLHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    XMLHttp.onreadystatechange = () => {
      if (XMLHttp.readyState === 4 && XMLHttp.status === 200) {
        console.log(XMLHttp.responseText);
        var result = JSON.parse(XMLHttp.responseText);
        console.log(result)
        if(result.registerState==='yes'||result.loginState==='yes'||result.loginState==='login...'||result.logoutState||result.deleteState==='yes'||result.addState==='yes'){
          location.reload();
        };
      };
    };
    XMLHttp.send(data);
  };

  // render 渲染: 对首屏数据进行渲染

  function render (method,url,data) {
    let XMLHttp = new XMLHttpRequest();
    XMLHttp.onreadystatechange = function () {
      if (XMLHttp.readyState === 4 && XMLHttp.status === 200) {
        console.log(XMLHttp.responseText);
        let result = JSON.parse(XMLHttp.responseText);
        let notes = $('.notes');
        notes.empty();
        console.log(result); // test if ajax works
        // TODO: 此处代码有待优化
        if (result.loginState !== 'no') {
          if (result.length!==0) {
            for (let x in result) {
              let id = result[x].id,
                title = result[x].title,
                content = result[x].content,
                template = `
                <div class="row note" id="${id}">
                  <div class="note-title">
                    <p class="text-center note-title-content">${title}</p>
                    <div class="note-control">
                      <span class="glyphicon glyphicon-pencil ctrl-edit"></span>
                      <span class="glyphicon glyphicon-trash ctrl-del"></span>
                    </div>
                  </div>
                  <div class="note-content">${content}</div>
                </div>
              `;
              notes.append(template);
            };
          }
          else {
            let template = '<p class="note text-center">没有发现笔记哦，试着去添加一条笔记吧 ^_^</p>'
            notes.append(template);
          }
          
        }
        else {
          let template = '<p class="note text-center">没有发现笔记哦，请登陆 ^_^</p>'
          notes.append(template);
        }
        ;
        
        
      };
    };
    XMLHttp.open(method,url,true);
    XMLHttp.send();
  };

  // handle 处理: 登陆注册和修改编辑

  function handle (val)  {
    if (val!==undefined) {
      var val = val.parent().parent().parent();
      var id = val.attr('id');
      console.log(val);
      console.log(id);
    }
    function register () {
      let user = $('.registerUser'),
        pass1 = $('.registerPass1'),
        pass2 = $('.registerPass2'),
        pass = null;
      if(pass1.val()===pass2.val()){
        let  data = {
        user:user.val(),
        pass:pass1.val()
        };
        let postData = '';
        for (let x in data) {
          postData += x + '=' + data[x] + '&';
        };
        console.log(postData)
        ajax('POST','./api/user/register.php',`user=${data.user}&pass=${data.pass}&mail=`);
      }
      else {
        pass2.addClass('alert alert-warning');
      }

    };
    function login () {
      let user = $('.loginUser'),
        pass = $('.loginPass');
      let  data = {
      user:user.val(),
      pass:pass.val()
      };
      // Debug: handle/login
      console.log(`user:${data.user}`);
      console.log(`pass:${data.pass}`);
      ajax('POST','./api/user/login.php',`user=${data.user}&pass=${data.pass}`);

    };
    function edit () {
      let title = val.find('.note-title-content');
      let content = val.find('.note-content');
      title.attr('contenteditable','true');
      title.focus();
      content.attr('contenteditable','true');
      console.log('title');
      console.log('content');
      val.mouseleave( (event) => {
        $('body').click( ()=> {
          title.attr('contenteditable','false');
          content.attr('contenteditable','false');
          // BUG: 偶尔误触span会导致多次执行
          // alert('great');
          const titleVal = title.text();
          const contentVal = content.text();
          console.log(titleVal);
          console.log(contentVal);
          ajax('POST','./api/note/modify.php',`noteId=${id}&title=${titleVal}&content=${contentVal}`);
          val.unbind('');
          $('body').unbind('');
        });
      });
    };
    
    function add () {
      let title = $('.addTitle'),
        content = $('.addContent'),
        tag = $('.addTag'),
        date = new Date(),
        dateTime = date.getTime();

      let data = {
        title:title.val(),
        content:content.val(),
        tag:tag.val(),
        date:'2017-03-11'  
      };
      ajax('POST','./api/note/add.php',`title=${data.title}&content=${data.content}&tag=${data.tag}&date=${data.date}`);
    };
    function del () {
      ajax('POST','./api/note/delete.php',`noteId=${id}`);
    };
    function logout () {
      ajax('POST','./api/user/logout.php');
    };
    return {
      register:register,
      login:login,
      add:add,
      edit:edit,
      del:del,
      logout:logout
    };
  };

})()

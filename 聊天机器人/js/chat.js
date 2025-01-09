$(function(){
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()
    // 为发送按钮绑定点击事件处理函数
    $('#btnSend').on('click', function () {
        var text = $('#ipt').val().trim()  //获取用户输入内容
        if (text.length <= 0 ){  //判断用户输入内容是否为空
            return $('#ipt').val('')
        }
        //将用户输入内容显示在聊天窗口
        $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>')
        $('#ipt').val('') // 清空输入框的内容
        resetui() // 充值右侧滚动条位置
        getMsg(text) //调用函数获取AI机器人返回的消息
    })
    //获取AI机器人返回的消息
    function getMsg(text){
      $.ajax({
        method:'GET',
        url: 'http://ajax-api.itheima.net/api/robot',
        data: {
        spoken: text
        },
        success: function(res){
            // console.log(res)
            if(res.message === 'success') {
                var msg = res.data.info.text
                $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>')
                resetui()
                getVoice(msg) //调用函数将机器人的聊天内容转为语音（传入参数msg）
            }            
        }
      })
    }
    //获取将机器人的聊天内容转为语音
    function getVoice(text) {
        $.ajax({
            method:'GET',
            url: 'http://ajax-base-api-t.itheima.net/api/synthesize',
            data: {
            text: text
            },
            success:function(res){
                // 如果请求成功，则 res.voiceUrl 是服务器返回的音频 URL 地址
                console.log(res)
                if(res.status===200){
                $('#voice').attr('src',res.voiceUrl)
                }
            }
        })
    }
    // 让文本输入框响应回车事件后，提交消息
    $('#ipt').on('keyup',function(e){
        // e.keyCode 可以获取到当前按键的编码，13为回车键编码
        if(e.keyCode===13){
            // 调用按钮元素的 click 函数，可以通过编程的形式触发按钮的点击事件
            $('#btnSend').click()
        }
    })
    
  })
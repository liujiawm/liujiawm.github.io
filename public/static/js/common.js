/**
 * 公用固定
 */
$(function() {
    /**
     * 弹出登录窗
     */
    $('.userlogin').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();

        var jc = $.confirm({
            content: 'url:/user/Logon/loginbox'
            ,theme:'bootstrap'
            //,columnClass:'col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2'
            ,icon:'glyphicon glyphicon-user'
            ,title: '会员登录'
            ,cancelButton: false
            ,confirmButton: false
            ,contentLoaded: function(data, status, xhr){
                var self = this;
                $('.jconfirm-box').on('click','#loginCloseButton',function(){self.close();});
                $('.jconfirm-box').on('click','#loginPostButton',function(){

                    var target,query,form = $('#loginboxform');
                    var target_form = $(this).attr('target-form');
                    var that = this;
                    var nead_confirm=false;

                    target = form.attr('action');
                    query = form.serialize();

                    //$(that).addClass('disabled').attr('autocomplete','off').prop('disabled',true);

                    $.post(target,query,'json').success(function(datas){
                        if(datas.code == 1){
                            var myavatar = $('#topnav-avatar');
                            myavatar.attr('href','/user/');
                            myavatar.children('img').attr('src','/uploads/avatar/1.jpg');
                            $('.js-toregister').hide();
                            $('.js-tologin').hide();
                            $('.js-myinfotext').show();
                            self.close();
                            //location.reload();
                        }
                        else
                        {
                            $.alert(datas.msg);
                            return false;
                        }
                    });
                    return false;
                });
            }
        });
    });

    //ajax get请求
    /**
     * ajax get请求
     */
    $(document).on('click','.ajax-get',function(e){
        e.stopPropagation();
        e.preventDefault();

        var target;
        var that = this;
        if ( $(this).hasClass('confirm') ) {
            if(!confirm('确认要执行该操作吗?')){
                return false;
            }
        }
        if ( (target = $(this).attr('href')) || (target = $(this).attr('url')) ) {
            $.get(target).success(function(data){
                if (data.status==1) {
                    if (data.url) {
                        updateAlert(data.info + ' 页面即将自动跳转~','alert-success');
                    }else{
                        updateAlert(data.info,'alert-success');
                    }
                    setTimeout(function(){
                        if (data.url) {
                            location.href=data.url;
                        }else if( $(that).hasClass('no-refresh')){
                            $('#top-alert').find('button').click();
                        }else{
                            location.reload();
                        }
                    },1500);
                }else{
                    updateAlert(data.info);
                    setTimeout(function(){
                        if (data.url) {
                            location.href=data.url;
                        }else{
                            $('#top-alert').find('button').click();
                        }
                    },1500);
                }
            });

        }
        return false;
    });

    //ajax post submit请求
    $(document).on('click','.ajax-post',function(e){
        var target,query,form;
        var target_form = $(this).attr('target-form');
        var that = this;
        var nead_confirm=false;
        if( ($(this).attr('type')=='submit') || (target = $(this).attr('href')) || (target = $(this).attr('url')) ){
            form = $('.'+target_form);

            // 无数据时也可以使用的功能
            if ($(this).attr('hide-data') === 'true'){
                form = $('.hide-data');
                query = form.serialize();
            }else if (form.get(0)==undefined){
                return false;
            }else if ( form.get(0).nodeName=='FORM' ){
                if ( $(this).hasClass('confirm') ) {
                    if(!confirm('确认要执行该操作吗?')){
                        return false;
                    }
                }
                if($(this).attr('url') !== undefined){
                    target = $(this).attr('url');
                }else{
                    target = form.get(0).action;
                }
                query = form.serialize();
            }else if( form.get(0).nodeName=='INPUT' || form.get(0).nodeName=='SELECT' || form.get(0).nodeName=='TEXTAREA') {
                form.each(function(k,v){
                    if(v.type=='checkbox' && v.checked==true){
                        nead_confirm = true;
                    }
                })
                if ( nead_confirm && $(this).hasClass('confirm') ) {
                    if(!confirm('确认要执行该操作吗?')){
                        return false;
                    }
                }
                query = form.serialize();
            }else{
                if ( $(this).hasClass('confirm') ) {
                    if(!confirm('确认要执行该操作吗?')){
                        return false;
                    }
                }
                query = form.find('input,select,textarea').serialize();
            }
            $(that).addClass('disabled').attr('autocomplete','off').prop('disabled',true);
            $.post(target,query).success(function(data){
                if (data.status==1) {
                    if (data.url) {
                        updateAlert(data.info + ' 页面即将自动跳转~','alert-success');
                    }else{
                        updateAlert(data.info ,'alert-success');
                    }
                    setTimeout(function(){
                        $(that).removeClass('disabled').prop('disabled',false);
                        if (data.url) {
                            location.href=data.url;
                        }else if( $(that).hasClass('no-refresh')){
                            $('#top-alert').find('button').click();
                        }else{
                            location.reload();
                        }
                    },1500);
                }else{
                    updateAlert(data.info);
                    setTimeout(function(){
                        $(that).removeClass('disabled').prop('disabled',false);
                        if (data.url) {
                            location.href=data.url;
                        }else{
                            $('#top-alert').find('button').click();
                        }
                    },1500);
                }
            });
        }
        return false;
    });


});

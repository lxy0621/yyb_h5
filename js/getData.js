$(function () {

    var BASE_URL = 'https://a.ycylzx.com'


    //获取医院列表
    getHospitalData = function () {
        $.ajax({
            methods: 'GET',
            url: BASE_URL + '/API/GetOrganList',
            data: {
                pagesize: 10,
                curpageindex: 1,
                search: '',
                regionid: '',
                nature: ''
            },
            success: function (res) {
                var data = res.rows
                $.each(data, function (i, item) {
                    $('<li id=' + item.id + '><div class="hopistal_item"><div class="item_l"><img src="' + item.photo + '" alt=""></div><div class="item_r"><p class="name line1">' + item.OrganName + '</p><p class="addr line1">' + item.addr + '</p><div class="label"><div class="label_item">' + item.Grade1Name + item.Grade2Name + '</div><div class="label_item">' + item.NatureName + '</div></div></div></div></li>').appendTo('#hospitalList');
                })
            }
        })
    }

    //获取医院详情
    getHospitalDetail = function (id) {
        $.ajax({
            methods: 'GET',
            url: BASE_URL + '/API/GetOrganById',
            data: {
                id: id
            },
            success: function (res) {
                $('<span>' + res.OrganName + '</span>').appendTo('.title')
                $('<img src="' + res.photo + '" alt="" />').appendTo('.pic');
                $('<div>医院等级:<span>'+ res.Grade1Name + res.Grade2Name +'</span></div><div>医院类型:<span>'+ res.NatureName +'</span></div><div>分类管理类型:<span>'+ res.NatureName +'</span></div><div>机构电话:<span>'+ res.tel +'</span></div><div>隶属关系:<span>'+ res.OrdinationName +'</span></div><div>所属区域:<span>'+ res.RegionName +'</span></div><div class="addr">医院地址:<span>'+ res.addr +'</span></div>').appendTo('.info_content')
                var department = res.Department;
                $.each(department,function(i,item){
                    $('<div id='+ item.id +' class="dep_item"><div>'+ item.name +'</div><img src="./images/enter.png" /></div>').appendTo('.depart_content');
                })
                var decodeIntro = decodeURIComponent(res.intro);
                $('<pre>'+ decodeIntro +'</pre>').appendTo('.brief_content');
            }
        })
    }
    //获取医师列表
    getDoctorList = function(id){
        $.ajax({
            methods:'GET',
            url:BASE_URL + '/API/GetPersonList',
            data:{
                pagesize:10,
                curpageindex:1,
                Organsid:id,
                search:''
            },
            success:function(res){
                console.log(res)
            }
        })
    }
    //预约会诊列表
    getQueyList = function(phone){
        $.ajax({
            methods:'GET',
            url:BASE_URL + '/API/GetConsultationOrderList',
            data:{
                pagesize:10,
                curpageindex:1,
                phone:phone
            },
            success:function(res){
                var data = res.rows;
                $.each(data, function (i, item) {   
                    var state = data[i].state;
                    var type = data[i].type;
                    var color = '';
                    if(state == 0){
                        var states = '未回复';
                        color = '#ff4200';
                    }else{
                        var states = '已回复';
                        color = '#00ff72';   
                    }
                    if(type == 1){
                        var types = '普通预约';
                        color = '#ff4200';
                    }else{
                        var types = '快速预约';
                        color = '#00ff72';   
                    }
                    $('<div id="'+ item.ID +'" class="query_item"><div class="item_t"><div class="state" style="background:'+ color +'">'+ states +'</div><div class="time">'+ item.addtime +'</div></div><div class="item_m">预约医师：<span>'+ item.expertName +'<span></div><div class="item_b"><div class="type">'+ types +'</div><div class="name"><span>预约人：</span>'+ item.p_name +'</div></div></div>').appendTo('#queryList');
                })
            }
        })
    }
    //预约会诊详情
    getQueryDetail = function(id){
        $.ajax({
            methods:'GET',
            url:BASE_URL + '/API/GetConsultationOrderById',
            data:{
                id:id
            },
            success:function(res){
                var data = res.rows[0];
                if(data.type == 1){
                    var types = '普通预约'
                }else{
                    var types = '快速预约'
                }
                if(data.state == 0){
                    var states = '未回复'
                }else{
                    var states = '已回复'
                }
                $('<span>' + data.p_name + '</span>').appendTo('.query_item .name');
                $('<span>' + data.RegionName + '</span>').appendTo('.query_item .add');
                $('<span>' + data.addtime + '</span>').appendTo('.query_item .time');
                $('<span>' + types + '</span>').appendTo('.query_item .type');
                $('<span>' + data.card_type + '</span>').appendTo('.query_item .ctype');
                $('<span>' + data.idcard + '</span>').appendTo('.query_item .idenumber');
                $('<span>' + data.archivesPhone + '</span>').appendTo('.query_item .tel');
                $('<span>' + data.birthday + '</span>').appendTo('.query_item .birthday');
                $('<span>' + data.sex + '</span>').appendTo('.query_item .gender');
                $('<span>' + data.hospital + '</span>').appendTo('.query_xitem .hospital');
                $('<span>' + data.expertName + '</span>').appendTo('.query_item .expert');
                $('<span>' + data.hopeTime + '</span>').appendTo('.query_item .hope');
                $('<span>' + data.info + '</span>').appendTo('.query_xitem .desc');
                $('<span>' + states + '</span>').appendTo('.query_item .state');
                $('<span>' + data.reply + '</span>').appendTo('.query_xitem .message');
                $('<span>' + data.remarks + '</span>').appendTo('.query_xitem .remarks');
            }
        })
    }
})
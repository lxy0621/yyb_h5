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
})
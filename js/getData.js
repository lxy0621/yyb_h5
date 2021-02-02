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
                $('<div>医院等级:<span>' + res.Grade1Name + res.Grade2Name + '</span></div><div>医院类型:<span>' + res.NatureName + '</span></div><div>分类管理类型:<span>' + res.NatureName + '</span></div><div>机构电话:<span>' + res.tel + '</span></div><div>隶属关系:<span>' + res.OrdinationName + '</span></div><div>所属区域:<span>' + res.RegionName + '</span></div><div class="addr">医院地址:<span>' + res.addr + '</span></div>').appendTo('.info_content')
                var department = res.Department;
                $.each(department, function (i, item) {
                    $('<div id=' + item.id + ' class="dep_item"><div>' + item.name + '</div><img src="./images/enter.png" /></div>').appendTo('.depart_content');
                })
                var decodeIntro = decodeURIComponent(res.intro);
                $('<pre>' + decodeIntro + '</pre>').appendTo('.brief_content');
            }
        })
    }
    //获取医师列表
    getDoctorList = function (id) {
        $.ajax({
            methods: 'GET',
            url: BASE_URL + '/API/GetPersonList',
            data: {
                pagesize: 10,
                curpageindex: 1,
                Organsid: id,
                search: ''
            },
            success: function (res) {
                var data = res.rows;
                if (res.Success == true) {
                    $.each(data, function (i, item) {
                        var avatar = data[i].photoFile;
                        if (avatar != '') {
                            $('<li id="' + item.id + '" class="doctor_item"><div class="item_l"><img src="' + avatar + '" alt="" /></div><div class="item_r"><div class="itemr_t">' + item.name + '<span>' + item.qualificationId + '<span></div><div class="itemr_m">' + item.SexId + '<span>' + item.NationId + '</span></div><div class="itemr_b line1">' + item.hospital + '</div></div></li>').appendTo('#doctorList');
                        } else {
                            $('<li id="' + item.id + '" class="doctor_item"><div class="item_l"><img src="./images/nodoctor.jpg" alt="" /></div><div class="item_r"><div class="itemr_t">' + item.name + '<span>' + item.qualificationId + '<span></div><div class="itemr_m">' + item.SexId + '<span>' + item.NationId + '</span></div><div class="itemr_b line1">' + item.hospital + '</div></div></li>').appendTo('#doctorList');
                        }

                    })
                } else {
                    $('<span class="nodata">该科室暂无医师数据</span>').appendTo('#doctorList');
                }
            }
        })
    }
    //预约会诊列表
    getQueyList = function (phone) {
        $.ajax({
            methods: 'GET',
            url: BASE_URL + '/API/GetConsultationOrderList',
            data: {
                pagesize: 10,
                curpageindex: 1,
                phone: phone
            },
            success: function (res) {
                var data = res.rows;
                $.each(data, function (i, item) {
                    var state = data[i].state;
                    var type = data[i].type;
                    var color = '';
                    if (state == 0) {
                        var states = '未回复';
                        color = '#ff4200';
                    } else {
                        var states = '已回复';
                        color = '#00ff72';
                    }
                    if (type == 1) {
                        var types = '普通预约';
                        color = '#ff4200';
                    } else {
                        var types = '快速预约';
                        color = '#00ff72';
                    }
                    $('<div id="' + item.ID + '" class="query_item"><div class="item_t"><div class="state" style="background:' + color + '">' + states + '</div><div class="time">' + item.addtime + '</div></div><div class="item_m">预约医师：<span>' + item.expertName + '<span></div><div class="item_b"><div class="type">' + types + '</div><div class="name"><span>预约人：</span>' + item.p_name + '</div></div></div>').appendTo('#queryList');
                })
            }
        })
    }
    //预约会诊详情
    getQueryDetail = function (id) {
        $.ajax({
            methods: 'GET',
            url: BASE_URL + '/API/GetConsultationOrderById',
            data: {
                id: id
            },
            success: function (res) {
                var data = res.rows[0];
                if (data.type == 1) {
                    var types = '普通预约'
                } else {
                    var types = '快速预约'
                }
                if (data.state == 0) {
                    var states = '未回复'
                } else {
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

    //医师详情
    getDcotorDetail = function (id) {
        $.ajax({
            methods: 'GET',
            url: BASE_URL + '/API/GetPersonById',
            data: {
                id: id
            },
            success: function (res) {
                $('<img src="' + res.photoFile + '" alt="" />').appendTo('.avatar');
                $('<div class="name">' + res.Name + '<span>' + res.SexId + '</span><span>' + res.NationId + '</span></div><div class="title">' + res.ScholarId + '<span>' + res.qualificationId + '</span></div><div>职务：' + res.dutyId + '</div>').appendTo('.desc');
                let professional = decodeURIComponent(res.professionalSkill);
                let dutyDescribe = decodeURIComponent(res.dutyDescribe);
                $('<span>' + professional + '</span>').appendTo('#professional');
                $('<span>' + dutyDescribe + '</span>').appendTo('#brief');
                $('.appointment').attr('id', res.id);
            }
        })
    }

    //区域列表信息
    getRegion = function () {
        $.ajax({
            methods: 'GET',
            url: BASE_URL + '/API/GetRegion',
            data: {
                pagesize: 50,
                curpageindex: 1,
                id: 1,
                grade: ''
            },
            success: function (res) {
                var data = res.rows
                $.each(data, function (i, item) {
                    $('<option value="' + item.id + '">' + item.name + '</option>').appendTo('.province');
                    $('<option value="' + item.id + '">' + item.name + '</option>').appendTo('.province2');
                })
            }
        })
    }
    //获取市级列表
    get2Region = function (province, grade) {
        $.ajax({
            methods: 'GET',
            url: BASE_URL + '/API/GetRegion',
            data: {
                pagesize: 100,
                curpageindex: 1,
                id: province,
                grade: grade
            },
            success: function (res) {
                var data = res.rows
                $('.city').empty();
                $.each(data, function (i, item) {
                    $('<option value="' + item.id + '">' + item.name + '</option>').appendTo('.city');
                })
            }
        })
    }
    //获取市级列表2
    get2Region2 = function (province, grade) {
        $.ajax({
            methods: 'GET',
            url: BASE_URL + '/API/GetRegion',
            data: {
                pagesize: 100,
                curpageindex: 1,
                id: province,
                grade: grade
            },
            success: function (res) {
                var data = res.rows
                $('.city2').empty();
                $.each(data, function (i, item) {
                    $('<option value="' + item.id + '">' + item.name + '</option>').appendTo('.city2');
                })
            }
        })
    }
    //获取证件类型
    getCardType = function () {
        $.ajax({
            methods: 'GET',
            url: BASE_URL + '/API/GetCode',
            data: {
                pagesize: 100,
                curpageindex: 1,
                type: "证件类型"
            },
            success: function (res) {
                var data = res.rows;
                $.each(data, function (i, item) {
                    $('<option value="' + item.id + '">' + item.name + '</option>').appendTo('.ctype');
                })
            }
        })
    }
    //预约接口
    getOrder = function (expertId, type, regionid, p_name, birthday, sex, card_type, idcard, hopeTime, archivesPhone, info) {
        $.ajax({
            methods: 'GET',
            url: BASE_URL + '/API/AddConsultationOrder',
            data: {
                expertId: expertId,
                type: type,
                regionid: regionid,
                p_name: p_name,
                archivesPhone: archivesPhone,
                hopeTime: hopeTime,
                info: info,
                birthday: birthday,
                sex: sex,
                card_type: card_type,
                idcard: idcard,
                ip: ''
            },
            success: function (res) {
                if (res.Success = true) {
                    $('.tips').empty();
                    $('<span>预约成功!</span>').appendTo('.tips');
                    $('.tips').css('display', 'block');
                    setTimeout(function () {
                        $('.tips').css('display', 'none');
                    }, 2000)
                    setTimeout(function () {
                        history.go(-1);
                    }, 2000)
                } else {
                    $('.tips').empty();
                    $('<span>' + res.Message + '</span>').appendTo('.tips');
                    $('.tips').css('display', 'block');
                    setTimeout(function () {
                        $('.tips').css('display', 'none');
                    }, 2000)
                }
            }
        })
    }
})
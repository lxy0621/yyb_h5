$(function () {

    var BASE_URL = 'https://a.ycylzx.com'

    //省份枚举
    function getProvinceData() {
        var data = [
            { id: 1, name: '内蒙古' },
            { id: 2, name: '北京' },
            { id: 3, name: '天津' },
            { id: 4, name: '上海' },
            { id: 5, name: '重庆' },
            { id: 6, name: '河北' },
            { id: 7, name: '河南' },
            { id: 8, name: '云南' },
            { id: 9, name: '辽宁' },
            { id: 10, name: '黑龙江' },
            { id: 11, name: '湖南' },
            { id: 12, name: '安徽' },
            { id: 13, name: '山东' },
            { id: 14, name: '新疆' },
            { id: 15, name: '江苏' },
            { id: 16, name: '浙江' },
            { id: 17, name: '江西' },
            { id: 18, name: '湖北' },
            { id: 19, name: '广西' },
            { id: 20, name: '甘肃' },
            { id: 21, name: '山西' },
            { id: 22, name: '陕西' },
            { id: 23, name: '吉林' },
            { id: 24, name: '福建' },
            { id: 25, name: '贵州' },
            { id: 26, name: '广东' },
            { id: 27, name: '青海' },
            { id: 28, name: '西藏' },
            { id: 29, name: '四川' },
            { id: 30, name: '宁夏' },
            { id: 31, name: '海南' },
            { id: 42, name: '台湾' },
            { id: 33, name: '香港' },
            { id: 34, name: '澳门' }
        ];
        $.each(data, function (i, item) {
            $('<li value=' + item.name + '>' + item.name + '</li>').appendTo('#position ul');
        })
    }
    getProvinceData();

    //医院类型枚举
    function hospitalType() {
        var data = [
            { id: 1, name: '综合医院' },
            { id: 2, name: '专科医院' }
        ];
        $.each(data, function (i, item) {
            $('<li value=' + item.name + '>' + item.name + '</li>').appendTo('#type ul');
        })
    }
    hospitalType()

    //获取医院列表
    getHospitalData = function (search, city, type, divId, curpageIndex) {
        $('.datastate').empty();
        $.ajax({
            methods: 'GET',
            url: BASE_URL + '/API/GetOrganList',
            data: {
                pagesize: 10,
                curpageindex: curpageIndex,
                search: search,
                regionid: city,
                nature: type
            },
            success: function (res) {

                $(divId).empty();
                $('#position').slideUp(300);
                $('#type').slideUp(300);
                $('.cover').slideUp(0);
                $('.cover1').slideUp(0);

                var data = res.rows;

                if (res.Success == false) {

                    $('<p>未找到对应的医院</p>').appendTo('.datastate');

                } else {
                    $.each(data, function (i, item) {
                        if (item.photo.length != 0) {
                            $('<li id=' + item.id + '><div class="hopistal_item"><div class="item_l"><img src="' + item.photo + '" alt=""></div><div class="item_r"><p class="name line1">' + item.OrganName + '</p><p class="addr line1">' + item.addr + '</p><div class="label"><div class="label_item">' + item.Grade1Name + item.Grade2Name + '</div><div class="label_item">' + item.NatureName + '</div></div></div></div></li>').appendTo('#hospitalList');
                        } else {
                            $('<li id=' + item.id + '><div class="hopistal_item"><div class="item_l"><img src="./images/nopic.jpg" alt=""></div><div class="item_r"><p class="name line1">' + item.OrganName + '</p><p class="addr line1">' + item.addr + '</p><div class="label"><div class="label_item">' + item.Grade1Name + item.Grade2Name + '</div><div class="label_item">' + item.NatureName + '</div></div></div></div></li>').appendTo('#hospitalList');
                        }
                    })
                    if (res.rows.length == 0) {
                        $('<p>暂无更多数据</p>').appendTo('.datastate');
                    }
                }
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
                $('<span>' + res.OrganName + '</span>').appendTo('.title');
                if (res.photo.length != 0) {
                    $('<img src="' + res.photo + '" alt="" />').appendTo('.pic');
                } else {
                    $('<img src="./images/nopic.jpg" alt="">').appendTo('.pic');
                }
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
    getDoctorList = function (id, search, slide, divId, curpageindex) {
        $('.datastate').empty();
        $.ajax({
            methods: 'GET',
            url: BASE_URL + '/API/GetPersonList',
            data: {
                pagesize: 10,
                curpageindex: curpageindex,
                Organsid: id,
                search: search
            },
            success: function (res) {
                // console.log(res)
                $(divId).empty();
                $(slide).slideUp(300);
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
                    if (res.rows.length == 0) {
                        $('<p>暂无更多数据</p>').appendTo('.datastate');
                    }
                } else {
                    $('<span class="nodata">暂无医师数据</span>').appendTo('#doctorList');
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
                    } else {
                        var types = '快速预约';
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
                if (res.photoFile.length != 0) {
                    $('<img src="' + res.photoFile + '" alt="" />').appendTo('.avatar');
                } else {
                    $('<img src="./images/nodoctor2.jpg" alt="" />').appendTo('.avatar');
                }
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
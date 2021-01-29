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
                console.log(res)
                $('<span>' + res.OrganName + '</span>').appendTo('.title')
                $('<img src="' + res.photo + '" alt="" />').appendTo('.pic');
            }
        })
    }
})
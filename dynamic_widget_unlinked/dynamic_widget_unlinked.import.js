//it is required to use GULP process to fill in the @@imports and get inline coding with friendlyIframe to work properly;
//gulpfile.js can be found in root directory
//single quotes and @@import are important for gulp task to work for these files
dwlinked = function() {
    var htmlFile = '<!doctype html><html lang=\'en\'><head><title>Dynamic Widget Unlink</title><meta charset=\'utf-8\'><link href=\'//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css\' media=\'all\' rel=\'stylesheet\' type=\'text/css\'><base target=\'_blank\'></head><body><div class=\'widget_ad\'><div class=\'e_container atomic\'><div class=\'e_widget\'><div class=\'e_image-carousel\'><div class=\'snt_logo\'><div class=\'snt_brand float-right\'><img src=\'//w1.synapsys.us/widgets/css/public/snt_logo_default.jpg\' class=\'float-left snt_default\'> <img src=\'//w1.synapsys.us/widgets/css/public/snt_logo_expand.jpg\' class=\'float-left snt_expand\'></div></div><div class=\'e_image-shader\' id=\'e_image-shader\'></div><div class=\'e_image-cover atomic_img_bg\' id=\'background_atomic\'><span class=\'pound\'>#</span> <span id=\'mainimg-rank\'>1</span></div><div id=\'mainimg\'></div><div class=\'e_image-title line-clamp\' id=\'profile-title\'></div></div><div class=\'e_info_box\'><div class=\'e_info_box-profile\'><div class=\'block-data\'><div class=\'profile-rank float-left\'><span class=\'profile-rank-pound\'>#</span> <span id=\'profile-rank\'></span></div><div class=\'profile-data float-left\'><div id=\'profile-data-box\'><div class=\'lh18 text-wrap\' id=\'name-title\'><span id=\'profile-name\'></span></div><div class=\'lh16 text-wrap\' id=\'data-title1\'><span id=\'profile-datapoint1\'></span> <span id=\'profile-datavalue1\'></span></div><div class=\'lh18 text-wrap\' id=\'data-title2\'><span id=\'profile-datavalue2\'></span> <span id=\'profile-datapoint2\'></span></div></div></div></div><div class=\'block-date\'></div></div><div class=\'e_info_box-cta\'><button id=\'button_atomic\' class=\'cta_button-list leftTransform atomic_border atomic_bg\'><span>Next List</span></button> <button id=\'button_left\' class=\'cta_button-previous rightTransform default_background\'><i class=\'fa fa-arrow-left\'></i></button> <button id=\'button_right\' class=\'cta_button-next leftTransform default_background\'><i class=\'fa fa-arrow-right\'></i></button></div></div></div><div class=\'margin_gap\'></div></div></div></body></html>';
    var cssFile = '@font-face{font-family:Lato;font-style:normal;font-weight:300;src:local(\'Lato Light\'),local(\'Lato-Light\'),url(//fonts.gstatic.com/s/lato/v13/dPJ5r9gl3kK6ijoeP1IRsvY6323mHUZFJMgTvxaG2iE.woff2) format(\'woff2\');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:300;src:local(\'Lato Light\'),local(\'Lato-Light\'),url(//fonts.gstatic.com/s/lato/v13/EsvMC5un3kjyUhB9ZEPPwg.woff2) format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215}@font-face{font-family:Lato;font-style:normal;font-weight:400;src:local(\'Lato Regular\'),local(\'Lato-Regular\'),url(//fonts.gstatic.com/s/lato/v13/UyBMtLsHKBKXelqf4x7VRQ.woff2) format(\'woff2\');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:400;src:local(\'Lato Regular\'),local(\'Lato-Regular\'),url(//fonts.gstatic.com/s/lato/v13/1YwB1sO8YE1Lyjf12WNiUA.woff2) format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215}@font-face{font-family:Lato;font-style:normal;font-weight:700;src:local(\'Lato Bold\'),local(\'Lato-Bold\'),url(//fonts.gstatic.com/s/lato/v13/ObQr5XYcoH0WBoUxiaYK3_Y6323mHUZFJMgTvxaG2iE.woff2) format(\'woff2\');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:700;src:local(\'Lato Bold\'),local(\'Lato-Bold\'),url(//fonts.gstatic.com/s/lato/v13/H2DMvhDLycM56KNuAtbJYA.woff2) format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215}@font-face{font-family:Lato;font-style:normal;font-weight:900;src:local(\'Lato Black\'),local(\'Lato-Black\'),url(//fonts.gstatic.com/s/lato/v13/R4a6fty3waPci7C44H8AjvY6323mHUZFJMgTvxaG2iE.woff2) format(\'woff2\');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:900;src:local(\'Lato Black\'),local(\'Lato-Black\'),url(//fonts.gstatic.com/s/lato/v13/tI4j516nok_GrVf4dhunkg.woff2) format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215}#default .atomic{color:#009dfb}#default .atomic_border{border:1px solid #009dfb!important}#default .atomic_img_bg{background-color:#009dfb!important}#default .atomic_bg:hover:before{background-color:#009dfb!important}#default-wide .atomic{color:#009dfb}#default-wide .atomic_border{border:1px solid #009dfb!important}#default-wide .atomic_border:hover{border:1px solid #fff!important}#default-wide .atomic_img_bg{background-color:#009dfb!important}#default-wide .atomic_bg{background-color:#009dfb!important}#default-wide .atomic_bg:hover:before{background-color:#fff!important}#football .atomic{color:#004e87}#football .atomic_border{border:1px solid #004e87!important}#football .atomic_img_bg{background-color:#004e87!important}#football .atomic_bg:hover:before{background-color:#004e87!important}#football-wide .atomic{color:#004e87}#football-wide .atomic_border{border:1px solid #004e87!important}#football-wide .atomic_border:hover{border:1px solid #fff!important}#football-wide .atomic_img_bg{background-color:#004e87!important}#football-wide .atomic_bg{background-color:#009dfb!important}#football-wide .atomic_bg:hover:before{background-color:#fff!important}#basketball .atomic{color:#f26f26}#basketball .atomic_border{border:1px solid #f26f26!important}#basketball .atomic_img_bg{background-color:#f26f26!important}#basketball .atomic_bg:hover:before{background-color:#f26f26!important}#basketball-wide .atomic{color:#f26f26}#basketball-wide .atomic_border{border:1px solid #f26f26!important}#basketball-wide .atomic_border:hover{border:1px solid #fff!important}#basketball-wide .atomic_img_bg{background-color:#f26f26!important}#basketball-wide .atomic_bg{background-color:#f26f26!important}#basketball-wide .atomic_bg:hover:before{background-color:#fff!important}#baseball .atomic{color:#bc2027}#baseball .atomic_border{border:1px solid #bc2027!important}#baseball .atomic_img_bg{background-color:#bc2027!important}#baseball .atomic_bg:hover:before{background-color:#bc2027!important}#baseball-wide .atomic{color:#bc2027}#baseball-wide .atomic_border{border:1px solid #bc2027!important}#baseball-wide .atomic_border:hover{border:1px solid #fff!important}#baseball-wide .atomic_img_bg{background-color:#bc2027!important}#baseball-wide .atomic_bg{background-color:#bc2027!important}#baseball-wide .atomic_bg:hover:before{background-color:#fff!important}#finance .atomic{color:#3098ff}#finance .atomic_border{border:1px solid #3098ff!important}#finance .atomic_img_bg{background-color:#3098ff!important}#finance .atomic_bg:hover:before{background-color:#3098ff!important}#finance-wide .atomic{color:#3098ff}#finance-wide .atomic_border{border:1px solid #3098ff!important}#finance-wide .atomic_border:hover{border:1px solid #fff!important}#finance-wide .atomic_img_bg{background-color:#3098ff!important}#finance-wide .atomic_bg{background-color:#3098ff!important}#finance-wide .atomic_bg:hover:before{background-color:#fff!important}#realestate .atomic{color:#43b149}#realestate .atomic_border{border:1px solid #43b149!important}#realestate .atomic_img_bg{background-color:#43b149!important}#realestate .atomic_bg:hover:before{background-color:#43b149!important}#realestate-wide .atomic{color:#43b149}#realestate-wide .atomic_border{border:1px solid #43b149!important}#realestate-wide .atomic_border:hover{border:1px solid #fff!important}#realestate-wide .atomic_img_bg{background-color:#43b149!important}#realestate-wide .atomic_bg{background-color:#43b149!important}#realestate-wide .atomic_bg:hover:before{background-color:#fff!important}#weather .atomic{color:#43b149}#weather .atomic_border{border:1px solid #43b149!important}#weather .atomic_img_bg{background-color:#43b149!important}#weather .atomic_bg:hover:before{background-color:#43b149!important}#weather-wide .atomic{color:#43b149}#weather-wide .atomic_border{border:1px solid #43b149!important}#weather-wide .atomic_border:hover{border:1px solid #fff!important}#weather-wide .atomic_img_bg{background-color:#43b149!important}#weather-wide .atomic_bg{background-color:#43b149!important}#weather-wide .atomic_bg:hover:before{background-color:#fff!important}#entertainment .atomic{color:#6459d3}#entertainment .atomic_border{border:1px solid #6459d3!important}#entertainment .atomic_img_bg{background-color:#6459d3!important}#entertainment .atomic_bg:hover:before{background-color:#6459d3!important}#entertainment-wide .atomic{color:#6459d3}#entertainment-wide .atomic_border{border:1px solid #6459d3!important}#entertainment-wide .atomic_border:hover{border:1px solid #fff!important}#entertainment-wide .atomic_img_bg{background-color:#6459d3!important}#entertainment-wide .atomic_bg{background-color:#6459d3!important}#entertainment-wide .atomic_bg:hover:before{background-color:#fff!important}body,html{margin:0!important;width:100%;height:auto;font-family:lato,Helvetica}*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}a{text-decoration:none;outline:0}:focus{outline:0}button{outline:0;border:none}button:focus{outline:0}button:hover{cursor:pointer}.default_background:hover:before{background-color:#000!important}.snt_logo{width:100%;height:25px;padding:5px;position:absolute;z-index:10}.snt_brand{width:15px;height:15px;border-top-right-radius:15px;border-top-left-radius:15px;border-bottom-right-radius:15px;border-bottom-left-radius:15px;background-color:#fff;position:relative;overflow:hidden;-webkit-transition:width .3s ease-in-out;-moz-transition:width .3s ease-in-out;-o-transition:width .3s ease-in-out;transition:width .3s ease-in-out}.snt_brand .snt_default{width:15px;height:15px;position:absolute;left:0;top:0;z-index:11}.snt_brand .snt_expand{display:none;position:absolute;width:75px;height:25px;left:-9px;top:-3px}.snt_brand:hover{width:56px}.snt_brand:hover .snt_default{display:none}.snt_brand:hover .snt_expand{display:block}.float-right{float:right}.float-left{float:left}.text-wrap{color:#fff;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.widget_ad{width:300px;height:600px;margin:auto}.e_container{width:calc(100% - 300px);height:100%;overflow:hidden;float:left}.e_widget{width:100%;height:100%;border:1px solid #e1e1e1;background-color:#fff}.e_image-carousel{width:100%;height:100%;text-align:center;overflow:hidden;position:relative}.e_data_box{width:100%;height:100%;position:absolute;top:0;left:0;z-index:3}.e_image-title{color:#fff;font-size:20px;line-height:24px;text-align:left;font-weight:700}.line-clamp{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.e_image-carousel #mainimg{width:100%;height:100%;background-size:cover;background-position:center;background-repeat:no-repeat}.e_image-shader{position:absolute;top:0;left:0;width:100%;height:100%;background-image:none;background-color:rgba(0,0,0,.45);z-index:2}.e_image-cover{width:100%;height:100%;position:absolute;top:0;left:0;opacity:.85;z-index:1}.pound{font-weight:300;color:#000;font-size:100px;opacity:.35;position:relative;top:-5px}#mainimg-rank{font-weight:700;font-size:130px;line-height:180px;color:#000;opacity:.35}.e_info_box-profile{width:100%}.block-data{padding-left:15px;width:auto;height:50px;text-align:left}.profile-rank{width:50px;height:50px;line-height:50px;font-size:18px;text-align:center;color:#fff}.profile-rank-pound{font-weight:300;font-size:15px;position:relative;bottom:2px;left:3px}#profile-rank{font-weight:700}.profile-data{height:50px;width:calc(100% - 50px);border-left:3px solid;padding-left:10px}.profile-data #profile-data-box{padding-right:15px;overflow:hidden;position:relative;top:-5px}.profile-data #profile-name{color:#fff;font-size:18px}.profile-data #profile-datapoint1{color:#fff;font-size:12px}.profile-data #profile-datavalue1{color:#fff;font-size:12px;font-weight:700}.profile-data #profile-datavalue2{color:#fff;font-size:14px;font-weight:900}.profile-data #profile-datapoint2{color:#fff;font-size:14px}.block-date{width:100%;height:auto;margin-top:4px;padding-left:64px}.profile-last-updated{font-size:10px;color:#9b9b9b}.e_info_box-cta{width:100%;height:35px;color:inherit;text-align:left}.e_info_box-cta button{border-radius:5px;background-color:transparent;display:inline-block;position:relative}.cta_button-list{width:140px;height:100%;margin-left:30px;border:1px solid;font-size:12px;fill:inherit}.cta_button-list:hover{color:#fff;position:relative;z-index:2}.leftTransform:before{content:"";position:absolute;z-index:-1;top:0;left:0;right:0;bottom:0;border-radius:3px;background-color:inherit;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:0 50%;transform-origin:0 50%;-webkit-transition-property:transform;transition-property:transform;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-timing-function:ease-out;transition-timing-function:ease-out}.leftTransform:hover:before{-webkit-transform:scaleX(1);transform:scaleX(1)}.rightTransform:before{content:"";position:absolute;z-index:-1;top:0;left:0;right:0;bottom:0;border-radius:3px;background-color:inherit;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:100% 50%;transform-origin:100% 50%;-webkit-transition-property:transform;transition-property:transform;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-timing-function:ease-out;transition-timing-function:ease-out}.rightTransform:hover:before{-webkit-transform:scaleX(1);transform:scaleX(1)}.cta_button-list span{font-weight:700}.cta_button-previous{color:#999!important;width:57px;height:100%;margin-left:6px;border:1px solid;font-size:12px}.cta_button-previous:hover{border:1px solid #000;color:#fff!important;position:relative;z-index:2}.cta_button-next{color:#999!important;width:57px;height:100%;margin-left:1px;border:1px solid;font-size:12px}.cta_button-next:hover{border:1px solid #000;color:#fff!important;position:relative;z-index:2}.lh16{line-height:16px}.lh18{line-height:18px}.margin_gap{width:100%;height:20px}.text-wrap{color:#000}.e_container{width:300px;height:350px}.e_widget{height:auto}.e_image-carousel{height:190px}.e_image-title{margin:0 15px 15px 15px;font-size:18px;line-height:26px;position:absolute;z-index:3;left:0;bottom:0}.e_image-shader{background-image:linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,.8));background-color:transparent}.e_image-cover{display:none;opacity:.85}.e_info_box{width:100%;height:140px}.e_info_box-profile{width:100%;height:90px;padding-top:20px}.block-data{width:100%;height:50px}.profile-rank{color:#000}.profile-data #profile-name{color:#000}.profile-data #profile-datapoint1{color:#000}.profile-data #profile-datavalue1{color:#000}.profile-data #profile-datavalue2{color:#000}.profile-data #profile-datapoint2{color:#000}.e_info_box-cta button{color:inherit;background-color:#fff}.cta_button-list{background-color:#fff!important;margin-left:15px}';
    var cssWideFile = '@font-face{font-family:Lato;font-style:normal;font-weight:300;src:local(\'Lato Light\'),local(\'Lato-Light\'),url(//fonts.gstatic.com/s/lato/v13/dPJ5r9gl3kK6ijoeP1IRsvY6323mHUZFJMgTvxaG2iE.woff2) format(\'woff2\');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:300;src:local(\'Lato Light\'),local(\'Lato-Light\'),url(//fonts.gstatic.com/s/lato/v13/EsvMC5un3kjyUhB9ZEPPwg.woff2) format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215}@font-face{font-family:Lato;font-style:normal;font-weight:400;src:local(\'Lato Regular\'),local(\'Lato-Regular\'),url(//fonts.gstatic.com/s/lato/v13/UyBMtLsHKBKXelqf4x7VRQ.woff2) format(\'woff2\');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:400;src:local(\'Lato Regular\'),local(\'Lato-Regular\'),url(//fonts.gstatic.com/s/lato/v13/1YwB1sO8YE1Lyjf12WNiUA.woff2) format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215}@font-face{font-family:Lato;font-style:normal;font-weight:700;src:local(\'Lato Bold\'),local(\'Lato-Bold\'),url(//fonts.gstatic.com/s/lato/v13/ObQr5XYcoH0WBoUxiaYK3_Y6323mHUZFJMgTvxaG2iE.woff2) format(\'woff2\');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:700;src:local(\'Lato Bold\'),local(\'Lato-Bold\'),url(//fonts.gstatic.com/s/lato/v13/H2DMvhDLycM56KNuAtbJYA.woff2) format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215}@font-face{font-family:Lato;font-style:normal;font-weight:900;src:local(\'Lato Black\'),local(\'Lato-Black\'),url(//fonts.gstatic.com/s/lato/v13/R4a6fty3waPci7C44H8AjvY6323mHUZFJMgTvxaG2iE.woff2) format(\'woff2\');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:900;src:local(\'Lato Black\'),local(\'Lato-Black\'),url(//fonts.gstatic.com/s/lato/v13/tI4j516nok_GrVf4dhunkg.woff2) format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215}#default .atomic{color:#009dfb}#default .atomic_border{border:1px solid #009dfb!important}#default .atomic_img_bg{background-color:#009dfb!important}#default .atomic_bg:hover:before{background-color:#009dfb!important}#default-wide .atomic{color:#009dfb}#default-wide .atomic_border{border:1px solid #009dfb!important}#default-wide .atomic_border:hover{border:1px solid #fff!important}#default-wide .atomic_img_bg{background-color:#009dfb!important}#default-wide .atomic_bg{background-color:#009dfb!important}#default-wide .atomic_bg:hover:before{background-color:#fff!important}#football .atomic{color:#004e87}#football .atomic_border{border:1px solid #004e87!important}#football .atomic_img_bg{background-color:#004e87!important}#football .atomic_bg:hover:before{background-color:#004e87!important}#football-wide .atomic{color:#004e87}#football-wide .atomic_border{border:1px solid #004e87!important}#football-wide .atomic_border:hover{border:1px solid #fff!important}#football-wide .atomic_img_bg{background-color:#004e87!important}#football-wide .atomic_bg{background-color:#009dfb!important}#football-wide .atomic_bg:hover:before{background-color:#fff!important}#basketball .atomic{color:#f26f26}#basketball .atomic_border{border:1px solid #f26f26!important}#basketball .atomic_img_bg{background-color:#f26f26!important}#basketball .atomic_bg:hover:before{background-color:#f26f26!important}#basketball-wide .atomic{color:#f26f26}#basketball-wide .atomic_border{border:1px solid #f26f26!important}#basketball-wide .atomic_border:hover{border:1px solid #fff!important}#basketball-wide .atomic_img_bg{background-color:#f26f26!important}#basketball-wide .atomic_bg{background-color:#f26f26!important}#basketball-wide .atomic_bg:hover:before{background-color:#fff!important}#baseball .atomic{color:#bc2027}#baseball .atomic_border{border:1px solid #bc2027!important}#baseball .atomic_img_bg{background-color:#bc2027!important}#baseball .atomic_bg:hover:before{background-color:#bc2027!important}#baseball-wide .atomic{color:#bc2027}#baseball-wide .atomic_border{border:1px solid #bc2027!important}#baseball-wide .atomic_border:hover{border:1px solid #fff!important}#baseball-wide .atomic_img_bg{background-color:#bc2027!important}#baseball-wide .atomic_bg{background-color:#bc2027!important}#baseball-wide .atomic_bg:hover:before{background-color:#fff!important}#finance .atomic{color:#3098ff}#finance .atomic_border{border:1px solid #3098ff!important}#finance .atomic_img_bg{background-color:#3098ff!important}#finance .atomic_bg:hover:before{background-color:#3098ff!important}#finance-wide .atomic{color:#3098ff}#finance-wide .atomic_border{border:1px solid #3098ff!important}#finance-wide .atomic_border:hover{border:1px solid #fff!important}#finance-wide .atomic_img_bg{background-color:#3098ff!important}#finance-wide .atomic_bg{background-color:#3098ff!important}#finance-wide .atomic_bg:hover:before{background-color:#fff!important}#realestate .atomic{color:#43b149}#realestate .atomic_border{border:1px solid #43b149!important}#realestate .atomic_img_bg{background-color:#43b149!important}#realestate .atomic_bg:hover:before{background-color:#43b149!important}#realestate-wide .atomic{color:#43b149}#realestate-wide .atomic_border{border:1px solid #43b149!important}#realestate-wide .atomic_border:hover{border:1px solid #fff!important}#realestate-wide .atomic_img_bg{background-color:#43b149!important}#realestate-wide .atomic_bg{background-color:#43b149!important}#realestate-wide .atomic_bg:hover:before{background-color:#fff!important}#weather .atomic{color:#43b149}#weather .atomic_border{border:1px solid #43b149!important}#weather .atomic_img_bg{background-color:#43b149!important}#weather .atomic_bg:hover:before{background-color:#43b149!important}#weather-wide .atomic{color:#43b149}#weather-wide .atomic_border{border:1px solid #43b149!important}#weather-wide .atomic_border:hover{border:1px solid #fff!important}#weather-wide .atomic_img_bg{background-color:#43b149!important}#weather-wide .atomic_bg{background-color:#43b149!important}#weather-wide .atomic_bg:hover:before{background-color:#fff!important}#entertainment .atomic{color:#6459d3}#entertainment .atomic_border{border:1px solid #6459d3!important}#entertainment .atomic_img_bg{background-color:#6459d3!important}#entertainment .atomic_bg:hover:before{background-color:#6459d3!important}#entertainment-wide .atomic{color:#6459d3}#entertainment-wide .atomic_border{border:1px solid #6459d3!important}#entertainment-wide .atomic_border:hover{border:1px solid #fff!important}#entertainment-wide .atomic_img_bg{background-color:#6459d3!important}#entertainment-wide .atomic_bg{background-color:#6459d3!important}#entertainment-wide .atomic_bg:hover:before{background-color:#fff!important}body,html{margin:0!important;width:100%;height:auto;font-family:lato,Helvetica}*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}a{text-decoration:none;outline:0}:focus{outline:0}button{outline:0;border:none}button:focus{outline:0}button:hover{cursor:pointer}.default_background:hover:before{background-color:#000!important}.snt_logo{width:100%;height:25px;padding:5px;position:absolute;z-index:10}.snt_brand{width:15px;height:15px;border-top-right-radius:15px;border-top-left-radius:15px;border-bottom-right-radius:15px;border-bottom-left-radius:15px;background-color:#fff;position:relative;overflow:hidden;-webkit-transition:width .3s ease-in-out;-moz-transition:width .3s ease-in-out;-o-transition:width .3s ease-in-out;transition:width .3s ease-in-out}.snt_brand .snt_default{width:15px;height:15px;position:absolute;left:0;top:0;z-index:11}.snt_brand .snt_expand{display:none;position:absolute;width:75px;height:25px;left:-9px;top:-3px}.snt_brand:hover{width:56px}.snt_brand:hover .snt_default{display:none}.snt_brand:hover .snt_expand{display:block}.float-right{float:right}.float-left{float:left}.text-wrap{color:#fff;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.widget_ad{width:100%;min-width:650px;height:250px;margin:auto}.e_container{width:calc(100% - 300px);height:100%;overflow:hidden;float:left}.e_widget{width:100%;height:100%;background-color:#fff}.e_image-carousel{width:100%;height:100%;text-align:center;overflow:hidden;position:relative}.e_data_box{width:100%;height:100%;position:absolute;top:0;left:0;z-index:3}.e_image-title{color:#fff;font-size:20px;line-height:24px;text-align:left;font-weight:700}.line-clamp{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.e_image-carousel #mainimg{width:100%;height:100%;background-size:cover;background-position:center;background-repeat:no-repeat}.e_image-shader{position:absolute;top:0;left:0;width:100%;height:100%;background-image:none;background-color:rgba(0,0,0,.45);z-index:2}.e_image-cover{width:100%;height:100%;position:absolute;top:0;left:0;opacity:.85;z-index:1}.pound{display:none;font-weight:300;color:#000;font-size:100px;opacity:.35;position:relative;top:-5px}#mainimg-rank{display:none;font-weight:700;font-size:130px;line-height:180px;color:#000;opacity:.35}.e_info_box-profile{width:100%}.block-data{padding-left:15px;width:auto;height:50px;text-align:left}.profile-rank{width:50px;height:50px;line-height:50px;font-size:18px;text-align:center;color:#fff}.profile-rank-pound{font-weight:300;font-size:15px;position:relative;bottom:2px;left:3px}#profile-rank{font-weight:700}.profile-data{height:50px;width:calc(100% - 50px);border-left:3px solid;padding-left:10px}.profile-data #profile-data-box{padding-right:15px;overflow:hidden;position:relative;top:-5px}.profile-data #profile-name{color:#fff;font-size:18px}.profile-data #profile-datapoint1{color:#fff;font-size:12px}.profile-data #profile-datavalue1{color:#fff;font-size:12px;font-weight:700}.profile-data #profile-datavalue2{color:#fff;font-size:14px;font-weight:900}.profile-data #profile-datapoint2{color:#fff;font-size:14px}.block-date{width:100%;height:auto;margin-top:4px;padding-left:64px}.profile-last-updated{font-size:10px;color:#9b9b9b}.e_info_box-cta{width:100%;height:35px;color:inherit;text-align:left}.e_info_box-cta button{border-radius:5px;background-color:transparent;display:inline-block;position:relative}.cta_button-list{width:140px;height:100%;margin-left:30px;border:1px solid;font-size:12px;fill:inherit}.cta_button-list:hover{color:#fff;position:relative;z-index:2;-webkit-transition:border .3s ease-in-out;-moz-transition:border .3s ease-in-out;-o-transition:border .3s ease-in-out;transition:border .3s ease-in-out}.leftTransform:before{content:"";position:absolute;z-index:-1;top:0;left:0;right:0;bottom:0;border-radius:3px;background-color:inherit;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:0 50%;transform-origin:0 50%;-webkit-transition-property:transform;transition-property:transform;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-timing-function:ease-out;transition-timing-function:ease-out}.leftTransform:hover:before{-webkit-transform:scaleX(1);transform:scaleX(1)}.rightTransform:before{content:"";position:absolute;z-index:-1;top:0;left:0;right:0;bottom:0;border-radius:3px;background-color:inherit;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:100% 50%;transform-origin:100% 50%;-webkit-transition-property:transform;transition-property:transform;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-timing-function:ease-out;transition-timing-function:ease-out}.rightTransform:hover:before{-webkit-transform:scaleX(1);transform:scaleX(1)}.cta_button-list span{font-weight:700}.cta_button-previous{color:#999!important;width:57px;height:100%;margin-left:6px;border:1px solid;font-size:12px}.cta_button-previous:hover{border:1px solid #000;color:#fff!important;position:relative;z-index:2}.cta_button-next{color:#999!important;width:57px;height:100%;margin-left:1px;border:1px solid;font-size:12px}.cta_button-next:hover{border:1px solid #000;color:#fff!important;position:relative;z-index:2}.lh16{line-height:16px}.lh18{line-height:18px}.margin_gap{width:100%;height:20px}@media screen and (min-width:650px),(min-width:992px){.default_background:hover:before{background-color:#fff!important}.e_image-title{margin:30px 0;padding:0 30px;position:absolute;top:0;left:0;z-index:2;font-size:16px}.e_info_box{width:auto;min-width:350px;height:140px;position:absolute;top:110px;z-index:10}.e_info_box-profile{margin-bottom:24px}.e_image-shader{display:block!important}.e_image-cover{display:block!important}.cta_button-list{color:#fff}.cta_button-list:hover{border:none!important;color:inherit}.cta_button-previous{color:#fff!important}.cta_button-previous:hover{border:1px solid #fff;color:#000!important}.cta_button-next{color:#fff!important}.cta_button-next:hover{border:1px solid #fff;color:#000!important}.margin_gap{display:none}}@media screen and (min-width:992px){.e_image-title{font-size:20px}}@media screen and (max-width:649px){.widget_ad{width:300px;min-width:300px;max-width:649px;margin:0 auto}.e_container{display:none}}';

    var embedURL = "dynamic_widget_unlinked";
    var currentScript = document.currentScript != null && document.currentScript.src.indexOf(embedURL) != -1 ? document.currentScript : (function() { // resolution for IE since it does not have currentScript to find the currently running script on the page
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length - 1; i >= 0; i--) {
            if (scripts[i].src.indexOf(embedURL) != -1) {
                return scripts[i];
                i = -1;
            }
        }
    })();

    var friendlyIframeWindow;
    var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
    var widthBreakpoint = 649; // in pixels
    var wideWidget = false; // flag that changes certain functions to run differently (default = false)
    var windowWidth;
    var apiCallUrl; // this is global call that is used for api calls
    var imageUrl = "images.synapsys.us"; // this is global call that is used for images
    var dwApi = "dw.synapsys.us/list_api.php"; // dynamic widget api
    var tdlApi = "touchdownloyal-api.synapsys.us/list/"; // used for nfl and ncaaf category
    var fallBackApi; // used for nfl and ncaaf category
    var href = window.top.location;
    var currentIndex = 0; // current index of an array which (default = 0)
    var maxIndex = 1; //declare max index of returned data (default = 1)
    var widgetData; // api returns is sent here
    var tries = 0; // flag for api to try atleast 10 times before failing completely
    var maxTries = 5;
    var listRand = 0; // used to increment index of random list in database
    var subCategory; // with a vast amount groups and categories need we need the currently shown category for the rest of the code
    var query = {};
    var $;

    function createFriendlyIframe() {
        //create friendly iframe to place ourselves inside
        var friendlyIframe = document.createElement('iframe');
        // friendlyIframe.id = "friendlyIframe_" + countSelf.length;
        friendlyIframe.className = "dwunlinkIframe"
        friendlyIframe.width = '300';
        friendlyIframe.height = 600 - 250; //250 is the add height
        friendlyIframe.scrolling = 'no';
        friendlyIframe.style.overflow = 'hidden';
        friendlyIframe.src = 'about:blank';
        friendlyIframe.style.border = 'none';
        currentScript.parentNode.insertBefore(friendlyIframe, currentScript);

        friendlyIframeWindow = friendlyIframe.contentWindow;

        //create inline html for friendlyIframe
        friendlyIframeWindow.document.open();
        friendlyIframeWindow.document.write(htmlFile + '<scr' + 'ipt type="text/javascript"> dwlinked = ' + dwlinked + ' </scr' + 'ipt>');
        friendlyIframeWindow.document.close();

        //create inline style for friendlyIframe
        var style = friendlyIframeWindow.document.createElement("style");
        if (query.wide != null && query.wide != '') {
            friendlyIframe.width = friendlyIframe.parentNode.clientWidth - 300; //300 being the width
            // friendlyIframe.style.maxWidth = '992px';
            friendlyIframe.height = '250';

            //CREATE LISTENER FOR RESIZE
            window.addEventListener('resize', function() {
                //set iframe to width of parent node
                friendlyIframe.width = friendlyIframe.parentNode.clientWidth;
            }, true);

            style.appendChild(friendlyIframeWindow.document.createTextNode(cssWideFile));
            wideWidget = true; //set wide flag
        } else {
            style.appendChild(friendlyIframeWindow.document.createTextNode(cssFile));
        }

        //append the css file into iframe head
        friendlyIframeWindow.document.head.appendChild(style);

        //create variable to be used similar to jquery for id's
        $ = function(e) { // create a simple version for grabbing id's of elements
            return friendlyIframeWindow.document.getElementById(e)
        };
    }

    //determine if a query string is after the index.html location || if query is after a javascript location
    if (location.search != null && location.search != '') {
        query = JSON.parse(decodeURIComponent(location.search.substr(1)));
        listRand = query.rand ? query.rand : 1;
        //FIRST THING IS SETUP ENVIRONMENTS
    } else {
        var srcQuery = currentScript.src.split("js?")[1];
        if (srcQuery != "" && srcQuery != null) {
            try {
                query = JSON.parse(decodeURIComponent(srcQuery).replace(/'/g, '"'));
            } catch (e) {
                console.log(e);
            }
        }
    }

    //create friendly iframe
    createFriendlyIframe();

    //after you get the query you set the enironment
    setupEnvironment(query);

    //THEN START UPDATING THE LISTS
    updateList(0);

    try {
        var baseEvent = query.event;
        baseEvent.event = "widget-interaction";
        var postObject = {
            snt_data: baseEvent,
            action: 'snt_tracker'
        };
        //create event listeners
        $("button_left").addEventListener("click", function() {
            updateIndex(-1);
            sendPostMessageToIgloo(postObject, 5);
        });
        $("button_right").addEventListener("click", function() {
            updateIndex(1);
            sendPostMessageToIgloo(postObject, 5);
        });
        $("button_atomic").addEventListener("click", function() {
            updateList(1);
            sendPostMessageToIgloo(postObject, 5);
        });
    } catch (e) {
        console.log("Dynamic Widget: Not currently hosted inside igloo... disabling analytics");
        // just enable button click events
        $("button_left").addEventListener("click", function() {
            updateIndex(-1);
        });
        $("button_right").addEventListener("click", function() {
            updateIndex(1);
        });
        $("button_atomic").addEventListener("click", function() {
            updateList(1);
        });
    }
    // //just enable button click events
    // $("button_left").addEventListener("click", function() {
    //   updateIndex(-1);
    // });
    // $("button_right").addEventListener("click", function() {
    //   updateIndex(1);
    // });
    // $("button_atomic").addEventListener("click", function() {
    //   updateList(1);
    // });


    function getEnv(env) {
        if (env.match(/localhost/g) != null || env.match(/dev/g) != null) {
            env = "dev";
        } else if (env.match(/qa/g) != null) {
            env = "qa";
        } else {
            env = "prod";
        }
        return env;
    }

    //DEPRECATED WILL BE REPLACED WITH getENV
    function synapsysENV(env) {
        if (env.match(/localhost/g) != null || env.match(/dev/g) != null) {
            env = 'dev-';
        } else if (env.match(/qa/g) == 'qa') {
            env = 'qa-';
        } else {
            env = '';
        }
        return env;
    }

    /***************************** SETUP ENVIRONMENTS ******************************
     * @function setupEnvironment
     * setup Environment function
     *
     * @param function widgetQuery - the query string sent back as and Object from the location.search substrings
     * to be parsed through and set for global use
     */
    function setupEnvironment(widgetQuery) {
        apiCallUrl = protocolToUse;
        var dom = widgetQuery.dom;
        var cat = widgetQuery.category;
        var group = widgetQuery.group == '' ? widgetQuery.group = null : widgetQuery.group;
        var environment = window.location.hostname.split('.')[0];
        var env;
        if (widgetQuery.env != null) {
            env = widgetQuery.env ? widgetQuery.env : 'prod';
        } else {
            env = getEnv(environment);
        }

        //setup Image Environment api
        imageUrl = protocolToUse + synapsysENV(environment) + imageUrl; // this is global call that is used for images

        //if group doesnt exist and category is football
        if (widgetQuery.group == null && (widgetQuery.category == 'nfl' || widgetQuery.category == 'ncaaf' || widgetQuery.category == 'football' || widgetQuery.category == 'nflncaaf')) {
            subCategory = widgetQuery.category;
            apiCallUrl += env + "-" + tdlApi;
        } else {
            //if group does exist here then add group query parameter otherwise add categeory parameter for api
            if (widgetQuery.group != null && widgetQuery.group != "") {
                apiCallUrl += synapsysENV(environment) + dwApi + "?group=" + group;
            } else {
                subCategory = widgetQuery.category;
                apiCallUrl += synapsysENV(environment) + dwApi + "?cat=" + cat;
            }

            if (dom != null && dom != "") {
                apiCallUrl += "&partner=" + dom;
            }
        }

        //FALL BACK API SET HERE INCASE Dynamic widget api fails to make a call
        fallBackApi = protocolToUse + synapsysENV(environment) + dwApi + "?group=sports";
    }

    /************************ UPDATE LIST ***********************
     * @function updateList
     * update List function and if the list is from dynamic widget category then it will change the list
     * by incrementing the initially random number
     *
     * @param function listNum - list number incremented that will be added to the listRand with listNum
     */
    function updateList(listNum) {
        widgetData = null;
        // currentIndex = 0;
        if (query.group == null && (query.category == 'nfl' || query.category == 'ncaaf' || query.category == 'football')) {
            getFootballList(query.category);
        } else {
            listRand = Number(listRand) + Number(listNum);
            var currentApi = apiCallUrl + "&rand=" + listRand;
            runAPI(currentApi);
        }
    }

    /************************ Update Index *************************
     * @function updateIndex
     * increment index and rerun display widget
     * cannot pass the maximum or minimum
     *
     * @param function difference - difference that will be added to current index
     */
    function updateIndex(difference) {
        if (widgetData) {
            currentIndex -= difference;
            if (currentIndex < 0) {
                currentIndex = maxIndex - 1;
            } else if (currentIndex >= maxIndex) {
                currentIndex = 0;
            } else {}
            //call display widget
            displayWidget();
        }
    }

    /********************** GET FOOTBALL JSON LIST ***************
     * @function getFootballList
     *gets a PRE generated list from a json file that is asynchronously being called; returns and Array of all lists
     *
     * @param function league - league can either be nfl, ncaaf
     */
    function getFootballList(league) {
        if (league == "nfl") {
            var url = '../js/tdl_list_array.json';
        } else if (league == "ncaaf") {
            var url = '../js/tdl_list_array_ncaaf.json';
        } else if (league == "nflncaaf") {
            rand = Math.floor((Math.random() * 2) + 1);
            if (rand == 1) {
                var url = '../js/tdl_list_array_ncaaf.json';
                l.category = "ncaaf";
            } else {
                var url = '../js/tdl_list_array.json';
                l.category = "nfl";
            }
        }
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                //On complete function
                jsonArray = JSON.parse(xmlHttp.responseText);
                getRandFootballList(jsonArray);
            }
        }
        xmlHttp.open("GET", url, true); // false for synchronous request
        xmlHttp.send(null);
    }


    /******************** GET RANDOM FOOTBALL LIST ****************
     * @function getRandFootballList
     * chooses a random index in the array and uses that list to displace
     *
     * @param function jsonArray - the init
     */
    function getRandFootballList(jsonArray) {
        rand = Math.floor((Math.random() * (jsonArray.length - 1)) + 1);
        var date = new Date;
        var compareDate = new Date('09/15/' + date.getFullYear());
        var season;
        if (date.getMonth() == compareDate.getMonth() && date.getDate() >= compareDate.getDate()) {
            season = jsonArray[rand] + "&season=" + date.getFullYear();
        } else if (date.getMonth() > compareDate.getMonth()) {
            season = jsonArray[rand] + "&season=" + date.getFullYear();
        } else {
            season = jsonArray[rand] + "&season=" + (date.getFullYear() - 1);
        }
        apiCallUrl += season;
        runAPI(apiCallUrl);
    }

    /***************************** runAPI ***************************
     * @function runAPI
     * function that makes an asynchronous request using http and setting a global variable equal to the response of the text.
     * fail safe of retrying 10 times before sending error message
     *
     * @param function apiUrl -
     */
    function runAPI(apiUrl) { //Make it to where it is easy to be reused by anyone
        //variable that stores the response of an http request
        if (window.XMLHttpRequest) {
            var xhttp = new XMLHttpRequest();
        } else {
            var xhttp = new ActiveXObject('Microsoft.XMLHTTP')
        }
        xhttp.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                if (this.status == 200) {
                    // On success parse out the response
                    widgetData = JSON.parse(this.responseText);
                    var dataArray = widgetData.l_data != null ? widgetData.l_data : widgetData.data.listData;
                    //set maximum index of returned dataLayer
                    if (dataArray.length >= 25) {
                        currentIndex = 24;
                        maxIndex = 25;
                    } else {
                        currentIndex = dataArray.length - 1;
                        maxIndex = dataArray.length;
                    }
                    displayWidget(); //send in the name of the function that needs to be ran once data has been confirmed
                } else {
                    // Error handling
                    // Get the message
                    var msg = this.statusText;
                    if (this.status == 500) {
                        try {
                            msg = JSON.parse(this.responseText).message
                        } catch (e) {
                            console.log('No JSON message')
                        }
                    }
                    msg = 'HTTP Error (' + this.status + '): ' + msg;
                    if (tries > (maxTries - 2)) {
                        console.warn(msg + " | hiding widget container | => SWAPPING TO FALLBACK");
                        apiUrl = fallBackApi + "&rand=1";
                        apiCallUrl = fallBackApi;
                    }
                    if (tries++ > maxTries) { // IF WIDGET FAILS THEN HIDE THE ENTIRE CONTAINER
                        document.getElementsByClassName('e_container')[0].style.display = 'none';
                        throw msg + " | hiding widget fallback failed container | => PLEASE CONTACT YOUR PROVIDER";
                    }
                    setTimeout(runAPI(apiUrl), 500)
                }
            }
        };
        xhttp.open("GET", apiUrl, true);
        xhttp.send();
    }; /************************** runAPI END ************************/


    /****************************Display Widget Data *****************
     * @function displayWidget
     * When data is available set the data return to the unique identifiers on the DOM
     * using innerHTML
     *
     * @param function
     */
    function displayWidget() {
        try {
            //sets the last updated date
            // var date = new Date();
            // var formatedDate = dateFormat(date.getDay(), date.getDate(), date.getMonth(), date.getFullYear());
            // $('profile-updated').innerHTML = formatedDate.weekday + ", " + formatedDate.month + " " + formatedDate.day + ", " + formatedDate.year;

            //Run dynamic color of widget

            /***************************FOOTBALL DATA APPLIANCE*******************************/
            if (query.group == null && (query.category == "football" || query.category == "nfl" || query.category == "ncaaf")) {
                var dataArray = widgetData.data.listData;
                setCategoryColors(subCategory);
                //set maximum index of returned dataLayer
                // maxIndex = dataArray.length;

                var curData = dataArray[currentIndex];

                //list title
                $("profile-title").innerHTML = widgetData.data.listInfo.listName;

                $("profile-rank").innerHTML = curData.rank;
                $("mainimg-rank").innerHTML = curData.rank;

                //current index of a player or team to display
                if (curData.rankType == "player") {
                    var image = checkImage(imageUrl + curData.playerHeadshotUrl);
                    if (image != null) {
                        $("mainimg").style.backgroundImage = "url('" + image + "')";
                    }

                    $("profile-name").innerHTML = curData.playerFirstName + " " + curData.playerLastName;

                    $("profile-datapoint1").innerHTML = "Team: ";
                    $("profile-datavalue1").innerHTML = curData.teamName;

                    $("profile-datavalue2").innerHTML = Number(curData.stat).toFixed(2);
                    $("profile-datapoint2").innerHTML = " " + curData.statDescription;

                    $("name-title").setAttribute("title", curData.playerFirstName + " " + curData.playerLastName);
                    $("data-title1").setAttribute("title", "Team: " + curData.teamName);
                    $("data-title2").setAttribute("title", Number(curData.stat).toFixed(2) + " " + curData.statDescription);
                } else {
                    var image = checkImage(imageUrl + curData.teamLogo);
                    if (image != null) {
                        $("mainimg").style.backgroundImage = "url('" + image + "')";
                    }

                    $("profile-name").innerHTML = curData.teamName;
                    $("profile-datapoint1").innerHTML = "Division: ";
                    $("profile-datavalue1").innerHTML = curData.divisionName;

                    $("profile-datavalue2").innerHTML = Number(curData.stat).toFixed(2);
                    $("profile-datapoint2").innerHTML = ": " + curData.statDescription;

                    $("name-title").setAttribute("title", curData.teamName);
                    $("data-title1").setAttribute("title", "Division: " + curData.divisionName);
                    $("data-title2").setAttribute("title", Number(curData.stat).toFixed(2) + ": " + curData.statDescription);
                }
                /***************************END OF FOOTBALL DATA*******************************/
            } else { /***************************DYNAMIC DATA APPLIANCE*******************************/
                var dataArray = widgetData.l_data;

                //checks if a category from group lists is being sent back then setting it as the subCategoryto be checked for proper color and fallback images
                if (query.group != null && widgetData.category != null) {
                    subCategory = widgetData.category;
                } else if (query.group != null && widgetData.category == null) {
                    subCategory = null;
                }

                setCategoryColors(subCategory);
                //set maximum index of returned dataLayer
                // maxIndex = dataArray.length;

                //current index of list
                var curData = dataArray[currentIndex];

                //list title
                $("profile-title").innerHTML = widgetData.l_title;

                //checks if a proper live image is being sent from team_wide_img or player_wide_img otherwise default to li_img datapoint
                var image;
                if (curData.player_wide_img != null && curData.player_wide_img != "") {
                    image = checkImage(imageUrl + curData.player_wide_img);
                } else if ((curData.player_wide_img == null || curData.player_wide_img == "") && (curData.team_wide_img != null && curData.team_wide_img != "")) {
                    image = checkImage(imageUrl + curData.team_wide_img);
                } else {
                    image = checkImage(curData.li_img);
                }

                if (image != null) {
                    $("mainimg").style.backgroundImage = "url('" + image + "')";
                }

                //FINANCE ONE OFF where if finance we want to use only 100% of the height;
                if (subCategory == 'finance' && !wideWidget) {
                    $("mainimg").style.backgroundSize = "auto 100%";
                } else {
                    $("mainimg").style.backgroundSize = "cover";
                }

                $("mainimg").style.backgroundImage
                    //CELEBRITIES ONE OFF to set proper structure
                if (subCategory == 'celebrities') { //TODO make a more efficient way to set values than whats being done below inside each if else statement
                    $("profile-rank").innerHTML = curData.li_rank;
                    $("mainimg-rank").innerHTML = curData.li_rank;
                    $("profile-name").innerHTML = curData.li_title;
                    $("name-title").setAttribute("title", curData.li_title);
                    if (curData.data_value_1 != null) {
                        $("profile-datavalue1").innerHTML = curData.data_value_1;
                        $("profile-datapoint1").innerHTML = curData.data_point_1 != null ? curData.data_point_1 : '';
                        $("data-title1").setAttribute("title", curData.data_value_1 == '' ? curData.data_point_1 : curData.data_value_1);
                    } else {
                        $("profile-datavalue1").innerHTML = curData.fallback_data_value_1 != null ? curData.fallback_data_value_1 : '';
                        $("profile-datapoint1").innerHTML = curData.fallback_data_point_1 != null ? curData.fallback_data_point_1 : '';
                        $("data-title1").setAttribute("title", curData.fallback_data_value_1);
                    }

                    $("profile-datapoint2").innerHTML = curData.data_point_2 != null ? curData.data_point_2 : '';
                    $("profile-datavalue2").innerHTML = curData.data_value_2 != null ? " " + curData.data_value_2 : '';
                    $("data-title2").setAttribute("title", curData.data_value_2);
                } else {
                    $("profile-rank").innerHTML = curData.li_rank;
                    $("mainimg-rank").innerHTML = curData.li_rank;
                    $("profile-name").innerHTML = curData.li_title;
                    // $("profile-datapoint1").innerHTML = curData.li_value;
                    $("profile-datavalue1").innerHTML = curData.li_sub_txt;
                    $("profile-datapoint2").innerHTML = curData.li_tag;
                    $("profile-datavalue2").innerHTML = " " + curData.li_value;

                    $("name-title").setAttribute("title", curData.li_title);
                    $("data-title1").setAttribute("title", curData.li_sub_txt);
                    $("data-title2").setAttribute("title", curData.li_value + " " + curData.li_tag);
                }
            }
            /***************************END OF DYNAMIC DATA*******************************/
        } catch (e) {
            console.log('Error in displaying widget Data');
            // console.log(e);
        }
        if(wideWidget){
          fireResize();
        }
    }
    /**************************Display Widget Data END******************/


    /********************** SETUP CATEGORY COLORS **********************
     * @function setCategoryColors
     * dynamically set the colors of the css Rules for each of the partners
     *
     * @param function category - sets the base category for colors that are stored in the global ./css/inheritor/inheritor.css
     */
    function setCategoryColors(category) {
        var color;
        switch (category) {
            case 'football':
            case 'nfl':
            case 'ncaaf':
            case 'nflncaaf':
                category = 'football';
                break;
            case 'basketball':
            case 'nba':
            case 'ncaam':
            case 'college_basketball':
                category = 'basketball';
                break;
            case 'baseball':
            case 'mlb':
                category = 'baseball';
                break;
            case "realestate":
            case "disaster":
            case "demographics":
            case "crime":
            case "weather":
            case "politics":
                category = 'realestate';
                break;
            case "finance":
            case "money":
                category = 'finance';
                break;
            case "entertainment":
            case "celebrities":
            case "actor":
            case "musician":
            case "director":
                category = 'entertainment';
                break;
            default:
                category = 'default';
                break;
        }
        var atomicClass = friendlyIframeWindow.document.getElementsByClassName("widget_ad")[0];
        atomicClass.id = wideWidget ? category + '-wide' : category;

    }

    /************************ Date Formatter ************************
     * @function dateFormat
     * date format that is used to return the date format in a readable state
     *
     * @param function (Number) everything comes in as the number
     *       weekdayNum - display the week day names
     *       dayNum - display the day number
     *       monthNum - takes month number and display the name
     *       yearNum - displays year
     */
    function dateFormat(weekdayNum, dayNum, monthNum, yearNum) {
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        var formatedDate = {
            weekday: dayNames[weekdayNum],
            day: dayNum,
            month: monthNames[monthNum],
            year: yearNum,
        };
        return formatedDate;
    }

    /***************************** CHECK IMAGE ****************************
     * @function checkImage
     * checks if the image is a placement and replace and change the look of the widget
     *
     * @param function image - tosses in image to be check to be replaced with proper stock photo for the specific category
     */
    function checkImage(image) {
        var imageReturn;
        var showCover;
        var fallbackImg;
        var imageWidth = wideWidget ? 690 : 300; //determine which quality widget to use based on if the wide widget is in view
        // $("mainimg").setAttribute('src', '');

        //Swtich statement to return fallback images for each vertical default = images.synapsys.us/01/fallback/stock/2017/03/finance_stock.jpg
        switch (subCategory) {
            case "football":
            case "nfl":
            case "ncaaf":
            case "nflncaaf":
                fallbackImg = "football_stock.jpg";
                break;
            case 'basketball':
            case "nba":
            case 'ncaam':
            case "college_basketball":
                fallbackImg = "basketball_stock.jpg";
                break;
            case "finance":
                fallbackImg = "finance_stock.jpg";
                break;
            case "mlb":
                fallbackImg = "baseball_stock.jpg";
                break;
            case "realestate":
            case "disaster":
            case "demographics":
            case "crime":
            case "weather":
            case "politics":
                fallbackImg = "real_estate_stock.jpg";
                break;
            case "celebrities":
            case "actor":
            case "musician":
            case "director":
                fallbackImg = "actor.jpg";
                break;
            default:
                fallbackImg = "failback.jpg";
        }
        //prep return
        //use global flag for wideWidget (if wide widget is being used then all images are to be returned as fallback stock images)
        if (image != null &&
            image.indexOf('no-image') == -1 &&
            image.indexOf('no_image') == -1 &&
            image.indexOf('no_player') == -1 &&
            image.indexOf('fallback') == -1 &&
            window.location.pathname.indexOf('_970') == -1 &&
            !wideWidget
        ) {
            imageReturn = image + "?width=" + (imageWidth * window.devicePixelRatio);
            showCover = false;
        } else {
            showCover = true;
            //make sure there is a fallback image
            if (subCategory == "celebrities") {
                imageReturn = imageUrl + "/01/fallback/stock/2017/04/" + fallbackImg;
            } else {
                imageReturn = imageUrl + "/01/fallback/stock/2017/03/" + fallbackImg;
            }
            //sets flag for image api to send back image with set size based on devicePixelRatio
            imageReturn += "?width=" + (imageWidth * window.devicePixelRatio);
        }

        //when mainimg was an <img> tag
        // $("mainimg").setAttribute('onerror', "this.src='"+imageUrl + "/01/fallback/stock/2017/03/" + fallbackImg + "?width=" + (300 * window.devicePixelRatio)+"'" ); //SETS ON ERROR IMAGE

        //USED to display background color of category if a fallback image is sent back
        var imageBackground = document.getElementsByClassName('e_image-cover');
        for (var j = 0; j < imageBackground.length; j++) {
            if (showCover) {
                $("e_image-shader").style.display = "none";
                imageBackground[j].style.display = 'block';
            } else {
                $("e_image-shader").style.display = "block";
                imageBackground[j].style.display = 'none';
            }
        }
        return imageReturn;
    }

    /**
     * Send a post message to every window up to the top window
     * @param  {Object}  postObject The object to send as a postMessage
     * @param  {Integer} maxLoops   The maximum number of layers to traverse up
     */
    function sendPostMessageToIgloo(postObject, maxLoops) {
        // Initialize variables
        var postWindows = [window];
        var currentWindow = window;
        var currentLoop = 0;
        maxLoops = typeof maxLoops === 'undefined' ? 10 : maxLoops;
        // Build all of the windows to send the message to
        try {
            // Loop through all of the windows
            while (currentLoop++ < maxLoops && currentWindow !== window.top) {
                // Add to the postMessage array
                postWindows.push(currentWindow);
                // Move up a layer
                currentWindow = currentWindow.parent;
            }
        } catch (e) {}

        // Send the post messages
        for (var i = 0; i < postWindows.length; i++) {
            postWindows[i].postMessage(postObject, '*');
        }
    }
}

/**
 * Manually fires off the window resize event
 */
function fireResize(){
    if (document.createEvent) {
        var ev = document.createEvent('Event');
        ev.initEvent('resize', true, true);
        window.dispatchEvent(ev);
    }
    else { // IE
        element=document.documentElement;
        var event=document.createEventObject();
        element.fireEvent("onresize",event);
    }
};

//Initial load Waits for the DOMContent to load
if (document.readyState == "complete") { // if page is already loaded, fire centipede
    dwlinked();
} else { // else fire centipede once page has finished loading, so as not to slowdown the page load at all
    document.onreadystatechange = function() {
        if (document.readyState == "complete") {
            dwlinked();
        }
    }
}

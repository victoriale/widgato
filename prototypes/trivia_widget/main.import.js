var htmlFile = '<!Doctype html><html><head><title>Trivia Widget</title><meta name=\'viewport\' content=\'initial-scale=1\'><link rel=\'shortcut icon\' href=\'\'><meta charset=\'UTF-8\'><meta name=\'theme-color\' content=\'#2d3e50 \'><meta http-equiv=\'Content-Language\' content=\'en\'></head><body><section class=\'widget_container\' id=\'snt_trivia_game\'><div id=\'completed_overlay\' class=\'hidden\'><div class=\'results_container\'><p class=\'comment heavy\' id=\'score_comment\'></p><div class=\'score_container\'><div class=\'icon\'><img class=\'check_mark\' src=\'./images/icon-check-mark-blue.svg\' alt=\'check mark icon\'></div><div class=\'score\'><p>You Got</p><p class=\'results\'><span id=\'user_score\' class=\'heavy\'></span> <span>/</span> <span id=\'total_questions\'></span></p></div><p class=\'restart light\' id=\'restart\' onclick=\'restartFn\'><i aria-hidden=\'true\'></i> <span class=\'try_again\'>Try Again</span></p></div></div><div class=\'other_content_container\'><span class=\'other_content_title light\' id=\'show_others\'>Other Celebrity Trivia You May Love:</span><ul class=\'other_content_options_container\'><li class=\'other_content_option_container\' id=\'\'><div class=\'animation_container\'><div class=\'animation_container-box\'><p>{CATEGORY}</p><p>TRIVIA</p></div></div></li><li class=\'other_content_option_container\' id=\'\'><div class=\'animation_container\'><div class=\'animation_container-box\'><p>{CATEGORY}</p><p>TRIVIA</p></div></div></li><li class=\'other_content_option_container\' id=\'\'><div class=\'animation_container\'><div class=\'animation_container-box\'><p>{CATEGORY}</p><p>TRIVIA</p></div></div></li><li class=\'other_content_option_container random_option hidden\' id=\'\'><div class=\'animation_container\'><i class=\'fa fa-random blue\' aria-hidden=\'true\'></i><div class=\'animation_container-box\'><p>RANDOM</p><p>TRIVIA</p></div></div></li></ul></div></div><div id=\'trivia_container\'><div id=\'interval_score_container\'><span id=\'interval_score_question\'></span> <span id=\'interval_score\'></span></div><div id=\'submission_overlay\'><div class=\'submission_display_container\'><div class=\'submission_result_text_container\'><div class=\'check_mark_container\'><img class=\'check_mark\' src=\'./images/icon-check-mark.svg\' alt=\'check mark icon\'> <img class=\'x\' src=\'./images/icon-incorrect.svg\' alt=\'incorrect icon\'></div><p class=\'submission_display heavy\'></p></div></div><div id=\'submission_overlay_image\'></div></div><div class=\'trivia_image_container\'><div id=\'progress_bar\'></div><div class=\'trivia_image_overlay\'><div class=\'trivia_image\' id=\'pixelateContainer\'><div class=\'trivia_image_background\'></div></div></div><div class=\'trivia_question\'><p class=\'heavy\'>In what year did Adele win a "Grammy Album of the Year" for the album 25?</p></div></div><div class=\'trivia_options_container\'><ul class=\'trivia_options\'></ul><div class=\'trivia_options_container_info\'><div class=\'left\'><p class=\'light\'><span>Question</span> <span class=\'acive_question heavy\' id=\'active_question\'>1</span>/ <span class=\'total_questions\'>10</span></p></div><div class=\'right\'><p class=\'light blue\' id=\'skip_question\'><span>Skip Question</span> <i class=\'fa fa-arrow-right\' aria-hidden=\'true\'></i></p></div></div></div><div class=\'submission_info_container\'><p class=\'submission_info heavy\' id=\'correct_result_display\'></p><div class=\'submission_analytics_container\'><div class=\'submission_analytics_title_container\'><p class=\'submission_analytics_title border heavy\'><i class=\'fa fa-bar-chart ltblue\' aria-hidden=\'true\'></i> <span class=\'heavy\'>Analytics</span></p></div><div class=\'results_charts_container results_left\'><div class=\'chart_container\'><div class=\'results_chart c100 small green\'><div class=\'\'><span class=\'results_chart_value heavy\'></span><div class=\'slice\'><div class=\'bar\'></div><div class=\'fill\'></div></div></div></div><div class=\'results_chart_label\'><i class=\'fa fa-check green\' aria-hidden=\'true\'></i> <span>Correct</span></div></div><div class=\'chart_container\'><div class=\'results_chart c100 small red\'><div class=\'\'><span class=\'results_chart_value heavy\'></span><div class=\'slice\'><div class=\'bar\'></div><div class=\'fill\'></div></div></div></div><div class=\'results_chart_label\'><i class=\'fa fa-times red\' aria-hidden=\'true\'></i> <span>Incorrect</span></div></div></div><div class=\'results_charts_container results_right\'><p class=\'results_charts_container_intro gray upperCase heavy\'>How you stack up:</p><p id=\'percentage_of_guess\'></p></div></div><div id=\'next_question\' class=\'button\'></div></div><div class=\'trivia_container_footer\'><img class=\'logo\' src=\'./images/snt_logo.svg\' alt=\'SNT Media logo\'><p>Powered by SNT Media, Inc.</p></div></div><div id=\'trivia_ad_zone\'><div id=\'ad_progress_bar\'></div></div></section><!-- <link href="//fonts.googleapis.com/css?family=Lato:300,400,900" rel="stylesheet"> --><!--<script src="./js/main.js"></script>--><!-- <script src="../analytics/payload_analytics.js" async></script> --></body></html>';
// var cssFile = '@font-face{font-family:Lato;font-style:normal;font-weight:300;src:local(\'Lato Light\'),local(\'Lato-Light\'),url(//fonts.gstatic.com/s/lato/v13/dPJ5r9gl3kK6ijoeP1IRsvY6323mHUZFJMgTvxaG2iE.woff2) format(\'woff2\');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:300;src:local(\'Lato Light\'),local(\'Lato-Light\'),url(//fonts.gstatic.com/s/lato/v13/EsvMC5un3kjyUhB9ZEPPwg.woff2) format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215}@font-face{font-family:Lato;font-style:normal;font-weight:400;src:local(\'Lato Regular\'),local(\'Lato-Regular\'),url(//fonts.gstatic.com/s/lato/v13/UyBMtLsHKBKXelqf4x7VRQ.woff2) format(\'woff2\');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:400;src:local(\'Lato Regular\'),local(\'Lato-Regular\'),url(//fonts.gstatic.com/s/lato/v13/1YwB1sO8YE1Lyjf12WNiUA.woff2) format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215}@font-face{font-family:Lato;font-style:normal;font-weight:700;src:local(\'Lato Bold\'),local(\'Lato-Bold\'),url(//fonts.gstatic.com/s/lato/v13/ObQr5XYcoH0WBoUxiaYK3_Y6323mHUZFJMgTvxaG2iE.woff2) format(\'woff2\');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:700;src:local(\'Lato Bold\'),local(\'Lato-Bold\'),url(//fonts.gstatic.com/s/lato/v13/H2DMvhDLycM56KNuAtbJYA.woff2) format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215}@font-face{font-family:Lato;font-style:normal;font-weight:900;src:local(\'Lato Black\'),local(\'Lato-Black\'),url(//fonts.gstatic.com/s/lato/v13/R4a6fty3waPci7C44H8AjvY6323mHUZFJMgTvxaG2iE.woff2) format(\'woff2\');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:900;src:local(\'Lato Black\'),local(\'Lato-Black\'),url(//fonts.gstatic.com/s/lato/v13/tI4j516nok_GrVf4dhunkg.woff2) format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215}@font-face{font-family:FontAwesome;src:url(../fonts/fontawesome-webfont.eot?v=4.7.0);src:url(../fonts/fontawesome-webfont.eot?#iefix&v=4.7.0) format(\'embedded-opentype\'),url(../fonts/fontawesome-webfont.woff2?v=4.7.0) format(\'woff2\'),url(../fonts/fontawesome-webfont.woff?v=4.7.0) format(\'woff\'),url(../fonts/fontawesome-webfont.ttf?v=4.7.0) format(\'truetype\'),url(../fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular) format(\'svg\');font-weight:400;font-style:normal}.fa{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fa-lg{font-size:1.33333333em;line-height:.75em;vertical-align:-15%}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-fw{width:1.28571429em;text-align:center}.fa-ul{padding-left:0;margin-left:2.14285714em;list-style-type:none}.fa-ul>li{position:relative}.fa-li{position:absolute;left:-2.14285714em;width:2.14285714em;top:.14285714em;text-align:center}.fa-li.fa-lg{left:-1.85714286em}.fa-border{padding:.2em .25em .15em;border:solid .08em #eee;border-radius:.1em}.fa-pull-left{float:left}.fa-pull-right{float:right}.fa.fa-pull-left{margin-right:.3em}.fa.fa-pull-right{margin-left:.3em}.pull-right{float:right}.pull-left{float:left}.fa .pull-left{margin-right:.3em}.fa .pull-right{margin-left:.3em}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}.fa-pulse{-webkit-animation:fa-spin 1s infinite steps(8);animation:fa-spin 1s infinite steps(8)}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.fa-rotate-90{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-webkit-transform:scale(-1,1);transform:scale(-1,1)}.fa-flip-vertical{-webkit-transform:scale(1,-1);transform:scale(1,-1)}:root .fa-flip-horizontal,:root .fa-flip-vertical,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-rotate-90{-webkit-filter:none;filter:none}.fa-stack{position:relative;display:inline-block;width:2em;height:2em;line-height:2em;vertical-align:middle}.fa-stack-1x,.fa-stack-2x{position:absolute;left:0;width:100%;text-align:center}.fa-stack-1x{line-height:inherit}.fa-stack-2x{font-size:2em}.fa-inverse{color:#fff}.fa-glass:before{content:"\f000"}.fa-music:before{content:"\f001"}.fa-search:before{content:"\f002"}.fa-envelope-o:before{content:"\f003"}.fa-heart:before{content:"\f004"}.fa-star:before{content:"\f005"}.fa-star-o:before{content:"\f006"}.fa-user:before{content:"\f007"}.fa-film:before{content:"\f008"}.fa-th-large:before{content:"\f009"}.fa-th:before{content:"\f00a"}.fa-th-list:before{content:"\f00b"}.fa-check:before{content:"\f00c"}.fa-close:before,.fa-remove:before,.fa-times:before{content:"\f00d"}.fa-search-plus:before{content:"\f00e"}.fa-search-minus:before{content:"\f010"}.fa-power-off:before{content:"\f011"}.fa-signal:before{content:"\f012"}.fa-cog:before,.fa-gear:before{content:"\f013"}.fa-trash-o:before{content:"\f014"}.fa-home:before{content:"\f015"}.fa-file-o:before{content:"\f016"}.fa-clock-o:before{content:"\f017"}.fa-road:before{content:"\f018"}.fa-download:before{content:"\f019"}.fa-arrow-circle-o-down:before{content:"\f01a"}.fa-arrow-circle-o-up:before{content:"\f01b"}.fa-inbox:before{content:"\f01c"}.fa-play-circle-o:before{content:"\f01d"}.fa-repeat:before,.fa-rotate-right:before{content:"\f01e"}.fa-refresh:before{content:"\f021"}.fa-list-alt:before{content:"\f022"}.fa-lock:before{content:"\f023"}.fa-flag:before{content:"\f024"}.fa-headphones:before{content:"\f025"}.fa-volume-off:before{content:"\f026"}.fa-volume-down:before{content:"\f027"}.fa-volume-up:before{content:"\f028"}.fa-qrcode:before{content:"\f029"}.fa-barcode:before{content:"\f02a"}.fa-tag:before{content:"\f02b"}.fa-tags:before{content:"\f02c"}.fa-book:before{content:"\f02d"}.fa-bookmark:before{content:"\f02e"}.fa-print:before{content:"\f02f"}.fa-camera:before{content:"\f030"}.fa-font:before{content:"\f031"}.fa-bold:before{content:"\f032"}.fa-italic:before{content:"\f033"}.fa-text-height:before{content:"\f034"}.fa-text-width:before{content:"\f035"}.fa-align-left:before{content:"\f036"}.fa-align-center:before{content:"\f037"}.fa-align-right:before{content:"\f038"}.fa-align-justify:before{content:"\f039"}.fa-list:before{content:"\f03a"}.fa-dedent:before,.fa-outdent:before{content:"\f03b"}.fa-indent:before{content:"\f03c"}.fa-video-camera:before{content:"\f03d"}.fa-image:before,.fa-photo:before,.fa-picture-o:before{content:"\f03e"}.fa-pencil:before{content:"\f040"}.fa-map-marker:before{content:"\f041"}.fa-adjust:before{content:"\f042"}.fa-tint:before{content:"\f043"}.fa-edit:before,.fa-pencil-square-o:before{content:"\f044"}.fa-share-square-o:before{content:"\f045"}.fa-check-square-o:before{content:"\f046"}.fa-arrows:before{content:"\f047"}.fa-step-backward:before{content:"\f048"}.fa-fast-backward:before{content:"\f049"}.fa-backward:before{content:"\f04a"}.fa-play:before{content:"\f04b"}.fa-pause:before{content:"\f04c"}.fa-stop:before{content:"\f04d"}.fa-forward:before{content:"\f04e"}.fa-fast-forward:before{content:"\f050"}.fa-step-forward:before{content:"\f051"}.fa-eject:before{content:"\f052"}.fa-chevron-left:before{content:"\f053"}.fa-chevron-right:before{content:"\f054"}.fa-plus-circle:before{content:"\f055"}.fa-minus-circle:before{content:"\f056"}.fa-times-circle:before{content:"\f057"}.fa-check-circle:before{content:"\f058"}.fa-question-circle:before{content:"\f059"}.fa-info-circle:before{content:"\f05a"}.fa-crosshairs:before{content:"\f05b"}.fa-times-circle-o:before{content:"\f05c"}.fa-check-circle-o:before{content:"\f05d"}.fa-ban:before{content:"\f05e"}.fa-arrow-left:before{content:"\f060"}.fa-arrow-right:before{content:"\f061"}.fa-arrow-up:before{content:"\f062"}.fa-arrow-down:before{content:"\f063"}.fa-mail-forward:before,.fa-share:before{content:"\f064"}.fa-expand:before{content:"\f065"}.fa-compress:before{content:"\f066"}.fa-plus:before{content:"\f067"}.fa-minus:before{content:"\f068"}.fa-asterisk:before{content:"\f069"}.fa-exclamation-circle:before{content:"\f06a"}.fa-gift:before{content:"\f06b"}.fa-leaf:before{content:"\f06c"}.fa-fire:before{content:"\f06d"}.fa-eye:before{content:"\f06e"}.fa-eye-slash:before{content:"\f070"}.fa-exclamation-triangle:before,.fa-warning:before{content:"\f071"}.fa-plane:before{content:"\f072"}.fa-calendar:before{content:"\f073"}.fa-random:before{content:"\f074"}.fa-comment:before{content:"\f075"}.fa-magnet:before{content:"\f076"}.fa-chevron-up:before{content:"\f077"}.fa-chevron-down:before{content:"\f078"}.fa-retweet:before{content:"\f079"}.fa-shopping-cart:before{content:"\f07a"}.fa-folder:before{content:"\f07b"}.fa-folder-open:before{content:"\f07c"}.fa-arrows-v:before{content:"\f07d"}.fa-arrows-h:before{content:"\f07e"}.fa-bar-chart-o:before,.fa-bar-chart:before{content:"\f080"}.fa-twitter-square:before{content:"\f081"}.fa-facebook-square:before{content:"\f082"}.fa-camera-retro:before{content:"\f083"}.fa-key:before{content:"\f084"}.fa-cogs:before,.fa-gears:before{content:"\f085"}.fa-comments:before{content:"\f086"}.fa-thumbs-o-up:before{content:"\f087"}.fa-thumbs-o-down:before{content:"\f088"}.fa-star-half:before{content:"\f089"}.fa-heart-o:before{content:"\f08a"}.fa-sign-out:before{content:"\f08b"}.fa-linkedin-square:before{content:"\f08c"}.fa-thumb-tack:before{content:"\f08d"}.fa-external-link:before{content:"\f08e"}.fa-sign-in:before{content:"\f090"}.fa-trophy:before{content:"\f091"}.fa-github-square:before{content:"\f092"}.fa-upload:before{content:"\f093"}.fa-lemon-o:before{content:"\f094"}.fa-phone:before{content:"\f095"}.fa-square-o:before{content:"\f096"}.fa-bookmark-o:before{content:"\f097"}.fa-phone-square:before{content:"\f098"}.fa-twitter:before{content:"\f099"}.fa-facebook-f:before,.fa-facebook:before{content:"\f09a"}.fa-github:before{content:"\f09b"}.fa-unlock:before{content:"\f09c"}.fa-credit-card:before{content:"\f09d"}.fa-feed:before,.fa-rss:before{content:"\f09e"}.fa-hdd-o:before{content:"\f0a0"}.fa-bullhorn:before{content:"\f0a1"}.fa-bell:before{content:"\f0f3"}.fa-certificate:before{content:"\f0a3"}.fa-hand-o-right:before{content:"\f0a4"}.fa-hand-o-left:before{content:"\f0a5"}.fa-hand-o-up:before{content:"\f0a6"}.fa-hand-o-down:before{content:"\f0a7"}.fa-arrow-circle-left:before{content:"\f0a8"}.fa-arrow-circle-right:before{content:"\f0a9"}.fa-arrow-circle-up:before{content:"\f0aa"}.fa-arrow-circle-down:before{content:"\f0ab"}.fa-globe:before{content:"\f0ac"}.fa-wrench:before{content:"\f0ad"}.fa-tasks:before{content:"\f0ae"}.fa-filter:before{content:"\f0b0"}.fa-briefcase:before{content:"\f0b1"}.fa-arrows-alt:before{content:"\f0b2"}.fa-group:before,.fa-users:before{content:"\f0c0"}.fa-chain:before,.fa-link:before{content:"\f0c1"}.fa-cloud:before{content:"\f0c2"}.fa-flask:before{content:"\f0c3"}.fa-cut:before,.fa-scissors:before{content:"\f0c4"}.fa-copy:before,.fa-files-o:before{content:"\f0c5"}.fa-paperclip:before{content:"\f0c6"}.fa-floppy-o:before,.fa-save:before{content:"\f0c7"}.fa-square:before{content:"\f0c8"}.fa-bars:before,.fa-navicon:before,.fa-reorder:before{content:"\f0c9"}.fa-list-ul:before{content:"\f0ca"}.fa-list-ol:before{content:"\f0cb"}.fa-strikethrough:before{content:"\f0cc"}.fa-underline:before{content:"\f0cd"}.fa-table:before{content:"\f0ce"}.fa-magic:before{content:"\f0d0"}.fa-truck:before{content:"\f0d1"}.fa-pinterest:before{content:"\f0d2"}.fa-pinterest-square:before{content:"\f0d3"}.fa-google-plus-square:before{content:"\f0d4"}.fa-google-plus:before{content:"\f0d5"}.fa-money:before{content:"\f0d6"}.fa-caret-down:before{content:"\f0d7"}.fa-caret-up:before{content:"\f0d8"}.fa-caret-left:before{content:"\f0d9"}.fa-caret-right:before{content:"\f0da"}.fa-columns:before{content:"\f0db"}.fa-sort:before,.fa-unsorted:before{content:"\f0dc"}.fa-sort-desc:before,.fa-sort-down:before{content:"\f0dd"}.fa-sort-asc:before,.fa-sort-up:before{content:"\f0de"}.fa-envelope:before{content:"\f0e0"}.fa-linkedin:before{content:"\f0e1"}.fa-rotate-left:before,.fa-undo:before{content:"\f0e2"}.fa-gavel:before,.fa-legal:before{content:"\f0e3"}.fa-dashboard:before,.fa-tachometer:before{content:"\f0e4"}.fa-comment-o:before{content:"\f0e5"}.fa-comments-o:before{content:"\f0e6"}.fa-bolt:before,.fa-flash:before{content:"\f0e7"}.fa-sitemap:before{content:"\f0e8"}.fa-umbrella:before{content:"\f0e9"}.fa-clipboard:before,.fa-paste:before{content:"\f0ea"}.fa-lightbulb-o:before{content:"\f0eb"}.fa-exchange:before{content:"\f0ec"}.fa-cloud-download:before{content:"\f0ed"}.fa-cloud-upload:before{content:"\f0ee"}.fa-user-md:before{content:"\f0f0"}.fa-stethoscope:before{content:"\f0f1"}.fa-suitcase:before{content:"\f0f2"}.fa-bell-o:before{content:"\f0a2"}.fa-coffee:before{content:"\f0f4"}.fa-cutlery:before{content:"\f0f5"}.fa-file-text-o:before{content:"\f0f6"}.fa-building-o:before{content:"\f0f7"}.fa-hospital-o:before{content:"\f0f8"}.fa-ambulance:before{content:"\f0f9"}.fa-medkit:before{content:"\f0fa"}.fa-fighter-jet:before{content:"\f0fb"}.fa-beer:before{content:"\f0fc"}.fa-h-square:before{content:"\f0fd"}.fa-plus-square:before{content:"\f0fe"}.fa-angle-double-left:before{content:"\f100"}.fa-angle-double-right:before{content:"\f101"}.fa-angle-double-up:before{content:"\f102"}.fa-angle-double-down:before{content:"\f103"}.fa-angle-left:before{content:"\f104"}.fa-angle-right:before{content:"\f105"}.fa-angle-up:before{content:"\f106"}.fa-angle-down:before{content:"\f107"}.fa-desktop:before{content:"\f108"}.fa-laptop:before{content:"\f109"}.fa-tablet:before{content:"\f10a"}.fa-mobile-phone:before,.fa-mobile:before{content:"\f10b"}.fa-circle-o:before{content:"\f10c"}.fa-quote-left:before{content:"\f10d"}.fa-quote-right:before{content:"\f10e"}.fa-spinner:before{content:"\f110"}.fa-circle:before{content:"\f111"}.fa-mail-reply:before,.fa-reply:before{content:"\f112"}.fa-github-alt:before{content:"\f113"}.fa-folder-o:before{content:"\f114"}.fa-folder-open-o:before{content:"\f115"}.fa-smile-o:before{content:"\f118"}.fa-frown-o:before{content:"\f119"}.fa-meh-o:before{content:"\f11a"}.fa-gamepad:before{content:"\f11b"}.fa-keyboard-o:before{content:"\f11c"}.fa-flag-o:before{content:"\f11d"}.fa-flag-checkered:before{content:"\f11e"}.fa-terminal:before{content:"\f120"}.fa-code:before{content:"\f121"}.fa-mail-reply-all:before,.fa-reply-all:before{content:"\f122"}.fa-star-half-empty:before,.fa-star-half-full:before,.fa-star-half-o:before{content:"\f123"}.fa-location-arrow:before{content:"\f124"}.fa-crop:before{content:"\f125"}.fa-code-fork:before{content:"\f126"}.fa-chain-broken:before,.fa-unlink:before{content:"\f127"}.fa-question:before{content:"\f128"}.fa-info:before{content:"\f129"}.fa-exclamation:before{content:"\f12a"}.fa-superscript:before{content:"\f12b"}.fa-subscript:before{content:"\f12c"}.fa-eraser:before{content:"\f12d"}.fa-puzzle-piece:before{content:"\f12e"}.fa-microphone:before{content:"\f130"}.fa-microphone-slash:before{content:"\f131"}.fa-shield:before{content:"\f132"}.fa-calendar-o:before{content:"\f133"}.fa-fire-extinguisher:before{content:"\f134"}.fa-rocket:before{content:"\f135"}.fa-maxcdn:before{content:"\f136"}.fa-chevron-circle-left:before{content:"\f137"}.fa-chevron-circle-right:before{content:"\f138"}.fa-chevron-circle-up:before{content:"\f139"}.fa-chevron-circle-down:before{content:"\f13a"}.fa-html5:before{content:"\f13b"}.fa-css3:before{content:"\f13c"}.fa-anchor:before{content:"\f13d"}.fa-unlock-alt:before{content:"\f13e"}.fa-bullseye:before{content:"\f140"}.fa-ellipsis-h:before{content:"\f141"}.fa-ellipsis-v:before{content:"\f142"}.fa-rss-square:before{content:"\f143"}.fa-play-circle:before{content:"\f144"}.fa-ticket:before{content:"\f145"}.fa-minus-square:before{content:"\f146"}.fa-minus-square-o:before{content:"\f147"}.fa-level-up:before{content:"\f148"}.fa-level-down:before{content:"\f149"}.fa-check-square:before{content:"\f14a"}.fa-pencil-square:before{content:"\f14b"}.fa-external-link-square:before{content:"\f14c"}.fa-share-square:before{content:"\f14d"}.fa-compass:before{content:"\f14e"}.fa-caret-square-o-down:before,.fa-toggle-down:before{content:"\f150"}.fa-caret-square-o-up:before,.fa-toggle-up:before{content:"\f151"}.fa-caret-square-o-right:before,.fa-toggle-right:before{content:"\f152"}.fa-eur:before,.fa-euro:before{content:"\f153"}.fa-gbp:before{content:"\f154"}.fa-dollar:before,.fa-usd:before{content:"\f155"}.fa-inr:before,.fa-rupee:before{content:"\f156"}.fa-cny:before,.fa-jpy:before,.fa-rmb:before,.fa-yen:before{content:"\f157"}.fa-rouble:before,.fa-rub:before,.fa-ruble:before{content:"\f158"}.fa-krw:before,.fa-won:before{content:"\f159"}.fa-bitcoin:before,.fa-btc:before{content:"\f15a"}.fa-file:before{content:"\f15b"}.fa-file-text:before{content:"\f15c"}.fa-sort-alpha-asc:before{content:"\f15d"}.fa-sort-alpha-desc:before{content:"\f15e"}.fa-sort-amount-asc:before{content:"\f160"}.fa-sort-amount-desc:before{content:"\f161"}.fa-sort-numeric-asc:before{content:"\f162"}.fa-sort-numeric-desc:before{content:"\f163"}.fa-thumbs-up:before{content:"\f164"}.fa-thumbs-down:before{content:"\f165"}.fa-youtube-square:before{content:"\f166"}.fa-youtube:before{content:"\f167"}.fa-xing:before{content:"\f168"}.fa-xing-square:before{content:"\f169"}.fa-youtube-play:before{content:"\f16a"}.fa-dropbox:before{content:"\f16b"}.fa-stack-overflow:before{content:"\f16c"}.fa-instagram:before{content:"\f16d"}.fa-flickr:before{content:"\f16e"}.fa-adn:before{content:"\f170"}.fa-bitbucket:before{content:"\f171"}.fa-bitbucket-square:before{content:"\f172"}.fa-tumblr:before{content:"\f173"}.fa-tumblr-square:before{content:"\f174"}.fa-long-arrow-down:before{content:"\f175"}.fa-long-arrow-up:before{content:"\f176"}.fa-long-arrow-left:before{content:"\f177"}.fa-long-arrow-right:before{content:"\f178"}.fa-apple:before{content:"\f179"}.fa-windows:before{content:"\f17a"}.fa-android:before{content:"\f17b"}.fa-linux:before{content:"\f17c"}.fa-dribbble:before{content:"\f17d"}.fa-skype:before{content:"\f17e"}.fa-foursquare:before{content:"\f180"}.fa-trello:before{content:"\f181"}.fa-female:before{content:"\f182"}.fa-male:before{content:"\f183"}.fa-gittip:before,.fa-gratipay:before{content:"\f184"}.fa-sun-o:before{content:"\f185"}.fa-moon-o:before{content:"\f186"}.fa-archive:before{content:"\f187"}.fa-bug:before{content:"\f188"}.fa-vk:before{content:"\f189"}.fa-weibo:before{content:"\f18a"}.fa-renren:before{content:"\f18b"}.fa-pagelines:before{content:"\f18c"}.fa-stack-exchange:before{content:"\f18d"}.fa-arrow-circle-o-right:before{content:"\f18e"}.fa-arrow-circle-o-left:before{content:"\f190"}.fa-caret-square-o-left:before,.fa-toggle-left:before{content:"\f191"}.fa-dot-circle-o:before{content:"\f192"}.fa-wheelchair:before{content:"\f193"}.fa-vimeo-square:before{content:"\f194"}.fa-try:before,.fa-turkish-lira:before{content:"\f195"}.fa-plus-square-o:before{content:"\f196"}.fa-space-shuttle:before{content:"\f197"}.fa-slack:before{content:"\f198"}.fa-envelope-square:before{content:"\f199"}.fa-wordpress:before{content:"\f19a"}.fa-openid:before{content:"\f19b"}.fa-bank:before,.fa-institution:before,.fa-university:before{content:"\f19c"}.fa-graduation-cap:before,.fa-mortar-board:before{content:"\f19d"}.fa-yahoo:before{content:"\f19e"}.fa-google:before{content:"\f1a0"}.fa-reddit:before{content:"\f1a1"}.fa-reddit-square:before{content:"\f1a2"}.fa-stumbleupon-circle:before{content:"\f1a3"}.fa-stumbleupon:before{content:"\f1a4"}.fa-delicious:before{content:"\f1a5"}.fa-digg:before{content:"\f1a6"}.fa-pied-piper-pp:before{content:"\f1a7"}.fa-pied-piper-alt:before{content:"\f1a8"}.fa-drupal:before{content:"\f1a9"}.fa-joomla:before{content:"\f1aa"}.fa-language:before{content:"\f1ab"}.fa-fax:before{content:"\f1ac"}.fa-building:before{content:"\f1ad"}.fa-child:before{content:"\f1ae"}.fa-paw:before{content:"\f1b0"}.fa-spoon:before{content:"\f1b1"}.fa-cube:before{content:"\f1b2"}.fa-cubes:before{content:"\f1b3"}.fa-behance:before{content:"\f1b4"}.fa-behance-square:before{content:"\f1b5"}.fa-steam:before{content:"\f1b6"}.fa-steam-square:before{content:"\f1b7"}.fa-recycle:before{content:"\f1b8"}.fa-automobile:before,.fa-car:before{content:"\f1b9"}.fa-cab:before,.fa-taxi:before{content:"\f1ba"}.fa-tree:before{content:"\f1bb"}.fa-spotify:before{content:"\f1bc"}.fa-deviantart:before{content:"\f1bd"}.fa-soundcloud:before{content:"\f1be"}.fa-database:before{content:"\f1c0"}.fa-file-pdf-o:before{content:"\f1c1"}.fa-file-word-o:before{content:"\f1c2"}.fa-file-excel-o:before{content:"\f1c3"}.fa-file-powerpoint-o:before{content:"\f1c4"}.fa-file-image-o:before,.fa-file-photo-o:before,.fa-file-picture-o:before{content:"\f1c5"}.fa-file-archive-o:before,.fa-file-zip-o:before{content:"\f1c6"}.fa-file-audio-o:before,.fa-file-sound-o:before{content:"\f1c7"}.fa-file-movie-o:before,.fa-file-video-o:before{content:"\f1c8"}.fa-file-code-o:before{content:"\f1c9"}.fa-vine:before{content:"\f1ca"}.fa-codepen:before{content:"\f1cb"}.fa-jsfiddle:before{content:"\f1cc"}.fa-life-bouy:before,.fa-life-buoy:before,.fa-life-ring:before,.fa-life-saver:before,.fa-support:before{content:"\f1cd"}.fa-circle-o-notch:before{content:"\f1ce"}.fa-ra:before,.fa-rebel:before,.fa-resistance:before{content:"\f1d0"}.fa-empire:before,.fa-ge:before{content:"\f1d1"}.fa-git-square:before{content:"\f1d2"}.fa-git:before{content:"\f1d3"}.fa-hacker-news:before,.fa-y-combinator-square:before,.fa-yc-square:before{content:"\f1d4"}.fa-tencent-weibo:before{content:"\f1d5"}.fa-qq:before{content:"\f1d6"}.fa-wechat:before,.fa-weixin:before{content:"\f1d7"}.fa-paper-plane:before,.fa-send:before{content:"\f1d8"}.fa-paper-plane-o:before,.fa-send-o:before{content:"\f1d9"}.fa-history:before{content:"\f1da"}.fa-circle-thin:before{content:"\f1db"}.fa-header:before{content:"\f1dc"}.fa-paragraph:before{content:"\f1dd"}.fa-sliders:before{content:"\f1de"}.fa-share-alt:before{content:"\f1e0"}.fa-share-alt-square:before{content:"\f1e1"}.fa-bomb:before{content:"\f1e2"}.fa-futbol-o:before,.fa-soccer-ball-o:before{content:"\f1e3"}.fa-tty:before{content:"\f1e4"}.fa-binoculars:before{content:"\f1e5"}.fa-plug:before{content:"\f1e6"}.fa-slideshare:before{content:"\f1e7"}.fa-twitch:before{content:"\f1e8"}.fa-yelp:before{content:"\f1e9"}.fa-newspaper-o:before{content:"\f1ea"}.fa-wifi:before{content:"\f1eb"}.fa-calculator:before{content:"\f1ec"}.fa-paypal:before{content:"\f1ed"}.fa-google-wallet:before{content:"\f1ee"}.fa-cc-visa:before{content:"\f1f0"}.fa-cc-mastercard:before{content:"\f1f1"}.fa-cc-discover:before{content:"\f1f2"}.fa-cc-amex:before{content:"\f1f3"}.fa-cc-paypal:before{content:"\f1f4"}.fa-cc-stripe:before{content:"\f1f5"}.fa-bell-slash:before{content:"\f1f6"}.fa-bell-slash-o:before{content:"\f1f7"}.fa-trash:before{content:"\f1f8"}.fa-copyright:before{content:"\f1f9"}.fa-at:before{content:"\f1fa"}.fa-eyedropper:before{content:"\f1fb"}.fa-paint-brush:before{content:"\f1fc"}.fa-birthday-cake:before{content:"\f1fd"}.fa-area-chart:before{content:"\f1fe"}.fa-pie-chart:before{content:"\f200"}.fa-line-chart:before{content:"\f201"}.fa-lastfm:before{content:"\f202"}.fa-lastfm-square:before{content:"\f203"}.fa-toggle-off:before{content:"\f204"}.fa-toggle-on:before{content:"\f205"}.fa-bicycle:before{content:"\f206"}.fa-bus:before{content:"\f207"}.fa-ioxhost:before{content:"\f208"}.fa-angellist:before{content:"\f209"}.fa-cc:before{content:"\f20a"}.fa-ils:before,.fa-shekel:before,.fa-sheqel:before{content:"\f20b"}.fa-meanpath:before{content:"\f20c"}.fa-buysellads:before{content:"\f20d"}.fa-connectdevelop:before{content:"\f20e"}.fa-dashcube:before{content:"\f210"}.fa-forumbee:before{content:"\f211"}.fa-leanpub:before{content:"\f212"}.fa-sellsy:before{content:"\f213"}.fa-shirtsinbulk:before{content:"\f214"}.fa-simplybuilt:before{content:"\f215"}.fa-skyatlas:before{content:"\f216"}.fa-cart-plus:before{content:"\f217"}.fa-cart-arrow-down:before{content:"\f218"}.fa-diamond:before{content:"\f219"}.fa-ship:before{content:"\f21a"}.fa-user-secret:before{content:"\f21b"}.fa-motorcycle:before{content:"\f21c"}.fa-street-view:before{content:"\f21d"}.fa-heartbeat:before{content:"\f21e"}.fa-venus:before{content:"\f221"}.fa-mars:before{content:"\f222"}.fa-mercury:before{content:"\f223"}.fa-intersex:before,.fa-transgender:before{content:"\f224"}.fa-transgender-alt:before{content:"\f225"}.fa-venus-double:before{content:"\f226"}.fa-mars-double:before{content:"\f227"}.fa-venus-mars:before{content:"\f228"}.fa-mars-stroke:before{content:"\f229"}.fa-mars-stroke-v:before{content:"\f22a"}.fa-mars-stroke-h:before{content:"\f22b"}.fa-neuter:before{content:"\f22c"}.fa-genderless:before{content:"\f22d"}.fa-facebook-official:before{content:"\f230"}.fa-pinterest-p:before{content:"\f231"}.fa-whatsapp:before{content:"\f232"}.fa-server:before{content:"\f233"}.fa-user-plus:before{content:"\f234"}.fa-user-times:before{content:"\f235"}.fa-bed:before,.fa-hotel:before{content:"\f236"}.fa-viacoin:before{content:"\f237"}.fa-train:before{content:"\f238"}.fa-subway:before{content:"\f239"}.fa-medium:before{content:"\f23a"}.fa-y-combinator:before,.fa-yc:before{content:"\f23b"}.fa-optin-monster:before{content:"\f23c"}.fa-opencart:before{content:"\f23d"}.fa-expeditedssl:before{content:"\f23e"}.fa-battery-4:before,.fa-battery-full:before,.fa-battery:before{content:"\f240"}.fa-battery-3:before,.fa-battery-three-quarters:before{content:"\f241"}.fa-battery-2:before,.fa-battery-half:before{content:"\f242"}.fa-battery-1:before,.fa-battery-quarter:before{content:"\f243"}.fa-battery-0:before,.fa-battery-empty:before{content:"\f244"}.fa-mouse-pointer:before{content:"\f245"}.fa-i-cursor:before{content:"\f246"}.fa-object-group:before{content:"\f247"}.fa-object-ungroup:before{content:"\f248"}.fa-sticky-note:before{content:"\f249"}.fa-sticky-note-o:before{content:"\f24a"}.fa-cc-jcb:before{content:"\f24b"}.fa-cc-diners-club:before{content:"\f24c"}.fa-clone:before{content:"\f24d"}.fa-balance-scale:before{content:"\f24e"}.fa-hourglass-o:before{content:"\f250"}.fa-hourglass-1:before,.fa-hourglass-start:before{content:"\f251"}.fa-hourglass-2:before,.fa-hourglass-half:before{content:"\f252"}.fa-hourglass-3:before,.fa-hourglass-end:before{content:"\f253"}.fa-hourglass:before{content:"\f254"}.fa-hand-grab-o:before,.fa-hand-rock-o:before{content:"\f255"}.fa-hand-paper-o:before,.fa-hand-stop-o:before{content:"\f256"}.fa-hand-scissors-o:before{content:"\f257"}.fa-hand-lizard-o:before{content:"\f258"}.fa-hand-spock-o:before{content:"\f259"}.fa-hand-pointer-o:before{content:"\f25a"}.fa-hand-peace-o:before{content:"\f25b"}.fa-trademark:before{content:"\f25c"}.fa-registered:before{content:"\f25d"}.fa-creative-commons:before{content:"\f25e"}.fa-gg:before{content:"\f260"}.fa-gg-circle:before{content:"\f261"}.fa-tripadvisor:before{content:"\f262"}.fa-odnoklassniki:before{content:"\f263"}.fa-odnoklassniki-square:before{content:"\f264"}.fa-get-pocket:before{content:"\f265"}.fa-wikipedia-w:before{content:"\f266"}.fa-safari:before{content:"\f267"}.fa-chrome:before{content:"\f268"}.fa-firefox:before{content:"\f269"}.fa-opera:before{content:"\f26a"}.fa-internet-explorer:before{content:"\f26b"}.fa-television:before,.fa-tv:before{content:"\f26c"}.fa-contao:before{content:"\f26d"}.fa-500px:before{content:"\f26e"}.fa-amazon:before{content:"\f270"}.fa-calendar-plus-o:before{content:"\f271"}.fa-calendar-minus-o:before{content:"\f272"}.fa-calendar-times-o:before{content:"\f273"}.fa-calendar-check-o:before{content:"\f274"}.fa-industry:before{content:"\f275"}.fa-map-pin:before{content:"\f276"}.fa-map-signs:before{content:"\f277"}.fa-map-o:before{content:"\f278"}.fa-map:before{content:"\f279"}.fa-commenting:before{content:"\f27a"}.fa-commenting-o:before{content:"\f27b"}.fa-houzz:before{content:"\f27c"}.fa-vimeo:before{content:"\f27d"}.fa-black-tie:before{content:"\f27e"}.fa-fonticons:before{content:"\f280"}.fa-reddit-alien:before{content:"\f281"}.fa-edge:before{content:"\f282"}.fa-credit-card-alt:before{content:"\f283"}.fa-codiepie:before{content:"\f284"}.fa-modx:before{content:"\f285"}.fa-fort-awesome:before{content:"\f286"}.fa-usb:before{content:"\f287"}.fa-product-hunt:before{content:"\f288"}.fa-mixcloud:before{content:"\f289"}.fa-scribd:before{content:"\f28a"}.fa-pause-circle:before{content:"\f28b"}.fa-pause-circle-o:before{content:"\f28c"}.fa-stop-circle:before{content:"\f28d"}.fa-stop-circle-o:before{content:"\f28e"}.fa-shopping-bag:before{content:"\f290"}.fa-shopping-basket:before{content:"\f291"}.fa-hashtag:before{content:"\f292"}.fa-bluetooth:before{content:"\f293"}.fa-bluetooth-b:before{content:"\f294"}.fa-percent:before{content:"\f295"}.fa-gitlab:before{content:"\f296"}.fa-wpbeginner:before{content:"\f297"}.fa-wpforms:before{content:"\f298"}.fa-envira:before{content:"\f299"}.fa-universal-access:before{content:"\f29a"}.fa-wheelchair-alt:before{content:"\f29b"}.fa-question-circle-o:before{content:"\f29c"}.fa-blind:before{content:"\f29d"}.fa-audio-description:before{content:"\f29e"}.fa-volume-control-phone:before{content:"\f2a0"}.fa-braille:before{content:"\f2a1"}.fa-assistive-listening-systems:before{content:"\f2a2"}.fa-american-sign-language-interpreting:before,.fa-asl-interpreting:before{content:"\f2a3"}.fa-deaf:before,.fa-deafness:before,.fa-hard-of-hearing:before{content:"\f2a4"}.fa-glide:before{content:"\f2a5"}.fa-glide-g:before{content:"\f2a6"}.fa-sign-language:before,.fa-signing:before{content:"\f2a7"}.fa-low-vision:before{content:"\f2a8"}.fa-viadeo:before{content:"\f2a9"}.fa-viadeo-square:before{content:"\f2aa"}.fa-snapchat:before{content:"\f2ab"}.fa-snapchat-ghost:before{content:"\f2ac"}.fa-snapchat-square:before{content:"\f2ad"}.fa-pied-piper:before{content:"\f2ae"}.fa-first-order:before{content:"\f2b0"}.fa-yoast:before{content:"\f2b1"}.fa-themeisle:before{content:"\f2b2"}.fa-google-plus-circle:before,.fa-google-plus-official:before{content:"\f2b3"}.fa-fa:before,.fa-font-awesome:before{content:"\f2b4"}.fa-handshake-o:before{content:"\f2b5"}.fa-envelope-open:before{content:"\f2b6"}.fa-envelope-open-o:before{content:"\f2b7"}.fa-linode:before{content:"\f2b8"}.fa-address-book:before{content:"\f2b9"}.fa-address-book-o:before{content:"\f2ba"}.fa-address-card:before,.fa-vcard:before{content:"\f2bb"}.fa-address-card-o:before,.fa-vcard-o:before{content:"\f2bc"}.fa-user-circle:before{content:"\f2bd"}.fa-user-circle-o:before{content:"\f2be"}.fa-user-o:before{content:"\f2c0"}.fa-id-badge:before{content:"\f2c1"}.fa-drivers-license:before,.fa-id-card:before{content:"\f2c2"}.fa-drivers-license-o:before,.fa-id-card-o:before{content:"\f2c3"}.fa-quora:before{content:"\f2c4"}.fa-free-code-camp:before{content:"\f2c5"}.fa-telegram:before{content:"\f2c6"}.fa-thermometer-4:before,.fa-thermometer-full:before,.fa-thermometer:before{content:"\f2c7"}.fa-thermometer-3:before,.fa-thermometer-three-quarters:before{content:"\f2c8"}.fa-thermometer-2:before,.fa-thermometer-half:before{content:"\f2c9"}.fa-thermometer-1:before,.fa-thermometer-quarter:before{content:"\f2ca"}.fa-thermometer-0:before,.fa-thermometer-empty:before{content:"\f2cb"}.fa-shower:before{content:"\f2cc"}.fa-bath:before,.fa-bathtub:before,.fa-s15:before{content:"\f2cd"}.fa-podcast:before{content:"\f2ce"}.fa-window-maximize:before{content:"\f2d0"}.fa-window-minimize:before{content:"\f2d1"}.fa-window-restore:before{content:"\f2d2"}.fa-times-rectangle:before,.fa-window-close:before{content:"\f2d3"}.fa-times-rectangle-o:before,.fa-window-close-o:before{content:"\f2d4"}.fa-bandcamp:before{content:"\f2d5"}.fa-grav:before{content:"\f2d6"}.fa-etsy:before{content:"\f2d7"}.fa-imdb:before{content:"\f2d8"}.fa-ravelry:before{content:"\f2d9"}.fa-eercast:before{content:"\f2da"}.fa-microchip:before{content:"\f2db"}.fa-snowflake-o:before{content:"\f2dc"}.fa-superpowers:before{content:"\f2dd"}.fa-wpexplorer:before{content:"\f2de"}.fa-meetup:before{content:"\f2e0"}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}canvas{image-rendering:optimizeSpeed;image-rendering:-moz-crisp-edges;image-rendering:-webkit-optimize-contrast;image-rendering:-o-crisp-edges;image-rendering:crisp-edges;-ms-interpolation-mode:nearest-neighbor}body,html{margin:0!important;font-family:Lato,sans-serif;height:auto;background:0 0}*{box-sizing:border-box}p{margin:0;padding:0;font-weight:400;font-size:12px}span{margin:0;padding:0;font-size:10px;font-weight:400}ul{margin:0;padding:0}ul li{list-style-type:none}.light{font-weight:200}.heavy{font-weight:800}.upperCase{text-transform:uppercase}.white{color:#fff}.red{color:#ed364c}.ltblue{color:#33c3ff}.blue{color:#3098ff}.green{color:#6ece1a}.pink{color:#fc70cf}.gray{color:#878787}.button{padding:10px;text-align:center;border-radius:25px;cursor:pointer}.widget_container{position:relative;overflow:hidden;width:300px;height:330px}.trivia_container_footer{position:absolute;z-index:6;width:100%;padding:0 4px 1px 4px;bottom:0;text-align:right;background:#f2f2f2}.trivia_container_footer img{display:inline-block;vertical-align:middle;margin-right:2px}.trivia_container_footer p{display:inline-block;vertical-align:middle;width:auto;font-size:10px;color:#666}#trivia_container{position:relative;width:300px;height:330px}#submission_overlay_image{visibility:visible}#trivia_container.correct_submission #submission_overlay,#trivia_container.incorrect_submission #submission_overlay{visibility:visible;opacity:1;overflow:hidden}#trivia_container.correct_submission #submission_overlay:before{position:absolute;content:\'\';opacity:.75;width:100%;height:100%;background:#429321;background:-webkit-linear-gradient(left,#429321 0,#b4ed50 100%);background:linear-gradient(to right,#429321 0,#b4ed50 100%)}#trivia_container.incorrect_submission #submission_overlay:before{position:absolute;content:\'\';opacity:.75;width:100%;height:100%;background:#9f031b;background:-webkit-linear-gradient(left,#9f031b 0,#f5515f 100%);background:linear-gradient(to right,#9f031b 0,#f5515f 100%)}#trivia_container.correct_submission #submission_overlay .submission_display_container,#trivia_container.incorrect_submission #submission_overlay .submission_display_container{visibility:visible;left:0}#submission_overlay{visibility:hidden;opacity:0;position:absolute;z-index:3;width:300px;height:169px;transition:all .5s ease-in-out;-webkit-transition:all .5s ease-in-out}.submission_display_container{position:absolute;visibility:hidden;width:100%;top:0;right:0;left:100%;bottom:0;margin:0 auto;text-align:center;-webkit-transition:left .25s ease-in-out 1s;transition:left .25s ease-in-out 1s}.submission_display_container.hidden{-webkit-transition:left 0s ease-in-out;transition:left 0s ease-in-out}.submission_result_text_container{position:absolute;height:75px;top:25px;right:0;left:0;text-align:center}.check_mark_container{position:relative;display:inline-block;width:75px;height:75px;margin-right:12px;border-radius:50%;background:#fff;vertical-align:middle}.check_mark_container .check_mark,.check_mark_container .x{display:none;position:absolute;right:0;left:0;margin:0 auto;font-size:30px;color:#4a4a4a;width:44px;height:32px;top:21px}#trivia_container.correct_submission .check_mark{display:block;width:53%;top:31%;height:40%}#trivia_container.incorrect_submission .x{display:block}p.submission_display{position:relative;display:inline-block;font-size:30px;text-align:center;text-transform:uppercase;color:#fff;vertical-align:middle}#next_question{width:278px;top:-46px;bottom:auto;z-index:3;border:1px solid #fff;position:absolute;right:0;left:0;margin:0 auto;font-size:12px;-webkit-transition:all .125s ease-in-out;transition:all .125s ease-in-out}#next_question p{color:#fff;font-size:14px;line-height:14px}#next_question:hover{background:#fff}#next_question:hover p{color:#444}#completed_overlay.hidden{visibility:hidden}#completed_overlay{visibility:visible;position:absolute;overflow:hidden;z-index:5;top:0;width:300px;height:320px;background:#9f031b;background:-webkit-linear-gradient(left,#3098ff 0,#34d4ff 100%);background:linear-gradient(to right,#3098ff 0,#34d4ff 100%)}.restart{position:absolute;top:-50px;right:10px}#completed_overlay .restart{padding-top:20px;color:#fff;font-size:12px;text-transform:uppercase;cursor:pointer}.restart i{position:absolute;margin-left:-17px;width:13px;height:12px;background-image:url(../images/icon-try-again.png);margin-right:2px;-webkit-transform:rotate(0);transform:rotate(0);-webkit-transition:transform .45s ease-in-out;-webkit-transition:-webkit-transform .45s ease-in-out;transition:-webkit-transform .45s ease-in-out;transition:transform .45s ease-in-out;transition:transform .45s ease-in-out,-webkit-transform .45s ease-in-out}.restart:hover i{-webkit-transform:rotate(360deg);transform:rotate(360deg)}.try_again{color:#fff;font-size:12px;text-transform:uppercase;cursor:pointer;line-height:12px;position:relative;bottom:2px}#completed_overlay.show .results_container{height:92px;border:none;opacity:1;text-align:center;clear:both;-webkit-transform:scale(1);transform:scale(1);-webkit-transition:all .2s ease-in-out;transition:all .5s ease-in-out}#completed_overlay.hidden .results_container{opacity:0;-webkit-transform:scale(1.65);transform:scale(1.65)}.results_container{position:relative;width:100%;top:40px;left:0;right:0}.results_container p.comment{font-size:32px;margin-bottom:5px;color:#fff;letter-spacing:2px;text-transform:uppercase}.score_container{overflow:hidden;text-align:center;margin-bottom:10px}.score_container .icon{position:relative;display:inline-block;height:40px;width:40px;border-radius:50%;vertical-align:middle;background:#fff}.score_container .icon .check_mark{position:absolute;right:0;left:0;margin:0 auto;font-size:20px;top:11px;height:17px;width:22px}.score_container .score{display:inline-block;vertical-align:middle;text-align:left;padding-left:10px}.score_container .score p{display:block;font-weight:300;font-size:16px;text-transform:uppercase;color:#fff}#completed_overlay .results_container .score_container .score p.results,#completed_overlay .results_container .score_container .score p.results span{font-size:24px;line-height:30px}#completed_overlay .results_container .share_container p{font-size:16px;color:#fff;text-transform:uppercase;margin-bottom:5px}li.sm_icon{position:relative;display:inline-block;height:35px;width:35px;margin:0 2px;border-radius:50%;border:1px solid #fff;cursor:pointer;-webkit-transition:all .125s ease-in-out;transition:all .125s ease-in-out}li.sm_icon i{color:#fff}li.sm_icon:hover{background:#fff}li.sm_icon:hover i{color:#3098ff}li.sm_icon i{position:absolute;top:8px;right:0;left:0;margin:0 auto}.other_content_container{position:relative;top:60px;width:100%;right:0;margin:0 auto;text-align:center}.other_content_options_container{position:relative;top:-5px}.other_content_container p{margin-bottom:5px;font-size:16px;color:#fff}.other_content_option_container{width:60px;height:60px;display:inline-block;margin:20px 4px;position:relative;color:#fff;border-radius:50%;cursor:pointer;background-size:cover;background-position:center;perspective:1000px;transform-style:preserve-3d}.other_content_option_container .animation_container{position:relative}.other_content_option_container .animation_container{position:absolute;width:60px;height:60px;top:0;left:0;border:1px solid #fff;border-radius:50%;background-size:cover;background-position:center center;-webkit-backface-visibility:hidden;backface-visibility:hidden;transform-style:preserve-3d}.other_content_option_container .animation_container,.other_content_option_container.random_option{z-index:2;transform:scale(1.75);opacity:0}#completed_overlay.show .other_content_option_container .animation_container,#completed_overlay.show .other_content_option_container.random_option{transform:scale(1);opacity:1}#completed_overlay.hidden .other_content_option_container .animation_container,#completed_overlay.hidden .other_content_option_container.random_option{transition:all 0s}.other_content_option_container:nth-child(1) .animation_container{-webkit-transition:all .25s ease-in-out .25s;transition:all .25s ease-in-out .25s}.other_content_option_container:nth-child(2) .animation_container{-webkit-transition:all .25s ease-in-out .25s;transition:all .25s ease-in-out .25s}.other_content_option_container:nth-child(3) .animation_container{-webkit-transition:all .25s ease-in-out .25s;transition:all .25s ease-in-out .25s}.other_content_option_container:nth-child(4).random_option .animation_container{-webkit-transition:all .25s ease-in-out .25s;transition:all .25s ease-in-out .25s}.other_content_title{font-size:16px;font-weight:300;color:#fff}.animation_container-box{position:absolute;top:65px;left:0;right:0}.animation_container-box p{font-size:8px;margin:0}.animation_container-box p:first-child{font-weight:800}.animation_container-box p:nth-child(2){font-weight:300}.other_content_option_container.random_option{-webkit-transition:opacity .5s ease-in-out .25s,transform .25s ease-in-out .25s,background .25s ease-in-out,color .25s ease-in-out;transition:opacity .5s ease-in-out .25s,transform .25s ease-in-out .25s,background .25s ease-in-out,color .25s ease-in-out}.other_content_option_container.random_option:hover{background:#fff}.other_content_option_container.random_option i{position:absolute;margin:0 auto;font-size:30px;top:0;left:15px;line-height:60px;color:#fff;transition:color .25s ease-in-out;-webkit-transition:color .25s ease-in-out}.other_content_option_container.random_option:hover i{color:#2eb5ff}.no_transition{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;transition:none!important}.trivia_image_container{width:300px;height:169px;position:relative;background-size:cover;background-position:top}.trivia_image_container::before{content:\'\';background:#000;opacity:.5}.trivia_image{position:absolute;z-index:1;height:100%;width:100%;background-size:cover;background-position:center center;transition:filter .25s ease-in-out;-webkit-transition:filter .25s ease-in-out;float:left}.trivia_image_overlay{overflow:hidden;width:100%;height:169px;position:absolute}.trivia_image_background{background-color:rgba(0,0,0,.45);position:absolute;top:0;left:0;width:100%;height:100%}#trivia_container.correct_submission .trivia_image,#trivia_container.incorrect_submission .trivia_image{-webkit-filter:grayscale(100%);filter:grayscale(100%)}#trivia_container.correct_submission .trivia_question,#trivia_container.incorrect_submission .trivia_question{display:none}#progress_bar{position:absolute;z-index:2;height:3px;background:#3098ff}#interval_score_container{position:absolute;z-index:2;top:5px;left:2px;background:#000;padding:1px;color:#fff;font-size:8px;text-transform:uppercase}#interval_score_container span{position:relative;font-size:8px}.trivia_question{width:280px;bottom:-20px;display:block;position:absolute;z-index:2;padding:10px;margin:0 auto;right:0;left:0;background:#fff;box-shadow:0 0 5px 0 rgba(0,0,0,.2);border:solid 1px #e1e1e1}.trivia_question p{width:100%;font-size:14px;text-align:center;color:#444;background:#fff}.trivia_options_container{position:relative;width:300px;height:144px;overflow:hidden;display:block;background:#fff;top:0;right:0}#trivia_container.correct_submission .trivia_options_container,#trivia_container.incorrect_submission .trivia_options_container{display:none}.trivia_options{margin:0;padding:18px 5px 0 5px;text-align:center;list-style-type:none}.trivia_options .button{opacity:1;visibility:visible;position:relative;float:left;width:135px;margin:5px;top:12px;height:34px;border:1px solid #3098ff;-webkit-transition:all .125s ease-in-out;transition:all .125s ease-in-out}.trivia_options .button.hidden{opacity:0;visibility:hidden}.trivia_options .button:before{opacity:0;content:\'\';position:absolute;top:0;left:0;width:100%;height:100%;border-radius:25px;background:-webkit-linear-gradient(left,#3098ff 0,#3098ff 0,#34d4ff 100%);background:linear-gradient(to right,#3098ff 0,#3098ff 0,#34d4ff 100%);-webkit-transition:all .125s ease-in-out;transition:all .125s ease-in-out}.trivia_options .button.incorrect:before{background:-webkit-linear-gradient(left,#ed364c 0,#ed364c 0,#ed364c 100%);background:linear-gradient(to right,#ed364c 0,#ed364c 0,#ed364c 100%);-webkit-transition:all .125s ease-in-out;transition:all .125s ease-in-out}.trivia_options .button:hover{border:1px solid #fff;cursor:pointer}.trivia_options .button:hover:before{opacity:1}.trivia_options .button:hover p{z-index:1;color:#fff}.trivia_options .button p{position:absolute;display:inline-block;padding:5px;right:0;left:0;top:50%;transform:translateY(-50%);font-size:14px;line-height:14px;color:#666}.trivia_options_container_info{width:300px;padding:15px 10px;overflow:auto;font-size:12px}.trivia_options_container_info .left{float:left;color:#999}.trivia_options_container_info .left i{margin-right:2px}.trivia_options_container_info .right{float:right}p#skip_question{cursor:pointer}p#skip_question:hover i{right:-2px}p#skip_question i{position:relative;right:0;-webkit-transition:right .125s ease-in-out;-webkit-transition:right .125s ease-in-out}.submission_info_container{visibility:hidden;display:block;position:absolute;padding:10px 10px 5px 10px;text-align:center;-webkit-transition:left .25s ease-in-out;transition:left .25s ease-in-out;width:300px;bottom:20px;height:141px;top:inherit;right:100%;z-index:4}p.submission_info{color:#444;position:relative;top:0;font-size:14px}.submission_analytics_container{position:absolute;right:0;left:0;margin:0 auto;text-align:center;top:63px;width:278px;height:70px;border:1px solid #e1e1e1;background-color:#fff}.results_left{position:absolute;left:10px;width:122px;height:55px}.results_right{position:absolute;border-left:1px solid #ccc;right:0;top:0;width:145px;height:49px;text-align:left;padding-left:9px}.submission_analytics_title_container{z-index:15}.submission_analytics_title{position:absolute;left:6px;top:-13px;padding:4px;text-transform:uppercase;background-color:#fff}.submission_analytics_title i{margin-right:2px}.results_charts_container{display:inline-block;margin:10px 0 5px 0;text-align:left;vertical-align:middle}.results_charts_container:nth-of-type(2){text-align:left;padding-left:3px}.results_charts_container:first-of-type{border-right:1px solid #ccc}.results_charts_container_intro{font-size:10px;margin-bottom:5px}#percentage_of_guess{font-size:9px}.chart_container{position:relative;display:inline-block;text-align:center}.chart_container:first-of-type{left:-3px}.chart_container:last-of-type{right:-6px}.results_chart{display:block;position:relative;height:1em;width:1em;margin:0 auto 2px auto;border-radius:50%}.results_chart .slice{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.results_chart.green .slice{-webkit-transition:transform .125s ease-in-out .25s;-webkit-transition:-webkit-transform .125s ease-in-out .25s;transition:-webkit-transform .125s ease-in-out .25s;transition:transform .125s ease-in-out .25s;transition:transform .125s ease-in-out .25s,-webkit-transform .125s ease-in-out .25s}.results_chart.red .slice{-webkit-transition:transform .125s ease-in-out .35s;-webkit-transition:-webkit-transform .125s ease-in-out .35s;transition:-webkit-transform .125s ease-in-out .35s;transition:transform .125s ease-in-out .35s;transition:transform .125s ease-in-out .35s,-webkit-transform .125s ease-in-out .35s}.results_chart.blue .slice{-webkit-transition:transform .125s ease-in-out .45s;-webkit-transition:-webkit-transform .125s ease-in-out .45s;transition:-webkit-transform .125s ease-in-out .45s;transition:transform .125s ease-in-out .45s;transition:transform .125s ease-in-out .45s,-webkit-transform .125s ease-in-out .45s}.results_chart.pink .slice{-webkit-transition:transform .125s ease-in-out .55s;-webkit-transition:-webkit-transform .125s ease-in-out .55s;transition:-webkit-transform .125s ease-in-out .55s;transition:transform .125s ease-in-out .55s;transition:transform .125s ease-in-out .55s,-webkit-transform .125s ease-in-out .55s}#trivia_container.correct_submission .slice,#trivia_container.incorrect_submission .slice{-webkit-transform:rotate(0);transform:rotate(0)}.results_chart_label{display:block;font-size:10px;color:#999;position:relative;left:-3px}.results_chart_label span{font-size:10px;margin-left:2px}#trivia_container.correct_submission .submission_info_container,#trivia_container.incorrect_submission .submission_info_container{visibility:visible;right:0}.c100 .p100 .slice,.c100 .p51 .slice,.c100 .p52 .slice,.c100 .p53 .slice,.c100 .p54 .slice,.c100 .p55 .slice,.c100 .p56 .slice,.c100 .p57 .slice,.c100 .p58 .slice,.c100 .p59 .slice,.c100 .p60 .slice,.c100 .p61 .slice,.c100 .p62 .slice,.c100 .p63 .slice,.c100 .p64 .slice,.c100 .p65 .slice,.c100 .p66 .slice,.c100 .p67 .slice,.c100 .p68 .slice,.c100 .p69 .slice,.c100 .p70 .slice,.c100 .p71 .slice,.c100 .p72 .slice,.c100 .p73 .slice,.c100 .p74 .slice,.c100 .p75 .slice,.c100 .p76 .slice,.c100 .p77 .slice,.c100 .p78 .slice,.c100 .p79 .slice,.c100 .p80 .slice,.c100 .p81 .slice,.c100 .p82 .slice,.c100 .p83 .slice,.c100 .p84 .slice,.c100 .p85 .slice,.c100 .p86 .slice,.c100 .p87 .slice,.c100 .p88 .slice,.c100 .p89 .slice,.c100 .p90 .slice,.c100 .p91 .slice,.c100 .p92 .slice,.c100 .p93 .slice,.c100 .p94 .slice,.c100 .p95 .slice,.c100 .p96 .slice,.c100 .p97 .slice,.c100 .p98 .slice,.c100 .p99 .slice,.rect-auto{clip:rect(auto,auto,auto,auto)}.c100 .bar,.c100 .p100 .fill,.c100 .p51 .fill,.c100 .p52 .fill,.c100 .p53 .fill,.c100 .p54 .fill,.c100 .p55 .fill,.c100 .p56 .fill,.c100 .p57 .fill,.c100 .p58 .fill,.c100 .p59 .fill,.c100 .p60 .fill,.c100 .p61 .fill,.c100 .p62 .fill,.c100 .p63 .fill,.c100 .p64 .fill,.c100 .p65 .fill,.c100 .p66 .fill,.c100 .p67 .fill,.c100 .p68 .fill,.c100 .p69 .fill,.c100 .p70 .fill,.c100 .p71 .fill,.c100 .p72 .fill,.c100 .p73 .fill,.c100 .p74 .fill,.c100 .p75 .fill,.c100 .p76 .fill,.c100 .p77 .fill,.c100 .p78 .fill,.c100 .p79 .fill,.c100 .p80 .fill,.c100 .p81 .fill,.c100 .p82 .fill,.c100 .p83 .fill,.c100 .p84 .fill,.c100 .p85 .fill,.c100 .p86 .fill,.c100 .p87 .fill,.c100 .p88 .fill,.c100 .p89 .fill,.c100 .p90 .fill,.c100 .p91 .fill,.c100 .p92 .fill,.c100 .p93 .fill,.c100 .p94 .fill,.c100 .p95 .fill,.c100 .p96 .fill,.c100 .p97 .fill,.c100 .p98 .fill,.c100 .p99 .fill,.pie{position:absolute;border:.08em solid #307bbb;width:.84em;height:.84em;clip:rect(0,.5em,1em,0);border-radius:50%;-webkit-transform:rotate(0);transform:rotate(0)}.c100 .p100 .bar:after,.c100 .p100 .fill,.c100 .p51 .bar:after,.c100 .p51 .fill,.c100 .p52 .bar:after,.c100 .p52 .fill,.c100 .p53 .bar:after,.c100 .p53 .fill,.c100 .p54 .bar:after,.c100 .p54 .fill,.c100 .p55 .bar:after,.c100 .p55 .fill,.c100 .p56 .bar:after,.c100 .p56 .fill,.c100 .p57 .bar:after,.c100 .p57 .fill,.c100 .p58 .bar:after,.c100 .p58 .fill,.c100 .p59 .bar:after,.c100 .p59 .fill,.c100 .p60 .bar:after,.c100 .p60 .fill,.c100 .p61 .bar:after,.c100 .p61 .fill,.c100 .p62 .bar:after,.c100 .p62 .fill,.c100 .p63 .bar:after,.c100 .p63 .fill,.c100 .p64 .bar:after,.c100 .p64 .fill,.c100 .p65 .bar:after,.c100 .p65 .fill,.c100 .p66 .bar:after,.c100 .p66 .fill,.c100 .p67 .bar:after,.c100 .p67 .fill,.c100 .p68 .bar:after,.c100 .p68 .fill,.c100 .p69 .bar:after,.c100 .p69 .fill,.c100 .p70 .bar:after,.c100 .p70 .fill,.c100 .p71 .bar:after,.c100 .p71 .fill,.c100 .p72 .bar:after,.c100 .p72 .fill,.c100 .p73 .bar:after,.c100 .p73 .fill,.c100 .p74 .bar:after,.c100 .p74 .fill,.c100 .p75 .bar:after,.c100 .p75 .fill,.c100 .p76 .bar:after,.c100 .p76 .fill,.c100 .p77 .bar:after,.c100 .p77 .fill,.c100 .p78 .bar:after,.c100 .p78 .fill,.c100 .p79 .bar:after,.c100 .p79 .fill,.c100 .p80 .bar:after,.c100 .p80 .fill,.c100 .p81 .bar:after,.c100 .p81 .fill,.c100 .p82 .bar:after,.c100 .p82 .fill,.c100 .p83 .bar:after,.c100 .p83 .fill,.c100 .p84 .bar:after,.c100 .p84 .fill,.c100 .p85 .bar:after,.c100 .p85 .fill,.c100 .p86 .bar:after,.c100 .p86 .fill,.c100 .p87 .bar:after,.c100 .p87 .fill,.c100 .p88 .bar:after,.c100 .p88 .fill,.c100 .p89 .bar:after,.c100 .p89 .fill,.c100 .p90 .bar:after,.c100 .p90 .fill,.c100 .p91 .bar:after,.c100 .p91 .fill,.c100 .p92 .bar:after,.c100 .p92 .fill,.c100 .p93 .bar:after,.c100 .p93 .fill,.c100 .p94 .bar:after,.c100 .p94 .fill,.c100 .p95 .bar:after,.c100 .p95 .fill,.c100 .p96 .bar:after,.c100 .p96 .fill,.c100 .p97 .bar:after,.c100 .p97 .fill,.c100 .p98 .bar:after,.c100 .p98 .fill,.c100 .p99 .bar:after,.c100 .p99 .fill,.pie-fill{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.c100{position:relative;font-size:120px;border-radius:50%;background-color:transparent;box-shadow:inset 0 0 0 2px #ccc}.c100 *,.c100 :after,.c100 :before{box-sizing:content-box}.c100.center{float:none;margin:0 auto}.c100.big{font-size:240px}.c100.small{font-size:40px}span.results_chart_value{position:absolute;width:100%;z-index:1;right:0;left:0;top:13px;margin:0 auto;font-size:10px;color:#4a4a4a;text-align:center}.c100:after{position:absolute;top:.075em;left:.075em;right:.075em;bottom:.075em;display:block;content:" ";border-radius:50%;background-color:transparent;-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:.2s;transition-duration:.2s;-webkit-transition-timing-function:ease-in;transition-timing-function:ease-in}.c100 .slice{position:absolute;top:0;width:1em;height:1em;clip:rect(0,1em,1em,.5em)}.c100 .p1 .bar{-webkit-transform:rotate(3.6deg);transform:rotate(3.6deg)}.c100 .p2 .bar{-webkit-transform:rotate(7.2deg);transform:rotate(7.2deg)}.c100 .p3 .bar{-webkit-transform:rotate(10.8deg);transform:rotate(10.8deg)}.c100 .p4 .bar{-webkit-transform:rotate(14.4deg);transform:rotate(14.4deg)}.c100 .p5 .bar{-webkit-transform:rotate(18deg);transform:rotate(18deg)}.c100 .p6 .bar{-webkit-transform:rotate(21.6deg);transform:rotate(21.6deg)}.c100 .p7 .bar{-webkit-transform:rotate(25.2deg);transform:rotate(25.2deg)}.c100 .p8 .bar{-webkit-transform:rotate(28.8deg);transform:rotate(28.8deg)}.c100 .p9 .bar{-webkit-transform:rotate(32.4deg);transform:rotate(32.4deg)}.c100 .p10 .bar{-webkit-transform:rotate(36deg);transform:rotate(36deg)}.c100 .p11 .bar{-webkit-transform:rotate(39.6deg);transform:rotate(39.6deg)}.c100 .p12 .bar{-webkit-transform:rotate(43.2deg);transform:rotate(43.2deg)}.c100 .p13 .bar{-webkit-transform:rotate(46.800000000000004deg);transform:rotate(46.800000000000004deg)}.c100 .p14 .bar{-webkit-transform:rotate(50.4deg);transform:rotate(50.4deg)}.c100 .p15 .bar{-webkit-transform:rotate(54deg);transform:rotate(54deg)}.c100 .p16 .bar{-webkit-transform:rotate(57.6deg);transform:rotate(57.6deg)}.c100 .p17 .bar{-webkit-transform:rotate(61.2deg);transform:rotate(61.2deg)}.c100 .p18 .bar{-webkit-transform:rotate(64.8deg);transform:rotate(64.8deg)}.c100 .p19 .bar{-webkit-transform:rotate(68.4deg);transform:rotate(68.4deg)}.c100 .p20 .bar{-webkit-transform:rotate(72deg);transform:rotate(72deg)}.c100 .p21 .bar{-webkit-transform:rotate(75.60000000000001deg);transform:rotate(75.60000000000001deg)}.c100 .p22 .bar{-webkit-transform:rotate(79.2deg);transform:rotate(79.2deg)}.c100 .p23 .bar{-webkit-transform:rotate(82.8deg);transform:rotate(82.8deg)}.c100 .p24 .bar{-webkit-transform:rotate(86.4deg);transform:rotate(86.4deg)}.c100 .p25 .bar{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.c100 .p26 .bar{-webkit-transform:rotate(93.60000000000001deg);transform:rotate(93.60000000000001deg)}.c100 .p27 .bar{-webkit-transform:rotate(97.2deg);transform:rotate(97.2deg)}.c100 .p28 .bar{-webkit-transform:rotate(100.8deg);transform:rotate(100.8deg)}.c100 .p29 .bar{-webkit-transform:rotate(104.4deg);transform:rotate(104.4deg)}.c100 .p30 .bar{-webkit-transform:rotate(108deg);transform:rotate(108deg)}.c100 .p31 .bar{-webkit-transform:rotate(111.60000000000001deg);transform:rotate(111.60000000000001deg)}.c100 .p32 .bar{-webkit-transform:rotate(115.2deg);transform:rotate(115.2deg)}.c100 .p33 .bar{-webkit-transform:rotate(118.8deg);transform:rotate(118.8deg)}.c100 .p34 .bar{-webkit-transform:rotate(122.4deg);transform:rotate(122.4deg)}.c100 .p35 .bar{-webkit-transform:rotate(126deg);transform:rotate(126deg)}.c100 .p36 .bar{-webkit-transform:rotate(129.6deg);transform:rotate(129.6deg)}.c100 .p37 .bar{-webkit-transform:rotate(133.20000000000002deg);transform:rotate(133.20000000000002deg)}.c100 .p38 .bar{-webkit-transform:rotate(136.8deg);transform:rotate(136.8deg)}.c100 .p39 .bar{-webkit-transform:rotate(140.4deg);transform:rotate(140.4deg)}.c100 .p40 .bar{-webkit-transform:rotate(144deg);transform:rotate(144deg)}.c100 .p41 .bar{-webkit-transform:rotate(147.6deg);transform:rotate(147.6deg)}.c100 .p42 .bar{-webkit-transform:rotate(151.20000000000002deg);transform:rotate(151.20000000000002deg)}.c100 .p43 .bar{-webkit-transform:rotate(154.8deg);transform:rotate(154.8deg)}.c100 .p44 .bar{-webkit-transform:rotate(158.4deg);transform:rotate(158.4deg)}.c100 .p45 .bar{-webkit-transform:rotate(162deg);transform:rotate(162deg)}.c100 .p46 .bar{-webkit-transform:rotate(165.6deg);transform:rotate(165.6deg)}.c100 .p47 .bar{-webkit-transform:rotate(169.20000000000002deg);transform:rotate(169.20000000000002deg)}.c100 .p48 .bar{-webkit-transform:rotate(172.8deg);transform:rotate(172.8deg)}.c100 .p49 .bar{-webkit-transform:rotate(176.4deg);transform:rotate(176.4deg)}.c100 .p50 .bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.c100 .p51 .bar{-webkit-transform:rotate(183.6deg);transform:rotate(183.6deg)}.c100 .p52 .bar{-webkit-transform:rotate(187.20000000000002deg);transform:rotate(187.20000000000002deg)}.c100 .p53 .bar{-webkit-transform:rotate(190.8deg);transform:rotate(190.8deg)}.c100 .p54 .bar{-webkit-transform:rotate(194.4deg);transform:rotate(194.4deg)}.c100 .p55 .bar{-webkit-transform:rotate(198deg);transform:rotate(198deg)}.c100 .p56 .bar{-webkit-transform:rotate(201.6deg);transform:rotate(201.6deg)}.c100 .p57 .bar{-webkit-transform:rotate(205.20000000000002deg);transform:rotate(205.20000000000002deg)}.c100 .p58 .bar{-webkit-transform:rotate(208.8deg);transform:rotate(208.8deg)}.c100 .p59 .bar{-webkit-transform:rotate(212.4deg);transform:rotate(212.4deg)}.c100 .p60 .bar{-webkit-transform:rotate(216deg);transform:rotate(216deg)}.c100 .p61 .bar{-webkit-transform:rotate(219.6deg);transform:rotate(219.6deg)}.c100 .p62 .bar{-webkit-transform:rotate(223.20000000000002deg);transform:rotate(223.20000000000002deg)}.c100 .p63 .bar{-webkit-transform:rotate(226.8deg);transform:rotate(226.8deg)}.c100 .p64 .bar{-webkit-transform:rotate(230.4deg);transform:rotate(230.4deg)}.c100 .p65 .bar{-webkit-transform:rotate(234deg);transform:rotate(234deg)}.c100 .p66 .bar{-webkit-transform:rotate(237.6deg);transform:rotate(237.6deg)}.c100 .p67 .bar{-webkit-transform:rotate(241.20000000000002deg);transform:rotate(241.20000000000002deg)}.c100 .p68 .bar{-webkit-transform:rotate(244.8deg);transform:rotate(244.8deg)}.c100 .p69 .bar{-webkit-transform:rotate(248.4deg);transform:rotate(248.4deg)}.c100 .p70 .bar{-webkit-transform:rotate(252deg);transform:rotate(252deg)}.c100 .p71 .bar{-webkit-transform:rotate(255.6deg);transform:rotate(255.6deg)}.c100 .p72 .bar{-webkit-transform:rotate(259.2deg);transform:rotate(259.2deg)}.c100 .p73 .bar{-webkit-transform:rotate(262.8deg);transform:rotate(262.8deg)}.c100 .p74 .bar{-webkit-transform:rotate(266.40000000000003deg);transform:rotate(266.40000000000003deg)}.c100 .p75 .bar{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.c100 .p76 .bar{-webkit-transform:rotate(273.6deg);transform:rotate(273.6deg)}.c100 .p77 .bar{-webkit-transform:rotate(277.2deg);transform:rotate(277.2deg)}.c100 .p78 .bar{-webkit-transform:rotate(280.8deg);transform:rotate(280.8deg)}.c100 .p79 .bar{-webkit-transform:rotate(284.40000000000003deg);transform:rotate(284.40000000000003deg)}.c100 .p80 .bar{-webkit-transform:rotate(288deg);transform:rotate(288deg)}.c100 .p81 .bar{-webkit-transform:rotate(291.6deg);transform:rotate(291.6deg)}.c100 .p82 .bar{-webkit-transform:rotate(295.2deg);transform:rotate(295.2deg)}.c100 .p83 .bar{-webkit-transform:rotate(298.8deg);transform:rotate(298.8deg)}.c100 .p84 .bar{-webkit-transform:rotate(302.40000000000003deg);transform:rotate(302.40000000000003deg)}.c100 .p85 .bar{-webkit-transform:rotate(306deg);transform:rotate(306deg)}.c100 .p86 .bar{-webkit-transform:rotate(309.6deg);transform:rotate(309.6deg)}.c100 .p87 .bar{-webkit-transform:rotate(313.2deg);transform:rotate(313.2deg)}.c100 .p88 .bar{-webkit-transform:rotate(316.8deg);transform:rotate(316.8deg)}.c100 .p89 .bar{-webkit-transform:rotate(320.40000000000003deg);transform:rotate(320.40000000000003deg)}.c100 .p90 .bar{-webkit-transform:rotate(324deg);transform:rotate(324deg)}.c100 .p91 .bar{-webkit-transform:rotate(327.6deg);transform:rotate(327.6deg)}.c100 .p92 .bar{-webkit-transform:rotate(331.2deg);transform:rotate(331.2deg)}.c100 .p93 .bar{-webkit-transform:rotate(334.8deg);transform:rotate(334.8deg)}.c100 .p94 .bar{-webkit-transform:rotate(338.40000000000003deg);transform:rotate(338.40000000000003deg)}.c100 .p95 .bar{-webkit-transform:rotate(342deg);transform:rotate(342deg)}.c100 .p96 .bar{-webkit-transform:rotate(345.6deg);transform:rotate(345.6deg)}.c100 .p97 .bar{-webkit-transform:rotate(349.2deg);transform:rotate(349.2deg)}.c100 .p98 .bar{-webkit-transform:rotate(352.8deg);transform:rotate(352.8deg)}.c100 .p99 .bar{-webkit-transform:rotate(356.40000000000003deg);transform:rotate(356.40000000000003deg)}.c100 .p100 .bar{-webkit-transform:rotate(360deg);transform:rotate(360deg)}.c100.dark{background-color:#777}.c100.dark .bar,.c100.dark .fill{border-color:#c6ff00!important}.c100.dark>span{color:#777}.c100.dark:after{background-color:#666}.c100.red .bar,.c100.red .fill{border-color:#ed364c!important}.c100.pink .bar,.c100.pink .fill{border-color:#fc70cf!important}.c100.blue .bar,.c100.blue .fill{border-color:#3098ff!important}.c100.green .bar,.c100.green .fill{border-color:#4db53c!important}.ad_location{width:300px;height:250px;background-color:#ccc;position:absolute;bottom:0;right:0}';
// var cssWideFile = '@font-face{font-family:Lato;font-style:normal;font-weight:300;src:local(\'Lato Light\'),local(\'Lato-Light\'),url(//fonts.gstatic.com/s/lato/v13/dPJ5r9gl3kK6ijoeP1IRsvY6323mHUZFJMgTvxaG2iE.woff2) format(\'woff2\');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:300;src:local(\'Lato Light\'),local(\'Lato-Light\'),url(//fonts.gstatic.com/s/lato/v13/EsvMC5un3kjyUhB9ZEPPwg.woff2) format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215}@font-face{font-family:Lato;font-style:normal;font-weight:400;src:local(\'Lato Regular\'),local(\'Lato-Regular\'),url(//fonts.gstatic.com/s/lato/v13/UyBMtLsHKBKXelqf4x7VRQ.woff2) format(\'woff2\');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:400;src:local(\'Lato Regular\'),local(\'Lato-Regular\'),url(//fonts.gstatic.com/s/lato/v13/1YwB1sO8YE1Lyjf12WNiUA.woff2) format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215}@font-face{font-family:Lato;font-style:normal;font-weight:700;src:local(\'Lato Bold\'),local(\'Lato-Bold\'),url(//fonts.gstatic.com/s/lato/v13/ObQr5XYcoH0WBoUxiaYK3_Y6323mHUZFJMgTvxaG2iE.woff2) format(\'woff2\');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:700;src:local(\'Lato Bold\'),local(\'Lato-Bold\'),url(//fonts.gstatic.com/s/lato/v13/H2DMvhDLycM56KNuAtbJYA.woff2) format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215}@font-face{font-family:Lato;font-style:normal;font-weight:900;src:local(\'Lato Black\'),local(\'Lato-Black\'),url(//fonts.gstatic.com/s/lato/v13/R4a6fty3waPci7C44H8AjvY6323mHUZFJMgTvxaG2iE.woff2) format(\'woff2\');unicode-range:U+0100-024F,U+1E00-1EFF,U+20A0-20AB,U+20AD-20CF,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:900;src:local(\'Lato Black\'),local(\'Lato-Black\'),url(//fonts.gstatic.com/s/lato/v13/tI4j516nok_GrVf4dhunkg.woff2) format(\'woff2\');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215}@font-face{font-family:FontAwesome;src:url(../fonts/fontawesome-webfont.eot?v=4.7.0);src:url(../fonts/fontawesome-webfont.eot?#iefix&v=4.7.0) format(\'embedded-opentype\'),url(../fonts/fontawesome-webfont.woff2?v=4.7.0) format(\'woff2\'),url(../fonts/fontawesome-webfont.woff?v=4.7.0) format(\'woff\'),url(../fonts/fontawesome-webfont.ttf?v=4.7.0) format(\'truetype\'),url(../fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular) format(\'svg\');font-weight:400;font-style:normal}.fa{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fa-lg{font-size:1.33333333em;line-height:.75em;vertical-align:-15%}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-fw{width:1.28571429em;text-align:center}.fa-ul{padding-left:0;margin-left:2.14285714em;list-style-type:none}.fa-ul>li{position:relative}.fa-li{position:absolute;left:-2.14285714em;width:2.14285714em;top:.14285714em;text-align:center}.fa-li.fa-lg{left:-1.85714286em}.fa-border{padding:.2em .25em .15em;border:solid .08em #eee;border-radius:.1em}.fa-pull-left{float:left}.fa-pull-right{float:right}.fa.fa-pull-left{margin-right:.3em}.fa.fa-pull-right{margin-left:.3em}.pull-right{float:right}.pull-left{float:left}.fa .pull-left{margin-right:.3em}.fa .pull-right{margin-left:.3em}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}.fa-pulse{-webkit-animation:fa-spin 1s infinite steps(8);animation:fa-spin 1s infinite steps(8)}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.fa-rotate-90{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-webkit-transform:scale(-1,1);transform:scale(-1,1)}.fa-flip-vertical{-webkit-transform:scale(1,-1);transform:scale(1,-1)}:root .fa-flip-horizontal,:root .fa-flip-vertical,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-rotate-90{-webkit-filter:none;filter:none}.fa-stack{position:relative;display:inline-block;width:2em;height:2em;line-height:2em;vertical-align:middle}.fa-stack-1x,.fa-stack-2x{position:absolute;left:0;width:100%;text-align:center}.fa-stack-1x{line-height:inherit}.fa-stack-2x{font-size:2em}.fa-inverse{color:#fff}.fa-glass:before{content:"\f000"}.fa-music:before{content:"\f001"}.fa-search:before{content:"\f002"}.fa-envelope-o:before{content:"\f003"}.fa-heart:before{content:"\f004"}.fa-star:before{content:"\f005"}.fa-star-o:before{content:"\f006"}.fa-user:before{content:"\f007"}.fa-film:before{content:"\f008"}.fa-th-large:before{content:"\f009"}.fa-th:before{content:"\f00a"}.fa-th-list:before{content:"\f00b"}.fa-check:before{content:"\f00c"}.fa-close:before,.fa-remove:before,.fa-times:before{content:"\f00d"}.fa-search-plus:before{content:"\f00e"}.fa-search-minus:before{content:"\f010"}.fa-power-off:before{content:"\f011"}.fa-signal:before{content:"\f012"}.fa-cog:before,.fa-gear:before{content:"\f013"}.fa-trash-o:before{content:"\f014"}.fa-home:before{content:"\f015"}.fa-file-o:before{content:"\f016"}.fa-clock-o:before{content:"\f017"}.fa-road:before{content:"\f018"}.fa-download:before{content:"\f019"}.fa-arrow-circle-o-down:before{content:"\f01a"}.fa-arrow-circle-o-up:before{content:"\f01b"}.fa-inbox:before{content:"\f01c"}.fa-play-circle-o:before{content:"\f01d"}.fa-repeat:before,.fa-rotate-right:before{content:"\f01e"}.fa-refresh:before{content:"\f021"}.fa-list-alt:before{content:"\f022"}.fa-lock:before{content:"\f023"}.fa-flag:before{content:"\f024"}.fa-headphones:before{content:"\f025"}.fa-volume-off:before{content:"\f026"}.fa-volume-down:before{content:"\f027"}.fa-volume-up:before{content:"\f028"}.fa-qrcode:before{content:"\f029"}.fa-barcode:before{content:"\f02a"}.fa-tag:before{content:"\f02b"}.fa-tags:before{content:"\f02c"}.fa-book:before{content:"\f02d"}.fa-bookmark:before{content:"\f02e"}.fa-print:before{content:"\f02f"}.fa-camera:before{content:"\f030"}.fa-font:before{content:"\f031"}.fa-bold:before{content:"\f032"}.fa-italic:before{content:"\f033"}.fa-text-height:before{content:"\f034"}.fa-text-width:before{content:"\f035"}.fa-align-left:before{content:"\f036"}.fa-align-center:before{content:"\f037"}.fa-align-right:before{content:"\f038"}.fa-align-justify:before{content:"\f039"}.fa-list:before{content:"\f03a"}.fa-dedent:before,.fa-outdent:before{content:"\f03b"}.fa-indent:before{content:"\f03c"}.fa-video-camera:before{content:"\f03d"}.fa-image:before,.fa-photo:before,.fa-picture-o:before{content:"\f03e"}.fa-pencil:before{content:"\f040"}.fa-map-marker:before{content:"\f041"}.fa-adjust:before{content:"\f042"}.fa-tint:before{content:"\f043"}.fa-edit:before,.fa-pencil-square-o:before{content:"\f044"}.fa-share-square-o:before{content:"\f045"}.fa-check-square-o:before{content:"\f046"}.fa-arrows:before{content:"\f047"}.fa-step-backward:before{content:"\f048"}.fa-fast-backward:before{content:"\f049"}.fa-backward:before{content:"\f04a"}.fa-play:before{content:"\f04b"}.fa-pause:before{content:"\f04c"}.fa-stop:before{content:"\f04d"}.fa-forward:before{content:"\f04e"}.fa-fast-forward:before{content:"\f050"}.fa-step-forward:before{content:"\f051"}.fa-eject:before{content:"\f052"}.fa-chevron-left:before{content:"\f053"}.fa-chevron-right:before{content:"\f054"}.fa-plus-circle:before{content:"\f055"}.fa-minus-circle:before{content:"\f056"}.fa-times-circle:before{content:"\f057"}.fa-check-circle:before{content:"\f058"}.fa-question-circle:before{content:"\f059"}.fa-info-circle:before{content:"\f05a"}.fa-crosshairs:before{content:"\f05b"}.fa-times-circle-o:before{content:"\f05c"}.fa-check-circle-o:before{content:"\f05d"}.fa-ban:before{content:"\f05e"}.fa-arrow-left:before{content:"\f060"}.fa-arrow-right:before{content:"\f061"}.fa-arrow-up:before{content:"\f062"}.fa-arrow-down:before{content:"\f063"}.fa-mail-forward:before,.fa-share:before{content:"\f064"}.fa-expand:before{content:"\f065"}.fa-compress:before{content:"\f066"}.fa-plus:before{content:"\f067"}.fa-minus:before{content:"\f068"}.fa-asterisk:before{content:"\f069"}.fa-exclamation-circle:before{content:"\f06a"}.fa-gift:before{content:"\f06b"}.fa-leaf:before{content:"\f06c"}.fa-fire:before{content:"\f06d"}.fa-eye:before{content:"\f06e"}.fa-eye-slash:before{content:"\f070"}.fa-exclamation-triangle:before,.fa-warning:before{content:"\f071"}.fa-plane:before{content:"\f072"}.fa-calendar:before{content:"\f073"}.fa-random:before{content:"\f074"}.fa-comment:before{content:"\f075"}.fa-magnet:before{content:"\f076"}.fa-chevron-up:before{content:"\f077"}.fa-chevron-down:before{content:"\f078"}.fa-retweet:before{content:"\f079"}.fa-shopping-cart:before{content:"\f07a"}.fa-folder:before{content:"\f07b"}.fa-folder-open:before{content:"\f07c"}.fa-arrows-v:before{content:"\f07d"}.fa-arrows-h:before{content:"\f07e"}.fa-bar-chart-o:before,.fa-bar-chart:before{content:"\f080"}.fa-twitter-square:before{content:"\f081"}.fa-facebook-square:before{content:"\f082"}.fa-camera-retro:before{content:"\f083"}.fa-key:before{content:"\f084"}.fa-cogs:before,.fa-gears:before{content:"\f085"}.fa-comments:before{content:"\f086"}.fa-thumbs-o-up:before{content:"\f087"}.fa-thumbs-o-down:before{content:"\f088"}.fa-star-half:before{content:"\f089"}.fa-heart-o:before{content:"\f08a"}.fa-sign-out:before{content:"\f08b"}.fa-linkedin-square:before{content:"\f08c"}.fa-thumb-tack:before{content:"\f08d"}.fa-external-link:before{content:"\f08e"}.fa-sign-in:before{content:"\f090"}.fa-trophy:before{content:"\f091"}.fa-github-square:before{content:"\f092"}.fa-upload:before{content:"\f093"}.fa-lemon-o:before{content:"\f094"}.fa-phone:before{content:"\f095"}.fa-square-o:before{content:"\f096"}.fa-bookmark-o:before{content:"\f097"}.fa-phone-square:before{content:"\f098"}.fa-twitter:before{content:"\f099"}.fa-facebook-f:before,.fa-facebook:before{content:"\f09a"}.fa-github:before{content:"\f09b"}.fa-unlock:before{content:"\f09c"}.fa-credit-card:before{content:"\f09d"}.fa-feed:before,.fa-rss:before{content:"\f09e"}.fa-hdd-o:before{content:"\f0a0"}.fa-bullhorn:before{content:"\f0a1"}.fa-bell:before{content:"\f0f3"}.fa-certificate:before{content:"\f0a3"}.fa-hand-o-right:before{content:"\f0a4"}.fa-hand-o-left:before{content:"\f0a5"}.fa-hand-o-up:before{content:"\f0a6"}.fa-hand-o-down:before{content:"\f0a7"}.fa-arrow-circle-left:before{content:"\f0a8"}.fa-arrow-circle-right:before{content:"\f0a9"}.fa-arrow-circle-up:before{content:"\f0aa"}.fa-arrow-circle-down:before{content:"\f0ab"}.fa-globe:before{content:"\f0ac"}.fa-wrench:before{content:"\f0ad"}.fa-tasks:before{content:"\f0ae"}.fa-filter:before{content:"\f0b0"}.fa-briefcase:before{content:"\f0b1"}.fa-arrows-alt:before{content:"\f0b2"}.fa-group:before,.fa-users:before{content:"\f0c0"}.fa-chain:before,.fa-link:before{content:"\f0c1"}.fa-cloud:before{content:"\f0c2"}.fa-flask:before{content:"\f0c3"}.fa-cut:before,.fa-scissors:before{content:"\f0c4"}.fa-copy:before,.fa-files-o:before{content:"\f0c5"}.fa-paperclip:before{content:"\f0c6"}.fa-floppy-o:before,.fa-save:before{content:"\f0c7"}.fa-square:before{content:"\f0c8"}.fa-bars:before,.fa-navicon:before,.fa-reorder:before{content:"\f0c9"}.fa-list-ul:before{content:"\f0ca"}.fa-list-ol:before{content:"\f0cb"}.fa-strikethrough:before{content:"\f0cc"}.fa-underline:before{content:"\f0cd"}.fa-table:before{content:"\f0ce"}.fa-magic:before{content:"\f0d0"}.fa-truck:before{content:"\f0d1"}.fa-pinterest:before{content:"\f0d2"}.fa-pinterest-square:before{content:"\f0d3"}.fa-google-plus-square:before{content:"\f0d4"}.fa-google-plus:before{content:"\f0d5"}.fa-money:before{content:"\f0d6"}.fa-caret-down:before{content:"\f0d7"}.fa-caret-up:before{content:"\f0d8"}.fa-caret-left:before{content:"\f0d9"}.fa-caret-right:before{content:"\f0da"}.fa-columns:before{content:"\f0db"}.fa-sort:before,.fa-unsorted:before{content:"\f0dc"}.fa-sort-desc:before,.fa-sort-down:before{content:"\f0dd"}.fa-sort-asc:before,.fa-sort-up:before{content:"\f0de"}.fa-envelope:before{content:"\f0e0"}.fa-linkedin:before{content:"\f0e1"}.fa-rotate-left:before,.fa-undo:before{content:"\f0e2"}.fa-gavel:before,.fa-legal:before{content:"\f0e3"}.fa-dashboard:before,.fa-tachometer:before{content:"\f0e4"}.fa-comment-o:before{content:"\f0e5"}.fa-comments-o:before{content:"\f0e6"}.fa-bolt:before,.fa-flash:before{content:"\f0e7"}.fa-sitemap:before{content:"\f0e8"}.fa-umbrella:before{content:"\f0e9"}.fa-clipboard:before,.fa-paste:before{content:"\f0ea"}.fa-lightbulb-o:before{content:"\f0eb"}.fa-exchange:before{content:"\f0ec"}.fa-cloud-download:before{content:"\f0ed"}.fa-cloud-upload:before{content:"\f0ee"}.fa-user-md:before{content:"\f0f0"}.fa-stethoscope:before{content:"\f0f1"}.fa-suitcase:before{content:"\f0f2"}.fa-bell-o:before{content:"\f0a2"}.fa-coffee:before{content:"\f0f4"}.fa-cutlery:before{content:"\f0f5"}.fa-file-text-o:before{content:"\f0f6"}.fa-building-o:before{content:"\f0f7"}.fa-hospital-o:before{content:"\f0f8"}.fa-ambulance:before{content:"\f0f9"}.fa-medkit:before{content:"\f0fa"}.fa-fighter-jet:before{content:"\f0fb"}.fa-beer:before{content:"\f0fc"}.fa-h-square:before{content:"\f0fd"}.fa-plus-square:before{content:"\f0fe"}.fa-angle-double-left:before{content:"\f100"}.fa-angle-double-right:before{content:"\f101"}.fa-angle-double-up:before{content:"\f102"}.fa-angle-double-down:before{content:"\f103"}.fa-angle-left:before{content:"\f104"}.fa-angle-right:before{content:"\f105"}.fa-angle-up:before{content:"\f106"}.fa-angle-down:before{content:"\f107"}.fa-desktop:before{content:"\f108"}.fa-laptop:before{content:"\f109"}.fa-tablet:before{content:"\f10a"}.fa-mobile-phone:before,.fa-mobile:before{content:"\f10b"}.fa-circle-o:before{content:"\f10c"}.fa-quote-left:before{content:"\f10d"}.fa-quote-right:before{content:"\f10e"}.fa-spinner:before{content:"\f110"}.fa-circle:before{content:"\f111"}.fa-mail-reply:before,.fa-reply:before{content:"\f112"}.fa-github-alt:before{content:"\f113"}.fa-folder-o:before{content:"\f114"}.fa-folder-open-o:before{content:"\f115"}.fa-smile-o:before{content:"\f118"}.fa-frown-o:before{content:"\f119"}.fa-meh-o:before{content:"\f11a"}.fa-gamepad:before{content:"\f11b"}.fa-keyboard-o:before{content:"\f11c"}.fa-flag-o:before{content:"\f11d"}.fa-flag-checkered:before{content:"\f11e"}.fa-terminal:before{content:"\f120"}.fa-code:before{content:"\f121"}.fa-mail-reply-all:before,.fa-reply-all:before{content:"\f122"}.fa-star-half-empty:before,.fa-star-half-full:before,.fa-star-half-o:before{content:"\f123"}.fa-location-arrow:before{content:"\f124"}.fa-crop:before{content:"\f125"}.fa-code-fork:before{content:"\f126"}.fa-chain-broken:before,.fa-unlink:before{content:"\f127"}.fa-question:before{content:"\f128"}.fa-info:before{content:"\f129"}.fa-exclamation:before{content:"\f12a"}.fa-superscript:before{content:"\f12b"}.fa-subscript:before{content:"\f12c"}.fa-eraser:before{content:"\f12d"}.fa-puzzle-piece:before{content:"\f12e"}.fa-microphone:before{content:"\f130"}.fa-microphone-slash:before{content:"\f131"}.fa-shield:before{content:"\f132"}.fa-calendar-o:before{content:"\f133"}.fa-fire-extinguisher:before{content:"\f134"}.fa-rocket:before{content:"\f135"}.fa-maxcdn:before{content:"\f136"}.fa-chevron-circle-left:before{content:"\f137"}.fa-chevron-circle-right:before{content:"\f138"}.fa-chevron-circle-up:before{content:"\f139"}.fa-chevron-circle-down:before{content:"\f13a"}.fa-html5:before{content:"\f13b"}.fa-css3:before{content:"\f13c"}.fa-anchor:before{content:"\f13d"}.fa-unlock-alt:before{content:"\f13e"}.fa-bullseye:before{content:"\f140"}.fa-ellipsis-h:before{content:"\f141"}.fa-ellipsis-v:before{content:"\f142"}.fa-rss-square:before{content:"\f143"}.fa-play-circle:before{content:"\f144"}.fa-ticket:before{content:"\f145"}.fa-minus-square:before{content:"\f146"}.fa-minus-square-o:before{content:"\f147"}.fa-level-up:before{content:"\f148"}.fa-level-down:before{content:"\f149"}.fa-check-square:before{content:"\f14a"}.fa-pencil-square:before{content:"\f14b"}.fa-external-link-square:before{content:"\f14c"}.fa-share-square:before{content:"\f14d"}.fa-compass:before{content:"\f14e"}.fa-caret-square-o-down:before,.fa-toggle-down:before{content:"\f150"}.fa-caret-square-o-up:before,.fa-toggle-up:before{content:"\f151"}.fa-caret-square-o-right:before,.fa-toggle-right:before{content:"\f152"}.fa-eur:before,.fa-euro:before{content:"\f153"}.fa-gbp:before{content:"\f154"}.fa-dollar:before,.fa-usd:before{content:"\f155"}.fa-inr:before,.fa-rupee:before{content:"\f156"}.fa-cny:before,.fa-jpy:before,.fa-rmb:before,.fa-yen:before{content:"\f157"}.fa-rouble:before,.fa-rub:before,.fa-ruble:before{content:"\f158"}.fa-krw:before,.fa-won:before{content:"\f159"}.fa-bitcoin:before,.fa-btc:before{content:"\f15a"}.fa-file:before{content:"\f15b"}.fa-file-text:before{content:"\f15c"}.fa-sort-alpha-asc:before{content:"\f15d"}.fa-sort-alpha-desc:before{content:"\f15e"}.fa-sort-amount-asc:before{content:"\f160"}.fa-sort-amount-desc:before{content:"\f161"}.fa-sort-numeric-asc:before{content:"\f162"}.fa-sort-numeric-desc:before{content:"\f163"}.fa-thumbs-up:before{content:"\f164"}.fa-thumbs-down:before{content:"\f165"}.fa-youtube-square:before{content:"\f166"}.fa-youtube:before{content:"\f167"}.fa-xing:before{content:"\f168"}.fa-xing-square:before{content:"\f169"}.fa-youtube-play:before{content:"\f16a"}.fa-dropbox:before{content:"\f16b"}.fa-stack-overflow:before{content:"\f16c"}.fa-instagram:before{content:"\f16d"}.fa-flickr:before{content:"\f16e"}.fa-adn:before{content:"\f170"}.fa-bitbucket:before{content:"\f171"}.fa-bitbucket-square:before{content:"\f172"}.fa-tumblr:before{content:"\f173"}.fa-tumblr-square:before{content:"\f174"}.fa-long-arrow-down:before{content:"\f175"}.fa-long-arrow-up:before{content:"\f176"}.fa-long-arrow-left:before{content:"\f177"}.fa-long-arrow-right:before{content:"\f178"}.fa-apple:before{content:"\f179"}.fa-windows:before{content:"\f17a"}.fa-android:before{content:"\f17b"}.fa-linux:before{content:"\f17c"}.fa-dribbble:before{content:"\f17d"}.fa-skype:before{content:"\f17e"}.fa-foursquare:before{content:"\f180"}.fa-trello:before{content:"\f181"}.fa-female:before{content:"\f182"}.fa-male:before{content:"\f183"}.fa-gittip:before,.fa-gratipay:before{content:"\f184"}.fa-sun-o:before{content:"\f185"}.fa-moon-o:before{content:"\f186"}.fa-archive:before{content:"\f187"}.fa-bug:before{content:"\f188"}.fa-vk:before{content:"\f189"}.fa-weibo:before{content:"\f18a"}.fa-renren:before{content:"\f18b"}.fa-pagelines:before{content:"\f18c"}.fa-stack-exchange:before{content:"\f18d"}.fa-arrow-circle-o-right:before{content:"\f18e"}.fa-arrow-circle-o-left:before{content:"\f190"}.fa-caret-square-o-left:before,.fa-toggle-left:before{content:"\f191"}.fa-dot-circle-o:before{content:"\f192"}.fa-wheelchair:before{content:"\f193"}.fa-vimeo-square:before{content:"\f194"}.fa-try:before,.fa-turkish-lira:before{content:"\f195"}.fa-plus-square-o:before{content:"\f196"}.fa-space-shuttle:before{content:"\f197"}.fa-slack:before{content:"\f198"}.fa-envelope-square:before{content:"\f199"}.fa-wordpress:before{content:"\f19a"}.fa-openid:before{content:"\f19b"}.fa-bank:before,.fa-institution:before,.fa-university:before{content:"\f19c"}.fa-graduation-cap:before,.fa-mortar-board:before{content:"\f19d"}.fa-yahoo:before{content:"\f19e"}.fa-google:before{content:"\f1a0"}.fa-reddit:before{content:"\f1a1"}.fa-reddit-square:before{content:"\f1a2"}.fa-stumbleupon-circle:before{content:"\f1a3"}.fa-stumbleupon:before{content:"\f1a4"}.fa-delicious:before{content:"\f1a5"}.fa-digg:before{content:"\f1a6"}.fa-pied-piper-pp:before{content:"\f1a7"}.fa-pied-piper-alt:before{content:"\f1a8"}.fa-drupal:before{content:"\f1a9"}.fa-joomla:before{content:"\f1aa"}.fa-language:before{content:"\f1ab"}.fa-fax:before{content:"\f1ac"}.fa-building:before{content:"\f1ad"}.fa-child:before{content:"\f1ae"}.fa-paw:before{content:"\f1b0"}.fa-spoon:before{content:"\f1b1"}.fa-cube:before{content:"\f1b2"}.fa-cubes:before{content:"\f1b3"}.fa-behance:before{content:"\f1b4"}.fa-behance-square:before{content:"\f1b5"}.fa-steam:before{content:"\f1b6"}.fa-steam-square:before{content:"\f1b7"}.fa-recycle:before{content:"\f1b8"}.fa-automobile:before,.fa-car:before{content:"\f1b9"}.fa-cab:before,.fa-taxi:before{content:"\f1ba"}.fa-tree:before{content:"\f1bb"}.fa-spotify:before{content:"\f1bc"}.fa-deviantart:before{content:"\f1bd"}.fa-soundcloud:before{content:"\f1be"}.fa-database:before{content:"\f1c0"}.fa-file-pdf-o:before{content:"\f1c1"}.fa-file-word-o:before{content:"\f1c2"}.fa-file-excel-o:before{content:"\f1c3"}.fa-file-powerpoint-o:before{content:"\f1c4"}.fa-file-image-o:before,.fa-file-photo-o:before,.fa-file-picture-o:before{content:"\f1c5"}.fa-file-archive-o:before,.fa-file-zip-o:before{content:"\f1c6"}.fa-file-audio-o:before,.fa-file-sound-o:before{content:"\f1c7"}.fa-file-movie-o:before,.fa-file-video-o:before{content:"\f1c8"}.fa-file-code-o:before{content:"\f1c9"}.fa-vine:before{content:"\f1ca"}.fa-codepen:before{content:"\f1cb"}.fa-jsfiddle:before{content:"\f1cc"}.fa-life-bouy:before,.fa-life-buoy:before,.fa-life-ring:before,.fa-life-saver:before,.fa-support:before{content:"\f1cd"}.fa-circle-o-notch:before{content:"\f1ce"}.fa-ra:before,.fa-rebel:before,.fa-resistance:before{content:"\f1d0"}.fa-empire:before,.fa-ge:before{content:"\f1d1"}.fa-git-square:before{content:"\f1d2"}.fa-git:before{content:"\f1d3"}.fa-hacker-news:before,.fa-y-combinator-square:before,.fa-yc-square:before{content:"\f1d4"}.fa-tencent-weibo:before{content:"\f1d5"}.fa-qq:before{content:"\f1d6"}.fa-wechat:before,.fa-weixin:before{content:"\f1d7"}.fa-paper-plane:before,.fa-send:before{content:"\f1d8"}.fa-paper-plane-o:before,.fa-send-o:before{content:"\f1d9"}.fa-history:before{content:"\f1da"}.fa-circle-thin:before{content:"\f1db"}.fa-header:before{content:"\f1dc"}.fa-paragraph:before{content:"\f1dd"}.fa-sliders:before{content:"\f1de"}.fa-share-alt:before{content:"\f1e0"}.fa-share-alt-square:before{content:"\f1e1"}.fa-bomb:before{content:"\f1e2"}.fa-futbol-o:before,.fa-soccer-ball-o:before{content:"\f1e3"}.fa-tty:before{content:"\f1e4"}.fa-binoculars:before{content:"\f1e5"}.fa-plug:before{content:"\f1e6"}.fa-slideshare:before{content:"\f1e7"}.fa-twitch:before{content:"\f1e8"}.fa-yelp:before{content:"\f1e9"}.fa-newspaper-o:before{content:"\f1ea"}.fa-wifi:before{content:"\f1eb"}.fa-calculator:before{content:"\f1ec"}.fa-paypal:before{content:"\f1ed"}.fa-google-wallet:before{content:"\f1ee"}.fa-cc-visa:before{content:"\f1f0"}.fa-cc-mastercard:before{content:"\f1f1"}.fa-cc-discover:before{content:"\f1f2"}.fa-cc-amex:before{content:"\f1f3"}.fa-cc-paypal:before{content:"\f1f4"}.fa-cc-stripe:before{content:"\f1f5"}.fa-bell-slash:before{content:"\f1f6"}.fa-bell-slash-o:before{content:"\f1f7"}.fa-trash:before{content:"\f1f8"}.fa-copyright:before{content:"\f1f9"}.fa-at:before{content:"\f1fa"}.fa-eyedropper:before{content:"\f1fb"}.fa-paint-brush:before{content:"\f1fc"}.fa-birthday-cake:before{content:"\f1fd"}.fa-area-chart:before{content:"\f1fe"}.fa-pie-chart:before{content:"\f200"}.fa-line-chart:before{content:"\f201"}.fa-lastfm:before{content:"\f202"}.fa-lastfm-square:before{content:"\f203"}.fa-toggle-off:before{content:"\f204"}.fa-toggle-on:before{content:"\f205"}.fa-bicycle:before{content:"\f206"}.fa-bus:before{content:"\f207"}.fa-ioxhost:before{content:"\f208"}.fa-angellist:before{content:"\f209"}.fa-cc:before{content:"\f20a"}.fa-ils:before,.fa-shekel:before,.fa-sheqel:before{content:"\f20b"}.fa-meanpath:before{content:"\f20c"}.fa-buysellads:before{content:"\f20d"}.fa-connectdevelop:before{content:"\f20e"}.fa-dashcube:before{content:"\f210"}.fa-forumbee:before{content:"\f211"}.fa-leanpub:before{content:"\f212"}.fa-sellsy:before{content:"\f213"}.fa-shirtsinbulk:before{content:"\f214"}.fa-simplybuilt:before{content:"\f215"}.fa-skyatlas:before{content:"\f216"}.fa-cart-plus:before{content:"\f217"}.fa-cart-arrow-down:before{content:"\f218"}.fa-diamond:before{content:"\f219"}.fa-ship:before{content:"\f21a"}.fa-user-secret:before{content:"\f21b"}.fa-motorcycle:before{content:"\f21c"}.fa-street-view:before{content:"\f21d"}.fa-heartbeat:before{content:"\f21e"}.fa-venus:before{content:"\f221"}.fa-mars:before{content:"\f222"}.fa-mercury:before{content:"\f223"}.fa-intersex:before,.fa-transgender:before{content:"\f224"}.fa-transgender-alt:before{content:"\f225"}.fa-venus-double:before{content:"\f226"}.fa-mars-double:before{content:"\f227"}.fa-venus-mars:before{content:"\f228"}.fa-mars-stroke:before{content:"\f229"}.fa-mars-stroke-v:before{content:"\f22a"}.fa-mars-stroke-h:before{content:"\f22b"}.fa-neuter:before{content:"\f22c"}.fa-genderless:before{content:"\f22d"}.fa-facebook-official:before{content:"\f230"}.fa-pinterest-p:before{content:"\f231"}.fa-whatsapp:before{content:"\f232"}.fa-server:before{content:"\f233"}.fa-user-plus:before{content:"\f234"}.fa-user-times:before{content:"\f235"}.fa-bed:before,.fa-hotel:before{content:"\f236"}.fa-viacoin:before{content:"\f237"}.fa-train:before{content:"\f238"}.fa-subway:before{content:"\f239"}.fa-medium:before{content:"\f23a"}.fa-y-combinator:before,.fa-yc:before{content:"\f23b"}.fa-optin-monster:before{content:"\f23c"}.fa-opencart:before{content:"\f23d"}.fa-expeditedssl:before{content:"\f23e"}.fa-battery-4:before,.fa-battery-full:before,.fa-battery:before{content:"\f240"}.fa-battery-3:before,.fa-battery-three-quarters:before{content:"\f241"}.fa-battery-2:before,.fa-battery-half:before{content:"\f242"}.fa-battery-1:before,.fa-battery-quarter:before{content:"\f243"}.fa-battery-0:before,.fa-battery-empty:before{content:"\f244"}.fa-mouse-pointer:before{content:"\f245"}.fa-i-cursor:before{content:"\f246"}.fa-object-group:before{content:"\f247"}.fa-object-ungroup:before{content:"\f248"}.fa-sticky-note:before{content:"\f249"}.fa-sticky-note-o:before{content:"\f24a"}.fa-cc-jcb:before{content:"\f24b"}.fa-cc-diners-club:before{content:"\f24c"}.fa-clone:before{content:"\f24d"}.fa-balance-scale:before{content:"\f24e"}.fa-hourglass-o:before{content:"\f250"}.fa-hourglass-1:before,.fa-hourglass-start:before{content:"\f251"}.fa-hourglass-2:before,.fa-hourglass-half:before{content:"\f252"}.fa-hourglass-3:before,.fa-hourglass-end:before{content:"\f253"}.fa-hourglass:before{content:"\f254"}.fa-hand-grab-o:before,.fa-hand-rock-o:before{content:"\f255"}.fa-hand-paper-o:before,.fa-hand-stop-o:before{content:"\f256"}.fa-hand-scissors-o:before{content:"\f257"}.fa-hand-lizard-o:before{content:"\f258"}.fa-hand-spock-o:before{content:"\f259"}.fa-hand-pointer-o:before{content:"\f25a"}.fa-hand-peace-o:before{content:"\f25b"}.fa-trademark:before{content:"\f25c"}.fa-registered:before{content:"\f25d"}.fa-creative-commons:before{content:"\f25e"}.fa-gg:before{content:"\f260"}.fa-gg-circle:before{content:"\f261"}.fa-tripadvisor:before{content:"\f262"}.fa-odnoklassniki:before{content:"\f263"}.fa-odnoklassniki-square:before{content:"\f264"}.fa-get-pocket:before{content:"\f265"}.fa-wikipedia-w:before{content:"\f266"}.fa-safari:before{content:"\f267"}.fa-chrome:before{content:"\f268"}.fa-firefox:before{content:"\f269"}.fa-opera:before{content:"\f26a"}.fa-internet-explorer:before{content:"\f26b"}.fa-television:before,.fa-tv:before{content:"\f26c"}.fa-contao:before{content:"\f26d"}.fa-500px:before{content:"\f26e"}.fa-amazon:before{content:"\f270"}.fa-calendar-plus-o:before{content:"\f271"}.fa-calendar-minus-o:before{content:"\f272"}.fa-calendar-times-o:before{content:"\f273"}.fa-calendar-check-o:before{content:"\f274"}.fa-industry:before{content:"\f275"}.fa-map-pin:before{content:"\f276"}.fa-map-signs:before{content:"\f277"}.fa-map-o:before{content:"\f278"}.fa-map:before{content:"\f279"}.fa-commenting:before{content:"\f27a"}.fa-commenting-o:before{content:"\f27b"}.fa-houzz:before{content:"\f27c"}.fa-vimeo:before{content:"\f27d"}.fa-black-tie:before{content:"\f27e"}.fa-fonticons:before{content:"\f280"}.fa-reddit-alien:before{content:"\f281"}.fa-edge:before{content:"\f282"}.fa-credit-card-alt:before{content:"\f283"}.fa-codiepie:before{content:"\f284"}.fa-modx:before{content:"\f285"}.fa-fort-awesome:before{content:"\f286"}.fa-usb:before{content:"\f287"}.fa-product-hunt:before{content:"\f288"}.fa-mixcloud:before{content:"\f289"}.fa-scribd:before{content:"\f28a"}.fa-pause-circle:before{content:"\f28b"}.fa-pause-circle-o:before{content:"\f28c"}.fa-stop-circle:before{content:"\f28d"}.fa-stop-circle-o:before{content:"\f28e"}.fa-shopping-bag:before{content:"\f290"}.fa-shopping-basket:before{content:"\f291"}.fa-hashtag:before{content:"\f292"}.fa-bluetooth:before{content:"\f293"}.fa-bluetooth-b:before{content:"\f294"}.fa-percent:before{content:"\f295"}.fa-gitlab:before{content:"\f296"}.fa-wpbeginner:before{content:"\f297"}.fa-wpforms:before{content:"\f298"}.fa-envira:before{content:"\f299"}.fa-universal-access:before{content:"\f29a"}.fa-wheelchair-alt:before{content:"\f29b"}.fa-question-circle-o:before{content:"\f29c"}.fa-blind:before{content:"\f29d"}.fa-audio-description:before{content:"\f29e"}.fa-volume-control-phone:before{content:"\f2a0"}.fa-braille:before{content:"\f2a1"}.fa-assistive-listening-systems:before{content:"\f2a2"}.fa-american-sign-language-interpreting:before,.fa-asl-interpreting:before{content:"\f2a3"}.fa-deaf:before,.fa-deafness:before,.fa-hard-of-hearing:before{content:"\f2a4"}.fa-glide:before{content:"\f2a5"}.fa-glide-g:before{content:"\f2a6"}.fa-sign-language:before,.fa-signing:before{content:"\f2a7"}.fa-low-vision:before{content:"\f2a8"}.fa-viadeo:before{content:"\f2a9"}.fa-viadeo-square:before{content:"\f2aa"}.fa-snapchat:before{content:"\f2ab"}.fa-snapchat-ghost:before{content:"\f2ac"}.fa-snapchat-square:before{content:"\f2ad"}.fa-pied-piper:before{content:"\f2ae"}.fa-first-order:before{content:"\f2b0"}.fa-yoast:before{content:"\f2b1"}.fa-themeisle:before{content:"\f2b2"}.fa-google-plus-circle:before,.fa-google-plus-official:before{content:"\f2b3"}.fa-fa:before,.fa-font-awesome:before{content:"\f2b4"}.fa-handshake-o:before{content:"\f2b5"}.fa-envelope-open:before{content:"\f2b6"}.fa-envelope-open-o:before{content:"\f2b7"}.fa-linode:before{content:"\f2b8"}.fa-address-book:before{content:"\f2b9"}.fa-address-book-o:before{content:"\f2ba"}.fa-address-card:before,.fa-vcard:before{content:"\f2bb"}.fa-address-card-o:before,.fa-vcard-o:before{content:"\f2bc"}.fa-user-circle:before{content:"\f2bd"}.fa-user-circle-o:before{content:"\f2be"}.fa-user-o:before{content:"\f2c0"}.fa-id-badge:before{content:"\f2c1"}.fa-drivers-license:before,.fa-id-card:before{content:"\f2c2"}.fa-drivers-license-o:before,.fa-id-card-o:before{content:"\f2c3"}.fa-quora:before{content:"\f2c4"}.fa-free-code-camp:before{content:"\f2c5"}.fa-telegram:before{content:"\f2c6"}.fa-thermometer-4:before,.fa-thermometer-full:before,.fa-thermometer:before{content:"\f2c7"}.fa-thermometer-3:before,.fa-thermometer-three-quarters:before{content:"\f2c8"}.fa-thermometer-2:before,.fa-thermometer-half:before{content:"\f2c9"}.fa-thermometer-1:before,.fa-thermometer-quarter:before{content:"\f2ca"}.fa-thermometer-0:before,.fa-thermometer-empty:before{content:"\f2cb"}.fa-shower:before{content:"\f2cc"}.fa-bath:before,.fa-bathtub:before,.fa-s15:before{content:"\f2cd"}.fa-podcast:before{content:"\f2ce"}.fa-window-maximize:before{content:"\f2d0"}.fa-window-minimize:before{content:"\f2d1"}.fa-window-restore:before{content:"\f2d2"}.fa-times-rectangle:before,.fa-window-close:before{content:"\f2d3"}.fa-times-rectangle-o:before,.fa-window-close-o:before{content:"\f2d4"}.fa-bandcamp:before{content:"\f2d5"}.fa-grav:before{content:"\f2d6"}.fa-etsy:before{content:"\f2d7"}.fa-imdb:before{content:"\f2d8"}.fa-ravelry:before{content:"\f2d9"}.fa-eercast:before{content:"\f2da"}.fa-microchip:before{content:"\f2db"}.fa-snowflake-o:before{content:"\f2dc"}.fa-superpowers:before{content:"\f2dd"}.fa-wpexplorer:before{content:"\f2de"}.fa-meetup:before{content:"\f2e0"}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}canvas{image-rendering:optimizeSpeed;image-rendering:-moz-crisp-edges;image-rendering:-webkit-optimize-contrast;image-rendering:-o-crisp-edges;image-rendering:crisp-edges;-ms-interpolation-mode:nearest-neighbor}body,html{margin:0!important;font-family:Lato,sans-serif;height:auto;background:0 0}*{box-sizing:border-box}p{margin:0;padding:0;font-weight:400;font-size:12px}span{margin:0;padding:0;font-size:10px;font-weight:400}ul{margin:0;padding:0}ul li{list-style-type:none}.light{font-weight:200}.heavy{font-weight:800}.upperCase{text-transform:uppercase}.white{color:#fff}.red{color:#ed364c}.ltblue{color:#33c3ff}.blue{color:#3098ff}.green{color:#6ece1a}.pink{color:#fc70cf}.gray{color:#878787}.button{padding:10px;text-align:center;border-radius:25px;cursor:pointer}.widget_container{position:relative;overflow:hidden;width:100%;height:250px}#trivia_ad_zone{width:300px;height:250px;position:absolute;top:0;right:0}.trivia_container_footer{position:absolute;z-index:6;width:100%;padding:0 4px 1px 4px;bottom:0;text-align:right;background:#f2f2f2}.trivia_container_footer img{display:inline-block;vertical-align:middle;margin-right:2px}.trivia_container_footer p{display:inline-block;vertical-align:middle;width:auto;font-size:10px;color:#666}#trivia_container{position:relative;width:calc(100% - 300px);height:100%}#submission_overlay_image{visibility:hidden}#trivia_container.correct_submission #submission_overlay,#trivia_container.incorrect_submission #submission_overlay{visibility:visible;opacity:1;overflow:hidden}#trivia_container.correct_submission #submission_overlay:before{position:absolute;content:\'\';opacity:.75;width:100%;height:100%;background:#429321;background:-webkit-linear-gradient(left,#429321 0,#b4ed50 100%);background:linear-gradient(to right,#429321 0,#b4ed50 100%)}#trivia_container.incorrect_submission #submission_overlay:before{position:absolute;content:\'\';opacity:.75;width:100%;height:100%;background:#9f031b;background:-webkit-linear-gradient(left,#9f031b 0,#f5515f 100%);background:linear-gradient(to right,#9f031b 0,#f5515f 100%)}#trivia_container.correct_submission #submission_overlay .submission_display_container,#trivia_container.incorrect_submission #submission_overlay .submission_display_container{visibility:visible;left:0}#submission_overlay{visibility:hidden;opacity:0;position:absolute;z-index:3;width:calc(100% - 259px);min-width:314px;height:100%;transition:all .5s ease-in-out;-webkit-transition:all .5s ease-in-out}.submission_display_container{position:absolute;visibility:hidden;width:100%;top:0;right:0;left:100%;bottom:0;margin:0 auto;text-align:center;-webkit-transition:left .25s ease-in-out 1s;transition:left .25s ease-in-out 1s}.submission_display_container.hidden{-webkit-transition:left 0s ease-in-out;transition:left 0s ease-in-out}.submission_result_text_container{position:absolute;height:75px;top:68px;right:0;left:0;text-align:center}.check_mark_container{position:relative;display:inline-block;height:8.8vw;width:8.8vw;max-height:95px;max-width:95px;margin-right:15px;border-radius:50%;background:#fff;vertical-align:middle}.check_mark_container .check_mark,.check_mark_container .x{display:none;position:absolute;top:34%;right:0;left:0;margin:0 auto;font-size:30px;color:#4a4a4a;width:36%;height:36%}#trivia_container.correct_submission .check_mark{display:block;width:53%;top:31%;height:40%}#trivia_container.incorrect_submission .x{display:block}p.submission_display{position:relative;display:inline-block;font-size:calc(1em + 2vw);text-align:center;text-transform:uppercase;color:#fff;vertical-align:middle}#next_question{position:absolute;right:0;left:0;margin:0 auto;bottom:10px;width:calc(100% - 20px);font-size:12px;border:1px solid #444;-webkit-transition:all .125s ease-in-out;transition:all .125s ease-in-out}#next_question p{color:#444;font-size:14px;line-height:14px}#next_question:hover{background:#fff}#next_question:hover p{color:#444}#completed_overlay.hidden{visibility:hidden}#completed_overlay{visibility:visible;position:absolute;overflow:hidden;z-index:5;top:0;width:calc(100% - 300px);height:100%;background:#9f031b;background:-webkit-linear-gradient(left,#3098ff 0,#34d4ff 100%);background:linear-gradient(to right,#3098ff 0,#34d4ff 100%)}#completed_overlay .restart{padding-top:20px;color:#fff;font-size:12px;text-transform:uppercase;cursor:pointer}.restart i{position:absolute;margin-left:-17px;width:13px;height:12px;background-image:url(../images/icon-try-again.png);margin-right:2px;-webkit-transform:rotate(0);transform:rotate(0);-webkit-transition:transform .45s ease-in-out;-webkit-transition:-webkit-transform .45s ease-in-out;transition:-webkit-transform .45s ease-in-out;transition:transform .45s ease-in-out;transition:transform .45s ease-in-out,-webkit-transform .45s ease-in-out}.restart:hover i{-webkit-transform:rotate(360deg);transform:rotate(360deg)}.try_again{color:#fff;font-size:12px;text-transform:uppercase;cursor:pointer;line-height:12px;position:relative;bottom:2px}#completed_overlay.show .results_container{opacity:1;text-align:center;clear:both;-webkit-transform:scale(1);transform:scale(1);-webkit-transition:all .2s ease-in-out;transition:all .5s ease-in-out;border-right:1px solid rgba(255,255,255,.32);height:150px}#completed_overlay.hidden .results_container{opacity:0;-webkit-transform:scale(1.65);transform:scale(1.65)}.results_container{width:42.5%;position:relative;left:0;right:0;top:40px}.results_container p.comment{color:#fff;font-size:38px;letter-spacing:2.1px;text-transform:uppercase;margin-bottom:10px}.score_container{overflow:hidden;text-align:center;margin-bottom:10px}.score_container .icon{position:relative;display:inline-block;height:50px;width:50px;border-radius:50%;vertical-align:middle;background:#fff}.score_container .icon .check_mark{position:absolute;top:14px;right:0;left:0;margin:0 auto;font-size:20px;height:21.3px;width:27.5px}.score_container .score{display:inline-block;vertical-align:middle;text-align:left;padding-left:10px}.score_container .score p{display:block;font-weight:300;font-size:22px;text-transform:uppercase;color:#fff}#completed_overlay .results_container .score_container .score p.results,#completed_overlay .results_container .score_container .score p.results span{font-size:30px;line-height:30px}#completed_overlay .results_container .share_container p{font-size:16px;color:#fff;text-transform:uppercase;margin-bottom:5px}li.sm_icon{position:relative;display:inline-block;height:35px;width:35px;margin:0 2px;border-radius:50%;border:1px solid #fff;cursor:pointer;-webkit-transition:all .125s ease-in-out;transition:all .125s ease-in-out}li.sm_icon i{color:#fff}li.sm_icon:hover{background:#fff}li.sm_icon:hover i{color:#3098ff}li.sm_icon i{position:absolute;top:8px;right:0;left:0;margin:0 auto}.other_content_container{position:absolute;width:55%;right:0;margin:0 auto;top:46px;text-align:center}.other_content_container p{margin-bottom:5px;font-size:16px;color:#fff}.other_content_option_container{display:inline-block;margin:20px 4px;position:relative;height:70px;width:70px;color:#fff;border-radius:50%;cursor:pointer;background-size:cover;background-position:center;perspective:1000px;transform-style:preserve-3d}.other_content_option_container .animation_container{position:relative}.other_content_option_container .animation_container{position:absolute;width:70px;height:70px;top:0;left:0;border:1px solid #fff;border-radius:50%;background-size:cover;background-position:center center;-webkit-backface-visibility:hidden;backface-visibility:hidden;transform-style:preserve-3d}.other_content_option_container .animation_container,.other_content_option_container.random_option{z-index:2;transform:scale(1.75);opacity:0}#completed_overlay.show .other_content_option_container .animation_container,#completed_overlay.show .other_content_option_container.random_option{transform:scale(1);opacity:1}#completed_overlay.hidden .other_content_option_container .animation_container,#completed_overlay.hidden .other_content_option_container.random_option{transition:all 0s}.other_content_option_container:nth-child(1) .animation_container{-webkit-transition:all .25s ease-in-out .25s;transition:all .25s ease-in-out .25s}.other_content_option_container:nth-child(2) .animation_container{-webkit-transition:all .25s ease-in-out .25s;transition:all .25s ease-in-out .25s}.other_content_option_container:nth-child(3) .animation_container{-webkit-transition:all .25s ease-in-out .25s;transition:all .25s ease-in-out .25s}.other_content_option_container:nth-child(4).random_option .animation_container{-webkit-transition:all .25s ease-in-out .25s;transition:all .25s ease-in-out .25s}.other_content_title{font-size:18px;font-weight:300;color:#fff}.animation_container-box{position:absolute;top:75px;left:0;right:0}.animation_container-box p{font-size:10px;margin:0 0 2px 0}.animation_container-box p:first-child{font-weight:800}.animation_container-box p:nth-child(2){font-weight:300}.other_content_option_container.random_option{-webkit-transition:opacity .5s ease-in-out .25s,transform .25s ease-in-out .25s,background .25s ease-in-out,color .25s ease-in-out;transition:opacity .5s ease-in-out .25s,transform .25s ease-in-out .25s,background .25s ease-in-out,color .25s ease-in-out}.other_content_option_container.random_option:hover{background:#fff}.other_content_option_container.random_option i{position:absolute;top:16px;left:17px;margin:0 auto;font-size:36px;color:#fff;transition:color .25s ease-in-out;-webkit-transition:color .25s ease-in-out}.other_content_option_container.random_option:hover i{color:#2eb5ff}.no_transition{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;transition:none!important}.trivia_image_container{position:relative;width:calc(100% - 259px);height:231px;background-size:cover;background-position:top}.trivia_image_container::before{content:\'\';background:#000;opacity:.5}.trivia_image{position:absolute;z-index:1;height:100%;width:100%;background-size:cover;background-position:center center;transition:filter .25s ease-in-out;-webkit-transition:filter .25s ease-in-out;float:left}.trivia_image_background{display:none}#trivia_container.correct_submission .trivia_image,#trivia_container.incorrect_submission .trivia_image{-webkit-filter:grayscale(100%);filter:grayscale(100%)}#trivia_container.correct_submission .trivia_question,#trivia_container.incorrect_submission .trivia_question{display:none}#progress_bar{position:absolute;z-index:2;height:3px;background:#3098ff}#interval_score_container{position:absolute;z-index:2;top:5px;left:2px;background:#000;padding:1px;color:#fff;font-size:8px;text-transform:uppercase}#interval_score_container span{position:relative;font-size:8px}.trivia_question{display:block;position:absolute;z-index:2;width:94.5%;padding:10px;margin:0 auto;right:0;left:0;bottom:20px;background:#fff;box-shadow:0 0 5px 0 rgba(0,0,0,.2);border:solid 1px #e1e1e1}.trivia_question p{width:100%;font-size:14px;text-align:center;color:#444;background:#fff}.trivia_options_container{overflow:hidden;display:block;position:absolute;width:259px;height:231px;background:#fff;top:0;right:0}#trivia_container.correct_submission .trivia_options_container,#trivia_container.incorrect_submission .trivia_options_container{display:none}.trivia_options{margin:0;padding:16px 5px 0 5px;text-align:center;list-style-type:none}.trivia_options .button{opacity:1;visibility:visible;position:relative;float:left;width:calc(100% - 10px);height:34px;margin:5px;border:1px solid #3098ff;-webkit-transition:all .125s ease-in-out;transition:all .125s ease-in-out}.trivia_options .button.hidden{opacity:0;visibility:hidden}.trivia_options .button:before{opacity:0;content:\'\';position:absolute;top:0;left:0;width:100%;height:100%;border-radius:25px;background:-webkit-linear-gradient(left,#3098ff 0,#3098ff 0,#34d4ff 100%);background:linear-gradient(to right,#3098ff 0,#3098ff 0,#34d4ff 100%);-webkit-transition:all .125s ease-in-out;transition:all .125s ease-in-out}.trivia_options .button.incorrect:before{background:-webkit-linear-gradient(left,#ed364c 0,#ed364c 0,#ed364c 100%);background:linear-gradient(to right,#ed364c 0,#ed364c 0,#ed364c 100%);-webkit-transition:all .125s ease-in-out;transition:all .125s ease-in-out}.trivia_options .button:hover{border:1px solid #fff;cursor:pointer}.trivia_options .button:hover:before{opacity:1}.trivia_options .button:hover p{z-index:1;color:#fff}.trivia_options .button p{position:absolute;display:inline-block;padding:5px;right:0;left:0;top:50%;transform:translateY(-50%);font-size:14px;line-height:14px;color:#666}.trivia_options_container_info{width:100%;padding:10px;overflow:auto;font-size:12px}.trivia_options_container_info .left{float:left;color:#999}.trivia_options_container_info .left i{margin-right:2px}.trivia_options_container_info .right{float:right}p#skip_question{cursor:pointer}p#skip_question:hover i{right:-2px}p#skip_question i{position:relative;right:0;-webkit-transition:right .125s ease-in-out;-webkit-transition:right .125s ease-in-out}.submission_info_container{visibility:hidden;display:block;position:absolute;height:231px;width:259px;padding:10px 10px 5px 10px;text-align:center;-webkit-transition:left .25s ease-in-out;transition:left .25s ease-in-out;top:0;right:100%}p.submission_info{font-size:12px;color:#444;position:relative;top:23px}.submission_analytics_container{position:absolute;top:87px;right:0;left:0;margin:0 auto;text-align:center;width:238px;height:90px;border:1px solid #e1e1e1}.results_left{width:122px}.results_right{width:109px}.submission_analytics_title_container{z-index:15}.submission_analytics_title{position:absolute;left:6px;top:-13px;padding:4px;text-transform:uppercase;background:#fff}.submission_analytics_title i{margin-right:2px}.results_charts_container{display:inline-block;margin:20px 0 5px 0;text-align:center;vertical-align:middle}.results_charts_container:nth-of-type(2){text-align:left;padding-left:10px}.results_charts_container:first-of-type{border-right:1px solid #ccc}.results_charts_container_intro{font-size:10px;margin-bottom:5px}#percentage_of_guess{font-size:9px}.chart_container{position:relative;display:inline-block;text-align:center}.chart_container:first-of-type{left:-3px}.chart_container:last-of-type{right:-6px}.results_chart{display:block;position:relative;height:1em;width:1em;margin:0 auto 2px auto;border-radius:50%}.results_chart .slice{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.results_chart.green .slice{-webkit-transition:transform .125s ease-in-out .25s;-webkit-transition:-webkit-transform .125s ease-in-out .25s;transition:-webkit-transform .125s ease-in-out .25s;transition:transform .125s ease-in-out .25s;transition:transform .125s ease-in-out .25s,-webkit-transform .125s ease-in-out .25s}.results_chart.red .slice{-webkit-transition:transform .125s ease-in-out .35s;-webkit-transition:-webkit-transform .125s ease-in-out .35s;transition:-webkit-transform .125s ease-in-out .35s;transition:transform .125s ease-in-out .35s;transition:transform .125s ease-in-out .35s,-webkit-transform .125s ease-in-out .35s}.results_chart.blue .slice{-webkit-transition:transform .125s ease-in-out .45s;-webkit-transition:-webkit-transform .125s ease-in-out .45s;transition:-webkit-transform .125s ease-in-out .45s;transition:transform .125s ease-in-out .45s;transition:transform .125s ease-in-out .45s,-webkit-transform .125s ease-in-out .45s}.results_chart.pink .slice{-webkit-transition:transform .125s ease-in-out .55s;-webkit-transition:-webkit-transform .125s ease-in-out .55s;transition:-webkit-transform .125s ease-in-out .55s;transition:transform .125s ease-in-out .55s;transition:transform .125s ease-in-out .55s,-webkit-transform .125s ease-in-out .55s}#trivia_container.correct_submission .slice,#trivia_container.incorrect_submission .slice{-webkit-transform:rotate(0);transform:rotate(0)}.results_chart_label{display:block;font-size:10px;color:#999;position:relative;left:-3px}.results_chart_label span{font-size:10px;margin-left:2px}#trivia_container.correct_submission .submission_info_container,#trivia_container.incorrect_submission .submission_info_container{visibility:visible;right:0}.c100 .p100 .slice,.c100 .p51 .slice,.c100 .p52 .slice,.c100 .p53 .slice,.c100 .p54 .slice,.c100 .p55 .slice,.c100 .p56 .slice,.c100 .p57 .slice,.c100 .p58 .slice,.c100 .p59 .slice,.c100 .p60 .slice,.c100 .p61 .slice,.c100 .p62 .slice,.c100 .p63 .slice,.c100 .p64 .slice,.c100 .p65 .slice,.c100 .p66 .slice,.c100 .p67 .slice,.c100 .p68 .slice,.c100 .p69 .slice,.c100 .p70 .slice,.c100 .p71 .slice,.c100 .p72 .slice,.c100 .p73 .slice,.c100 .p74 .slice,.c100 .p75 .slice,.c100 .p76 .slice,.c100 .p77 .slice,.c100 .p78 .slice,.c100 .p79 .slice,.c100 .p80 .slice,.c100 .p81 .slice,.c100 .p82 .slice,.c100 .p83 .slice,.c100 .p84 .slice,.c100 .p85 .slice,.c100 .p86 .slice,.c100 .p87 .slice,.c100 .p88 .slice,.c100 .p89 .slice,.c100 .p90 .slice,.c100 .p91 .slice,.c100 .p92 .slice,.c100 .p93 .slice,.c100 .p94 .slice,.c100 .p95 .slice,.c100 .p96 .slice,.c100 .p97 .slice,.c100 .p98 .slice,.c100 .p99 .slice,.rect-auto{clip:rect(auto,auto,auto,auto)}.c100 .bar,.c100 .p100 .fill,.c100 .p51 .fill,.c100 .p52 .fill,.c100 .p53 .fill,.c100 .p54 .fill,.c100 .p55 .fill,.c100 .p56 .fill,.c100 .p57 .fill,.c100 .p58 .fill,.c100 .p59 .fill,.c100 .p60 .fill,.c100 .p61 .fill,.c100 .p62 .fill,.c100 .p63 .fill,.c100 .p64 .fill,.c100 .p65 .fill,.c100 .p66 .fill,.c100 .p67 .fill,.c100 .p68 .fill,.c100 .p69 .fill,.c100 .p70 .fill,.c100 .p71 .fill,.c100 .p72 .fill,.c100 .p73 .fill,.c100 .p74 .fill,.c100 .p75 .fill,.c100 .p76 .fill,.c100 .p77 .fill,.c100 .p78 .fill,.c100 .p79 .fill,.c100 .p80 .fill,.c100 .p81 .fill,.c100 .p82 .fill,.c100 .p83 .fill,.c100 .p84 .fill,.c100 .p85 .fill,.c100 .p86 .fill,.c100 .p87 .fill,.c100 .p88 .fill,.c100 .p89 .fill,.c100 .p90 .fill,.c100 .p91 .fill,.c100 .p92 .fill,.c100 .p93 .fill,.c100 .p94 .fill,.c100 .p95 .fill,.c100 .p96 .fill,.c100 .p97 .fill,.c100 .p98 .fill,.c100 .p99 .fill,.pie{position:absolute;border:.08em solid #307bbb;width:.84em;height:.84em;clip:rect(0,.5em,1em,0);border-radius:50%;-webkit-transform:rotate(0);transform:rotate(0)}.c100 .p100 .bar:after,.c100 .p100 .fill,.c100 .p51 .bar:after,.c100 .p51 .fill,.c100 .p52 .bar:after,.c100 .p52 .fill,.c100 .p53 .bar:after,.c100 .p53 .fill,.c100 .p54 .bar:after,.c100 .p54 .fill,.c100 .p55 .bar:after,.c100 .p55 .fill,.c100 .p56 .bar:after,.c100 .p56 .fill,.c100 .p57 .bar:after,.c100 .p57 .fill,.c100 .p58 .bar:after,.c100 .p58 .fill,.c100 .p59 .bar:after,.c100 .p59 .fill,.c100 .p60 .bar:after,.c100 .p60 .fill,.c100 .p61 .bar:after,.c100 .p61 .fill,.c100 .p62 .bar:after,.c100 .p62 .fill,.c100 .p63 .bar:after,.c100 .p63 .fill,.c100 .p64 .bar:after,.c100 .p64 .fill,.c100 .p65 .bar:after,.c100 .p65 .fill,.c100 .p66 .bar:after,.c100 .p66 .fill,.c100 .p67 .bar:after,.c100 .p67 .fill,.c100 .p68 .bar:after,.c100 .p68 .fill,.c100 .p69 .bar:after,.c100 .p69 .fill,.c100 .p70 .bar:after,.c100 .p70 .fill,.c100 .p71 .bar:after,.c100 .p71 .fill,.c100 .p72 .bar:after,.c100 .p72 .fill,.c100 .p73 .bar:after,.c100 .p73 .fill,.c100 .p74 .bar:after,.c100 .p74 .fill,.c100 .p75 .bar:after,.c100 .p75 .fill,.c100 .p76 .bar:after,.c100 .p76 .fill,.c100 .p77 .bar:after,.c100 .p77 .fill,.c100 .p78 .bar:after,.c100 .p78 .fill,.c100 .p79 .bar:after,.c100 .p79 .fill,.c100 .p80 .bar:after,.c100 .p80 .fill,.c100 .p81 .bar:after,.c100 .p81 .fill,.c100 .p82 .bar:after,.c100 .p82 .fill,.c100 .p83 .bar:after,.c100 .p83 .fill,.c100 .p84 .bar:after,.c100 .p84 .fill,.c100 .p85 .bar:after,.c100 .p85 .fill,.c100 .p86 .bar:after,.c100 .p86 .fill,.c100 .p87 .bar:after,.c100 .p87 .fill,.c100 .p88 .bar:after,.c100 .p88 .fill,.c100 .p89 .bar:after,.c100 .p89 .fill,.c100 .p90 .bar:after,.c100 .p90 .fill,.c100 .p91 .bar:after,.c100 .p91 .fill,.c100 .p92 .bar:after,.c100 .p92 .fill,.c100 .p93 .bar:after,.c100 .p93 .fill,.c100 .p94 .bar:after,.c100 .p94 .fill,.c100 .p95 .bar:after,.c100 .p95 .fill,.c100 .p96 .bar:after,.c100 .p96 .fill,.c100 .p97 .bar:after,.c100 .p97 .fill,.c100 .p98 .bar:after,.c100 .p98 .fill,.c100 .p99 .bar:after,.c100 .p99 .fill,.pie-fill{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.c100{position:relative;font-size:120px;border-radius:50%;background-color:#e1e1e1}.c100 *,.c100 :after,.c100 :before{box-sizing:content-box}.c100.center{float:none;margin:0 auto}.c100.big{font-size:240px}.c100.small{font-size:40px}span.results_chart_value{position:absolute;width:100%;z-index:1;right:0;left:0;top:13px;margin:0 auto;font-size:10px;color:#4a4a4a;text-align:center}.c100:after{position:absolute;top:.075em;left:.075em;right:.075em;bottom:.075em;display:block;content:" ";border-radius:50%;background-color:#fff;-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:.2s;transition-duration:.2s;-webkit-transition-timing-function:ease-in;transition-timing-function:ease-in}.c100 .slice{position:absolute;top:0;width:1em;height:1em;clip:rect(0,1em,1em,.5em)}.c100 .p1 .bar{-webkit-transform:rotate(3.6deg);transform:rotate(3.6deg)}.c100 .p2 .bar{-webkit-transform:rotate(7.2deg);transform:rotate(7.2deg)}.c100 .p3 .bar{-webkit-transform:rotate(10.8deg);transform:rotate(10.8deg)}.c100 .p4 .bar{-webkit-transform:rotate(14.4deg);transform:rotate(14.4deg)}.c100 .p5 .bar{-webkit-transform:rotate(18deg);transform:rotate(18deg)}.c100 .p6 .bar{-webkit-transform:rotate(21.6deg);transform:rotate(21.6deg)}.c100 .p7 .bar{-webkit-transform:rotate(25.2deg);transform:rotate(25.2deg)}.c100 .p8 .bar{-webkit-transform:rotate(28.8deg);transform:rotate(28.8deg)}.c100 .p9 .bar{-webkit-transform:rotate(32.4deg);transform:rotate(32.4deg)}.c100 .p10 .bar{-webkit-transform:rotate(36deg);transform:rotate(36deg)}.c100 .p11 .bar{-webkit-transform:rotate(39.6deg);transform:rotate(39.6deg)}.c100 .p12 .bar{-webkit-transform:rotate(43.2deg);transform:rotate(43.2deg)}.c100 .p13 .bar{-webkit-transform:rotate(46.800000000000004deg);transform:rotate(46.800000000000004deg)}.c100 .p14 .bar{-webkit-transform:rotate(50.4deg);transform:rotate(50.4deg)}.c100 .p15 .bar{-webkit-transform:rotate(54deg);transform:rotate(54deg)}.c100 .p16 .bar{-webkit-transform:rotate(57.6deg);transform:rotate(57.6deg)}.c100 .p17 .bar{-webkit-transform:rotate(61.2deg);transform:rotate(61.2deg)}.c100 .p18 .bar{-webkit-transform:rotate(64.8deg);transform:rotate(64.8deg)}.c100 .p19 .bar{-webkit-transform:rotate(68.4deg);transform:rotate(68.4deg)}.c100 .p20 .bar{-webkit-transform:rotate(72deg);transform:rotate(72deg)}.c100 .p21 .bar{-webkit-transform:rotate(75.60000000000001deg);transform:rotate(75.60000000000001deg)}.c100 .p22 .bar{-webkit-transform:rotate(79.2deg);transform:rotate(79.2deg)}.c100 .p23 .bar{-webkit-transform:rotate(82.8deg);transform:rotate(82.8deg)}.c100 .p24 .bar{-webkit-transform:rotate(86.4deg);transform:rotate(86.4deg)}.c100 .p25 .bar{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.c100 .p26 .bar{-webkit-transform:rotate(93.60000000000001deg);transform:rotate(93.60000000000001deg)}.c100 .p27 .bar{-webkit-transform:rotate(97.2deg);transform:rotate(97.2deg)}.c100 .p28 .bar{-webkit-transform:rotate(100.8deg);transform:rotate(100.8deg)}.c100 .p29 .bar{-webkit-transform:rotate(104.4deg);transform:rotate(104.4deg)}.c100 .p30 .bar{-webkit-transform:rotate(108deg);transform:rotate(108deg)}.c100 .p31 .bar{-webkit-transform:rotate(111.60000000000001deg);transform:rotate(111.60000000000001deg)}.c100 .p32 .bar{-webkit-transform:rotate(115.2deg);transform:rotate(115.2deg)}.c100 .p33 .bar{-webkit-transform:rotate(118.8deg);transform:rotate(118.8deg)}.c100 .p34 .bar{-webkit-transform:rotate(122.4deg);transform:rotate(122.4deg)}.c100 .p35 .bar{-webkit-transform:rotate(126deg);transform:rotate(126deg)}.c100 .p36 .bar{-webkit-transform:rotate(129.6deg);transform:rotate(129.6deg)}.c100 .p37 .bar{-webkit-transform:rotate(133.20000000000002deg);transform:rotate(133.20000000000002deg)}.c100 .p38 .bar{-webkit-transform:rotate(136.8deg);transform:rotate(136.8deg)}.c100 .p39 .bar{-webkit-transform:rotate(140.4deg);transform:rotate(140.4deg)}.c100 .p40 .bar{-webkit-transform:rotate(144deg);transform:rotate(144deg)}.c100 .p41 .bar{-webkit-transform:rotate(147.6deg);transform:rotate(147.6deg)}.c100 .p42 .bar{-webkit-transform:rotate(151.20000000000002deg);transform:rotate(151.20000000000002deg)}.c100 .p43 .bar{-webkit-transform:rotate(154.8deg);transform:rotate(154.8deg)}.c100 .p44 .bar{-webkit-transform:rotate(158.4deg);transform:rotate(158.4deg)}.c100 .p45 .bar{-webkit-transform:rotate(162deg);transform:rotate(162deg)}.c100 .p46 .bar{-webkit-transform:rotate(165.6deg);transform:rotate(165.6deg)}.c100 .p47 .bar{-webkit-transform:rotate(169.20000000000002deg);transform:rotate(169.20000000000002deg)}.c100 .p48 .bar{-webkit-transform:rotate(172.8deg);transform:rotate(172.8deg)}.c100 .p49 .bar{-webkit-transform:rotate(176.4deg);transform:rotate(176.4deg)}.c100 .p50 .bar{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.c100 .p51 .bar{-webkit-transform:rotate(183.6deg);transform:rotate(183.6deg)}.c100 .p52 .bar{-webkit-transform:rotate(187.20000000000002deg);transform:rotate(187.20000000000002deg)}.c100 .p53 .bar{-webkit-transform:rotate(190.8deg);transform:rotate(190.8deg)}.c100 .p54 .bar{-webkit-transform:rotate(194.4deg);transform:rotate(194.4deg)}.c100 .p55 .bar{-webkit-transform:rotate(198deg);transform:rotate(198deg)}.c100 .p56 .bar{-webkit-transform:rotate(201.6deg);transform:rotate(201.6deg)}.c100 .p57 .bar{-webkit-transform:rotate(205.20000000000002deg);transform:rotate(205.20000000000002deg)}.c100 .p58 .bar{-webkit-transform:rotate(208.8deg);transform:rotate(208.8deg)}.c100 .p59 .bar{-webkit-transform:rotate(212.4deg);transform:rotate(212.4deg)}.c100 .p60 .bar{-webkit-transform:rotate(216deg);transform:rotate(216deg)}.c100 .p61 .bar{-webkit-transform:rotate(219.6deg);transform:rotate(219.6deg)}.c100 .p62 .bar{-webkit-transform:rotate(223.20000000000002deg);transform:rotate(223.20000000000002deg)}.c100 .p63 .bar{-webkit-transform:rotate(226.8deg);transform:rotate(226.8deg)}.c100 .p64 .bar{-webkit-transform:rotate(230.4deg);transform:rotate(230.4deg)}.c100 .p65 .bar{-webkit-transform:rotate(234deg);transform:rotate(234deg)}.c100 .p66 .bar{-webkit-transform:rotate(237.6deg);transform:rotate(237.6deg)}.c100 .p67 .bar{-webkit-transform:rotate(241.20000000000002deg);transform:rotate(241.20000000000002deg)}.c100 .p68 .bar{-webkit-transform:rotate(244.8deg);transform:rotate(244.8deg)}.c100 .p69 .bar{-webkit-transform:rotate(248.4deg);transform:rotate(248.4deg)}.c100 .p70 .bar{-webkit-transform:rotate(252deg);transform:rotate(252deg)}.c100 .p71 .bar{-webkit-transform:rotate(255.6deg);transform:rotate(255.6deg)}.c100 .p72 .bar{-webkit-transform:rotate(259.2deg);transform:rotate(259.2deg)}.c100 .p73 .bar{-webkit-transform:rotate(262.8deg);transform:rotate(262.8deg)}.c100 .p74 .bar{-webkit-transform:rotate(266.40000000000003deg);transform:rotate(266.40000000000003deg)}.c100 .p75 .bar{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.c100 .p76 .bar{-webkit-transform:rotate(273.6deg);transform:rotate(273.6deg)}.c100 .p77 .bar{-webkit-transform:rotate(277.2deg);transform:rotate(277.2deg)}.c100 .p78 .bar{-webkit-transform:rotate(280.8deg);transform:rotate(280.8deg)}.c100 .p79 .bar{-webkit-transform:rotate(284.40000000000003deg);transform:rotate(284.40000000000003deg)}.c100 .p80 .bar{-webkit-transform:rotate(288deg);transform:rotate(288deg)}.c100 .p81 .bar{-webkit-transform:rotate(291.6deg);transform:rotate(291.6deg)}.c100 .p82 .bar{-webkit-transform:rotate(295.2deg);transform:rotate(295.2deg)}.c100 .p83 .bar{-webkit-transform:rotate(298.8deg);transform:rotate(298.8deg)}.c100 .p84 .bar{-webkit-transform:rotate(302.40000000000003deg);transform:rotate(302.40000000000003deg)}.c100 .p85 .bar{-webkit-transform:rotate(306deg);transform:rotate(306deg)}.c100 .p86 .bar{-webkit-transform:rotate(309.6deg);transform:rotate(309.6deg)}.c100 .p87 .bar{-webkit-transform:rotate(313.2deg);transform:rotate(313.2deg)}.c100 .p88 .bar{-webkit-transform:rotate(316.8deg);transform:rotate(316.8deg)}.c100 .p89 .bar{-webkit-transform:rotate(320.40000000000003deg);transform:rotate(320.40000000000003deg)}.c100 .p90 .bar{-webkit-transform:rotate(324deg);transform:rotate(324deg)}.c100 .p91 .bar{-webkit-transform:rotate(327.6deg);transform:rotate(327.6deg)}.c100 .p92 .bar{-webkit-transform:rotate(331.2deg);transform:rotate(331.2deg)}.c100 .p93 .bar{-webkit-transform:rotate(334.8deg);transform:rotate(334.8deg)}.c100 .p94 .bar{-webkit-transform:rotate(338.40000000000003deg);transform:rotate(338.40000000000003deg)}.c100 .p95 .bar{-webkit-transform:rotate(342deg);transform:rotate(342deg)}.c100 .p96 .bar{-webkit-transform:rotate(345.6deg);transform:rotate(345.6deg)}.c100 .p97 .bar{-webkit-transform:rotate(349.2deg);transform:rotate(349.2deg)}.c100 .p98 .bar{-webkit-transform:rotate(352.8deg);transform:rotate(352.8deg)}.c100 .p99 .bar{-webkit-transform:rotate(356.40000000000003deg);transform:rotate(356.40000000000003deg)}.c100 .p100 .bar{-webkit-transform:rotate(360deg);transform:rotate(360deg)}.c100.dark{background-color:#777}.c100.dark .bar,.c100.dark .fill{border-color:#c6ff00!important}.c100.dark>span{color:#777}.c100.dark:after{background-color:#666}.c100.red .bar,.c100.red .fill{border-color:#ed364c!important}.c100.pink .bar,.c100.pink .fill{border-color:#fc70cf!important}.c100.blue .bar,.c100.blue .fill{border-color:#3098ff!important}.c100.green .bar,.c100.green .fill{border-color:#4db53c!important}.ad_location{width:300px;height:250px;background-color:#ccc;position:absolute;bottom:0;right:0}@media (min-width:970px){p.submission_display{font-size:38px}}@media (max-width:965px){.results_container p.comment{font-size:3.8vw}.score_container .score p{font-size:2.3vw}#completed_overlay .results_container .score_container .score p.results,#completed_overlay .results_container .score_container .score p.results span{font-size:3.2vw}.other_content_title{font-size:1.8vw}.other_content_option_container{width:7vw;height:7vw}.other_content_option_container .animation_container{width:7vw;height:7vw}.other_content_option_container.random_option i{font-size:3.4vw;top:0;left:2vw;line-height:7vw}.animation_container-box{top:7.7vw}}@media (max-width:870px){.trivia_image_container{width:55%}.trivia_options_container{width:45%}}@media (min-width:650px) and (max-width:869px){.trivia_image_container{width:100%;height:97px}.trivia_options_container{position:relative;width:100%;height:136px;bottom:0}.trivia_image{-webkit-filter:blur(15px);-moz-filter:blur(15px);-o-filter:blur(15px);-ms-filter:blur(15px);filter:blur(15px);transform:scale(1.3)}.trivia_question{bottom:-20px}.trivia_options{padding:28px 5px 0 5px}.trivia_options .button{width:calc(100% - 52%);margin:3px 1%}.trivia_options_container_info{padding:5px 10px}.trivia_image_overlay{overflow:hidden;width:100%;height:97px;position:absolute}.trivia_image_background{display:block;background-color:rgba(0,0,0,.45);position:absolute;top:0;left:0;width:100%;height:100%}#submission_overlay{width:100%}#submission_overlay_image{visibility:visible}#completed_overlay.show .results_container{height:92px;border:none}.results_container{width:100%;top:20px}.results_container p.comment{font-size:32px;margin-bottom:8px}.score_container .icon{height:40px;width:40px}.score_container .icon .check_mark{top:11px;height:17px;width:22px}.score_container .score p{font-size:16px}#completed_overlay .results_container .score_container .score p.results,#completed_overlay .results_container .score_container .score p.results span{font-size:24px}.restart{position:absolute;top:-34px;right:6px}.other_content_container{position:relative;top:24px;width:100%}.other_content_title{font-size:16px}.other_content_options_container{position:relative;top:-15px}.other_content_option_container{width:60px;height:60px}.other_content_option_container .animation_container{width:60px;height:60px}.other_content_option_container.random_option i{font-size:30px;top:0;left:15px;line-height:60px}.animation_container-box{top:60px;overflow:hidden;height:25px}.animation_container-box p{margin:0}.animation_container-box p:nth-child(2){display:none}.submission_result_text_container{top:11px}.check_mark_container{height:35px;width:35px;margin-right:6px}.check_mark_container .check_mark,.check_mark_container .x{top:11px;width:20px;height:15px}p.submission_display{font-size:30px}.submission_info_container{width:100%;z-index:4}#next_question{top:57px;bottom:auto;width:329px;border-color:#fff}p.submission_info{color:#fff;top:100px}.submission_analytics_container{top:151px;width:329px;height:70px;border-color:#fff;background-color:transparent;border-top:none}.ltblue,.submission_analytics_title{background:0 0;color:#fff;left:0}.results_charts_container{margin:10px 0 5px 0}.results_left{position:relative;left:-40px}.c100{background-color:transparent;box-shadow:inset 0 0 0 2px #ccc}.c100.green .bar,.c100.green .fill{border-color:#fff!important}#next_question p,.gray,.green,.red,.results_chart_label,span.results_chart_value{color:#fff}.c100.red .bar,.c100.red .fill{border-color:#fff!important}.c100:after{background-color:transparent}.results_charts_container:nth-of-type(2){padding-left:3px}.results_left{position:absolute;left:10px;width:122px;height:55px}.results_right{position:absolute;border-left:1px solid #fff;right:0;top:0;width:195px;height:49px;text-align:left;padding-left:9px;color:#fff}.border{display:table;white-space:nowrap}.border:before{border-top:1px solid #fff;content:\'\';display:table-cell;position:relative;top:8px;width:10px;right:5px}.border:after{border-top:1px solid #fff;content:\'\';display:table-cell;position:relative;top:8px;width:240px;left:5px}}@media (max-width:649px){.widget_container{width:300px;margin:0 auto}#trivia_container{width:100%;height:100%}.trivia_image_container{width:100%;height:97px}.trivia_image_overlay{overflow:hidden;width:100%;height:97px;position:absolute}.trivia_image{-webkit-filter:blur(15px);-moz-filter:blur(15px);-o-filter:blur(15px);-ms-filter:blur(15px);filter:blur(15px);transform:scale(1.3)}.trivia_image_background{display:block;background-color:rgba(0,0,0,.45);position:absolute;top:0;left:0;width:100%;height:100%}.trivia_options_container{position:relative;width:100%;height:136px;top:12px}.trivia_question{width:94.5%;bottom:-20px}.trivia_options .button{width:calc(100% - 52%);margin:3px 1%}.trivia_options_container_info{width:100%;padding:3px 10px}#completed_overlay{width:100%;height:100%}#completed_overlay.show .results_container{height:92px}.results_container{width:100%;top:20px}.results_container p.comment{font-size:32px;margin-bottom:3px}.score_container .icon{height:40px;width:40px}.score_container .icon .check_mark{top:11px;height:17px;width:22px}.score_container .score p{font-size:16px}#completed_overlay .results_container .score_container .score p.results,#completed_overlay .results_container .score_container .score p.results span{font-size:24px}.restart{position:absolute;top:-34px;right:6px}.other_content_container{position:relative;top:24px;width:100%}.other_content_title{font-size:16px}.other_content_options_container{position:relative;top:-15px}.other_content_option_container{width:60px;height:60px}.other_content_option_container .animation_container{width:60px;height:60px}.other_content_option_container.random_option i{font-size:30px;top:0;left:15px;line-height:60px}.animation_container-box{top:60px;overflow:hidden;height:25px}.animation_container-box p{margin:0;font-size:10px}.animation_container-box p:nth-child(2){display:none}#submission_overlay{width:100%;height:100%;min-width:300px;z-index:3}p.submission_display{font-size:30px}.ltblue,.submission_analytics_title{background:0 0;color:#fff;left:0}.check_mark_container{height:35px;width:35px;margin-right:6px}.check_mark_container .check_mark,.check_mark_container .x{top:11px;width:20px;height:15px}.submission_result_text_container{top:11px}.submission_info_container{top:0;height:231px;width:100%}#next_question{top:57px;bottom:auto;width:280px;border:1px solid #fff;z-index:3}#next_question p{color:#fff}.submission_analytics_container{top:151px;width:280px;height:70px;border-top:none;z-index:3}p.submission_info{top:100px;font-size:12px;color:#fff;z-index:3}.results_charts_container:nth-of-type(2){padding-left:3px}.results_charts_container{margin:10px 0 5px 0}.results_left{position:relative;left:-72px;width:122px;height:55px}.results_right{position:absolute;border-left:1px solid #fff;right:0;top:0;width:140px;height:49px;text-align:left;padding-left:9px;color:#fff}.border{display:table;white-space:nowrap}.border:before{border-top:1px solid #fff;content:\'\';display:table-cell;position:relative;top:8px;width:10px;right:5px}.border:after{border-top:1px solid #fff;content:\'\';display:table-cell;position:relative;top:8px;width:240px;left:5px}.c100{background-color:transparent;box-shadow:inset 0 0 0 2px #ccc}.c100.green .bar,.c100.green .fill{border-color:#fff!important}#next_question p,.gray,.green,.red,.results_chart_label,span.results_chart_value{color:#fff}.c100.red .bar,.c100.red .fill{border-color:#fff!important}.c100:after{background-color:transparent}#ad_progress_bar{position:absolute;bottom:0;z-index:100;height:3px;background:#3098ff}}';
var friendlyIframe;
var friendlyIframeWindow;
var $;
var wideWidget = false; // flag that changes certain functions to run differently (default = false)
var isSmall = false; //determine if the screen size is less than 650px
var isMobile = false; //checks whether or not user agent is mobile
var removeAd = false; //flag to keep the ad hidden if the user is on the correct, incorrect, or submission sections and the screen size changes
var isActive = false;
var timeToLive = 600000;
var triviaStarted = false; //flag to signify that the user has began the quiz and to stop the quiz from restarting
var swapImage = true; //flag to change the image once the user goes to a new question or the question rotates whilst the widget is inactive

function createFriendlyIframe() {
    //create friendly iframe to place ourselves inside
    friendlyIframe = document.createElement('iframe');

    // friendlyIframe.id = "friendlyIframe_" + countSelf.length;
    friendlyIframe.className = "twiframe";
    friendlyIframe.width = '300';
    friendlyIframe.height = 600 - 250; //250 is the add height
    friendlyIframe.scrolling = 'no';
    friendlyIframe.style.overflow = 'hidden';
    friendlyIframe.name = currentScript.src;
    friendlyIframe.style.border = 'none';

    currentScript.parentNode.insertBefore(friendlyIframe, currentScript);

    //after getting querystring from js or iframe search query set currentScript to black
    friendlyIframeWindow = friendlyIframe.contentWindow;

    //create inline html for friendlyIframe
    friendlyIframeWindow.document.open();
    friendlyIframeWindow.document.write(htmlFile);
    // friendlyIframeWindow.document.write(htmlFile + "<scr"+"ipt type='text/javascript'>triviaWidget = "+ triviaWidget() +"</scr"+"ipt>");
    friendlyIframeWindow.document.close();

    // create variable to be used similar to jquery for id's
    $ = function (e) { // create a simple version for grabbing id's of elements
        return friendlyIframeWindow.document.getElementById(e)
    };

    //listen to when the iframe window content has returned and send in the srcQuery if there is one before it gets
    if (friendlyIframeWindow.document.readyState == "complete" || friendlyIframeWindow.document.readyState == "interactive") { // if page is already loaded'
        setupIframe();
    } else { // else once page has finished loading, so as not to slowdown the page load at all
        friendlyIframeWindow.document.onreadystatechange = function () {
            if (friendlyIframeWindow.document.readyState == "complete" || friendlyIframeWindow.document.readyState == "interactive") {
                setupIframe();
            }
        }
    }
}

function setupIframe() {
    var srcQuery = currentScript.src.split("js?")[1];
    //determine if a query string is after the index.html location || if query is after a javascript location
    var hostname = new RegExp(document.location.hostname);
    //TODO Make a better way to test locally.
    if (srcQuery != "" && srcQuery != null) {
        try {
            query = JSON.parse(decodeURIComponent(srcQuery).replace(/'/g, '"'));
        } catch (e) {
            console.log(e);
        }
    } else {
        if ((hostname.test('localhost') || hostname.test('w1.synapsys.us') || hostname.test('dev-w1.synapsys.us') || hostname.test('homestead.widgets')) && (document.location.search != null && document.location.search != '')) {
            query = JSON.parse(decodeURIComponent(document.location.search.substr(1)));
            // listRand = query.rand ? query.rand : Math.floor((Math.random() * 100) + 1);
            // listRand = Math.floor((Math.random() * 100) + 1);
            //FIRST THING IS SETUP ENVIRONMENTS
        }
    }

    currentScript.src = 'about:blank'; // remove src of the script to about:blank to allow more than one widget to counter IE

    //create inline style for friendlyIframe
    var style = friendlyIframeWindow.document.createElement("link");
    style.type = 'text/css';
    style.rel = 'stylesheet';
    if (query.wide != null && query.wide != '') {
        friendlyIframe.width = friendlyIframe.parentNode.clientWidth - 300; //300 being the width
        // friendlyIframe.style.maxWidth = '992px';
        friendlyIframe.height = '250';

        //CREATE LISTENER FOR RESIZE
        window.addEventListener('resize', function () {
            //set iframe to width of parent node
            friendlyIframe.width = friendlyIframe.parentNode.clientWidth;
        }, true);
        style.href = './min/wide_styles.min.css';
        wideWidget = true; //set wide flag
        //grab the sibling igloo element and inject it inside the trivia CU where we can control it


        // console.log('pause AD');
        var triviaAdZone = $('trivia_ad_zone');
        triviaAdZone.style.display = 'none';
        parent[query.pause_variable] = false; //pause ad if its in view
        //TODO This needs to be reworked so that the ad is not within the widget's html.
        //TODO Bring it back out then create functions to dynamically ad the styles
        //TODO needed for the progress bar and manipulate the ad via z-index.
        triviaAdZone.appendChild(friendlyIframe.parentElement.getElementsByClassName("widget_zone")[0]);
        triviaAdZone.getElementsByClassName("widget_zone")[0].style.opacity = 1;
        triviaAdZone.getElementsByClassName("widget_zone")[0].style.zIndex = 50;

    } else {
        friendlyIframe.width = 300;
        style.href = './min/standard_styles.min.css';
    }


    //append the css file into iframe head
    friendlyIframeWindow.document.head.appendChild(style);


    /*****************************************************Start Function calls*****************************************/

    //after you get the query you set the enironment
    setupEnvironment(query);
    triviaWidget();
}

/*ABOVE CODE NEEDS TO MERGE WITH CURRENT*/

// set initial content and variables to start trivia
var protocolToUse = (location.protocol == "https:") ? "https://" : "http://";
var postUrl = "https://dev-pa.synapsys.us/";
var apiCallUrl = "dev-tw-api.synapsys.us/index.php";
var imageUrl = "images.synapsys.us";
var query;
var embedURL = "main.import.js"; //TODO not an accurate or correct embed to look for
var currentScript = document.currentScript != null && document.currentScript.src.indexOf(embedURL) != -1 ? document.currentScript : (function () { // resolution for IE since it does not have currentScript to find the currently running script on the page
    var scripts = parent.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
        if (scripts[i].src.indexOf(embedURL) != -1) {
            return scripts[i];
        }
    }
})();

function getEnv(env) {
    if (env.match(/^localhost\./) != null || env.match(/^dev\./) != null) {
        env = "dev";
    } else if (env.match(/^qa\./) != null) {
        env = "qa";
    } else {
        env = "prod";
    }
    return env;
}

//DEPRECATED WILL BE REPLACED WITH getENV
function synapsysENV(env) {
    if (env.match(/^localhost\./) != null || env.match(/^dev\./) != null) {
        env = 'dev-';
    } else if (env.match(/^qa\./) == 'qa.') {
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
    query = widgetQuery;
    apiCallUrl = protocolToUse + apiCallUrl;
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
    log('category:    ' + cat, analyticsStyles);
    log('group:       ' + group, analyticsStyles);
    log('environment: ' + environment, analyticsStyles);
    log('env:         ' + env, analyticsStyles);

    if (cat && cat != '') {
        apiCallUrl += '?category=' + cat;
    } else {
        apiCallUrl += '?category=' + group;
    }
    log('API:         ' + apiCallUrl, analyticsStyles);
}

//STYLES used in console
var analyticsStyles = [
    'background: linear-gradient(#2a9a13, #000000)', 'border: 1px solid #3E0E02', 'color: white', 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)', 'text-align: center', 'font-weight: bold'
].join(';');
var payloadStyles = [
    'background: linear-gradient(#4e028a, #000000)', 'border: 1px solid #3E0E02', 'color: white', 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)', 'text-align: center', 'font-weight: bold'
].join(';');
var defaultStyle = [
    'background: linear-gradient(#000000, #6e6e6e)', 'border: 1px solid #3E0E02', 'color: #1fc134', 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)', 'text-align: center', 'font-weight: bold'
].join(';');

//style log to use for coloring develop tool console
function log(msg, style) {
    if (!style) {
        style = defaultStyle;
    }
    console.log('%c' + msg + '', style);
};


function capitalizeFirstLetter(string) {
    var category = ['nfl', 'ncaaf', 'mlb', 'nba', 'ncaam'];
    if (category.indexOf(string) === 0) {
        return string.toUpperCase();
    } else {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}


var triviaWidget = function () {
    var rand_id = Math.floor(Math.random() * 1000);
    var currentQuizData;
    var dataQuestionTitles;

    // HTML Element variables
    var sntTriviaContent = $('snt_trivia_game');
    var widgetContainer_el = friendlyIframeWindow.document.getElementsByClassName('widget_container')[0];
    var triviaAdZone_el = $('trivia_ad_zone');

    var triviaContainer_el = $('trivia_container');
    var triviaImage_el = friendlyIframeWindow.document.getElementsByClassName('trivia_image')[0];
    var triviaImageOverlay_el = friendlyIframeWindow.document.getElementsByClassName('trivia_image_overlay')[0];
    var triviaQuestion_el = friendlyIframeWindow.document.getElementsByClassName('trivia_question')[0].getElementsByTagName('p')[0];
    var triviaOptionsContainer_el = friendlyIframeWindow.document.getElementsByClassName('trivia_options')[0];
    var triviaOptions_el = friendlyIframeWindow.document.getElementsByClassName('trivia_options')[0].getElementsByTagName('li');

    var submissionOverlay_el = $("submission_overlay");
    var submissionInfoContainer_el = friendlyIframeWindow.document.getElementsByClassName("submission_display_container")[0];

    var nextQuestionButton_el = $("next_question");
    var activeQuestion_el = $("active_question");
    var userScore_el = $("user_score");
    var totalQuestions_el = $("total_questions");
    var scoreComment_el = $("score_comment");
    var skipQuestion_el = $("skip_question");
    var restart_el = $("restart");

    var otherContentOptionContainer_el = friendlyIframeWindow.document.getElementsByClassName("other_content_option_container");
    var animationContainer_el = friendlyIframeWindow.document.getElementsByClassName("animation_container");
    var completedOverlay_el = $("completed_overlay");
    var correctResultDisplay_el = $("correct_result_display");
    var showOthersText_el = $("show_others");

    var resultsChart_el = friendlyIframeWindow.document.getElementsByClassName("results_chart");
    var resultsChartValue_el = friendlyIframeWindow.document.getElementsByClassName("results_chart_value");
    var randomOption_el = friendlyIframeWindow.document.getElementsByClassName("random_option")[0];
    var progressBar_el = $("progress_bar");
    var adProgressBar_el = $("ad_progress_bar");
    var intervalScore_el = $("interval_score");
    var intervalScoreQuestion_el = $("interval_score_question");
    var pixelatedContainer_el = $("pixelateContainer");
    var youGuessPercentge_el = $("percentage_of_guess");
    var intervalScoreContainer_el = $("interval_score_container");

    var pixelatedContainerHeight = pixelatedContainer_el.offsetHeight;
    var pixelatedContainerWidth = pixelatedContainer_el.offsetWidth + 2;
    var url = window.location.href;

    // calculated variables
    var localDataStore;
    var finalQuestion = false;
    var totalQuestions = 10;
    var questionIterator = 1;
    var userScore = 0;
    var activeQuiz;
    var activeQuizKey;
    var dataVarSet;
    var questionKey;
    var quizTitles = [];
    var dataOptions;
    var totalResults;
    var correctResult;
    var correctPercentage;
    var incorrectResult;
    var incorrectPercentage;

    // var ctx = pixelateContainer.getContext('2d');
    var pixelatedImage;
    var intervalTimer;
    var pixelationInterval;
    var widgetEngaged = false; // when user has hovered and interacted with widget
    var intervalScore = 10;
    var cumulativeScore = 0;
    var totalPossibleScore = 100;


    // function set to mimick API call
    function callTriviaApi() {
        // variable that stores the response of an http request
        if (window.XMLHttpRequest) {
            var xhttp = new XMLHttpRequest();
        } else {
            var xhttp = new ActiveXObject('Microsoft.XMLHTTP')
        }
        // console.log('1 ####### MAKE API CALL', apiCallUrl);
        xhttp.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE) {
                if (this.status == 200) {
                    // On success parse out the response
                    localDataStore = JSON.parse(this.responseText);
                    currentQuizData = localDataStore['quizzes'];
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
                    // setTimeout(runAPI(apiCallUrl), 500)
                }
            }
        };
        xhttp.open("GET", apiCallUrl, false);
        xhttp.send();
    } //callTriviaApi


    function initialSetup(qId) {
        try {
            //if currentQuizData is available then skip otherwise run function to make api call
            adjustIntervalScoreFn("clear")
            if (!currentQuizData) {
                callTriviaApi();
            }
            // console.log('API RETURNED', currentQuizData);
            // if (activeQuizKey) {
            //     console.log("CHOSEN KEY ", activeQuizKey);
            // } else {
            //     console.log("GET RANDOM KEY ", activeQuizKey);
            // }
            quizTitles = getQuizKeys();
            activeQuizKey = qId ? qId : arrayShuffle(quizTitles)[0]; //get random quiz key.
            // console.log("2 ###### SET quizTitles", quizTitles);

            //filter throught quizzes and find the current active quiz by using the activeQuizKey
            activeQuiz = currentQuizData.filter(function (quiz) {
                if (quiz.sub_category_id === activeQuizKey) {
                    return quiz;
                }
            })[0];

            quizId = activeQuizKey; // set analytics quizId to be sent into PAYLOAD
            // console.log("3 ####### ACTIVE QUIZ", activeQuizKey, activeQuiz);

            dataQuestionTitles = getQuizSetKeys(activeQuiz);

            questionIterator = 1;
            finalQuestion = false;
            userScore = 0;
            cumulativeScore = 0;
            userScore_el.innerHTML = cumulativeScore;
            activeQuestion_el.innerHTML = questionIterator;
            totalQuestions_el.innerHTML = totalPossibleScore;
            // TODO sets other options links on completed overlay views
            var tempTitles = quizTitles;
            tempTitles.splice(tempTitles.indexOf(activeQuizKey), 1);
            setQuizKeys(tempTitles);
            setData();
        } catch (e) {
            console.warn("Data Error for Trivia", e);
        }
    } //initialSetup


    function setQuizKeys(titles) {
        questionKey = null; // Reset question key since a new quiz is being made
        intervalTimer = null;
        for (var i = 0; otherContentOptionContainer_el.length - 1 > i; i++) {
            var subCatId = titles[0];
            otherContentOptionContainer_el[i].id = subCatId;

            var quizData = currentQuizData.filter(function (quiz) {
                if (quiz.sub_category_id === subCatId) {
                    return quiz;
                }
            })[0];

            // loop through other quiz options from data and insert link and image into view
            var firstRandomQuestion = quizData.questions[0];
            var thumbnailImage = firstRandomQuestion ? "url(" + imageUrl + firstRandomQuestion.metadata.image + "4_3.jpg)" : '';
            animationContainer_el[i].style.backgroundImage = thumbnailImage;
            animationContainer_el[i].getElementsByTagName('p')[0].innerHTML = quizData.sub_category.toUpperCase();
            //Click event for other quiz buttons
            otherContentOptionContainer_el[i].onclick = function () {
                if (isSmall && wideWidget) {
                    removeAd = true;
                    adControl(false);
                    adjustIntervalScoreFn('clear');
                    hideAd();
                }
                updatePayload('send');
                restartFn(subCatId);
            };

            titles.splice(titles.indexOf(subCatId), 1);

        }

        //Click event for random shuffle quiz button
        randomOption_el.onclick = function () {
            if (isSmall && wideWidget) {
                removeAd = true;
                adControl(false);
                adjustIntervalScoreFn('clear');
                hideAd();
            }
            updatePayload('send');
            restartFn(setRandomQuizLink());
        }
    } //setQuizKeys


    // gets all possible Quizzes
    function getQuizKeys() {
        var quizzes = currentQuizData;
        quizTitles = [];
        quizzes.forEach(function (quiz) {
            quizTitles.push(quiz.sub_category_id);
        })
        return quizTitles;
    } //getQuizKeys


    function arrayShuffle(data) {
        var shuffleArray = [];
        if (Array.isArray(data)) {
            shuffleArray = data;
        } else {
            for (var o in data) {
                shuffleArray.push(data[o]);
            }
        }
        for (var i = shuffleArray.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = shuffleArray[i];
            shuffleArray[i] = shuffleArray[j];
            shuffleArray[j] = temp;
        }
        if (Array.isArray(data)) {
            return shuffleArray;
        } else {
            var returnObj = {};
            for (var i = 0; i < shuffleArray.length; i++) {
                returnObj[i + 1] = shuffleArray[i];
            }
            return returnObj;
        }
    }

    // creates an array of question titles
    function getQuizSetKeys(data) {
        var quizQuestions = data.questions;
        dataQuestionTitles = [];
        quizQuestions.forEach(function (question, i) {
            //grabs question id from meta data
            dataQuestionTitles.push(question.metadata.question_id);
        })
        totalPossibleScore = dataQuestionTitles.length * 10;
        return dataQuestionTitles;
    } //getQuizKeys


    // function used to reduce size of text in options if it is too tall for container
    function reduceTextSizeCheck(element) {
        var standardHeight = 34,
            elementHeight = element.offsetHeight;
        if (elementHeight > standardHeight) {
            /*--TODO make this a class?--*/
            element.style.fontSize = "10px";
            element.style.lineHeight = "1.1";
        }
    } //checkOneLineOption


    // Inject data into HTML
    function setData() {
        try {
            triviaOptionsContainer_el.innerHTML = ''; // empty other content options so that can be reset
            triviaContainer_el.className = '';
            nextQuestionButton_el.innerHTML = "<p>Next Question</p>";

            questionKey = questionKey ? questionKey : arrayShuffle(dataQuestionTitles)[0]; //get random question key.

            var activeQuestion = activeQuiz.questions.filter(function (question) {
                if (question.metadata.question_id === questionKey) {
                    return question;
                }
            })[0];

            questionId = questionKey; // set analytics questionId to be sent into PAYLOAD
            // console.log('4 ####### CHOOSING Question', questionKey, activeQuestion);
            if(!triviaStarted){
              updatePayload("send");
            }

            var metaData = activeQuestion.metadata,
                answerData = activeQuestion.answers,
                analyticsData = activeQuestion.analytics;
            var resultDisplay = activeQuestion ? metaData.correct_answer_result : 'Whoops!',
                backgroundImage = activeQuestion ? "url(" + imageUrl + metaData.image + "4_3.jpg)" : '';

            triviaQuestion_el.innerHTML = metaData.question; //inserts active question into view
            correctResultDisplay_el.innerHTML = resultDisplay; //inserts result into the submission view
            if (swapImage && wideWidget) {
                //creates stylesheet and appends media query that injects the proper image size into the background
                var imageStyle = document.createElement('style');
                imageStyle.type = 'text/css';
                friendlyIframeWindow.document.getElementsByTagName('section')[0].appendChild(imageStyle);
                friendlyIframeWindow.document.querySelector('style').textContent =
                    '@media (max-width: 649px) {.trivia_image {background-image: url("' + imageUrl + metaData.image + '4_3.jpg")}}' +
                    '@media (min-width: 650px) {.trivia_image {background-image: url("' + imageUrl + metaData.image + '16_9.jpg")}}';
            }
            dataOptions = arrayShuffle(answerData); // randomizes the object shuffling
            if (wideWidget) {
                triviaImageOverlay_el.style.height = '97px';
            }
            intervalScoreContainer_el.style.display = 'block';
            progressBar_el.style.display = 'block';
            submissionOverlay_el.classList.remove('no_transition');
            // loop thorugh options in data and insert values into view
            answerData = dataOptions;
            for (var key in answerData) {
                if (answerData.hasOwnProperty(key)) {
                    var index = Number(Object.keys(answerData).indexOf(key)) + 1,
                        child = friendlyIframeWindow.document.createElement("li"),
                        value = answerData[key],
                        isCorrect = answerData[key] == metaData.correct_answer,
                        selectedOption;
                    child.setAttribute('class', 'button');
                    child.innerHTML = '<p>' + value + '</p>';
                    triviaOptionsContainer_el.appendChild(child);
                    reduceTextSizeCheck(child.getElementsByTagName('p')[0]); // run options through this function to check if text size needs adjusted
                    if (isCorrect) {
                        child.onclick = function () {
                            selectedOption = this.getElementsByTagName('p')[0].innerHTML;
                            answerSubmittedFn('correct');
                            setGraphInfo(activeQuestion, selectedOption);
                            triviaStarted = true;
                        }
                    } else {
                        child.onclick = function () {
                            selectedOption = this.getElementsByTagName('p')[0].innerHTML;
                            answerSubmittedFn('incorrect');
                            setGraphInfo(activeQuestion, selectedOption);
                            triviaStarted = true;
                        }
                    }
                }
            }
            skipQuestion_el.onclick = function () {
                skipQuestionFn();
            };
            restart_el.onclick = function () {
                if (isSmall && wideWidget) {
                    removeAd = true;
                    adControl(false);
                    adjustIntervalScoreFn('clear');
                    hideAd();
                }
                restartFn(activeQuizKey);
            };

            if (wideWidget) {
                fireResize();
            }
            adjustIntervalScoreFn(); // start new interval

        } catch (e) {
            console.warn('Error in setting trivia data', e);
        }
    }; //setData


    // Set Graph values
    function setGraphInfo(activeQuestion, selectedOption) {

        var metaData = activeQuestion.metadata,
            answerData = activeQuestion.answers,
            analyticsData = activeQuestion.analytics;

        correctPercentage = analyticsData.correct_percentage;
        incorrectPercentage = analyticsData.wrong_percentage;

        for (var i = 0; resultsChart_el.length > i; i++) {
            switch (i) {
            case 0:
                resultsChartValue_el[i].innerHTML = correctPercentage + "%"; //sets chart label
                resultsChart_el[i].children[0].className = "p" + correctPercentage; //give chart appropriate class to fill radial graph (i.e. p_50 = 50%)
                break;
            default:
                resultsChartValue_el[i].innerHTML = incorrectPercentage + "%"; //sets chart label
                resultsChart_el[i].children[0].className = "p" + incorrectPercentage; //give chart appropriate class to fill radial graph (i.e. p_50 = 50%)
                break;
            }
        }

        //go through selected answer based on user click and pull out the analytics data from data
        for (var selection in answerData) {
            if (selectedOption == answerData[selection]) {
                analyticsSetAnswer(selection);
                var selectedPercent = analyticsData[selection + '_percentage']; //TODO a better way to do this too hard coded
                youGuessPercentge_el.innerHTML = "<b>" + selectedPercent + "%</b> of people also answered:<br> <b>" + selectedOption + ".</b>";
            }

        }
    } //setGraphInfo


    function answerSubmittedFn(answer) {
        switch (answer) {
        case 'correct':
            removeAd = true;
            widgetEngaged = true;
            addIntervalScoreFn();
            adjustIntervalScoreFn('clear');
            submissionOverlay_el.getElementsByTagName('p')[0].innerHTML = "Correct";
            if (wideWidget) {
                triviaImageOverlay_el.style.height = '230px';
            }
            intervalScoreContainer_el.style.visibility = 'hidden';
            progressBar_el.style.visibility = 'hidden';
            adjustIntervalScoreFn('clear');
            submissionInfoContainer_el.classList.remove('hidden'); // reveals submission info
            triviaContainer_el.className = "correct_submission";
            nextQuestionFn();
            break;
        case 'incorrect':
            removeAd = true;
            widgetEngaged = true;
            adjustIntervalScoreFn('clear');
            submissionOverlay_el.getElementsByTagName('p')[0].innerHTML = "Incorrect";
            if (wideWidget) {
                triviaImageOverlay_el.style.height = '230px';
            }
            intervalScoreContainer_el.style.visibility = 'hidden';
            progressBar_el.style.visibility = 'hidden';
            adjustIntervalScoreFn('clear');
            submissionInfoContainer_el.classList.remove('hidden'); // reveals submission info
            triviaContainer_el.className = "incorrect_submission";
            nextQuestionFn();
            break;
        }
    }


    function addIntervalScoreFn() {
        // console.log('5 ####### Current + IntervalScore', cumulativeScore, intervalScore);
        cumulativeScore = cumulativeScore + intervalScore;
        userScore_el.innerHTML = cumulativeScore;
        // console.log('NEW SCORE ', cumulativeScore);
    } //addIntervalScoreFn


    // sets functionality for next question button
    function nextQuestionFn() {
        // if last question show results screen
        if (questionIterator >= totalQuestions) {
            nextQuestionButton_el.onclick = function () {
                showCompleteFn()
            };
            nextQuestionButton_el.innerHTML = "<p>Show Results</p>";
        } else {
            nextQuestionButton_el.onclick = function () { // create click event for when user clicks on the Next Question
                submissionInfoContainer_el.classList.add('hidden'); //adds hidden class to prevent css transition when removed
                if (isSmall && wideWidget) {
                    removeAd = true;
                    adControl(false);
                    adjustIntervalScoreFn('clear');
                    hideAd();
                }
                bounce = 0;
                updatePayload('send');
                iterateQuestion();
            };
        }
        submissionOverlay_el.classList.add('no_transition');
    } //nextQuestionFn


    function skipQuestionFn() {
        swapImage = true;
        skipped = 1;
        adjustIntervalScoreFn('clear');
        widgetEngaged = true;
        // if last question show results screen
        if (questionIterator >= totalQuestions) {
            showCompleteFn();
            nextQuestionButton_el.innerHTML = "<p>Show Results</p>";
        } else {
            submissionInfoContainer_el.classList.add('hidden'); //adds hidden class to prevent css transition when removed
            updatePayload('send');
            iterateQuestion();
        }
    } //skipQuestionFn


    // run function when last question is submitted
    function showCompleteFn() {
        swapImage = true;
        var comment;
        if (cumulativeScore < 10) {
            comment = "Ouch!"
        } else if (cumulativeScore >= 10 && cumulativeScore <= 20) {
            comment = "Not Bad!"
        } else {
            comment = "Great Job!"
        }
        showOthersText_el.innerHTML = "Other " + capitalizeFirstLetter(activeQuiz.category) + " Trivia You May Love:";
        scoreComment_el.innerHTML = comment;
        completedOverlay_el.className = "show";
        setRandomQuizLink();
    } //showCompleteFn

    function removeQuestionIndex(key) {
        // console.log('removeQuestionIndex() from dataQuestionTitles', dataQuestionTitles);
        // console.log('removing questionKey', questionKey);
        var questionIndex = dataQuestionTitles.indexOf(key);
        if (questionIndex > -1) {
            dataQuestionTitles.splice(questionIndex, 1);
            ''
            // console.log('removed ' + questionKey, dataQuestionTitles);
        }
        if (dataQuestionTitles.length > 0) {
            questionKey = dataQuestionTitles[0] ? dataQuestionTitles[0] : null;
            // console.log('New Key', questionKey);
        }
    }

    // gets data for next question
    function iterateQuestion() {
        swapImage = true;
        // console.log('6 ####### iterateQuestion() REMOVING ', questionKey);
        removeQuestionIndex(questionKey);
        // console.log("Questions Left", dataQuestionTitles);

        // console.log('7 ####### iterate questionIterator for tooltip text');
        questionIterator++;
        activeQuestion_el.innerHTML = questionIterator; // inject active question into view
        triviaContainer_el.className = (''); // resets view
        if (questionIterator <= totalQuestions) {
            setData();
        }
    } //iterateQuestion


    // restart current quiz
    function restartFn(categoryId) {
        adjustIntervalScoreFn('clear');
        initialSetup(categoryId);
        completedOverlay_el.className = "hidden";
    } //restartFn

    function resetIntervalScore() {
        intervalScore = 10;
    }


    //adjust pixelation
    function adjustIntervalScoreFn(clear) { //TODO USE GLOBAL TIMER FUNCTION
        if (clear == 'clear') {
            clearInterval(intervalTimer);
            resetIntervalScore();
        } else {
            var temp = 0,
                buffer = 3, //buffer in seconds on how long befre the points should actually decrease
                bufferCount = 1,
                tempCount = 0,
                progressCounter = 1,
                intervalSeconds = 10,
                intervalMiliSeconds = 1000;
            if (!removeAd) {
                setSize();
            }
            if (isSmall && wideWidget && total_clicks == 0 && !widgetEngaged) {
                progressBar_el.style.visibility = 'hidden';
                intervalScoreContainer_el.style.visibility = 'hidden';
            } else {
                progressBar_el.style.visibility = 'visible';
                intervalScoreContainer_el.style.visibility = 'visible';

                if (intervalTimer) {
                    clearInterval(intervalTimer)
                }

                intervalTimer = setInterval(function () {
                    bufferCount++; //3 second delay before loosing actual points
                    if (Math.floor(bufferCount / intervalSeconds) >= 3) {
                        progressCounter++;
                        tempCount = Math.floor(progressCounter / intervalSeconds);
                        progressBar_el.style.width = progressCounter + '%';

                        if (tempCount >= 0 && tempCount < 10 && temp != tempCount) {
                            temp = tempCount;
                            intervalScore--;
                        }
                        intervalScoreQuestion_el.innerHTML = "Q" + questionIterator + " - Points : " + intervalScore;
                        if (tempCount >= 10 || progressCounter >= 100) { // make sure tempCount and progress Counter finish entirely
                            clearInterval(intervalTimer);
                            if (!widgetEngaged && !triviaStarted) {
                                var randomQuizKey = getRandomQuizKey();
                                getNewQuiz(randomQuizKey);
                            }
                        }
                    } //end of BUFFER counter
                    else {
                        progressBar_el.style.width = progressCounter + '%';
                        intervalScoreQuestion_el.innerHTML = "Q" + questionIterator + " - Points : " + intervalScore;
                    }
                }, intervalMiliSeconds / intervalSeconds);
            }
        }
    } //adjustPixelationFn


    // sets the random quiz link on the completed quiz overlay
    function setRandomQuizLink() {
        randomOption_el.id = getRandomQuizKey();
    } //setRandomQuizLink


    // returns a random quiz key that is not the current active key
    function getRandomQuizKey() {
        var activeIndex = quizTitles.indexOf(activeQuizKey);
        var withOutActiveIndex = quizTitles.filter(function (e) {
            return e !== activeQuizKey
        });
        var randomQuizKey = withOutActiveIndex[Math.floor(Math.random() * withOutActiveIndex.length)];
        questionKey = null; // since its a new random quiz then reset the current question key so that it can random a new key from a new quiz
        return randomQuizKey;
    } //getRandomQuizKey


    // gets new data if user clicks on new quiz
    function getNewQuiz(dataSetKey) {
        swapImage = true;
        activeQuizKey = dataSetKey;
        restartFn();
    } //getNewQuiz


    /**
     * Manually fires off the window resize event
     */
    function fireResize() {
        if (document.createEvent) {
            var ev = document.createEvent('Event');
            ev.initEvent('resize', true, true);
            window.dispatchEvent(ev);
            isSmall = ev.currentTarget.innerWidth < 650;
        } else { // IE
            element = document.documentElement;
            var event = document.createEventObject();
            element.fireEvent("onresize", event);
        }
    }

    function setSize() {
        var getWidth;
        if (typeof (window.innerWidth) == 'number') {
            getWidth = window.innerWidth;
        } else {
            if (document.documentElement && document.documentElement.clientWidth) {
                getWidth = document.documentElement.clientWidth;
            } else {
                if (document.body && document.body.clientWidth) {
                    getWidth = document.body.clientWidth;
                }
            }
        }
        if (wideWidget) {
            isSmall = getWidth < 650;
            //bring the ad back in case it is hidden while the width is altered
            if (!isSmall && !removeAd) {
                adControl(false);
            } else if (isSmall && !removeAd) {
                triviaAdZone_el.style.display = 'none';
                parent[query.pause_variable] = false; //pause ad when its out of view
            } else if (isSmall && removeAd) {
                triviaAdZone_el.style.display = 'block';
                parent[query.pause_variable] = true; //pause ad when its out of view
            }
        }
    }

    window.addEventListener('resize', setSize);

    if (wideWidget) {
        var isAdVisible = false;
        window.setInterval(function () {
            if (isSmall && total_clicks === 0 && !widgetEngaged) {
                if (!isAdVisible) {
                    intervalScoreContainer_el.style.visibility = 'visible';
                    progressBar_el.style.visibility = 'visible';
                    adControl(true);
                    isAdVisible = true;
                } else {
                    intervalScoreContainer_el.style.visibility = 'hidden';
                    progressBar_el.style.visibility = 'hidden';
                    adControl(false);
                    isAdVisible = false;
                }
            }
        }, 3000);
    }

    function hideAd() {
        setTimeout(function () {
            adControl(true);
            removeAd = false;
        }, 3000)
    }

    function adControl(isPaused) {
        if (isPaused) {
            adjustIntervalScoreFn();
            triviaAdZone_el.style.display = 'none';
            parent[query.pause_variable] = false; //pause ad when its out of view
        } else {
            triviaAdZone_el.style.display = 'block';
            parent[query.pause_variable] = true; //unpause ad if its in view
            if (isSmall) {
                var adProgressCounter = 1,
                    adIntervalSeconds = 10,
                    adIntervalMilliSeconds = 1000;
                var adIntervalTimer = setInterval(function () {
                    adProgressCounter++;
                    adProgressBar_el.style.width = (adProgressCounter * 3.334) + '%';
                    if (adProgressCounter >= 31) {
                        adProgressCounter = 1;
                        adProgressBar_el.style.width = 0;
                        clearInterval(adIntervalTimer);
                    }
                }, adIntervalMilliSeconds / adIntervalSeconds);
            }
        }
    }


    /*****************ANALYTICS VARIABLES **************************/
    //global variables used for payload
    var sessionId,
        partnerId,
        placementId,
        viewEngaged = false;

    var viewDwell, // view_dwell, Each time a quiz is 50%+ in view for any length of time. (collected every 100ms)
        embedTime, // engage_dwell, When CU is engaged*, each time a question is 50%+ in view for any length of time. (collected every 100ms)
        sessionTimer, // create Session Timer to know when the session has ended and create a new payload;
        payloadTimer, // create Payload Timer to know when to auto send payloads if variables are met;
        engageDwell, // time from the moment the widget is in view and engaged
        dwellLimitTimer,
        windowActiveTimer; // time limiter for dwell so dwell timer can be stopped after a certain time limit

    var sessionBefore = 0;
    var sessionAfter = 0;

    var igloo,
        windowActive = true,
        userAgentObj,
        category,
        quizId,
        questionId,
        question_view = 0, //When CU is engaged* (It is assumed to be in view)
        total_quiz_views, //Each time a quiz is 50%+ in view for 1+ seconds. This is recorded only once per quiz load.
        embed_view = 0, //Each time an embed is 50%+ in view for 1+ seconds. This is recorded only once per embed load.
        total_clicks = 0,
        total_embeds, // Record total amount of embeds on a page no matter if in view or not
        bounce, //should only ever be 1, never more than due to submission on a payload level.  || always return 1 until questions is answered then return 0 which zero means it is no longer in bounce since it has been answered

        skipped, // skippped question sends 0 || 1
        answered_correctly, // correct question sends 0 || 1
        answered_wrong_1, // wrong question sends 0 || 1
        answered_wrong_2, // wrong question sends 0 || 1
        answered_wrong_3; // wrong question sends 0 || 1


    function startTriviaAnalytics() {
        resetAnalytics();

        userAgentObj = iglooAnalytics('useragent');

        // if igloo utilities then iglooAnalytics() function will return boolean true if igloo is 50% or more in view of use window
        view = iglooAnalytics('view'); // check initial load if widget is available

        //TODO COMBINE TIMERS TO GET A MORE ACCURATE TIME INTERVAL REPORTING
        analyticsSession();// get session ID first
        analyticsWindowFocus();
        analyticsDwellEngagement();
        analyticsViewScroll();
        analyticsClick();

    };

    /** igloo.utils.elementIsVisible(element, debug_div, igloo_debug, min_percent)
     * This function checks if a given element is 60% or more in the viewport
     * @param  {DOMElement}  element     The element to check for visibility
     * @param  {DOMElement}  debug_div   The debugging div to put the % visible in
     * @param  {Boolean}     igloo_debug The debugging state of igloo
     * @param  {Number}      min_percent The minimum percent for an element to be
     *                                   considered in view (default 0.6)
     * @return {Boolean}                 Whether the element is in view
     */
    /** https://github.com/passit/adstack/blob/adstack/prod/src/js/IglooModule.js#L37
     * igloo.browser
     * This object describes the current browser including name, version, mobile,
     * and bot
     * @type {Object}
     * @key  {String}  name    The name of the broswer (Chrome, IE, etc)
     * @key  {String}  version The version of the browser
     * @key  {Boolean} bot     Whether the browser is a bot or not
     * @key  {Boolean} mobile  Whether the browser is mobile or not
     */
    function iglooAnalytics(type) {
        try {
            switch (type) {
            case 'view':
                return igloo.utils.elementIsVisible(sntTriviaContent, null, false, 0.5);
                break;
            case 'useragent':
                return igloo.browser;
                break;
            default:
                console.warn('igloo Utility not found', e);
                break;
            }
        } catch (e) {
            console.warn('igloo not found', e);
        }
    }


    //create an iframe for post request that will be removed once the request has been sent
    function createPayloadFrame(jsonObject) {
        // console.log(jsonObject);
        //create friendly iframe to place ourselves inside
        var payloadIframe = document.createElement('iframe');
        var payloadIframeWindow;
        // friendlyIframe.id = "friendlyIframe_" + countSelf.length;
        var payloadId = "snt_payload_id_" + rand_id;
        payloadIframe.setAttribute("id", payloadId);
        payloadIframe.className = "report";
        payloadIframe.width = 1;
        payloadIframe.height = 1; //250 is the add height
        payloadIframe.scrolling = 'no';
        payloadIframe.style.overflow = 'hidden';
        payloadIframe.src = 'about:blank';
        payloadIframe.style.border = 'none';

        friendlyIframe.parentNode.insertBefore(payloadIframe, friendlyIframe);

        payloadIframeWindow = payloadIframe.contentWindow;

        //create inline html for payloadIframe
        payloadIframeWindow.document.open();
        payloadIframeWindow.document.write('<scr' + 'ipt type="text/javascript">' + sendPayload(postUrl, jsonObject) + ' </scr' + 'ipt>');
        payloadIframeWindow.document.close();

        // once postMsg sent the remove the iframe
        var reporting = document.getElementById(payloadId);
        if (typeof reporting.remove === 'function') {
            reporting.remove();
        } else {
            reporting.outerHTML = '';
        }
    }

    function sendPayload(url, jsonObject) {
        try {
            if (typeof jsonObject == 'object') {
                var postXML = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
                postXML.open("POST", url, true);
                postXML.send(JSON.stringify(jsonObject))
                postXML.abort(); // aborts the xhttp and sets readyState to 0 as (UNSENT)
                // console.log('json object sent and abort reponse', jsonObject);
                // console.log("%cPAYLOAD SENT", payloadStyles);
                // for (var obj in jsonObject) {
                //     log(obj + ':' + jsonObject[obj] + "\t\t|| " + jsonInfo[obj]);
                // }
            }
        } catch (e) {
            console.warn("Product Analytics Error in Post Request", e)
        }
    }


    var jsonInfo = {
        "ac": "answered correctly - number 0||1", //correct
        "bo": "bounce - number == should only ever be 1, never more than due to submission on a payload level. 0||1 ", // bounce
        "cl": "clicks - number == amount since last payload CURRENT||RESETS", //total clicks
        "eb": "total embeds - number == amount since last payload CURRENT", //total embeds on the page
        "ed": "engage dwell - number == amount since last payload CURRENT||RESETS", //engaged dwell
        "ev": "embed views - number == should only ever be 1, never more than due to submission on a payload level CURRENT", // embed views
        "mo": "mobile - boolean 0||1", //mobile
        "pa": "partner id - number", //partner id
        "pl": "placement id - string", //placement id
        "qi": "question id - number",
        "qv": "question views - number == should only ever be 1, never more than due to submission on a payload level CURRENT", // question views
        "qz": "qz == quiz id - number", //quiz id
        "si": "session id - string", // i need to generate this myself
        "sp": "skipped question - number 0||1", //skip
        "vd": "view dwell - number == amount since last payload CURRENT||RESETS", //view dwell after engagements
        "w1": "answered wrong 1 - number 0||1", //wrong 1
        "w2": "answered wrong 2 - number 0||1", //wrong 2
        "w3": "answered wrong 3 - number 0||1", //wrong 3
        "zv": "quiz views - number == should only ever be 1, never more than due to submission on a payload level CURRENT" // quiz views
    };

    function updatePayload(send) {
        try {

            /*
             viewDwell, // time the widget is in view;
             embedTime, // time the moment client embeded widget
             sessionTimer, // create Session Timer to know when the session has ended and create a new payload;
             payloadTimer, // create Payload Timer to know when to auto send payloads if variables are met;
             engageDwell, // time from the moment the widget is in view and engaged
             dwellLimitTimer
             */

            jsonObject = {
                "ac": answered_correctly ? answered_correctly : 0, //correct
                "bo": bounce, // bounce
                "cl": total_clicks ? total_clicks : 0, //total clicks
                "eb": total_embeds ? total_embeds : 0, //total embeds on the page
                "ed": engageDwell ? engageDwell.getTime() : 0, //engaged dwell
                "ev": embed_view, // embed views
                "mo": userAgentObj.mobile ? 1 : 0, //mobile
                "pa": query.event.p, //partner id
                "pl": query.event.z ? query.event.z : randomString(12), //placement id
                "qi": questionId,
                "qv": question_view ? question_view : 0, // question views
                "qz": quizId, //quiz id
                "si": sessionId, // i need to generate this myself
                "sp": skipped ? skipped : 0, //skip
                "vd": viewDwell ? viewDwell.getTime() : 0, //view dwell
                "w1": answered_wrong_1 ? answered_wrong_1 : 0, //wrong 1
                "w2": answered_wrong_2 ? answered_wrong_2 : 0, //wrong 2
                "w3": answered_wrong_3 ? answered_wrong_3 : 0, //wrong 3
                "zv": 0 // quiz views
            };

            isMobile = jsonObject['mo'];

            if (send == 'send') {
                createPayloadFrame(jsonObject);
                jsonObject = {};
                resetAnalytics();
            } else {
                // for (var obj in jsonObject) {
                //     log(obj + ':' + jsonObject[obj] + jsonInfo[obj]);
                // };
            }
        } catch (e) {
            console.log('%cerror updating payload                                                     ', 'background: linear-gradient(#7a0000, #000000); border: 1px solid #3E0E02; color: white');
            console.warn(e);
        }
    }


    //TODO MUST USE TIMESTAMPS ON CERTAIN TIMERS TO GET A MORE PROPER TIME ANALYTICS;
    /**timer(name, tick, stopAt, debug_element)
     * Function to create a timer with variable features to startTime, pauseTime, get, or even auto pauseTime
     * @type {Object}
     * @key  {String} name    give the timer a name to track
     * @key  {Number} tick    tick is how many times the interval Timer should update the time(ms)
     * @key  {Number} stopAt  if you want the time to auto pauseTime at a certain time(ms)
     * @key  {Object} debug_div  the element (div/span/etc..) you want to debug off of
     * @key  {Object} createFunction runs the function user creates every interval
     */
    function timer(name, tick, stopAt, debug_element, createFunction) {
        this.name = name;
        this.time = 0;
        this.stopAt = stopAt;
        this.timerOn = false;
        this.tick = tick;
        this.intervalTimer = function () {},
            this.startTime = function () {
                if (!this.timerOn) {
                    this.timerOn = true;
                    var cTimer = this;
                    this.intervalTimer = setInterval(function () {
                        cTimer.time += cTimer.tick;
                        if (cTimer.stopAt && cTimer.time >= cTimer.stopAt) {
                            cTimer.pauseTime();
                        }
                        if (debug_element) {
                            debug_element.innerHTML = cTimer.time;
                        }
                        if (createFunction) {
                            createFunction(cTimer);
                        }
                    }, this.tick);
                }
            },
            this.pauseTime = function () {
                clearInterval(this.intervalTimer);
                this.timerOn = false;
            },
            this.resetTime = function () {
                this.time = 0;
            },
            this.getTime = function () {
                return this.time;
            }

    };


    /**
     * RANDOM STRING GENERATOR
     *
     * Info:      http://stackoverflow.com/a/27872144/383904
     * Use:       randomString(length [,"A"] [,"N"] );
     * Default:   return a random alpha-numeric string
     * Arguments: If you use the optional "A", "N" flags:
     *            "A" (Alpha flag)   return random a-Z string
     *            "N" (Numeric flag) return random 0-9 string
     */
    function randomString(len, an) {
        an = an && an.toLowerCase();
        var str = "",
            i = 0,
            min = an == "a" ? 10 : 0,
            max = an == "n" ? 10 : 62;
        for (; i++ < len;) {
            var r = Math.random() * (max - min) + min << 0;
            str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
        }
        return str;
    }


    function analyticsSetAnswer(selection) { //TODO make a better analytics too hardcoded
        // skipped, // skippped question sends 0 || 1
        // answered_correctly, // correct question sends 0 || 1
        // answered_wrong_1, // wrong question sends 0 || 1
        // answered_wrong_2, // wrong question sends 0 || 1
        // answered_wrong_3; // wrong question sends 0 || 1
        switch (selection) {
        case 'correct':
            answered_correctly = 1;
            break;
        case 'wrong_1':
            answered_wrong_1 = 1;
            break;
        case 'wrong_2':
            answered_wrong_2 = 1;
            break;
        case 'wrong_3':
            answered_wrong_3 = 1;
            break;
        default:
            break
        }
    }


    function analyticsWindowFocus() {
        var focused = true;

        var hidden = "hidden";

        // Standards:
        if (hidden in document)
            document.addEventListener("visibilitychange", onchange);
        else if ((hidden = "mozHidden") in document)
            document.addEventListener("mozvisibilitychange", onchange);
        else if ((hidden = "webkitHidden") in document)
            document.addEventListener("webkitvisibilitychange", onchange);
        else if ((hidden = "msHidden") in document)
            document.addEventListener("msvisibilitychange", onchange);
        // IE 9 and lower:
        else if ("onfocusin" in document)
            document.onfocusin = document.onfocusout = onchange;
        // All others:
        else
            window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;

        function onchange(evt) {
            var v = "visible",
                h = "hidden",
                evtMap = {
                    focus: v,
                    focusin: v,
                    pageshow: v,
                    blur: h,
                    focusout: h,
                    pagehide: h
                };

            evt = evt || window.event;


            var storeSession;
            if ( sessionStorage.getItem('snt_trivia_analytics') === null) {
                storeSession = sessionStorage.setItem('snt_trivia_analytics', JSON.stringify({before_time:null,after_time:null, session_id:null}));
            }
            storeSession = JSON.parse(sessionStorage.getItem('snt_trivia_analytics'));
            if (this[hidden]) {
                isActive = false;
                storeSession['before_time'] = Date.now();
                storeSession['after_time'] = Date.now();
                storeSession['session_id'] = storeSession.session_id ? storeSession.session_id :sessionId;

                sessionStorage.setItem('snt_trivia_analytics', JSON.stringify(storeSession));
            }
            else {
                isActive = true;
                storeSession['before_time'] = storeSession['before_time'] ? storeSession['before_time'] : Date.now();
                storeSession['after_time'] = Date.now();
                storeSession['session_id'] = storeSession.session_id ? storeSession.session_id :sessionId;
                sessionStorage.setItem('snt_trivia_analytics', JSON.stringify(storeSession));
            }
            if ((storeSession['after_time'] - storeSession['before_time']) >= timeToLive) {
                getIgloo(); // RESET ENTIRE TEST
            }
        }

        // set the initial state (but only if browser supports the Page Visibility API)
        if (document[hidden] !== undefined)
            onchange({
                type: document[hidden] ? "blur" : "focus"
            });

    }

    function set_idle_listeners() { //setup the event listeners if user becomes active trigger start timer
        window.document.addEventListener("mousemove", start_timer, false);
        window.document.addEventListener("mousedown", start_timer, false);
        window.document.addEventListener("keypress", start_timer, false);
        window.document.addEventListener("DOMMouseScroll", start_timer, false);
        window.document.addEventListener("mousewheel", start_timer, false);
        window.document.addEventListener("touchstart", start_timer, false);
        window.document.addEventListener("touchmove", start_timer, false);
        window.document.addEventListener("MSPointerMove", start_timer, false);

        var debugSession = window.document.getElementById('sessionTest');
        if (!widgetEngaged || !view) {
            if (sessionTimer) {
                if (!sessionTimer.timerOn) {
                    sessionTimer.startTime();
                }
            } else {
                sessionTimer = new timer('session', 100, timeToLive, debugSession, function (event) {
                    if (event.time >= event.stopAt) {
                        event.pauseTime();
                        event.resetTime();
                        sessionStorage.removeItem('snt_trivia_analytics');
                        getIgloo(); // RESET ENTIRE TEST
                    }
                }); //timeToLive in (ms) is 10 minutes
                sessionTimer.startTime();
            }
        } else {
            sessionTimer.pauseTime();
            sessionTimer.resetTime();
        }
    }

    function start_timer() { //if user becomes active, remove event listeners so we dont polute the event space
        window.document.removeEventListener("mousemove", start_timer, false);
        window.document.removeEventListener("mousedown", start_timer, false);
        window.document.removeEventListener("keypress", start_timer, false);
        window.document.removeEventListener("DOMMouseScroll", start_timer, false);
        window.document.removeEventListener("mousewheel", start_timer, false);
        window.document.removeEventListener("touchstart", start_timer, false);
        window.document.removeEventListener("touchmove", start_timer, false);
        window.document.removeEventListener("MSPointerMove", start_timer, false);

        isActive = true;
        sessionTimer.pauseTime();
        sessionTimer.resetTime();

        dwellLimitTimer.resetTime();
        dwellLimitTimer.startTime();

        if (!widgetEngaged) {
            set_idle_listeners();
        }
    }

    function analyticsSession() {
        var sessionTest,
            s_id;

        var sstorage;

        if ( sessionStorage.getItem('snt_trivia_analytics') === null) {
            sstorage = sessionStorage.setItem('snt_trivia_analytics', JSON.stringify({before_time:null,after_time:null, session_id:null}));
        }
        sstorage = JSON.parse(sessionStorage.getItem('snt_trivia_analytics'));
        sessionId = sstorage && sstorage.session_id ? sstorage.session_id :randomString(16); //Generate a session ID
        sstorage.session_id = sessionId;
        sessionStorage.setItem('snt_trivia_analytics', JSON.stringify(sstorage));


        if (!window.document.getElementById('s_id')) {
            s_id = window.document.createElement('div');
            s_id.id = 's_id';
            s_id.style = "position:fixed;top:0;right:100px;left:100px;background:aqua;color:black;font-size:16px;text-align:center;z-index:100";
            window.document.body.insertBefore(s_id, window.document.body.firstElementChild);
        }

        window.document.getElementById('s_id').innerHTML = sessionId;


        if (!window.top.document.getElementById('sessionTest')) {
            sessionTest = window.top.document.createElement('div');
            sessionTest.id = 'sessionTest';
            sessionTest.style = "position:fixed;top:20px;right:100px;left:100px;background:yellow;color:black;font-size:28px;text-align:center;z-index:100";
            window.document.body.insertBefore(sessionTest, window.document.body.firstElementChild);
        }
        set_idle_listeners();
    }


    function analyticsViewScroll() {
        try {
            var viewTest,
                createTimer;

            var payloadTimer = 500, // (ms) Initial payload timer 0.5 seconds
                payloadLimit = 10000,
                payloadTempTimer = 0; // (ms) Initial payload limit 10 seconds


            if (!window.document.getElementById('viewTest')) {
                viewTest = window.document.createElement('div');
                viewTest.id = 'viewTest';
                viewTest.style = "position:fixed;top:0;right:0;background:black;color:white;font-size:20px;z-index:100";
                window.document.body.insertBefore(viewTest, window.document.body.firstElementChild);
            }
            var debugView = window.document.getElementById('viewTest');

            if (!window.document.getElementById('viewDwell')) {
                createTimer = window.top.document.createElement('div');
                createTimer.id = 'viewDwell';
                createTimer.style = "position:fixed;top:32px;right:0;background:red;color:white;font-size:20px;z-index:100";
                window.document.body.insertBefore(createTimer, window.document.body.firstElementChild);
            }
            var debugTimer = window.document.getElementById('viewDwell');

            viewDwell = viewDwell ? viewDwell : new timer('view', 100, null, debugTimer, function (event) {
                if (event.time >= 1000 && viewEngaged && question_view < 1) {
                    question_view = 1;
                }

                if (!widgetEngaged && !dwellLimitTimer.timerOn) {
                    isActive = false;
                }

                if (!widgetEngaged) {
                    set_idle_listeners(); // create Session Timer to listen for any event and determin if the use is idle
                    if (isActive) {
                        sessionTimer.resetTime();
                        sessionTimer.pauseTime();
                        var payT = (event.time % payloadTimer);
                        if (payT == 0) {
                            payloadTempTimer += payloadTimer;
                            updatePayload('send');
                            if (payloadTempTimer == payloadLimit) {
                                if (payloadLimit <= 10000) { //if payloadLimit is less than 10s || 10000ms
                                    payloadTimer = 1000;
                                    payloadLimit = 30000;
                                    payloadTempTimer = 0; // reset temp timer
                                } else if (payloadLimit > 10000 && payloadLimit <= 30000) {
                                    payloadTimer = 5000;
                                    payloadLimit = 'forever';
                                    payloadTempTimer = 0;
                                } else {
                                    //Should Never Get HERE
                                }
                            }
                        } // payT
                    }
                } // widgetEngaged
            });

            window.onscroll = function () { // create listener on scroll for widget in view
                if (!viewDwell) {
                    viewDwell = new timer('view', 100, null, debugTimer);
                }
                view = iglooAnalytics('view');
                embed_view = view ? 1 : embed_view; // if view is true then set it to 1 otherwise keep its current state;
                if (debugView) {
                    debugView.innerHTML = 'view: ' + view;
                }

                if (view && widgetEngaged) { //if in view and engaged set and flag that will always run the viewDwell whenever in view
                    viewEngaged = true;
                } else {
                    viewEngaged = !view && !viewEngaged ? false : viewEngaged;
                }

                if (view) { // if trivia is in view & timer isnt on & trivia is engaged => start timer
                    viewDwell.startTime();
                } else {
                    viewDwell.pauseTime();
                    set_idle_listeners(); // create Session Timer to listen for any event and determin if the use is idle
                }
            }

            // to be able to initially run the scroll event listener;
            window.scrollTo(window.scrollX, window.scrollY - 1);
            window.scrollTo(window.scrollX, window.scrollY + 1);
        } catch (e) {
            console.warn('ViewScroll Error', e);
        }
    }


    function analyticsDwellEngagement() {
        try {
            var dwellTest,
                createTimer,
                dwellLimit;

            widgetEngaged = false; // by running this make sure to set all values to its default

            if (!window.document.getElementById('dwellTest')) {
                dwellTest = window.document.createElement('div');
                dwellTest.id = 'dwellTest';
                dwellTest.style = "position:fixed;top:0;left:0;background:black;color:white;font-size:20px;z-index:100";
                window.document.body.insertBefore(dwellTest, window.document.body.firstElementChild);
            }
            var debugDwell = window.document.getElementById('dwellTest');

            if (!window.document.getElementById('engageDwell')) {
                createTimer = window.document.createElement('div');
                createTimer.id = 'engageDwell';
                createTimer.style = "position:fixed;top:32px;left:0;background:red;color:white;font-size:20px;z-index:100";
                window.document.body.insertBefore(createTimer, window.document.body.firstElementChild);
            }
            var dwellTime = window.document.getElementById('engageDwell');

            if (!window.document.getElementById('dwellLimit')) {
                dwellLimit = window.document.createElement('div');
                dwellLimit.id = 'dwellLimit';
                dwellLimit.style = "position:fixed;top:64px;left:0;background:blue;color:white;font-size:20px;z-index:100";
                window.document.body.insertBefore(dwellLimit, window.document.body.firstElementChild);
            }
            var debugLimit = window.document.getElementById('dwellLimit');

            engageDwell = new timer('dwell', 100, null, dwellTime);
            dwellLimitTimer = new timer('dwellLimit', 100, 10000, debugLimit, function (event) {
                if ((event.time >= event.stopAt) && engageDwell) {
                    // viewDwell.pauseTime();
                    isActive = false;
                    engageDwell.pauseTime();
                    sessionTimer.resetTime();
                    updatePayload('send');
                    if (!view) {
                        viewDwell.pauseTime();
                    }
                    widgetEngaged = false;
                    if (debugDwell) {
                        debugDwell.innerHTML = 'dwell: ' + widgetEngaged;
                    }
                }
            }); //create new timer with limit of 10 seconds

            debugDwell.innerHTML = 'dwell: ' + widgetEngaged; //initlal debug

            sntTriviaContent.onmouseover = function () { // create listener if widget becomes engaged
                dwellLimitTimer.resetTime();
                if (!widgetEngaged) {
                    widgetEngaged = true;
                    viewEngaged = true;
                    debugDwell.innerHTML = 'dwell: ' + widgetEngaged;
                    engageDwell.startTime();
                    dwellLimitTimer.startTime();

                    if (!viewDwell.timerOn) {
                        viewDwell.startTime();
                    }

                    if (viewEngaged && !triviaStarted) {
                        //once engaged reset score and timer for first time engagement
                        adjustIntervalScoreFn('clear');
                        adjustIntervalScoreFn();
                    }
                    triviaStarted = true;
                    
                } else {
                    dwellLimitTimer.resetTime();
                }
            }

            window.document.addEventListener("mouseout", function () {
                dwellLimitTimer.pauseTime();
                dwellLimitTimer.resetTime();
                dwellLimitTimer.startTime();
            }, false);

        } catch (e) {
            console.warn('DwellEngagement Error', e);
        }
    }


    function analyticsClick() {
        sntTriviaContent.onclick = function () { // tract every click event within the widget
            total_clicks++;
            log('total_clicks      =   ' + total_clicks);
        }
    }

    function checkEmbeds() {
        var widgetContainers = window.document.getElementsByClassName('twiframe');
        if (widgetContainers) {
            total_embeds = widgetContainers.length;
            friendlyIframe.id = !friendlyIframe.id && friendlyIframe.id != '' ? friendlyIframe.id : 'trivia_id_' + total_embeds;
        } else {
            console.warn('No widget containers found');
        }

    }

    function resetAnalytics() {
        if (viewDwell) {
            viewDwell.pauseTime();
            viewDwell.resetTime();
            viewDwell.startTime();
        }
        if (engageDwell) {
            // engageDwell.pauseTime();
            engageDwell.resetTime();
            // engageDwell.startTime();
        }
        if (dwellLimitTimer) {
            // dwellLimitTimer.pauseTime();
            // dwellLimitTimer.resetTime();
            // dwellLimitTimer.startTime();
        }
        total_clicks = 0;
        bounce = 1;
        skipped = 0;
        answered_correctly = 0;
        answered_wrong_1 = 0;
        answered_wrong_2 = 0;
        answered_wrong_3 = 0;
    }

    /*****************ANALYTICS VARIABLES END***********************/


    // function getCurrentWindow(maxLoops) {
    //     // Initialize variables
    //     var postWindows = [window];
    //     var currentWindow = window;
    //     var currentLoop = 0;
    //     maxLoops = typeof maxLoops === 'undefined' ? 10 : maxLoops;
    //     // Build all of the windows to send the message to
    //     try {
    //         // Loop through all of the windows
    //         while (currentLoop++ < maxLoops && currentWindow !== window.top) {
    //             // Move up a layer
    //             currentWindow = currentWindow.parent;
    //             // Add to the postMessage array
    //             postWindows.push(currentWindow);
    //         }
    //     } catch (e) {}
    // }


    var firstRun = true; //makes sure the listeners run once
    var iglooUtilities;

    var viewTest;
    var dwellTest;


    function getIgloo() {
        if (window.top.igloo) {
            igloo = window.top.igloo;

            /*******************START ANALYTICS******************/
            startTriviaAnalytics();
            /******************** ANALYTICS* ******************/

            checkEmbeds();

            initialSetup();
            clearInterval(iglooUtilities);
        } else {
            console.log('igloo not found', window.top.igloo);
        }
    }

    //Initial load Waits for the DOMContent to load
    if (firstRun == true && (friendlyIframeWindow.document.readyState == "complete" || friendlyIframeWindow.document.readyState == "interactive")) { // if page is already loaded'
        firstRun = false;
        iglooUtilities = setInterval(getIgloo, 100);
    } else { // elseonce page has finished loading, so as not to slowdown the page load at all
        friendlyIframeWindow.document.onreadystatechange = function () {
            if (firstRun == true && (friendlyIframeWindow.document.readyState == "complete" || friendlyIframeWindow.document.readyState == "interactive")) {
                firstRun = false;
                iglooUtilities = setInterval(getIgloo, 100);
            }
        }
    }
};


var firstWidgetRun = true; //makes sure the listeners run once
function widgetSetup() {
    //Initial load Waits for the DOMContent to load
    if (firstWidgetRun == true && (document.readyState == "complete" || document.readyState == "interactive")) { // if page is already loaded'
        firstWidgetRun = false;
        createFriendlyIframe();
    } else { // elseonce page has finished loading, so as not to slowdown the page load at all
        document.onreadystatechange = function () {
            if (firstWidgetRun == true && (document.readyState == "complete" || document.readyState == "interactive")) {
                firstWidgetRun = false;
                createFriendlyIframe();
            }
        }
    }
}

//run the moment javascript file has been embeded
widgetSetup();

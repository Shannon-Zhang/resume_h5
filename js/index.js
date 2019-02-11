let $section = $('section'),
    $sections = $('section'),
    tip = 0,
    timer = null,
    timer2 = null,
    timer3 = null,
    timer4 = null,
    timer5 = null;

$section.on('touchstart', touchStart);
$section.on('touchend', touchEnd);
function touchStart(e) {
    this.startY = e.changedTouches[0].pageY;
}
function touchEnd(e) {
    this.endY = e.changedTouches[0].pageY; 
    if (this.endY - this.startY<0) {
        tip++;
    } else if (this.endY - this.startY > 0){
        tip--;
    } else{
        return;
    }
    if (tip<0) {
        tip = 7;
    } else if (tip>=8) {
        tip = 0;
    }
    commonMoveOut();
    switch (tip) {
        case 0:
            pageOne();
            break;
        case 1:
            pageTwo();
            break;
        case 2:
            pageThree();
            break;
        case 3:
            pageFour();
            break;
        case 4:
            pageFive();
            break;
        case 5:
            pageSix();
            break;
        case 6:
            pageSeven();
            break;
        case 7:
            pageEight();
            break;
    }
}
let $music = $('.music'),   // 音乐
    audio = document.getElementsByTagName('audio')[0]; 
$music.tap(function () {
    let ele = $(this);
    // console.log(ele.css('animation'));  //rotating 1.2s linear 0s infinite normal none running
    let ary = ele.css('animation').split(' ');
    let animationPS = ary[ary.length-1];
    // console.log(animationPS);
    if (animationPS==='running') {  // 如果动画在运行中，则暂停
        ele.css({
            animation:'rotating 1.2s linear 0s infinite normal none paused'
        });
        audio.pause();
    } else{ // 否则，重启动画
        ele.css({
            animation:'rotating 1.2s linear 0s infinite normal none running'
        }); 
        audio.play();
    }
})
// 公共动效
function commonMove() {
    clearTimeout(timer3);
    clearTimeout(timer4);
    clearTimeout(timer5);
    // console.log('commonMove');
    // 获取需要操作的元素
    let $rightT = $('.right_top_pic'),  // 右上角藤条
        $leftB = $('.left_bottom_pic'), // 左下角藤条
        $progressBar = $('.progressBar'),   // 页面底部进度条
        $pTip = $('.page_tip'),     // 页面底部页码
        $flashCut = $('.flash_cut'),
        $flashLis = $flashCut.find('li');
    let $title = $('.title'),
        $img = $title.find('img');
    let i = 0;
    // timer5 = setTimeout(()=>{
    //     $flashCut.css({
    //         zIndex:'20',
    //         display:'block'
    //     });
    // },100);
    $flashCut.css({
        zIndex:'20',
        display:'block'
    });
    timer4 = setInterval(()=>{
        if (i>3) {
            clearInterval(4);
            $flashCut.css({
                zIndex:'0',
                display:'none'
            });
            $flashLis.removeClass('animated fadeOutRight');
            $flashLis.removeClass('animated fadeOutLeft');
            timer3 = setTimeout(()=>{
                // 标题下拉
                $title.css({
                    transform:'translateY(-0.2rem)'
                });
                // 标题框上的图片 抖动动画
                $img.css({
                    animationIterationCount:'infinite'
                })
                $img.addClass('animated jello');
                // 右上角藤条下移
                $rightT.css({
                    // tansition:'all 1.5s',
                    transform:'translateY(0)'
                });   
                // 左下角藤条上移
                $leftB.css({
                    // tansition:'all 1.5s',
                    transform:'translateY(0)'
                });
            },500);
        }
        $($flashLis[i]).addClass('animated fadeOutRight');
        $($flashLis[7-i]).addClass('animated fadeOutLeft');
        // $($flashLis[i]).css({
        //     opacity:0,
        // });
        // $($flashLis[7-i]).css({
        //     opacity:0,
        // });
        i++;
    },200);    
    // 底部进度条增加
    // tip++;
    $pTip.html(tip+1+'/8');
    $progressBar.css({
        width:(tip+1)*12.5+'%'
    });
    // console.log('tip:'+ tip);
    
}
function commonMoveOut() {
    // console.log(111);
    // 获取需要操作的元素
    let $rightT = $('.right_top_pic'),
        $leftB = $('.left_bottom_pic');
    // 右上角藤条下移
    $rightT.css({
        tansition:'all 0s',
        transform:'translateY(-3.35rem)'
    });   
    // 左下角藤条上移
    $leftB.css({
        tansition:'all 0s',
        transform:'translateY(11.43rem)'
    });
}

// 处理第1页
function pageOne(){
    clearTimeout(timer);
    commonMove();   // 调用公共动效函数
    $($sections[0]).removeClass('hidden').siblings().addClass('hidden');
    // 获取需要操作的元素
    let $picture = $('.main_pic img'),// 头像
        $branch = $('div.vineBranch'),  // 中央的藤条
        $words = $('.themeBox').children(),// 我的简历 文字
        $show = $('.show'); // 文字宣言
    for (let i = 0; i < $words.length; i++) {
        const element = $($words[i]);
        if (i<2) {
            element.addClass('animated bounceInRight')
        } else{
            element.addClass('animated bounceInLeft')
        }
    }
    $branch.addClass('animated jello');
    $branch.css({
        opacity:1
    });
    $show.addClass('animated bounceInLeft');
    timer = setTimeout(()=>{    // 用定时器，使头像延迟显示
        $picture.css({
            opacity:1
        });
    },3000);

}
pageOne();

// 处理第2页
function pageTwo() {
    clearTimeout(timer);
    commonMove();
    $($sections[1]).removeClass('hidden').siblings().addClass('hidden');
    // 获取需要操作的元素
    let $image_frame = $('.image_frame'),   // 相框
        $image = $('.image'),       // 照片
        $basicInfo = $('.basicInfo'),   // 基本信息
        $self_evaluation = $('.self_evaluation');   // 自我评价
    // console.log('page2');
    timer = setTimeout(()=>{
        // 相框下拉
        $image_frame.css({
            transform:'rotate(-90deg) translateX(0)'
        });
        // 图片右侧进入
        $image.css({
            transform:'translateX(0)'
        });
        // 文字左侧进入
        $basicInfo.css({
            transform:'translateX(0)'
        });
    } ,800);
    
    // 自我评价翻滚进入
    $self_evaluation.css({
        animationDelay:'1s'
    })
    $self_evaluation.addClass('animated flipInY');
}
// pageTwo();

// 处理第3页
function pageThree() {
    clearTimeout(timer);
    commonMove();
    $($sections[2]).removeClass('hidden').siblings().addClass('hidden');
    // 获取需要操作的元素
    let $skillBall = $('.skill_ball'),// 四个技能球
        $rollBall = $('.roll_ball'),    //四个旋转球
        $detailTitle = $('.skill_details').find('span'),// 技能详情标题
        $detailContent = $('.skill_details').find('p');  // 技能详情内容
    for (let i = 0; i < $rollBall.length; i++) {
        const element = $($rollBall[i]);
        // element.addClass('animated rotateIn');
        element.css({
            animation:'roll',
            animationDuration:'2s',
            animationIterationCount:'infinite'
        })
    }
    timer = setTimeout(()=>{
        // 技能球出现
        $skillBall.forEach(item=>{
            $(item).css({
                transform:'translateY(0)'
            })
        });
        // 技能详情文字出现
        $detailTitle.css({
            transform:'translateX(0)'
        })
        $detailContent.css({
            transform:'translateY(0)'
        });
    }, 1200);
}
// pageThree();

// 处理第4页
function pageFour() {
    clearInterval(timer2);
    commonMove();
    $($sections[3]).removeClass('hidden').siblings().addClass('hidden');
    // 获取需要操作的元素
    let $imgs = $('li').find('img'),
        $experTitle = $('.time_location'),
        $experContent = $('.job_details').find('p');
    // console.log($imgs, $experTitle, $experContent);
    let i = 0;
    timer2 = setInterval(()=>{
        if (i>2) {
            clearInterval(timer2);
        }
        $($imgs[i]).css({
            opacity:1,
            transform:'translateX(0rem)'
        }); 
        $($experTitle[i]).css({
            opacity:1,
            transform:'translateX(0rem)'
        }); 
        $($experContent[i]).css({
            opacity:1,
            transform:'translateX(0rem)'
        });
        i++;
    },500);
}
// pageFour();

// 处理第5页
function pageFive() {
    clearInterval(timer2);
    commonMove();
    $($sections[4]).removeClass('hidden').siblings().addClass('hidden');
    // 获取需要操作的元素
    let $frames = $('.frame'),  //相框
        $frameImgs = $frames.find('.frame_img'),    // 相框中藤条
        $banners = $frames.find('.banner'), // banner图片
        $descs = $frames.find('.desc'),  // 描述信息
        $hobbyTitles = $descs.find('.hobby_title'), // 描述信息开头
        $hobbyDetails = $descs.find('.hobby_detail');  // 描述信息详情
        // console.log($hobbyTitles, $hobbyDetails);
    let i = 0, j=0;
    timer2 = setInterval(()=>{
        if (i>1) {
            clearTimeout(timer2);
        }
        // 使相框显现，并增加抖动动画
        $($frames[i]).css({
            opacity:1,
            animationDelay:'0.5s'
        })
        $($frames[i]).addClass('animated flipInY');
        $($frameImgs[i]).addClass('animated rubberBand');   
          
        i++;
    },500);
    // banner图移入
    timer = setInterval(()=>{
        if (j>1) {
            clearInterval(timer);
        }
        $($banners[j]).css({
            transform:'translateX(0)'
        });
        // 让文字显示
        $($hobbyTitles[j]).css({
            opacity:1
        });
        $($hobbyDetails[j]).css({
            // animationDelay:'0.5s',
            opacity:1
        });
        $($hobbyDetails[j]).addClass('animated flipInY'); 
        j++;
    },800);  
}
// pageFive();

// 处理第6页
function pageSix() {
    clearTimeout(timer);
    commonMove();
    $($sections[5]).removeClass('hidden').siblings().addClass('hidden');
    // 获取需要操作的元素
    let $pic1 = $('.pic1'), //第一张图
        $detail = $('.page6').find('.detail'),  // 文字描述
        $detailTitle = $detail.find('h2'),  // 文字描述标题
        $detailContent = $detail.find('p'), // 文字描述内容
        $pic2 = $('.pic2'), //第二张图
        $pic3 = $('.pic3'); //第三张图
    // 第一张图翻滚动画
    $pic1.addClass('animated flipInY');
    // 文字描述标题 下落
    $detailTitle.css({
        opacity:1,
        animationDuration:'1s'
    });
    $detailTitle.addClass('animated slideInDown');
    // 文字描述内容 滑入
    $detailContent.css({
        transform:'translateX(0)'
    });
    timer = setTimeout(()=>{
        // 第二张图片左侧进入
        $pic2.css({
            transform:'translateX(0)'
        });
        // 第三张图片右侧进入
        $pic3.css({
            transform:'translateX(0)'
        });
    },300);
}
// pageSix();

// 处理第7页
function pageSeven() {
    clearInterval(timer);
    clearTimeout(timer2);
    commonMove();
    $($sections[6]).removeClass('hidden').siblings().addClass('hidden');
    // 获取需要操作的元素
    let $bossInfo = $('.boss_info'),
        $bossDetails = $bossInfo.children(),    //雇主信息的4个input值
        $wechat = $('.wechat'),     // 微信名片
        $contact = $('.contact');   // 个人信息
    // console.log($bossInfo, $bossDetails, $wechat, $contact);
    let i = 0;
    timer = setInterval(()=>{
        if (i>3) {
            clearInterval(timer);
        }
        $($bossDetails[i]).addClass('animated flipInX');
        $($bossDetails[i]).css({
            opacity:1
        });
        i++;
    },300);

    timer2 = setTimeout(()=>{
        // 微信名片从右侧滑入
        $wechat.css({
            transform:'translateX(0)'
        });
        // 个人信息从左侧滑入
        $contact.css({
            transform:'translateX(0)'
        });
    },800);
    
}
// pageSeven();

// 处理第8页
function pageEight() {
    commonMove();
    $($sections[7]).removeClass('hidden').siblings().addClass('hidden');
    // 获取需要操作的元素
}
// pageEight();

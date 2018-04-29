// ui-search 模块
$.fn.UiSearh = function(){
	var ui = $(this);

	// 在ui内查找ui-search-selected
	$('img',ui).on('click',function(){
		$('.ui-search-select-list').show();
		return false;
	});

	$('.ui-search-select-list a',ui).on('click',function(){

		$('.ui-search-selected').text( $(this).text() );
		$('.ui-search-select-list').hide();

		return false;
	});

	$('body').on('click',function(){
		$('.ui-search-select-list').hide();
	})
}

// ui-shopCart 模块
$.fn.UiCart = function(){
	var ui = $(this);

	// 在ui内查找ui-shopcart-list
	$('p',ui).on('mouseover',function(){
		$('.ui-shopcart-list').show();
		return false;
	});

	// $('.ui-search-select-list a',ui).on('click',function(){

	// 	$('.ui-search-selected').text( $(this).text() );
	// 	$('.ui-search-select-list').hide();

	// 	return false;
	// });

	$('body').on('click',function(){
		$('.ui-shopcart-list').hide();
	})
}


// ui-tab 设计

/**
 * @param {string} header  TAB组件，的所有选项卡 item
 * @param {string} content TAB组件，内容区域，所有 item
 * @param {string} focus_prefix  选项卡高亮样式前缀，可选
 */

$.fn.UiTab = function(header, content, triangle){

	var ui = $(this);
	var tabs = $(header, ui);
	var cons = $(content, ui);
	var tri = $(triangle, ui);

	tabs.on('click',function(){
		var index = $(this).index();			//代表当前选中第几个header

		
		tri.removeClass('triangle-top').eq(index).addClass('triangle-top');
		cons.hide().eq(index).show();

		return false;
	})
}

// ui-slidder 

//	1. 左右箭头需要能控制翻页
//	2. 翻页的时候，进度点，要联动进行item_focus
//  3. 翻到第6页的时候，下一页需要回到 第1页，翻到第1页的时候，要可以回到第六页

//  4. 进度点，在点击的时候，需要切换到对应的页面

//  5. 没有（进度点点击、翻页操作）的时候需要进行自动滚动

//  6. 滚动过程中，屏蔽其他操作（自动滚动、左右翻页、进度点点击）

//	7. 高级-无缝滚动
$.fn.UiSlider = function(){

	var ui = $(this);

	var wrap = $('.ui-slider-wrap');

	var btn_prev = $('.ui-slider-arrow .left', ui);
	var btn_next = $('.ui-slider-arrow .right', ui);

	var items  = $('.ui-slider-wrap .item', ui);	// 图片
	var tips  = $('.ui-slider-process .item', ui);	// 圆点

	//	预定义
	
	var current_index = 0;
	var size = items.length;
	var width = items.eq(0).width();
	var enableAuto = true;

	//	设置自动滚动感应（如果鼠标在 wrap 中，不要自动滚动）
	ui
	.on('mouseover',function(){
		enableAuto = false;
	})
	.on('mouseout',function(){
		enableAuto = true;
	})


	//	具体操作
	wrap
	.on('move_prev',function(){
		if(current_index<=0){
			current_index = size;
		}
		current_index = current_index - 1 ;
		wrap.triggerHandler('move_to',current_index);
	})
	.on('move_next',function(){
		if( current_index >= size-1){
			current_index = -1;
		}
		current_index = current_index + 1 ;
		wrap.triggerHandler('move_to',current_index);
	})
	.on('move_to',function(evt,index){
		wrap.css('left',index*width*-1);
		tips.removeClass('item_focus').eq(index).addClass('item_focus');
	})
	.on('auto_move',function(){

		setInterval(function(){
			enableAuto && wrap.triggerHandler('move_next');
		},2500);

	})
	.triggerHandler('auto_move');

	//	事件
	btn_prev.on('click',function(){
		wrap.triggerHandler('move_prev');
	});
	btn_next.on('click',function(){
		wrap.triggerHandler('move_next');
	});
	tips.on('click',function(){
		// 接着点击前的图片播放
		// var index = $(this).index();
		// wrap.triggerHandler('move_to',index);

		// 从点击后图片位置开始播放
		current_index = $(this).index();
		wrap.triggerHandler('move_to',current_index);
	})

}

$.fn.UiFloorChange = function(){
	var ui = $(this);
	var page_height = $(window).height();

	$(window).on('scroll', function(){
		var height = $(this).scrollTop();
		// console.log(height);

		if (height >= (766 - page_height / 2 +  102)) {
			ui.show();
			// alert(1);
		} else {
			ui.hide();
		}
		
		if (height >= (766 - page_height / 2 +  102) && height <= (766 - page_height / 2 + 102 + 513)) {
			$('.item-show',ui).css("display", "block");
			$('.item-hide',ui).css("display", "none");
			$('.first-show',ui).css("display", "none");
			$('.first-hide',ui).css({"display": "block", "color": "#FFF"});
		} else if (height >= (766 - page_height / 2 + 102 + 513) && height <= (766 - page_height / 2 + 102 + 513*2)) {
			$('.item-show',ui).css("display", "block");
			$('.item-hide',ui).css("display", "none");
			$('.second-show',ui).css("display", "none");
			$('.second-hide',ui).css({"display": "block", "color": "#FFF"});
		} else if (height >= (766 - page_height / 2 + 102 + 513*2) && height <= (766 - page_height / 2 + 102 + 513*3)) {
			$('.item-show',ui).css("display", "block");
			$('.item-hide',ui).css("display", "none");
			$('.third-show',ui).css("display", "none");
			$('.third-hide',ui).css({"display": "block", "color": "#FFF"});
		} else if (height >= (766 - page_height / 2 + 102 + 513*3) && height <= (766 - page_height / 2 + 102 + 513*4)) {
			$('.item-show',ui).css("display", "block");
			$('.item-hide',ui).css("display", "none");
			$('.fourth-show',ui).css("display", "none");
			$('.fourth-hide',ui).css({"display": "block", "color": "#FFF"});
		} else if (height >= (766 - page_height / 2 + 102 + 513*4) && height <= (766 - page_height / 2 + 102 + 513*5)) {
			$('.item-show',ui).css("display", "block");
			$('.item-hide',ui).css("display", "none");
			$('.fifth-show',ui).css("display", "none");
			$('.fifth-hide',ui).css({"display": "block", "color": "#FFF"});
		} else {
			$('.item-show',ui).css("display", "block");
			$('.item-hide',ui).css("display", "none");
		}


		// if (height >= 531 && height <= 1061) {
		// 	ui.children('floor-change-item').eq(1).children('item-hide').show();
		// 	console.log(ui.children('floor-change-item'))
		// }
	});
}


// 页面的脚本逻辑 调用顺序
$(function () {

	// $('.login').UiLogin('.title-login', '.title-rege');

	$('.ui-search').UiSearh();
	$('.ui-shopcart').UiCart();
	// 如果不带>，是子孙选择符，会选择所有的item，带>为子代选择符，只会选择下一层里面的item
	$('.content1').UiTab('.caption-right > .caption-right-tab','.block > .block-item', '.caption-right .triangle');
	$('.content2').UiTab('.caption-right > .caption-right-tab','.block > .block-item', '.caption-right .triangle');
	$('.content3').UiTab('.caption-right > .caption-right-tab','.block > .block-item', '.caption-right .triangle');
	$('.content4').UiTab('.caption-right > .caption-right-tab','.block > .block-item', '.caption-right .triangle');
	$('.content5').UiTab('.caption-right > .caption-right-tab','.block > .block-item', '.caption-right .triangle');
	// $('.content-tab .block .item').UiTab('.block-caption > a','.block-content > .block-wrap' , 'block-caption-');

	$('.ui-slider').UiSlider();
	$('.ui-floor-change').UiFloorChange();

	// $('.ui-cascading').UiCascading();

});

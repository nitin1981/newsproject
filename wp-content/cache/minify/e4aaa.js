jQuery(document).ready(function($){"use strict";if($('body').hasClass("rtl")){var rtlValue=true;}else{var rtlValue=false;}
$("#newsTicker").lightSlider({item:1,vertical:true,loop:true,verticalHeight:35,pager:false,enableTouch:false,enableDrag:false,auto:true,controls:true,speed:2000,pause:6000,rtl:rtlValue,prevHtml:'<i class="fa fa-arrow-left"></i>',nextHtml:'<i class="fa fa-arrow-right"></i>',onSliderLoad:function(){$('#newsTicker').removeClass('cS-hidden');}});$('.np-slider').each(function(){var Id=$(this).parent().attr('id');var slideAuto=$(this).data('auto');var slideControl=$(this).data('control');var slidePager=$(this).data('pager');var slideSpeed=$(this).data('speed');var slidePause=$(this).data('pause');var slideLayout=$(this).data('layout');$('body').addClass('slider-'+slideLayout);$('#'+Id+" .npSlider").lightSlider({item:1,pager:slidePager,controls:slideControl,loop:true,auto:slideAuto,speed:slideSpeed,pause:slidePause,enableTouch:false,enableDrag:false,rtl:rtlValue,prevHtml:'<i class="fa fa-angle-left"></i>',nextHtml:'<i class="fa fa-angle-right"></i>',onSliderLoad:function(){$('.npSlider').removeClass('cS-hidden');}});});$('.np-featured-slider').each(function(){var Id=$(this).parent().attr('id');var slideAuto=$(this).data('auto');var slideControl=$(this).data('control');var slidePager=$(this).data('pager');var slideSpeed=$(this).data('speed');var slidePause=$(this).data('pause');$('#'+Id+" .npFeaturedSlider").lightSlider({item:1,pager:slidePager,controls:slideControl,loop:true,auto:slideAuto,speed:slideSpeed,pause:slidePause,slideMargin:0,enableTouch:false,enableDrag:false,rtl:rtlValue,prevHtml:'<i class="fa fa-angle-left"></i>',nextHtml:'<i class="fa fa-angle-right"></i>',onSliderLoad:function(){$('.npFeaturedSlider').removeClass('cS-hidden');}});});$('.np-slider.slider-layout1').each(function(){var Id=$(this).parent().attr('id');var slideAuto=$(this).data('auto');var slideControl=$(this).data('control');var slidePager=$(this).data('pager');var slideSpeed=$(this).data('speed');var slidePause=$(this).data('pause');var slideLayout=$(this).data('layout');$('body').addClass('slider-'+slideLayout);$("#"+Id+" .npSliderGallery").lightSlider({gallery:true,item:1,controls:slideControl,loop:true,thumbItem:5,slideMargin:0,auto:slideAuto,speed:slideSpeed,pause:slidePause,enableTouch:false,enableDrag:false,currentPagerPosition:'left',rtl:rtlValue,prevHtml:'<i class="fa fa-angle-left"></i>',nextHtml:'<i class="fa fa-angle-right"></i>',onSliderLoad:function(el){$('.npSliderGallery').removeClass('cS-hidden');}});});$('.carousel-posts').each(function(){var Id=$(this).parent().attr('id');var NewId=Id;var crsAuto=$(this).data('auto');var crsItem=$(this).data('items');NewId=$('#'+Id+" .postCarousel").lightSlider({auto:crsAuto,loop:true,pauseOnHover:true,pager:false,controls:false,item:crsItem,rtl:rtlValue,onSliderLoad:function(){$('.postCarousel').removeClass('cS-hidden');},responsive:[{breakpoint:840,settings:{item:2,slideMove:1,slideMargin:6,}},{breakpoint:480,settings:{item:1,slideMove:1,}}]});$('#'+Id+' .np-navPrev').click(function(){NewId.goToPrevSlide();});$('#'+Id+' .np-navNext').click(function(){NewId.goToNextSlide();});});$('.embed-gallery').lightSlider({item:1,pager:false,controls:false,loop:true,auto:true,speed:800,pause:3000,enableTouch:false,enableDrag:false,rtl:rtlValue,prevHtml:'<i class="fa fa-angle-left"></i>',nextHtml:'<i class="fa fa-angle-right"></i>',onSliderLoad:function(){$('.embed-gallery').removeClass('cS-hidden');}});$('.gallery-item a').each(function(){var galId=$(this).parents().eq(2).attr('id');$(this).attr('rel','prettyPhoto['+galId+']');});$("a[rel^='prettyPhoto']").prettyPhoto({show_title:false,deeplinking:false,social_tools:''});$("#np-tabbed-widget").tabs();jQuery('.np-header-search-wrapper .search-main').click(function(){jQuery('.search-form-main').toggleClass('active-search');jQuery('.search-form-main .search-field').focus();});jQuery('.np-header-menu-wrapper .menu-toggle').click(function(event){jQuery('.np-header-menu-wrapper #site-navigation').slideToggle('slow');});jQuery('#site-navigation .menu-item-has-children,#site-navigation .page_item_has_children').append('<span class="sub-toggle"> <i class="fa fa-angle-right"></i> </span>');jQuery('#site-navigation .sub-toggle').click(function(){jQuery(this).parent('.menu-item-has-children').children('ul.sub-menu').first().slideToggle('1000');jQuery(this).parent('.page_item_has_children').children('ul.children').first().slideToggle('1000');jQuery(this).children('.fa-angle-right').first().toggleClass('fa-angle-down');});$(window).scroll(function(){if($(this).scrollTop()>1000){$('#np-scrollup').fadeIn('slow');}else{$('#np-scrollup').fadeOut('slow');}});$('#np-scrollup').click(function(){$("html, body").animate({scrollTop:0},600);return false;});if($('#preloader-background').length>0){setTimeout(function(){$('#preloader-background').hide();},600);}
$('.middle-primary, .middle-aside').theiaStickySidebar({additionalMarginTop:30});$('.bottom-primary, .bottom-aside').theiaStickySidebar({additionalMarginTop:30});$('#primary, #secondary').theiaStickySidebar({additionalMarginTop:30});var WowOptionVal=WowOption.mode;if(WowOption.mode=='show'&&$('body').hasClass('home')){new WOW().init();}});
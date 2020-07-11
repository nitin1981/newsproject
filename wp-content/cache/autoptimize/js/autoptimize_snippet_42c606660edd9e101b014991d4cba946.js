try{'use strict';var wpforms=window.wpforms||(function(document,window,$){var app={init:function(){$(document).ready(app.ready);$(window).on('load',app.load);app.bindUIActions();app.bindOptinMonster();},ready:function(){app.clearUrlQuery();app.setUserIndentifier();app.loadValidation();app.loadDatePicker();app.loadTimePicker();app.loadInputMask();app.loadSmartPhoneField();app.loadPayments();app.loadMailcheck();$('.wpforms-randomize').each(function(){var $list=$(this),$listItems=$list.children();while($listItems.length){$list.append($listItems.splice(Math.floor(Math.random()*$listItems.length),1)[0]);}});$(document).trigger('wpformsReady');},load:function(){},clearUrlQuery:function(){var loc=window.location,query=loc.search;if(query.indexOf('wpforms_form_id=')!==-1){query=query.replace(/([&?]wpforms_form_id=[0-9]*$|wpforms_form_id=[0-9]*&|[?&]wpforms_form_id=[0-9]*(?=#))/,'');history.replaceState({},null,loc.origin+loc.pathname+query);}},loadValidation:function(){if(typeof $.fn.validate!=='undefined'){$('.wpforms-input-temp-name').each(function(index,el){var random=Math.floor(Math.random()*9999)+1;$(this).attr('name','wpf-temp-'+random);});$('.wpforms-validate input[type=url]').change(function(){var url=$(this).val();if(!url){return false;}
if(url.substr(0,7)!=='http://'&&url.substr(0,8)!=='https://'){$(this).val('http://'+url);}});$.validator.messages.required=wpforms_settings.val_required;$.validator.messages.url=wpforms_settings.val_url;$.validator.messages.email=wpforms_settings.val_email;$.validator.messages.number=wpforms_settings.val_number;if(typeof $.fn.payment!=='undefined'){$.validator.addMethod('creditcard',function(value,element){var valid=$.payment.validateCardNumber(value);return this.optional(element)||valid;},wpforms_settings.val_creditcard);}
$.validator.addMethod('extension',function(value,element,param){param='string'===typeof param?param.replace(/,/g,'|'):'png|jpe?g|gif';return this.optional(element)||value.match(new RegExp('\\.('+param+')$','i'));},wpforms_settings.val_fileextension);$.validator.addMethod('maxsize',function(value,element,param){var maxSize=param,optionalValue=this.optional(element),i,len,file;if(optionalValue){return optionalValue;}
if(element.files&&element.files.length){i=0;len=element.files.length;for(;i<len;i++){file=element.files[i];if(file.size>maxSize){return false;}}}
return true;},wpforms_settings.val_filesize);$.validator.methods.email=function(value,element){return this.optional(element)||/^[a-z0-9.!#$%&'*+\/=?^_`{|}~-]+@((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}$/i.test(value);};$.validator.addMethod('confirm',function(value,element,param){return $.validator.methods.equalTo.call(this,value,element,param);},wpforms_settings.val_confirm);$.validator.addMethod('required-payment',function(value,element){return app.amountSanitize(value)>0;},wpforms_settings.val_requiredpayment);$.validator.addMethod('time12h',function(value,element){return this.optional(element)||/^((0?[1-9]|1[012])(:[0-5]\d){1,2}(\ ?[AP]M))$/i.test(value);},wpforms_settings.val_time12h);$.validator.addMethod('time24h',function(value,element){return this.optional(element)||/^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(\ ?[AP]M)?$/i.test(value);},wpforms_settings.val_time24h);$.validator.addMethod('check-limit',function(value,element){var $ul=$(element).closest('ul'),$checked=$ul.find('input[type="checkbox"]:checked'),choiceLimit=parseInt($ul.attr('data-choice-limit')||0,10);if(0===choiceLimit){return true;}
return $checked.length<=choiceLimit;},function(params,element){var choiceLimit=parseInt($(element).closest('ul').attr('data-choice-limit')||0,10);return wpforms_settings.val_checklimit.replace('{#}',choiceLimit);});if(typeof $.fn.intlTelInput!=='undefined'){$.validator.addMethod('smart-phone-field',function(value,element){if(value.match(/[^\d()\-+\s]/)){return false;}
return this.optional(element)||$(element).intlTelInput('isValidNumber');},wpforms_settings.val_phone);}
$.validator.addMethod('us-phone-field',function(value,element){if(value.match(/[^\d()\-+\s]/)){return false;}
return this.optional(element)||value.replace(/[^\d]/g,'').length===10;},wpforms_settings.val_phone);$.validator.addMethod('int-phone-field',function(value,element){if(value.match(/[^\d()\-+\s]/)){return false;}
return this.optional(element)||value.replace(/[^\d]/g,'').length>0;},wpforms_settings.val_phone);$('.wpforms-validate').each(function(){var form=$(this),formID=form.data('formid'),properties;if(typeof window['wpforms_'+formID]!=='undefined'&&window['wpforms_'+formID].hasOwnProperty('validate')){properties=window['wpforms_'+formID].validate;}else if(typeof wpforms_validate!=='undefined'){properties=wpforms_validate;}else{properties={errorClass:'wpforms-error',validClass:'wpforms-valid',errorPlacement:function(error,element){if('radio'===element.attr('type')||'checkbox'===element.attr('type')){if(element.hasClass('wpforms-likert-scale-option')){if(element.closest('table').hasClass('single-row')){element.closest('table').after(error);}else{element.closest('tr').find('th').append(error);}}else if(element.hasClass('wpforms-net-promoter-score-option')){element.closest('table').after(error);}else{element.closest('.wpforms-field-checkbox').find('label.wpforms-error').remove();element.parent().parent().parent().append(error);}}else if(element.is('select')&&element.attr('class').match(/date-month|date-day|date-year/)){if(0===element.parent().find('label.wpforms-error:visible').length){element.parent().find('select:last').after(error);}}else if(element.hasClass('wpforms-smart-phone-field')){element.parent().after(error);}else if(element.hasClass('wpforms-validation-group-member')){element.closest('.wpforms-field').append(error);}else{error.insertAfter(element);}},highlight:function(element,errorClass,validClass){var $element=$(element),$field=$element.closest('.wpforms-field'),inputName=$element.attr('name');if('radio'===$element.attr('type')||'checkbox'===$element.attr('type')){$field.find('input[name="'+inputName+'"]').addClass(errorClass).removeClass(validClass);}else{$element.addClass(errorClass).removeClass(validClass);}
$field.addClass('wpforms-has-error');},unhighlight:function(element,errorClass,validClass){var $element=$(element),$field=$element.closest('.wpforms-field'),inputName=$element.attr('name');if('radio'===$element.attr('type')||'checkbox'===$element.attr('type')){$field.find('input[name="'+inputName+'"]').addClass(validClass).removeClass(errorClass);}else{$element.addClass(validClass).removeClass(errorClass);}
$field.removeClass('wpforms-has-error');},submitHandler:function(form){var $form=$(form),$submit=$form.find('.wpforms-submit'),altText=$submit.data('alt-text'),recaptchaID=$submit.get(0).recaptchaID;$submit.prop('disabled',true);$form.find('#wpforms-field_recaptcha-error').remove();if(!app.empty(recaptchaID)||recaptchaID===0){grecaptcha.execute(recaptchaID).then(null,function(reason){reason=(null===reason)?'':'<br>'+reason;$form.find('.wpforms-recaptcha-container').append('<label id="wpforms-field_recaptcha-error" class="wpforms-error"> '+wpforms_settings.val_recaptcha_fail_msg+reason+'</label>');$submit.prop('disabled',false);});return false;}
if(altText){$submit.text(altText);}
$('.wpforms-input-temp-name').removeAttr('name');app.formSubmit($form);},invalidHandler:function(event,validator){if(typeof validator.errorList[0]!=='undefined'){app.scrollToError($(validator.errorList[0].element));}},onkeyup:function(element,event){var excludedKeys=[16,17,18,20,35,36,37,38,39,40,45,144,225];if($(element).hasClass('wpforms-novalidate-onkeyup')){return;}
if(9===event.which&&''===this.elementValue(element)||$.inArray(event.keyCode,excludedKeys)!==-1){return;}else if(element.name in this.submitted||element.name in this.invalid){this.element(element);}},onfocusout:function(element){var validate=false;if($(element).hasClass('wpforms-novalidate-onkeyup')&&!element.value){validate=true;}
if(!this.checkable(element)&&(element.name in this.submitted||!this.optional(element))){validate=true;}
if(validate){this.element(element);}},onclick:function(element){var validate=false,type=(element||{}).type,$el=$(element);if(['checkbox','radio'].indexOf(type)>-1){if($el.hasClass('wpforms-likert-scale-option')){$el=$el.closest('tr');}else{$el=$el.closest('.wpforms-field');}
$el.find('label.wpforms-error').remove();validate=true;}
if(validate){this.element(element);}},};}
form.validate(properties);});}},loadDatePicker:function(){if(typeof $.fn.flatpickr!=='undefined'){$('.wpforms-datepicker-wrap').each(function(){var element=$(this),form=element.closest('.wpforms-form'),formID=form.data('formid'),fieldID=element.closest('.wpforms-field').data('field-id'),properties;if(typeof window['wpforms_'+formID+'_'+fieldID]!=='undefined'&&window['wpforms_'+formID+'_'+fieldID].hasOwnProperty('datepicker')){properties=window['wpforms_'+formID+'_'+fieldID].datepicker;}else if(typeof window['wpforms_'+formID]!=='undefined'&&window['wpforms_'+formID].hasOwnProperty('datepicker')){properties=window['wpforms_'+formID].datepicker;}else if(typeof wpforms_datepicker!=='undefined'){properties=wpforms_datepicker;}else{properties={disableMobile:true,};}
if(!properties.hasOwnProperty('locale')&&typeof wpforms_settings!=='undefined'&&wpforms_settings.hasOwnProperty('locale')){properties.locale=wpforms_settings.locale;}
properties.wrap=true;properties.dateFormat=element.find('input').data('date-format');properties.onChange=function(selectedDates,dateStr,instance){var display=dateStr===''?'none':'block';element.find('.wpforms-datepicker-clear').css('display',display);};element.flatpickr(properties);});}},loadTimePicker:function(){if(typeof $.fn.timepicker!=='undefined'){$('.wpforms-timepicker').each(function(){var element=$(this),form=element.closest('.wpforms-form'),formID=form.data('formid'),fieldID=element.closest('.wpforms-field').data('field-id'),properties;if(typeof window['wpforms_'+formID+'_'+fieldID]!=='undefined'&&window['wpforms_'+formID+'_'+fieldID].hasOwnProperty('timepicker')){properties=window['wpforms_'+formID+'_'+fieldID].timepicker;}else if(typeof window['wpforms_'+formID]!=='undefined'&&window['wpforms_'+formID].hasOwnProperty('timepicker')){properties=window['wpforms_'+formID].timepicker;}else if(typeof wpforms_timepicker!=='undefined'){properties=wpforms_timepicker;}else{properties={scrollDefault:'now',forceRoundTime:true,};}
element.timepicker(properties);});}},loadInputMask:function(){if(typeof $.fn.inputmask==='undefined'){return;}
$('.wpforms-masked-input').inputmask();},loadSmartPhoneField:function(){if(typeof $.fn.intlTelInput==='undefined'){return;}
var inputOptions={};if(!wpforms_settings.gdpr){inputOptions.geoIpLookup=app.currentIpToCountry;}
if(wpforms_settings.gdpr){var lang=this.getFirstBrowserLanguage(),countryCode=lang.indexOf('-')>-1?lang.split('-').pop():'';}
if(countryCode){var countryData=window.intlTelInputGlobals.getCountryData();countryData=countryData.filter(function(country){return country.iso2===countryCode.toLowerCase();});countryCode=countryData.length?countryCode:'';}
inputOptions.initialCountry=wpforms_settings.gdpr&&countryCode?countryCode:'auto';$('.wpforms-smart-phone-field').each(function(i,el){var $el=$(el);inputOptions.hiddenInput=$el.closest('.wpforms-field-phone').data('field-id');inputOptions.utilsScript=wpforms_settings.wpforms_plugin_url+'pro/assets/js/vendor/jquery.intl-tel-input-utils.js';$el.intlTelInput(inputOptions);$el.removeAttr('name');$el.on('blur input',function(){if($el.intlTelInput('isValidNumber')||!app.empty(window.WPFormsEditEntry)){$el.siblings('input[type="hidden"]').val($el.intlTelInput('getNumber'));}});});},loadPayments:function(){$('.wpforms-payment-total').each(function(index,el){app.amountTotal(this);});if(typeof $.fn.payment!=='undefined'){$('.wpforms-field-credit-card-cardnumber').payment('formatCardNumber');$('.wpforms-field-credit-card-cardcvc').payment('formatCardCVC');}},loadMailcheck:function(){if(!wpforms_settings.mailcheck_enabled){return;}
if(typeof $.fn.mailcheck==='undefined'){return;}
if(wpforms_settings.mailcheck_domains.length>0){Mailcheck.defaultDomains=Mailcheck.defaultDomains.concat(wpforms_settings.mailcheck_domains);}
if(wpforms_settings.mailcheck_toplevel_domains.length>0){Mailcheck.defaultTopLevelDomains=Mailcheck.defaultTopLevelDomains.concat(wpforms_settings.mailcheck_toplevel_domains);}
$(document).on('blur','.wpforms-field-email input',function(){var $t=$(this),id=$t.attr('id');$t.mailcheck({suggested:function(el,suggestion){$('#'+id+'_suggestion').remove();var sugg='<a href="#" class="mailcheck-suggestion" data-id="'+id+'" title="'+wpforms_settings.val_email_suggestion_title+'">'+suggestion.full+'</a>';sugg=wpforms_settings.val_email_suggestion.replace('{suggestion}',sugg);$(el).after('<label class="wpforms-error mailcheck-error" id="'+id+'_suggestion">'+sugg+'</label>');},empty:function(){$('#'+id+'_suggestion').remove();},});});$(document).on('click','.wpforms-field-email .mailcheck-suggestion',function(e){var $t=$(this),id=$t.attr('data-id');e.preventDefault();$('#'+id).val($t.text());$t.parent().remove();});},bindUIActions:function(){$(document).on('click','.wpforms-page-button',function(event){event.preventDefault();app.pagebreakNav(this);});$(document).on('change input','.wpforms-payment-price',function(){app.amountTotal(this,true);});$(document).on('input','.wpforms-payment-user-input',function(){var $this=$(this),amount=$this.val();$this.val(amount.replace(/[^0-9.,]/g,''));});$(document).on('focusout','.wpforms-payment-user-input',function(){var $this=$(this),amount=$this.val(),sanitized=app.amountSanitize(amount),formatted=app.amountFormat(sanitized);$this.val(formatted);});$(document).on('wpformsProcessConditionals',function(e,el){app.amountTotal(el,true);});$(document).ready(function(){$('.wpforms-field-radio .wpforms-image-choices-item input:checked').change();$('.wpforms-field-payment-multiple .wpforms-image-choices-item input:checked').change();$('.wpforms-field-checkbox .wpforms-image-choices-item input').change();$('.wpforms-field-payment-checkbox .wpforms-image-choices-item input').change();});$('.wpforms-field-rating-item').hover(function(){$(this).parent().find('.wpforms-field-rating-item').removeClass('selected hover');$(this).prevAll().addBack().addClass('hover');},function(){$(this).parent().find('.wpforms-field-rating-item').removeClass('selected hover');$(this).parent().find('input:checked').parent().prevAll().addBack().addClass('selected');});$(document).on('change','.wpforms-field-rating-item input',function(){var $this=$(this),$wrap=$this.closest('.wpforms-field-rating-items'),$items=$wrap.find('.wpforms-field-rating-item');$items.removeClass('hover selected');$this.parent().prevAll().addBack().addClass('selected');});$(document).ready(function(){$('.wpforms-field-rating-item input:checked').change();});$(document).on('keypress','.wpforms-image-choices-item label',function(event){var $this=$(this),$field=$this.closest('.wpforms-field');if($field.hasClass('wpforms-conditional-hide')){event.preventDefault();return false;}
if(13===event.which){$('#'+$this.attr('for')).click();}});if(window.document.documentMode){$(document).on('click','.wpforms-image-choices-item img',function(){$(this).closest('label').find('input').click();});}
$(document).on('change','.wpforms-field-checkbox input, .wpforms-field-radio input, .wpforms-field-payment-multiple input, .wpforms-field-payment-checkbox input, .wpforms-field-gdpr-checkbox input',function(event){var $this=$(this),$field=$this.closest('.wpforms-field');if($field.hasClass('wpforms-conditional-hide')){event.preventDefault();return false;}
switch($this.attr('type')){case'radio':$this.closest('ul').find('li').removeClass('wpforms-selected').find('input[type=radio]').removeProp('checked');$this.prop('checked',true).closest('li').addClass('wpforms-selected');break;case'checkbox':if($this.is(':checked')){$this.closest('li').addClass('wpforms-selected');$this.prop('checked',true);}else{$this.closest('li').removeClass('wpforms-selected');$this.prop('checked',false);}
break;}});$(document).on('change','.wpforms-field-file-upload input[type=file]:not(".dropzone-input")',function(){var $this=$(this),$uploads=$this.closest('form.wpforms-form').find('.wpforms-field-file-upload input:not(".dropzone-input")'),totalSize=0,postMaxSize=Number(wpforms_settings.post_max_size),errorMsg='<div class="wpforms-error-container-post_max_size">'+wpforms_settings.val_post_max_size+'</div>',errorCntTpl='<div class="wpforms-error-container">{errorMsg}</span></div>',$submitCnt=$this.closest('form.wpforms-form').find('.wpforms-submit-container'),$submitBtn=$submitCnt.find('button.wpforms-submit'),$errorCnt=$submitCnt.prev();$uploads.each(function(){var $upload=$(this),i=0,len=$upload[0].files.length;for(;i<len;i++){totalSize+=$upload[0].files[i].size;}});if(totalSize>postMaxSize){totalSize=Number((totalSize/1048576).toFixed(3));postMaxSize=Number((postMaxSize/1048576).toFixed(3));errorMsg=errorMsg.replace(/{totalSize}/,totalSize).replace(/{maxSize}/,postMaxSize);if($errorCnt.hasClass('wpforms-error-container')){$errorCnt.find('.wpforms-error-container-post_max_size').remove();$errorCnt.append(errorMsg);}else{$submitCnt.before(errorCntTpl.replace(/{errorMsg}/,errorMsg));}
$submitBtn.prop('disabled',true);}else{$errorCnt.find('.wpforms-error-container-post_max_size').remove();$submitBtn.prop('disabled',false);}});$(document).on('change input','.wpforms-field-number-slider input[type=range]',function(event){var hintEl=$(event.target).siblings('.wpforms-field-number-slider-hint');hintEl.html(hintEl.data('hint').replace('{value}','<b>'+event.target.value+'</b>'));});$(document).on('keydown','.wpforms-form input',function(e){if(e.keyCode!==13){return;}
var $t=$(this),$page=$t.closest('.wpforms-page');if($page.length===0){return;}
if(['text','tel','number','email','url','radio','checkbox'].indexOf($t.attr('type'))<0){return;}
if($t.hasClass('wpforms-datepicker')){$t.flatpickr('close');}
e.preventDefault();if($page.hasClass('last')){$page.closest('.wpforms-form').find('.wpforms-submit').click();return;}
$page.find('.wpforms-page-next').click();});$(document).on('input','.wpforms-field-number input',function(e){this.value=this.value.replace(/[^-0-9.]/g,'');});},scrollToError:function($el){if($el.length===0){return;}
var $field=$el.find('.wpforms-field.wpforms-has-error');if($field.length===0){$field=$el.closest('.wpforms-field');}
if($field.length===0){return;}
var offset=$field.offset();if(typeof offset==='undefined'){return;}
app.animateScrollTop(offset.top-75,750).done(function(){var $error=$field.find('.wpforms-error').first();if(app.isFunction($error.focus)){$error.focus();}});},pagebreakNav:function(el){var $this=$(el),valid=true,action=$this.data('action'),page=$this.data('page'),page2=page,next=page+1,prev=page-1,formID=$this.data('formid'),$form=$this.closest('.wpforms-form'),$page=$form.find('.wpforms-page-'+page),$submit=$form.find('.wpforms-submit-container'),$indicator=$form.find('.wpforms-page-indicator'),$reCAPTCHA=$form.find('.wpforms-recaptcha-container'),pageScroll=false;if(false===window.wpforms_pageScroll){pageScroll=false;}else if(!app.empty(window.wpform_pageScroll)){pageScroll=window.wpform_pageScroll;}else{pageScroll=$indicator.data('scroll')!==0?75:false;}
if('next'===action){if(typeof $.fn.validate!=='undefined'){$page.find(':input').each(function(index,el){if(!$(el).valid()){valid=false;}});app.scrollToError($page);}
if(valid){page2=next;$page.hide();var $nextPage=$form.find('.wpforms-page-'+next);$nextPage.show();if($nextPage.hasClass('last')){$reCAPTCHA.show();$submit.show();}
if(pageScroll){app.animateScrollTop($form.offset().top-pageScroll,750);}
$this.trigger('wpformsPageChange',[page2,$form]);}}else if('prev'===action){page2=prev;$page.hide();$form.find('.wpforms-page-'+prev).show();$reCAPTCHA.hide();$submit.hide();if(pageScroll){app.animateScrollTop($form.offset().top-pageScroll);}
$this.trigger('wpformsPageChange',[page2,$form]);}
if($indicator){var theme=$indicator.data('indicator'),color=$indicator.data('indicator-color');if('connector'===theme||'circles'===theme){$indicator.find('.wpforms-page-indicator-page').removeClass('active');$indicator.find('.wpforms-page-indicator-page-'+page2).addClass('active');$indicator.find('.wpforms-page-indicator-page-number').removeAttr('style');$indicator.find('.active .wpforms-page-indicator-page-number').css('background-color',color);if('connector'===theme){$indicator.find('.wpforms-page-indicator-page-triangle').removeAttr('style');$indicator.find('.active .wpforms-page-indicator-page-triangle').css('border-top-color',color);}}else if('progress'===theme){var $pageTitle=$indicator.find('.wpforms-page-indicator-page-title'),$pageSep=$indicator.find('.wpforms-page-indicator-page-title-sep'),totalPages=$form.find('.wpforms-page').length,width=(page2/totalPages)*100;$indicator.find('.wpforms-page-indicator-page-progress').css('width',width+'%');$indicator.find('.wpforms-page-indicator-steps-current').text(page2);if($pageTitle.data('page-'+page2+'-title')){$pageTitle.css('display','inline').text($pageTitle.data('page-'+page2+'-title'));$pageSep.css('display','inline');}else{$pageTitle.css('display','none');$pageSep.css('display','none');}}}},bindOptinMonster:function(){document.addEventListener('om.Campaign.load',function(event){app.ready();app.optinMonsterRecaptchaReset(event.detail.Campaign.data.id);});$(document).on('OptinMonsterOnShow',function(event,data,object){app.ready();app.optinMonsterRecaptchaReset(data.optin);});},optinMonsterRecaptchaReset:function(optinId){var $form=$('#om-'+optinId).find('.wpforms-form'),$recaptchaContainer=$form.find('.wpforms-recaptcha-container'),$recaptcha=$form.find('.g-recaptcha'),recaptchaSiteKey=$recaptcha.attr('data-sitekey'),recaptchaID='recaptcha-'+Date.now();if($form.length&&$recaptcha.length){$recaptcha.remove();$recaptchaContainer.prepend('<div class="g-recaptcha" id="'+recaptchaID+'" data-sitekey="'+recaptchaSiteKey+'"></div>');grecaptcha.render(recaptchaID,{sitekey:recaptchaSiteKey,callback:function(){wpformsRecaptchaCallback($('#'+recaptchaID));},});}},amountTotal:function(el,validate){validate=validate||false;var $form=$(el).closest('.wpforms-form'),total=0,totalFormatted,totalFormattedSymbol,currency=app.getCurrency();$('.wpforms-payment-price',$form).each(function(index,el){var amount=0,$this=$(this);if($this.closest('.wpforms-field-payment-single').hasClass('wpforms-conditional-hide')){return;}
if('text'===$this.attr('type')||'hidden'===$this.attr('type')){amount=$this.val();}else if(('radio'===$this.attr('type')||'checkbox'===$this.attr('type'))&&$this.is(':checked')){amount=$this.data('amount');}else if($this.is('select')&&$this.find('option:selected').length>0){amount=$this.find('option:selected').data('amount');}
if(!app.empty(amount)){amount=app.amountSanitize(amount);total=Number(total)+Number(amount);}});totalFormatted=app.amountFormat(total);if('left'===currency.symbol_pos){totalFormattedSymbol=currency.symbol+' '+totalFormatted;}else{totalFormattedSymbol=totalFormatted+' '+currency.symbol;}
$form.find('.wpforms-payment-total').each(function(index,el){if('hidden'===$(this).attr('type')||'text'===$(this).attr('type')){$(this).val(totalFormattedSymbol);if('text'===$(this).attr('type')&&validate&&$form.data('validator')){$(this).valid();}}else{$(this).text(totalFormattedSymbol);}});},amountSanitize:function(amount){var currency=app.getCurrency();amount=amount.toString().replace(/[^0-9.,]/g,'');if(','===currency.decimal_sep&&(amount.indexOf(currency.decimal_sep)!==-1)){if('.'===currency.thousands_sep&&amount.indexOf(currency.thousands_sep)!==-1){amount=amount.replace(currency.thousands_sep,'');}else if(''===currency.thousands_sep&&amount.indexOf('.')!==-1){amount=amount.replace('.','');}
amount=amount.replace(currency.decimal_sep,'.');}else if(','===currency.thousands_sep&&(amount.indexOf(currency.thousands_sep)!==-1)){amount=amount.replace(currency.thousands_sep,'');}
return app.numberFormat(amount,2,'.','');},amountFormat:function(amount){var currency=app.getCurrency();amount=String(amount);if(','===currency.decimal_sep&&(amount.indexOf(currency.decimal_sep)!==-1)){var sepFound=amount.indexOf(currency.decimal_sep),whole=amount.substr(0,sepFound),part=amount.substr(sepFound+1,amount.strlen-1);amount=whole+'.'+part;}
if(','===currency.thousands_sep&&(amount.indexOf(currency.thousands_sep)!==-1)){amount=amount.replace(',','');}
if(app.empty(amount)){amount=0;}
return app.numberFormat(amount,2,currency.decimal_sep,currency.thousands_sep);},getCurrency:function(){var currency={code:'USD',thousands_sep:',',decimal_sep:'.',symbol:'$',symbol_pos:'left',};if(typeof wpforms_settings.currency_code!=='undefined'){currency.code=wpforms_settings.currency_code;}
if(typeof wpforms_settings.currency_thousands!=='undefined'){currency.thousands_sep=wpforms_settings.currency_thousands;}
if(typeof wpforms_settings.currency_decimal!=='undefined'){currency.decimal_sep=wpforms_settings.currency_decimal;}
if(typeof wpforms_settings.currency_symbol!=='undefined'){currency.symbol=wpforms_settings.currency_symbol;}
if(typeof wpforms_settings.currency_symbol_pos!=='undefined'){currency.symbol_pos=wpforms_settings.currency_symbol_pos;}
return currency;},numberFormat:function(number,decimals,decimalSep,thousandsSep){number=(number+'').replace(/[^0-9+\-Ee.]/g,'');var n=!isFinite(+number)?0:+number;var prec=!isFinite(+decimals)?0:Math.abs(decimals);var sep=('undefined'===typeof thousandsSep)?',':thousandsSep;var dec=('undefined'===typeof decimalSep)?'.':decimalSep;var s;var toFixedFix=function(n,prec){var k=Math.pow(10,prec);return''+(Math.round(n*k)/k).toFixed(prec);};s=(prec?toFixedFix(n,prec):''+Math.round(n)).split('.');if(s[0].length>3){s[0]=s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,sep);}
if((s[1]||'').length<prec){s[1]=s[1]||'';s[1]+=new Array(prec-s[1].length+1).join('0');}
return s.join(dec);},empty:function(mixedVar){var undef;var key;var i;var len;var emptyValues=[undef,null,false,0,'','0'];for(i=0,len=emptyValues.length;i<len;i++){if(mixedVar===emptyValues[i]){return true;}}
if('object'===typeof mixedVar){for(key in mixedVar){if(mixedVar.hasOwnProperty(key)){return false;}}
return true;}
return false;},setUserIndentifier:function(){if(((!window.hasRequiredConsent&&typeof wpforms_settings!=='undefined'&&wpforms_settings.uuid_cookie)||(window.hasRequiredConsent&&window.hasRequiredConsent()))&&!app.getCookie('_wpfuuid')){var s=new Array(36),hexDigits='0123456789abcdef',uuid;for(var i=0;i<36;i++){s[i]=hexDigits.substr(Math.floor(Math.random()*0x10),1);}
s[14]='4';s[19]=hexDigits.substr((s[19]&0x3)|0x8,1);s[8]=s[13]=s[18]=s[23]='-';uuid=s.join('');app.createCookie('_wpfuuid',uuid,3999);}},createCookie:function(name,value,days){var expires='';if(days){if('-1'===days){expires='';}else{var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));expires='; expires='+date.toGMTString();}}else{expires='; expires=Thu, 01 Jan 1970 00:00:01 GMT';}
document.cookie=name+'='+value+expires+'; path=/; samesite=strict';},getCookie:function(name){var nameEQ=name+'=',ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(' '===c.charAt(0)){c=c.substring(1,c.length);}
if(0===c.indexOf(nameEQ)){return c.substring(nameEQ.length,c.length);}}
return null;},removeCookie:function(name){app.createCookie(name,'',-1);},getFirstBrowserLanguage:function(){var nav=window.navigator,browserLanguagePropertyKeys=['language','browserLanguage','systemLanguage','userLanguage'],i,language;if(Array.isArray(nav.languages)){for(i=0;i<nav.languages.length;i++){language=nav.languages[i];if(language&&language.length){return language;}}}
for(i=0;i<browserLanguagePropertyKeys.length;i++){language=nav[browserLanguagePropertyKeys[i]];if(language&&language.length){return language;}}
return'';},currentIpToCountry:function(callback){var fallback=function(){$.get('https://ipapi.co/jsonp',function(){},'jsonp').always(function(resp){var countryCode=(resp&&resp.country)?resp.country:'';if(!countryCode){var lang=app.getFirstBrowserLanguage();countryCode=lang.indexOf('-')>-1?lang.split('-').pop():'';}
callback(countryCode);});};$.get('https://geo.wpforms.com/v3/geolocate/json').done(function(resp){if(resp&&resp.country_iso){callback(resp.country_iso);}else{fallback();}}).fail(function(resp){fallback();});},formSubmit:function($form){if($form.hasClass('wpforms-ajax-form')&&typeof FormData!=='undefined'){app.formSubmitAjax($form);}else{app.formSubmitNormal($form);}},formSubmitNormal:function($form){if(!$form.length){return;}
var $submit=$form.find('.wpforms-submit'),recaptchaID=$submit.get(0).recaptchaID;if(!app.empty(recaptchaID)||recaptchaID===0){$submit.get(0).recaptchaID=false;}
$form.get(0).submit();},resetFormRecaptcha:function($form){if(!$form||!$form.length){return;}
if(typeof grecaptcha==='undefined'){return;}
var recaptchaID;recaptchaID=$form.find('.wpforms-submit').get(0).recaptchaID;if(app.empty(recaptchaID)&&recaptchaID!==0){recaptchaID=$form.find('.g-recaptcha').data('recaptcha-id');}
if(!app.empty(recaptchaID)||recaptchaID===0){grecaptcha.reset(recaptchaID);}},consoleLogAjaxError:function(error){if(error){console.error('WPForms AJAX submit error:\n%s',error);}else{console.error('WPForms AJAX submit error');}},displayFormAjaxErrors:function($form,errors){if('string'===typeof errors){app.displayFormAjaxGeneralErrors($form,errors);return;}
errors=errors&&('errors'in errors)?errors.errors:null;if(app.empty(errors)||(app.empty(errors.general)&&app.empty(errors.field))){app.consoleLogAjaxError();return;}
if(!app.empty(errors.general)){app.displayFormAjaxGeneralErrors($form,errors.general);}
if(!app.empty(errors.field)){app.displayFormAjaxFieldErrors($form,errors.field);}},displayFormAjaxGeneralErrors:function($form,errors){if(!$form||!$form.length){return;}
if(app.empty(errors)){return;}
if('string'===typeof errors){$form.find('.wpforms-submit-container').before('<div class="wpforms-error-container">'+errors+'</div>');return;}
$.each(errors,function(type,html){switch(type){case'header':$form.prepend(html);break;case'footer':$form.find('.wpforms-submit-container').before(html);break;case'recaptcha':$form.find('.wpforms-recaptcha-container').append(html);break;}});},clearFormAjaxGeneralErrors:function($form){$form.find('.wpforms-error-container').remove();$form.find('#wpforms-field_recaptcha-error').remove();},displayFormAjaxFieldErrors:function($form,errors){if(!$form||!$form.length){return;}
if(app.empty(errors)){return;}
var validator=$form.data('validator');if(!validator){return;}
validator.showErrors(errors);validator.focusInvalid();},formSubmitAjax:function($form){if(!$form.length){return $.Deferred().reject();}
var $container=$form.closest('.wpforms-container'),$spinner=$form.find('.wpforms-submit-spinner'),$confirmationScroll,formData,args;$container.css('opacity',0.6);$spinner.show();app.clearFormAjaxGeneralErrors($form);formData=new FormData($form.get(0));formData.append('action','wpforms_submit');formData.append('page_url',window.location.href);args={type:'post',dataType:'json',url:wpforms_settings.ajaxurl,data:formData,cache:false,contentType:false,processData:false,};args.success=function(json){if(!json){app.consoleLogAjaxError();return;}
if(json.data&&json.data.action_required){$form.trigger('wpformsAjaxSubmitActionRequired',json);return;}
if(!json.success){app.resetFormRecaptcha($form);app.displayFormAjaxErrors($form,json.data);$form.trigger('wpformsAjaxSubmitFailed',json);return;}
$form.trigger('wpformsAjaxSubmitSuccess',json);if(!json.data){return;}
if(json.data.redirect_url){$form.trigger('wpformsAjaxSubmitBeforeRedirect',json);window.location=json.data.redirect_url;return;}
if(json.data.confirmation){$container.html(json.data.confirmation);$confirmationScroll=$container.find('div.wpforms-confirmation-scroll');if($confirmationScroll.length){app.animateScrollTop($confirmationScroll.offset().top-100);}}};args.error=function(jqHXR,textStatus,error){app.consoleLogAjaxError(error);$form.trigger('wpformsAjaxSubmitError',[jqHXR,textStatus,error]);};args.complete=function(jqHXR,textStatus){if(jqHXR.responseJSON&&jqHXR.responseJSON.data&&jqHXR.responseJSON.data.action_required){return;}
var $submit=$form.find('.wpforms-submit'),submitText=$submit.data('submit-text');if(submitText){$submit.text(submitText);}
$submit.prop('disabled',false);$container.css('opacity','');$spinner.hide();$form.trigger('wpformsAjaxSubmitCompleted',[jqHXR,textStatus]);};$form.trigger('wpformsAjaxBeforeSubmit');return $.ajax(args);},animateScrollTop:function(position,duration,complete){duration=duration||1000;complete=app.isFunction(complete)?complete:function(){};return $('html, body').animate({scrollTop:parseInt(position,10)},{duration:duration,complete:complete}).promise();},isFunction:function(object){return!!(object&&object.constructor&&object.call&&object.apply);},};return app;}(document,window,jQuery));wpforms.init();}catch(e){}
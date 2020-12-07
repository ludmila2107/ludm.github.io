
$(function(){
let list=$('list');
let items=$('.list li:odd');

list.css({'list-style': 'none', 'padding': '0'});




    items.css('padding','20px');
    items.css('background-color', 'lightyellow');
    $('.list li:contains("привет")').css('background-color','darked');
    $('.list li:emty').html('<strong>ПРивет</strong>');
        
$('.list').children().addClass('item');
    $('.list').next().css({
        'width': '80%',
        'padding':'20px',
        'border':'3px dotted gold',
    'margin': 'auto',
    'background-image': 'linear-gradient(white,lightyellow)'
    })

});
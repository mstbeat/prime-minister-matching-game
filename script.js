var score = 0;
var imagesArr = [
  "images/福田康夫.jpg",
  "images/橋本龍太郎.jpg",
  "images/鳩山由紀夫.jpg",
  "images/菅直人.jpg",
  "images/森喜朗.jpg",
  "images/野田佳彦.jpg",
  "images/小渕恵三.jpg"
];
var namesArr = [
  "野田佳彦",
  "菅直人",
  "鳩山由紀夫",
  "福田康夫",
  "森喜朗",
  "小渕恵三",
  "橋本龍太郎"
];
$(document).ready(function(){
  shuffle(imagesArr);
  $.each(imagesArr, function(index, value) {
    var image = value.slice(7,-4);
    $("<div><img src=" + value + " /></div>")
    .appendTo("#images")
    .draggable({
      revert:true,
      scope:image
    });
  })
  shuffle(namesArr);
  $.each(namesArr, function(index, value) {
    $("<div>" + value + "</div>")
    .appendTo("#droparea")
    .droppable({
      scope:value,
      drop:function(event, ui) {
        $(ui.draggable).append("<br>" + $(this).text());
        score++;
        $(this).hide("puff", "fast");

        if(score == imagesArr.length) {
          $('#droparea').removeAttr('id','droparea');
          $("<div><p>全問正解です！<br>もう一度プレーしますか？</p></div>").dialog({
            modal:true,
            title:"ゲーム終了",
            buttons:[
              {
                text:"はい",
                click:function() {
                  window.location.reload();
                }
              },
              {
                text:"いいえ",
                click:function() {
                $(this).dialog("close");
                }
              }
            ]
          });
        }
      }
    });
  })
});

function shuffle(arr) {
  return arr.sort(function() {
    return .5 - Math.random();
  });
}
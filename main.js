$(document).ready(function(){

  function bodyDisplay(objs){
    $.getJSON('https://calm-beach-80027.herokuapp.com/timeline', objs,  function(data){
      timelineDisplay(data)
      console.log(data)
    })
  }
  var source   = $("#chirp-template").html();
  var template = Handlebars.compile(source);

  function timelineDisplay(obj) {
    $.each(obj, function(i, chirp){
      var context = {avatar: chirp.user.avatar,
        body: chirp.body,
        user: chirp.user.username,
        created: moment(chirp.created_at).format('MMMM Do YYYY, h:mm:ss a')};
      var html    = template(context);
      $('#timeline').append(html)
    })
  }

  bodyDisplay()
})

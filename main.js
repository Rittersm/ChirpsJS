$(document).ready(function(){

  function pageCount(num) {
    return Math.ceil(num / 10)
  }

  function paginationCount(pages, currentPage){
    console.log(currentPage)
    if($('nav').length === 0){
      $('#timeline').prepend(
        "<nav aria-label=\"Page navigation\"><ul class=\"pagination\"></ul></nav>"
      )
    }
    $('.pagination').html("")
    for(i=0;i<pages;i++){
      console.log(i)
      if((i + 1) == currentPage){
        $('.pagination').append("<li class=\"active\"><a href=\"" + (i + 1) + "\">" + (i + 1) + "</a></li>")
      } else {
        $('.pagination').append("<li><a href=\"" + (i + 1) + "\">" + (i + 1) + "</a></li>")
      }
    }
  }


  function bodyDisplay(num){
    $.getJSON('https://calm-beach-80027.herokuapp.com/timeline/', 'page=' + num,  function(data){
      paginationCount(pageCount(data.length), num)
      timelineDisplay(data)
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

  bodyDisplay(2)

  $(document.body).on('click', '.pagination li a', function(ev){
  ev.preventDefault()
  timelineDisplay($(ev.target).attr('href'))
  })

})

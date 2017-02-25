$('document').ready(function(){
  var results = [];

function Search(){
  
  $('#results-div').animate({'opacity': 0}, 250);
  
  var searchRequest = $("#search-input").val();
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchRequest + "&format=json&callback=?"
  results = [];
  
  function result(title, description, url) {
    this.title = title;
    this.description = description;
    this.url = url;
  }
  
  $.getJSON(url,  function(data){
    data = data.splice(1);
    for(var i=0; i < data[0].length; i++){
      results.push( new result(data[0][i], data[1][i], data[2][i]) );
    }
    displayResults();
  })
  
}
function displayResults(){
  var html = "";
  
  for(var i=0; i<results.length; i++){
    var title = results[i].title;
    var description = results[i].description;
    var url = results[i].url;
    html += "<a href='" + url + "' target='_blank'><div class='article-div'>";
    html += "<h4>" + title + "</h4>";
    html += "<p>" + description + "</p>";
    html += "</div></a>"
  }
  
  $("#results-div").html(html)
  $('#results-div').animate({'opacity': 1}, 500);
}


  $("#search-btn").on("click", function(){
    Search();
  })

  $('#search-input').on('keyup', function(e) {
     if(e.keyCode === 13) {
       Search()
     }
  });

  $("#random-btn").on("click", function(){
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  })

});


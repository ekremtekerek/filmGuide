
var films = [];

$(document).ready(function(){
  var filmsOfLocalStorage = JSON.parse(localStorage.getItem('films'));
  if (filmsOfLocalStorage) {
    films = filmsOfLocalStorage; 
  }
  
  $('#list').html('');
  $.each(films, function(index, film){
    var last = `
    <div class="col-md-2 mb-10" id="#cardOne">
     
        <img src="${film.Poster}" class="card-img-top">
    </div>
    `
    $('#list').append(last);
  });
  

  
  $("#movieform").validate();

  $('#formSubmit').attr('disabled', true);
  
  $('input').on('keyup',function()
  {
      var textarea_val = $("#movie").val();
   
      var minLength = $("#movie").attr( 'minlength' );
   
      if(textarea_val != '' && textarea_val.length >= minLength)
      {
          $('#formSubmit').attr('disabled' , false);
      }
      else
      {
          $('#formSubmit').attr('disabled' , true);
      }
  });
  });

  function hideCard(index){
    $('#list .card').eq(index).hide(1000);
  }

var apikey = "da975f45";

$("#formSubmit").click(function(e) {
  e.preventDefault();
  var movie = $("#movie").val();
  var result = "";
  var resultOne = "";
  var url = "http://www.omdbapi.com/?apikey="+apikey
  $.ajax({
      method:'GET',
      url:url+"&t="+movie,
      success:function(data) {
        console.log(data);
        

        
        films.push(data);
        localStorage.setItem('films', JSON.stringify(films));
        result = `
          <div class="media">    
              <div class="position-relative">
                <img class="align-self-start mr-3"  src="${data.Poster}"/>
               
               </div>
              <div class="media-body">
                <h3> ${data.Title}</h3>
                <p>${data.Plot}</p>
                <hr>
                <p><strong>Director: </strong>${data.Director}</p>
                <p><strong>Actors: </strong>${data.Actors}</p>
                <p><strong>Genre: </strong>${data.Genre}</p>
                <p><strong>Language: </strong>${data.Language}</p>
                <p><strong>Time: </strong>${data.Runtime}</p>
                <p><strong>Year: </strong>${data.Year}</p>
                <p><strong>IMDB: </strong>${data.imdbRating}</p>
               
              </div> 
           </div> 
        `
        resultOne = `
          <div class="card"  id="#cardOne">
         
              <img src="${data.Poster}" class="card-img-top">
          </div>
        `
        

        $("#result").html(result);
      
        
        $('#list').append('<div class="col-md-2 mb-10" id="#cardOne">'+resultOne+'</div>');

      return false;

      }

     
  })

  $('body').on('click', '#list button', function(){
    $(this).closest('#cardOne').hide(1000);
  });

  
});









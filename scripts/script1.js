var baseUrl = "http://pokeapi.co/api/v1/pokemon/";
var new_rows = "" ;
var pageNumber = 1;
var max_tableHeight = 5;
var maxPages = 5;
$(document).ready(main);
function main(){
  $("#ten").html("Page " + pageNumber + "/" + maxPages );

  $("#prevPageButton").prop("disabled", true);
  GetNewPokemons();

  $("#nextPageButton").click( function(){
      pageNumber++;
      CheckPage();
  } );

   $("#prevPageButton").click( function(){
      pageNumber--;
      CheckPage();
  } );


}

function CheckPage(){
     $("#ten").html("Page " + pageNumber + "/" + maxPages);
      if(pageNumber < 2){
         $("#prevPageButton").prop("disabled", true);
      }else if(pageNumber >= maxPages){
           $("#nextPageButton").prop("disabled", true);
      } else{
           $("#prevPageButton").prop("disabled", false);
           $("#nextPageButton").prop("disabled", false);
      }

      GetNewPokemons() ;
}

function GetNewPokemons(){
  $("#pokemon_table").html("tr ><th > Image </th> <th> Name</th> <th> HP </th></tr>");
  new_rows = "";
  for (var i = pageNumber*max_tableHeight - max_tableHeight; i < max_tableHeight*pageNumber; i++) {
    $.ajax({
        url: baseUrl +  parseInt(i+1) + "/",
        async: false,
        dataType: 'json',
        success: function(data) {
                 new_rows += "<tr><td class ='short'><img class='rotateImg' src='http://pokeapi.co/media/img/" + data.pkdx_id + ".png' alt='p' ></td><td>" + data.name + "</td>";
                 new_rows += "<td>" + data.hp + "</td></tr>";
        }

    });

  }
     $("#pokemon_table").append(new_rows);
}










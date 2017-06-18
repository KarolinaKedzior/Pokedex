var baseUrl = "http://pokeapi.co/api/v1/pokemon/";
var current_pokemon_id = 1;
var pokemonForm_id = 1;

var maxPokemonId = 150;
$(document).ready(main);
function main(){
  $("#prevButton").prop("disabled", true);
GetPokemonInfo(current_pokemon_id);

      $("#nextButton").click( function(){
      current_pokemon_id++;
      SetButtons(current_pokemon_id,maxPokemonId);
      GetPokemonInfo(current_pokemon_id) ;
  } );

   $("#prevButton").click( function(){
      current_pokemon_id--;
      SetButtons(current_pokemon_id,maxPokemonId);
      GetPokemonInfo(current_pokemon_id) ;
  } );

    $( '#evol' ).on( "click", ":button", function( event ) {
        var a = current_pokemon_id - pokemonForm_id  ;
        var n = parseInt($(this).attr('data-value') ) ;
        a+=n;
        SetButtons(a,maxPokemonId);
        GetPokemonInfo(a) ;
});

}

function SetButtons(pokemonId, maxId) {
    var flags = CheckButton(pokemonId, maxId);
    $("#prevButton").prop("disabled", flags.pDisabled);
    $("#nextButton").prop("disabled", flags.nDisabled);
}
function CheckButton(pokemonId, maxId){
      var buttons ={
                   pDisabled : false,
                   nDisabled : false,
               };
      if(maxId < 1){
        buttons.nDisabled =  true;
        buttons.pDisabled =  true;
        return buttons;
      }else{
          if(pokemonId < 2){
             buttons.pDisabled =  true;
          }else if(pokemonId > maxId){
               buttons.nDisabled =  true;
          } else{
                buttons.nDisabled =  false;
                buttons.pDisabled =  false;

          }
          return buttons;
      }

}

function GetPokemonInfo(pokemonId){
    current_pokemon_id  = pokemonId;
    $("#ten").html(current_pokemon_id) ;
    $('#pImage').attr('src', 'http://pokeapi.co/media/img/'+ pokemonId + '.png');
     $.ajax({
        url:  baseUrl + pokemonId + "/",
        async: false,
        dataType: 'json',
        success: function(data) {
              FillPokemonTable(data);
        }

    });
    $("#evol").html("");
    PokemonChain(pokemonId);
    if( $('#evol').is(':empty') ) { $("#eval").html("None"); }
}

function FillPokemonTable(pokemon) {

   $("#pName").html(pokemon.name);
   $("#pDefense").html(pokemon.defense);
   $("#pAttack").html(pokemon.attack);
   $("#pSpeed").html(pokemon.speed);

}

function PokemonChain(pokemonId){
 $.ajax({
        url:  "http://pokeapi.co/api/v2/pokemon-species/" + pokemonId + "/",
        async: false,
        dataType: 'json',
        success: function(data) {
              GetChain(data);
        }

    });

}

function GetChain(pokemon){
     $.ajax({
        url:  pokemon.evolution_chain.url,
        async: false,
        dataType: 'json',
        success: function(data) {
         var p = data.chain;
         var i = 0;
         do {
               if(p.species.name !== pokemon.name){
                 $("#evol").append("<li><button id='pForms' data-value=" + i +" class='link'>" + p.species.name + "</button></li>" );
               }else{
                   pokemonForm_id = i;
               }
               i++;
                p = p.evolves_to[0];
        }while (!!p && p.evolves_to[0] !== null  ) ;
       }
    });
}

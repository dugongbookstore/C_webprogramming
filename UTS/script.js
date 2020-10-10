$('#search').keyup(function(){

    var searchField=$('#search').val();
    var myExp =new RegExp(searchField,"i");


    $.getJSON('data.json', function(data) {
  
           console.log(data);


           var output ='<div class="container"><div class="row"><div class="row">';

           $.each(data,function(key,val){
               if((val.Judul.search(myExp) !=-1) || (val.Author.search(myExp) != -1) || (val.Tahun.search(myExp) != -1)|| (val.ISBN.search(myExp) != -1)){
               output += '<div class="flip-card card mx-suto my-4">';
               output += '<div class="flip-card-inner">';
               output += '<div class="flip-card-front">';
               output += '<img src="img/' + val.cover + '" alt="'+ val.cover + '" style="width:300px;height:380px;" />';
               output += '</div><div class="flip-card-back">';
               output += '<h2>'+val.Judul+'</h2>';
               output += '<p>' + val.Author + '</p>';
               output += '<p>' + val.Tahun + '</p>';
               output += '<p>' + val.ISBN + '</p>';
               output += '<p>Lokasi: ' + val.Lokasi + '</p>';
               output += '<p>Stok: ' + val.Stok + '</p>';
               output += '</div></div></div>';
               }

           });



           output +='</div>     </div>      </div>';
           $('#update').html(output);
        }
    );

});
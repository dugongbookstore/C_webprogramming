$('div').click(function() {
    var text = $(this).text();
    alert($(this).text());

    // $.getJSON('/public/assets/data.json', function(data) {
        // console.log(text);
        // var output = '<div class="det"> <div class="judul my-5">';
    
        // $.each(data, function(key, val) {

        //     output += '<h3>' + val.Judul + '</h3>';
        //     output += '</div> <div class="row"> <div class="col-lg-3 text-center mx-5">';
        //     output += '<img src="public/assets/img/' + val.cover + '" alt="fer" class="w-100">';
        //     output += '</div> <div class="col my-3"> <h4>Details</h4> <pre>';
        //     output += '<b>Judul</b>       : ' + val.Judul;
        //     output += '<b>Author</b>      : ' + val.Author;
        //     output += '<b>Tahun</b>       : ' + val.Tahun;
        //     output += '<b>ISBN</b>        : ' + val.ISBN;
        //     output += '<b>Lokasi</b>      : ' + val.Lokasi;
        //     output += '<b>Stok</b>        : ' + val.Stok;
        //     output += '</pre> </div> </div> <hr> <div class="row my-5 w-75 mx-5"> <h4>Sinopsis</h4>';
        //     output += '<p>' + val.sinopsis + '</p>';
        //     output += '</div> <hr> <div class="row mx-5"> <h4>Rating</h4> <hr> <span class="fa fa-star checked my-auto"></span>';
        //     output += '<span class="fa fa-star checked my-auto"></span> <span class="fa fa-star checked my-auto"></span>';
        //     output += '<span class="fa fa-star checked my-auto"></span><span class="fa fa-star checked my-auto"></span>';
        // });
        // output += '</div></div>';
        // $('#det').html(output);
    // });
});
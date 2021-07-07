function loadQuotes() {
    $.get("https://smileschool-api.hbtn.info/quotes", function (data) {
        let newSlide;
        data.forEach(function (slide) {
            if (slide === data[0])
                newSlide = $('<div class="carousel-item active">');
            else
                newSlide = $('<div class="carousel-item">');

            newSlide.append(
                `<div class="row d-flex mx-auto my-5 justify-content-center align-items-center d-flex mx-auto my-5 justify-content-center align-items-center">
                    <img src=${slide.pic_url} class="rounded-circle img-fluid ml-md-auto mr-2" alt="profile 5">
                    <div class="carousel-text row p-0 col-md-6 mr-auto ml-4 container">
                        <p class="carousel-review col-12 p-0">${slide.text}</p>
                        <p class="carousel-name col-12 p-0 m-0">${slide.name}</p>
                        <p class="carousel-title col-12 p-0 m-0">${slide.title}</p>
                    </div>
                </div>
             </div>`);

            $('#part-1-carousel-inner > .loader').remove();
            $('#part-1-carousel-inner').append(newSlide);
        });
    });
}


$(document).ready(function () {
    loadQuotes();
});

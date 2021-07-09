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


function loadVideos(screenSize) {
    $('#testimonialCarouselInner').empty();
    $('#testimonialCarouselInner').append($('<div class="loader my-5">'));
    $.get('https://smileschool-api.hbtn.info/popular-tutorials', function (data) {
        let slideNum = 0;
        let cardNum = 0;
        const starOn = '<img src="images/star_on.png" alt="star on"</img>';
        const starOff = '<img src="images/star_off.png" alt="star off"></img>';

        for (let card of data) {
            if (screenSize === 'sm' && cardNum > 0)
                cardNum = 0;
            else if (screenSize === 'md' && cardNum > 1)
                cardNum = 0;
            else if (screenSize === 'lg' && cardNum > 2)
                cardNum = 0;
            else if (screenSize === 'xl' && cardNum > 3)
                cardNum = 0;

            cardNum++;

            if (cardNum === 1) {
                slideNum++;
                $('#testimonialCarouselInner').append($(`<div id="reviewItem${screenSize}${slideNum}" class="carousel-item"><div id="reviewSlide${screenSize}${slideNum}" class="d-flex justify-content-center px-5">`));
                console.log('added testimonial carousel item: ' + screenSize + slideNum);
            }

            $('#reviewSlide' + screenSize + slideNum).append(
                `<!-- slide ${card.id} -->
                <div class="card container mx-0 my-5 pt-4 screenSize${screenSize} card${cardNum}" style="width: 18rem;">
                    <img src=${card.thumb_url} class="card-img-top card-thumbnail" alt="">
                    <img src="images/play.png" class="playIcon" style="width:64px;height:64px;" alt="play icon">
                    <div class="card-body row">
                        <h5 class="card-title">${card.title}</h5>
                        <p class="card-text">${card['sub-title']}</p>
                        <div class="rater">
                            <img src=${card.author_pic_url} alt="" class="rounded-circle">
                            <span class="rating-text p-1 pl-2">${card.author}</span>
                        </div>
                        <span class="star-rating pt-1">
                            ${starOn.repeat(card.star)}
                            ${starOff.repeat(5 - card.star)}
                        </span>
                        <span class="rating-time pt-1">${card.duration}</span>
                    </div>
                </div>`);
        }
        $('#testimonialCarouselInner > .loader').remove();
        updateActiveSlide(screenSize);
    });
}


function loadVideosLatest(screenSize) {
    $('#latestCarouselInner').empty();
    $('#latestCarouselInner').append($('<div class="loader my-5">'));
    $.get('https://smileschool-api.hbtn.info/latest-videos', function (data) {
        let slideNum = 0;
        let cardNum = 0;
        const starOn = '<img src="images/star_on.png" alt="star on"</img>';
        const starOff = '<img src="images/star_off.png" alt="star off"></img>';

        for (let card of data) {
            if (screenSize === 'sm' && cardNum > 0)
                cardNum = 0;
            else if (screenSize === 'md' && cardNum > 1)
                cardNum = 0;
            else if (screenSize === 'lg' && cardNum > 2)
                cardNum = 0;
            else if (screenSize === 'xl' && cardNum > 3)
                cardNum = 0;

            cardNum++;

            if (cardNum === 1) {
                slideNum++;
                $('#latestCarouselInner').append($(`<div id="videoItem${screenSize}${slideNum}" class="carousel-item"><div id="videoSlide${screenSize}${slideNum}" class="d-flex justify-content-center px-5">`));
                console.log('added latest carousel item: ' + screenSize + slideNum);
            }

            $('#videoSlide' + screenSize + slideNum).append(
                `<!-- slide ${card.id} -->
                <div class="card container mx-0 my-5 pt-4 screenSize${screenSize} card${cardNum}" style="width: 18rem;">
                    <img src=${card.thumb_url} class="card-img-top card-thumbnail" alt="">
                    <img src="images/play.png" class="playIcon" style="width:64px;height:64px;" alt="play icon">
                    <div class="card-body row">
                        <h5 class="card-title">${card.title}</h5>
                        <p class="card-text">${card['sub-title']}</p>
                        <div class="rater">
                            <img src=${card.author_pic_url} alt="" class="rounded-circle">
                            <span class="rating-text p-1 pl-2">${card.author}</span>
                        </div>
                        <span class="star-rating pt-1">
                            ${starOn.repeat(card.star)}
                            ${starOff.repeat(5 - card.star)}
                        </span>
                        <span class="rating-time pt-1">${card.duration}</span>
                    </div>
                </div>`);
        }
        $('#latestCarouselInner > .loader').remove();
        updateActiveSlide(screenSize);
    });
}


function loadCourses(searchQuery = '', topics = 'all', sortBy = 'most_popular') {
    $('#courseList').empty();
    $('#courseList').append($('<div class="loader my-5">'));

    const paramList = {
        'All': 'all',
        'Novice': 'novice',
        'Intermediate': 'intermediate',
        'Expert': 'expert',
        'Most Popular': 'most_popular',
        'Most Recent': 'most_recent',
        'Most Reviewed': 'most_reviewed'
    };
    $.get('https://smileschool-api.hbtn.info/courses', { q: searchQuery, topic: paramList[topics], sort: paramList[sortBy] }, function (data) {
        const courses = data.courses;
        console.clear();
        console.log(data);
        let slideNum = 0;
        let cardNum = 0;
        const starOn = '<img src="images/star_on.png" alt="star on"</img>';
        const starOff = '<img src="images/star_off.png" alt="star off"></img>';


        for (let card of courses) {
            cardNum++;

            if (cardNum === 1) {
                slideNum++;
                $('#courseList').append($(`<div id="courseRow${slideNum}" class="row justify-content-start">`));
            }

            $('#courseRow' + slideNum).append(
                `<div class="card container col-12 col-md-6 col-lg-4 col-xl-3 mx-0 my-5 pt-4 card${cardNum}" style="width: 18rem;">
                <img src=${card.thumb_url} class="card-img-top card-thumbnail" alt="">
                <img src="images/play.png" class="playIcon" style="width:64px;height:64px;" alt="play icon">
                <div class="card-body row">
                    <h5 class="card-title">${card.title}</h5>
                    <p class="card-text">${card['sub-title']}</p>
                    <div class="rater">
                        <img src=${card.author_pic_url} alt="" class="rounded-circle">
                        <span class="rating-text p-1 pl-2">${card.author}</span>
                    </div>
                    <span class="star-rating pt-1">
                        ${starOn.repeat(card.star)}
                        ${starOff.repeat(5 - card.star)}
                    </span>
                    <span class="rating-time pt-1">${card.duration}</span>
                </div>
            </div>`);
        }
        $('#courseList > .loader').remove();
        $('#courseList').prepend($('<div class="pt-5 mb-n3" id="video-count">' + courses.length + ' videos</div>'));
    });
}

function getScreenSize() {
    if ($(window).width() >= 1200)
        return 'xl';
    else if ($(window).width() >= 992)
        return 'lg';
    else if ($(window).width() >= 768)
        return 'md';
    else
        return 'sm';
}

function updateActiveSlide() {
    const sizes = ['sm', 'md', 'lg', 'xl'];
    for (let size of sizes) {
        if (size === getScreenSize()) {
            $('#reviewItem' + size + '1').addClass('active');
            $('#videoItem' + size + '1').addClass('active');
        } else {
            $('#reviewItem' + size + '1').removeClass('active');
            $('#videoItem' + size + '1').removeClass('active');
        }
    }
}


$(document).ready(function () {
    if (document.URL.includes('homepage.html')) {
        loadQuotes();
        loadVideos(getScreenSize());
        loadVideosLatest(getScreenSize());

        const mediaQuerymd = window.matchMedia('(min-width: 768px)');
        const mediaQuerylg = window.matchMedia('(min-width: 992px)');
        const mediaQueryxl = window.matchMedia('(min-width: 1200px)');

        mediaQuerymd.addEventListener("change", (e) => {
            if (e.matches) {
                loadVideos('md');
                loadVideosLatest('md');
            } else {
                loadVideos('sm');
                loadVideosLatest('sm');
            }
        });
        mediaQuerylg.addEventListener("change", (e) => {
            if (e.matches) {
                loadVideos('lg');
                loadVideosLatest('lg');
            } else {
                loadVideos('md');
                loadVideosLatest('md');
            }
        });
        mediaQueryxl.addEventListener("change", (e) => {
            if (e.matches) {
                loadVideos('xl');
                loadVideosLatest('xl');
            } else {
                loadVideos('lg');
                loadVideosLatest('lg');
            }
        });
    } else if (document.URL.includes('pricing.html')) {
        loadQuotes();
    } else if (document.URL.includes('courses.html')) {
        loadCourses();

        $('#topicItems > .dropdown-item').click(function (e) {
            e.preventDefault();
            $('#selectedTopic').html($(this).html());
            loadCourses($('#searchBar').val(), $(this).html(), $('#selectedSort').html());
        });
        $('#sortItems > .dropdown-item').click(function (e) {
            e.preventDefault();
            $('#selectedSort').html($(this).html());
            loadCourses($('#searchBar').val(), $('#selectedTopic').html(), $(this).html());
        });

        // 500ms after the user finishes typing in the search box, update the results
        // reset the time if the user starts typing again
        let timeout;
        $('#searchBar').keyup(function () {
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                loadCourses($('#searchBar').val(), $('#selectedTopic').html(), $('#selectedSort').html());
            }, 500);
        });
    }
});

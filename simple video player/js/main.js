



//once all HTML has loaded
$(function () {

    // video list
    videos = null
    categories = null

    //find DOM elements
    var videoList = $('.video-list'),
        categoryList = $('.category-list'),
        searchbox = $('#search'),
        player = $('#player'),
        titleList = $('#player'),
        screenLinks = $('.screen-list'),
        screens = $('.screen');


    function init() {
        // get videos from json file
        $.getJSON('json/videos.json', function (data) {
            videos = data.videos;
            displayVideos(videos);
            displayCategories(videos);
            
        });
        //get categories from json file
        $.getJSON('json/categories.json', function (data) {
            categories = data.categories;
            displayVideos(categories);
            displayCategories(categories);
        });

        searchbox.on('keyup', function (evt) {
            evt.preventDefault();
            if (evt.which === 13) {
                getVideoByID($(this));
            }
        });


        $.each(screenLinks, function (i, link) {
            $(this).on('click', changeScreen);
        });
        // TODO refacter this
        screens.eq(1).hide();
    }

    function getVideoByID(searchbox) {

        var inputValue = searchbox.val();
        //find out if ID exists in DB
        for(var i = 0; i <videos.length; i++){
            var id = videos[i].id;
            if (id === inputValue) {
                return videos[i];
            }
        }
        return null;
    }





    function getHTMLVideoItem(video) {
        return `<div data-id="${video.id}" class="video-list--item">
                <div></div>
                <div>${video.title}</div>
            </div>`;
    }

    function getHTMLCategoriesItem(category) {
        return `<div data-category="${category.id}" class="category-list--item">
                <div>${category.title}</div>
            </div>`;
    }


    //loop through and display
    function displayVideos(videos) {
        var s = '';
        $.each(videos, function (i, video) {
            s = s + getHTMLVideoItem(video);
        });
        //set inner HTML of video list container with items
        videoList.html(s);
        //target the videos
        var videos = $('.video-list--item');
        //loop through and add click event listeners
        $.each(videos, function (i, video) {
            $(this).on('click', function () {
                playVideo($(this));
            });
        });
    }

    function displayCategories(category) {
        var s = '';
        $.each(category, function (i, category) {
            s = s + getHTMLCategoryItem(category);
        });
        //set inner HTML of video list container with items
        categoryList.html(s);
        //target the videos
        var categories = $('.category-list--item');
        //loop through and add click event listeners
        $.each(category, function (i, category) {
            $(this).on('click', function () {
                var category = $(this).data('category')
                displayVideosByCategory(category);
            });
        });
    }

    function getVideosByCategory(category) {
        var getVideos = [];
        $.each(videos, function (i, video) {
            getVideosByCategory(category);;

        });

    }


    function playVideo(listItem) {
        var videoId = listItem.data('id');
        player.attr('src', 'http://www.youtube.com/embed/' + videoId + '?autoplay=1');
    }

    // changes screen
    function changeScreen() {
        // remove active off of all links
        $.each(screenLinks, function (i, link) {
            $(this).removeClass('active');
        });
        // "$(this)" is the link that was clicked
        $(this).addClass('active');
        var screenName = $(this).data('screen');

        $.each(screens, function (i, screen) {
            $(this).hide();
        });

        $('#' + screenName).show();

    }


    init();
});



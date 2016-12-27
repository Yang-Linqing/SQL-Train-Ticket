var FAT = $('.btn-floating');
var FATTop = FAT.offset().top;
var FATHeight = FAT.height();
var FATCenter = FATTop + FATHeight / 2;
var footerTop = $('footer').offset().top;
var gap = footerTop - $('main').offset().top - $('main').height();
function FATinit() {
    FAT = $('.btn-floating');
    FATTop = FAT.offset().top;
    FATHeight = FAT.height();
    FATCenter = FATTop + FATHeight / 2;
    footerTop = $('footer').offset().top;
    gap = footerTop - $('main').offset().top - $('main').height();
    if (FAT.css("position") == "fixed" && FATCenter > footerTop) {
        FAT.css({
            "position": "relative",
            "bottom": FATHeight / 2 - gap
        });
    }
}

$(window).scroll(function() {
    FAT = $('.btn-floating');
    FATTop = FAT.offset().top;
    FATHeight = FAT.height();
    FATCenter = FATTop + FATHeight / 2;
    footerTop = $('footer').offset().top;
    gap = footerTop - $('main').offset().top - $('main').height();
    if(FAT.css("position") == "fixed" && FATCenter > footerTop) {
        FAT.css({
            "position": "relative",
            "bottom": FATHeight/2 - gap
        });
    }
    if(FAT.css("position") == "relative" && FATCenter > ($(window).scrollTop() + $(window).height() - 24)) {
        FAT.css({
            "position": "fixed",
            "bottom": 24
        });
    }
});
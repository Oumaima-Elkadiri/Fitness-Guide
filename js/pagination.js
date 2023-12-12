function getPageList(totalPage, Page, maxLength){
    function range(start, end){
        return Array.from(Array(end - start + 1), (_, i) => i + start);
    }

    var sidewidth = maxLength < 9 ? 1:2;
    var leftwidth = (maxLength - sidewidth * 2 -3) >> 1;
    var rightwidth = (maxLength - sidewidth * 2 -3) >> 1;

    if(totalPage <= maxLength){
        return range(1, totalPage);
    }

    if(page <= maxLength - sidewidth - 1 - rightwidth){
        return range(1, maxLength - 1).concat(0, range(totalPage - sidewidth + 1, totalPage));
    }

    if(page >= totalPage - sidewidth - 1 - rightwidth){
        return range(1, sidewidth).concat(0, range(totalPage - sidewidth - 1 - rightwidth - leftwidth, totalPage));
    }

    return range(1, sidewidth).concat(0, range(page - leftwidth, page + rightwidth), 0, range(totalPage - sidewidth + 1, totalPage));

}
$(function(){
    var numberOfItem = $("body .row").length;
    var limitPage = 3;
    var totalPage = Math.ceil(numberOfItem / limitPage);
    var paginationSize = 5;
    var currentPage;

    function showPage(wichPage){
        
        if(wichPage < 1 || wichPage > totalPage) return false;

        currentPage = wichPage;

        $("body .row").hide().slice((currentPage - 1) * limitPage, currentPage * limitPage).show();

        $(".pagination li").slice(1, -1).remove();

        getPageList(totalPage, currentPage, paginationSize).forEach(item =>{
            $("<li>").addClass("page-item").addClass("current-page")
            .toggleClass("active", item === currentPage).append($("<a>").addClass("page-link")
            .attr({href: "javascript:void(a)"}).text(item)).insertBefore(".next-page")
        });

        $(".prev-page").toggleClass("disabled", currentPage === 1);
        $(".next-page").toggleClass("disabled", currentPage === totalPage);

        return true;
    }

    $(".pagination").append(
        $("<li>").addClass("page-item").addClass('prev-page').append($('<a>').addClass("page-link").attr({href: "javascript:void(0)"}).text("Précédent")),
        $("<li>").addClass("page-item").addClass('next-page').append($('<a>').addClass("page-link").attr({href: "javascript:void(0)"}).text("Suivant"))
    );
    $(".row").show();

    showPage(1)
    $(document).on("click",".pagination li.current-page:not(.active)", function(){
        
        return showPage(+$(this).text());
    });

    $(".next-page").on("click", function(){
        return showPage(currentPage + 1);
    });

    $(".prev-page").on("click", function(){
        return showPage(currentPage - 1);
    });

});
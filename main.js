$(document).ready(function() {
    handleSeeMore()
});

function handleSeeMore() {

    $('.see-more').click(function() {
        const descriptionNode = $(this).closest('.product-card-wrap').find('.see-more-description');
        if (descriptionNode.hasClass('active')) {
            $(this).find('.see-title').html('See More Information');
            $(this).find('.see-icon').addClass('up')
            $(this).find('.see-icon').removeClass('down')
            descriptionNode.removeClass('active');
        } else {
            $(this).find('.see-title').html('See Less Information');
            $(this).find('.see-icon').addClass('down')
            $(this).find('.see-icon').removeClass('up')
            descriptionNode.addClass('active');
        }
    })

}


var wishlist = [];

function addToWishlist(data) {
    const isFound = wishlist.some((item) => {
        if (item.id === data.id) {
            return true;
        }
        return false;
    })

    if (!isFound) {
        wishlist.push(data)
        handlerWishlistRender()
    } else {
        alert('This item is already added in your wishlist!')
    }

}

function handlerWishlistRender() {
    let wishlistHtml = '';
    let total = 0;
    wishlist.map((item) => {
        if (item.discount > 0) {
            total = total + (item.price - item.discount);
        } else {
            total = total + item.price;
        }
        wishlistHtml += "<li>" + item.title + " - SEK " + (item.price - item.discount) + " (You saved: SEK " + item.discount + ")" + " <span class='removeItem' data-id='" + item.id + "'>Remove</span></li>";
    })

    $('.total-data').html(total);
    $('.wishlist-data').html(wishlistHtml)
    handleRemoveWishlist()
}

function handleRemoveWishlist() {
    $('.removeItem').click(function() {
        let id = $('.removeItem').data('id');
        wishlist = wishlist.filter((item) => item.id != id);
        handlerWishlistRender()
    })
}
// ========================================================
// DOCUMENT ON READY 
// ========================================================
$(function() {
   new Menu(); 
});


// ========================================================
// MENU 
// ========================================================
var Menu = function() {
    this.menu = $('#menu');
    this.hamburger = this.menu.find('.menu-nav-button');
    
    this.toggleClass = 'menu-active';
    this.stickyClass = 'menu-sticky';
    this.isSticky = $body.hasClass(this.stickyClass);
    this.checkMenuOffsetBound = this.checkMenuOffset.bind(this);
    
    this.hamburger.on('click', this.toggleMenu.bind(this));
    $window.on('scroll', this.checkMenuOffsetBound);
    $window.on('resize', this.resize.bind(this));
    this.resize();
}

Menu.prototype.resize = function() {
    if (!$body.hasClass(this.toggleClass)) {
        windowResize();
        if (!$body.hasClass(this.stickyClass)) this.menuT = this.menu.offset().top;
        this.checkMenuOffset();
    }
}

Menu.prototype.checkMenuOffset = function() {
    if ($window.scrollTop() >= this.menuT && !$body.hasClass(this.stickyClass)) {
        return $body.addClass(this.stickyClass);
    } else if ($window.scrollTop() < this.menuT && $body.hasClass(this.stickyClass)) {
        $body.removeClass(this.stickyClass);
    }
}

Menu.prototype.toggleMenu = function(e) {
    e.preventDefault();

    if (!$body.hasClass(this.toggleClass)) {
        this.openMenu();
    } else {
        this.closeMenu();
    }
}

Menu.prototype.openMenu = function() {
    $body.addClass(this.toggleClass);
    this.windowScroll = $window.scrollTop();
    $body.css({
        'position': 'fixed',
        'top': -this.windowScroll + 'px',
        'min-height': '100%',
        'width': '100%',
        'padding': '0'
    });
    if ($body.hasClass(this.stickyClass)) this.menu.css('top', this.windowScroll + 'px');
    $window.scrollTop(0);
}

Menu.prototype.closeMenu = function() {
    $body.removeClass(this.toggleClass);
    $body.css({
        'position': '',
        'top': '',
        'min-height': '',
        'width': '',
        'padding': ''
    });
    this.menu.css('top', '');
    $window.scrollTop(this.windowScroll);
}

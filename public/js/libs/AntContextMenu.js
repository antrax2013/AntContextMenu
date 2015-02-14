/*! AntContextMenu V1.00
 * Copyright (c) 2015 AntProduction
 * http://antproduction.free.fr/AntColorPicker
 * https://github.com/antrax2013/AntColorPicker
 *
 * GPL license:
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Contributor: antrax2013@hotmail.com
 *
 */

;(function ($) {
    $.fn.AntContextMenu = function(options) {

        //On définit nos paramètres par défaut
        var defauts=
        {
           margin:{
                defaultMarginX : 10,
                defaultMarginY : 10
           },
            position:{
                defaultMenuPositionX : -5,
                defaultMenuPositionY : -5
            },
           dimension: {
               maxX: null,
               maxY: null,
               minX: 10,
               minY: 10
           },
           disableClickEventItemWithSubMenu: true,
           contextMenuSelector: "#menu"
        };

        //Lecture des paramétres et fusion avec ceux par défaut
        var parametres=$.extend(true, defauts, options);


        return this.each(function () {

            var $$ = $(this);

            parametres.dimension.maxX = parseInt($(document).width())-parseInt($$.width());
            parametres.dimension.maxY = parseInt($(document).height())-parseInt($$.height());

            $( parametres.contextMenuSelector).menu({
                items: "> :not(.ui-widget-header)", //mise en forme d'entête de catégorie

                select: function( event, ui ) { //gestion de la sélection d'une entrée
                    /*var tmp= jQuery.inArray(ui.item, ui.item[0].parentNode.children);
                    alert("click event on "+ ui.item.text() +" is fired");*/
                    $( parametres.contextMenuSelector).addClass("hidden");
                },
            }).mouseleave(function() {$(this).addClass("hidden")});

            $(document).keydown(function() {$( parametres.contextMenuSelector ).addClass("hidden")});

            $$.bind('contextmenu', function(e){
                e.preventDefault();

                var x = (parseInt(e.pageX)+parseInt(parametres.position.defaultMenuPositionX));
                var y= (parseInt(e.pageY)+parseInt(parametres.position.defaultMenuPositionY));

                //recalage pour pas déborder de la fenêtre
                if(x>parametres.dimension.maxX) x=parametres.dimension.maxX;
                else if (x<parametres.dimension.minX) x=parametres.dimension.minX;
                if(y>parametres.dimension.maxY) y=parametres.dimension.maxY;
                else if (y<parametres.dimension.minY) y=parametres.dimension.minY;

                if(parametres.disableClickEventItemWithSubMenu) {
                    $(parametres.contextMenuSelector + ' .ui-menu-item[aria-haspopup="true"]').unbind("click");
                }

                //Position à l'endroit du click
                $( parametres.contextMenuSelector).css({
                    'top': y+'px',
                    'left': x+'px',
                    'position':'fixed'
                }).removeClass("hidden");
            });
        });
    };
})(jQuery);

var page = function(name){
    location.hash = name;

    switch (name){
        case "Projects":
            var template = $('#projects').html();
            Mustache.parse(template);
            $.getJSON('projects.json',function(data){
                $.each(data, function(i, project){
                    console.log(project.name);
                    var rendered = Mustache.render(template, project);
                    $('.container').append(rendered);
                });
            })
            console.log("projects");
        break;
        case "Publications":
            console.log("publications");
        break;
        case "People":
            console.log("people");
        break;
        case "Courses":
            console.log("courses");
        break;
    }
}

$(document).ready(function(){
    var black = true;
    //Click events
    $("#logo").on('click', function(){
        window.location.replace('http://responsive.media.mit.edu/')
    })

    $(".color-clit").on('click', function(){
        if (black){
            $(this).css({"background":"#000","transition": "all 0.2s ease"});
            $("body").css({"background-color": "#FEFEFE","color": "#000","transition": "all 0.3s ease"});
            $(".main-container").css({"transition": "all 0.3s ease","background": "#FEFEFE","color": "#000","-webkit-box-shadow":"0px 6px 50px 4px #FEFEFE","-moz-box-shadow": "0px 6px 50px 4px #FEFEFE","box-shadow": "0px 6px 50px 4px #FEFEFE"});
            $("path").attr("fill","#000");
            black = false;
        }
        else {
            $(this).css("background","#FEFEFE");
            $("body").css({"background-color": "#000","color": "#FEFEFE"});
            $(".main-container").css({"background": "#000","color": "#FEFEFE","-webkit-box-shadow":"0px 6px 50px 4px #000","-moz-box-shadow": "0px 6px 50px 4px #000","box-shadow": "0px 6px 50px 4px #000"});
            $("path").attr("fill","#FEFEFE");
            black = true;
        }

    })

    //delayed, async, oneByOne or script
    $("#logo polygon").attr("stroke","#FEFEFE");
    var logoAnimation = new Vivus('logo', {type: 'async', duration: 100}, function(){
        $(".intro-logo").fadeIn('fast');
        $(".navigation").fadeIn('slow');
        $(".intro-about").delay(400).fadeIn('slow');
        $("#logo path").attr("fill-opacity","1");
    });

    //Navigation Control
    $('li').on('click', function(e){
        e.preventDefault();
        var thisEl = $(this);
        $('.navigation li').css('opacity','0.7');
        $(thisEl).css('opacity','1')
        if($(this).parent().hasClass('onIt')){
            page(thisEl.text())
        }
        else {
            $("svg").animate({
                height:"-=266",
                width:"-=286",
                marginTop:"-=20px"
            },500,function(){
                console.log("done")
                page(thisEl.text())
                $(".container").fadeIn('slow');
            });
            $(".intro-about").fadeOut('fast');
            $(this).parent().addClass('onIt');
            $(".main-container").addClass("fixSnap");
        }
    })
});

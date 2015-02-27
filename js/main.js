var page = function(name){
    location.hash = name;

    switch (name){
        case "Projects":
            var template = $('#projects').html();
            Mustache.parse(template);
            $(".container").hide();
            $('.container').html('');
            $("#logo").addClass("loader");
            $.getJSON('projects.json',function(data){
                $.each(data, function(i, project){
                    project.categories = project.categories.join(", ");
                    var rendered = Mustache.render(template, project);
                    $('.container').append(rendered).fadeIn("fast");
                    if(JSON.parse(localStorage.getItem("black")) == true)
                        $(".container").find(".date").addClass("white")
                    else
                        $(".container").find(".date").addClass("black")
                });
                $("#logo").removeClass("loader");
            })
        break;
        case "Publications":
            var template = $('#publications').html();
            Mustache.parse(template);
            $(".container").hide();
            $('.container').html('');
            $('.container').append('<ul class="pub"></ul>')
            $("#logo").addClass("loader");
            $.getJSON('publications.json',function(data){
                var dd;
                $.each(data, function(i, pub){
                    var rendered = Mustache.render(template, pub);
                    if(dd == null || dd != pub.date) {
                        $('.pub').append("<li class='datePub'>"+pub.date+"</li>")
                    }
                    $('.pub').append(rendered);
                    if(JSON.parse(localStorage.getItem("black")) == true)
                        $(".datePub").addClass("white")
                    else
                        $(".datePub").addClass("black")
                    dd = pub.date;
                    $(".container").fadeIn("fast");
                });
                $("#logo").removeClass("loader");
            })
        break;
        case "People":
            var template = $('#people').html();
            Mustache.parse(template);
            $(".container").hide();
            $('.container').html('');
            $('.container').append('<ul class="people"></ul>')
            $("#logo").addClass("loader");
            $.getJSON('people.json',function(data){
                var pp;
                $.each(data, function(i, person){
                    var rendered = Mustache.render(template, person);
                    if(pp == null || pp != person.type) {
                        $('.people').append("<li class='personType'>"+person.type+"</li>")
                    }
                    $('.people').append(rendered);
                    pp = person.type;
                });
                $("#logo").removeClass("loader");
                $(".container").fadeIn("fast");
            })
            console.log("people");
        break;
        case "Courses":
            var template = $('#courses').html();
            Mustache.parse(template);
            $(".container").hide();
            $('.container').html('');
            $('.container').append('<ul class="courses"></ul>')
            $("#logo").addClass("loader");
            $.getJSON('courses.json',function(data){
                var pp;
                $.each(data, function(i, person){
                    var rendered = Mustache.render(template, person);
                    $('.courses').append(rendered);
                    if(JSON.parse(localStorage.getItem("black")) == true)
                        $(".courses").find(".date").addClass("white")
                    else
                        $(".courses").find(".date").addClass("black")
                });
                $("#logo").removeClass("loader");
                $(".container").fadeIn("fast");
            })
            console.log("courses");
        break;
    }
}
var toggleTheme = function (black){
    var pathSvg = $("path"),
        colorBtn = $(".color-clit"),
        mainBody = $("html"),
        mainCont = $(".main-container"),
        date = $(".date");
        icons = $("i");

    if (!black){
        pathSvg.attr("fill","#000");
        pathSvg.attr("stroke","#000");
        colorBtn.css({"background":"#000","transition": "all 0.1s ease"});
        mainBody.css({"background": "#FEFEFE","color": "#000","transition": "all 0.1s ease"});
        mainCont.css({"transition": "all 0.1s ease","background": "#FEFEFE","color": "#000","-webkit-box-shadow":"0px 6px 50px 4px #FEFEFE","-moz-box-shadow": "0px 6px 50px 4px #FEFEFE","box-shadow": "0px 6px 50px 4px #FEFEFE"});
        date.css({"transition": "all 0.1s ease","background": "#000", "color":"#FEFEFE"})
        $(".datePub").addClass("black")
        icons.addClass("black");
        $(".datePub").removeClass("white")
        icons.removeClass("white");
        return true;
    }
    else {
        pathSvg.attr("fill","#FEFEFE");
        pathSvg.attr("stroke","#FEFEFE");
        colorBtn.css({"background":"#FEFEFE","transition": "all 0.1s ease"});
        mainBody.css({"transition": "all 0.1s ease","background": "#000","color": "#FEFEFE"});
        mainCont.css({"transition": "all 0.1s ease","background": "#000","color": "#FEFEFE","-webkit-box-shadow":"0px 6px 50px 4px #000","-moz-box-shadow": "0px 6px 50px 4px #000","box-shadow": "0px 6px 50px 4px #000"});
        date.css({"transition": "all 0.1s ease","background": "#FEFEFE", "color":"#000"})
        $(".datePub").removeClass("black")
        icons.removeClass("black");
        $(".datePub").addClass("white")
        icons.addClass("white");
        return false;
    }
}
$(document).ready(function(){
    var black;
    if(localStorage.getItem("black") == undefined || localStorage.getItem("black") == null){
        localStorage.setItem("black",true);
        black = true;
        $("#logo polygon").attr("stroke","#FEFEFE");
    }
    else{
        if(JSON.parse(localStorage.getItem("black")) === true){
            $("#logo polygon").attr("stroke","#FEFEFE");
            black = true;
        }
        else{
            $("#logo polygon").attr("stroke","#000");
            $("#logo polygon").attr("fill","#000");
            black = false;
            }
        toggleTheme(black);
    }


    //Click events
    $("#logo").on('click', function(){
        window.location.replace('http://responsive.media.mit.edu/')
    })

    $(".color-clit").on('click', function(){
        toggleTheme(!black);

        if(black){
            black  = false;
            localStorage.setItem("black", false)
        }
        else {
            black = true;
            localStorage.setItem("black", true)
        }
    })


    //delayed, async, oneByOne or script
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
                page(thisEl.text())
                $(".container").fadeIn('slow');
            });
            $(".intro-about").fadeOut('fast');
            $(this).parent().addClass('onIt');
            $(".main-container").addClass("fixSnap");
        }
    })
});

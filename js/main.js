var page = function(name){
    location.hash = name;
    var container = $(".container");
    switch (name){
        case "Projects":
            var template = $('#tpl-projects').html();
            Mustache.parse(template);
            container.hide().html('');
            $.getJSON('projects.json',function(data){
                $.each(data, function(i, project){
                    project.categories = project.categories.join(", ");
                    var rendered = Mustache.render(template, project);
                    container.append(rendered).fadeIn("fast");
                    if(JSON.parse(localStorage.getItem("black")) == true)
                        container.find(".date").addClass("white")
                    else
                        container.find(".date").addClass("black")
                });
            })
        break;
        case "Publications":
            var template = $('#tpl-publications').html();
            Mustache.parse(template);
            container.hide().html('');
            container.append('<ul class="pub"></ul>')
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
                    container.fadeIn("fast");
                });
            })
        break;
        case "People":
            var template = $('#tpl-people').html();
            Mustache.parse(template);
            container.hide().html('');
            container.append('<ul class="people"></ul>')
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
                container.fadeIn("fast");
            })
        break;
        case "Courses":
            var template = $('#tpl-courses').html();
            Mustache.parse(template);
            container.hide().html('');
            container.append('<ul class="courses"></ul>')
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
                container.fadeIn("fast");
            })
        break;
        default:
        break;
    }
}
var toggleTheme = function (black){
    var pathSvg = $("path"),
        colorBtn = $(".color-clit"),
        mainBody = $("html"),
        mainCont = $(".main-container"),
        date = $(".date");
        icons = $(".social-links span");

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
    if (typeof localStorage !== "undefined") {
        if(localStorage.getItem("black") == undefined || localStorage.getItem("black") == null){
            black = true;
            toggleTheme(black);
            $("#logo polygon").attr("stroke","#FEFEFE");
            try {
                localStorage.setItem("black",true);
            }
            catch (err) {
                console.log(err)
            }
        }
        else{
            if(JSON.parse(localStorage.getItem("black")) === true){
                $("#logo polygon").attr("stroke","#FEFEFE");
                black = true;
            }
            else {
                $("#logo polygon").attr("stroke","#000");
                $("#logo polygon").attr("fill","#000");
                black = false;
            }
            toggleTheme(black);
        }
    }
    else {
        black = true;
        $("#logo polygon").attr("stroke","#FEFEFE");
        toggleTheme(black);
    }

    //Click events
    $("#logo").on('click', function(){
        window.location.replace('#');
        if( $(".navigation").hasClass("onIt")){
        $('.navigation li').css('opacity','0.7');
        $('.container').fadeOut("fast").html('');
        $("svg").animate({
            height:"+=266",
            width:"+=286",
            marginTop:"+=20px"
        },500,function(){
            $(".container").fadeIn('slow');
            $(".intro-about").fadeIn('fast');
        });

        $(".navigation").removeClass('onIt');
        $(".main-container").removeClass("fixSnap");
        }
    })

    $(".color-clit").on('click', function(){
        toggleTheme(!black);
        if(black){
            black  = false;
            try {
                localStorage.setItem("black", false);
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            black = true;
            try {
                localStorage.setItem("black", true);
            }
            catch (err) {
                console.log(err)
            }
        }
    })


    //delayed, async, oneByOne or script
    var logoAnimation = new Vivus('logo', {type: 'async', duration: 50}, function(){
        $(".intro-logo").fadeIn('fast');
        $(".navigation").fadeIn('slow');
        $("#logo path").attr("fill-opacity","1");
        if(location.hash.length != 0) $(location.hash.toLocaleLowerCase()).trigger("click")
        else $(".intro-about").delay(400).fadeIn('slow');
        });

    //Navigation Control
    $('li').on('click', function(e){
        e.preventDefault();
        var thisEl = $(this);
        $('.navigation li').css('opacity','0.7');
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
        $(thisEl).css('opacity','1');
    })
});

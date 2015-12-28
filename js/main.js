var black, feedback = null, animDur = 100,logoAnimation;

var page = function(name){
    location.hash = name;
    var container = $(".container");
    var sub = $(".sub-container");
    switch (name){
        case "Projects":
            var template = $('#tpl-projects').html();
            var pid=0;
            Mustache.parse(template);
            container.hide().html('');
            $.getJSON('projects.json?'+~~(Math.random()*1000),function(data){
                $.each(data, function(i, project){
                    project.id ="p-"+pid++;
                    project.categories = project.categories.join(", ");
                    project.contributors = project.contributors.join(", ");
                    project.link ="#p-"+project.name.split(" ").join("-").toLowerCase();
                    var rendered = Mustache.render(template, project);
                    container.append(rendered).fadeIn("fast");
                    if(JSON.parse(localStorage.getItem("black")) == true)
                        container.find(".date").addClass("white")
                    else
                        container.find(".date").addClass("black")
                });
                $("a#read-more").on('click', function(e){
                    e.preventDefault();
                    sub.fadeIn(100);
                    var dom = $(this).parent().parent().find(".more-info").html();
                    sub.find(".panel").html(dom);
                });
                $(".popInfo").on('click', function(e){
                    e.preventDefault();
                    sub.fadeIn(100);
                    var dom = $(this).parent().find(".more-info").html();
                    sub.find(".panel").html(dom);
                });
            });


        break;
        case "Publications":
            var template = $('#tpl-publications').html();
            var thesisTemplate = $('#tpl-thesis').html();
            Mustache.parse(template);
            container.hide().html('');
            container.append('<ul class="filter"></ul><ul class="pub"></ul><ul id="thesis" class="thesis"></ul>');
            $(".thesis").append("<li data-date='stdt' class='stdThesis datePub'>Students Thesis</li>");
            $.getJSON('thesis.json?'+~~(Math.random()*1000),function(data){
                $.each(data, function(i, thesis){
                    var rendered = Mustache.render(thesisTemplate, thesis);
                    $(".thesis").append(rendered);
                });
            })
            $.getJSON('publications.json?'+~~(Math.random()*1000),function(data){
                var dd, c=0;
                $.each(data, function(i, pub){
                    var rendered = Mustache.render(template, pub);
                    if(dd == null || dd != pub.date) {
                        $('.pub').append("<li id='"+pub.date+"' class='datePub'>"+pub.date+"</li>");
                        if(pub.date != '')
                            $('.filter').append("<li id='ss-"+pub.date+"'>"+pub.date+"</li>");
                        if(c%2==0) $(".datePub:last-child").addClass("even")
                        else $(".datePub:last-child").addClass("odd")
                        $('.pub').append("<ul class='pub-"+pub.date+"' </ul>");
                        c++;
                    }
                    $('.pub-'+pub.date).append(rendered);
                    if(JSON.parse(localStorage.getItem("black")) == true)
                        $(".datePub").addClass("white")
                    else
                        $(".datePub").addClass("black")
                    dd = pub.date;
                    container.fadeIn("fast");

                });
                $('.filter').prepend('<li id="ss-thesis">Thesis</li>');
                $(".filter li").on('click', function(){
                    var year = $(this).attr("id").split('-')[1];
                    $('html, body').animate({scrollTop: $("#"+year).offset().top - 200},1000);
                })
            })
        break;
        case "People":
            var template = $('#tpl-people').html();
            Mustache.parse(template);
            container.hide().html('');
            container.append('<ul class="people"></ul>')
            $.getJSON('people.json?'+~~(Math.random()*1000),function(data){
                var pp;
                $.each(data, function(i, person){
                    var rendered = Mustache.render(template, person);
                    if(pp == null || pp != person.type) {
                        $('.people').append("<li class='personType'>"+person.type+"</li>")
                    }
                    $('.people').append(rendered);
                    pp = person.type;
                });
                if(JSON.parse(localStorage.getItem("black")) == true)
                    $(".personType").addClass("white")
                else
                    $(".personType").addClass("black")
                container.fadeIn("fast");
            })
        break;
        case "Courses":
            var template = $('#tpl-courses').html();
            Mustache.parse(template);
            container.hide().html('');
            container.append('<ul class="courses"></ul>')
            $.getJSON('courses.json?'+~~(Math.random()*1000),function(data){
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
        date = $(".date"),
        icons = $(".social-links span"),
        pType = $(".personType"),
        datePub = $(".datePub");
        sub = $(".sub-container");

    if (!black){
        pathSvg.attr("fill","#000");
        pathSvg.attr("stroke","#000");
        colorBtn.css({"background":"#000","transition": "all 0.1s ease"});
        mainBody.css({"background": "#FEFEFE","color": "#000","transition": "all 0.1s ease"});
        mainCont.css({"transition": "all 0.1s ease","background": "#FEFEFE","color": "#000","-webkit-box-shadow":"0px 6px 50px 4px #FEFEFE","-moz-box-shadow": "0px 6px 50px 4px #FEFEFE","box-shadow": "0px 6px 50px 4px #FEFEFE"});
        date.css({"transition": "all 0.1s ease","background": "#000", "color":"#FEFEFE"})
        datePub.addClass("black");
        pType.addClass("black");
        icons.addClass("black");
        icons.css({"background":'black', "color":'white'});
        datePub.removeClass("white")
        icons.removeClass("white");
        pType.removeClass("white");
        sub.removeClass("black");
        sub.addClass("white");
        return true;
    }
    else {
        pathSvg.attr("fill","#FEFEFE");
        pathSvg.attr("stroke","#FEFEFE");
        colorBtn.css({"background":"#FEFEFE","transition": "all 0.1s ease"});
        mainBody.css({"transition": "all 0.1s ease","background": "#000","color": "#FEFEFE"});
        mainCont.css({"transition": "all 0.1s ease","background": "#000","color": "#FEFEFE","-webkit-box-shadow":"0px 6px 50px 4px #000","-moz-box-shadow": "0px 6px 50px 4px #000","box-shadow": "0px 6px 50px 4px #000"});
        date.css({"transition": "all 0.1s ease","background": "#FEFEFE", "color":"#000"})
        pType.addClass("white");
        datePub.addClass("white")
        icons.addClass("white");
        pType.removeClass("black");
        datePub.removeClass("black")
        icons.removeClass("black");
        icons.css({"background":'white', "color":'black'});
        sub.removeClass("white");
        sub.addClass("black");
        return false;
    }
}

var randomCol = function(col1, col2){
    var pathSvg = $("path"),
        colorBtn = $(".color-clit"),
        mainBody = $("html"),
        mainCont = $(".main-container"),
        date = $(".date"),
        icons = $(".social-links span"),
        pType = $(".personType"),
        datePub = $(".datePub");

    pathSvg.attr("fill",col2);
    pathSvg.attr("stroke",col2);
    colorBtn.css({"background":col2,"transition": "all 0.1s ease"});
    mainBody.css({"transition": "all 0.1s ease","background": col1,"color": col2});
    mainCont.css({"transition": "all 0.1s ease","background": col1,"color": col2,"-webkit-box-shadow":"0px 6px 50px 4px "+col1,"-moz-box-shadow": "0px 6px 50px 4px "+col1,"box-shadow": "0px 6px 50px 4px "+col1});
    date.css({"transition": "all 0.1s ease","background": col2, "color":col1})
    icons.css({"background":col2, "color":col1})
}

var randomTheme = function(){
    randomCol('#'+(~~(Math.random()*16777215)).toString(16),'#'+(~~(Math.random()*16777215)).toString(16));
}

$(document).ready(function(){
    if (window.DeviceMotionEvent!=undefined) {
        $(".tilt-tolive").show();
    }
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
    $(document).on("click", function(e){
        var sub = $(".sub-container");
        var targetClass =  $(e.target).attr("class");
        var targetID =  $(e.target).attr("id");
        var targetProp = $(e.target).prop("tagName");
        console.log(targetProp);

        if( targetID != "read-more" && targetClass == "exit" || targetProp == "BODY")
            sub.fadeOut(20);

    })
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

    $(".tilt-tolive").on("click", function(){randomTheme();})

    if(location.hash.length != 0 ) animDur = 50;

    //delayed, async, oneByOne or script
    logoAnimation = new Vivus('logo', {type: 'async', duration: animDur}, function(){
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

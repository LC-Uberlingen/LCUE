$(document).ready(function() {
    
    // ######### CONFIG #########
       
    // Setup requires gallery / sponsor images to be named numbered from 1 to x
    // Only jpg images allowed
    // Optional add id-to-url mappings for sponsors-gallery to add links to their websites

    const imgCount = 13;
    const imgPath = "./img/gallery/";
    const imgDisplayDuration = 4000;
    const imgFadeInDuration = 1000;
    const imgFadeOutDuration = 1000;

    const sponsorsCount = 5;
    const sponsorsPath = "./img/sponsors/";
    const sponsorsDisplayDuration = 3000;
    const sponsorsFadeInDuration = 1000;
    const sponsorsFadeOutDuration = 1000;

    const sponsorsUrlMapping = {
        1: "https://www.sporthaus-schmidt.de/", // Intersport
        2: "https://www.fkb-gmbh.com/de/",      // FKB
        3: "https://www.dasautohausbach.de/",   // Bach
        4: "https://www.personaplan.de/",       // Persona Plan
        5: "https://www.pvs-reiss.de/"          // PVS Reiss
    }

    // ######### CONFIG #########
    
    let gallery = $("#gallery-slideshow");
    let sponsors = $("#sponsor-slideshow");

    for(let i = 1; i <= imgCount; i++) {
        gallery.append("<div><img src='" + imgPath + i + ".jpg'/></div>");
    }

    for(let i = 1; i <= sponsorsCount; i++) {
        if(i in sponsorsUrlMapping) {
            sponsors.append("<div><a href='" + sponsorsUrlMapping[i] + "'><img src='" + sponsorsPath + i + ".jpg'/></a></div>");
        } else {
            sponsors.append("<div><img src='" + sponsorsPath + i + ".jpg'/></div>");
        }
    }

    $("#sponsor-slideshow > div:gt(0)").hide();
    $("#gallery-slideshow > div:gt(0)").hide();

    setInterval(function () {
        $('#sponsor-slideshow > div:first')
        .fadeOut(imgFadeOutDuration)
        .next()
        .fadeIn(imgFadeInDuration)
        .end()
        .appendTo('#sponsor-slideshow');
    }, imgDisplayDuration);

    setInterval(function () {
        $('#gallery-slideshow > div:first')
        .fadeOut(sponsorsFadeOutDuration)
        .next()
        .fadeIn(sponsorsFadeInDuration)
        .end()
        .appendTo('#gallery-slideshow');
    }, sponsorsDisplayDuration);
});
var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/thymeleaf');

function handleGet(req) {
    var site = portal.getContent();

    var params = {
        mainRegion: site.page.regions.main,
    };

    var view = resolve("start.html");
    var body = thymeleaf.render(view, params);

    return {
        body: body
    };
}

exports.get = handleGet;



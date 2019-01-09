var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');

function handleGet(req) {
    var site = portal.getSite();

    var params = {
        context: req,
        mainRegion: reqContent.page.regions.main,
    };
    var view = reslove(main.html);
    var body = thymeleaf.render(view, params);
    

    return {
        contentType: 'text/html',
        body: body
    };
}

exports.get = handleGet;



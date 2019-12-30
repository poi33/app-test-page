const lib = {
    content: require("/lib/xp/content"),
    context: require("/lib/xp/context"),
};


exports.get = (req) => {
    //Create the topLevel site
    let context = {
        repository: "com.enonic.cms.default",
        branch: "draft",
        login: "pkw",
        idProvider: "system",
        principals: ["role:system.admin"]
    };

    function create() {
        let site = lib.content.create({
            contentType: "portal:site",
            data: {},
            name: 'testSite',
            parentPath: '/',
        });

        //Default creates 8000 pages
        let levels = 8;
        if (req.params && req.params.levels) {
            levels = req.params.levels;
        }

        for (let i = 0; i < levels; i++) {
            createLevel(i + 1, site);
        }
    }

    //Req should be passed to the callback
    lib.context.run(context, create);

};

/**
 * Creates 1000 landing pages under a new folder names level
 * @param {Number} index 
 */
function createLevel(index, site) {
    log.debug("Level " + index);
    let folder = lib.content.create({
        contentType: "base:folder",
        data: {},
        name: 'Folder' + index,
        parentPath: site._path,
    });
    for (let i = 1; i <= 1000; i++) {
        lib.content.create({
            contentType: app.name + ":landing-page",
            data: {},
            name: "page" + i,
            parentPath: folder._path,
        });
    }
}
const nodeLib = require('/lib/xp/node');

exports.get = function (req) {
    const repo = nodeLib.connect({
        repoId: "com.enonic.cms.default",
        branch: 'draft',
    });

    const result = repo.query({
        start: 0,
        count: -1,
        query: "type = 'portal:site'"
    });

    // log.info(JSON.stringify(result, null, 4));

    const sites= result.hits.length;

    for(let i=0; i<sites; i++) {
        const site = repo.get({
            key: result.hits[i].id,
        });
        
        repo.modify({
            key: site._id,
            editor: function(node) {
                log.info(`modify: ${node._name}`);
                //modify data
                return node;
            }
        });
    }

    return {
        body: JSON.stringify({
            status: "done"
        }),
        contentType: "application/json"
    };
};

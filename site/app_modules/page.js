var util = require('util');
var tool = require('leaptool');

module.exports = function(app) {
    
    var moduleName = 'layout';
    var block = {
        app: app,
        model: null
    };
    block.data = tool.object(require('basedata')(app, moduleName));
    block.page = tool.object(require('basepage')(app, moduleName, block.data));
    
    block.model = {
        name: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        layout: {
            type: 'string'
        },
        widgets: {
            type: 'array',
            subtype: {
                type: 'object'
            }
        },
        status: {
            type: 'string'
        },
        create_date: {
            type: 'date'
        }
    };
    
    // page
    block.page.getIndex = function(req, res) {
        var page = app.getPage(req);
        res.render('page/index', { page:page });
    };
    
    block.page.getPage = function(req, res) {
        var parameter = tool.getReqParameter(req);
        var pageName = parameter.pagename;
        var page = app.getPage(req);
        page.name = pageName;
        res.render('page/template', { page:page });
    };
    
    // page route
    app.server.get('/pages', block.page.getIndex);
    app.server.get('/pages/:pagename', block.page.getPage);
    
    
    return block;
};


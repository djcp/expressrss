/*
 * GET home page.
 */

exports.index = function(req, res){
  var xml = require('../lib/rssparser');

  xml.rssurl = 'http://blog.collispuro.com/atom.xml';

  xml.items(function(feedItems){
    res.render('index', { title: 'news', feed_items: feedItems });
  });
};


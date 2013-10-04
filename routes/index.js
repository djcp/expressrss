/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.news = function(req, res){
  var xml = require('../lib/rssparser');

  xml.rssurl = 'http://blog.collispuro.com/atom.xml';

  xml.items(function(feedItems){
    res.render('news', { title: 'news', feed_items: feedItems });
  });
};

module.exports = new function(){
  this.rssurl = '';

  this.items = function(news_item_callback){
    var http = require('http');
    var xml = require('libxmljs');

    http.get(this.rssurl, function(response){
      var xmlData = '';

      response.on('data', function(chunk){
        xmlData += chunk
      });


      response.on('end', function(){
        xmlData = xmlData.replace(/\s*xmlns\s*=\s*['"]+[^'"><]+['"]+/gi,'')

        var doc = xml.parseXmlString(xmlData);
        var items = [];
        doc.find('//entry').forEach(function(item) {
           items.push({
             title: item.get('title').text(),
             link: item.get('link').attr('href').value()
           });
        });

        news_item_callback(items);
      });
    });
  }
};

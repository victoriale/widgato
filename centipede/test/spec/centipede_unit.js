const expect = require('chai').expect;
var cats = ['finance', 'nba', 'college_basketball', 'weather', 'crime', 'demographics', 'politics', 'disaster', 'mlb', 'nfl','ncaaf','nflncaaf'];

document.getElementById("friendlyIframe_0").outerHTML=""; //remove the initial test load in thingy from the stupid proprietary library

for (var u=0; u < cats.length; u++) {
  describe('centipede_' + cats[u], function() {
    var timeout = 100;

      describe('friendlyIframe', function() {
        var name = cats[u];
        //setup this instance
        setTimeout(function(name) {
          var s = document.createElement("script");
          s.type = "text/javascript";
          s.src = '/base/centipede.js?{"dom":"chicagotribune.com","category":"'+name+'","rand":"1","env":"prod-"}';
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(s);
        }, timeout*(20*u),name);

        it('should exist', function(done) {
          setTimeout(function(name) {
            expect(document.getElementsByClassName("centipede_"+name)[0]).exist;
            done();
          }, timeout*20,name);
        });

      });

      describe('iframeContent', function() {
        var name = cats[u];
        it('should exist', function(done) {
          setTimeout(function() {
            expect(document.getElementsByClassName("centipede_"+name)[0].contentWindow).exist;
            done();
          }, timeout);
        });

      });

      describe('title', function() {
        var name = cats[u];
        it('should exist and have text', function(done) {
          setTimeout(function() {
            var title = document.getElementsByClassName("centipede_"+name)[0].contentWindow.document.getElementById('helper');
            expect(title).exist;
            expect(title.innerHTML).to.have.length.of.at.least(1);
            expect(title.innerHTML).to.not.equal(null);
            expect(title.innerHTML).to.not.equal("");
            expect(title.innerHTML).to.not.equal("null");
            expect(title.innerHTML).to.not.equal("undefined");
            done();
          }, timeout);
        });
      });

      describe('firstListItem', function() {
        var name = cats[u];
        it('should exist', function(done) {
          setTimeout(function() {
            var worm = document.getElementsByClassName("centipede_"+name)[0].contentWindow.document.getElementById('worm');
            expect(worm.getElementsByClassName("list_item")[0]).exist;
            done();
          }, timeout);
        });
        it('should have an image with a valid SRC', function(done) {
          setTimeout(function() {
            var worm = document.getElementsByClassName("centipede_"+name)[0].contentWindow.document.getElementById('worm');
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("profile_image")[0]).exist;
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("profile_image")[0].src).to.have.length.of.at.least(1);
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("profile_image")[0].src).to.not.equal(null);
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("profile_image")[0].src).to.not.equal("");
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("profile_image")[0].src).to.not.equal("null");
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("profile_image")[0].src).to.not.equal("undefined");
            done();
          }, timeout);
        });
        it('should have a name with text in it', function(done) {
          setTimeout(function() {
            var worm = document.getElementsByClassName("centipede_"+name)[0].contentWindow.document.getElementById('worm');
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("name")[0]).exist;
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("name")[0].innerHTML).exist.to.have.length.of.at.least(1);
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("name")[0].innerHTML).to.not.equal(null);
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("name")[0].innerHTML).to.not.equal("");
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("name")[0].innerHTML).to.not.equal("null");
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("name")[0].innerHTML).to.not.equal("undefined");
            done();
          }, timeout);
        });
        it('should have a value with text in it', function(done) {
          setTimeout(function() {
            var worm = document.getElementsByClassName("centipede_"+name)[0].contentWindow.document.getElementById('worm');
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("value")[0]).exist;
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("value")[0].innerHTML).exist.to.have.length.of.at.least(1);
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("value")[0].innerHTML).to.not.equal(null);
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("value")[0].innerHTML).to.not.equal("");
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("value")[0].innerHTML).to.not.equal("null");
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("value")[0].innerHTML).to.not.equal("undefined");
            done();
          }, timeout);
        });
        it('should have a stat_type with text in it', function(done) {
          setTimeout(function() {
            var worm = document.getElementsByClassName("centipede_"+name)[0].contentWindow.document.getElementById('worm');
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("stat_type")[0]).exist;
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("stat_type")[0].innerHTML).to.have.length.of.at.least(1);
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("stat_type")[0].innerHTML).to.not.equal(null);
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("stat_type")[0].innerHTML).to.not.equal("");
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("stat_type")[0].innerHTML).to.not.equal("null");
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("stat_type")[0].innerHTML).to.not.equal("undefined");
            done();
          }, timeout);
        });
        it('should have a num with text in it', function(done) {
          setTimeout(function() {
            var worm = document.getElementsByClassName("centipede_"+name)[0].contentWindow.document.getElementById('worm');
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("num")[0]).exist;
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("num")[0].innerHTML).exist.to.have.length.of.at.least(1);
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("num")[0].innerHTML).to.not.equal(null);
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("num")[0].innerHTML).to.not.equal("");
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("num")[0].innerHTML).to.not.equal("null");
            expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("num")[0].innerHTML).to.not.equal("undefined");
            done();
          }, timeout);
        });

      });

      describe('ad_unit', function() {
        var name = cats[u];
        it('should exist', function(done) {
          setTimeout(function() {
            var worm = document.getElementsByClassName("centipede_"+name)[0].contentWindow.document.getElementById('worm');
            expect(worm.getElementsByClassName("ad_item")[0]).exist;
            done();
          }, timeout);
        });

      });

      describe('list items', function() {
        var name = cats[u];
        it('should be more than 5', function(done) {
          setTimeout(function() {
            var worm = document.getElementsByClassName("centipede_"+name)[0].contentWindow.document.getElementById('worm');
            expect(worm.getElementsByClassName("list_item")).to.have.length.of.at.least(5);
            done();
          }, timeout);
        });

      });

  });


}

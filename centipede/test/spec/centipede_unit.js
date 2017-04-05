describe('centipede', function() {
  const expect = require('chai').expect;
  var centipede = {
    debug: true,
    started: (new Date()).getTime(),
  };
  const module = require('centipede.js');

    describe('friendlyIframe', function() {
      it('should exist', function() {
        expect(friendlyIframe).exist;
      });

    });

    describe('iframeContent', function() {
      it('should exist', function() {
        expect(iframeContent).exist;
      });

    });

    describe('title', function() {
      it('should exist and have text', function() {
        expect(helper).exist;
        expect(helper.innerHTML).to.have.length.of.at.least(1);
        expect(helper.innerHTML).to.not.equal(null);
        expect(helper.innerHTML).to.not.equal("");
        expect(helper.innerHTML).to.not.equal("null");
        expect(helper.innerHTML).to.not.equal("undefined");
      });
    });

    describe('firstListItem', function() {
      it('should exist', function() {
        expect(worm.getElementsByClassName("list_item")[0]).exist;
      });
      it('should have an image with a valid SRC', function() {
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("profile_image")[0]).exist;
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("profile_image")[0].src).to.have.length.of.at.least(1);
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("profile_image")[0].src).to.not.equal(null);
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("profile_image")[0].src).to.not.equal("");
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("profile_image")[0].src).to.not.equal("null");
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("profile_image")[0].src).to.not.equal("undefined");
      });
      it('should have a name with text in it', function() {
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("name")[0]).exist;
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("name")[0].innerHTML).exist.to.have.length.of.at.least(1);
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("name")[0].innerHTML).to.not.equal(null);
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("name")[0].innerHTML).to.not.equal("");
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("name")[0].innerHTML).to.not.equal("null");
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("name")[0].innerHTML).to.not.equal("undefined");
      });
      it('should have a value with text in it', function() {
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("value")[0]).exist;
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("value")[0].innerHTML).exist.to.have.length.of.at.least(1);
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("value")[0].innerHTML).to.not.equal(null);
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("value")[0].innerHTML).to.not.equal("");
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("value")[0].innerHTML).to.not.equal("null");
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("value")[0].innerHTML).to.not.equal("undefined");
      });
      it('should have a stat_type with text in it', function() {
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("stat_type")[0]).exist;
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("stat_type")[0].innerHTML).to.have.length.of.at.least(1);
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("stat_type")[0].innerHTML).to.not.equal(null);
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("stat_type")[0].innerHTML).to.not.equal("");
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("stat_type")[0].innerHTML).to.not.equal("null");
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("stat_type")[0].innerHTML).to.not.equal("undefined");
      });
      it('should have a num with text in it', function() {
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("num")[0]).exist;
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("num")[0].innerHTML).exist.to.have.length.of.at.least(1);
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("num")[0].innerHTML).to.not.equal(null);
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("num")[0].innerHTML).to.not.equal("");
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("num")[0].innerHTML).to.not.equal("null");
        expect(worm.getElementsByClassName("list_item")[0].getElementsByClassName("num")[0].innerHTML).to.not.equal("undefined");
      });

    });

    describe('ad_unit', function() {
      it('should exist', function() {
        expect(worm.getElementsByClassName("ad_item")[0]).exist;
      });

    });

    describe('list items', function() {
      it('should be more than 5', function() {
        expect(worm.getElementsByClassName("list_item")).to.have.length.of.at.least(5);
      });

    });

});

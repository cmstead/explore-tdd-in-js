const TestFixture = (function () {
    function createDomNode(htmlFragment) {
        const div = document.createElement('div');

        const range = document.createRange();
        range.selectNodeContents(div);

        return range.createContextualFragment(htmlFragment);
    }

    function TestFixture(fixtureHtml) {
        this.fixtureNode = createDomNode(fixtureHtml);
    }

    TestFixture.prototype = {
        insert: function () {
            const qunitFixture = document.getElementById('qunit-fixture');
            qunitFixture.append(this.fixtureNode);
        },

        remove: function () {
            this.fixtureNode.remove();
        }
    };

    return {
        new: function (fixtureHtml) {
            return new TestFixture(fixtureHtml);
        }
    };
})();
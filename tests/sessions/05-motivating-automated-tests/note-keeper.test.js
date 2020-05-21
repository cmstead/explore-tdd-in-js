(function () {

    function getMainAppRootElement() {
        return $('#main-app');
    }

    function enterTextIntoNoteInput(expectedNoteText) {
        const textareaElement = getMainAppRootElement().find('textarea').first();
        textareaElement.text(expectedNoteText);

        testUtils.sendEvent(textareaElement[0], 'keyup', {});
    }

    function clickAddNoteButton() {
        $('#note-form').find('button').first().click();
    }

    function getNthNote(index) {
        const noteElement = getMainAppRootElement()
            .find('ul')
            .find('li')
            .find('span')[index];

        return $(noteElement);
    }

    TestSuite
        .new('Note Keeper App')
        .setup(function () {
            jqreactive.bootstrap('#qunit-fixture', App);
        })
        .teardown(function () {
            $('#qunit-fixture').html('');
        })
        .test(
            'bootstraps into existence',
            function (assert) {
                const element = getMainAppRootElement();

                assert.equal(element.attr('id'), 'main-app');
            }
        )

        .test(
            'when no notes are entered, "no notes yet" message is displayed',
            function (assert) {
                const noNotesElement = getMainAppRootElement().find('p').first();

                assert.equal(noNotesElement.text().toLowerCase(), 'no notes yet');
            }
        )

        .test(
            'note appears when added from note form',
            function (assert) {
                const expectedNoteText = 'This is a test note';

                enterTextIntoNoteInput(expectedNoteText);
                clickAddNoteButton();

                assert.equal($(getNthNote(0)).text(), expectedNoteText);
            }
        )

        .test(
            'second note appears when added from note form',
            function (assert) {
                const expectedNoteText = 'A second note';

                enterTextIntoNoteInput('junk note');
                clickAddNoteButton();

                enterTextIntoNoteInput(expectedNoteText);
                clickAddNoteButton();

                assert.equal($(getNthNote(1)).text(), expectedNoteText);
            }
        )
})();
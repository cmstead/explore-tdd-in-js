const InputForm = (function () {
    const { component } = jqreactive;

    function InputForm() {
        this.state = {
            note: ''
        };
    }

    InputForm.prototype = {
        handleSubmit: function (event) {
            event.preventDefault();

            if (this.state.note.trim() !== '') {
                this.props.saveNote(this.state.note);

                this.setState({ note: '' });
            }
        },
        handleKeyup: function (event) {
            const { name, value } = event.target;

            this.updateState({ [name]: value });
        },
        render: function () {
            return this.renderView(`
                <form submit="handleSubmit" id="note-form">
                    <section>
                        <textarea 
                            type="text" 
                            name="note" 
                            value="${ this.state.note}" 
                            placeholder="Your notes here"
                            keyup="handleKeyup"></textarea>
                    </section>
                    <section>
                        <button>Save note</button>
                    </section>
                </form>
            `);
        }
    };

    return component(InputForm);
})();
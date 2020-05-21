const InputForm = (function () {
    const { component } = jqreactive;

    function InputForm() {
        this.state = {
            note: ''
        };
    }

    InputForm.prototype = {
        handleSubmit: function(event) {
            event.preventDefault();

            this.props.saveNote(this.state.note);

            this.setState({ note: '' });
        },
        handleKeyup: function(event) {
            const { name, value } = event.target;

            this.updateState({ [name]: value });
        },
        render: function(props) {
            console.log(this.props);
            console.log(props);

            return this.renderView(`
                <form submit="handleSubmit">
                    <section>
                        <textarea 
                            type="text" 
                            name="note" 
                            value="${ this.state.note }" 
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
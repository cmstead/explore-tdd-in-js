const App = (function () {
    const {component} = jqreactive;
    function App() {
        this.components = {
            InputForm
        }

        this.state = {
            notes: []
        };
    }

    App.prototype = {
        saveNote: function(note) {
            this.setState({
                notes: this.state.notes.concat(note)
            })
        },
        render: function() {
            return this.renderView(`
                <div>
                    <InputForm props="InputForm"></InputForm>
                    ${
                        this.state.notes.length === 0
                            ? '<div>No notes yet</div>'
                            : this.state.notes.map(note => `<li>${note}</li>`).join('\n')
                    }
                </div>
            `,
            {
                InputForm: {
                    saveNote: (note) => this.saveNote(note)
                }
            });
        }
    };

    return component(App);
})();
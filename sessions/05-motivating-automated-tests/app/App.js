const App = (function () {
    const { component } = jqreactive;

    function App() {
        this.components = {
            InputForm,
            Note
        }

        this.state = {
            notes: []
        };
    }

    App.prototype = {
        saveNote: function (note) {
            this.setState({
                notes: this.state.notes.concat({
                    note,
                    editState: false
                })
            })
        },
        toggleEditState: function (noteIndex) {
            const editState = this.state.notes[noteIndex].editState;
            this.state.notes[noteIndex].editState = !editState;

            this.setState({});
        },
        buildNotesProps: function () {
            return this.state.notes.reduce(
                (props, note, index) => ({
                    ...props,
                    [`note${index}`]: {
                        note,
                        index,
                        toggleEditState: () => this.toggleEditState(index)
                    }
                }),
                {}
            );
        },
        buildNotesView: function () {
            return '<ul>' +
            this.state.notes
                .map((_, index) =>
                    `<Note props="note${index}"></Note>`)
                .join('\n') +
                '</ul>';
        },

        render: function () {
            return this.renderView(`
                <div class="container" id="main-app">
                    <InputForm props="InputForm"></InputForm>
                    ${
                this.state.notes.length === 0
                    ? '<p>No notes yet</p>'
                    : this.buildNotesView()
                }
                </div>
            `,
                {
                    ...this.buildNotesProps(),
                    InputForm: {
                        saveNote: (note) => this.saveNote(note)
                    }
                });
        }
    };

    return component(App);
})();
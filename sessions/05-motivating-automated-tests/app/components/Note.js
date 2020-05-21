const Note = (function () {
    const { component } = jqreactive;

    function Note() { }

    Note.prototype = {
        toggleEditState: function(event) {
            event.preventDefault();

            this.props.toggleEditState();
        },
        render: function (props) {
            return this.renderView(
                props.note.editState
                ? `<li><span>To do: add note editing -- ${props.note.note}</span> <a href="#" click="toggleEditState">Done</a></li>`
                :`<li><span class="note-text">${props.note.note}</span> <a href="#" click="toggleEditState">Edit</a></li>`
            );
        }
    };

    return component(Note);
})();
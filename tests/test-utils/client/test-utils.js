const testUtils = (function () {
    function sendEvent(element, eventType, data = {}) {
        const eventData = {
            ...data,
            target: element,
            currentTarget: element
        };

        const newEvent = new CustomEvent(eventType, eventData);

        element.dispatchEvent(newEvent);
    }

    return {
        sendEvent
    };
})();
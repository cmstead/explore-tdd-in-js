const TestSuite = (function () {
    const { test } = QUnit;

    function TestSuite(description) {
        this.description = description;

        this.setupFn = () => null;
        this.teardownFn = () => null;

        this.test.skip = () => null;
    }

    TestSuite.prototype = {
        test: function (description, testFunction) {
            const testName = this.description + ': ' + description;

            test(testName, (assert) => {
                const testTakesCallback = testFunction.length > 1;
                let done = testTakesCallback ? assert.async() : () => null;

                const teardown = () => {
                    this.teardown();
                    done();
                };

                this.setupFn();

                const context = {
                    testName: testName
                };

                const testPromise = testFunction.call(context, assert, teardown);

                if (!testTakesCallback && typeof testPromise === 'undefined') {
                    teardown();
                } else if (typeof testPromise === 'object') {
                    done = assert.async();

                    testPromise
                        .finally(() => {
                            teardownFn();
                            done();
                        });
                }
            });

            return this;
        },

        setup: function (setupFunction) {
            this.setupFn = setupFunction;

            return this;
        },

        teardown: function (teardownFunction) {
            this.teardownFn = teardownFunction;

            return this;
        }
    };

    function getNew(description) {
        return new TestSuite(description);
    };

    const skip = {
        new: () => skip
    };

    Object.keys(TestSuite.prototype)
        .forEach(function(key) {
            skip[key] = () => skip;
        });

    return {
        new: getNew,
        skip: () => skip
    }
})();
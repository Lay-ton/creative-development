function importTest(name, path) {
    describe(name, function () {
        export path from ''
    });
}

describe("setup", function () {
    beforeEach(function () {
        console.log("Next group of tests is running");
    });
    importTest("create_test", './create_test');
    importTest("auth.test", './auth.test');
    after(function () {
        console.log("After all tests");
    });
});
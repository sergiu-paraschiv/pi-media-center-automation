class Test {
    handle(req, res) {
        res.json({ message: 'Hello World!' });
    }
}

export default new Test();

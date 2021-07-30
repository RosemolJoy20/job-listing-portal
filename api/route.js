const router = require('express').Router();
const jobManager = require('./manager');

router.get('/', async (req, res) => {
    try {
        const t = await jobManager.getAll();
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/', async (req, res) => {
    try {
        let t = await jobManager.add(req.body);
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const t = await jobManager.update(id, { ...req.body });
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const r = await jobManager.delete(id);
        return res.status(200).send(r);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const r = await jobManager.getById(id);
        return res.status(200).send(r);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

module.exports = router;
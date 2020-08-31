let router = require('express').Router();
let Log = require('../db').import('../models/log');
let validateSession = require('../middleware/validate-session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/', function(req, res){
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.body.log.owner_id
    }
    Log.create(logEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err}))
})

router.get('/', function(req, res){
    Log.findAll()
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }))
})

router.get('/:id', function(req, res){
    Log.findOne(
        {where: { id: req.params.id } }
    )
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }))
})

router.put('/:id', function(req, res){
    const updateLogEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.body.log.owner_id
    };

    const query = { where : { id: req.params.id } };

    Log.update(updateLogEntry, query)
    .then(logs => res.status(200).json(logs))
    .catch( err => res.status(500).json({ error: err }));
})

router.delete("/:id", function (req, res) {
    const query = { where: { id: req.params.id } };

    Log.destroy(query)
    .then(() => res.status(200).json({ message: "Log Entry Removed" }))
    .catch(err => res.status(500).json({ error: err }));
})

module.exports = router
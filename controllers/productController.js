const models = require('../models');
const helpers = require('../helpers');

function get(req, res) {
    let searchCriteria = req.params.id;

    if (searchCriteria) {
        return models.Product.findById(searchCriteria)
            .then(data => {
                res.send(data);
            }).catch(e => {
                res.send(e);
            });
    }

    models.Product.find({})
        .then(data => {
            res.send(data);
        }).catch(e => {
            res.send(e);
        });
}

function create(req, res) {
    let { name, description, price, category } = req.params;
    let creator = req.cookies('username');
    let date = helpers.dateFormatter(date.Now());



    models.User.find({ username: creator }).then(user => {
        creator = user.id;
    }).catch(e => {
        console.log(e);
    })

    models.Product.create({ name, description, price, category, creator, date })
}

function edit(req, params) {
    let editParams = req.body;
    let id = req.params.id;

    models.Product.findByIdAndUpdate(id , editParams)
    .then(data => {
        console.log('edited' + data);
        res.redirect(`/product/${data._id}`) // *** for edit ***
        
    })
}

function remove(req, res) {
    let { id } = req.params;

    models.Product.findByIdAndRemove(id)
        .then(data => { res.send(data) })
        .catch(err => { res.send(err) });
}



module.exports = {
    get,
    create,
    edit,
    remove,

}
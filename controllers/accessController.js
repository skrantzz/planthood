const db = require("../models");

module.exports = {
  //Used to find all access that has been granted.
  findAllByOwnerUserId: function (req, res) {
    db.Access.find({ owner_user_id: req.params.owner_user_id })
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findAllBySitterId: function (req, res) {
    db.Access.find({ sitter_user_id: req.params.sitter_user_id })
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    //Used to create an individual access record
    db.Access.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    //Used to delete access that has been granted
    db.Access.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  setSitter: function (req, res) {
    console.log("setting plantsitter", req.params);
    db.User.findOneAndUpdate(
      { user_id: req.params.uid },
      { $push: { plantsit: req.params.pid } }
    )
      .populate("plantsit")
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  },
};

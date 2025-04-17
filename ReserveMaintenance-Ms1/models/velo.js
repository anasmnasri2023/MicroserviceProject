var mongoose = require('mongoose');
var shema = mongoose.Schema;
var velo = new mongoose.Schema({
    model: {type: String},
    code:{type: String},
    price: {type: Number},
    statut: {type: String},
    userId: {type: String},
    disponibility: {type: String, 
        enum: ['in_service','in_maintenance ','broken'],},
    type :{type: String , 
         enum: ['city_bike', 'children_bike', 'electric_bike', 'bike_with_child_seat', 'tandem', 'cargo_bike', 'mountain_bike', 'Other'],
        },
        Maintenance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'maintenances' }]


})

module.exports = mongoose.model('velos', velo)
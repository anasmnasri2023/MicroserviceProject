var mongoose = require('mongoose');
var shema = mongoose.Schema;
var maintenance = new mongoose.Schema({

    description:{type: String},
    dateOfMaintenance: {type: Date},
    type :{type: String , 
        enum: ['wheel', 'brake', 'other'],
       },
    price : {type:Number},
    avalible : {type: Boolean},
    velo: {type: String},
})

module.exports = mongoose.model('maintenances', maintenance)
const maintenance = require('../models/maintenance');


async function addMaintenance(req) {
    console.log("service", req.body)
    const newMaintenance = new maintenance({
        description: req.body.description,
        date: req.body.date,
        type: req.body.type,
        price: req.body.price,
        avalible: req.body.avalible,
        velo: req.body.velo
     
    });
    console.log("maintenance", newMaintenance)
    newMaintenance.save()
}

async function updateMaintenance(id) {
    await maintenance.findByIdAndUpdate({ _id: id.toString() }, data)
        .then(data => data)

}

async function displayMaintenanceById(id) {
    return await maintenance.find({ _id: id.toString() })
        .then(data => data) /* mongoose find methode always return promise  */
        .catch(err => console.log(err));
}
async function displayMaintenanceByVelo(id) {
    return await maintenance.find({ velo: id.toString() })
        .then(data => data) /* mongoose find methode always return promise  */
        .catch(err => console.log(err));
}

async function displayAllMaintenance() {
    return await maintenance.find()
        .then(data => data) /* mongoose find methode always return promise  */
        .catch(err => console.log(err));
}

function deleteMaintenanceById(id) {
    maintenance.findOneAndRemove({ _id: id.toString() }, (err) => {
        if (err) throw err;
    })
}
module.exports = { addMaintenance, displayMaintenanceById, displayMaintenanceByVelo, displayAllMaintenance, updateMaintenance , deleteMaintenanceById} 

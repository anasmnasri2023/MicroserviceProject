const velo = require('../models/velo');



async function addVelo(req) {
    console.log("service", req.body.model)
    const newVelo = new velo({
        model: req.body.model,
        code: req.body.code,
        price: req.body.price,
        statut: req.body.statut,
        disponibility: req.body.disponibility,
        type: req.body.type, 
    });
    console.log("velo", newVelo)
    newVelo.save()
}

async function updateVelo(data, id) {
    await velo.findByIdAndUpdate({ _id: id.toString() }, data)
        .then(data => data)

}

async function updateVeloDisponibilityToInMaintaince(id) {
    v =  await velo.findOne({ _id: id.toString() })
   v.disponibility ="in_maintenance"
    console.log(v)
   return  await velo.findByIdAndUpdate({ _id: v._id.toString() }, v)             
}

async function updateVeloDisponibilityToInService(id) {
    v =  await velo.findOne({ _id: id.toString() })
   v.disponibility ="in_service"
    console.log(v)
   return  await velo.findByIdAndUpdate({ _id: v._id.toString() }, v)             
}

async function updateVeloDisponibilityToBroken(id) {
    v =  await velo.findOne({ _id: id.toString() })
   v.disponibility ="broken"
    console.log(v)
   return  await velo.findByIdAndUpdate({ _id: v._id.toString() }, v)             
}

async function displayVeloById(id) {
    return await velo.find({ _id: id.toString() })
        .then(data => data) /* mongoose find methode always return promise  */
        .catch(err => console.log(err));
}
async function displayAllVelo() {
    return await velo.find()
        .then(data => data) /* mongoose find methode always return promise  */
        .catch(err => console.log(err));
}

function deleteVeloById(id) {
    velo.findOneAndRemove({ _id: id.toString() }, (err) => {
        if (err) throw err;
    })
}
module.exports = { addVelo, displayVeloById, displayAllVelo, updateVelo , deleteVeloById, updateVeloDisponibilityToInMaintaince, updateVeloDisponibilityToInService, updateVeloDisponibilityToBroken} 

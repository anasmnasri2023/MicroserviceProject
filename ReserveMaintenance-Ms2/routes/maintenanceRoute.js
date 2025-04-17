var express = require('express');
var router = express.Router();
var maintenanceService = require('../services/maintenanceService')

/**
 * @swagger
 * components:
 *  schemas:
 *    maintenance:  
 *     type: object
 *     required: 
 *       - type
 *     properties : 
 *        id: 
 *          type: string
 *          description: the auto generted id of maintenance
 *        description: 
 *          type: string
 *          
 *        dateOfMaintenance: 
 *          type: date
 *          
 *        type: 
 *          type: enum
 *          
 *        price: 
 *          type: number    
 *        avalible: 
 *          type: boolean       
 *     example:
 *       id: 634b2ce222987bead7454f8f
 *       description: Best maintenance
 *       type: wheel
 *       price: 200
 *       avalible: true
 */

/**
 * @swagger
 * /maintenance/addMaintenance:
 *   post:
 *     summary: Create a new maintenance 
 *     tags: [Maintenances]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/maintenance'
 *     responses:
 *       200:
 *         description: The maintenance was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/maintenance'
 *       500:
 *         description: Some server error
 */

router.post('/addMaintenance', function (req, res, next) {
    console.log("route", req.body)
    maintenanceService.addMaintenance(req).then(data => res.json(data));

});

/**
 * @swagger
 * /maintenance/update/{id}:
 *  put:
 *    summary: Update the maintenance by the id
 *    tags: [Maintenances]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The maintenance id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/maintenance'
 *    responses:
 *      200:
 *        description: The maintenance was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/maintenance'
 *      404:
 *        description: The maintenance was not found
 *      500:
 *        description: Some error happened
 */

router.put('/update/:id', function (req, res, next) {
    var id = req.params.id;
    maintenanceService.updateMaintenance(req.body,req.params.id);
    res.end()
  });  

/**
 * @swagger
 * /maintenance/velo/{id}:
 *   get:
 *     summary: Get the maintenance by id  bicycle
 *     tags: [Maintenances]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The maintenance id
 *     responses:
 *       200:
 *         description: The maintenance description by id bicycle
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/maintenance'
 *       404:
 *         description: The maintenance was not found
 */

router.get('/velo/:id', function (req, res, next) {
    console.log("route", req.params.id)
    maintenanceService.displayMaintenanceByVelo(req.params.id).then(data => res.json(data));

});

/**
 * @swagger
 * /maintenance/{id}:
 *   get:
 *     summary: Get the maintenance by id  
 *     tags: [Maintenances]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The maintenance id
 *     responses:
 *       200:
 *         description: The maintenance description by id 
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/maintenance'
 *       404:
 *         description: The maintenance was not found
 */


router.get('/:id', function (req, res, next) {
    console.log("route", req.params.id)
    maintenanceService.displayMaintenanceById(req.params.id).then(data => res.json(data));

});

/**
 * @swagger
 * /maintenance:
 *   get:
 *     summary: Returns the list of all the maintenances
 *     tags: [Maintenances]
 *     responses:
 *       200:
 *         description: The list of the maintenances
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/maintenance'
 */
router.get('/', function (req, res, next) {
    maintenanceService.displayAllMaintenance().then(data => res.json(data));
});

/**
 * @swagger
 * /maintenance/delete/{id}:
 *   delete:
 *     summary: Remove the maintenance by id
 *     tags: [Maintenances]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The maintenance id
 * 
 *     responses:
 *       200:
 *         description: The maintenance was deleted
 *       404:
 *         description: The maintenance was not found
 */

router.delete('/delete/:id', function (req, res, next) {
    var id = req.params.id;
    maintenanceService.deleteMaintenanceById(id);
    res.end()
  
  });

module.exports = router;

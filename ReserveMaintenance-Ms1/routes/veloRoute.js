var express = require('express');
var router = express.Router();
var veloService = require('../services/veloService')
/**
 * @swagger
 * components:
 *  schemas:
 *    velo:  
 *     type: object
 *     required: 
 *       - model
 *       - code
 *     properties : 
 *        id: 
 *          type: string
 *          description: the auto generted id of bicycle
 *        price: 
 *          type: number
 *          
 *        statut: 
 *          type: string
 *          
 *        disponibility: 
 *          type: enum
 *          
 *        type: 
 *          type: string       
 *     example:
 *       id: 634b2ce222987bead7454f8f
 *       model: hiii
 *       code: 12345
 *       price: 200
 *       statut: 0
 *       disponibility: in_service
 *       type: city_bike
 */

/**
 * @swagger
 * /velo/addVelo:
 *   post:
 *     summary: Create a new bicycle
 *     tags: [Bicycles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/velo'
 *     responses:
 *       200:
 *         description: The bicycle was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/bicycle'
 *       500:
 *         description: Some server error
 */
router.post('/addVelo', function (req, res, next) {
    console.log("route", req.body)
    veloService.addVelo(req).then(data => res.json(data));

});

/**
 * @swagger
 * /velo/update/{id}:
 *  put:
 *    summary: Update the bicycle by the id
 *    tags: [Bicycles]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The bicycle id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/velo'
 *    responses:
 *      200:
 *        description: The bicycle was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/velo'
 *      404:
 *        description: The bicycle was not found
 *      500:
 *        description: Some error happened
 */

router.put('/update/:id', function (req, res, next) {
    var id = req.params.id;
    veloService.updateVelo(req.body,req.params.id);
    res.end()
  });  

  /**
 * @swagger
 * /velo/inMaintenance/{id}:
 *  put:
 *    summary: Update the bicycle by the id and disponibility inMaintenance
 *    tags: [Bicycles]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The bicycle id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/velo'
 *    responses:
 *      200:
 *        description: The bicycle was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/velo'
 *      404:
 *        description: The bicycle was not found
 *      500:
 *        description: Some error happened
 */


  router.put('/inMaintenance/:id', function (req, res, next) {
    var id = req.params.id;
    veloService.updateVeloDisponibilityToInMaintaince(req.params.id);
    res.end()
  });  

  /**
 * @swagger
 * /velo/inService/{id}:
 *  put:
 *    summary: Update the bicycle by the id and disponibility inService
 *    tags: [Bicycles]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The bicycle id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/velo'
 *    responses:
 *      200:
 *        description: The bicycle was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/velo'
 *      404:
 *        description: The bicycle was not found
 *      500:
 *        description: Some error happened
 */


  router.put('/inService/:id', function (req, res, next) {
    var id = req.params.id;
    veloService.updateVeloDisponibilityToInService(req.params.id);
    res.end()
  });  

  /**
 * @swagger
 * /velo/broken/{id}:
 *  put:
 *    summary: Update the bicycle by the id and disponibility broken
 *    tags: [Bicycles]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The bicycle id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/velo'
 *    responses:
 *      200:
 *        description: The bicycle was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/velo'
 *      404:
 *        description: The bicycle was not found
 *      500:
 *        description: Some error happened
 */


  router.put('/broken/:id', function (req, res, next) {
    var id = req.params.id;
    veloService.updateVeloDisponibilityToBroken(req.params.id);
    res.end()
  });  

/**
 * @swagger
 * /velo/{id}:
 *   get:
 *     summary: Get the bicycle by id
 *     tags: [Bicycles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bicycle id
 *     responses:
 *       200:
 *         description: The bicycle description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/velo'
 *       404:
 *         description: The bicycle was not found
 */

router.get('/:id', function (req, res, next) {
    console.log("route", req.params.id)
    veloService.displayVeloById(req.params.id).then(data => res.json(data));

});
/**
 * @swagger
 * /velo:
 *   get:
 *     summary: Returns the list of all the bicycles
 *     tags: [Bicycles]
 *     responses:
 *       200:
 *         description: The list of the bicycles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/velo'
 */
router.get('/', function (req, res, next) {
    veloService.displayAllVelo().then(data => res.json(data));
});

/**
 * @swagger
 * /velo/delete/{id}:
 *   delete:
 *     summary: Remove the bicycle by id
 *     tags: [Bicycles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bicycle id
 * 
 *     responses:
 *       200:
 *         description: The bicycle was deleted
 *       404:
 *         description: The bicycle was not found
 */
router.delete('/delete/:id', function (req, res, next) {
    var id = req.params.id;
    veloService.deleteVeloById(id);
    res.end()
  
  });

module.exports = router;

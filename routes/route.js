const express = require('express')
const router = express.Router()
const db_Actions = require("../controllers/actions");
const db_ActionsHW4 = require("../controllers/actionsHW4");
const validations = require("../controllers/validation");

router.get("/", db_Actions.listContacts);
router.get("/:contactId", db_Actions.findContact);
router.post("/", validations.validateRequest, db_Actions.addContact);
router.delete('/:contactId', validations.validateRequest, db_Actions.deleteContact)

router.patch(
  "/:contactId",
  validations.validateRequest,
  db_Actions.updateContact
);




//////////////////////////////////////

router.post('/auth/register', validations.userValidateHW4, db_ActionsHW4.addUserHW4)
router.put('/auth/login', validations.userValidateHW4, db_ActionsHW4.loginUser)
router.put('/auth/logout', db_ActionsHW4.tokenValidation, db_ActionsHW4.logOutUsers)
router.get('/auth/currentUser', db_ActionsHW4.getCurrentUser)


module.exports = router;
const express = require('express');
const router = new express.Router();
const items = require('./fakeDb');
const middleware = require('./middleware');
const ExpressError = require("./expressErrors");

router.get('/', (req, res) => {
  console.log(items)
  return res.json(items)
})

router.post('/', middleware.addToDB, (req, res) => {
  return res.json({"added" : req.body})
})

router.get('/:name', middleware.checkMatch, (req, res, next) => {
  try{
    if(req.params.match !== null){
      res.json(req.params.match)
    } else{
      throw new ExpressError("Not found!", 404);
    }
  } catch(err){
    next(err)
  }
}) 

router.patch('/:name', middleware.updateFakeDB, (req, res, next) => {
  try{
    if(req.params.match !== null){
      res.json(req.params.match)
    } else{
      throw new ExpressError("Not found!", 404);
    }
  } catch(err){
    next(err)
  }
})


router.delete('/:name', middleware.deleteEntryFromDB, (req, res, next) => {
  try{
    if(req.params.deleted === true){
      res.json({"message" : "Deleted"});
    } else{
      throw new ExpressError("Not found!", 404);
    }
  } catch(err){
    next(err)
  }
})

/*

Things to create: 

1. get request ----> DONE
2. post request ----> DONE
3. get a specific item request ----> DONE
4. patch request to update items ----> DONE
5. delete request to delete an item ----> DONE
6. Error handeling ----> DONE
7. test with super test

*/











module.exports = router;
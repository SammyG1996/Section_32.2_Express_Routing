
// This will add a new entry to the fakeDB
function addToDB(req, res, next) {
  items.push(req.body)
  console.log(items)
  next()
}

// This will check to see if there is an entry that matches the searched item
function checkMatch(req, res, next) {
  let match = null;
  for(let obj of items){
    if(obj.name === req.params.name){
      match = obj;
      break
    }
  }
  req.params.match = match;
  next();
}

// This will find the matching entry in the DB and then update it with the new params
function updateFakeDB(req, res, next){
  let match = null;
  for(let obj of items){
    if(obj.name === req.params.name){
      obj.name = req.body.name;
      obj.price = req.body.price;
      match = obj;
      break
    }
  }
  req.params.match = match;
  next();
}

function deleteEntryFromDB(req, res, next){
  let deleted = null; 
  for(let i = 0; i < items.length; i++){
    if(items[i].name === req.params.name){
      items.splice(i, 1);
      deleted = true;
    }
  }
  req.params.deleted = deleted;
  next();
}

module.exports = {addToDB, checkMatch, updateFakeDB, deleteEntryFromDB}
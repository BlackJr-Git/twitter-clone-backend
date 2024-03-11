import data from "../../assets/initial-data.json" assert { type: "json" };

let userData = data.users;
function findUserById(id) {
  return userData.find((user) => user.id === +id);
}

function findUserIndex(id) {
  return userData.findIndex((article) => article.id === +id);
}

/*
--------------------------
Retrieve one user from 
the database.
--------------------------
*/
async function getOneUser(req, res, next) {
  const { userId } = req.params;
  let user = findUserById(userId);
  if (user) {
    return res.send(user);
  }
  return res
    .status(404)
    .send(`L'utilisateur avec l'id : ${userId} n'existe pas`);
}

/*
--------------------------
Retrieve all users from 
the database.
--------------------------
*/
async function getAllUsers(req, res, next) {
  return res.send(userData);
}

/*
--------------------------
Create and save a new user
in the database
--------------------------
*/
async function createUser(req, res, next) {
  const newUser = req.body;

  userData.push(newUser);
  return res.status(200).send(userData[userData.length - 1]);
}

/*
--------------------------
Update a user by the id 
in the request
--------------------------
*/
async function updateUser(req, res, next) {
  return res.send("User is updated");
}

/*
--------------------------
Delete a user with 
the specified id 
in the request
--------------------------
*/
async function deleteUser(req, res, next) {
  const { userId } = req.params;
  const userIndex = findUserIndex(userId);
  if (userIndex < 0) {
    return res
      .status(404)
      .send(`L'utilisateur avec l'id ${userId} n'existe pas`);
  } else {
    const user = userData.splice(userIndex, 1)[0];
    return res.status(202).send(user);
  }
}

/*
--------------------------
Delete all users from 
the database.
--------------------------
*/
async function deleteAllUsers(req, res, next) {
  userData = [];
  return res.send("All Users have been deleted");
}

export {
  createUser,
  deleteAllUsers,
  deleteUser,
  getAllUsers,
  getOneUser,
  updateUser,
};

export default {
  createUser,
  deleteAllUsers,
  deleteUser,
  getAllUsers,
  getOneUser,
  updateUser,
};

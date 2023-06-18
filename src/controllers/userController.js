export async function getAllUsers(req, res) {
  res.send("get All users");
}

export async function getSingleUser(req, res) {
  res.send("get single user");
}

export async function showCurrentUser(req, res) {
  res.send("show current user");
}

export async function updateUser(req, res) {
  res.send("update user");
}

export async function updateUserPassword(req, res) {
  res.send("update user password");
}

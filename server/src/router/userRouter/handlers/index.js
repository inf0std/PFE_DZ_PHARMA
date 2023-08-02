module.exports = (db) => {
  return {
    handleLogin: require("./handleLogin")(db),
    handleDelete: require("./handleDelete")(db),
    handleUpdate: require("./handleUpdate")(db),
    handleRegister: require("./handleRegister")(db),
  };
};

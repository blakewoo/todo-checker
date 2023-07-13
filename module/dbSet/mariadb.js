const user = require("../query/mariadb/m_q_user")

module.exports = function () {
    let module = {}
    module.user = user;
    return module
}
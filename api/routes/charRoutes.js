'use strict';
module.exports = function(app) {
    var charList = require('../controllers/charController');

    // todoList Routes
    app.route('/chars')
        .get(charList.list_all_chars)
        .post(charList.create_a_char);


    app.route('/chars/:charId')
        .get(charList.read_a_char)
        .put(charList.update_a_char)
        .delete(charList.delete_a_char);

    app.route('/chars/:charId/total_lvl')
        .get(charList.char_total_lvl);
};

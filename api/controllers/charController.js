'use strict';


var mongoose = require('mongoose'),
    request = require('request'),
    Char = mongoose.model('Chars');


exports.list_all_chars = function(req, res) {
    Char.find({}, function(err, chars) {
        if (err) res.send(err);
        res.json(chars);
    });
};


exports.create_a_char = function(req, res) {
    var new_char = new Char(req.body);
    new_char.save(function(err, char) {
        if (err) res.send(err);
        res.json(char);
    });
};


exports.read_a_char = function(req, res) {
    Char.findOne({ 'login': req.params.login }, function(err, char) {
        if (err) res.send(err);
        res.json(char);
    });
};


exports.update_a_char = function(req, res) {
    Char.findOneAndUpdate({ 'login': req.params.login }, req.body, {new: true}, function(err, char) {
        if (err) res.send(err);
        res.json(char);
    });
};


exports.delete_a_char = function(req, res) {
    Char.remove({ 'login': req.params.login }, function(err, char) {
        if (err) res.send(err);
        res.json({ message: 'Char successfully deleted' });
    });
};


var adiciona_login = function(json, login) {
    json['login'] = login
    return json
}

exports.import_char = function(req, res) {
    request('https://oldschool.tools/ajax/hiscore-stats/' + req.params.login, function (error, response, body) {
        let json_body = JSON.parse(body);
        if (json_body['status'] === 'failure')
            res.send({ 'error': json_body['message'] });
        if (json_body['status'] === 'success') {
            var new_char = new Char(adiciona_login(json_body, req.params.login));
            new_char.save(function(err, char) {
                if (err) res.send(err);
                res.json(char);
            });
        } else {
            res.send('bugou algo');
        }

    })
}


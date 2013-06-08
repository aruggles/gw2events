
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'GW2 Events' });
};
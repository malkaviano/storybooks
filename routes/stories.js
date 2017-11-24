'use strict';

const {ensureAuthenticated, ensureAuthorized} = require('../helpers/authenticate');

module.exports = function(router, Story) {
  router.get('/', (req, res) => {
    Story.find({ status: "public" })
          .populate('author')
          .then(stories => {
            res.render(
              'stories/index',
              {
                stories: stories
              }
            );
          })
          .catch(err => {
            console.log(err);
            
            throw err;
          });
  });

  router.get('/new', ensureAuthenticated, (req, res) => {
    res.render('stories/new');
  });

  router.post('/', ensureAuthenticated, (req, res) => {
    req.body.allowComments = !!req.body.allowComments;
    req.body.author = req.session.userId;

    new Story(req.body)
      .save()
      .then(
        story => {
          console.log(story);

          res.flash('info_msg', 'Story was created');

          res.redirect('/dashboard');
        }
      )
      .catch(err => {
        const errors = [];        

        for(const prop in err.errors) {
          //console.log(item);

          errors.push({ message: err.errors[prop].message });
        }
        //err.errors.forEach((item, index) => errors.push(item));
        
        //errors.push(err.errors['description']);

        res.render('stories/new', { errors: errors });
      });
  });

  router.get('/:id', (req, res) => {

    Story.findOne({ _id: req.params.id, status: "public" })
          .populate('author')
          .then(story => {
            res.render(
              'stories/show', {
              story: story
            });
          })
          .catch(err => {
            console.log(err);
            
            throw err;
          });
  });

  router.get('/:id/edit', ensureAuthenticated, (req, res) => {
    
    Story.findOne({ _id: req.params.id, author: req.session.userId })
          .populate('author')
          .then(story => {
            res.render(
              'stories/edit', {
              story: story
            });
          })
          .catch(err => {
            console.log(err);
            
            throw err;
          });
  });
  
  router.patch('/:id', ensureAuthenticated, (req, res) => {
    
    Story.update(
      { _id: req.params.id, author: req.session.userId },
      { $set: 
        { 
          title: req.body.title,
          status: req.body.status,
          description: req.body.description,
          allowComments: req.body.allowComments,
        }
      }
    )
    .then(
      story => {
        res.flash('info_msg', 'Story was modified');

        res.redirect('/dashboard');
      }
    ).catch(err => {
      console.log(err);
      
      throw err;
    });
  });

  router.delete('/:id', ensureAuthenticated, (req, res) => {

    Story.remove({ _id: req.params.id })
    .then(() => {
      res.flash('info_msg', 'Story was deleted');

      res.redirect('/dashboard')
    })
    .catch(err => {
      console.log(err);
      
      throw err;
    });          
  });

  return router;
};
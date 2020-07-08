const userEventRel = require('./userEventRel')
const User = require('./user')
const Task = require('./task')
const Event = require('./event')
const Poll = require('./poll')
const Options = require('./options')

Task.belongsTo(User)
User.hasMany(Task)

Event.belongsToMany(User, {through: 'users_events'})
User.belongsToMany(Event, {through: 'users_events'})

Task.belongsTo(Event)
Event.hasMany(Task)

Poll.belongsTo(Event)
Poll.belongsTo(User)
Options.belongsTo(Poll)

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Task,
  Event,
  userEventRel,
  Poll,
  Options
}

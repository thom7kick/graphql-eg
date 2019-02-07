import sequelize from '../models';

export default function resolvers () {
  const models = sequelize.models;

  return {
    RootQuery: {
      user (root, { id }, context) {
        return models.User.findById(id, context);
      },
      users (root, args, context) {
        return models.User.findAll({}, context);
      }
    },
    RootMutation: {
      createUser (root, { input }, context) {
        return models.User.create(input, context);    
      },
     
    },

    User: {
      projects (user) {
        return user.getProjects();
      }
    },

    Project: {
      tasks (project) {
        return project.getTasks();
      }
    }
  };
}

const mongoose = require('mongoose');
const paginate = require('./paginate.plugin');
const configSdk = require('@config');
const config = configSdk(process.env.NODE_ENV);

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

projectSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'project',
});

projectSchema.plugin(paginate);
const Project = mongoose.model('Project', projectSchema);

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Project',
    required: true,
  },
});

taskSchema.plugin(paginate);
const Task = mongoose.model('Task', taskSchema);

const mongooseConfig = {
  url: config.CACHE_MONGO_URI,
  options: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  collection: config.CACHE_MONGO_COLLECTION,
};

describe('paginate plugin', () => {
  beforeAll(async () => {
    await mongoose.connect(mongooseConfig.url, mongooseConfig.options);
  });

  beforeEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(async collection => collection.deleteMany()));
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('populate option', () => {
    test('should populate the specified data fields', async () => {
      const project = await Project.create({ name: 'Project One' });
      const task = await Task.create({ name: 'Task One', project: project._id });
      const taskPages = await Task.paginate({ _id: task._id }, { populate: 'project' });
      expect(taskPages.results[0].project).toHaveProperty('_id', project._id);
    });

    test('should populate the specified data fields with sortby', async () => {
      const project = await Project.create({ name: 'Project One' });
      const task = await Task.create({ name: 'Task One', project: project._id });
      const taskPages = await Task.paginate(
        { _id: task._id },
        {
          populate: 'project',
          sortBy: 'name:desc',
        },
      );
      expect(taskPages.results[0].project).toHaveProperty('_id', project._id);
    });

    test('should populate nested fields', async () => {
      const project = await Project.create({ name: 'Project One' });
      const task = await Task.create({ name: 'Task One', project: project._id });
      const projectPages = await Project.paginate({ _id: project._id }, { populate: 'tasks.project' });
      const { tasks } = projectPages.results[0];
      expect(tasks).toHaveLength(1);
      expect(tasks[0]).toHaveProperty('_id', task._id);
      expect(tasks[0].project).toHaveProperty('_id', project._id);
    });
  });
});

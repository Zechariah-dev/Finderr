class BaseRepository {
  constructor(Model) {
    this.Model = Model;
  }

  create(payload = {}) {
    return this.Model.create(payload);
  }

  findOne(condition = {}) {
    return this.Model.findOne({ ...condition });
  }

  findById(id) {
    return this.Model.findById(id)
      .catch(() => null);
  }

  findBySlug(slug) {
    return this.Model.findOne({ slug });
  }

  all(condition = {}) {
    return this.Model.find(condition);
  }

  createMany(data = []) {
    return this.Model.insertMany(data);
  }

  deleteMany(condition = {}) {
    return this.model.deleteMany(condition);
  }

  deleteOne(condition = {}) {
    return this.model.findOneAndDelete(condition);
  }

  updateOne(condition = {}, data = {}) {
    return this.Model.findOneAndUpdate(condition, data);
  }

  count(condition = {}) {
    return this.Model.find(condition).count();
  }

}


module.exports = BaseRepository;

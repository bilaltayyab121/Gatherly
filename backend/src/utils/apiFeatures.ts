import { PrismaClient } from '@prisma/client';

class APIFeatures {
  private model: any;
  private query: any;
  private queryOptions: any = {};

  constructor(model: any, query: any) {
    this.model = model;
    this.query = query;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.queryOptions.where = JSON.parse(queryStr);

    return this;
  }

  sort() {
    if (this.query.sort) {
      const sortBy = this.query.sort.split(',').join(' ');
      this.queryOptions.orderBy = sortBy;
    } else {
      this.queryOptions.orderBy = { createdAt: 'desc' };
    }

    return this;
  }

  limitFields() {
    if (this.query.fields) {
      const fields = this.query.fields.split(',').join(' ');
      this.queryOptions.select = fields;
    }

    return this;
  }

  paginate() {
    const page = this.query.page * 1 || 1;
    const limit = this.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.queryOptions.take = limit;
    this.queryOptions.skip = skip;

    return this;
  }

  // Public method to execute the query
  async execute() {
    return await this.model.findMany(this.queryOptions);
  }
}

export default APIFeatures;
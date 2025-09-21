function paginate(array, page = 1, limit = 5) {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    data: array.slice(start, end),
    currentPage: page,
    totalPages: Math.ceil(array.length / limit),
    totalItems: array.length,
    hasNext: end < array.length,
    hasPrev: page > 1,
  };
}

module.exports = paginate;
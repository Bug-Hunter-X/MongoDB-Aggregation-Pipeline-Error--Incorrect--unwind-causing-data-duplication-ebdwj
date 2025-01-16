```javascript
// Assuming you have a MongoDB collection named 'users'

db.users.aggregate([
  { $match: { age: { $gt: 25 } } }, // Match users older than 25
  { $lookup: {
    from: 'products',
    localField: 'favoriteProduct',
    foreignField: '_id',
    as: 'favoriteProducts' 
  } },
  { $unwind: '$favoriteProducts' },
  { $group: {
    _id: '$favoriteProducts.category',
    count: { $sum: 1 },
    averagePrice: { $avg: '$favoriteProducts.price' }
  } },
  { $sort: { count: -1 } }
]);
```
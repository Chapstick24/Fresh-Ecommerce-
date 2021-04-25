const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: ["id", "category_name"],
    include:[{
      // be sure to include its associated Products
      model: Product, attributes:["id", "product_name", "price", "category_id"],
    }]
  })
 .then((catData) => res.json(catData))
 .catch (err => res.status(500).json(err)
);})




router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include:[{
      model: Product,
      attributes:["id", "product_name", "price", 'stock', "category_id"],
    }]
  })
.then((catData)=> {
  if(!catData){
    res.status(404).json({message: "nothing here"});
    return;
  }
  res.json(catData);
})
.catch((err) => {
  res.status(500).json(err);
})
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try{
const catData = await Category.create(req.body);
res.status(200).json(catData);
  }
  catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "no category here" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});


router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value
  try{
    const catData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!catData){
      res.status(404).json({message: "try again"});
      return;
    }
    res.status(200).json(catData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

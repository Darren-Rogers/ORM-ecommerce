const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll()
    res.json(allCategories)
  } catch (err) {
    res.json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const specificCategory = await Category.findByPk(req.params.id,{
      include:[{
        model: Product,
        attributes: ['product_name','price','stock']
      }]
    })
    res.json(specificCategory)
  } catch (err) {
    res.json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCatergory = await Category.create(req.body)
    res.json(newCatergory)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
});

router.put('/:id',async (req, res) => {
  // update a category by its `id` value
  try {
    const idCategory = await Category.update(req.body,
      {
        where:{id:req.params.id}
      })
    res.json(idCategory)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
});

router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value
  try {
    const idCategory = await Category.destroy(
      {
        where:{id:req.params.id}
      })
    res.json(idCategory)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
});

module.exports = router;
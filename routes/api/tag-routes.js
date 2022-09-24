const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/',async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      attributes: ['id','tag_name'],
      include: [{
        model:Product,
        attributes:['id','product_name','price','stock']
      }]
    })
    res.json(allTags)
  } catch (err) {
    res.json(err)
  }
});

router.get('/:id',async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const idTags = await Tag.findByPk(req.params.id,{
      attributes: ['id','tag_name'],
      include: [{
        model:Product,
        attributes:['id','product_name','price','stock']
      }]
    })
    res.json(idTags)
  } catch (err) {
    res.json(err)
  }
});

router.post('/',async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body,{
      where: {id:req.params.id}
    })
    res.json(newTag)
  } catch (err) {
    res.json(err)
  }
});

router.put('/:id',async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body,{
      where: {id:req.params.id}
    })
    res.json(updateTag)
  } catch (err) {
    res.json(err)
  }
});

router.delete('/:id',async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {id:req.params.id}
    })
    res.json(deleteTag)
  } catch (err) {
    res.json(err)
  }
});

module.exports = router;
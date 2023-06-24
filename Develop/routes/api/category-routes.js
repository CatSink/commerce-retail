const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll({include:Product});
    res.json(categoryData);
  } 
  catch(err){
    console.log(err);
    res.status(500).json({message: err.message});
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id {
      include:Product,
});
  if (!categoryData) {
    res.status(404).json({message: 'category cannot be found'});
  }  
   res.json(categoryData);
} catch(err){
  console.log(err);
  res.status(500).json({message: err.message});
 } 
});  
router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  
  }catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.findbyPk(req.params.id);
    if (!categoryData) {
      res.status(404).json({message:'Category id cannot be found.'});
      return;
    }
    await categoryData.update(req.body);
    res.json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryData = await Category.delete({
      where: {id: req.params.id}
    });
    if (!categoryData){
      res.status(404).json({message:'A category matching that id cannot be found'});
      return;
    }
    res.status(200).json({message: 'Category deleted successfully'});
 } catch (err) {
  res.status(400).json(err);
 }
});

module.exports = router;

import { Category } from './Category.js'
import { Product } from './Product.js'
import { Tag } from './Tag.js'
import { ProductTag } from './ProductTag.js'

Category.hasMany(Product, { foreignKey: 'category_id' })
Product.belongsTo(Category, { foreignKey: 'category_id' })

Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id'})
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id'})

ProductTag.belongsTo(Product, { foreignKey: 'product_id' })
ProductTag.belongsTo(Tag, { foreignKey: 'tag_id' })

export { Category, Product, Tag, ProductTag }
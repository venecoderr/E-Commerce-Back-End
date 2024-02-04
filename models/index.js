import { Category } from './Category.js';
import { Product } from './Product.js';
import { Tag } from './Tag.js';
import { ProductTag } from './ProductTag.js';

Category.hasMany(Product, { foreignKey: 'category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Product.belongsTo(Category, { foreignKey: 'category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

ProductTag.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ProductTag.belongsTo(Tag, { foreignKey: 'tag_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

export { Category, Product, Tag, ProductTag };

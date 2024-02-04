import { Router } from 'express'
import { categoryRoutes } from './category-routes.js'
import { productRoutes } from './product-routes.js'
import { tagRoutes } from './tag-routes.js'

export const apiRoutes = Router()

apiRoutes.use('/categories', categoryRoutes);
apiRoutes.use('/products', productRoutes);
apiRoutes.use('/tags', tagRoutes);

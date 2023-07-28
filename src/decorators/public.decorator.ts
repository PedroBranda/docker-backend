import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic'

/**
 * Handler that enable unauthorized users to do a request
 * @constructor
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

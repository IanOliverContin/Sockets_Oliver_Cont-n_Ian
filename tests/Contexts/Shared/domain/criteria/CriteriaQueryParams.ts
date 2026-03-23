import { InFilterPrimitives } from '@Shared/domain/criteria/InFilter'

export interface CriteriaQueryParams {
	filters?: Array<Map<string, string>>
	inFilters?: Array<InFilterPrimitives>
	orderBy?: string
	orderType?: string
	limit?: number
	offset?: number
}

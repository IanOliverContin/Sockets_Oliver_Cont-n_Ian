import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Order } from '@Shared/domain/Criteria/Order'
import { CriteriaQuery } from '@Shared/domain/Criteria/CriteriaQuery'
import { InFilters } from '@Shared/domain/Criteria/InFilters'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { OrderBy } from '@Shared/domain/Criteria/OrderBy'
import { OrderType } from '@Shared/domain/Criteria/OrderType'
import { InFilter } from '@Shared/domain/Criteria/InFilter'

export class CriteriaMother {
  static createWithOptions (params?: Partial<Criteria>): Criteria {
    return new Criteria(
      params?.filters,
      params?.inFilters,
      params?.order,
      params?.limit,
      params?.offset
    )
  }

  static create (
    filters?: Filters,
    inFilters?: InFilters,
    order?: Order,
    limit?: number,
    offset?: number
  ): Criteria {
    return CriteriaMother.createWithOptions({ filters, inFilters, order, limit, offset })
  }

  static fromQuery<Q extends CriteriaQuery> (query: Q) {
    const { filters, inFilters, orderBy, orderType, limit, offset } = query
    return Criteria.fromPrimitives(filters, inFilters, orderBy, orderType, limit, offset)
  }

  static empty (): Criteria {
    return this.create()
  }

  static emptySorted (orderBy: string, orderType: string): Criteria {
    return this.create(
      undefined,
      undefined,
      new Order(new OrderBy(orderBy), OrderType.fromValue(orderType))
    )
  }

  static withFilter (field: string, operator: string, value: string): Criteria {
    return this.create(new Filters([Filter.simple(field, operator, value)]))
  }

  static withInFilter (field: string, operator: string, values: Array<string>): Criteria {
    return this.create(
      undefined,
      new InFilters([InFilter.fromPrimitives({ field, operator, values })])
    )
  }

  static withLimit (limit: number): Criteria {
    return this.create(undefined, undefined, undefined, limit)
  }

  static withLimitAndOffset (limit: number, offset: number): Criteria {
    return this.create(undefined, undefined, undefined, limit, offset)
  }
}

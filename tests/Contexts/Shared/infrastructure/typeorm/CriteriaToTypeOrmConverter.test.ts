import { CriteriaToTypeOrmConverter } from '@Shared/infrastructure/persistence/typeorm/CriteriaToTypeOrmConverter'
import { CriteriaMother } from '@Tests/Contexts/Shared/domain/criteria/CriteriaMother'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { ArrayContains, Equal, IsNull, MoreThan, Not } from 'typeorm'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { Order } from '@Shared/domain/Criteria/Order'
import { OrderBy } from '@Shared/domain/Criteria/OrderBy'
import { OrderType } from '@Shared/domain/Criteria/OrderType'
import { InFilter } from '@Shared/domain/Criteria/InFilter'
import { InFilters } from '@Shared/domain/Criteria/InFilters'

describe('CriteriaToTypeOrmConverter', () => {
  const converter = new CriteriaToTypeOrmConverter()

  let criteria: Criteria
  let queryOptions: ReturnType<typeof converter.convert>

  it('should generate a simple select from an empty criteria', () => {
    criteria = CriteriaMother.empty()
    queryOptions = converter.convert(criteria)

    expect(queryOptions).toStrictEqual({})
  })

  it('should generate a query with an order', () => {
    criteria = CriteriaMother.emptySorted('createdAt', 'desc')
    queryOptions = converter.convert(criteria)

    expect(queryOptions).toStrictEqual({ order: { createdAt: 'desc' } })
  })

  it('should generate a limited select', () => {
    criteria = CriteriaMother.withLimit(5)
    queryOptions = converter.convert(criteria)

    expect(queryOptions).toStrictEqual({ take: 5 })
  })

  it('should generate a paginated select (with a limit and an offset)', () => {
    criteria = CriteriaMother.withLimitAndOffset(5, 5)
    queryOptions = converter.convert(criteria)

    expect(queryOptions).toStrictEqual({
      take: 5,
      skip: 5
    })
  })

  it('should generate a select with one filter and no order', () => {
    criteria = CriteriaMother.withFilter('slug', '=', 'superfan-item-guide-3bd094cb')
    queryOptions = converter.convert(criteria)

    expect(queryOptions).toStrictEqual({ where: { slug: Equal('superfan-item-guide-3bd094cb') } })
  })

  it('should generate a select with one in-filter and no order', () => {
    criteria = CriteriaMother.withInFilter('tags', 'IN', ['ashe', 'bruiser'])
    queryOptions = converter.convert(criteria)

    expect(queryOptions).toStrictEqual({ where: { tags: ArrayContains(['ashe', 'bruiser']) } })
  })

  it('should generate a select with one filter and order', () => {
    const userIdFilter = Filter.simple('userId', '=', 'zo5wfGkRTuWXEuPgzGkSuI5hoSU2')
    const hotScoreOrder = new Order(new OrderBy('hotScore'), OrderType.fromValue('desc'))
    criteria = CriteriaMother.create(new Filters([userIdFilter]), undefined, hotScoreOrder)
    queryOptions = converter.convert(criteria)

    expect(queryOptions).toStrictEqual({
      where: { userId: Equal('zo5wfGkRTuWXEuPgzGkSuI5hoSU2') },
      order: { hotScore: 'desc' }
    })
  })

  it('should generate a select filtering by null values', () => {
    const publishedFilter = Filter.simple('publishedAt', '!=', null)
    criteria = CriteriaMother.create(new Filters([publishedFilter]))
    queryOptions = converter.convert(criteria)

    expect(queryOptions).toStrictEqual({
      where: { publishedAt: Not(IsNull()) }
    })
  })

  it('should generate a paginated select with multiple filters and order', () => {
    const userIdFilter = Filter.simple('userId', '=', 'FcAiWhCtlFdcRglqKHWS23IHXHr1')
    const publicStatusFilter = Filter.simple('status', '=', 'public')
    const hotScoreOrder = new Order(new OrderBy('hotScore'), OrderType.fromValue('desc'))
    criteria = CriteriaMother.create(
      new Filters([userIdFilter, publicStatusFilter]),
      undefined,
      hotScoreOrder,
      5,
      10
    )
    queryOptions = converter.convert(criteria)

    expect(queryOptions).toStrictEqual({
      where: {
        userId: Equal('FcAiWhCtlFdcRglqKHWS23IHXHr1'),
        status: Equal('public')
      },
      order: { hotScore: 'desc' },
      take: 5,
      skip: 10
    })
  })

  it('should generate a paginated select combining filters and in-filters with an order', () => {
    const differentUserFilter = Filter.simple('userId', '!=', 'FcAiWhCtlFdcRglqKHWS23IHXHr1')
    const positiveHotScoreFilter = Filter.simple('hotScore', '>', 0)
    const tagsInFilter = InFilter.fromPrimitives({
      field: 'tags',
      operator: 'IN',
      values: ['teemo']
    })
    const publicationDateOrder = new Order(new OrderBy('publishedAt'), OrderType.fromValue('asc'))

    criteria = CriteriaMother.create(
      new Filters([differentUserFilter, positiveHotScoreFilter]),
      new InFilters([tagsInFilter]),
      publicationDateOrder,
      2,
      4
    )
    queryOptions = converter.convert(criteria)

    expect(queryOptions).toStrictEqual({
      where: {
        userId: Not(Equal('FcAiWhCtlFdcRglqKHWS23IHXHr1')),
        hotScore: MoreThan(0),
        tags: ArrayContains(['teemo'])
      },
      order: { publishedAt: 'asc' },
      take: 2,
      skip: 4
    })
  })

  it('should generate a select modifying the column names based on the provided mapping', () => {
    const converterWithMapping = new CriteriaToTypeOrmConverter({ gameId: 'game.id' })

    const gameIdFilter = Filter.simple('gameId', '=', '93800f4c-39b1-4174-92ea-19151a88ebe6')
    const userIdFilter = Filter.simple('userId', '=', 'FcAiWhCtlFdcRglqKHWS23IHXHr1')
    criteria = CriteriaMother.create(new Filters([gameIdFilter, userIdFilter]))

    queryOptions = converterWithMapping.convert(criteria)

    expect(queryOptions).toStrictEqual({
      where: {
        'game.id': Equal('93800f4c-39b1-4174-92ea-19151a88ebe6'),
        userId: Equal('FcAiWhCtlFdcRglqKHWS23IHXHr1')
      }
    })
  })
})

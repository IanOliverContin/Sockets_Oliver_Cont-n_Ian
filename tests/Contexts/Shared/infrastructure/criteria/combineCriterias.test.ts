import { combineCriterias } from '@Shared/infrastructure/Criteria/CombineCriterias'

describe('combineCriterias should', () => {
  test('build a new criteria combining criterias with different filters', () => {
    const firstCriteria = {
      filters: [
        new Map([
          ['field', 'field1'],
          ['operator', '='],
          ['value', 'value1']
        ])
      ]
    }
    const secondCriteria = {
      filters: [
        new Map([
          ['field', 'field2'],
          ['operator', '='],
          ['value', 'value2']
        ])
      ]
    }

    const expectedFilters = firstCriteria.filters.concat(secondCriteria.filters)
    const expectedCriteria = { filters: expectedFilters, inFilters: [] }

    expect(combineCriterias(firstCriteria, secondCriteria)).toEqual(expectedCriteria)
  })

  test('overwrite the filters from the base criteria with the filters from the second criteria', () => {
    const baseCriteria = {
      filters: [
        new Map([
          ['field', 'field1'],
          ['operator', '='],
          ['value', 'value1']
        ])
      ]
    }
    const secondCriteria = {
      filters: [
        new Map([
          ['field', 'field1'],
          ['operator', '='],
          ['value', 'value2']
        ])
      ]
    }

    const expectedCriteria = { filters: secondCriteria.filters, inFilters: [] }

    expect(combineCriterias(baseCriteria, secondCriteria)).toEqual(expectedCriteria)
  })

  test('only overwrite the filters specified in both criterias', () => {
    const baseCriteria = {
      filters: [
        new Map([
          ['field', 'field1'],
          ['operator', '='],
          ['value', 'value1']
        ]),
        new Map([
          ['field', 'field2'],
          ['operator', '='],
          ['value', 'value2']
        ])
      ]
    }
    const secondCriteria = {
      filters: [
        new Map([
          ['field', 'field1'],
          ['operator', '!='],
          ['value', 'value1']
        ])
      ]
    }

    const expectedCriteria = {
      filters: [
        new Map([
          ['field', 'field2'],
          ['operator', '='],
          ['value', 'value2']
        ]),
        new Map([
          ['field', 'field1'],
          ['operator', '!='],
          ['value', 'value1']
        ])
      ],
      inFilters: []
    }

    expect(combineCriterias(baseCriteria, secondCriteria)).toEqual(expectedCriteria)
  })

  test('build a new criteria combining criterias with different inFilters', () => {
    const baseCriteria = {
      inFilters: [{ field: 'field1', operator: 'IN', values: ['one', 'two'] }]
    }
    const secondCriteria = {
      inFilters: [{ field: 'field2', operator: 'IN', values: ['three', 'four'] }]
    }

    const expectedInFilters = baseCriteria.inFilters.concat(secondCriteria.inFilters)
    const expectedCriteria = { filters: [], inFilters: expectedInFilters }

    expect(combineCriterias(baseCriteria, secondCriteria)).toEqual(expectedCriteria)
  })

  test('overwrite the in-filters from the base criteria with the ones from the second criteria', () => {
    const baseCriteria = {
      inFilters: [{ field: 'field1', operator: 'IN', values: ['one', 'two'] }]
    }
    const secondCriteria = {
      inFilters: [{ field: 'field1', operator: 'IN', values: ['three', 'four'] }]
    }

    const expectedInFilters = secondCriteria.inFilters
    const expectedCriteria = { filters: [], inFilters: expectedInFilters }

    expect(combineCriterias(baseCriteria, secondCriteria)).toEqual(expectedCriteria)
  })

  test('only overwrite the in-filters specified in both criterias', () => {
    const baseCriteria = {
      inFilters: [
        { field: 'field1', operator: 'IN', values: ['one', 'two'] },
        { field: 'field2', operator: 'NOT IN', values: ['three'] }
      ]
    }
    const secondCriteria = { inFilters: [{ field: 'field2', operator: 'IN', values: ['four'] }] }

    const expectedCriteria = {
      filters: [],
      inFilters: [
        { field: 'field1', operator: 'IN', values: ['one', 'two'] },
        { field: 'field2', operator: 'IN', values: ['four'] }
      ]
    }

    expect(combineCriterias(baseCriteria, secondCriteria)).toEqual(expectedCriteria)
  })

  test('take the order from the base criteria if not specified in the secondary', () => {
    const baseCriteria = { orderBy: 'field1', orderType: 'ASC', limit: 0, offset: 0 }
    const secondaryCriteria = {
      filters: [
        new Map([
          ['field', 'field1'],
          ['operator', '='],
          ['value', 'value1']
        ])
      ]
    }

    const expectedCriteria = { ...baseCriteria, filters: secondaryCriteria.filters, inFilters: [] }

    expect(combineCriterias(baseCriteria, secondaryCriteria)).toEqual(expectedCriteria)
  })

  test('overwrite the order from the base criteria if specified in the secondary', () => {
    const baseCriteria = { orderBy: 'field1', orderType: 'ASC' }
    const secondaryCriteria = { orderBy: 'field1', orderType: 'DESC' }

    const expectedCriteria = { filters: [], inFilters: [], orderBy: 'field1', orderType: 'DESC' }

    expect(combineCriterias(baseCriteria, secondaryCriteria)).toEqual(expectedCriteria)
  })

  test('overwrite the limit and offset properties if specified in the secondary criteria', () => {
    const baseCriteria = { limit: 15, offset: 0 }
    const secondaryCriteria = { limit: 10, offset: 10 }

    const expectedCriteria = { ...secondaryCriteria, filters: [], inFilters: [] }

    expect(combineCriterias(baseCriteria, secondaryCriteria)).toEqual(expectedCriteria)
  })

  test('take the order properties from the secondary criteria if they are not defined in the base', () => {
    const baseCriteria = { limit: 1, offset: 1 }
    const secondaryCriteria = { orderBy: 'field1', orderType: 'ASC' }

    const expectedCriteria = {
      ...secondaryCriteria,
      filters: [],
      inFilters: [],
      limit: baseCriteria.limit,
      offset: baseCriteria.offset
    }

    expect(combineCriterias(baseCriteria, secondaryCriteria)).toEqual(expectedCriteria)
  })
})

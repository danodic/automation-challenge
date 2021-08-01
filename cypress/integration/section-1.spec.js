const { Section1 } = require('../objects/section-1')

before(() => {
  Section1.actions.visit()
})

describe('Validate the Users table.', () => {  
  context('user table visibility', () => {
    it('is hidden when page loads', () => {
      Section1.actions.assertUsersTableIsHidden()  
    })

    it('is visible when clicking on show button', () => {
      Section1.actions.clickShowTable()
      Section1.actions.assertUsersTableIsVisible()
    })
  })

  context('user table structure', () => {
    it('is 5 columns wide', () => {
      Section1.actions.assertUsersTableColumnCount(5)
    })

    it('is 10 rows long', () => {
      Section1.actions.assertUsersTableRowCount(10)
    })
  })

  context('user table data', () => {
    it('has at least 5 entries have the role "user"', () => {
      Section1.actions.assertUserCountWithRole('user', 5, false)
    })

    it('has exactly 3 people older than 60 years old', () => {
      Section1.actions.assertUserCountOlderThanAge(60, 3)
    })
  })
})

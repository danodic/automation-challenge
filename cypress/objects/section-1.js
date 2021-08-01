const Section1 = {
  /**
   * A literal is considered static, stable strings (eg. titles, form labels, ...)
   */
  literals: {
    PAGE_URL: '/section-1',
    HEADER_TEXT: 'DOM interactions',
    USER_TABLE_COLUMN_MAP: {
      "id": 1,
      "first_name": 2,
      "last_name": 3,
      "dob": 4,
      "role": 5
    }
  },

  /**
   * An element is a selector for any DOM element (eg. [data-test="xxx"], #id, ...)
   */
  elements: {
    hdrSection1: 'h1:first',
    tblUsers: '[data-test=user-table]',
    tblUsersHeader: '[data-test=table-header]',
    tblUsersRows: 'tr:not(:first)',
    btnShowTable: '[data-test=table-toggle-button]'
  },

  /**
   * An action should be pretty self explanatory! It consists of all the method performing
   * a particular action from clicking a simple button to doing complex assertions.
   */
  actions: {

    /**
     * Navigates to the section 1 page and asserts we hit the right page.
     */
    visit() {
      cy.visit(Section1.literals.PAGE_URL)
        .get(Section1.elements.hdrSection1)
        .should('have.text', Section1.literals.HEADER_TEXT)
    },

    /**
     * Clicks on the button "Show Table".
     */
    clickShowTable() {
      cy.get(Section1.elements.btnShowTable).click()
    },

    /**
     * Asserts that the users table is hidden.
     */
    assertUsersTableIsHidden() {
      cy.get(Section1.elements.tblUsers)
        .should('be.hidden')
    },

    /**
     * Asserts that the users table is visible.
     */
    assertUsersTableIsVisible() {
      cy.get(Section1.elements.tblUsers)
        .should('be.visible')
    },

    /**
     * Finds the header of the users table and asserts the amount of columns
     * matches the expected.
     * @param {Number} expectedCount the expected count of columns.
     */
    assertUsersTableColumnCount(expectedCount) {
      cy.get(Section1.elements.tblUsers)
        .find(Section1.elements.tblUsersHeader)
        .children()
        .should('have.length', expectedCount)
    },

    /**
     * Finds the body of the users table and asserts the amount of rows
     * excluding the header matches the expected.
     * @param {Number} expectedCount the expected count of rows
     */
    assertUsersTableRowCount(expectedCount) {
      cy.get(Section1.elements.tblUsers)
        .find(Section1.elements.tblUsersRows)
        .should('have.length', expectedCount)
    },

    /**
     * Finds the list of users in the user table and asserts that a given count
     * of them has an expected role.
     * @param {String} role the role to be searched for
     * @param {Number} expectedCount the expected count of users to have the
     *                 expected role.
     * @param {Boolean} exact will assert for the exact count if true, else
     *                  asserts for the count to be greater or equal the given
     *                  expected user count.
     */
    assertUserCountWithRole(role, expectedCount, exact = true) {
      let condition = (exact? 'eq' : 'be.gt')
      cy.get(Section1.elements.tblUsers)
        .find(Section1.elements.tblUsersRows)
        .find(`th:nth-child(${Section1.literals.USER_TABLE_COLUMN_MAP.role})`)
        .filter(`:contains("${role}")`)
        .its('length')
        .should(condition, expectedCount)
    },

    /**
     * Finds the list of users in the user table and asserts that a given count
     * of them is older then a given age.
     * @param {Number} age the age to be searched forsss
     * @param {Number} expectedCount the expected count of users to be older 
     *                 than the age provided.
     * @param {Boolean} exact will assert for the exact count if true, else
     *                  asserts for the count to be greater or equal the given
     *                  expected user count.
     */
    assertUserCountOlderThanAge(age, expectedCount, exact = true) {
      
      /**
       * Splits a date string and returns the year portion of it. Assumes the
       * format of the string is %m/%d/%Y.
       * @param {String} value the date in string format.
       * @returns the year represented in the date string
       */
      let dobYear = function(value) {
        return parseInt(value.split('/')[2])
      }
      
      /**
       * Parses the DOB from a given cell of the table and returns if the age
       * of the user is older than a given age.
       * @param {Number} index index of the element in the jquery array.
       * @param {Object} column the element containing the date of birth.
       */
      let isOlderThanAge = function (_, column) {
        return new Date().getFullYear() - dobYear(column.innerText) > age
      }

      let condition = (exact? 'eq' : 'be.gt')
      cy.get(Section1.elements.tblUsersRows)
      .find(`th:nth-child(${Section1.literals.USER_TABLE_COLUMN_MAP.dob})`)
      .filter((index, column) => {return isOlderThanAge(index, column)})
      .its('length')
      .should(condition, expectedCount)
    }
  },
}

module.exports = { Section1 }

const Section1 = {
  /**
   * A literal is considered static, stable strings (eg. titles, form labels, ...)
   */
  literals: {
    PAGE_URL: '/section-1',
    HEADER_TEXT: 'DOM interactions',
    USER_TABLE_COLUMN_MAP: {
      ID: 1,
      FIRST_NAME: 2,
      LAST_NAME: 3,
      DOB: 4,
      ROLE: 5
    },
    SIGN_UP_FORM_GENDER_VALUES: {
      MALE: 'male',
      FEMALE: 'female',
      NON_BINARY: 'nbin',
      OTHER: 'other',
      PREFER_NOT_TO_SAY: 'prefns'
    }
  },

  /**
   * An element is a selector for any DOM element (eg. [data-test="xxx"], #id, ...)
   */
  elements: {
    hdrSection1: 'h1:first',
    users: {
      tblUsers: '[data-test=user-table]',
      tblUsersHeader: '[data-test=table-header]',
      tblUsersRows: 'tr:not(:first)',
      btnShowTable: '[data-test=table-toggle-button]'
    },
    signUpForm: {
      form: '[data-test=signup-form]',
      txtFullname: '[data-test=full-name-input]',
      txtAge: '[data-test=age-input]',
      dpwGender: '[data-test=gender-select]',
      chkNurse: '[data-test=nurse-input]',
      btnSubmit: '[data-test=submit-btn]',
      btnShowForm: '[data-test=form-toggle-button]'
    }
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

    users: {
      /**
     * Clicks on the button "Show Table".
     */
      clickShowTable() {
        cy.get(Section1.elements.users.btnShowTable).click()
      },

      /**
       * Asserts that the users table is hidden.
       */
      assertTableIsHidden() {
        cy.get(Section1.elements.users.tblUsers)
          .should('be.hidden')
      },

      /**
       * Asserts that the users table is visible.
       */
      assertTableIsVisible() {
        cy.get(Section1.elements.users.tblUsers)
          .should('be.visible')
      },

      /**
       * Finds the header of the users table and asserts the amount of columns
       * matches the expected.
       * @param {Number} expectedCount the expected count of columns.
       */
      assertTableColumnCount(expectedCount) {
        cy.get(Section1.elements.users.tblUsers)
          .find(Section1.elements.users.tblUsersHeader)
          .children()
          .should('have.length', expectedCount)
      },

      /**
       * Finds the body of the users table and asserts the amount of rows
       * excluding the header matches the expected.
       * @param {Number} expectedCount the expected count of rows
       */
      assertTableRowCount(expectedCount) {
        cy.get(Section1.elements.users.tblUsers)
          .find(Section1.elements.users.tblUsersRows)
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
        const condition = (exact ? 'eq' : 'be.gt')
        cy.get(Section1.elements.users.tblUsers)
          .find(Section1.elements.users.tblUsersRows)
          .find(`th:nth-child(${Section1.literals.USER_TABLE_COLUMN_MAP.ROLE})`)
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
        const dobYear = function (value) {
          return parseInt(value.split('/')[2])
        }

        /**
         * Parses the DOB from a given cell of the table and returns if the age
         * of the user is older than a given age.
         * @param {Number} index index of the element in the jquery array.
         * @param {Object} column the element containing the date of birth.
         */
        const isOlderThanAge = function (_, column) {
          return new Date().getFullYear() - dobYear(column.innerText) > age
        }

        const condition = (exact ? 'eq' : 'be.gt')
        cy.get(Section1.elements.users.tblUsersRows)
          .find(`th:nth-child(${Section1.literals.USER_TABLE_COLUMN_MAP.DOB})`)
          .filter((index, column) => { return isOlderThanAge(index, column) })
          .its('length')
          .should(condition, expectedCount)
      }
    },

    signUpForm: {

      /**
       * Asserts that the Sign-Up form is hidden.
       */
      assertFormIsHidden() {
        cy.get(Section1.elements.signUpForm.form)
          .should('be.hidden')
      },

      /**
       * Asserts that the Sign-Up form is visible.
       */
      assertFormIsVisible() {
        cy.get(Section1.elements.signUpForm.form)
          .should('be.visible')
      },

      /**
       * Asserts the value from the Name field.
       * @param {String} expected the value expected to be in the name field.
       */
      assertNameValue(expected) {
        cy.get(Section1.elements.signUpForm.txtFullname)
          .should('have.value', expected)
      },

      /**
       * Asserts the value from the Age field.
       * @param {String} expected the value expected to be in the age field.
       */
      assertAgeValue(expected) {
        cy.get(Section1.elements.signUpForm.txtAge)
          .should('have.value', expected)
      },

      /**
       * Asserts the value and the visible text from the Gender field.
       * @param {String} text the text of the option expected to be selected.
       * @param {String} value the value of the option expected to be selected.
       */
      assertGenderValue(text, value) {
        cy.get(Section1.elements.signUpForm.dpwGender)
          .find('option:selected')
          .should('have.value', value)
          .should('have.text', text)
      },

      /**
       * Asserts the value of the Nurse field.
       * @param {Boolean} expected wheter the field should be checked or not.
       */
      assertNurseValue(expected) {
        const assert = (expected ? 'be.checked' : 'not.to.be.checked')
        cy.get(Section1.elements.signUpForm.chkNurse)
          .should(assert)
      },

      /**
       * Sets up the stub function for asserting the text of the "Form
       * submitted" pop-up alert.
       */
      stubFormSubmittedAlertAssert() {
        cy.on('window:alert', (text) => {
          expect(text).to.equal('Form submitted!')
        })
      },

      /**
       * Sets the value of the "Name" field.
       * @param {String} value the name to be input in the Name field.
       */
      setName(value) {
        cy.get(Section1.elements.signUpForm.txtFullname)
          .type(value)
      },

      /**
       * Sets the value fo the "Age"field.
       * @param {Number} value the age to be input in the Age field.
       */
      setAge(value) {
        cy.get(Section1.elements.signUpForm.txtAge)
          .type(value)
      },

      /**
       * Selects an option in the Gender select field based on the value of
       * the option (not the visible text).
       * @param {String} value the value of the gender option to be selected.
       */
      selectGender(value) {
        cy.get(Section1.elements.signUpForm.dpwGender)
          .select(value)
      },

      /**
       * Checks or unchecks the Nurse? checkbox.
       * @param {Boolean} value wheter the checkbox has to be checked or not.
       */
      setNurse(value) {
        const checkbox = cy.get(Section1.elements.signUpForm.chkNurse)
        if (value) {
          checkbox.check()
          return
        }
        checkbox.uncheck()
      },

      /**
       * Clicks on the Submit button.
       */
      clickSubmit() {
        cy.get(Section1.elements.signUpForm.btnSubmit).click()
      },

      /**
       * Clicks on the Show Form button.
       */
      clickShowForm() {
        cy.get(Section1.elements.signUpForm.btnShowForm).click()
      },

      /**
       * Confirms the "Form Submitted" alert.
       */
      clickOkInAlert() {
        cy.on('window:confirm', () => true)
      }

    }

  }
}

module.exports = { Section1 }

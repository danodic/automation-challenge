const { Section1 } = require('../objects/section-1')
const faker = require('faker')

before(() => {
  Section1.actions.visit()
})

describe('Validate the Users table', () => {
  context('user table visibility', () => {
    it('is hidden when page loads', () => {
      Section1.actions.users.assertTableIsHidden()
    })

    it('is visible when clicking on show button', () => {
      Section1.actions.users.clickShowTable()
      Section1.actions.users.assertTableIsVisible()
    })
  })

  context('user table structure', () => {
    it('is 5 columns wide', () => {
      Section1.actions.users.assertTableColumnCount(5)
    })

    it('is 10 rows long', () => {
      Section1.actions.users.assertTableRowCount(10)
    })
  })

  context('user table data', () => {
    it('has at least 5 entries have the role "user"', () => {
      Section1.actions.users.assertUserCountWithRole('user', 5, false)
    })

    it('has exactly 3 people older than 60 years old', () => {
      Section1.actions.users.assertUserCountOlderThanAge(60, 3)
    })
  })
})

describe('Validate the Sign-Up Form', () => {

  context('sign-up form visibility', () => {

    it('is hidden when page loads', () => {
      Section1.actions.signUpForm.assertFormIsHidden()
    })

    it('is visible after clicking on "Show Form" button.', () => {
      Section1.actions.signUpForm.clickShowForm()
      Section1.actions.signUpForm.assertFormIsVisible()
    })

  })

  context('sign-up form structure', () => {
    it('has the "Name" field and it is a text input')

    it('has the "Age" field and it is a number input')

    it('has the "Gender" field and it is a select')

    it('has the "Nurse?" field and it is a check box input')

    it('has the "Submit" button')
  })

  context('fill up the sign-up form', () => {

    it('the "Name" field can be filled', () => {
      console.log(faker)
      const name = `${faker.name.firstName()} ${faker.name.lastName()}`
      Section1.actions.signUpForm.setName(name)
      Section1.actions.signUpForm.assertNameValue(name)
    })

    it('the "Age" field can be filled', () => {
      const age = 21 + Math.floor(Math.random() * 100)
      Section1.actions.signUpForm.setAge(age)
      Section1.actions.signUpForm.assertAgeValue(age)
    })

    it('the "Gender" field can be selected', () => {
      const gender = 'Female'
      const value = Section1.literals.SIGN_UP_FORM_GENDER_VALUES.FEMALE
      Section1.actions.signUpForm.selectGender(value)
      Section1.actions.signUpForm.assertGenderValue(gender, value)
    })

    it('the "Nurse?" field can be set', () => {
      Section1.actions.signUpForm.setNurse(true)
      Section1.actions.signUpForm.assertNurseValue(true)
    })

  })

  context('form submission', () => {
    it('the message "Form Submitted!" is displayed after submission', () => {
      Section1.actions.signUpForm.stubFormSubmittedAlertAssert()
      Section1.actions.signUpForm.clickSubmit()
      Section1.actions.signUpForm.clickOkInAlert()
    })
  })

})
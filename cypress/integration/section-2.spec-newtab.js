const { Section2 } = require('../objects/section-2')
const { Index } = require('../objects/index')

before(() => {
  Section2.actions.visit()
})

/**
 * For this test I have found three solutions:
 * - Spy the window:open event and check if it has been called.
 * - Stub the window:before:open event and check if the stub has been called.
 * - Remove the target=_blank attribute from the button and just pretend we
 *   have loaded a new tab.
 * I prefer the stub approach with the validation of the event arguments, but I
 * couldn't make the stub work properly (I could assert the stub was called but
 * the window still opens). The fact that the window opens and remains open is
 * not ideal so I have disconsidered this solution as it did not work as I
 * expected. For that reason, I have stick with validating the button attributes
 * and cleaning the target. Just for completeness I have added the assert for
 * the index page. For that reason, I have left this in a separate file as it
 * changes the page as a side-effect that can affect subsequent tests (it could
 * just be the last test in the file but I don't like to rely on the sequence
 * tests are going to run).
 */
describe('Browser API: Opening a new tab', () => {

  it('asserts the button attributes', () => {
    Section2.actions.newTab.assertBtnClickMeAttributes()
  })

  it('clean the target attribute and validate index is loaded', () => {
    Section2.actions.newTab.removeTargetFromBtnClickMe()
    Section2.actions.newTab.clickBtnClickMe()
    Index.actions.assertLoaded()
  })
})

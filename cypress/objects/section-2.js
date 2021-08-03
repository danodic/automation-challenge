var fs = require('fs')

const Section2 = {

  literals: {
    PAGE_URL: '/section-1',
    HEADER_TEXT: 'API Interactions',
    DOWNLOAD_LOGO_PATH: 'cypress/fixtures/downloads/javascript-logo.png',
    FIXTURE_LOGO_DOWNLOAD: 'downloads/javascript-logo.png',
    FIXTURE_LOGO_BASELINE: 'images/javascript-logo.png'
  },

  elements: {
    hdrSection2: 'h1:first',
    networkCall: {
      btnClickMe: '[data-test=network-call-button]'
    },
    newTab: {
      btnClickMe: '[data-test=new-tab-button]',
      btnClickMeAnchor: '[data-test=new-tab-button-anchor]',
    },
    download: {
      btnClickMe: '[data-test=file-download-button]'
    }
  },

  actions: {
    /**
     * Visits the section 2 page asserts we have hit the right page.
     */
    visit() {
      cy.visit('/section-2')
      cy.get(Section2.elements.hdrSection2)
        .should('have.text', Section2.literals.HEADER_TEXT)
    },

    networkCall: {

      /**
       * Sets up the network call interception for the /todos/* route so it can
       * be waited for later.
       */
      setupNetWorkCallInterception() {
        cy.intercept('GET', '/todos/*').as('longCall')
      },

      /**
       * Sets up the callback for the alert event in order to handle the
       * alert pop-up.
       */
      setupLongNetworkCallAlertAssert() {
        cy.on('window:alert', (text) => {
          expect(text).to.equal('Abnormally long network call!')
        })
      },

      /**
       * Clicks on the 'Click Me' button.
       */
      clickButton() {
        cy.get(Section2.elements.networkCall.btnClickMe).click()
      },

      /**
       * Waits for the long network call to return a response and asserts
       * its contents.
       * @param {Object} expected an object with the following attributes:
       *                          - status: expected status code
       *                          - id: expected value for field 'id'
       *                          - title: expected value for field 'title'
       */
      assertLongCall(expected) {
        cy.wait('@longCall').should((request) => {
          const response = request.response
          expect(response.statusCode).to.equal(expected.status)
          expect(response.body.id).to.equal(expected.id)
          expect(response.body.title).to.equal(expected.title)
        })
      }
    },

    newTab: {
      /**
       * Asserts the attributes of the button 'Click Me!'.
       */
      assertBtnClickMeAttributes() {
        cy.get(Section2.elements.newTab.btnClickMeAnchor)
          .should('have.attr', 'href', '/')
          .should('have.attr', 'target', '_blank')
      },

      /**
       * Removes the target attribute from the 'Click Me!' button.
       */
      removeTargetFromBtnClickMe() {
        cy.get(Section2.elements.newTab.btnClickMeAnchor)
          .invoke('removeAttr', 'target')
      },

      /**
       * Clicks on the 'Click Me!' button.
       */
      clickBtnClickMe() {
        cy.get(Section2.elements.newTab.btnClickMeAnchor)
          .click()
      }
    },

    download: {

      /**
       * Should delete the downloaded image from previous iterations it exists.
       * I could not get the fs module to work properly, so this is commented
       * out as of now.
       */
      cleanExistingLogo() {
        //fs.rm(Section2.literals.DOWNLOAD_LOGO_PATH)
      },

      /**
       * Downloads the logo using the url found in the href attribute from the
       * button asserts it has been saved.
       */
      downloadLogo() {
        cy.get(Section2.elements.download.btnClickMe).then((e) => {
          const url = `${Cypress.config().baseUrl}${e.attr('href')}`
          cy.downloadFile(url, '', Section2.literals.DOWNLOAD_LOGO_PATH)
        })
        cy.readFile(Section2.literals.DOWNLOAD_LOGO_PATH).should('exist')
      },

      /**
       * Asserts that the logo that has been downloaded from the page has the
       * same contents of the baseline fixture file.
       */
      assertLogo() {
        cy.fixture(Section2.literals.FIXTURE_LOGO_BASELINE).then((expected) => {
          cy.fixture(Section2.literals.FIXTURE_LOGO_DOWNLOAD).then((downloaded) => {
            expect(expected).to.be.deep.equal(downloaded)
          })
        })
      }
    }
  }
}

module.exports = { Section2 }

const { Section2 } = require('../objects/section-2')
const { Index } = require('../objects/index')

before(() => {
  Section2.actions.visit()
})

/**
 * For that test I have used the intercept and fixture features to check when
 * the call is executed and wait for it to finish so I can run the validations.
 * After that I have seen there are two approaches to assert the JSON:
 *  - Field-by-field using the should() function, or;
 *  - Field-by-field using the expect() function.
 * I prefered to use the latter as it seem less verbose. I would usually prefer
 * a cleaner approach like dictionary comparisons I use in Python, but I'm
 * not sure if there is anything similar in JS.
 */
describe('Http: Waiting for network calls', () => {

  before(() => {
    Section2.actions.networkCall.setupNetWorkCallInterception()
    Section2.actions.networkCall.setupLongNetworkCallAlertAssert()
  })

  it('waits for long network call', () => {
    Section2.actions.networkCall.clickButton()
    Section2.actions.networkCall.assertLongCall({
      status: 200,
      id: 1,
      title: 'Abnormally long network call!'})
  })
})

/**
 * For this one I have found a library that takes care of the download. If I
 * did not had the extension, the natural solution would be to capture the
 * URL of the button and make an HTTP request to get the contents and save it
 * to the downloads folder. For some reason node is giving me a hard time with
 * the 'fs' module and nothing that I try to do with it works properly (I get a
 * feedback that readFile() or rm() is not a function for example). For that
 * reason, the code for the pre-condition that should delete the downloaded
 * image is commented (and I'm not sure if I have called it properly).
 * 
 * As a workaround, I have used the fixtures to read the data and compare the
 * base64 string. For other file types I would probably use a checksum, but the
 * base64 has the same effect in this case and was more convinient.
 */
 describe('Browser API: Downloading a file', () => {
  before(() => {
    Section2.actions.download.cleanExistingLogo()
  })

  it('downloads the file', () => {
    Section2.actions.download.downloadLogo()
  })

  it('asserts the checksum of the file', () => {
    Section2.actions.download.assertLogo()
  })

})

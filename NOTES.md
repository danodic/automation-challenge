# Notes
I'm adding some notes in this file as I go over the challenge to document some
of my decisions and thoughts along the way. Please be aware that I have also
left some comments in the code to explain some of the technical decisions I have
taken for some specific situations.

## Asserts in Application Action Objects
As far as I could understand, we are not using PageObjects design pattern but
Application Actions instead. With that in mind, I have been reading through the
years that asserts should always be in the root of the test (i.e.: the test
functon) so that it is clear what are the validation points. It is weird for me
to see asserts _inside_ the application actions objects. Still, since the
boilerplate code shows an example where the assert in inside the actions object,
I just followed the example. I would maybe return the yielded objects and
execute the `.should()` asserts in the test.

To make things clear, I made sure that all assert method names begin with
`assert` to make it clean this is an assert.

## Segragating scope of attributes inside Application Actions objects
As I started to move on with the challenges I have noticed the pages have
elements with different scopes. As an example, in the same page we have the
_Users_ table and the _Sign Up_ form. Using PageObjects I would usually try to
create sub-classes for dealing with specific sections of the page to keep the
code cleaner -- this is specifically useful when dealing with component-based
UIs, like SPAs written in React, Vue, etc. In this case, I have just added
another object inside the `actions` and `elements`. While it helps on
segragating the scope of the elements and actions inside of the object, it adds
more verbosity to the actions when acessing those attributes. I'm not sure if
this is a very good solution because some rows were hard to fit withing the
usual 80-column limit. :D

## The User table has `th` where it should have `td`
I would have logged a defect for this (see `ISSUES.md`) but I disconsidered that
since the `README.md` states that the tests should be green. The tests are green
and I have used the `th` to select the table cells, but I still believe it
should be `td`.

## The User table validation would usually be done against an API
Usually the User table would be fed by an API call and the result of this call
could be intercepted to be used as input in the validation of the table data.
I seriously though about mocking that in the tests but I did not wanted to
overdo it more than what I have already done.

## Use of random data
I have used some random data in the Sign-Up form as this usually help to find
unexpected edge-cases that would not be found otherwise. For that reason the
`Faker` module has been added to the project.

## Additional Tests
In a real-world scenario more tests should have been adeed:
- Validate form structure
- Validate limit values for form fields
- Validate invalid input at form fields
- Validate persistence of data (if any) in the backend for Sign-Up form
- Validate API for Users table
And probably some more that would be bound to the business rule.

## The `fs` module
I don't have enough experience with node to figure out this one within my time
constraints, but the `fs` module simply did not work. I'm not sure why, I have
tried deleting the `node_modules` folder and installing everything again and
it still did not work. Due to that, there is a test that is not cleaning up
the downloaded data before it runs. I acknowledge this is not ideal but I would
need to dive deeper into node to understand what is happening.

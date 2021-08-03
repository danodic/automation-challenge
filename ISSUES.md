# Issues/Defects
This document describes some of the problems that have been found in the
application while testing it.

_(Keep in mind that I'm playing along here and pretending that I am testing a
real application. It is clear to me none of this submits data and/or those
issues have been left on purpose for the purpose of the challenge. I'm
doing that only for Section 1 though. :D)_

## 1. Users table rows use `th` instead of `td`
### Expected
As per [W3C standards](https://www.w3.org/TR/html4/struct/tables.html#h-11.2.6) table headers must use `th` for header cells and
`td` for regular cells due to acessibility reasons.

### Actual
The table displayed under **DOM: Tables** at **Section 1** uses `th` for all
rows of the table.

### Url
Has been observed at `/section1` under **DOM: Tables**

## 2. Name field in Sign-Up form has no size limit
### Expected
The **Name** field under the *Sign-Up* form should have a maximum length so
that:
  - A malicious user cannot add an arbitrary amount of data;
  - The text is trimmed without the user having a feedback about it.

### Actual
The **Name** field has no maximium length. I was able to paste more than 200
characters on it and submit the form.

### Url
Has been observed at `/section1` under **DOM: Forms**

## 3. Age field in Sign-Up form accepts negative and zero values
### Expected
The **Age** field under the *Sign-Up* form should not accept negative or zero
values and should probably limit the age of the user to a minimum acceptable
value.

### Actual
The **Age** field accepts negative and zero values. I am able to submit the form
after inputing a wrong value.

### Url
Has been observed at `/section1` under **DOM: Forms**

## 4. Form can be submitted with Gender field unselected
### Expected
The application must now allow the *Sign-Up* form to be submitted when the
**Gender** field has not been changed to a valid option.

### Action
The application allows the form to be submitted with the **Gender** field in its
default state and does not throw an error message when this is done.

### Url
Has been observed at `/section1` under **DOM: Forms**

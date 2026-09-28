const { expect } = require('@playwright/test');

const URLS = {
    CHECKBOX: 'https://the-internet.herokuapp.com/checkboxes',
    DROPDOWN: 'https://the-internet.herokuapp.com/dropdown',
    EXPANDTESTING_DROPDOWN: 'https://practice.expandtesting.com/dropdown',
    GITHUB: 'https://github.com',
    GOOGLE: 'https://www.google.com',
    PLAYWRIGHT: 'https://playwright.dev',
    DEMOQA_CHECKBOX: 'https://demoqa.com/checkbox',
    REQRESfirst_API:'https://reqres.in/api/users/2',
    REQRESsecond_API: 'https://reqres.in/api/users'
};

module.exports = {
    URLS
};
/*!
 * Copyright (c) 2015-2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

'use strict';

const LoginHomePage = require('../../page-objects/shared/login-home-page');
const OktaSignInPage = require('../../page-objects/okta-signin-page');
const AuthenticatedHomePage = require('../../page-objects/shared/authenticated-home-page');
const ProfilePage = require('../../page-objects/shared/profile-page');
const MessagesPage = require('../../page-objects/messages-page');
const url = require('url');

describe('Okta Hosted Login Flow', () => {
  const loginHomePage = new LoginHomePage();
  const oktaSignInPage = new OktaSignInPage();
  const authenticatedHomePage = new AuthenticatedHomePage();
  const profile = new ProfilePage();
  const messagesPage = new MessagesPage();
  const appRoot = `http://localhost:${browser.params.appPort}`;

  beforeEach(() => {
    browser.ignoreSynchronization = true;
  });

  // it('can access internet', async() => {
  //   browser.get("https://lambdatest.com");
  //   element(by.css('p.home-btn > a.home-cta')).click();
  //   expect(browser.getTitle()).toEqual('Sign up for free | Cross Browser Testing Tool | LambdaTest - LambdaTest');
  // });

  it('can login with Okta as the IDP', async () => {
    browser.get(appRoot);
    console.log(`Loading home page ${appRoot}...`);
    loginHomePage.waitForPageLoad();
    console.log(`Loaded home page ${appRoot}...`);

    console.log('Clicking login button...');
    loginHomePage.clickLoginButton();
    console.log('Clicked login button...');
    oktaSignInPage.waitForPageLoad();
    console.log('Loaded login page...');

    // Verify that current domain has changed to okta-hosted login page
    const urlProperties = url.parse(process.env.ISSUER);
    console.log(urlProperties.host);

    expect(browser.getCurrentUrl()).toContain(urlProperties.host);
    expect(browser.getCurrentUrl()).not.toContain(appRoot);

    console.log('Validated the current url...');

    console.log(browser.params.login.username);
    console.log(browser.params.login.password);
    //await oktaSignInPage.login(browser.params.login.username, browser.params.login.password);
    oktaSignInPage.login(browser.params.login.username, browser.params.login.password);
    console.log('Clicking sign in button...');
    oktaSignInPage.clickSignInButton();
    console.log('Clicked sign in button...');
    console.log('waiting for authenticated page...')
    authenticatedHomePage.waitForPageLoad();
  });

  // xit('can access user profile', async () => {
  //   authenticatedHomePage.viewProfile();
  //   profile.waitForPageLoad();
  //   expect(profile.getEmailClaim()).toBe(browser.params.login.email);
  // });

  // xit('can access resource server messages after login', async () => {
  //   // If it's not implicit flow, don't test messages resource server
  //   if (process.env.TEST_TYPE !== 'implicit') {
  //     return;
  //   }
  //   authenticatedHomePage.viewMessages();
  //   messagesPage.waitForPageLoad();
  //   expect(messagesPage.getMessage()).toBeTruthy();
  // });

  // xit('can log the user out', async () => {
  //   browser.get(appRoot);
  //   console.log('Waiting for home page...');
  //   authenticatedHomePage.waitForPageLoad();
  //   console.log('Loaded authenticated home page...');
  //   authenticatedHomePage.logout();
  //   console.log('After logout click...');
  //   loginHomePage.waitForPageLoad();
  // });
});

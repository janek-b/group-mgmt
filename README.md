# _Group Mgmt_

#### _A rock climbing community management system, 05-12-2017_

####  By _**Janek Brandt**_

## Description

This project is a web application that allows members of a community to connect with each other and share information about upcoming events.


## Planning

#### Configuration/Dependencies
  * ##### _Setup/Installation_
    * This application uses firebase for it's database.
    * Set up a new project in firebase and click on _**Add Firebase to your web app**_ to get your firebase config.
    * Create a new file `src/app/api-keys.ts` and place your firebase config into it. The file should look like this.
    ```
    export var masterFirebaseConfig = {
        apiKey: "xxxx",
        authDomain: "xxxx.firebaseapp.com",
        databaseURL: "https://xxxx.firebaseio.com",
        storageBucket: "xxxx.appspot.com",
        messagingSenderId: "xxxx"
      };
    ```
    * In the firebase console click on the _**Database**_ section and then on the _**RULES**_ tab. Set the rules to the following and then click _**Publish**_.
    ```
      {
        "rules": {
          ".read": true,
          ".write": true
        }
      }
    ```
    * In the firebase console click on the _**Authentication**_ section and then on the _**SIGN-IN METHOD**_ tab. Enable the providers _**Email/Password**_ and _**Google**_.
    * From the project root folder run the following commands to install the project dependencies and run app.

    `npm install`

    `ng serve`

    * Navigate to `http://localhost:4200/`

  * ##### _Packages Dependencies_
    * `angularfire2`
    * `firebase`
    * `angular2-materialize`
    * `materialize-css`



#### Specs
  * A user is able to:
    * view all members.
    * view all members with a specific role/rank.
    * view details of an individual member.
    * create an account to become a member.
    * edit their profile information.
    * delete their account.
    * view a list of events.
    * view details of an event.
  * A user with a role of Admin is able to:
    * add a new member.
    * edit a members profile.
    * delete a members account.
    * add a new event.
    * edit an events details.
    * delete an event.


#### Integration
  * Component for welcome page.
  * Component for about page.
  * Component for edit member form.
  * Component for member list.
  * Component for member details.
  * Pipe to filter member list by their role/rank.


#### UX/UI
  * Use [Materialize](http://materializecss.com/) with the angular package [angular2-materialize](https://www.npmjs.com/package/angular2-materialize) to implement material design.



#### Polish
  * Make site responsive on desktop and mobile.
  * Implement Message Board.


#### To Do

- [x] Add README
- [x] Install and import dependencies
- [x] Create router and add navbar to app component
- [x] Add Welcome page
- [x] Add About page
- [x] Define user roles
- [x] Implement user creation on first sign in
- [x] Implement user deletion by admin
- [x] Member-list component
- [x] Member-detail component
- [x] Member-edit component
- [x] Event-list component
- [x] Event-detail component
- [x] Event-new component

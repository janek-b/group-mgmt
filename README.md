# _Hobby Horse_

#### _A Hobby Horse enthusiast club management system, 05-12-2017_

####  By _**Janek Brandt**_

## Description

This project is a web application that allows members of a club to connect with each other and share information about upcoming events.


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
    * From the project root folder run the following commands to install the project dependencies and run app.

    `npm install`

    `ng serve`

    * Navigate to `http://localhost:4200/`

  * ##### _Packages Dependencies_
    * `angularfire2`
    * `firebase`
    * `@angular-mdl/core`



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
  * Use [Material Design Lite](https://getmdl.io/index.html) with the angular package [angular2-mdl](https://github.com/mseemann/angular2-mdl) to implement material design.



#### Polish
  * Make site responsive on desktop and mobile.
  * Implement Message Board.


#### To Do

- [x] Add README
- [x] Install and import dependencies
- [x] Create router and add navbar to app component
- [ ] Add Welcome page
- [ ] Add About page
- [ ] Define user roles
- [ ] Implement user creation on first sign in
- [ ] Implement user creation by admin
- [ ] Member-list component
- [ ] Member-detail component
- [ ] Member-edit component
- [ ] Event-list component
- [ ] Event-detail component
- [ ] Event-new component

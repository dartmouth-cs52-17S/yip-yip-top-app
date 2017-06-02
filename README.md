# Yip Yip (Top App)

**Yip Yip** is a social app that allows users to create and view discussion threads within a 5-mile radius. Posts can be voted and commented on. Users can save a popular location as a “herd” to read  posts from the saved spot no matter where they travel to. Users can also search and see which hashtags are trending. Finally, we have a profile page so users can keep track of their activity. Importantly, we require that users signup with a phone number so there’s accountability when people post inappropriate content. Harassment and hate speech of any kind will not be tolerated. We are currently only on iOS, but hope to expand to Android in the coming weeks. If you want to be notified of our releases, please fill out [this form](https://yipwithme.typeform.com/to/ZzKVCb).

You can view all of our mockups [here](https://dartmouth-cs52-17s.github.io/yip-yip-top-app/). Here's one:

![](screenshots/HerdFeed.png)

<!--

We once had gradients... but React Native does not support them so we had to do a redesign. 🤓

![](screenshots/main.png)

![](screenshots/userPersonas.png) -->

## Architecture

We have all of our code in a `src` directory. Within it we have a `screens` folder with components that are essentially containers, a `components` folder of components that are used by the files in `screens`, and a `login` folder which is the three screens for logging in. In the top-level of `src`, we have our api calls in `api.js` and a list of banned words in `banned.js`.

We developed the app using React Native and several popular components like `react-native-action-button` and `react-native-keyboard-spacer` (all our dependencies can be seen in `packages.json`).

For authentication, we are using Auth0 with Twilio for SMS verification.

## Setup

First, follow the [React Native getting started page instructions](https://facebook.github.io/react-native/docs/getting-started.html) to install all the required dependencies.

```
git clone https://github.com/dartmouth-cs52-17S/yip-yip-top-app.git
cd yip-yip-top-app
yarn install
react-native link
react-native run-ios
```

If you run into an error after running `react-native run-ios`, close down the simulator and terminal process, run `react-native upgrade`, and return `y` to all prompts. Then re-run `react-native link` followed by `react-native run-ios`.

If you want to run the simulator on a specific iPhone model you can run a similar command: `react-native run-ios --simulator="iPhone 7 Plus"`

Reloading:

Once the iOS simulator is running, you can open the developer tools menu by pressing `cmd+ctrl+Z` or going to `Hardware > Shake Gesture`. From this screen, you can enable hot reloading. You can also just reload the simulator with `cmd+r`.

## Deployment

We are currently deploying our app using TestFlight but hope to release it on the App store. In order to deploy via TestFlight, we need to bundle our app. We are following the bundling instructions per [this article](https://medium.com/react-native-development/deploying-a-react-native-app-for-ios-pt-1-a79dfd15acb8):

`react-native bundle --entry-file index.ios.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios`

## Authors

Armin Mahban, Byrne Hollander, Ellis Guo, Jenny Seong, Ying Liu

## Acknowledgments

Tim Tregubov and Irene Feng

# Feature Spec

## Front End Features

### Realtime feed

- Based on location, includes all posts from within a certain radius
- Can join in channels/communities to narrow down your feed

### Posts

- Approx. 280 chars
- Potentially include titles, tags, images
- Can be voted on
- Can be commented on, comments also have votes

### Other Front End details

- All posts, comments, and votes are anonymous, no identifying information or ability to link a user to another comment or post
- Potential: Incorporate AI-based content moderation
- Every user can have “karma” points/scores as a way of seeing how much they use the app and how much people like their content, but will not be shared with others
- Can set a homebase (“tribe”) that is linked to your account, can view/post to it from anywhere
- Potentially filter feed by tags/topic (eg. #events, #food, #memes)

## Back End Features

- Store users, settings, saved locations
- Store feeds, posts, comments, all information, but clear all data regularly based on how many posts a location gets/a certain time constraint
- fetching data example:
    ![fetch](screenshots/fetchingData.gif)

### Login/Signup

- User enters their phone number, enters a 6-digit code to sign up
- Once signed in, navigated to the main feed

### Main View

- Contains all of the posts within the user’s area in a long listview
- Tabs at the top of the page allow users to sort by votes, posting time, etc.
- Settings button on top right, brings user to settings page
- Bottom tabs are the app’s main navigation method, can toggle between different feeds (current location vs. your “tribe”) and open a search bar

### Search View

- Search bar at the top
- Trending topics and suggestions below the bar (eg. user can click the #food topic to filter the main view by all posts tagged with #food)

### Post

- Rectangular card containing content of the post with voting buttons on the right-hand side
- Bottom of the card has tags, location posted from, and a timestamp
- Tapping the post will bring you to its detail view

### Detail view

- Same information/layout as the post from the main feed, but with a comments section below it
- Comment bar at the very top with existing comments below it
- Heart on the top right of the page allowing you to save a post for later viewing

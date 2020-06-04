# Trackbasket

+ **Front End**: [Cody Smith](https://github.com/monstaro), [Ed Stoner](https://github.com/edlsto)
+ **Back End** [Maria Ronauli](https://github.com/mronauli) [Alexis Dumortier](https://github.com/adumortier)

## About

As the threat of COVID-19 continues to loom, it's not safe for some people to leave their house, even to buy essentials. Trackbasket allows this at-risk population to create grocery lists, and connects them with volunteers who shop for and deliver their items.

The tech stack for this project included React Native, React Navigation, Expo, React Native Testing Library and Jest on the front end and Python and Flask on the back end. The app consumes the Kroger API.

In the app, an at-risk user can:
• Register
• Shop for a list
• Submit the list
• Edit the list
• See the updated status of the list

A volunteer can:
• Register
• See all pending lists, sorted by distance, number of items or age
• Adopt a list
• Change the status of a list
• Shop the list
• Un-adopt the list, if needed.

This GIF shows the at-risk user path, including registration, editing registration info, searching for items, and putting items in the cart

![vbzzGYtMUq](https://user-images.githubusercontent.com/4350550/83814951-7fe39c00-a67c-11ea-9c76-34716eaa330b.gif)

This GIF shows an at-risk user submitting a cart. It also shows the volunteer path, including searching and sorting volunteer opportunities, choosing a list, shopping a list, changing its status and abandoning a task.

![Fq4vHJEapy](https://user-images.githubusercontent.com/4350550/83815530-a0f8bc80-a67d-11ea-9929-0c6490f93b93.gif)



## How to use

1. if you don't have Expo installed, follow the setup instructions [Here](https://reactnative.dev/docs/0.60/getting-started)
2. run `git clone https://github.com/track-basket/trackbasket_FE.git`
3. run `npm install`
4. run `expo start`


# TODO: Fix FollowButton Logic and Subscriber Count Update

- [x] Update FollowButton.jsx: Add check to hide button for self-subscription, fix onChange logic to pass new subscribed state.
- [x] Update Profile.jsx: Add onChange handler to update subscriber count, pass onChange to ChannelHeader, set isSubscribedInitially to false.
- [x] Update ChannelHeader.jsx: Accept and pass onChange prop to FollowButton.
- [x] Test the changes to ensure no 401 error and count updates correctly.

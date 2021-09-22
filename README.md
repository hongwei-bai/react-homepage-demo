#React homepage demo


## Deployment Steps

1. >npm run build

1. rz (in dir: ../usr/share/nginx/html/)

1. tar -xvf build.tar

## About React homepage demo

This is a frontend project for my personal homepage.

It acts as a portal for everyday use for myself, my family as well as my friends.

It is a modularised homepage contains the following modules:(Some of them are still under construction)

- COVID-19 (brief information on card only so far)

- Blog (V1.0)

- Photo Gallery (V1.0)

- Knowledge graph(For my technical blogs) (Card entry only)

- E-Commerce Catalogues (Card entry only)

- Exercise Upload (V0.1 Draft only)

- Resume (Card entry only)

- To-Do (Card entry only)

- Administration (Card entry only)

- System logs (Card entry only)

Each module has a card on the homepage if the specific users are grant those access.

Users can only see the cards they being granted access.

It support users as well as guest. 

For guest system, administrator may generate a passcode. It has an expired date and can be granted specific access like a normal user.

Anyone with the passcode(we call it guest code) may access the content.

The website support English and Simplified Chinese. The language can be varied for different users.

The website is responsive. It automatically fit it different clients and dimensions.


#### Screenshots

###### Responsive for web/mobile:
<img src="https://raw.githubusercontent.com/hongwei-bai/react-homepage-demo/master/screenshots/Screenshot_web.jpg" width="692" height="600" /> <img src="https://raw.githubusercontent.com/hongwei-bai/react-homepage-demo/master/screenshots/Screenshot_mobile.jpg" width="300" height="600" />

###### Multiple language support:
<img src="https://raw.githubusercontent.com/hongwei-bai/react-homepage-demo/master/screenshots/Screenshot_en.jpg" width="600" height="600" /> <img src="https://raw.githubusercontent.com/hongwei-bai/react-homepage-demo/master/screenshots/Screenshot_zh-rCN.jpg" width="600" height="600" />

###### User/Guest login scenarios:
<img src="https://raw.githubusercontent.com/hongwei-bai/react-homepage-demo/master/screenshots/Screenshot_userlogin.jpg" width="800" height="600" /> <img src="https://raw.githubusercontent.com/hongwei-bai/react-homepage-demo/master/screenshots/Screenshot_guestlogin.jpg" width="800" height="600" />

###### Blog
<img src="https://raw.githubusercontent.com/hongwei-bai/react-homepage-demo/master/screenshots/Screenshot_blog.jpg" width="600" height="600" /> <img src="https://raw.githubusercontent.com/hongwei-bai/react-homepage-demo/master/screenshots/Screenshot_blog_entry.jpg" width="600" height="600" /> <img src="https://raw.githubusercontent.com/hongwei-bai/react-homepage-demo/master/screenshots/Screenshot_blog_edit.jpg" width="600" height="600" />

###### Photo gallery
<img src="https://raw.githubusercontent.com/hongwei-bai/react-homepage-demo/master/screenshots/Screenshot_gallery.jpg" width="600" height="600" /> <img src="https://raw.githubusercontent.com/hongwei-bai/react-homepage-demo/master/screenshots/Screenshot_gallery_photos.jpg" width="600" height="600" />


#### Dependent backend projects

Authentication service(backend) repository:
[hongwei-bai/application-service-authentication](https://github.com/hongwei-bai/application-service-authentication)

For card ``COVID-19``:
[hongwei-bai/covid-application-service](https://github.com/hongwei-bai/covid-application-service)

For card ``Blog``:
[hongwei-bai/application-service-blog](https://github.com/hongwei-bai/application-service-blog)

For card ``Exercise upload`` and card ``Photo gallery``:
[hongwei-bai/application-file-server](https://github.com/hongwei-bai/application-file-server)

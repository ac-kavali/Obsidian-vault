You can find the full path here in [w3school](https://www.w3schools.com/html/html_basic.asp) and [freecodecamp](https://www.freecodecamp.org/learn/responsive-web-design-v9/workshop-curriculum-outline/step-2) courses
## Web pages designe
In a simple multi-page website, every page has its own HTML file.
example
```
website/
│
├── index.html      (home page)
├── login.html
├── settings.html
├── profile.html
├── explore.html
│
├── css/
│   └── style.css
│
└── js/
    └── script.js
```
Like what you can see, each page have its own file.
**But `index.html` is the special one**, WE servers automatically load `index.html` as the default page.

Example: 
if someone visit `https://example.com` The server returns:
`https://example.com/index.html`
this behavior comes from web server software like <u>Apache HTTP Server</u> <u>Nginx</u>.


---
## Nav 
The `<nav>` element is a sementic tag means "navigation". it is used to contain links that help users navigate through the website like top menu header of the page ...
```html
<nav>
	<a href="/">Home</a> |
	<a href="about">About</a> |
	<a href="contact">Contact</a>
</nav>
```


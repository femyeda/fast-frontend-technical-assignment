# Fast frontend techincal assignment

## Summary Questions:
1. What were the most difficult tasks? 

    The most diffcults tasks were getting used to the oddness of the api. The fields 
    were capitalized so I lost of bit of time debugging those. (TypeScript would have fixed that =]). Other than that dealing with consistant image sizes and what if there wasn't an image available. 

2. Did you learn anything new while completing this assignment?

    I learned two things actually. You can use a js Map `new Map()` as a state value in React. Didn't use it
    because I thought it was overkill and assumed it was ineffienct as state operations prefer functional data manipulation. Copying a map over and over just so I can do set, remove easier didn't seem worth it. 

    Also learned about webkit only css property `-webkit-backdrop-filter: blur(10px);` to create those very nice blurred backgrounds that Apple uses. Didn't use it because no support else where. Found this https://www.npmjs.com/package/translucent but wasn't worth the trouble.


3. What did you not have time to add? What work took the up majority of your time?

    Most of the time went to styling. I think everything is added but I'd put more into the styles, and clean up the classes. To save time everything is in a single component... not exactly React best practive.


4. How could the application be improved?

    In terms of ecommerce, saving the user's cart to localStorage has become expected. Folks can leave and return back with their cart in tact. I'd also add some blurred loading images while images actually loaded. Maybe a list of saved searches, checkout history. Don't exactly like how the titles of the images extend multiple lines at times (I'd need a typography nerd to help me out here.) Also I'd add click outside handlers to the slide out panel, and the confirmation buttons.
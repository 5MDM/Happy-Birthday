;(function() {
  "use strict";
  
  const body = document.body;
  console.assert(body != undefined, 
    "Couldn't find a HTML body. Did you put the "
  + '"defer" attribute?'
  );
  
  fetch("/templates/header.html")
  .then(e => e.text())
  .then(html => {
    body.insertAdjacentHTML("afterbegin", html);
    main();
  });
  
  function main() {
    const texts = [
      "did you know today was andy's birthday?",
      "top news: andy's birthday will begin tomorrow at "
    + "12:00pm",
      "all product prices around the world now have "
    + "a 0% sale in celebration of andy's birthday",
      "today is andy's birthday",
      "tomorrow is andy' birthday",
      "yesterday is andy's birthday",
      "legends say andy is 10e-1 years old...",
      "legends say andy is older than the universe "
    + "itself",
      "top 10 ways to celebrate andy's birthday "
    + "(no clickbait)",
      "top 0 ways to celebrate andy's birthday "
    + "(clickbait)",
      "andy gives andycraft a rating of 11/10",
      "andy gives andycraft a rating of -1/10",
      "celebrating andy's birthday gone wrong!",
      "filler text",
      "undefined",
      "null",
      "nan",
      "none",
      "error: \"undefined\" is not an object",
      "everyone celebrates andy's birthday by "
    + "increasing taxes on gaming mouses (mice) "
    + "by 99999%",
      "andy co. stocks went up by 9999% because "
    + "it was andy's birthday",
      "celebrate andy's birthday immediately"
    ];
    
    const url = 
    document.querySelector("#header > #txt-c > #txt");
    
    function rand(max) {
      return Math.floor(Math.random() * (max - 1));
    }
    
    console.assert(url != undefined,
      "Couldn't find navbar text"
    );
    
    var lastRand = -1;
    
    function loop() {
      var n = rand(texts.length);
      if(lastRand == n) {
        if(n == texts.length) {
          n = 0;
        } else {
          n++;
        }
      }
      
      const txt = texts[n];
      
      lastRand = n;
      url.innerText = txt;
      
      setTimeout(loop, 1500);
    }
    
    setTimeout(loop, 800);
  }
})();
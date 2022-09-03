;(function() {
  "use strict";
  
  const texts = [
    "did you know today was andy's birthday?",
    "top news: andy's birthday will begin tomorrow at "
  + "12:00pm",
    "all product prices around the world now have "
  + "a 0% sale in celebration of andy's birthday",
    "today is andy's birthday",
    "tomorrow is andy's birthday",
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
    "celebrate andy's birthday immediately",
    "prepare to use the obama phone on "
  + "the first day of school!!! (or else...)"
  ];
  
  (async function() {
    const {$, newEl} = 
    await import("/scripts/modules/mcreate-el.js");
    const {randFromArr} =
    await import("/scripts/modules/utils.js");
    
    const body = document.body;
    console.assert(body != undefined, 
      "Couldn't find a HTML body. Did you put the "
    + '"defer" attribute?'
    );
    
    fetch("/templates/header.html")
    .then(e => e.text())
    .then(txt => {
      $("#header").innerHTML = txt;
      $("#header").parentNode.insertBefore(
        newEl("div", {
          attrs: {style: "height: var(--header-h)"}
        }), 
        $("#header").nextSibling
      );
      setTimeout(loop, 800);
    });
    
    function loop() {
      $("#header #txt-c > #txt")
      .innerText = randFromArr(texts);
      
      setTimeout(loop, 1500);
    }
  })();
})();
/**
 * 
 */

require.config({"paths": {
    "trip": "lib/triploader"
}});

require(["trip!lib/Header", "trip!lib/Button"], function(Header, Button) {
    let h = new Header()
        .set("title", "Loaded.")
        .on("mouseover", console.log)
        .append();
    let b = new Button()
        .set("label", "My Button")
        .on("click", console.log)
        .append();
});

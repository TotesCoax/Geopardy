Initial Setup:
Google sheets link for template: https://docs.google.com/spreadsheets/d/1akA3dh-xSgW_MzPhPTawwbQ8DHnKmwIfcdInbMgzn8I/edit?usp=sharing
You will have to save a copy of this workbook to your own google drive or local machine.
The first tab is a structure template you may ignore it (it is there just for poesterity), then there are the round 1 and 2 questions and answers.
Fill in round 1 and 2 questions and answers. You will only need to fill in the first item for each category and it will populate for the rest.
The answer sheets will format to mimic the board. The highlights are just the ones I selected for the daily double. I also used to answers to keep track of points when I forgot the amount they selected.
Export each round sheet as a CSV of that sheet only, this will generate a file for the round that you can import into the board.
The answer sheets you can print as a PDF and it'll print out an answer key for you.

Currently this is all run as a local web page, so you just need to make sure everything is in the same folder and open the index.html in your browser.
Note: I only tested the CSS in Firefox and Edge, so things might be slightly off in other browsers.
Another note: This currently does not save the scores locally, so if the page is refreshed or otherwise crashes you'll lose the scores. But, for all normal game operations the page should not refresh.

Controls:

Clicking on the Geopardy Banner opens up an admin panel for changing the names, adding/removing players (max of 8 currently), and clearning the answered status (needed to reset the board each new round).

Double-clicking on each point value will display the question fullscreen
Double-clicking again will remove it from fullscreen and mark it as answered so it no longer displays the money value.
Right clicking on an answered question will toggle the answered status and the money value.

For assigning points, you can click into the point value and either: enter a new amount directly or use the up and down arrows to increment by 100.
You can also use 1-8 keys to increase, shift+1-8 will decrease in increments of 100.

Final Geopardy:
load file first, then click toggle and it will hide main board and just show category.
double click on the category and it will switch to the clue.
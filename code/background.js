browser.menus.create({
  id: "tzolkin",
  title: "Open Kin of the selected date",
  contexts: ["selection"]
});

browser.menus.onClicked.addListener(async function (info, tab) {
  if (info.menuItemId == "tzolkin") {
    if (info.selectionText) {
      let text = info.selectionText;

      let day = "";
      let month = "";
      let year = "";

      let numbers = text.match(/\d+/g).slice(0,2);

      numbers = numbers.map(element => parseInt(element, 10));
      numbers.sort((a, b) => a - b);
      day = numbers[0];
      year = numbers[1];

      console.log(text);

      words = text.replaceAll("de ", "").replaceAll(",","")
                  .replaceAll("\t", " ").replaceAll("\n", " ")
                  .split(" ");

      words = words.map(element => element.toLowerCase());

      console.log(words);
      var monthsSpa = Array.from({length: 12}, (_, i) => new Date(0, i)
                           .toLocaleDateString('es', { month: 'long' })
                           .toLowerCase());

      var monthsEng = Array.from({length: 12}, (_, i) => new Date(0, i)
                           .toLocaleDateString('en', { month: 'long' })
                           .toLowerCase());

      for (const w of words) {
        if (monthsSpa.includes(w)) {
          month = monthsSpa.indexOf(w) + 1;
          break;
        }
        else if (monthsEng.includes(w)){
          month = monthsEng.indexOf(w) + 1;
          break;
        }
      }

      while (year < 1911) year += 52;

      if(day && month && year) {
        let url = `https://www.13lunas.net/firmaGalacticaCompleta.html?`+
                  `nombre=Hoy&dia=${day}&mes=${month}&ano=${year}`;
        let newTab = await browser.tabs.create({ 'active': true,
                                                 'url': url,
                                                 'index': tab.index+1 });
      } else {
        console.log("Something went wrong");
      }
    }
  }
});

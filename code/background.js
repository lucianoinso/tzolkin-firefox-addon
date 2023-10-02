browser.menus.create({
  id: "tzolkin",
  title: "Open Kin of the selected date",
  contexts: ["selection"]
});
 
browser.menus.onClicked.addListener(async function (info, tab) {
  if (info.menuItemId == "tzolkin") {
    if (info.selectionText) {
      let date = info.selectionText;

      date = date.replaceAll("de ", "").replaceAll(",","").split(" ");
      date.sort();

      let year = "";
      let day = "";
      
      date[0] = parseInt(date[0]);
      date[1] = parseInt(date[1]);
      
      if (date[0] < date[1]) { [date[0], date[1]] = [date[1], date[0]] }

      year = date[0];
      day = date[1];

      while (year < 1911) { year += 52; }

      let month = date[2].toLowerCase();

      var monthsSpa = Array.from({length: 12}, (_, i) => new Date(0, i)
                           .toLocaleDateString('es', { month: 'long' })
                           .toLowerCase());

      var monthsEng = Array.from({length: 12}, (_, i) => new Date(0, i)
                           .toLocaleDateString('en', { month: 'long' })
                           .toLowerCase());

      if (monthsSpa.includes(month)) month = monthsSpa.indexOf(month.toLowerCase()) + 1;
      else if (monthsEng.includes(month)) month = monthsEng.indexOf(month.toLowerCase()) + 1;
      else console.log("invalid month");

      let url = `https://www.13lunas.net/firmaGalacticaCompleta.html?nombre=Hoy&dia=${day}&mes=${month}&ano=${year}`;
      let newTab = await browser.tabs.create({ 'active': true, 'url': url, 'index': tab.index+1 });
    }
  }
});

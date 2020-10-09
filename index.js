webix.ready(() => {
  const app = webix.ui({
    id: "ssheet",
    view: "spreadsheet",
    toolbar: "full",
    on: {
      onComponentInit() {
        const bar = this.$$("bar");
        bar.addView({
          view: "button",
          id: "changeCategory",
          label: "Change category",
          autowidth: true,
          tooltip: "Click to change category",
          disabled: true,
          click: () => {
            modalWindowForSpreadsheet.show();
          }
        },
        bar.getChildViews().length - 1);
      },
      onAfterSelect(id) {
        const selectedRange = this.getSelectedRange().split(":");
        const bar = this.$$("bar");
        const orderOfButton = bar.getChildViews().length - 2;
        const buttonView = bar.getChildViews()[orderOfButton];
        selectedItemCodeData.length = 0;
        $$("changeCategoryDatatable").clearAll();
        if(selectedRange[0][0] === "A" && selectedRange[0][0] === selectedRange[1][0]) {
          defineNewViewProp(buttonView, "disabled", false);

          this.eachSelectedCell((cell) => {
            const cellValue = $$("ssheet").getCellValue(cell.row, cell.column);
            selectedItemCodeData.push({id: cell.row, itemCode: cellValue, categoryId: "1"});
          });
          $$("changeCategoryDatatable").parse(selectedItemCodeData);
        }
        else {
          defineNewViewProp(buttonView, "disabled", true);
        }
      },
    },
  });

  $$("ssheet").parse(spreadSheetBaseData || {}, "json");

  const modalWindowForSpreadsheet = webix.ui(modalWindowForSpreadsheetConfig);

  webix.extend(app, webix.ProgressBar);
});

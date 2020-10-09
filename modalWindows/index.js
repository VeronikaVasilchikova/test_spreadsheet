let countSaveAttempts = 0;

const modalWindowForSpreadsheetConfig = {
  view: "window",
  position: "center",
  modal: true,
  borderless: true,
  width: 300,
  height: 300,
  head: {
    cols: [
      {
        width: 20
      },
      {
        view: "label",
        // width: 220,
        label: "Change category",
      },
      {
        view: "icon",
        icon: "mdi mdi-close",
        click() {
          this.getTopParentView().hide();
        },
      },
    ]
  },
  body: {
    rows: [
      {
        view: "datatable",
        id: "changeCategoryDatatable",
        scroll: "xy",
        editable: true,
        columns: [
          {
            id: "id",
            header: "##",
            width: 40,
          },
          {
            id: "itemCode",
            header: "Item Code",
            width: 160,
          },
          {
            id: "categoryId",
            header: "Category",
            options: categories,
            editor: "select",
            width: 100,
          },
        ],
        data: []
      },
      {
        cols: [
          {},
          {
            view: "button",
            id: "saveChangesButton",
            label: "Save changes",
            autowidth: true,
            click() {
              const data = $$("changeCategoryDatatable").serialize(true);

              if(countSaveAttempts === 0 && data.length !== 0) {
                $$("ssheet").insertColumn(2);
                $$("ssheet").setCellValue(2, 2, "Category");
                countSaveAttempts++;
              }
              console.log(data);

              data.forEach(item => {
                if(item.categoryId !== "1") {
                  console.log("1");
                  if (categories.exists(item.categoryId)) {
                    console.log("2");
                    const categoryName = webix.copy(categories.getItem(item.categoryId)).value;
                    $$("ssheet").setCellValue(item.id, 2, categoryName);
                    $$("ssheet").refresh();
                  }
                }
              });

              this.getTopParentView().hide();
            },
          },
          {
            view: "button",
            id: "cancelButton",
            label: "Cancel",
            autowidth: true,
            click() {
              this.getTopParentView().hide();
            },
          }
        ]
      },
    ]
  },
};

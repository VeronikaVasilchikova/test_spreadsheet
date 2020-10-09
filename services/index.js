function defineNewViewProp(view, prop, value) {
  view.define(prop, value);
  view.refresh();
}

import React from "react";
import ContentEditable from "react-contenteditable";

export class EditableBlock extends React.Component {
  constructor() {
    super();
    this.contentEditable = React.createRef();
    this.state = { html: "<b>Hello <i>World</i></b>" };
  }

  getCaretCoordinates = (fromStart = true) => {
    console.log("coords");
    let x = 0;
    let y = 0;
    let selection = window.getSelection();
    let range = selection?.getRangeAt(0).cloneRange();
    range.collapse(false);
    let rect = range?.getClientRects();
    console.log("rect", selection?.getRangeAt(0));
    x = rect[0].left;
    y = rect[0].top;
    console.log(selection);
    console.log(x, y);

    return { x, y };
  };

  handleChange = (evt) => {
    console.log("event");
    this.setState({ html: evt.target.value });
    this.getCaretCoordinates();
  };

  render = () => {
    return (
      <ContentEditable
        innerRef={this.contentEditable}
        html={this.state.html} // innerHTML of the editable div
        disabled={false} // use true to disable editing
        onChange={this.handleChange} // handle innerHTML change
        tagName="article" // Use a custom HTML tag (uses a div by default)
      />
    );
  };
}

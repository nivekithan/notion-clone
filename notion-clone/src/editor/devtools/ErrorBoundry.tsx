import React, {ReactChild} from "react";
import {ReactEditor} from "slate-react";
import {Node} from "slate"




type ErrorBoundryProps = {
  children: ReactChild;
  editor: ReactEditor;
  devSlateValue: Node[];
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundryProps,
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    ReactEditor.deselect(this.props.editor);
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      ReactEditor.deselect(this.props.editor);
      return this.props.children;
    }

    return this.props.children;
  }
}

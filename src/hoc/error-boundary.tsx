import React, { ErrorInfo, Component, ReactNode } from "react";

interface IErrorBoundary {
  children: ReactNode;
}

type TErrorBoundaryState = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<IErrorBoundary, TErrorBoundaryState> {
  constructor(props: IErrorBoundary) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log("Возникла ошибка!", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section>
          <h1>Что-то пошло не так.</h1>
          <p>В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.</p>
        </section>
      );
    }
    return this.props.children;
  }
}

import React from 'react';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  State
> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('ErrorBoundary caught', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-200 text-red-800">Что-то пошло не так.</div>
      );
    }
    return this.props.children;
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export function toggleProvider(WrappedComponent) {
  return class Toggle extends Component {
    static defaultProps = {
      open: null,
    };
    static propTypes = {
      open: PropTypes.string,
    };

    constructor(props) {
      super(props);

      this.state = {
        toggled: props.open || null,
      };
    }

    toggle = (toggleState) => {
      if (toggleState !== undefined && toggleState !== null) {
        this.setState({
          toggled: toggleState,
        });
        return;
      }
      this.setState({
        toggled: null,
      });
    };

    render() {
      const funcsToPassTrough = {
        toggle: this.toggle,
      };
      // eslint-disable-next-line no-unused-vars
      const { open, ...passThroughProps } = this.props;
      const { ...stateToPassTrough } = this.state;
      return (
        <WrappedComponent
          key="transitionChild"
          {...funcsToPassTrough}
          {...stateToPassTrough}
          {...passThroughProps}
        />
      );
    }
  };
}

export const withProps = {
  toggled: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

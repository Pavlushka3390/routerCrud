import React from "react";
import PropTypes from "prop-types";
import useApi from "./useApi";

const withDataLoaderPropTypes = {
  path: PropTypes.string,
  params: PropTypes.object
};

const withDataLoader = (Component, className = "loading-spinner") => {
  const WithDataLoaderWrapper = (props) => {
    const { path, params } = props;
    const { data, loading, error } = useApi(path, params, [path]);

    return loading ? (
      <div className={className}>
        <Component {...props} {...{ data, loading, error }} />
      </div>
    ) : (<Component {...props} {...{ data, loading, error }} />);
  };
  WithDataLoaderWrapper.propTypes = withDataLoaderPropTypes;
  return WithDataLoaderWrapper;
};

export default withDataLoader;
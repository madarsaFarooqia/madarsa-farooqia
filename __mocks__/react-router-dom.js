const React = require('react');

const BrowserRouter = ({ children }) => React.createElement(React.Fragment, null, children);
const Routes = ({ children }) => React.createElement(React.Fragment, null, children);
const Route = ({ children }) => React.createElement(React.Fragment, null, children);
const Link = ({ children }) => React.createElement(React.Fragment, null, children);
const Navigate = () => null;

const useNavigate = () => () => {};
const useLocation = () => ({ pathname: '/' });
const useParams = () => ({});

module.exports = {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation,
  useParams,
};

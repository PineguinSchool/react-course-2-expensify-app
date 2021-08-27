import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedCommponent) => {
 return (props) => (
  <div> 
    {props.isAdmin && <p>This is private info. Please don't share!</p>}
    <WrappedCommponent {...props}/>
  </div>
 );
};

const requireAuthentication = (WrappedCommponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? (
        <WrappedCommponent {...props} />
      ) : (
        <p>Please login to see the info.</p>
      )}
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);


// ReactDOM.render(<AdminInfo isAdmin={false} info="There are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="There are the details" />, document.getElementById('app'));
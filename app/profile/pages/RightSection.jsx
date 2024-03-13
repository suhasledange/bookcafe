import React from 'react';
import Orders from './Orders';
import Account from './Account';

const RightSection = ({ selectedLink, className }) => {
    return (
    <div className={`  ${className || ""} `}>
        <div className='p-3'>
            <Account selectedLink={selectedLink}/>

            <Orders selectedLink={selectedLink}/>
        </div>
    </div>
  );
}

export default RightSection;

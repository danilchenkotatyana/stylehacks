import React, { useEffect, useState, useRef } from 'react';

import { geolocated } from 'react-geolocated';

import Inner from './Inner.jsx';

const Geo = (
    {
        geo,
        setGeo,
        onLocationChange,
        cookies,
        setCookies }
) => {
    const ref = useRef(null);

    const update = (value) => {
        onLocationChange(value);
        setCookies('geo', '1', { maxAge: 365 * 24 * 3600 });
        setGeo(true);
    };

    useEffect(() => {
        if (!cookies.geo) {
            setCookies('geo', '1', { maxAge: 365 * 24 * 3600 });
            ref.current && ref.current.getLocation();
        }
    }, []);

    return (<>
        <Inner geo={geo} onLocationChange={update} ref={ref} />
    </>);
}

export default Geo;


import React from 'react';

import { geolocated } from 'react-geolocated';

import { getByCoordinates } from '../../geo/Geo';

const Inner = ({
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
    positionError,
    onLocationChange,
    geo }) => {

    if (!geo && coords) {
        getByCoordinates(coords, (point) => {
            if (point) {
                onLocationChange({ value: point });
            }
        });
    }

    return <></>
}

export default geolocated({ suppressLocationOnMount: true })(Inner);


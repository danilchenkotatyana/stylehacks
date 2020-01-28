import React from 'react';

import { geolocated } from 'react-geolocated';

import { getByCoordinates } from '../../geo/Geo';

const Geo = (
    {
        coords,
        isGeolocationAvailable,
        isGeolocationEnabled,
        positionError,
        onLocationChange,
        cookies,
        setCookies }
) => {
    if (!cookies.geo) {
        if (coords) {
            setCookies('geo', '1', { maxAge: 365 * 24 * 3600 });
            getByCoordinates(coords, (point) => {
                if (point) {
                    onLocationChange({ value: point });
                }
            });
        } else if (positionError) {
            setCookies('geo', '1', { maxAge: 365 * 24 * 3600 });
        }
    }
    return <></>;
}

export default geolocated()(Geo);


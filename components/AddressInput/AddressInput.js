'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './AddressInput.module.css';
import {
  GOOGLE_PLACES_API_KEY,
  SERVICE_AREAS,
  LOCATION_BIAS_LAT,
  LOCATION_BIAS_LNG,
} from '@/lib/config';

function isInServiceArea(place) {
  if (!SERVICE_AREAS || SERVICE_AREAS.length === 0) return true;
  if (!place || !place.address_components) return false;
  for (let i = 0; i < place.address_components.length; i++) {
    const comp = place.address_components[i];
    if (comp.types.includes('administrative_area_level_1')) {
      const state = comp.short_name.toUpperCase();
      return SERVICE_AREAS.includes(state);
    }
  }
  return false;
}

export default function AddressInput({
  id,
  placeholder = 'Enter property address...',
  value,
  onChange,
  onAddressSelect,
  className,
  inputClassName,
}) {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!GOOGLE_PLACES_API_KEY) return;
    if (window.google?.maps?.places) {
      setIsLoaded(true);
      initAutocomplete();
      return;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsLoaded(true);
      initAutocomplete();
    };
    document.head.appendChild(script);
    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  function initAutocomplete() {
    if (!inputRef.current || !window.google?.maps?.places) return;
    if (autocompleteRef.current) return;
    const options = {
      componentRestrictions: { country: 'us' },
      types: ['address'],
      fields: ['formatted_address', 'address_components'],
    };
    if (LOCATION_BIAS_LAT && LOCATION_BIAS_LNG) {
      options.locationBias = new google.maps.Circle({
        center: { lat: LOCATION_BIAS_LAT, lng: LOCATION_BIAS_LNG },
        radius: 80000,
      });
    }
    autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, options);
    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace();
      if (place?.formatted_address) {
        if (SERVICE_AREAS.length > 0 && !isInServiceArea(place)) {
          alert(`Sorry, we currently only serve ${SERVICE_AREAS.join(', ')}. Please enter a property address in our service area.`);
          if (onChange) onChange('');
          return;
        }
        if (onChange) onChange(place.formatted_address);
        if (onAddressSelect) onAddressSelect(place.formatted_address);
      }
    });
  }

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      autoComplete="off"
      className={inputClassName || className || styles.input}
    />
  );
}

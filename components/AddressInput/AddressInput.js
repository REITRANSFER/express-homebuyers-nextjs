'use client';

import { useEffect, useRef, useCallback } from 'react';
import styles from './AddressInput.module.css';

let mapsLoading = false;
let mapsLoaded = false;

function loadGoogleMaps() {
  if (mapsLoaded || mapsLoading) return;
  mapsLoading = true;
  const script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCDtN-QzZ8zcoKOhxQLD4HKcWEiY39Xqcs&libraries=places';
  script.async = true;
  script.onload = () => { mapsLoaded = true; };
  script.onerror = () => { mapsLoading = false; };
  document.head.appendChild(script);
}

function isDMVAddress(place) {
  if (!place || !place.address_components) return true; // Allow if can't verify
  for (let i = 0; i < place.address_components.length; i++) {
    const comp = place.address_components[i];
    if (comp.types.indexOf('administrative_area_level_1') !== -1) {
      const state = comp.short_name.toUpperCase();
      return state === 'DC' || state === 'MD' || state === 'VA';
    }
  }
  return true;
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
  const onChangeRef = useRef(onChange);
  const onAddressSelectRef = useRef(onAddressSelect);

  useEffect(() => {
    onChangeRef.current = onChange;
    onAddressSelectRef.current = onAddressSelect;
  });

  const initAutocomplete = useCallback(() => {
    if (typeof window === 'undefined' || !window.google?.maps?.places) return;
    if (!inputRef.current || autocompleteRef.current) return;
    const ac = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'us' },
    });
    ac.setFields(['formatted_address', 'address_components']);
    ac.addListener('place_changed', () => {
      const place = ac.getPlace();
      if (place?.formatted_address) {
        if (!isDMVAddress(place)) {
          alert('Sorry, Express Homebuyers currently serves the DC, Maryland, and Virginia area only. Please enter a property address in the DMV region.');
          if (onChangeRef.current) onChangeRef.current('');
          return;
        }
        if (onChangeRef.current) onChangeRef.current(place.formatted_address);
        if (onAddressSelectRef.current) onAddressSelectRef.current(place.formatted_address);
      }
    });
    autocompleteRef.current = ac;
  }, []);

  useEffect(() => {
    try { loadGoogleMaps(); } catch (e) { /* Google Maps not available */ }
    const interval = setInterval(() => {
      if (window.google?.maps?.places) {
        initAutocomplete();
        clearInterval(interval);
      }
    }, 500);
    const timeout = setTimeout(() => clearInterval(interval), 10000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [initAutocomplete]);

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

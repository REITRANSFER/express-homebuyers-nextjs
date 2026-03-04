'use client';

import { useEffect, useRef, useState } from 'react';

const API_KEY = 'AIzaSyCDtN-QzZ8zcoKOhxQLD4HKcWEiY39Xqcs';

function isDMVAddress(place) {
  if (!place || !place.address_components) return true;
  for (let i = 0; i < place.address_components.length; i++) {
    const comp = place.address_components[i];
    if (comp.types.includes('administrative_area_level_1')) {
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if already loaded
    if (window.google?.maps?.places) {
      setIsLoaded(true);
      initAutocomplete();
      return;
    }

    // Load Google Places script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&loading=async`;
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

    autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: 'us' },
      types: ['address'],
      fields: ['formatted_address', 'address_components'],
    });

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace();
      if (place?.formatted_address) {
        if (!isDMVAddress(place)) {
          alert('Sorry, Express Homebuyers currently serves the DC, Maryland, and Virginia area only. Please enter a property address in the DMV region.');
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
      className={inputClassName || className}
    />
  );
}

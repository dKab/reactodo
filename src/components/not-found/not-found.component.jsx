import React from 'react';

export function NotFound() {
    const styles = {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        height: 'auto'
    };
    return (
      <h1 style={styles}>404 URL not found</h1>
    );
}
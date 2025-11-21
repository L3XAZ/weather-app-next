'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
    return (
        <Toaster
            position="bottom-right"
            toastOptions={{
                duration: 3000,
                style: {
                    background: 'rgba(20, 20, 20, 0.85)',
                    border: '1px solid rgba(242, 200, 76, 0.35)',
                    color: 'var(--gold-light)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    fontSize: '15px',
                    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.45), 0 0 22px rgba(242, 200, 76, 0.25)',
                    backdropFilter: 'blur(10px)',
                },
                success: {
                    iconTheme: {
                        primary: 'var(--accent-gold)',
                        secondary: '#000',
                    },
                },
                error: {
                    iconTheme: {
                        primary: '#ff6b6b',
                        secondary: '#000',
                    },
                },
            }}
        />
    );
}

import React from 'react';
import styles from './LoginBanner.module.css'


const banner = props => (
    <div className={styles.Banner}>
        <h1>local bytes</h1>
        <p>Find your new favorite local spot.</p>
    </div>
)

export default banner;
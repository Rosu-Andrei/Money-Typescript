import React from 'react';
import ParentComponent from "./component/ParentComponent";
import styles from './styles/App.module.css';

const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <ParentComponent/>
        </div>
    );
};

export default App;

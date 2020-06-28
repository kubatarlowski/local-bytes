import React, { useState } from 'react';
import styles from './Categories.module.css';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Categories = props => {

    let initalizedCheckedCat = {}    
    props.categories.forEach(element => {
        initalizedCheckedCat[element] = false;
    })

    const [checkedCat, setCheckedCat] = useState(initalizedCheckedCat)


    function updateChecked(category) {
        const oldChecked = {...checkedCat}
        oldChecked[category] = !checkedCat[category]
        setCheckedCat(oldChecked)
    }

    const checkboxes = props.categories.map((cat) => {
        if (cat==='breakfast_brunch'){
            cat='Breakfast Brunch'
        }

        if (cat==='mideastern'){
            cat='Middle Eastern'
        }

        return (
            <FormControlLabel
                style={{textTransform: 'capitalize',
                        }}
                key={cat}
                label={cat}
                control={<Checkbox
                    onChange={()=> {
                    props.checked(cat,!checkedCat[cat])
                    updateChecked(cat)

                }}/>
            }/>)})

    return (
        <div className={styles.Categories}>
            {checkboxes}
        </div>
    )
}

export default Categories;
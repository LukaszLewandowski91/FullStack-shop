import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../redux/categoriesRedux';
import { Box } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { IMGS_URL } from '../../../config';
import styles from './MainCarousel.module.scss';
const MainCarousel = () => {
  const categories = useSelector(getCategories);

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = categories.length;

  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: '100%', flexGrow: 1, mb: 5 }}>
      <AutoPlaySwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        disabled={true}
      >
        {categories.map((category, index) => (
          <div key={category.id}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 600,
                  display: 'block',
                  // maxWidth: 1280,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={`${IMGS_URL}/${category.image}`}
                alt={category.description}
              />
            ) : null}
            <div className={styles.theme}>
              <h1>{category.description}</h1>
              <a href="#" className={styles.btn}>
                See more
              </a>
            </div>
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </Box>
  );
};

export default MainCarousel;

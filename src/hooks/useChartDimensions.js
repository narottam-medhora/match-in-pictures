//  Import libraries
import { useEffect, useRef, useState } from "react";

const useChartDimensions = (passedSettings) => {
  // Custom function to set properties
  const combineChartDimensions = (dimensions) => {
    // Unpacks the passed in dimensions and sets default values if unspecified
    const parsedDimensions = {
      ...dimensions,
      marginTop: dimensions.marginTop || 20,
      marginRight: dimensions.marginRight || 20,
      marginBottom: dimensions.marginBottom || 20,
      marginLeft: dimensions.marginLeft || 20,
    };

    // Returns the parsedDimensions in combination with the calculated width and height
    return {
      ...parsedDimensions,
      boundedHeight: Math.max(
        parsedDimensions.height -
          parsedDimensions.marginTop -
          parsedDimensions.marginBottom,
        0
      ),
      boundedWidth: Math.max(
        parsedDimensions.width -
          parsedDimensions.marginLeft -
          parsedDimensions.marginRight,
        0
      ),
    };
  };

  // Store a returned ref object
  const ref = useRef();

  // Store the dimensions from the passedSettings prop
  const dimensions = combineChartDimensions(passedSettings);

  // Declare height and width as state variables
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  //
  useEffect(() => {
    // Defer to the passed height and width, if specified in the passedSettings prop
    if (dimensions.width && dimensions.height) return [ref, dimensions];

    // Stores the element
    const element = ref.current;

    // Use a resizeObserver to re-calculate the dimensions when the passed element changes in size
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;

      // ResizeObserver provides us with an array of objects, including contentRect
      const entry = entries[0];
      //   console.log(entry);

      // Grab the width and height of a containing <div> for the wrapper dimensions
      if (width != entry.contentRect.width) setWidth(entry.contentRect.width);
      if (height != entry.contentRect.height)
        setHeight(entry.contentRect.height);
    });

    // Watch for dimension changes on the element
    resizeObserver.observe(element);

    return () => resizeObserver.unobserve(element);
  }, []);

  // Calculate the dimensions of our bounds (named boundedHieght and boundedWidth)
  const newSettings = combineChartDimensions({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  });

  // Return the ref object and the recalculated dimensions for the chart
  return [ref, newSettings];
};

export default useChartDimensions;
